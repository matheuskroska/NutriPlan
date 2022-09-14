import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card } from '../../components'
import { CardContainer, CardContent, CardContentRow } from '../../components/Card/Card.elements'
import { Translator } from '../../components/I18n'
import { AuthContext } from '../../firebase/Auth'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import { Responsive, WidthProvider } from "react-grid-layout"

import "./index.css"

const ResponsiveGridLayout = WidthProvider(Responsive)

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const Dashboard = () => {
    const { currentUser } = useContext(AuthContext)
    const { layouts, setLayouts } = useState([
        { i: "a", x: 0, y: 0, w: 2, h: 1 },
        { i: "b", x: 4, y: 0, w: 4, h: 1 },
        { i: "c", x: 8, y: 0, w: 4, h: 1 },
        { i: "d", x: 0, y: 0, w: 4, h: 1 },
        { i: "e", x: 4, y: 1, w: 4, h: 1 },
        { i: "f", x: 8, y: 1, w: 4, h: 1 },
    ])

    if (!currentUser) {
        return <Navigate to="/login" replace />
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

    const data3 = {
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

    const data4 = {
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
                                    <Bar options={options} data={data3} />
                                </div>
                                <div key="d">
                                    <Bar options={options} data={data4} />
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