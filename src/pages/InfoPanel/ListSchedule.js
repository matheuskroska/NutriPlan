import React, { useContext, useState } from 'react';
import { CardCol, CardColHeader, CardContainer, CardContent, CardContentCol, CardContentRow } from '../../components/Card/Card.elements';
import { CheckIcon, Cross2Icon, MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Navigate } from 'react-router-dom';
import { StyledLink} from '../../components/Link/Link.elements';
import UserModel from '../../db/UserModel';
import NutritionistModel from '../../db/NutritionistModel';
import PatientModel from '../../db/PatientModel';
import { AuthContext } from '../../firebase/Auth';
import { Card, InfoMenu } from '../../components';


export const ListSchedule = (props) => {

    const [usersList, setUsersList] = useState(null)
    const [nutriStringify, setNutriStringify] = useState(null)
    const [nutritionistsList, setNutritionistsList] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["data", "horario"]); //colunas da base para realizar busca
    const [menuState, setMenuState] = useState("Lista de usuários");	
    const [userData, setUserData] = useState(null);
    const [scheduleList, setScheduleList] = useState(null)
    
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

    const getSchedules = async () => {
        let schedules = await userModel.getSchedules(currentUser.uuid)
        setScheduleList(schedules);
    }


    if (!!currentUser && !!!usersList) {
        getUsers()
        currentUser.isNutritionist ? getSchedules() : console.log("não é");
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
        if (window.confirm('Reprovar acesso do usuário no sistema?\nEsse usuário sera deletado do sistema.')) {
            await patientModel.delete(uuid)
            await nutritionistModel.delete(uuid)
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
                await patientModel.delete(uuid)
                await nutritionistModel.delete(uuid)
                let users = userModel.getUsersSnapshot() //recupera lista atualizada
                setUsersList(users)
            }
        }
    }

    const pull_userData = (data) => {
        setUserData(data);
        props.func(userData);
    } 

  return (
    <Card cardTitle={"Minhas consultas"} maxWidth={"100%"}>
        <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
            <InfoMenu menuState={"Minhas consultas"}/>
            <CardContent>
                <CardContentRow>
                    <CardContentCol wSearchIcon justify={"start"}><input type="text" name="search-form" id="search-form" placeholder="Pesquise..." value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/><MagnifyingGlassIcon/></CardContentCol>
                </CardContentRow>
                <CardContentRow>
                    <CardColHeader txAlign="left" width="33.3%">Data / Hora</CardColHeader>
                    <CardColHeader width="33.3%">Nutricionista</CardColHeader>
                    <CardColHeader width="33.3%">Ações</CardColHeader>
                </CardContentRow>
                {!!scheduleList && search(scheduleList).map(data => {
                    return (
                        <CardContentRow key={"1"}>
                            <CardCol width="33.3%">
                                <CardContentCol justify={"start"}><strong>{data.data}</strong> - {data.horario}</CardContentCol>
                            </CardCol>
                            <CardCol width="33.3%">
                                <CardContentCol><strong>{data.nutricionista_uuid}</strong></CardContentCol>
                            </CardCol>
                            <CardCol width="33.3%" display="flex">
                                <CardContentCol maxWidth={"25px"}><StyledLink uuid={data.uuid} edit="true" header="true" to={`/editar-usuario/`+data.id}><Pencil2Icon/></StyledLink></CardContentCol>
                                <CardContentCol maxWidth={"25px"} onClick={(e) => handleDelete(e, data.idn)}><StyledLink edit="true" header="true" to={"#"}><TrashIcon/></StyledLink></CardContentCol>
                            </CardCol>
                        </CardContentRow>
                    )
                })}
            </CardContent>
        </CardContainer>
    </Card>
  )
}
