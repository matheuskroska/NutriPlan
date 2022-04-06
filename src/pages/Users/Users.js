import React, { useContext, useState } from 'react';
import { StyledButton } from '../../components/Button/Button.elements';
import Patients from '../../db/Patients';
import './Users.css'
import { CheckIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { AuthContext } from '../../firebase/Auth';

export const Users = () => {

    const [patientList, setPatientList] = useState(null)
    const { currentUser } = useContext(AuthContext)

    const getPatients = async () => {
        let patients = await Patients.getPatients();
        setPatientList(patients)
    }

    if (!!currentUser && !!!patientList) {
        getPatients()
    }

    return (
        <>
            <table>
                <tbody>
                    {!!patientList && patientList.map(data => {
                        return (
                            <tr>     
                                <td>{data.cpf} - {data.fullname}</td>
                                <td><StyledButton primary hasIcon><CheckIcon/> liberar</StyledButton></td>
                                <td><Pencil2Icon/></td>
                                <td><TrashIcon/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}