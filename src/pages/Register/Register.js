import React, { useContext, useState } from 'react'
import { StyledButton, StyledRadixButton, StyledRadixToggleGroup } from '../../components/Button/Button.elements'
import { CardItem, CardInput, CardItemContainer, CardDescription } from '../../components/Card/Card.elements'
import { Card } from '../../components/index'
import { ArrowRightIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import Patients from '../../db/Patients'
import { AuthContext } from '../../firebase/Auth'
import { Navigate } from "react-router-dom"
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage'
import SmoothRender from 'react-smooth-render';


export const Register = () => {

    const [visibility, setVisibility] = useState(false)
    const [userCategory, setUserCategory] = useState(null)
    const [tempPwd, setTempPwd] = useState(null)
    const [patient, setPatient] = useState({
        uuid: null,
        name: null,
        surname: null,
        email: null,
        ddd: null,
        phone: null,
        cpf: null,
        password: null,
        conf_password: null,
    })

    const initialStatus = {
        uuid: null,
        name: null,
        surname: null,
        email: null,
        ddd: null,
        phone: null,
        cpf: null,
        crn: null,
        password: null,
        conf_password: null,
    }

    const [status, setStatus] = useState(initialStatus)


    // let collection = "";
    // collection = document.getElementsByClassName("toggleButton");
    // collection[0].addEventListener("click", function() {
    //     console.log("0")
    // })
    //userCategory determina o tipo de cadastro (paciente/nutricionista)

    const swapForm = (userCategory, e) => {
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""))
        setStatus({...initialStatus})
        setVisibility(true);
        setUserCategory(userCategory)
    }
    

    const handleSubmit = async() => {
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
                        let ret = await Patients.hasPatient(patient)
                        if (ret) {
                            setStatus({cpf: true})
                        } else {
                            setStatus({cpf: false})
                            let retAdd = await Patients.addUser(patient, userCategory) // recebe como retorno o ID documento ou a mensagem de erro
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
        setPatient(prev => ({
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
                setStatus({conf_password: true});
            } else {
                setStatus({conf_password: false});
                handleChange(e)
            }
        }
    }
    
    return (
        <>
            <Card cardTitle="Cadastro" >
                <CardItem>
                    <CardDescription>Eu sou um:</CardDescription>   
                    <StyledRadixToggleGroup type="single" aria-label="usuario">
                        <StyledRadixButton className="toggleButton" onClick={ () => swapForm(false)} value="paciente" aria-label="Paciente">paciente</StyledRadixButton>
                        <StyledRadixButton className="toggleButton" onClick={ () => swapForm(true)} value="nutricionista" aria-label="Nutricionista">nutricionista</StyledRadixButton>
                    </StyledRadixToggleGroup>
                </CardItem> 
                    <CardItemContainer visibility={visibility}>
                        <CardItem>
                            <CardDescription>Para concluir o cadastro, preencha o formulário abaixo</CardDescription>   
                        </CardItem>
                        <CardItem>
                            <CardInput placeholder="Nome" inputWidth="50%" name="name" onChange={handleChange}></CardInput>
                            <CardInput placeholder="Sobrenome" inputWidth="50%" name="surname" onChange={handleChange}></CardInput>
                        </CardItem>
                        <CardItem>

                        </CardItem>
                        <CardItem>
                            <CardInput type="mail" placeholder="Email" inputWidth="100%" name="email" onChange={handleChange} autoComplete="off"></CardInput>
                        </CardItem>
                        <CardItem>
                            
                        </CardItem>
                        <CardItem>
                            <CardInput placeholder="DDD" inputWidth="11%" name="ddd" onChange={handleChange}></CardInput>
                            <CardInput  placeholder="Telefone" inputWidth="89%" name="phone" onChange={handleChange}></CardInput>
                        </CardItem>
                        <CardItem>
                            
                        </CardItem>
                        <CardItem>
                            <CardInput placeholder="CPF" name="cpf" onChange={handleChange} autoComplete="off"></CardInput>
                        </CardItem>
                        <CardItem>
                            
                        </CardItem>
                        <SmoothRender hidden={!userCategory} timing={500}>
                                <CardItem>
                                    <CardInput  placeholder="CRN" inputWidth="100%" name="crn" onChange={handleChange}></CardInput>
                                </CardItem>
                                <CardItem>
                                {status.crn && (
                                    <>
                                        <ErrorMessage><ExclamationTriangleIcon/>Senha não pode ser vazio</ErrorMessage>
                                    </> 
                                )}
                                </CardItem>
                        </SmoothRender>  
                        <CardItem>
                            <CardInput type="password" placeholder="Senha" inputWidth="100%" name="password" onChange={handleChangePwd}></CardInput>
                        </CardItem>
                        <CardItem>
                            {status.password && (
                                <>
                                <ErrorMessage><ExclamationTriangleIcon/>Senha não pode ser vazia</ErrorMessage>
                                </>
                            )}
                            
                        </CardItem>
                        <CardItem>
                            <CardInput type="password" placeholder="Confirme sua senha" inputWidth="100%" name="conf_password" onChange={verifyPassword}></CardInput>
                        </CardItem>
                        <CardItem>
                            {status.conf_password && (
                                <>
                                    <ErrorMessage><ExclamationTriangleIcon/>Senha não é igual</ErrorMessage>
                                </>
                            )}
                        </CardItem>
                        <StyledButton onClick={handleSubmit} primary hasIcon>cadastrar<ArrowRightIcon/></StyledButton>
                    </CardItemContainer>    
            </Card>
        </> 
    )
}