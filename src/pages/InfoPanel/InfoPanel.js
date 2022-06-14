import React from 'react';
import { Card, InfoMenu } from '../../components';
import {CardContainer} from '../../components/Card/Card.elements';

export const InfoPanel = () => {
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