import React, { useContext } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { AuthContext } from '../../firebase/Auth';
import { Navigate } from 'react-router-dom';
import { CardContent, CardContentRow, CardInput } from '../../components/Card/Card.elements';
import { StyledButton } from '../../components/Button/Button.elements';

export const Schedule = () => {

    const { currentUser } = useContext(AuthContext)
    
    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <CardContent>
                <form>
                    <CardContentRow></CardContentRow>
                    <CardContentRow>
                        <CardInput required type="date" placeholder="Escolha uma data" inputWidth="100%" name="date" min="2022-05-26"></CardInput>
                    </CardContentRow>
                    <CardContentRow>
                        <CardInput required type="time" placeholder="Escolha um horário" inputWidth="100%" name="time" min="08:00" max="18:00"></CardInput>
                    </CardContentRow>
                    <CardContentRow>
                        <StyledButton primary hasIcon marginTop={"20px"}>marcar consulta<ArrowRightIcon/></StyledButton>
                    </CardContentRow>
                </form>
            </CardContent>
        </>
    )
}