import React, { useContext, useState } from 'react';
import { StyledButton } from '../../components/Button/Button.elements';
import Patients from '../../db/Patients';
import './Users.css'
import { CheckIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { AuthContext } from '../../firebase/Auth';
import { StyledLink } from '../../components/Link/Link.elements';
import { Navigate } from 'react-router-dom';
import { Card } from '../../components';
import { CardAvatar, CardContainer, CardContent, CardContentCol, CardContentRow, CardMenuContainer, CardMenuHeader, CardMenuItem } from '../../components/Card/Card.elements';
import avatar from '../../assets/images/user-test.png';

export const Users = () => {

    const [patientList, setPatientList] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["fullname", "cpf"]); //colunas da base para realizar busca

    const getPatients = async () => {
        let patients = await Patients.getPatients();
        setPatientList(patients)
    }

    if (!!currentUser && !!!patientList) {
        getPatients()
    } else if (!!!currentUser) {
        return <Navigate to="/login" replace />
    }

    function search(items) {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(querySearch.toLowerCase()) > -1
                );
            });
        });
    }

    return (
        <>
            <Card cardTitle="Lista de usuários">
                <CardContainer menu="true">
                    <CardMenuContainer>
                        <CardMenuHeader>
                            <p>{currentUser.fullname}</p>
                            <CardAvatar src={avatar} alt="avatar"></CardAvatar>
                            <p>Editar perfil</p>
                        </CardMenuHeader>
                        <CardMenuItem>Teste</CardMenuItem>
                        <CardMenuItem selected="true">Teste</CardMenuItem>
                        <CardMenuItem>Teste</CardMenuItem>
                    </CardMenuContainer>
                    <CardContent>
                        <CardContentRow>
                            <CardContentCol><input type="search" name="search-form" id="search-form" placeholder="Pesquise..." value={querySearch} onChange={(e) => setQuerySearch(e.target.value)}/></CardContentCol>
                            <CardContentCol>Ações</CardContentCol>
                        </CardContentRow>
                        {!!patientList && search(patientList).map(data => {
                            return (
                                <CardContentRow>
                                    <CardContentCol>{data.cpf} - {data.fullname}</CardContentCol>
                                    <CardContentCol>{!!!data.login_approved && (<StyledButton primary hasIconLeft maxWidth="fit-content"><CheckIcon/>liberar acesso</StyledButton>)}</CardContentCol>
                                    <CardContentCol><StyledLink header="true" to={`/editar-usuario/`+data.uuid}><Pencil2Icon/></StyledLink></CardContentCol>
                                    <CardContentCol><TrashIcon/></CardContentCol>
                                </CardContentRow>
                            )
                        })}
                    </CardContent>
                </CardContainer>
            </Card>
            {/* <table>
                <thead>
                    <tr>
                        <td colSpan={2}><input type="search" name="search-form" id="search-form" placeholder="Pesquise..." value={querySearch} onChange={(e) => setQuerySearch(e.target.value)}/></td>
                        <td colSpan={2}>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {!!patientList && search(patientList).map(data => {
                        return (
                            <tr>
                                <td>{data.cpf} - {data.fullname}</td>
                                <td>{!!!data.login_approved && (<StyledButton primary hasIconLeft maxWidth="fit-content"><CheckIcon/>liberar acesso</StyledButton>)}</td>
                                <td><StyledLink header="true" to={`/editar-usuario/`+data.uuid}><Pencil2Icon/></StyledLink></td>
                                <td><TrashIcon/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
        </>
    )
}