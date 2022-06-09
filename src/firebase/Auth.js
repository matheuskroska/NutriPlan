import React, {useEffect, useState } from "react"
import { auth } from '.'
import { Loader } from "../components"
import AdminModel from "../db/AdminModel"
import NutritionistModel from "../db/NutritionistModel"
import PatientModel from "../db/PatientModel"
import UserModel from "../db/UserModel"

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

     useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (!!user) {
                let userModel = new UserModel()
                let userInfo = await userModel.getUserByUid(user.uid)
                let adminModel = new AdminModel()
                userInfo.isAdmin = await adminModel.isAdmin(user.uid)
                let nutritionistModel = new NutritionistModel()
                userInfo.isNutritionist = await nutritionistModel.isNutritionist(user.uid)
                let patientModel = new PatientModel()
                userInfo.isPatient = await patientModel.isPatient(user.uid)
                setCurrentUser(userInfo)
            } else {
                setCurrentUser(user)
            }
            setPending(false)
        })
    }, [])

    if(pending){
        return (
            <Loader/>
        )
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
        {children}
        </AuthContext.Provider>
    )
}