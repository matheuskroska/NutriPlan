import React, { useContext, useState } from 'react';
import { StyledButton } from '../../components/Button/Button.elements';
import { CardItem, CardInput, CardItemContainer, CardMessage } from '../../components/Card/Card.elements';
import { Card } from '../../components/index';
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import LoginModel from '../../db/LoginModel';

export const ForgotPassword = () => {

    const [email, setEmail] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const handleSubmit = async() => {
        // let userData = await Abstract.getUserByEmail(email)
        let ret = await LoginModel.sendEmailResetPassword(email)
        if (!!ret) {
            setShowSpinner(true)
        } else {
            alert(ret)
        }
    }

    // Código abaixo baseado no link: https://firebase.google.com/docs/auth/custom-email-handler?authuser=0&hl=pt
    const getParameterByName = (name) => {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( window.location.href );
        if( results == null )
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    const mode = getParameterByName('mode')
    const actionCode = getParameterByName('oobCode')
    const continueUrl = window.location.hostname + ':' + window.location.port
    const lang = getParameterByName('lang') || 'pt'

    // switch (mode) {
    //     case 'resetPassword':
    //         // Display reset password handler and UI.
    //         handleResetPassword(actionCode, continueUrl, lang);
    //         break;
    //     // case 'recoverEmail':
    //     //     // Display email recovery handler and UI.
    //     //     handleRecoverEmail(actionCode, lang);
    //     //     break;
    //     // case 'verifyEmail':
    //     //     // Display email verification handler and UI.
    //     //     handleVerifyEmail(actionCode, continueUrl, lang);
    //     //     break;
    //     default:
    //         // Error: invalid mode.
    // }

    // Código acima baseado no link: https://firebase.google.com/docs/auth/custom-email-handler?authuser=0&hl=pt

    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return <Navigate to="/" replace />
    }

    return (
        <>
        {!!showSpinner ? (
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
                        <StyledButton onClick={handleSubmit} primary>Enviar e-mail</StyledButton>
                    </CardItem>
                </CardItemContainer>  
            </Card>
        )}
        </>
    )
}