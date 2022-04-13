import React, { useContext, useState } from 'react';
import { StyledButton } from '../../components/Button/Button.elements';
import { CardItem, CardInput, CardItemContainer, CardMessage } from '../../components/Card/Card.elements';
import { Card, Loader } from '../../components/index';
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import LoginModel from '../../db/LoginModel';

export const ForgotPassword = () => {

    const [email, setEmail] = useState(false)
    const [success, setSuccess] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const handleSubmit = async() => {
        setShowSpinner(true)
        // let userData = await Abstract.getUserByEmail(email)
        let ret = await LoginModel.sendEmailResetPassword(email)
        if (!!ret) {
            setSuccess(true)
            setShowSpinner(false)
        } else {
            alert(ret)
        }
    }

    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return <Navigate to="/" replace />
    }

    return (
        <>
        { !!showSpinner && 
        <>
            <Loader/>
        </>}
        {!!success ? (
            <Card cardTitle="Alterar a senha" >
                <CardItemContainer visibility={true}>
                    <CardItem>
                        <CardMessage>
                            E-mail enviado com sucesso <CheckCircledIcon />
                        </CardMessage>
                    </CardItem>
                </CardItemContainer>  
            </Card>
        ) : (
            <Card cardTitle="Alterar a senha" >
                <CardItemContainer visibility={true}>
                    <CardItem>
                        <CardMessage>
                            Para alterar sua senha, informe o e-mail cadastrado e enviaremos um link com as instruções.
                        </CardMessage>
                    </CardItem>
                    <CardItem>
                        <CardInput type="mail" placeholder="Email" inputWidth="100%" onChange={(e) => setEmail(e.target.value)}></CardInput>
                    </CardItem>
                    <CardItem>
                        <StyledButton onClick={handleSubmit} primary>enviar e-mail</StyledButton>
                    </CardItem>
                </CardItemContainer>  
            </Card>
        )}
        </>
    )
}