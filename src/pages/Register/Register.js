import React, { useContext, useState } from 'react'
import { StyledButton, StyledRadixButton, StyledRadixToggleGroup } from '../../components/Button/Button.elements'
import { CardItem, CardInput, CardItemContainer, CardDescription, CardInputMask } from '../../components/Card/Card.elements'
import { Card, Loader } from '../../components/index'
import { ArrowRightIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import UserModel from '../../db/UserModel'
import { AuthContext } from '../../firebase/Auth'
import { Navigate, useNavigate } from "react-router-dom"
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage'
import Animated from "react-mount-animation";
import NutritionistModel from '../../db/NutritionistModel'
import PatientModel from '../../db/PatientModel'
import { Errors } from '../../firebase/Errors'
import { ModalMessage } from '../../components/ModalMessage/ModalMessage'
import { Translator } from '../../components/I18n'
import { useTranslation } from 'react-i18next'

export const Register = () => {
    const [visibility, setVisibility] = useState(false)
    const [cpfError, setcpfError] = useState("Formato Inválido");
    const [message, setMessage] = useState();
    const [modalMessage, setModalMessage] = useState(false);
    const [loader, setLoader] = useState(false)
    const [userCategory, setUserCategory] = useState(null)
    const [tempPwd, setTempPwd] = useState(null)
    const [success, setSuccess] = useState(false)
    const [user, setUser] = useState({
        uuid: null,
        firstname: null,
        lastname: null,
        displayName: null,
        email: null,
        ddd: null,
        phone: null,
        cpf: null,
        crn: null,
        password: null,
        conf_password: null,
    })
    const userModel = new UserModel()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const swapForm = (userCategory, e) => {
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""))
        setVisibility(true);
        setUserCategory(userCategory)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoader(true)
        await registerUser()
    }

    const registerUser = async() => {
        let _password = null
        for (let column in user) {
            if (column === 'password') {
                if (user[column] !== null) {
                    _password = user[column]
                } else {
                    return
                }
            }

            if (column === 'conf_password') {
                if (user[column] !== null) {
                    if (_password === user[column]) {
                        let hasUser = await userModel.hasUser(user)
                        if (hasUser) {
                            setLoader(false)
                            setMessage("CPF já existente");
                            setModalMessage(true)
                        } else {
                            let nutritionistModel = null
                            let patientModel = null
                            let ret = null
                            if (!!userCategory) {
                                nutritionistModel = new NutritionistModel()
                                ret = await nutritionistModel.add(user) // recebe como retorno o ID documento ou a mensagem de erro
                            } else {
                                patientModel = new PatientModel()
                                ret = await patientModel.add(user) // recebe como retorno o ID documento ou a mensagem de erro
                            }
                            setLoader(false)
                            if (!!Errors[ret]) {
                                setMessage(Errors[ret]);
                            } else {
                                setSuccess(true)
                                setMessage("Cadastro realizado com sucesso! Por favor, aguarde até que seu login seja liberado.");
                            }
                            setModalMessage(true)
                        }
                    } else {
                        return
                    }
                } else {
                    return
                }
            }
        }
    }

    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return <Navigate to="/" replace />
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target
        let pass = document.getElementById("cpf");
        if (!!!e.target.value.match(/_/gi) && e.target.id === "cpf") {
            let sanitized = e.target.value.replace(/[^\w\s]/gi, '')
            if(testaCPF(sanitized)) {
            } else {
                pass.setCustomValidity("CPF Incorreto");
                setcpfError("CPF Incorreto") 
            }
        } else if (e.target.id === "cpf") {
            pass.setCustomValidity("");
            setcpfError("Formato Inválido")
        }

        if (name === "firstname") {
            let displayNameVal = user.firstname + ' ' + value
            setUser(prev => ({
                ...prev,
                displayName: displayNameVal
            }))
        }

        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangePwd = (e) => {
        setTempPwd(e.target.value)
        handleChange(e)
    }

    const verifyPassword = (e) => {
        let cpassword = e.target.value
        if (tempPwd) {
            if ((tempPwd.length <= cpassword.length) && (tempPwd !== cpassword)) {
                console.log(tempPwd.length)
            } else {
                handleChange(e)
            }
        }
    }

    const pull_data = (data, propsSuccess) => {
        setModalMessage(data)
        if (!!propsSuccess) {
            navigate("/login", { replace: true });
        }
    }

    const testaCPF = (strCPF) => {
        var Soma;
        var Resto;
        var i = 0;
        Soma = 0;
        if (strCPF === "00000000000") return false;

        for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10)) ) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
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
                {modalMessage && (
                    <>
                        <ModalMessage func={pull_data} success={success}>{message}</ModalMessage>
                    </>
                )}
                <Card margin={"80px 0"} cardTitle={<Translator path="register"/>}>
                    <CardItem wrap={"initial"}>
                        <CardDescription><Translator path="Iam"/></CardDescription>
                        <StyledRadixToggleGroup type="single" aria-label="usuario">
                            <StyledRadixButton onClick={ () => swapForm(false)} value="paciente" aria-label="Paciente"><Translator path="patient"/></StyledRadixButton>
                            <StyledRadixButton onClick={ () => swapForm(true)} value="nutricionista" aria-label="Nutricionista"><Translator path="nutritionist"/></StyledRadixButton>
                        </StyledRadixToggleGroup>
                    </CardItem>
                        <CardItemContainer visibility={visibility}>
                            <CardItem>
                                <CardDescription><Translator path="finishRegister"/></CardDescription>
                            </CardItem>
                            <form onSubmit={handleSubmit}>
                            <CardItem>
                                <CardInput autoComplete="off" pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}" required placeholder={`${t('firstName')}`} inputWidth="calc(50% - 46px)" name="firstname" onChange={handleChange} defaultValue={user.firstname}></CardInput>
                                <CardInput autoComplete="off" pattern="[A-Za-zÀ-ÖØ-öø-ÿ]{2,20}" required placeholder={`${t('lastName')}`} inputWidth="calc(50% - 46px)" name="lastname" onChange={handleChange} defaultValue={user.lastname}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/><Translator path="errorName"/></ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <CardInput pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="email" placeholder="E-mail" inputWidth="100%" name="email" onChange={handleChange} autoComplete="off" defaultValue={user.email}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <CardInputMask mask='99' pattern={"[0-9]{2}"} required placeholder="DDD" inputWidth="calc(18% - 46px)" name="ddd" onChange={handleChange} defaultValue={user.ddd}></CardInputMask>
                                <CardInputMask mask='9999-9999' pattern={"[0-9]{4}-[0-9]{4}"} required placeholder={`${t('phone')}`} inputWidth="calc(82% - 46px)" name="phone" onChange={handleChange} defaultValue={user.phone}></CardInputMask>
                                <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <CardInputMask id="cpf" mask='999.999.999-99' required pattern={"[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"} placeholder="CPF" name="cpf" onChange={handleChange} autoComplete="off" defaultValue={user.cpf}></CardInputMask>
                                <ErrorMessage><ExclamationTriangleIcon/>{cpfError}</ErrorMessage>
                            </CardItem>
                                <Animated.div show={userCategory} mountAnim={`0% {opacity: 0}100% {opacity: 1}`}>
                                    <CardItem>
                                        <CardInput required={false} placeholder="CRN" inputWidth="100%" name="crn" onChange={handleChange} autoComplete="off" defaultValue={user.crn}></CardInput>
                                        <ErrorMessage><ExclamationTriangleIcon/><Translator path="invalidFormat"/></ErrorMessage>
                                    </CardItem>
                                </Animated.div>
                            <CardItem>
                                <CardInput pattern={"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"} required type="password" placeholder={`${t('pwd')}`} inputWidth="100%" name="password" onChange={handleChangePwd} defaultValue={user.password}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/><Translator path="errorPwd"/></ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <CardInput pattern={"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"} type="password" placeholder={`${t('confPwd')}`} inputWidth="100%" name="conf_password" onChange={verifyPassword} defaultValue={user.conf_password}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/><Translator path="errorConfPwd"/></ErrorMessage>
                            </CardItem>
                            <StyledButton primary hasIcon marginTop={"20px"}><Translator path="bRegister"/><ArrowRightIcon/></StyledButton>
                            </form>
                        </CardItemContainer>
                </Card>
            </>
        )
    }
}