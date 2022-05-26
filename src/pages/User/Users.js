import React, { useContext, useState } from 'react';
import { CheckIcon, Cross2Icon, MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { AuthContext } from '../../firebase/Auth';
import { StyledLink, StyledRadixLink } from '../../components/Link/Link.elements';
import { Navigate } from 'react-router-dom';
import { Card } from '../../components';
import { CardAvatar, CardCol, CardColHeader, CardContainer, CardContent, CardContentCol, CardContentRow, CardMenuContainer, CardMenuHeader, CardMenuItem, CardParagraph } from '../../components/Card/Card.elements';
import avatar from '../../assets/images/user-test.png';
import UserModel from '../../db/UserModel';
import NutritionistModel from '../../db/NutritionistModel';
import { StyledRadixToggleGroup } from '../../components/Button/Button.elements';
import { EditProfile } from './EditProfile';
import { EditUser } from './EditUser';
import PatientModel from '../../db/PatientModel';

export const Users = () => {

    const [usersList, setUsersList] = useState(null)
    const [nutriStringify, setNutriStringify] = useState(null)
    const [nutritionistsList, setNutritionistsList] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["nome_completo", "cpf"]); //colunas da base para realizar busca
    const [menuState, setMenuState] = useState("Lista de Usuários");
    const [userData, setUserData] = useState(null);
    
    
    const userModel = new UserModel()
    const patientModel = new PatientModel()
    const nutritionistModel = new NutritionistModel()

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
            await userModel.approveLoginUser(uuid)
            let users = userModel.getUsersSnapshot() //recupera lista atualizada
            setUsersList(users)
        }
    }

    const handleReprove = async(e, uuid) => {
        if (window.confirm('Reprovar acesso do usuário no sistema?')) {
            await userModel.reproveLoginUser(uuid)
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
                let retDelete = await patientModel.delete(uuid)
                if (!!!retDelete) {
                    retDelete = await nutritionistModel.delete(uuid)
                }
                console.log(retDelete)
                // await userModel.deleteUser(uuid)
                let users = userModel.getUsersSnapshot() //recupera lista atualizada
                setUsersList(users)
            }
        }
    }

    return (
        <>
            <Card maxWidth={"100%"} cardTitle={menuState}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <CardMenuContainer >
                        <CardMenuHeader>
                            <CardParagraph>{currentUser.nome_completo}</CardParagraph>
                            <CardAvatar src={avatar} alt="avatar"></CardAvatar>
                            <StyledLink menu to="#" onClick={()=>setMenuState("Editar perfil")}>Editar perfil</StyledLink>
                        </CardMenuHeader>
                        <StyledRadixToggleGroup value={menuState} onValueChange={(menuState) => {menuState && setMenuState(menuState)}} height="100%" flexDirection="column" type="single" aria-label="usuario" >
                            <CardMenuItem fontSize="inherit" width="100%">
                                <StyledRadixLink editUserButtons value="Lista de Usuários" aria-label="Lista de usuários">Lista de usuários</StyledRadixLink>
                                <StyledRadixLink editUserButtons value="Notificações" aria-label="Notificações">Notificações</StyledRadixLink>
                                <StyledRadixLink editUserButtons value="Agendar Consulta" aria-label="Agendar consulta">Agendar consulta</StyledRadixLink>
                            </CardMenuItem>
                        </StyledRadixToggleGroup>
                    </CardMenuContainer>
                    {
                    (()=> {
                        switch (menuState) {
                        case "Lista de Usuários": return <>
                            <CardContent>
                        <CardContentRow>
                            <CardContentCol wSearchIcon justify={"start"}><input type="text" name="search-form" id="search-form" placeholder="Pesquise..." value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/><MagnifyingGlassIcon/></CardContentCol>
                        </CardContentRow>
                        <CardContentRow>
                            <CardColHeader txAlign="left" width="33.3%">CPF - Nome completo</CardColHeader>
                            <CardColHeader width="33.3%">CRN</CardColHeader>
                            <CardColHeader width="33.3%">Ações</CardColHeader>
                        </CardContentRow>
                        {!!usersList && search(usersList).map(data => {
                            return (
                                <CardContentRow key={data.cpf}>
                                    <CardCol width="33.3%">
                                        <CardContentCol justify={"start"}><strong>{data.cpf}</strong> - {data.nome_completo}</CardContentCol>
                                    </CardCol>
                                    <CardCol width="33.3%">
                                        {!!nutriStringify.includes(data.uuid) ? (
                                            <CardContentCol><strong>{nutritionistsList[data.uuid].crn}</strong></CardContentCol>
                                        ) : (
                                            <CardContentCol><strong>-</strong></CardContentCol>
                                        )}
                                    </CardCol>
                                    <CardCol width="33.3%" display="flex">
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
                                        <CardContentCol maxWidth={"25px"}><StyledLink uuid={data.uuid} edit="true" header="true" to="" onClick={() => {setMenuState("Editar usuario");setUserData(data)}}><Pencil2Icon/></StyledLink></CardContentCol>
                                        <CardContentCol maxWidth={"25px"} onClick={(e) => handleDelete(e, data.uuid)}><StyledLink edit="true" header="true" to={"#  "}><TrashIcon/></StyledLink></CardContentCol>
                                    </CardCol>
                                </CardContentRow>
                            )
                        })}
                            </CardContent>
                        </>;
                        case "Notificações": return <>
                            <CardContent>
                                <h1>Notificações</h1>
                             </CardContent></>;
                        case "Agendar Consulta": return <>
                            <CardContent>
                                <h1>Agendar Consulta</h1>
                            </CardContent></>
                        case "Editar perfil": return <>
                            <EditProfile user={currentUser}></EditProfile></>
                        case "Editar usuario": return <>
                            <EditUser user={userData}></EditUser></>
                        }
                    })()
                    }    
                </CardContainer>
            </Card>
        </>
    )
}