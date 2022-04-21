import React, { useContext, useState } from 'react';
import Patients from '../../db/Patients';
import './Users.css'
import { CheckIcon, MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { AuthContext } from '../../firebase/Auth';
import { StyledLink } from '../../components/Link/Link.elements';
import { Navigate } from 'react-router-dom';
import { Card } from '../../components';
import { CardAvatar, CardContainer, CardContent, CardContentCol, CardContentRow, CardItem, CardMenuContainer, CardMenuHeader, CardMenuItem } from '../../components/Card/Card.elements';
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

    const handleApprove = async(e, cpf) => {
        if (window.confirm('Aprovar acesso do usuário no sistema?')) {
            await Abstract.approveLoginUser(cpf)
            let patients = Patients.getPatientsSnapshot() //recupera lista atualizada
            setPatientList(patients)
        }
    }
    const handleReprove = async(e, cpf) => {
        if (window.confirm('Reprovar acesso do usuário no sistema?')) {
            await Abstract.reproveLoginUser(cpf)
            let patients = Patients.getPatientsSnapshot() //recupera lista atualizada
            setPatientList(patients)
        }
    }

    return (
        <>
            <Card maxWidth={"1200px"} cardTitle="Lista de usuários">
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <CardMenuContainer >
                        <CardMenuHeader>
                            <p>{currentUser.fullname}</p>
                            <CardAvatar src={avatar} alt="avatar"></CardAvatar>
                            <p>Editar perfil</p>
                        </CardMenuHeader>
                        <CardMenuItem>Teste</CardMenuItem>
                        <CardMenuItem selected={true}>Teste</CardMenuItem>
                        <CardMenuItem>Teste</CardMenuItem>
                    </CardMenuContainer>
                    <CardContent>
                        <CardContentRow>
                            <CardContentCol wSearchIcon justify={"start"}><input type="text" name="search-form" id="search-form" placeholder="Pesquise..." value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/><MagnifyingGlassIcon/></CardContentCol>
                            <CardContentCol maxWidth={"240px"}>Ações</CardContentCol>
                        </CardContentRow>
                        {!!patientList && search(patientList).map(data => {
                            return (
                                <CardContentRow id={data.cpf}>
                                    <CardItem marginBottom={"0"}>
                                        <CardContentCol justify={"start"} maxWidth={"250px"}>{data.cpf} - {data.fullname}</CardContentCol>
                                    </CardItem>
                                    <CardItem marginBottom={"0"} justifyContent={"flex-end"} width={"100%"} wrap={"initial"}>
                                        {data.access === 0 ? (
                                            <>
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleApprove(e, data.cpf)}><CheckIcon/>Aprovar</CardContentCol>
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleReprove(e, data.cpf)}><CheckIcon/>Reprovar</CardContentCol>
                                            </>
                                        ) : (
                                            data.access === 2 ? (
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleApprove(e, data.cpf)}><CheckIcon/>Aprovar</CardContentCol>
                                            ) : (
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleReprove(e, data.cpf)}><CheckIcon/>Reprovar</CardContentCol>
                                            )
                                        )}
                                        <CardContentCol maxWidth={"25px"}><StyledLink header="true" to={`/editar-usuario/`+data.uuid}><Pencil2Icon/></StyledLink></CardContentCol>
                                        <CardContentCol maxWidth={"25px"}><TrashIcon/></CardContentCol>
                                    </CardItem>
                                </CardContentRow>
                            )
                        })}
                    </CardContent>
                </CardContainer>
            </Card>
        </>
    )
}