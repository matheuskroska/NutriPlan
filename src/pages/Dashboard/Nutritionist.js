import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, InfoMenu } from '../../components'
import { CardCol, CardColHeader, CardContainer, CardContent, CardContentCol, CardContentRow } from '../../components/Card/Card.elements'
import { AuthContext } from '../../firebase/Auth'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js'
import { Responsive, WidthProvider } from "react-grid-layout"

import "./index.css"
import _ from 'lodash'
import { Translator } from '../../components/I18n'
import { useTranslation } from 'react-i18next'
import UserModel from '../../db/UserModel'
import AppointmentModel from '../../db/AppointmentModel'
import ScheduleModel from '../../db/ScheduleModel'
import { MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { StyledLink } from '../../components/Link/Link.elements'
import { Bar } from 'react-chartjs-2'
import faker from 'faker';

const ResponsiveGridLayout = WidthProvider(Responsive)

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
)   

export const Nutritionist = () => {
    const { currentUser } = useContext(AuthContext)
    const [usersList, setUsersList] = useState(null)
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["data", "horario"]); //colunas da base para realizar busca
    const [usersName, setUsersName] = useState([]);
    const [scheduleList, setScheduleList] = useState(null)
    const { t } = useTranslation()
    
    const userModel = new UserModel()
    const appointmentModel = new AppointmentModel()
    const scheduleModel = new ScheduleModel()

    const getUsers = async () => {
        let users = await userModel.getUsers()
        let usersNameTmp = await userModel.getUsersName()
        setUsersName(usersNameTmp)
        setUsersList(users)
    }

    const getSchedules = async () => {
        let schedules = await appointmentModel.getByPatientUuid(currentUser.uuid)
        setScheduleList(schedules);
    }
    
    if (!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!usersList) {
        getUsers()
        !currentUser.isNutri && getSchedules();
    }

    function search(items) {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(querySearch.toLowerCase()) > -1
                );
            });
        });
    }
    
    const handleDelete = async(e, docId) => {
        if (window.confirm('Deseja deletar essa consulta?')) {
            if (window.confirm('Tem certeza que deseja deletar essa consulta?')) {
                let dataDoc = await appointmentModel.getByDocId(docId)
                await scheduleModel.removeDateTime(dataDoc.data, dataDoc.horario, dataDoc.nutricionista_uuid)
                await appointmentModel.delete(docId)
                // let appointments = appointmentModel.getAllSnapshot(currentUser.uuid) //recupera lista atualizada
                // console.log(appointments)
                // setScheduleList(appointments)
            }
        }
    }

    const layout = [
        { i: "a", x: 0, y: Infinity, w: 4, h: 1 },
        { i: "b", x: 4, y: Infinity, w: 4, h: 1 },
        { i: "c", x: 8, y: Infinity, w: 4, h: 1 },
        { i: "d", x: 0, y: Infinity, w: 4, h: 1 },
        { i: "e", x: 4, y: Infinity, w: 4, h: 1 },
        { i: "f", x: 8, y: Infinity, w: 4, h: 1 },
    ]

    const getLayouts = () => {
        const savedLayouts = localStorage.getItem("grid-layout")
        let _savedLayouts = savedLayouts ? JSON.parse(savedLayouts) : { lg: layout }
        return _savedLayouts
    }

    const handleLayoutChange = (layout, layouts) => {
        localStorage.setItem("grid-layout", JSON.stringify(layouts))
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
    };
      
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      

    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };

    return (
        <>
            <Card cardTitle="Dashboard" maxWidth={"100%"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu name="dashboard"/>
                    <CardContent>
                        <CardContentRow gap={"0 10px"}>
                            <ResponsiveGridLayout
                                layouts={getLayouts()}
                                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                                maxRows={8}
                                // rowHeight={300}
                                width={1200}
                                onLayoutChange={handleLayoutChange}
                            >
                                <div>
                                    <Card cardTitle={<Translator path="myAppoint"/>} maxWidth={"100%"} borderRadius={"0"}>
                                        <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                                            <InfoMenu menuState={<Translator path="myAppoint"/>}/>
                                            <CardContent>
                                                <CardContentRow>
                                                    <CardContentCol wSearchIcon justify={"start"}><input type="text" name="search-form" id="search-form" placeholder={`${t('search')}`} value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/><MagnifyingGlassIcon/></CardContentCol>
                                                </CardContentRow>
                                                <CardContentRow>
                                                    <CardColHeader txAlign="left" width="33.3%"><Translator path="dateTime"/></CardColHeader>
                                                    <CardColHeader width="33.3%"><Translator path="nutritionist"/></CardColHeader>
                                                    <CardColHeader width="33.3%"><Translator path="actions"/></CardColHeader>
                                                </CardContentRow>
                                                {!!scheduleList && search(scheduleList).map(data => {
                                                    return (
                                                        <CardContentRow key={data.id}>
                                                            <CardCol width="33.3%">
                                                                <CardContentCol justify={"start"}><strong>{data.data}</strong> - {data.horario}</CardContentCol>
                                                            </CardCol>
                                                            <CardCol width="33.3%">
                                                                <CardContentCol><strong>{usersName[data.nutricionista_uuid]}</strong></CardContentCol>
                                                            </CardCol>
                                                            <CardCol width="33.3%" display="flex">
                                                                <CardContentCol maxWidth={"25px"}><StyledLink uuid={data.id} edit="true" header="true" to={`/editar-consulta/`+data.id}><Pencil2Icon/></StyledLink></CardContentCol>
                                                                <CardContentCol maxWidth={"25px"} onClick={(e) => handleDelete(e, data.id)}><StyledLink edit="true" header="true" to={"#"}><TrashIcon/></StyledLink></CardContentCol>
                                                            </CardCol>
                                                        </CardContentRow>
                                                    )
                                                })}
                                            </CardContent>
                                        </CardContainer>
                                    </Card>
                                </div>
                                <div>
                                    <Bar options={options} data={data} />
                                </div>
                                {/* <div key="c">
                                    <MacroNutriChart macroNutri={macroNutri} />
                                </div>
                                <div key="e">
                                    <MacroNutriPerFoodChart macroNutri={macroNutriPerFood} />
                                </div> */}
                            </ResponsiveGridLayout>
                        </CardContentRow>
                    </CardContent>
                    </CardContainer>
            </Card>
        </>
    )
}