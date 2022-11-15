import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, InfoMenu } from '../../components'
import { CardContainer, CardContent, CardContentRow } from '../../components/Card/Card.elements'
import { AuthContext } from '../../firebase/Auth'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js'
import { Bar, Line, Pie, PolarArea } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import { Responsive, WidthProvider } from "react-grid-layout"

import "./index.css"
import PatientModel from '../../db/PatientModel'
import PlanModel from '../../db/PlanModel'
import _ from 'lodash'

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

export const Patient = () => {
    const { currentUser } = useContext(AuthContext)
    const [ hasPlan, setHasPlan ] = useState(false)
    const [ macroNutri, setMacroNutri ] = useState([])
    const patientModel = new PatientModel()
    const planModel = new PlanModel()

    const getFoodDetails = async () => {
        let planId = await patientModel.getPlanId(currentUser.uuid)
        if (!planId) {
            setHasPlan(false)
            return false
        }
        let plan = await planModel.get(planId)
        // let plan = await planModel.getMacroNutri(planId)
        let carbs = 0
        let fat = 0
        let protein = 0
        let numItems = 0
        _.map(plan, (data, key) => {
            _.map(data.items, (dataItem, keyItem) => {
                let caloricBreakdown = dataItem.foodDetails.nutrition.caloricBreakdown
                carbs += caloricBreakdown.percentCarbs
                fat += caloricBreakdown.percentFat
                protein += caloricBreakdown.percentProtein
                numItems++
                console.log('caloricBreakdown', caloricBreakdown)
            })
            console.log('key', key)
        })
        carbs = Math.round((carbs/numItems) * 100) / 100
        fat = Math.round((fat/numItems) * 100) / 100
        protein = Math.round((protein/numItems) * 100) / 100
        let macroNutri = [carbs, fat, protein]
        setMacroNutri(macroNutri)
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />
    } else if (macroNutri.length == 0) {
        getFoodDetails()
    }

    const layout = [
        { i: "a", x: 0, y: Infinity, w: 4, h: 1 },
        { i: "b", x: 4, y: Infinity, w: 4, h: 1 },
        { i: "c", x: 8, y: Infinity, w: 4, h: 1 },
        { i: "d", x: 0, y: Infinity, w: 4, h: 1 },
        { i: "e", x: 4, y: Infinity, w: 4, h: 1 },
        { i: "f", x: 8, y: Infinity, w: 4, h: 1 },
    ]

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfico',
            },
        },
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

    const data1 = {
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
    }

    const data2 = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }

    const labelsNutri = ['Carboidratos', 'Gordura', 'Proteína'];
    const data3 = {
        labelsNutri,
        datasets: [
            {
                data: macroNutri,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            }
        ],
    }

    const data4 = {
        labels,
        datasets: [
            {
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(127, 74, 145, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(127, 74, 145, 1)',
                ],
                borderWidth: 1,
            }
        ],
    }

    const data5 = {
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
    }

    const getLayouts = () => {
        const savedLayouts = localStorage.getItem("grid-layout")
        let _savedLayouts = savedLayouts ? JSON.parse(savedLayouts) : { lg: layout }
        // setLayouts(_savedLayouts)
        return _savedLayouts
    }

    const handleLayoutChange = (layout, layouts) => {
        localStorage.setItem("grid-layout", JSON.stringify(layouts))
    }

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
                                <div key="a">
                                    <Bar options={options} data={data1} style={{maxHeight: 'calc(100% - 60px)'}}/>
                                </div>
                                <div key="b">
                                    <Line options={options} data={data2} />
                                </div>
                                <div key="c">
                                    <Pie options={options} data={data3} />
                                </div>
                                <div key="d">
                                    <PolarArea options={options} data={data4} />
                                </div>
                                <div key="e">
                                    <Bar options={options} data={data5} />
                                </div>
                            </ResponsiveGridLayout>
                        </CardContentRow>
                    </CardContent>
                    </CardContainer>
            </Card>
        </>
    )
}