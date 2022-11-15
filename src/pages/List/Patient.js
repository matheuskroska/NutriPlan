import { MagnifyingGlassIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import React, { useContext, useState} from 'react'
import { AuthContext } from '../../firebase/Auth'
import { useTranslation } from 'react-i18next'
import { Card, InfoMenu } from '../../components'
import { CardCol, CardColHeader, CardContainer, CardContent, CardContentCol, CardContentRow } from '../../components/Card/Card.elements'
import { Translator } from '../../components/I18n'
import { StyledLink } from '../../components/Link/Link.elements'
import PatientModel from '../../db/PatientModel'
import { Navigate } from 'react-router-dom'
import UserModel from '../../db/UserModel'
import ReactTooltip from 'react-tooltip'
import _ from 'lodash'

export const Patient = () => {
    const { currentUser } = useContext(AuthContext)
    const { t } = useTranslation()
    const [patientsList, setPatientsList] = useState(null)
    const [usersName, setUsersName] = useState([])
    const [querySearch, setQuerySearch] = useState("");
    const [searchParam] = useState(["nome_completo", "cpf"]); //colunas da base para realizar busca

    const userModel = new UserModel()
    const patientModel = new PatientModel()

    const getPatients = async () => {
        let patients = await patientModel.getAllPatients()
        // let patients = await patientModel.getPatients()
        let usersNameTmp = await userModel.getUsersName()
        _.map(patients, (data, key) => {
            if (data.plano_id) {
                console.log(data.plano_id)
            }
        })
        setUsersName(usersNameTmp)
        setPatientsList(patients)
    }

    if (!!currentUser && !!!patientsList) {
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
        <Card cardTitle={<Translator path="patientList"/>} maxWidth={"100%"} borderRadius={"0"}>
            <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                <InfoMenu menuState={<Translator path="patientList"/>}/>
                <CardContent>
                    <CardContentRow>
                        <CardContentCol wSearchIcon justify={"start"}><input type="text" name="search-form" id="search-form" placeholder={`${t('search')}`} value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} autoComplete="off"/><MagnifyingGlassIcon/></CardContentCol>
                    </CardContentRow>
                    <CardContentRow>
                        <CardColHeader width="75%"><Translator path="cpfFullName"/></CardColHeader>
                        <CardColHeader width="25%"><Translator path="actions"/></CardColHeader>
                    </CardContentRow>
                    {!!patientsList && search(patientsList).map(data => {
                        return (
                            <CardContentRow key={data.uuid}>
                                <CardCol width="75%">
                                    <CardContentCol><strong>{data.cpf}</strong> - {data.nome_completo}</CardContentCol>
                                </CardCol>
                                <CardCol width="25%" display="flex">
                                    {!data.plano_id && <CardContentCol maxWidth={"25px"}><StyledLink uuid={data.uuid} edit="true" header="true" to={`/criar-plano/`+data.uuid} data-tip={t('createPlan')}><PlusIcon/></StyledLink></CardContentCol>}
                                    <CardContentCol maxWidth={"25px"}><StyledLink edit="true" header="true" to={"#"} data-tip={t('deletePlan')}><TrashIcon/></StyledLink></CardContentCol>
                                    <ReactTooltip />
                                </CardCol>
                            </CardContentRow>
                        )
                    })}
                </CardContent>
            </CardContainer>
        </Card>
    )
}