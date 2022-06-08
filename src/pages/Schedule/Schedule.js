import React, { useContext, useState } from 'react'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { AuthContext } from '../../firebase/Auth'
import { Navigate } from 'react-router-dom'
import { CardContainer, CardContent, CardContentRow } from '../../components/Card/Card.elements'
import { StyledButton } from '../../components/Button/Button.elements'
import { Card, InfoMenu } from '../../components'
import DatePicker from "react-datepicker"
import { addMonths, addDays, setHours, setMinutes, getDay } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale } from 'react-datepicker'
import pt from "date-fns/locale/pt-BR"
import AppointmentModel from '../../db/AppointmentModel'
import NutritionistModel from '../../db/NutritionistModel'
import UserModel from '../../db/UserModel'

registerLocale("pt-BR", pt)

export const Schedule = (props) => {

    const { currentUser } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(null)
    const [minDate, setMinDate] = useState(null)
    const [excludedTimes, setExcludedTimes] = useState(null)
    const [nutritionists, setNutritionists] = useState(null)
    const userModel = new UserModel()

    const selectMinDate = () => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if (date.getDay() === 6) { //Sábado, seta data minima para segunda
            setMinDate(addDays(date, 2))
            // setStartDate(addDays(date, 2)) 
        } else if (date.getDay() === 0) { //Domingo, seta data minima para segunda
            setMinDate(addDays(date, 1))
            // setStartDate(addDays(date, 1))
        } else if (hours + 3 > 17) {
            setMinDate(addDays(date, 1))
            // setStartDate(addDays(date, 1))
        } else {
            if (minutes > 30) {
                setMinDate(addDays(date, 1))
                // setStartDate(addDays(date, 1))
            } else {
                //exclui as próximas 3 horas da listagem
                setExcludedTimes([
                    setHours(setMinutes(date, 0), hours),
                    setHours(setMinutes(date, 30), hours),
                    setHours(setMinutes(date, 0), hours + 1),
                    setHours(setMinutes(date, 30), hours + 1),
                    setHours(setMinutes(date, 0), hours + 2),
                    setHours(setMinutes(date, 30), hours + 2),
                    setHours(setMinutes(date, 0), hours + 3),
                    setHours(setMinutes(date, 30), hours + 3),
                ])
                setMinDate(date)
            }
        }
    }

    const getNutritionists = async () => {
        let nutritionistModel = new NutritionistModel()
        let nutritionistsList = await nutritionistModel.getAllNutritionists()
        let userModel = new UserModel()
        let nome = await userModel.getNameByUuid("ViiNzvN8zBdwEg4NRHJsm63rgmz2")
        setNutritionists(nutritionistsList)
    }
    
    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!!!minDate) {
        selectMinDate()
        getNutritionists()
    }

    const isWeekday = (date) => {
        const day = getDay(date)
        return day !== 0 && day !== 6
    }

    const handleChange = (date, event) => {
        console.log('onChange', date, event)
        setStartDate(date)
    }

    const handleClick = (e) => {
        e.preventDefault()
        let day = (startDate.getDate() < 10) ? "0"+startDate.getDate() : startDate.getDate()
        let month = ((startDate.getMonth()+1) < 10) ? "0"+(startDate.getMonth()+1) : (startDate.getMonth()+1) 
        let date = day + '/' + month + '/' + startDate.getFullYear()

        let time = startDate.getHours() + ':' + startDate.getMinutes()
        
        // AppointmentModel.saveAppointment(date, time)
        console.log(date + ' ' + time)
    }

    return (
        <>
            <Card maxWidth={"100%"} cardTitle={"Agendar consulta"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu menuState={"Agendar consulta"}/>
                    <CardContent>
                        <form>
                            <CardContentRow>
                                <select>
                                {/* {!!nutritionists && nutritionists.map(key => {
                                    return (
                                        <option>{nutritionists[key].nome_completo}</option>
                                    )
                                })} */}
                                {!!nutritionists && nutritionists.forEach(async (value) => {
                                    let user = await userModel.getUserByUid(value.usuario_uuid)
                                    console.log(user.nome_completo)
                                    return (
                                        <option>{user.nome_completo}</option>
                                    )
                                })}
                                </select>
                            </CardContentRow>
                            <CardContentRow>
                                <DatePicker 
                                    // disabled
                                    selected={startDate}
                                    onChange={handleChange}
                                    locale={pt}
                                    minDate={minDate}
                                    maxDate={addMonths(new Date(), 3)}
                                    filterDate={isWeekday}
                                    // excludeDates={excludedDates}
                                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                                    maxTime={setHours(setMinutes(new Date(), 30), 17)}
                                    excludeTimes={excludedTimes}
                                    placeholderText="Selecione uma data e um horário"
                                    showTimeSelect
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    withPortal
                                />
                            </CardContentRow>
                            <CardContentRow>
                                <StyledButton primary hasIcon marginTop={"20px"} onClick={handleClick}>marcar consulta<ArrowRightIcon/></StyledButton>
                            </CardContentRow>
                        </form>
                    </CardContent>
                </CardContainer>
            </Card>
        </>
    )
}