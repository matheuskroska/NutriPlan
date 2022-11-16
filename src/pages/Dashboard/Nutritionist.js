import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, InfoMenu } from '../../components'
import { CardContainer, CardContent, CardContentRow } from '../../components/Card/Card.elements'
import { AuthContext } from '../../firebase/Auth'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js'
import { Responsive, WidthProvider } from "react-grid-layout"

import "./index.css"
import _ from 'lodash'
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