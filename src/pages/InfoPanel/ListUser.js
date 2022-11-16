import React, { useContext, useEffect, useState } from 'react';
import { CardCol, CardColHeader, CardContainer, CardContent, CardContentCol, CardContentRow } from '../../components/Card/Card.elements';
import { CheckIcon, Cross2Icon, MagnifyingGlassIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { StyledLink} from '../../components/Link/Link.elements';
import UserModel from '../../db/UserModel';
import NutritionistModel from '../../db/NutritionistModel';
import PatientModel from '../../db/PatientModel';
import { AuthContext } from '../../firebase/Auth';
import { Card, InfoMenu, Loader } from '../../components';
import { Translator } from '../../components/I18n';
import { useTranslation } from 'react-i18next';
import { ModalMessage } from '../../components/ModalMessage/ModalMessage';

export const ListUser = () => {
    const [usersList, setUsersList] = useState(null)
    const [nutriStringify, setNutriStringify] = useState(null)
    const [nutritionistsList, setNutritionistsList] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["nome_completo", "cpf"]); //colunas da base para realizar busca
    const { t } = useTranslation()
    const [modalMessage, setModalMessage] = useState(false);
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState()
    const [confirmation, setConfirmation] = useState(false);
    const navigate = useNavigate()
    const [active, setActive] = useState()
    const [uuid, setUuid] = useState()
    const [type, setType] = useState()
    
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

    const handleApprove = async (e, uuid) => {
        setUuid(uuid)
        setType('approve')
        setMessage(t('confirmApprove'))
        setModalMessage(true)
        setLoader(false)
    }

    const handleReprove = async (e, uuid) => {
        setUuid(uuid)
        setType('reprove')
        setMessage(t('confirmReprove'))
        setModalMessage(true)
        setLoader(false)
    }


    const handleActiveDesactive = async (e, uuid, action) => {
        e.preventDefault()
        let active = action === 'active' ? true : false
        let message = action === 'active' ? 'userActivated' : 'userDesactivated'
        setActive(active)
        setUuid(uuid)
        setType('activateDesactivate')
        setMessage(t(message))
        setModalMessage(true)
        setLoader(false)  
    }
    
    const handleDelete = async (e, uuid) => {
        setUuid(uuid)
        setType('delete')
        setMessage(t('confirmDelete'))
        setModalMessage(true)
        setLoader(false)
    }

     const pull_data = (data, propsSuccess) => {
         setModalMessage(data)
         if (!!propsSuccess) {
        }
    }

    const handleConfirmation = (option, type) => {
        if (option === true) {
            handleActivity(type)
        }
    }

    const handleActivity = async (type) => { 

        switch (type) {
            case 'activateDesactivate':
                await userModel.activeDesactiveLoginUser(uuid, active)
                setUsersList(userModel.getUsersSnapshot())
                break
            case 'delete':
                await patientModel.delete(uuid)
                await nutritionistModel.delete(uuid)
                setUsersList(userModel.getUsersSnapshot())
                break
            case 'approve':
                await userModel.approveLoginUser(uuid)
                setUsersList(userModel.getUsersSnapshot())
                break
            case 'reprove':
                await patientModel.delete(uuid)
                await nutritionistModel.delete(uuid)
                setUsersList(userModel.getUsersSnapshot())
            default:
                console.log('Erro na action')
                break
        }
    }

    return (
        <>
        {!!loader && (
            <>
                <Loader/>
            </>
        )}
        {modalMessage && (
            <>
                    <ModalMessage type={type} setConfirmation={handleConfirmation} func={pull_data} confirm={true}>{message}</ModalMessage>
            </>
        )}
            <Card className="listUser" cardTitle={<Translator path="userList"/>} maxWidth={"100%"} borderRadius={"0"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu menuState={<Translator path="userList"/>}/>
                    <CardContent>
                        <CardContentRow>
                            <CardContentCol wSearchIcon justify={"start"}><input type="text" name="search-form" id="search-form" placeholder={`${t('search')}`} value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/><MagnifyingGlassIcon/></CardContentCol>
                        </CardContentRow>
                        <CardContentRow>
                            <CardColHeader txAlign="left" width="33.3%"><Translator path="cpfFullName"/></CardColHeader>
                            <CardColHeader width="33.3%">CRN</CardColHeader>
                            <CardColHeader width="33.3%"><Translator path="actions"/></CardColHeader>
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
                                                <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleApprove(e, data.uuid)}><CheckIcon/><Translator path="approve"/></CardContentCol>
                                                <CardContentCol maxWidth={"100px"} denyTheme onClick={(e) => handleReprove(e, data.uuid)}><Cross2Icon/><Translator path="reprove"/></CardContentCol>
                                            </>
                                        ) : (
                                            <>
                                                {data.ativo ? (
                                                    <CardContentCol maxWidth={"100px"} denyTheme onClick={(e) => handleActiveDesactive(e, data.uuid, 'desactive')}><Cross2Icon/><Translator path="disable"/></CardContentCol>
                                                ) : (
                                                    <CardContentCol maxWidth={"100px"} confirmTheme onClick={(e) => handleActiveDesactive(e, data.uuid, 'active')}><CheckIcon/><Translator path="activate"/></CardContentCol>
                                                )}
                                            </>
                                        )}
                                        <CardContentCol maxWidth={"25px"}><StyledLink uuid={data.uuid} edit="true" header="true" to={`/editar-usuario/`+data.uuid}><Pencil2Icon/></StyledLink></CardContentCol>
                                        <CardContentCol maxWidth={"25px"} onClick={(e) => handleDelete(e, data.uuid)}><StyledLink edit="true" header="true" to={"#"}><TrashIcon/></StyledLink></CardContentCol>
                                    </CardCol>
                                </CardContentRow>
                            )
                        })}
                    </CardContent>
                </CardContainer>
            </Card>
        </>
    )
}
