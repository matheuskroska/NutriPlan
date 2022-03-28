import React, {useState} from 'react';
import { CardItem, CardInput, CardButton, CardItemContainer, CardDescription, StyledRadixItem, StyledRadixToggleGroup } from '../../components/Card/Card.elements';
import { Card } from '../../components/index';


export const Register = () => {

    const [visibility, setVisibility] = useState(false);
    const [userCategory, setUserCategory] = useState(null);
    //userCategory determina o tipo de cadastro (paciente/nutricionista)

    const displayForm = (userCategory) => {
        setVisibility(true)
        setUserCategory(userCategory)
    }
    
    return (
        <>
            <Card cardTitle="Cadastro" >
                <CardItem>
                    <CardDescription>Eu sou um:</CardDescription>   
                    <StyledRadixToggleGroup type="single" aria-label="usuario">
                        <StyledRadixItem onClick={ () => displayForm(false)} value="paciente" aria-label="Paciente">paciente</StyledRadixItem>
                        <StyledRadixItem onClick={ () => displayForm(true)} value="nutricionista" aria-label="Nutricionista">nutricionista</StyledRadixItem>
                    </StyledRadixToggleGroup>
                </CardItem> 
                <CardItemContainer show={visibility}>
                    <CardItem>
                        <CardDescription>Para concluir o cadastro, preencha o formulário abaixo</CardDescription>   
                    </CardItem>
                    <CardItem>
                        <CardInput placeholder="Nome" inputWidth="50%"></CardInput>
                        <CardInput placeholder="Sobrenome" inputWidth="50%"></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput type="mail" placeholder="Email" inputWidth="100%"></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput placeholder="DDD" inputWidth="11%"></CardInput>
                        <CardInput  placeholder="Telefone" inputWidth="89%"></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput placeholder="CPF"></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput  placeholder="Endereço" inputWidth="100%"></CardInput>
                    </CardItem>
                    {userCategory ? (
                        <>
                            <CardItem>
                                <CardInput  placeholder="CRN" inputWidth="100%"></CardInput>
                            </CardItem>
                        </>
                    ): 
                    <>
                    </>
                    }     
                    <CardItem>
                        <CardInput type="password" placeholder="Senha" inputWidth="100%"></CardInput>
                    </CardItem>
                    <CardItem>
                        <CardInput placeholder="Repita sua senha" inputWidth="100%"></CardInput>
                    </CardItem>
                    <CardButton>cadastrar</CardButton>
                </CardItemContainer>  
            </Card>
        </> 
    )
}