import React, { useContext, useState } from 'react';
import PatientModel from '../../db/PatientModel';
import { CheckIcon, Cross2Icon, MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { AuthContext } from '../../firebase/Auth';
import { StyledLink } from '../../components/Link/Link.elements';
import { Navigate } from 'react-router-dom';
import { Card } from '../../components';
import { CardAvatar, CardContainer, CardContent, CardContentCol, CardContentRow, CardItem, CardMenuContainer, CardMenuHeader, CardMenuItem } from '../../components/Card/Card.elements';
import avatar from '../../assets/images/user-test.png';
import UserModel from '../../db/UserModel';

export const Users = () => {

    const [patientList, setPatientList] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["fullname", "cpf"]); //colunas da base para realizar busca
    
    const patientModel = new PatientModel()
    const userModel = new UserModel()

    const getPatients = async () => {
        let patients = await patientModel.getPatients();
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

    const handleApprove = async(e, uuid) => {
        if (window.confirm('Aprovar acesso do usuário no sistema?')) {
            await userModel.approveReproveLoginUser(uuid, 'approve')
            let patients = patientModel.getPatientsSnapshot() //recupera lista atualizada
            setPatientList(patients)
        }
    }

    const handleReprove = async(e, uuid) => {
        if (window.confirm('Reprovar acesso do usuário no sistema?')) {
            await userModel.approveReproveLoginUser(uuid, 'reprove')
            let patients = patientModel.getPatientsSnapshot() //recupera lista atualizada
            setPatientList(patients)
        }
    }

    const handleActiveDesactive = async(e, uuid, action) => {
        e.preventDefault()
        let question = null
        let active = null
        switch (action) {
            case 'desactive':
                question = 'Deseja desativar login desse usuário?'
                active = false
                break
            case 'active':
                question = 'Deseja ativar login desse usuário?'
                active = true
                break
        }
        if (window.confirm(question)) {
            await userModel.activeDesactiveLoginUser(uuid, active)
            let patients = patientModel.getPatientsSnapshot() //recupera lista atualizada
            setPatientList(patients)
        }
    }
    
    const handleDelete = async(e, uuid) => {
        if (window.confirm('Deseja deletar esse usuário do sistema?')) {
            if (window.confirm('Tem certeza que deseja deletar esse usuário do sistema?')) {
                await userModel.deleteUser(uuid)
                let patients = patientModel.getPatientsSnapshot() //recupera lista atualizada
                setPatientList(patients)
            }
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
                                        <CardContentCol justify={"start"} maxWidth={"250px"}><strong>{data.cpf}</strong> - {data.fullname}</CardContentCol>
                                    </CardItem>
                                    <CardItem marginBottom={"0"} justifyContent={"flex-end"} width={"100%"} wrap={"initial"}>
                                        {data.access === 0 ? (
                                            <>
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleApprove(e, data.uuid)}><CheckIcon/>Aprovar</CardContentCol>
                                                <CardContentCol maxWidth={"100px"} denyTheme onClick={(e) => handleReprove(e, data.uuid)}><Cross2Icon/>Reprovar</CardContentCol>
                                            </>
                                        ) : (
                                            <>
                                                {data.active ? (
                                                    <CardContentCol maxWidth={"100px"} denyTheme onClick={(e) => handleActiveDesactive(e, data.uuid, 'desactive')}><Cross2Icon/>Desativar</CardContentCol>
                                                ) : (
                                                    <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleActiveDesactive(e, data.uuid, 'active')}><CheckIcon/>Ativar</CardContentCol>
                                                )}
                                            </>
                                        )}
                                        <CardContentCol maxWidth={"25px"}><StyledLink edit header="true" to={`/editar-usuario/`+data.uuid}><Pencil2Icon/></StyledLink></CardContentCol>
                                        <CardContentCol maxWidth={"25px"} onClick={(e) => handleDelete(e, data.uuid)}><StyledLink edit header="true" to={"#  "}><TrashIcon/></StyledLink></CardContentCol>
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