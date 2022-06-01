import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth';
import { Card, InfoMenu, Loader } from '../../components';
import { CardContainer, CardInput, CardInputMask, CardItem, CardItemContainer } from '../../components/Card/Card.elements';
import { StyledButton } from '../../components/Button/Button.elements';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ArrowRightIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Animated from 'react-mount-animation';
import UserModel from '../../db/UserModel';
import NutritionistModel from '../../db/NutritionistModel';

export const EditUser = () => {
    const { currentUser } = useContext(AuthContext)
    const { uuid } = useParams();
    const [user, setUser] = useState(null)
    const [crn, setCrn] = useState(null)
    const [loader, setLoader] = useState(true)
    const userModel = new UserModel()
    const nutritionistModel = new NutritionistModel()

    console.log(user)

    const getUserData = async () => {
        let userData = await userModel.getUserByUid(uuid)
        let crnTemp = await nutritionistModel.getCrnByUuid(uuid)
        !!crnTemp && setCrn(crnTemp)
        if (userData !== null) {
            setUser(userData)
            setLoader(false)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await changeUserData()
    }

    const changeUserData = async() => {
        await userModel.updateUser(user);
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // nome: user.firstname,
    // sobrenome: user.lastname,
    // email: user.email,
    // ddd: user.ddd,
    // telefone: user.phone,

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!!!currentUser.isAdmin) {
        return <Navigate to="/editar-perfil" replace />
    } else if (!!currentUser.isAdmin && !!!user) {
        getUserData()
    }

    if (!!loader) {
        return (
            <>
                <Loader/>
            </>
        )
    } else {
        return (
            <>  
                <Card maxWidth={"100%"}>
                    <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                        <InfoMenu />
                        <Card margin={"0 auto"} showTitle={"none"}>
                            <CardItemContainer visibility={true}>
                                <form onSubmit={handleSubmit}>
                                <CardItem>
                                    <CardInput onChange={handleChange} defaultValue={user.nome} autoComplete="off" pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}" required placeholder="Nome" inputWidth="calc(50% - 46px)" name="firstname"></CardInput>
                                    <CardInput onChange={handleChange} defaultValue={user.sobrenome} autoComplete="off" pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}" required placeholder="Sobrenome" inputWidth="calc(50% - 46px)" name="lastname"></CardInput>
                                    <ErrorMessage><ExclamationTriangleIcon/>Nome e Sobrenome deve conter de 2 a 20 caracteres</ErrorMessage>
                                </CardItem>
                                <CardItem>
                                    <CardInput onChange={handleChange} defaultValue={user.email} pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="email" placeholder="Email" inputWidth="100%" name="email" autoComplete="off"></CardInput>
                                    <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                                </CardItem>
                                <CardItem>
                                    <CardInputMask onChange={handleChange} defaultValue={user.ddd} mask='99' pattern={"[0-9]{2}"} required placeholder="DDD" inputWidth="calc(18% - 46px)" name="ddd" ></CardInputMask>
                                    <CardInputMask onChange={handleChange} defaultValue={user.telefone} mask='9999-9999' pattern={"[0-9]{4}-[0-9]{4}"} required placeholder="Telefone" inputWidth="calc(82% - 46px)" name="phone" ></CardInputMask>
                                    <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                                </CardItem>
                                <CardItem>
                                    <CardInputMask onChange={handleChange} defaultValue={user.cpf} disabled id="cpf" mask='999.999.999-99' required pattern={"[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"} placeholder="CPF" name="cpf" autoComplete="off"></CardInputMask>
                                    <ErrorMessage><ExclamationTriangleIcon/></ErrorMessage>
                                </CardItem>
                                    <Animated.div onChange={handleChange} show={true} mountAnim={`0% {opacity: 0}100% {opacity: 1}`}>
                                        <CardItem>
                                            <CardInput onChange={handleChange} defaultValue={crn} disabled required={false} placeholder="CRN" inputWidth="100%" name="crn" autoComplete="off"></CardInput>
                                            <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                                        </CardItem>
                                    </Animated.div>
                                <StyledButton primary hasIcon marginTop={"20px"}>Salvar<ArrowRightIcon/></StyledButton>
                                </form>
                            </CardItemContainer>
                        </Card>
                    </CardContainer>
                </Card>   
            </>
        )
    }
}
