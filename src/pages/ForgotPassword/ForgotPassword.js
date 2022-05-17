import React, { useContext, useState } from 'react';
import { StyledButton } from '../../components/Button/Button.elements';
import { CardItem, CardInput, CardItemContainer, CardMessage } from '../../components/Card/Card.elements';
import { Card, Loader } from '../../components/index';
import { CheckCircledIcon, EnvelopeClosedIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import LoginModel from '../../db/LoginModel';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Errors } from '../../firebase/Errors';
import { ModalMessage } from '../../components/ModalMessage/ModalMessage';

export const ForgotPassword = () => {

    const [email, setEmail] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState()
    const [modalError, setModalError] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoader(true)
        let ret = await LoginModel.sendEmailResetPassword(email)
        if (!!Errors[ret]) {
            setLoader(false)
            setError(Errors[ret])
            setModalError(true)
        } else {
            setSuccess(true)
            setLoader(false)
        }
    }

    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return <Navigate to="/" replace />
    }

    const pull_data = (data) => {
        setModalError(data);
    }

    if (!!loader) {
        return (
            <>
                <Loader/>
            </>
        )
    } else if (!!modalError) {
        return (
            <>
                <ModalMessage func={pull_data}>{error}</ModalMessage>
            </>
        )
    } else if (!!success) {
        return (
            <>
                <Card cardTitle="Alterar a senha" >
                    <CardItemContainer visibility={true}>
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
                <Card margin={"80px 0"} cardTitle="Alterar a senha" >
                    <CardItemContainer visibility={true}>
                        <form onSubmit={handleSubmit}>
                            <CardItem>
                                <CardMessage>
                                    Para alterar sua senha, informe o e-mail cadastrado<br/>enviaremos um link com as instruções.
                                </CardMessage>
                            </CardItem>
                            <CardItem>
                                <CardInput pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="mail" placeholder="Email" inputWidth="100%" onChange={(e) => setEmail(e.target.value)}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <StyledButton primary marginTop={"20px"}>enviar e-mail<EnvelopeClosedIcon/></StyledButton>
                            </CardItem>
                        </form>
                    </CardItemContainer>  
                </Card>
            </>
        )
    }
}