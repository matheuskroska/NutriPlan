import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { NutritionistDashboard, PatientDashboard } from '..'
import { AuthContext } from '../../firebase/Auth'

export const Dashboard = () => {
    const { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            {!currentUser.isNutri ? <PatientDashboard /> : <NutritionistDashboard />}
        </>
    )
}