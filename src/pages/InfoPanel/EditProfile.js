import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth';
import { Card, InfoMenu, Loader } from '../../components';
import { CardContainer, CardInput, CardInputMask, CardItem, CardItemContainer } from '../../components/Card/Card.elements';
import { StyledButton } from '../../components/Button/Button.elements';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ExclamationTriangleIcon, PlusIcon } from '@radix-ui/react-icons';
import Animated from 'react-mount-animation';
import UserModel from '../../db/UserModel';
import { ModalMessage } from '../../components/ModalMessage/ModalMessage';
import { Translator } from '../../components/I18n';
import { useTranslation } from 'react-i18next';

export const EditProfile = () => {
    const { currentUser } = useContext(AuthContext)
    const [user, setUser] = useState({
        uuid: currentUser.uuid,
        firstname: currentUser.nome,
        lastname: currentUser.sobrenome,
        email: currentUser.email,
        ddd: currentUser.ddd,
        phone: currentUser.telefone,
        cpf: currentUser.cpf,
        crn: currentUser.crn,
    })
    const [modalMessage, setModalMessage] = useState(false);
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState()
    const { t } = useTranslation()

    const handleChange = (e) => {
        const { name, value } = e.target

        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        setLoader(true)
        e.preventDefault()
        await changeUserData()
        setMessage(t('dataChanged'));
        setModalMessage(true)
        setLoader(false)
    }

    const changeUserData = async() => {
        let userModel = new UserModel();
        await userModel.updateUser(user);
    }

    const pull_data = (data, propsSuccess) => {
        setModalMessage(!data)
        if (!!propsSuccess) {
            window.location.reload()
        }
    }

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
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
                <ModalMessage func={pull_data} success={true}>{message}</ModalMessage>
            </>
        )}
            <Card className="editUser" cardTitle={<Translator path="editProfile"/>} maxWidth={"100%"} borderRadius={"0"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu/>
                    <Card margin={"0 auto"} showTitle={"none"} >
                    <CardItemContainer visibility={true}>
                        <form onSubmit={handleSubmit}>
                        <CardItem>
                            <CardInput onChange={handleChange} defaultValue={currentUser.nome} autoComplete="off" pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}" required placeholder={`${t('firstName')}`} inputWidth="calc(50% - 46px)" name="firstname"></CardInput>
                            <CardInput onChange={handleChange} defaultValue={currentUser.sobrenome} autoComplete="off" pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}" required placeholder={`${t('lastName')}`} inputWidth="calc(50% - 46px)" name="lastname"></CardInput>
                            <ErrorMessage><ExclamationTriangleIcon/><Translator path="errorName"/></ErrorMessage>
                        </CardItem>
                        <CardItem>
                            <CardInput onChange={handleChange} disabled defaultValue={currentUser.email} pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="email" placeholder="E-mail" inputWidth="100%" name="email" autoComplete="off"></CardInput>
                            <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                        </CardItem>
                        <CardItem>
                                    <CardInputMask onChange={handleChange} defaultValue={currentUser.ddd} mask='99' pattern={"[0-9]{2}"} required placeholder="DDD" inputWidth="initial" maxWidth="60px" name="ddd" ></CardInputMask>
                            <CardInputMask onChange={handleChange} defaultValue={currentUser.telefone} mask='9999-9999' pattern={"[0-9]{4}-[0-9]{4}"} required placeholder={`${t('phone')}`} inputWidth="initial" name="phone" ></CardInputMask>
                            <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                        </CardItem>
                        <CardItem>
                            <CardInputMask onChange={handleChange} defaultValue={currentUser.cpf} disabled id="cpf" mask='999.999.999-99' required pattern={"[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"} placeholder="CPF" name="cpf" autoComplete="off"></CardInputMask>
                            <ErrorMessage><ExclamationTriangleIcon/></ErrorMessage>
                        </CardItem>
                            {currentUser.isNutri && 
                            <Animated.div show={true} mountAnim={`0% {opacity: 0}100% {opacity: 1}`}>
                                <CardItem>
                                    <CardInput onChange={handleChange} defaultValue={currentUser.crn} disabled required={false} placeholder="CRN" inputWidth="100%" name="crn" autoComplete="off"></CardInput>
                                    <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                                </CardItem>
                            </Animated.div>
                            }
                        <StyledButton primary hasIcon marginTop={"20px"}><Translator path="save"/><PlusIcon/></StyledButton>
                        </form>
                    </CardItemContainer>
                    </Card>
                </CardContainer>
            </Card>
        </>
    )
}
