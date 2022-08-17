import React, { useContext, useState } from 'react'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { AuthContext } from '../../firebase/Auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { CardContainer, CardContent, CardContentRow } from '../../components/Card/Card.elements'
import { StyledButton } from '../../components/Button/Button.elements'
import { Card, InfoMenu, Loader } from '../../components'
import DatePicker from "react-datepicker"
import { addMonths, addDays, setHours, setMinutes, getDay } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale } from 'react-datepicker'
import pt from "date-fns/locale/pt-BR"
import AppointmentModel from '../../db/AppointmentModel'
import NutritionistModel from '../../db/NutritionistModel'
import ScheduleModel from '../../db/ScheduleModel'
import { ModalMessage } from '../../components/ModalMessage/ModalMessage'
import { Select } from '../../components/Select/Select'
import { StyledSelect, StyledDatePicker } from '../../components/Select/Select.elements'

registerLocale("pt-BR", pt)

export const MakeAppointment = () => {
    const { currentUser } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(null)
    const [minDate, setMinDate] = useState(null)
    const [excludedTimes, setExcludedTimes] = useState(null)
    const [nutritionists, setNutritionists] = useState(null)
    const [nutritionist, setNutritionist] = useState(null)
    const [minDay, setMinDay] = useState(null)
    const [minMonth, setMonth] = useState(null)
    const [nutriDates, setNutriDates] = useState(null)
    const [modalMessage, setModalMessage] = useState(false);
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState()

    const navigate = useNavigate()
    const nutritionistModel = new NutritionistModel()
    const scheduleModel = new ScheduleModel()
    const appointmentModel = new AppointmentModel()

    const scrollToItem = () => {
        setTimeout(() => {
            let items = document.getElementsByClassName('react-datepicker__time-list-item')
            for (let i = 0; i < items.length; i++) {
                if (items[i].innerHTML === '07:30') {
                    items[i].scrollIntoView()
                }
            }
        }, 250)
    }

    const selectMinDate = () => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if (date.getDay() === 6) { //Sábado, seta data minima para segunda
            setMinDate(addDays(date, 2))
            setMinDay(addDays(date, 2).getDate())
            setMonth(addDays(date, 2).getMonth())
        } else if (date.getDay() === 0 || (hours + 3 > 17)) { //Domingo, seta data minima para segunda, ou hora + 3 > 17, seta proximo dia
            setMinDate(addDays(date, 1))
            setMinDay(addDays(date, 1).getDate())
            setMonth(addDays(date, 1).getMonth())
        } else {
            if (hours + 3 === 17 && minutes > 30) {
                // setMinDate(addDays(date, 1))
                // setMinDay(addDays(date, 1).getDate())
                // setMonth(addDays(date, 1).getMonth())
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
                setMinDay(date.getDate())
                setMonth(date.getMonth())
            } else {
                //exclui as horas passadas da listagem
                let timesExclude = []
                for (let i = hours - 8; i >= 0; i--) {
                    timesExclude.push(setHours(setMinutes(date, 0), hours - i))
                    timesExclude.push(setHours(setMinutes(date, 30), hours - i))
                }
                setExcludedTimes(timesExclude)
                setMinDate(date)
                setMinDay(date.getDate())
                setMonth(date.getMonth())
            }
        }
    }

    const handleCalendarOpen = () => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if (date.getDay() === 6 || date.getDay() === 0 || hours + 3 > 17) {
            scrollToItem()
        } else {
            if (minutes > 30) {
                scrollToItem()
            }
        }
    }

    const getNutritionists = async () => {
        let nutritionistsList = await nutritionistModel.getAllNutritionists()
        setNutritionists(nutritionistsList)
    }

    const isWeekday = (date) => {
        const day = getDay(date)
        return day !== 0 && day !== 6
    }

    const handleChange = (date, event) => {
        if (date.getDate() <= minDay && date.getMonth() <= minMonth) {
            let stDate = new Date(date.getFullYear(), date.getMonth(), minDay, date.getHours(), date.getMinutes())
            setStartDate(stDate)
        } else if (date.getHours() === 0) {
            let stDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, date.getMinutes())
            setStartDate(stDate)
        } else {
            setStartDate(date)            
        }
    }

    const handleClick = async (e) => {
        setLoader(true)
        e.preventDefault()
        let day = (startDate.getDate() < 10) ? "0"+startDate.getDate() : startDate.getDate()
        let month = ((startDate.getMonth()+1) < 10) ? "0"+(startDate.getMonth()+1) : (startDate.getMonth()+1) 
        let date = day + '/' + month + '/' + startDate.getFullYear()

        let hours = (startDate.getHours() < 10) ? "0"+startDate.getHours() : startDate.getHours()
        let minutes = (startDate.getMinutes() < 10) ? "0"+startDate.getMinutes() : startDate.getMinutes()
        let time = hours + ':' + minutes
        
        let nutriId = document.getElementById('selectNutri').value
        await appointmentModel.add(currentUser.uuid, nutriId, date, time)
        await scheduleModel.addNew(nutriId, date, time)
        setMessage("Os dados foram salvos com sucesso")
        setModalMessage(true)
        setLoader(false)
    }

    const hangleChangeSelect = async (e) => {
        setNutritionist(e.target.value)
        let scheduleNutri = await scheduleModel.getAll(e.target.value)
        if (scheduleNutri.length > 0) {
            let dates = []
            scheduleNutri.map(sched => {
                let dateArr = sched.data.split("/")
                let timeArr = sched.horario.split(":")
                let date = new Date(dateArr[2], dateArr[1]-1, dateArr[0], timeArr[0]*1, timeArr[1]*1)
                dates.push(date)
            })
            setNutriDates(dates)
            setExcludedTimes(dates)
        } else {
            setExcludedTimes(excludedTimes)
        }
    }

    const hangleChangeDateTime = async (dateSel) => {
        let scheduleNutri = await scheduleModel.getAll(nutritionist)
        if (scheduleNutri.length > 0) {
            let dates = []
            scheduleNutri.map(sched => {
                let dateArr = sched.data.split("/")
                let timeArr = sched.horario.split(":")
                if (dateArr[0]*1 === dateSel.getDate()) {
                    let date = new Date(dateArr[2], dateArr[1]-1, dateArr[0], timeArr[0]*1, timeArr[1]*1)
                    dates.push(date)
                }
            })
            setNutriDates(dates)
            setExcludedTimes(dates)
        } else {
            setExcludedTimes(excludedTimes)
        }
    }

    // const getExcludedTimes = () => {
    //     let arrSpecificDates = []
    //     for (let i = 0; i < nutriDates.length; i++) {
    //       if (moment(startDate, moment.ISO_8601).format("YYYY/MM/DD") === moment(nutriDates[i], moment.ISO_8601).format("YYYY/MM/DD")) {
    //         arrSpecificDates.push(moment(nutriDates[i], moment.ISO_8601).toObject())
    //       }
    //     }

    //     let arrExcludedTimes = []
    //     // arrExcludedTimes.push(excludedTimes)
    //     for (let i = 0; i < arrSpecificDates.length; i++) {
    //       arrExcludedTimes.push(setHours(setMinutes(new Date(arrSpecificDates[i].minutes),arrSpecificDates[i].hours)));
    //       console.log(arrExcludedTimes)
    //       setExcludedTimes(arrExcludedTimes)
    //     }
    // }

    const displayNutritionists = () => {
        var sel = document.getElementById('selectNutri')
        if (!!sel) {
            while (sel.hasChildNodes()) {
                sel.removeChild(sel.firstChild);
            }    
        }
        if (!!nutritionists) {
            let opt = document.createElement('option')
            opt.textContent += 'Selecione um nutricionista' // or opt.innerHTML += user.name
            sel.appendChild(opt)
            nutritionists.forEach(nutri => {
                let opt = document.createElement('option')
                opt.value = nutri.uuid
                opt.textContent += nutri.nome_completo // or opt.innerHTML += user.name
                sel.appendChild(opt)
            })
            sel.addEventListener("change", hangleChangeSelect)
        }
    }

    const pull_data = (data, propsSuccess) => {
        setModalMessage(data)
        if (!!propsSuccess) {
            navigate("/minhas-consultas", { replace: true });
        }
    }
    
    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!!!minDate) {
        selectMinDate()
        getNutritionists()
    }

    (!nutritionist) && displayNutritionists()

    return (
        <>
        {!!loader && (
            <>
                <Loader/>
            </>
        )}
        {modalMessage && (
            <>
                <ModalMessage func={pull_data} success={true}>{message}</ModalMessage>
            </>
        )}
            <Card maxWidth={"100%"} cardTitle={"Agendar consulta"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu menuState={"Agendar consulta"}/>
                    <Card margin={"0 auto"} showTitle={"none"}>
                        <form>
                            <CardContentRow fDirection={"column"}>
                                <StyledSelect className="select-nutri" id="selectNutri"></StyledSelect>
                                {/* {!!nutritionists && nutritionists.forEach(nutri => {
                                    return (
                                        <option value="Teste">Teste - {nutri.nome_completo}</option>
                                    )
                                })} */}
                                <StyledDatePicker>
                                    <DatePicker 
                                    // disabled
                                    selected={startDate}
                                    onChange={handleChange}
                                    onSelect={hangleChangeDateTime}
                                    locale={pt}
                                    minDate={minDate}
                                    maxDate={addMonths(new Date(), 3)}
                                    filterDate={isWeekday}
                                    // excludeDates={excludedDates}
                                    minTime={setHours(setMinutes(minDate, 0), 8)}
                                    maxTime={setHours(setMinutes(minDate, 30), 17)}
                                    excludeTimes={excludedTimes}
                                    placeholderText="Selecione uma data e um horário"
                                    showTimeSelect
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    onCalendarOpen={handleCalendarOpen}
                                    withPortal
                                    />
                                </StyledDatePicker>
                                <StyledButton primary hasIcon marginTop={"20px"} onClick={handleClick}>marcar consulta<ArrowRightIcon/></StyledButton>

                            </CardContentRow>
                        </form>
                    </Card>
                </CardContainer>
            </Card>
        </>
    )
}