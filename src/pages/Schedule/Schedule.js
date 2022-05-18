import React, { useContext, useState } from 'react';
import { CheckIcon, Cross2Icon, MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { AuthContext } from '../../firebase/Auth';
import { StyledLink } from '../../components/Link/Link.elements';
import { Navigate } from 'react-router-dom';
import { Card } from '../../components';
import { CardAvatar, CardContainer, CardContent, CardContentCol, CardContentRow, CardItem, CardMenuContainer, CardMenuHeader, CardMenuItem } from '../../components/Card/Card.elements';
import avatar from '../../assets/images/user-test.png';
import UserModel from '../../db/UserModel';
import NutritionistModel from '../../db/NutritionistModel';

export const Schedule = () => {

    const [usersList, setUsersList] = useState(null)
    const [nutriStringify, setNutriStringify] = useState(null)
    const [nutritionistsList, setNutritionistsList] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["nome_completo", "cpf"]); //colunas da base para realizar busca
    
    const userModel = new UserModel()

    const getUsers = async () => {
        let users = await userModel.getUsers()
        let nutritionistModel = new NutritionistModel()
        let nutritionists = await nutritionistModel.getNutritionists(users)
        setNutritionistsList(nutritionists)
        let nutriStr = JSON.stringify(nutritionists)
        setNutriStringify(nutriStr)
        setUsersList(users)
    }

    if (!!currentUser && !!!usersList) {
        getUsers()
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
            let users = userModel.getUsersSnapshot() //recupera lista atualizada
            setUsersList(users)
        }
    }

    const handleReprove = async(e, uuid) => {
        if (window.confirm('Reprovar acesso do usuário no sistema?')) {
            await userModel.approveReproveLoginUser(uuid, 'reprove')
            let users = userModel.getUsersSnapshot() //recupera lista atualizada
            setUsersList(users)
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
            default:
                console.log('Erro na action')
                break
        }
        if (window.confirm(question)) {
            await userModel.activeDesactiveLoginUser(uuid, active)
            let users = userModel.getUsersSnapshot() //recupera lista atualizada
            setUsersList(users)
        }
    }
    
    const handleDelete = async(e, uuid) => {
        if (window.confirm('Deseja deletar esse usuário do sistema?')) {
            if (window.confirm('Tem certeza que deseja deletar esse usuário do sistema?')) {
                await userModel.deleteUser(uuid)
                let users = userModel.getUsersSnapshot() //recupera lista atualizada
                setUsersList(users)
            }
        }
    }

    return (
        <>
            <Card maxWidth={"100%"} cardTitle="Lista de usuários">
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <CardMenuContainer >
                        <CardMenuHeader>
                            <p>{currentUser.nome_completo}</p>
                            <CardAvatar src={avatar} alt="avatar"></CardAvatar>
                            <p>Editar perfil</p>
                        </CardMenuHeader>
                        <CardMenuItem selected={true}><StyledLink to="/usuarios" menu="true" selected={true}>Lista de usuários</StyledLink></CardMenuItem>
                        <CardMenuItem blocked={true}><StyledLink to="/notificacoes" menu="true">Notificações</StyledLink></CardMenuItem>
                        <CardMenuItem><StyledLink to="/agendar-consulta" menu="true">Agendar consulta</StyledLink></CardMenuItem>
                    </CardMenuContainer>
                    <CardContent>
                        <CardContentRow>
                            <CardContentCol wSearchIcon justify={"start"}><input type="text" name="search-form" id="search-form" placeholder="Pesquise..." value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/><MagnifyingGlassIcon/></CardContentCol>
                        </CardContentRow>
                        <CardContentRow>
                            <CardContentCol justify={"start"} maxWidth={"250px"}>CPF - Nome completo</CardContentCol>
                            <CardContentCol maxWidth={"250px"}>CRN</CardContentCol>
                            <CardContentCol maxWidth={"240px"}>Ações</CardContentCol>
                        </CardContentRow>
                        {!!usersList && search(usersList).map(data => {
                            return (
                                <CardContentRow key={data.cpf}>
                                    <CardItem marginBottom={"0"}>
                                        <CardContentCol justify={"start"} maxWidth={"250px"}><strong>{data.cpf}</strong> - {data.nome_completo}</CardContentCol>
                                    </CardItem>
                                    <CardItem marginBottom={"0"}>
                                        {!!nutriStringify.includes(data.uuid) ? (
                                            <CardContentCol maxWidth={"250px"}><strong>{nutritionistsList[data.uuid].crn}</strong></CardContentCol>
                                        ) : (
                                            <CardContentCol maxWidth={"250px"}><strong>-</strong></CardContentCol>
                                        )}
                                    </CardItem>
                                    <CardItem marginBottom={"0"} justifyContent={"flex-end"} width={"100%"} wrap={"initial"}>
                                        {data.acesso === 0 ? (
                                            <>
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleApprove(e, data.uuid)}><CheckIcon/>Aprovar</CardContentCol>
                                                <CardContentCol maxWidth={"100px"} denyTheme onClick={(e) => handleReprove(e, data.uuid)}><Cross2Icon/>Reprovar</CardContentCol>
                                            </>
                                        ) : (
                                            <>
                                                {data.ativo ? (
                                                    <CardContentCol maxWidth={"100px"} denyTheme onClick={(e) => handleActiveDesactive(e, data.uuid, 'desactive')}><Cross2Icon/>Desativar</CardContentCol>
                                                ) : (
                                                    <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleActiveDesactive(e, data.uuid, 'active')}><CheckIcon/>Ativar</CardContentCol>
                                                )}
                                            </>
                                        )}
                                        <CardContentCol maxWidth={"25px"}><StyledLink edit="true" header="true" to={`/editar-usuario/`+data.uuid}><Pencil2Icon/></StyledLink></CardContentCol>
                                        <CardContentCol maxWidth={"25px"} onClick={(e) => handleDelete(e, data.uuid)}><StyledLink edit="true" header="true" to={"#  "}><TrashIcon/></StyledLink></CardContentCol>
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