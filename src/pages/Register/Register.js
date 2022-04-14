import React, { useContext, useState } from 'react'
import { StyledButton, StyledRadixButton, StyledRadixToggleGroup } from '../../components/Button/Button.elements'
import { CardItem, CardInput, CardItemContainer, CardDescription } from '../../components/Card/Card.elements'
import { Card, Loader } from '../../components/index'
import { ArrowRightIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import Patients from '../../db/Patients'
import { AuthContext } from '../../firebase/Auth'
import { Navigate } from "react-router-dom"
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage'
import Animated from "react-mount-animation";
import Nutritionists from '../../db/Nutritionists'

export const Register = () => {

    const [visibility, setVisibility] = useState(false)
    const [loader, setLoader] = useState(false)
    const [userCategory, setUserCategory] = useState(null)
    const [tempPwd, setTempPwd] = useState(null)
    const [patient, setPatient] = useState({
        uuid: null,
        firstname: null,
        lastname: null,
        email: null,
        ddd: null,
        phone: null,
        cpf: null,
        password: null,
        conf_password: null,
    })
    const [nutritionist, setNutritionist] = useState({
        uuid: null,
        firstname: null,
        lastname: null,
        email: null,
        ddd: null,
        phone: null,
        cpf: null,
        crn: null,
        password: null,
        conf_password: null,
    })

    const initialStatus = {
        uuid: null,
        firstname: null,
        lastname: null,
        email: null,
        ddd: null,
        phone: null,
        cpf: null,
        crn: null,
        password: null,
        conf_password: null,
    }

    const [status, setStatus] = useState(initialStatus)

    const swapForm = (userCategory, e) => {
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""))
        setStatus({...initialStatus})
        setVisibility(true);
        
        setUserCategory(userCategory)
    }
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!!userCategory) {
            setLoader(true)
            await registerNutritionist()
        } else {
            setLoader(true)
            await registerPatient()
        }
    }

    const registerPatient = async() => {
        let _password = null
        for (let column in patient) {
            if (column === 'password') {
                if (patient[column] !== null) {
                    _password = patient[column]
                    setStatus({password: false})
                } else {
                    setStatus({password: true})
                    return
                }
            }

            if (column === 'conf_password') {
                if (patient[column] !== null) {
                    if (_password === patient[column]) {
                        setStatus({conf_password: false})
                        let hasPatient = await Patients.hasPatient(patient)
                        if (hasPatient) {
                            setStatus({cpf: true})
                            setLoader(false)
                        } else {
                            setStatus({cpf: false})
                            await Patients.addUser(patient) // recebe como retorno o ID documento ou a mensagem de erro
                        }
                    } else {
                        setStatus({conf_password: true})
                        return
                    }
                } else {
                    setStatus({conf_password: true})
                    return
                }
            }
        }
    }

    const registerNutritionist = async() => {
        let _password = null
        for (let column in nutritionist) {
            if (column === 'password') {
                if (nutritionist[column] !== null) {
                    _password = nutritionist[column]
                    setStatus({password: false})
                } else {
                    setStatus({password: true})
                    return
                }
            }

            if (column === 'conf_password') {
                if (nutritionist[column] !== null) {
                    if (_password === nutritionist[column]) {
                        setStatus({conf_password: false})
                        let hasNutritionist = await Nutritionists.hasNutritionist(nutritionist)
                        if (!!hasNutritionist) {
                            setStatus({cpf: true})
                            setLoader(false)
                        } else {
                            setStatus({cpf: false})
                            await Nutritionists.addUser(nutritionist) // recebe como retorno o ID documento ou a mensagem de erro
                        }
                    } else {
                        setStatus({conf_password: true})
                        return
                    }
                } else {
                    setStatus({conf_password: true})
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
        if (!!userCategory) {
            setNutritionist(prev => ({
                ...prev,
                [name]: value
            }))
        } else {
            setPatient(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleChangePwd = (e) => {
        setTempPwd(e.target.value)
        handleChange(e)
    }

    const verifyPassword = (e) => {
        let cpassword = e.target.value
        if (tempPwd) {
            if ((tempPwd.length <= cpassword.length) && (tempPwd !== cpassword)) {
                setStatus({conf_password: true});
            } else {
                setStatus({conf_password: false});
                handleChange(e)
            }
        }
    }
    
    return (
        <>
            { !!loader && 
            <>
                <Loader/>
            </>}    
            <Card cardTitle="Cadastro" >
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
                            <CardInput required placeholder="DDD" inputWidth="calc(18% - 46px)" name="ddd" onChange={handleChange}></CardInput>
                            <CardInput required placeholder="Telefone" inputWidth="calc(82% - 46px)" name="phone" onChange={handleChange}></CardInput>
                            <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                        </CardItem>
                        <CardItem>
                            <CardInput placeholder="CPF" name="cpf" onChange={handleChange} autoComplete="off"></CardInput>
                            <ErrorMessage><ExclamationTriangleIcon/>CPF inválido</ErrorMessage>
                        </CardItem>
                            <Animated.div show={userCategory} mountAnim={`0% {opacity: 0}100% {opacity: 1}`}>
                                <CardItem>
                                    <CardInput required={false} placeholder="CRN" inputWidth="100%" name="crn" onChange={handleChange}></CardInput>
                                    <ErrorMessage><ExclamationTriangleIcon/>CRN inválido</ErrorMessage>
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
                        <StyledButton onClick={() => console.log("teste")} primary hasIcon>cadastrar<ArrowRightIcon/></StyledButton>
                        </form>
                    </CardItemContainer>    
            </Card>
        </> 
    )
}