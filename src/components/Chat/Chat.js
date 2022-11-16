import React, { useContext, useEffect, useState } from 'react'
import { addResponseMessage, addUserMessage, Widget } from 'react-chat-widget'
import { Navigate, useNavigate } from 'react-router-dom'
import NutritionistModel from '../../db/NutritionistModel'
import PatientModel from '../../db/PatientModel'
import UserModel from '../../db/UserModel'
import { AuthContext } from '../../firebase/Auth'
import './index.css'

// import logo from '../../assets/images/user-test.png'

export const Chat = () => {
    const { currentUser } = useContext(AuthContext)
    const [nutritionist, setNutritionist] = useState(null)
    const [chat, setChat] = useState({
        nutricionista_uuid: null,
        paciente_uuid: null,
        mensagens: {
            de: null,
            para: null,
            mensagem: null,
            data: null
        },
    })
    const patientModel = new PatientModel()
    const nutritionistModel = new NutritionistModel()
    const userModel = new UserModel()

    const getInfoNutri = async () => {
        let nutriId = await patientModel.getNutritionistUuId(currentUser.uuid)
        console.log(nutriId)
        if (nutriId) {
            let nutritionist = await userModel.getUserByUid(nutriId)
            setNutritionist(nutritionist)
            console.log(nutritionist)
        }
    }

    if (currentUser) {
        if (!currentUser.isNutri && !nutritionist) {
            getInfoNutri()
        }
    } else {
        return <Navigate to="/login" replace />
    }
    
    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`, new Date());

        const mensagem = {
            de: currentUser.uuid,
            para: nutritionist.uuid,
            mensagem: newMessage,
            data: new Date()
        }
        
        setChat(prev => ({
            ...prev,
            nutricionista_uuid: nutritionist.uuid,
            paciente_uuid: currentUser.uuid,
            mensagens: {
                de: currentUser.uuid,
                para: nutritionist.uuid,
                mensagem: newMessage,
                data: new Date()
            }
        }))

        addResponseMessage('Oi');
        // addUserMessage('Oi')
    }

    return (
        <>
            {nutritionist && 
                <Widget
                    handleNewUserMessage={handleNewUserMessage}
                    // profileAvatar={logo}
                    title="Canal direto"
                    subtitle={`Conversa com nutricionista ${nutritionist.nome_completo}`}
                    senderPlaceHolder="Mensagem"
                    resizable={true}
                    emojis={true}
                />
            }
        </>
        
    )
}