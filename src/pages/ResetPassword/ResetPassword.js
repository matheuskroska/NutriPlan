import React, { useContext, useState } from 'react'
import { StyledButton } from '../../components/Button/Button.elements'
import { CardItem, CardInput, CardItemContainer, CardMessage } from '../../components/Card/Card.elements'
import { Card } from '../../components/index'
import { AuthContext } from '../../firebase/Auth'
import { Navigate, useNavigate } from 'react-router-dom'
import ResetPasswordModel from '../../db/ResetPasswordModel'

export const ResetPassword = () => {

    const [email, setEmail] = useState(null)
    const [showBtnLogin, setShowBtnLogin] = useState(false)
    const [showNewPwd, setShowNewPwd] = useState(false)
    const [newPassword, setNewPassword] = useState(null)
    const [confNewPassword, setConfNewPassword] = useState(null)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async() => {
        let ret = await ResetPasswordModel.handleConfirmNewPassword(email, newPassword, actionCode)
        if (!!ret && ret === true) {
            //Faz redirect para tela de login
            setShowBtnLogin(true)
            setMessage('Senha alterada com sucesso!')
        } else {
            alert(ret)
        }
    }

    const handleRedirectLogin = () => {
        navigate("/login", { replace: true });
    }
    const handleForgotPassword = () => {
        navigate("/alterar-senha", { replace: true });
    }

    // Código abaixo baseado no link: https://firebase.google.com/docs/auth/custom-email-handler?authuser=0&hl=pt
    const getParameterByName = (name) => {
        // name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]")
        var regexS = "[\\?&]"+name+"=([^&#]*)"
        var regex = new RegExp( regexS )
        var results = regex.exec( window.location.href )
        if( results == null )
            return ""
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "))
    }

    const handleResetPassword = async() => {
        if (!!!showNewPwd) {
            let ret = await ResetPasswordModel.handleResetPassword(actionCode, continueUrl, lang)
            if (!!ret && ret.indexOf('@') !== -1) {
                setShowNewPwd(true)
                setEmail(ret)
            } else {
                setMessage(ret)
            }
        }
    }

    const mode = getParameterByName('mode')
    const actionCode = getParameterByName('oobCode')
    const continueUrl = window.location.hostname + ':' + window.location.port
    const lang = getParameterByName('lang') || 'pt'

    switch (mode) {
        case 'resetPassword':
            // Display reset password handler and UI.
            handleResetPassword()
            break
        // case 'recoverEmail':
        //     // Display email recovery handler and UI.
        //     handleRecoverEmail(actionCode, lang)
        //     break
        // case 'verifyEmail':
        //     // Display email verification handler and UI.
        //     handleVerifyEmail(actionCode, continueUrl, lang)
        //     break
        default:
            // Error: invalid mode.
    }

    // Código acima baseado no link: https://firebase.google.com/docs/auth/custom-email-handler?authuser=0&hl=pt

    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return <Navigate to="/" replace />
    }

    return (
        <>
        { !!!showNewPwd ? (
            <Card cardTitle="Tente solicitar um novo link para alterar sua senha" >
                <CardItemContainer visibility="true">
                    <CardItem>
                        <CardMessage>
                            {message}
                        </CardMessage>
                    </CardItem>
                    <CardItem>
                        <StyledButton onClick={handleForgotPassword} primary maxWidth="fit-content">esqueci minha senha</StyledButton>
                    </CardItem>
                </CardItemContainer>  
            </Card>
        ) : (
            <Card cardTitle="Definir nova senha" >
                <CardItemContainer visibility="true">
                    { !!showBtnLogin ? (
                        <>
                            <CardItem>
                                <CardMessage>{message}</CardMessage>
                            </CardItem>
                            <CardItem>
                                <StyledButton onClick={handleRedirectLogin} primary maxWidth="fit-content">Fazer login com nova senha</StyledButton>
                            </CardItem>
                        </>
                    ) : (
                        <>
                            <CardItem>
                                <CardInput pattern={"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"} required type="password" placeholder="Nova senha" inputWidth="100%" onChange={(e) => setNewPassword(e.target.value)}></CardInput>
                            </CardItem>
                            <CardItem>
                                <CardInput pattern={"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"} required type="password" placeholder="Confirmar nova senha" inputWidth="100%" onChange={(e) => setConfNewPassword(e.target.value)}></CardInput>
                            </CardItem>
                            <CardItem>
                                <StyledButton onClick={handleSubmit} primary>alterar senha</StyledButton>
                            </CardItem>
                        </>
                    )}
                </CardItemContainer>  
            </Card>
        )}
        </>
    )
}