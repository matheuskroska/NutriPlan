import React, { useContext, useState } from 'react';
import { AuthContext } from '../../firebase/Auth';
import { Card, InfoMenu } from '../../components';
import {CardContainer, CardContent} from '../../components/Card/Card.elements';
import { EditProfile } from './EditProfile';
import { EditUser } from './EditUser';
import { Schedule } from '../Schedule/ScheduleAppointment';
import { ListUser } from './ListUser';

export const InfoPanel = () => {

    const { currentUser } = useContext(AuthContext)
    const [menuState, setMenuState] = useState("Lista de usuários");	
    const [userData, setUserData] = useState(null);


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