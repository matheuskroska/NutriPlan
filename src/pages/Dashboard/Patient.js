import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, InfoMenu } from '../../components'
import { CardContainer, CardContent, CardContentRow } from '../../components/Card/Card.elements'
import { AuthContext } from '../../firebase/Auth'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js'
import { Responsive, WidthProvider } from "react-grid-layout"

import "./index.css"
import PatientModel from '../../db/PatientModel'
import PlanModel from '../../db/PlanModel'
import _ from 'lodash'
import { MacroNutriChart, MacroNutriPerFoodChart } from '../../components/Chart'

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
    const [ macroNutriPerFood, setMacroNutriPerFood ] = useState([])
    const patientModel = new PatientModel()
    const planModel = new PlanModel()

    const getFoodDetails = async () => {
        let planId = await patientModel.getPlanId(currentUser.uuid)
        if (!planId) {
            setHasPlan(false)
            return false
        }
        let macroNutri = await planModel.getMacroNutri(planId)
        setMacroNutri(macroNutri)
        let macroNutriFood = await planModel.getMacroNutriPerFood(planId)
        setMacroNutriPerFood(macroNutriFood)
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

    const getLayouts = () => {
        const savedLayouts = localStorage.getItem("grid-layout")
        let _savedLayouts = savedLayouts ? JSON.parse(savedLayouts) : { lg: layout }
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
                                <div key="c">
                                    <MacroNutriChart macroNutri={macroNutri} />
                                </div>
                                <div key="e">
                                    <MacroNutriPerFoodChart macroNutri={macroNutriPerFood} />
                                </div>
                            </ResponsiveGridLayout>
                        </CardContentRow>
                    </CardContent>
                    </CardContainer>
            </Card>
        </>
    )
}