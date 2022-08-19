import React, { useContext, useState } from 'react';
import { StyledButton } from '../../components/Button/Button.elements';
import { CardItem, CardInput, CardItemContainer } from '../../components/Card/Card.elements';
import { Card, Loader } from '../../components/index';
import {EnterIcon, ExclamationTriangleIcon} from '@radix-ui/react-icons'
import { Link } from '../../components/Link/Link';
import UserModel from '../../db/UserModel';
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ModalMessage } from '../../components/ModalMessage/ModalMessage';
import { Errors } from '../../firebase/Errors';
import { Translator } from '../../components/I18n';

export const Login = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState();
    const [loader, setLoader] = useState(false)
    const [modalError, setModalError] = useState(false)
    const { currentUser } = useContext(AuthContext)
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoader(true)
        let userModel = new UserModel()
        let ret = await userModel.signIn(email, password)
        if (!!ret && typeof ret == 'string') {
            setLoader(false)
            setError(<Translator path={`${ret}`}/>)
            setModalError(true)
        }
    }

    if (!!currentUser) {
        return <Navigate to="/" replace />
    }

    const pull_data = (data) => {
        setModalError(data);
    }

    return (
        <>
            {!!loader && (
                <>
                    <Loader/>
                </>
            )} 
            {modalError && (
                <>
                    <ModalMessage func={pull_data}>{error}</ModalMessage>
                </>
            )}
            <Card margin={"80px 0"} cardTitle="Login" >
                <CardItemContainer visibility={true}>
                    <form onSubmit={handleSubmit}>
                        <CardItem>
                            <CardInput pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="mail" placeholder="E-mail" inputWidth="100%" onChange={(e) => setEmail(e.target.value)} defaultValue={email}></CardInput>
                            <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                        </CardItem>
                        <CardItem>
                            <CardInput required type="password" placeholder="Senha" inputWidth="100%" onChange={(e) => setPassword(e.target.value)} defaultValue={password}></CardInput>
                        </CardItem>
                        <CardItem>
                            <Link to="/alterar-senha" forgotpwd><Translator path="forgotPwd"/></Link>
                        </CardItem>
                        <CardItem>
                            <StyledButton primary hasIcon marginTop={"20px"}><Translator path="logIn"/><EnterIcon/></StyledButton>
                        </CardItem>
                    </form>
                </CardItemContainer>  
            </Card>
        </>
    )
}