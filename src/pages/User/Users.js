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

    const handleApprove = async(e, uuid) => {
        if (window.confirm('Aprovar acesso do usuário no sistema?')) {
            await Abstract.approveReproveLoginUser(uuid, 'approve')
            let patients = Patients.getPatientsSnapshot() //recupera lista atualizada
            setPatientList(patients)
        }
    }

    const handleReprove = async(e, uuid) => {
        if (window.confirm('Reprovar acesso do usuário no sistema?')) {
            await Abstract.approveReproveLoginUser(uuid, 'reprove')
            let patients = Patients.getPatientsSnapshot() //recupera lista atualizada
            setPatientList(patients)
        }
    }

    const mouseHover = (e) => {
        e.target.classList.add('selected')
        var idHover = e.target.id
        var elements = document.getElementsByClassName('trashIcon')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.cursor = 'pointer'
            if (idHover === elements.item(i).id) {
                elements.item(i).firstChild.setAttribute('fill-rule', 'nonzero')
            }
        }
    }

    const mouseOut = (e) => {
        e.target.classList.remove('selected')
        var idHover = e.target.id
        var elements = document.getElementsByClassName('trashIcon')
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.cursor = 'pointer'
            if (idHover === elements.item(i).id) {
                elements.item(i).firstChild.setAttribute('fill-rule', 'evenodd')
            }
        }
    }
     
    
    const handleDelete = async(e, uuid) => {
        if (window.confirm('Deseja deletar esse usuário do sistema?')) {
            if (window.confirm('Tem certeza que deseja deletar esse usuário do sistema?')) {
                await Abstract.deleteUser(uuid)
                let patients = Patients.getPatientsSnapshot() //recupera lista atualizada
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
                                <CardContentRow key={data.uuid}>
                                    <CardItem marginBottom={"0"}>
                                        <CardContentCol justify={"start"} maxWidth={"250px"}>{data.cpf} - {data.fullname}</CardContentCol>
                                    </CardItem>
                                    <CardItem marginBottom={"0"} justifyContent={"flex-end"} width={"100%"} wrap={"initial"}>
                                        {data.access === 0 ? (
                                            <>
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleApprove(e, data.uuid)}><CheckIcon/>Aprovar</CardContentCol>
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleReprove(e, data.uuid)}><CheckIcon/>Reprovar</CardContentCol>
                                            </>
                                        ) : (
                                            data.access === 2 ? (
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleApprove(e, data.uuid)}><CheckIcon/>Aprovar</CardContentCol>
                                            ) : (
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleReprove(e, data.uuid)}><CheckIcon/>Reprovar</CardContentCol>
                                            )
                                        )}
                                        <CardContentCol maxWidth={"25px"}><StyledLink header="true" to={`/editar-usuario/`+data.uuid}><Pencil2Icon/></StyledLink></CardContentCol>
                                        <CardContentCol maxWidth={"25px"} onClick={(e) => handleDelete(e, data.uuid)}><TrashIcon onMouseOver={(e) => mouseHover(e)} onMouseOut={(e) => mouseOut(e)} className="trashIcon" id={`trash-`+data.uuid}/></CardContentCol>
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