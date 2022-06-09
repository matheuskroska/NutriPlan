import React, { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/Auth';
import { Card, InfoMenu } from '../../components';
import {CardContainer} from '../../components/Card/Card.elements';

export const InfoPanel = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <>
            <Card maxWidth={"100%"} cardTitle={"Minha conta"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu menuState={null}/>
                    <h1>Info menu home</h1>
                </CardContainer>
            </Card>
        </>
    )
}