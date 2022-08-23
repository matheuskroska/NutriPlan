import _ from 'lodash'
import React, { useContext, useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { Card, InfoMenu } from '../../components'
import { StyledButton } from '../../components/Button/Button.elements'
import { CardContainer, CardContent, CardContentCol, CardContentRow, CardPlanDroppableColumn, CardPlanColumn, CardPlanTitle, CardPlanItem, CardPlanFlexItem, CardPlanFlexWrapper } from '../../components/Card/Card.elements'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogRoot, DialogTitle, DialogTrigger } from '../../components/Dialog/Dialog'
import { AuthContext } from '../../firebase/Auth'
import {Cross2Icon, PlusIcon} from '@radix-ui/react-icons'
import './index.css'
import { Translator } from '../../components/I18n'
import { useTranslation } from 'react-i18next'
import { Fieldset, Flex, IconButton, Input, Label } from '../../components/Dialog/Dialog.elements'
import { StyledDatePicker } from '../../components/Select/Select.elements'
import { addDays, setHours, setMinutes } from 'date-fns'
import DatePicker from "react-datepicker"
import axios from "axios";

export const Create = () => {
    const { currentUser } = useContext(AuthContext)
    const { t } = useTranslation()
    const [textList, setTextList] = useState({
        sunday: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
    })
    const [time, setTime] = useState(null)
    const [food, setFood] = useState(null)
    const [foodOption, setFoodOption] = useState(null)
    const [selectState, setSelectState] = useState(null);
    const [itemsList, updateItemsList] = useState({
        "sunday": {
            title: "Domingo",
            items: []
        },
        "monday": {
            title: "Segunda",
            items: []
        },
        "tuesday": {
            title: "Terça",
            items: []
        },
        "wednesday": {
            title: "Quarta",
            items: []
        },
        "thursday": {
            title: "Quinta",
            items: []
        },
        "friday": {
            title: "Sexta",
            items: []
        },
        "saturday": {
            title: "Sábado",
            items: []
        }
    })


    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/search',
        params: {
            query: ""
        },
        headers: {
            'X-RapidAPI-Key': '893dfc6070msh83cc056cdf0781cp19e41ajsn0e3b1cf5f171',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    const requestToApi = (text) => {
        options.params.query = text;
        axios.request(options).then(function (response) {
            setFoodOption(response.data);
            setSelectState(true)
        }).catch(function (error) {
            console.error(error);
        });  
    }

    const clearInput = (e) => {
        document.getElementById("food").value = e.target.innerText;
    }
 
    const search = _.debounce((text) => {
        if(text && text.length > 3) {
            requestToApi(text)
        }
      }, 1500);
      

    const handleDragEnd = ({destination, source}) => {
        if (!destination) return //dropando fora das caixas
        if (destination.index === source.index && destination.droppableId === source.droppableId) return //dropando no mesmo lugar

        //Cria cópia do item antes de remover do array
        const itemCopy = {...itemsList[source.droppableId].items[source.index]}
        updateItemsList(prev => {
            prev = {...prev}
            prev[source.droppableId].items.splice(source.index, 1) //remove item do array de origem

            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)  //adiciona item no array de destino
            return prev
        })
    }

    const addItem = (e) => {
        const { name, title } = e.target
        const key = name
        const minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
        const timeToShow = time.getHours() + ':' + minutes
        updateItemsList(prev => {
            return {
                ...prev,
                [key]: {
                    title: title,
                    items: [
                        {
                            id: v4(),
                            name: timeToShow + ' - ' + food
                        },
                        ...prev[key].items
                    ]
                }
            }
        })
        setTextList(prev => ({
            ...prev,
            [key]: {
                title: title,
                value: ''
            }
        }))
    }

    const handleChange = (e) => {
        const { name, value, title } = e.target
        setTextList(prev => ({
            ...prev,
            [name]: {
                title: title,
                value: value
            }
        }))
    }

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!currentUser.isNutri) {
        return <Navigate to="/" replace />
    }

    return (
        <Card cardTitle={<Translator path="createPlan"/>} maxWidth={"100%"}>
            <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                <InfoMenu menuState={<Translator path="createPlan"/>}/>
                <CardContent>
                    <CardContentRow gap={"0 10px"}>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            {_.map(itemsList, (data, key) => {
                                return (
                                    <CardPlanColumn key={key}>
                                        <CardPlanTitle>{data.title}</CardPlanTitle>
                                        <Droppable droppableId={key}>
                                            {(provided) => {
                                                return (
                                                    <CardPlanDroppableColumn ref={provided.innerRef} {...provided.droppableProps} className={`droppable-col ${key}`}>
                                                        <CardPlanFlexWrapper>
                                                        {data.items.map((el, index) => {
                                                            return (
                                                                <Draggable key={el.id} index={index} draggableId={el.id}>
                                                                    {(provided, snapshot) => {
                                                                        return (
                                                                            <CardPlanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`item ${snapshot.isDragging && "dragging"}`}>
                                                                                {el.name}
                                                                            </CardPlanItem>
                                                                        )
                                                                    }}
                                                                </Draggable>
                                                            )
                                                        })}
                                                        </CardPlanFlexWrapper>
                                                        {provided.placeholder}
                                                        <CardPlanFlexWrapper>
                                                            <CardPlanFlexItem>
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <StyledButton primary><Translator path="add"/><PlusIcon/></StyledButton>
                                                                    </DialogTrigger>
                                                                    <DialogContent >
                                                                        <DialogTitle><Translator path="addInfo"/></DialogTitle>
                                                                        <DialogDescription><Translator path="selTimeFood"/></DialogDescription>
                                                                        <Fieldset>
                                                                            <Label htmlFor="name"><Translator path="time"/></Label>
                                                                            <StyledDatePicker>
                                                                            <DatePicker
                                                                                selected={time}
                                                                                onChange={setTime}
                                                                                showTimeSelect={true}
                                                                                showTimeSelectOnly={true}
                                                                                timeIntervals={30}
                                                                                timeCaption={t('time')}
                                                                                minTime={setHours(setMinutes(addDays(new Date(), 1), 0), 8)}
                                                                                maxTime={setHours(setMinutes(addDays(new Date(), 1), 30), 17)}
                                                                                dateFormat="HH:mm"
                                                                                timeFormat="HH:mm"
                                                                                placeholderText={t('selTime')}
                                                                                // withPortal
                                                                            />
                                                                            </StyledDatePicker>
                                                                        </Fieldset>
                                                                        <Fieldset>
                                                                            <div className='searchInput'>
                                                                                <Label htmlFor="food"><Translator path="food"/></Label>
                                                                                <Input id="food" placeholder={t('selFood')} onChange={(e) => search(e.target.value)}/>
                                                                            </div>
                                                                            {selectState && (
                                                                                <ul className='searchResult'>
                                                                                    {foodOption.results.map((data) => {
                                                                                        return (
                                                                                            <li id={data.id} key={data.id} onClick={(e) => {setFood(data.name);setSelectState(false);clearInput(e)}}>{data.name}</li>
                                                                                        )
                                                                                    })}      
                                                                                </ul>    
                                                                            )}
                                                                        </Fieldset>
                                                                        <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                                                                            <DialogClose asChild>
                                                                                <StyledButton onClick={(e) => addItem(e)} name={key} title={data.name} primary variant="green"><Translator path="save"/></StyledButton>
                                                                            </DialogClose>
                                                                        </Flex>
                                                                        <DialogClose asChild>
                                                                            <IconButton aria-label="Close">
                                                                                <Cross2Icon />
                                                                            </IconButton>
                                                                        </DialogClose>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </CardPlanFlexItem>    
                                                            {/* <StyledButton onClick={(e) => addItem(e)} name={key} primary><Translator path="add"/><PlusIcon/></StyledButton> */}
                                                        </CardPlanFlexWrapper>
                                                    </CardPlanDroppableColumn>
                                                )
                                            }}
                                        </Droppable>
                                    </CardPlanColumn>
                                )
                            })}
                        </DragDropContext>
                    </CardContentRow>
                </CardContent>
            </CardContainer>
        </Card>

    )
}