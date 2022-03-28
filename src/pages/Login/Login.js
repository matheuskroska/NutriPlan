import React, {useState} from 'react';
import { CardItem, CardInput, CardButton, CardItemContainer, CardDescription, StyledRadixItem, StyledRadixToggleGroup } from '../../components/Card/Card.elements';
import { Card } from '../../components/index';

export const Login = () => {
    return (
        <Card cardTitle="Login" >
        <CardItemContainer show={true}>
            <CardItem>
                <CardInput type="mail" placeholder="Email" inputWidth="100%"></CardInput>
            </CardItem>
            <CardItem>
                <CardInput type="password" placeholder="Senha" inputWidth="100%"></CardInput>
            </CardItem>
            <CardButton>Entrar</CardButton>
            </CardItemContainer>  
        </Card>
    )
}