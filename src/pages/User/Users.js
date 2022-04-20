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
import Abstract from '../../db/Abstract';

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

    const handleApprove = async(e) => {
        if (window.confirm('Aprovar acesso do usuário no sistema?')) {
            let cpf = e.target.parentElement.parentElement.id
            await Abstract.approveLoginUser(cpf)
            let patients = Patients.getPatientsSnapshot() //recupera lista atualizada
            setPatientList(patients)
        }
    }

    return (
        <>
            <Card cardTitle="Lista de usuários">
                <CardContainer menu={true}>
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
                                <CardContentRow id={data.cpf}>
                                    <CardContentCol>{data.cpf} - {data.fullname}</CardContentCol>
                                    <CardContentCol>{!!!data.login_approved && (<StyledLink header="true" to="#" onClick={(e) => handleApprove(e)}><CheckIcon/></StyledLink>)}</CardContentCol>
                                    <CardContentCol><StyledLink header="true" to={`/editar-usuario/`+data.uuid}><Pencil2Icon/></StyledLink></CardContentCol>
                                    <CardContentCol><TrashIcon/></CardContentCol>
                                </CardContentRow>
                            )
                        })}
                    </CardContent>
                </CardContainer>
            </Card>
        </>
    )
}