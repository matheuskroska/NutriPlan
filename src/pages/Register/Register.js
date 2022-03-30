import React, {useState} from 'react';
import { StyledButton, StyledRadixButton, StyledRadixToggleGroup } from '../../components/Button/Button.elements';
import { CardItem, CardInput, CardItemContainer, CardDescription } from '../../components/Card/Card.elements';
import { Card } from '../../components/index';


export const Register = () => {

    const [visibility, setVisibility] = useState(false);
    const [userCategory, setUserCategory] = useState(null);
    //userCategory determina o tipo de cadastro (paciente/nutricionista)

    const swapForm = (userCategory) => {
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
        setVisibility(true)
        setUserCategory(userCategory)
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
                    <StyledButton primary>cadastrar</StyledButton>
                </CardItemContainer>  
            </Card>
        </> 
    )
}