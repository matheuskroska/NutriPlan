import React, { useContext, useState } from 'react';
import { StyledButton } from '../../components/Button/Button.elements';
import { CardItem, CardInput, CardItemContainer, CardMessage } from '../../components/Card/Card.elements';
import { Card, Loader } from '../../components/index';
import { CheckCircledIcon, EnvelopeClosedIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import LoginModel from '../../db/LoginModel';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const ForgotPassword = () => {

    const [email, setEmail] = useState(false)
    const [success, setSuccess] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setShowSpinner(true)
        let ret = await LoginModel.sendEmailResetPassword(email)
        if (typeof(ret) === 'string') {
            setErrorMessage(ret)
            setShowSpinner(false)
        } else {
            setSuccess(true)
            setShowSpinner(false)
        }
    }

    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return <Navigate to="/" replace />
    }

    if (!!showSpinner) {
        return (
            <>
                <Loader/>
            </>
        )
    } else if (!!success) {
        return (
            <>
                <Card cardTitle="Alterar a senha" >
                    <CardItemContainer visibility="true">
                        <CardItem>
                            <CardMessage>
                                E-mail enviado com sucesso <CheckCircledIcon />
                            </CardMessage>
                        </CardItem>
                    </CardItemContainer>  
                </Card>
            </>
        )
    } else {
        return (
            <>
                <Card cardTitle="Alterar a senha" >
                    <CardItemContainer visibility="true">
                        <form onSubmit={handleSubmit}>
                            <CardItem>
                                <CardMessage>
                                    Para alterar sua senha, informe o e-mail cadastrado e enviaremos um link com as instruções.
                                </CardMessage>
                            </CardItem>
                            <CardItem>
                                <CardInput pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="mail" placeholder="Email" inputWidth="100%" onChange={(e) => setEmail(e.target.value)}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <StyledButton primary>enviar e-mail<EnvelopeClosedIcon/></StyledButton>
                            </CardItem>
                        </form>
                    </CardItemContainer>  
                </Card>
            </>
        )
    }
}