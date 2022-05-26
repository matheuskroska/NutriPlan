import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth';
import { createUser } from '../../firebase';
import { Card } from '../../components';
import { CardDescription, CardInput, CardInputMask, CardItem, CardItemContainer } from '../../components/Card/Card.elements';
import { StyledButton, StyledRadixButton, StyledRadixToggleGroup } from '../../components/Button/Button.elements';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ArrowRightIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Animated from 'react-mount-animation';

export const EditProfile = (props) => {
    const { currentUser } = useContext(AuthContext)
    const { uuid } = useParams();

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    }

    const handleEdit = async() => {
        alert('edit')
    }

    return (
        <>
            <Card margin={"0 auto"} showTitle={"none"}>
                <CardItemContainer visibility={true}>
                    <form>
                    <CardItem>
                        <CardInput value={props.user.nome} autoComplete="off" pattern="[A-Za-z0-9]{2,20}" required placeholder="Nome" inputWidth="calc(50% - 46px)" name="firstname"></CardInput>
                        <CardInput value={props.user.sobrenome} autoComplete="off" pattern="[A-Za-z0-9]{2,20}" required placeholder="Sobrenome" inputWidth="calc(50% - 46px)" name="lastname"></CardInput>
                        <ErrorMessage><ExclamationTriangleIcon/>Nome e Sobrenome deve conter de 2 a 20 caracteres</ErrorMessage>
                    </CardItem>
                    <CardItem>
                        <CardInput value={props.user.email} pattern="(?!test@test\.com$)[a-z0-9._%+-]{3,}@[a-z]{3,}\.[a-z]{2,}(?:\.[a-z]{2,})?" required type="email" placeholder="Email" inputWidth="100%" name="email" autoComplete="off"></CardInput>
                        <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                    </CardItem>
                    <CardItem>
                        <CardInputMask value={props.user.ddd} mask='99' pattern={"[0-9]{2}"} required placeholder="DDD" inputWidth="calc(18% - 46px)" name="ddd" ></CardInputMask>
                        <CardInputMask value={props.user.telefone} mask='9999-9999' pattern={"[0-9]{4}-[0-9]{4}"} required placeholder="Telefone" inputWidth="calc(82% - 46px)" name="phone" ></CardInputMask>
                        <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                    </CardItem>
                    <CardItem>
                        <CardInputMask value={props.user.cpf} disabled id="cpf" mask='999.999.999-99' required pattern={"[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"} placeholder="CPF" name="cpf" autoComplete="off"></CardInputMask>
                        <ErrorMessage><ExclamationTriangleIcon/></ErrorMessage>
                    </CardItem>
                        <Animated.div show={true} mountAnim={`0% {opacity: 0}100% {opacity: 1}`}>
                            <CardItem>
                                <CardInput value={props.user.crn} disabled required={false} placeholder="CRN" inputWidth="100%" name="crn" autoComplete="off"></CardInput>
                                <ErrorMessage><ExclamationTriangleIcon/>Formato inválido</ErrorMessage>
                            </CardItem>
                        </Animated.div>
                    <StyledButton primary hasIcon marginTop={"20px"}>Salvar<ArrowRightIcon/></StyledButton>
                    </form>
                </CardItemContainer>
            </Card>
        </>
    )
}
