import React from 'react';
import { StyledButton } from '../../components/Button/Button.elements';
import { CardItem, CardInput, CardItemContainer } from '../../components/Card/Card.elements';
import { Card } from '../../components/index';
import {EnterIcon} from '@radix-ui/react-icons'
import { Link } from '../../components/Link/Link';

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
                <CardItem>
                    <Link to="/cadastro" forgotpwd>esqueci minha senha</Link>
                </CardItem>
                <CardItem>
                    <StyledButton primary hasIcon>entrar<EnterIcon/></StyledButton>
                </CardItem>
            </CardItemContainer>  
        </Card>
    )
}