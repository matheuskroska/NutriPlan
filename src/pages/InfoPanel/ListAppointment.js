import React, { useContext, useState } from 'react';
import { CardCol, CardColHeader, CardContainer, CardContent, CardContentCol, CardContentRow } from '../../components/Card/Card.elements';
import { MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Navigate } from 'react-router-dom';
import { StyledLink} from '../../components/Link/Link.elements';
import UserModel from '../../db/UserModel';
import { AuthContext } from '../../firebase/Auth';
import { Card, InfoMenu, Loader } from '../../components';
import AppointmentModel from '../../db/AppointmentModel';
import ScheduleModel from '../../db/ScheduleModel';
import { Translator } from '../../components/I18n';
import { useTranslation } from 'react-i18next';
import { ModalMessage } from '../../components/ModalMessage/ModalMessage';

export const ListAppointment = () => {
    const [usersList, setUsersList] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["data", "horario"]); //colunas da base para realizar busca
    const [usersName, setUsersName] = useState([]);
    const [scheduleList, setScheduleList] = useState(null)
    const { t } = useTranslation()
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState()
    const [confirmation, setConfirmation] = useState(false);
    const [modalMessage, setModalMessage] = useState(false);
    const [type, setType] = useState()
    const [docID, setDocID] = useState()

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
        if (currentUser.isNutri) {
            let schedules = await appointmentModel.getByNutritionistUuid(currentUser.uuid)
            setScheduleList(schedules);
        } else {
            let schedules = await appointmentModel.getByPatientUuid(currentUser.uuid)
            setScheduleList(schedules);
        }
    }


    if (!!currentUser && !!!usersList) {
        getUsers()
        getSchedules();
    } else if (!!!currentUser) {
        return <Navigate to="/login" replace />
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
    
    const handleDelete = async (e, docId) => {
        
        setDocID(docId)
        setType('delete')
        setMessage(t('confirmDeleteAppointment'))
        setModalMessage(true)
        setLoader(false)

    }

    const pull_data = (data, propsSuccess) => {
        setModalMessage(!data)
    }

    const handleConfirmation = (option, type) => {
        if (option === true) {
            handleActivity()
        }
    }

    const handleActivity = async () => { 
        let dataDoc = await appointmentModel.getByDocId(docID)
        await scheduleModel.removeDateTime(dataDoc.data, dataDoc.horario, dataDoc.nutricionista_uuid)
        await appointmentModel.delete(docID)
        window.location.reload()
    }

    return (
    <>
    {!!loader && (
        <>
            <Loader/>
        </>
    )}
    {modalMessage && (
        <>
                <ModalMessage type={type} setConfirmation={handleConfirmation} func={pull_data} confirm={true}>{message}</ModalMessage>
        </>
    )}
            <Card className="myAppointments" cardTitle={<Translator path="myAppoint"/>} maxWidth={"100%"} borderRadius={"0"}>
        <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
            <InfoMenu menuState={<Translator path="myAppoint"/>}/>
            <CardContent>
                <CardContentRow>
                    <CardContentCol wSearchIcon justify={"start"}><input type="text" name="search-form" id="search-form" placeholder={`${t('search')}`} value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/><MagnifyingGlassIcon/></CardContentCol>
                </CardContentRow>
                <CardContentRow>
                    <CardColHeader txAlign="left" width="33.3%"><Translator path="dateTime"/></CardColHeader>
                    <CardColHeader width="33.3%">{currentUser.isNutri ? (<Translator path="patient"/>) : (<Translator path="nutritionist"/>)}</CardColHeader>
                    <CardColHeader width="33.3%"><Translator path="actions"/></CardColHeader>
                </CardContentRow>
                {!!scheduleList && search(scheduleList).map(data => {
                    return (
                        <CardContentRow key={data.id}>
                            <CardCol width="33.3%">
                                <CardContentCol justify={"start"}><strong>{data.data}</strong> - {data.horario}</CardContentCol>
                            </CardCol>
                            <CardCol width="33.3%">
                                <CardContentCol><strong>{currentUser.isNutri ? (usersName[data.paciente_uuid]) : (usersName[data.nutricionista_uuid])}</strong></CardContentCol>
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
    </>
  )
}
