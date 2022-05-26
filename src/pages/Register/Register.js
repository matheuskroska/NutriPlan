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
                <Card margin={"80px 0"} cardTitle="Cadastro">
                    <CardItem wrap={"initial"}>
                        <CardDescription>Eu sou um:</CardDescription>
                        <StyledRadixToggleGroup type="single" aria-label="usuario">
                            <StyledRadixButton onClick={ () => swapForm(false)} value="paciente" aria-label="Paciente">paciente</StyledRadixButton>
                            <StyledRadixButton onClick={ () => swapForm(true)} value="nutricionista" aria-label="Nutricionista">nutricionista</StyledRadixButton>
                        </StyledRadixToggleGroup>
                    </CardItem>
                        <CardItemContainer visibility={visibility}>
                            <CardItem>
                                <CardDescription>Para concluir o cadastro, preencha o formulário abaixo</CardDescription>
                            </CardItem>
                            <form onSubmit={handleSubmit}>
                            <CardItem>
                                <CardInput autoComplete="off" pattern="[A-Za-z0-9]{2,20}" required placeholder="Nome" inputWidth="calc(50% - 46px)" name="firstname" onChange={handleChange}></CardInput>
                                <CardInput autoComplete="off" pattern="[A-Za-z0-9]{2,20}" required placeholder="Sobrenome" inputWidth="calc(50% - 46px)" name="lastname" onChange={handleChange}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/>Nome e Sobrenome deve conter de 2 a 20 caracteres</ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <CardInput pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="email" placeholder="Email" inputWidth="100%" name="email" onChange={handleChange} autoComplete="off"></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <CardInputMask mask='99' pattern={"[0-9]{2}"} required placeholder="DDD" inputWidth="calc(18% - 46px)" name="ddd" onChange={handleChange}></CardInputMask>
                                <CardInputMask mask='9999-9999' pattern={"[0-9]{4}-[0-9]{4}"} required placeholder="Telefone" inputWidth="calc(82% - 46px)" name="phone" onChange={handleChange}></CardInputMask>
                                <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <CardInputMask id="cpf" mask='999.999.999-99' required pattern={"[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"} placeholder="CPF" name="cpf" onChange={handleChange} autoComplete="off"></CardInputMask>
                                <ErrorMessage><ExclamationTriangleIcon/>{cpfError}</ErrorMessage>
                            </CardItem>
                                <Animated.div show={userCategory} mountAnim={`0% {opacity: 0}100% {opacity: 1}`}>
                                    <CardItem>
                                        <CardInput required={false} placeholder="CRN" inputWidth="100%" name="crn" onChange={handleChange} autoComplete="off"></CardInput>
                                        <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                                    </CardItem>
                                </Animated.div>
                            <CardItem>
                                <CardInput pattern={"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"} required type="password" placeholder="Senha" inputWidth="100%" name="password" onChange={handleChangePwd}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/>Senha deve ter de 8 a 20 caraceteres, 1 letra, 1 número e 1 caracter especial</ErrorMessage>
                            </CardItem>
                            <CardItem>
                                <CardInput pattern={"^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"} type="password" placeholder="Confirme sua senha" inputWidth="100%" name="conf_password" onChange={verifyPassword}></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/>Senhas Diferentes</ErrorMessage>
                            </CardItem>
                            <StyledButton primary hasIcon marginTop={"20px"}>cadastrar<ArrowRightIcon/></StyledButton>
                            </form>
                        </CardItemContainer>
                </Card>
            </>
        )
    }
}