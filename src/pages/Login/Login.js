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
        if (!!Errors[ret]) {
            setLoader(false)
            setError(Errors[ret])
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
                            <CardInput pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="mail" placeholder="Email" inputWidth="100%" onChange={(e) => setEmail(e.target.value)} defaultValue={email}></CardInput>
                            <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                        </CardItem>
                        <CardItem>
                            <CardInput required type="password" placeholder="Senha" inputWidth="100%" onChange={(e) => setPassword(e.target.value)} defaultValue={password}></CardInput>
                        </CardItem>
                        <CardItem>
                            <Link to="/alterar-senha" forgotpwd>esqueci minha senha</Link>
                        </CardItem>
                        <CardItem>
                            <StyledButton primary hasIcon marginTop={"20px"}>entrar<EnterIcon/></StyledButton>
                        </CardItem>
                    </form>
                </CardItemContainer>  
            </Card>
        </>
    )
}