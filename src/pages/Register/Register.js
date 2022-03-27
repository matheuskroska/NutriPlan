import { CardItem, CardInput, CardButton } from '../../components/Card/Card.elements';
import { Card } from '../../components/index';

export const Register = () => {
    return (
        <>
            <Card cardTitle="Cadastro" cardButton="Cadastrar">
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
                    <CardInput  placeholder="Endereço" inputWidth="100%"></CardInput>
                </CardItem>
                <CardItem>
                    <CardInput type="password" placeholder="Senha" inputWidth="100%"></CardInput>
                </CardItem>
                <CardItem>
                    <CardInput placeholder="Repita sua senha" inputWidth="100%"></CardInput>
                </CardItem>
                <CardButton>cadastrar</CardButton>
            </Card>
        </> 
    )
}