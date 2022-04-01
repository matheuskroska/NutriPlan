import React, { useContext, useState } from 'react'
import { StyledButton, StyledRadixButton, StyledRadixToggleGroup } from '../../components/Button/Button.elements'
import { CardItem, CardInput, CardItemContainer, CardDescription } from '../../components/Card/Card.elements'
import { Card } from '../../components/index'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Patients from '../../db/Patients'
import { AuthContext } from '../../firebase/Auth'
import { Navigate } from "react-router-dom"

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
    //userCategory determina o tipo de cadastro (paciente/nutricionista)

    const swapForm = (userCategory) => {
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""))
        setVisibility(true)
        setUserCategory(userCategory)
    }

    const handleSubmit = async() => {
        let _password = null
        for (let column in patient) {
            if (column === 'password') {
                if (patient[column] !== null) {
                    _password = patient[column]
                } else {
                    alert('Campo "Senha" não pode estar vazio')
                    return
                }
            }

            if (column === 'conf_password') {
                if (patient[column] !== null) {
                    if (_password === patient[column]) {
                        let ret = await Patients.hasPatient(patient)
                        if (ret) {
                            alert('Já existe um paciente com esse CPF')
                        } else {
                            let retAdd = await Patients.addUser(patient, userCategory) // recebe como retorno o ID documento ou a mensagem de erro
                        }
                    } else {
                        alert('Senhas não são iguais')
                        return
                    }
                } else {
                    alert('Campo "Confirme sua senha" não pode estar vazio')
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
                alert('as senhas tão diferentes')
            } else {
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
                        <StyledRadixButton onClick={ () => swapForm(false)} value="paciente" aria-label="Paciente">paciente</StyledRadixButton>
                        <StyledRadixButton onClick={ () => swapForm(true)} value="nutricionista" aria-label="Nutricionista">nutricionista</StyledRadixButton>
                    </StyledRadixToggleGroup>
                </CardItem> 
                <CardItemContainer show={visibility}>
                    <CardItem>
                        <CardDescription>Para concluir o cadastro, preencha o formulário abaixo</CardDescription>   
                    </CardItem>
                    <CardItem>
                        <CardInput placeholder="Nome" inputWidth="50%" name="name" onChange={handleChange}></CardInput>
                        <CardInput placeholder="Sobrenome" inputWidth="50%" name="surname" onChange={handleChange}></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput type="mail" placeholder="Email" inputWidth="100%" name="email" onChange={handleChange} autoComplete="off"></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput placeholder="DDD" inputWidth="11%" name="ddd" onChange={handleChange}></CardInput>
                        <CardInput  placeholder="Telefone" inputWidth="89%" name="phone" onChange={handleChange}></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput placeholder="CPF" name="cpf" onChange={handleChange} autoComplete="off"></CardInput>
                    </CardItem>
                    {userCategory ? (
                        <>
                            <CardItem>
                                <CardInput  placeholder="CRN" inputWidth="100%" name="crn" onChange={handleChange}></CardInput>
                            </CardItem>
                        </>
                    ): 
                    <>
                    </>
                    }     
                    <CardItem>
                        <CardInput type="password" placeholder="Senha" inputWidth="100%" name="password" onChange={handleChangePwd}></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput type="password" placeholder="Confirme sua senha" inputWidth="100%" name="conf_password" onChange={verifyPassword}></CardInput>
                    </CardItem>
                    <StyledButton onClick={handleSubmit} primary hasIcon>cadastrar<ArrowRightIcon/></StyledButton>
                </CardItemContainer>  
            </Card>
        </> 
    )
}