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

registerLocale("pt-BR", pt)

export const Schedule = (props) => {

    const { currentUser } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(null)
    const [minDate, setMinDate] = useState(null)
    const [excludedTimes, setExcludedTimes] = useState(null)

    const selectMinDate = () => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if (hours + 3 > 17) {
            setMinDate(addDays(date, 1))
        } else {
            if (minutes > 30) {
                setMinDate(addDays(date, 1))
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
    
    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!!!minDate) {
        selectMinDate()
    }

    const isWeekday = (date) => {
        const day = getDay(date)
        return day !== 0 && day !== 6
    }

    return (
        <>
            <Card maxWidth={"100%"} cardTitle={"Agendar consulta"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu menuState={"Agendar consulta"}/>
                    <CardContent>
                        <form>
                            <CardContentRow>Nutricionista: Nome</CardContentRow>
                            <CardContentRow>
                                <DatePicker 
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
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
                                <StyledButton primary hasIcon marginTop={"20px"}>marcar consulta<ArrowRightIcon/></StyledButton>
                            </CardContentRow>
                        </form>
                    </CardContent>
                </CardContainer>
            </Card>
        </>
    )
}