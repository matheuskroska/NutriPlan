import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth';
import { Card, InfoMenu, Loader } from '../../components';
import { CardContainer, CardInput, CardInputMask, CardItem, CardItemContainer } from '../../components/Card/Card.elements';
import { StyledButton } from '../../components/Button/Button.elements';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import UserModel from '../../db/UserModel';
import NutritionistModel from '../../db/NutritionistModel';
import { ModalMessage } from '../../components/ModalMessage/ModalMessage';
import { Translator } from '../../components/I18n';
import { useTranslation } from 'react-i18next';

export const EditUser = () => {
    const { currentUser } = useContext(AuthContext)
    const { uuid } = useParams();
    const [user, setUser] = useState(null)
    const [crn, setCrn] = useState(null)
    const [modalMessage, setModalMessage] = useState(false)
    const [loader, setLoader] = useState(true)
    const [message, setMessage] = useState()
    const userModel = new UserModel()
    const nutritionistModel = new NutritionistModel()
    const { t } = useTranslation()

    const getUserData = async () => {
        let userData = await userModel.getUserByUid(uuid)
        let crnTemp = await nutritionistModel.getCrnByUuid(uuid)
        !!crnTemp && setCrn(crnTemp)
        if (userData !== null) {
            setUser({
                uuid: userData.uuid,
                firstname: userData.nome,
                lastname: userData.sobrenome,
                email: userData.email,
                ddd: userData.ddd,
                phone: userData.telefone                
            })
            setLoader(false)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setMessage("Os dados foram alterados com sucesso")
        setModalMessage(true)
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

    const pull_data = (data, propsSuccess) => {
        setModalMessage(data)
    }

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!!!currentUser.isAdmin) {
        return <Navigate to="/editar-perfil" replace />
    } else if (!!currentUser.isAdmin && !!!user) {
        getUserData()
    }
  
    return (
        <>  
            {!!loader && (
                <>
                    <Loader/>
                </>
            )}
            {modalMessage && (
                <>
                    <ModalMessage func={pull_data}>{message}</ModalMessage>
                </>
            )}
            <Card cardTitle={<Translator path="editUser"/>} maxWidth={"100%"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu />
                    <Card margin={"0 auto"} showTitle={"none"}>
                        <CardItemContainer visibility={true}>
                            <form onSubmit={handleSubmit}>
                            <CardItem>
                                {loader ? (
                                <>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                </>
                                ) :
                                 <>
                                    <CardInput onChange={handleChange} defaultValue={user.firstname} autoComplete="off" pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}" required placeholder={`${t('firstName')}`} inputWidth="calc(50% - 46px)" name="firstname"></CardInput>
                                    <CardInput onChange={handleChange} defaultValue={user.lastname} autoComplete="off" pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}" required placeholder={`${t('lastName')}`} inputWidth="calc(50% - 46px)" name="lastname"></CardInput>
                                    <ErrorMessage><ExclamationTriangleIcon/><Translator path="errorName"/></ErrorMessage>    
                                 </>
                                }
                            </CardItem>
                            <CardItem>
                                {loader ? (
                                <>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                </>
                                ) :
                                 <>
                                    <CardInput onChange={handleChange} defaultValue={user.email} pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="email" placeholder="E-mail" inputWidth="100%" name="email" autoComplete="off"></CardInput>
                                    <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>   
                                 </>
                                }
                            </CardItem>
                            <CardItem>
                                {loader ? (
                                <>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                </>
                                ) :
                                 <>
                                    <CardInputMask onChange={handleChange} defaultValue={user.ddd} mask='99' pattern={"[0-9]{2}"} required placeholder="DDD" inputWidth="calc(18% - 46px)" name="ddd" ></CardInputMask>
                                    <CardInputMask onChange={handleChange} defaultValue={user.phone} mask='9999-9999' pattern={"[0-9]{4}-[0-9]{4}"} required placeholder={`${t('phone')}`} inputWidth="calc(82% - 46px)" name="phone" ></CardInputMask>
                                    <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                                 </>
                                }
                            </CardItem>
                            <CardItem>
                                {loader ? (
                                <>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                </>
                                ) :
                                 <>
                                    <CardInputMask onChange={handleChange} defaultValue={user.cpf} disabled id="cpf" mask='999.999.999-99' required pattern={"[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"} placeholder="CPF" name="cpf" autoComplete="off"></CardInputMask>
                                    <ErrorMessage><ExclamationTriangleIcon/></ErrorMessage>
                                 </>
                                }
                            </CardItem>
                                {loader ? (
                                <>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                    <CardInput disabled inputWidth="calc(50% - 46px)"></CardInput>
                                </>
                                ) :
                                 <>
                                    <CardItem>
                                        <CardInput onChange={handleChange} defaultValue={crn} disabled required={false} placeholder="CRN" inputWidth="100%" name="crn" autoComplete="off"></CardInput>
                                        <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                                    </CardItem>
                                 </>
                                }    
                            <StyledButton primary hasIcon marginTop={"20px"}><Translator path="save"/></StyledButton>
                            </form>
                        </CardItemContainer>
                    </Card>
                </CardContainer>
            </Card>   
        </>
    )
}
