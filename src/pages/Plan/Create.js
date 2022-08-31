import _ from 'lodash'
import React, { useContext, useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { Card, InfoMenu } from '../../components'
import { StyledButton } from '../../components/Button/Button.elements'
import { CardContainer, CardContent, CardContentRow, CardPlanDroppableColumn, CardPlanColumn, CardPlanTitle, CardPlanItem, CardPlanFlexItem, CardPlanFlexWrapper, CardNutritionalValueContainer, CardNutritionalValueTitle, CardNutritionalValueSubtitle, CardNutritionalValueList, CardNutritionalValueListItemHeader, CardNutritionalValueListItem, CardPlanWrapper } from '../../components/Card/Card.elements'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../../components/Dialog/Dialog'
import { AuthContext } from '../../firebase/Auth'
import {Cross2Icon, IdCardIcon, PlusIcon} from '@radix-ui/react-icons'
import './index.css'
import { Translator } from '../../components/I18n'
import { useTranslation } from 'react-i18next'
import { Fieldset, Flex, IconButton, Input, Label } from '../../components/Dialog/Dialog.elements'
import { StyledDatePicker } from '../../components/Select/Select.elements'
import { addDays, setHours, setMinutes } from 'date-fns'
import DatePicker from "react-datepicker"
import axios from "axios"
import { ModalMessage } from '../../components/ModalMessage/ModalMessage'
import PlanModel from '../../db/PlanModel'

export const Create = () => {
    const { currentUser } = useContext(AuthContext)
    const { t } = useTranslation()
    const [time, setTime] = useState(null)
    const [food, setFood] = useState('')
    const [foodOption, setFoodOption] = useState(null)
    const [foodDetails, setFoodDetails] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [volume, setVolume] = useState(null)
    const [selectState, setSelectState] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [itemKey, setItemKey] = useState(null)
    const [modalMessage, setModalMessage] = useState(false)
    const [message, setMessage] = useState(null)
    const [detailsInput, setDetailsInput] = useState(null)
    const [foodName, setFoodName] = useState(null)
    const [edit, setEdit] = useState(false)
    const [itemData, setItemData] = useState(false)
    const [itemsList, setItemsList] = useState({
        "sunday": {
            title: t('sunday'),
            items: []
        },
        "monday": {
            title: t('monday'),
            items: []
        },
        "tuesday": {
            title: t('tuesday'),
            items: []
        },
        "wednesday": {
            title: t('wednesday'),
            items: []
        },
        "thursday": {
            title: t('thursday'),
            items: []
        },
        "friday": {
            title: t('friday'),
            items: []
        },
        "saturday": {
            title: t('saturday'),
            items: []
        }
    })

    const orderItems = (a, b) => {
        if (a.timeAndFood.toLowerCase() < b.timeAndFood.toLowerCase()){
            return -1;
        }
        if (a.timeAndFood.toLowerCase() > b.timeAndFood.toLowerCase()){
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                itemsList[itemKey].items.sort(orderItems)
                setIsActive(false)
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, itemsList])

    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/search',
        params: {
            query: ""
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    const optionsDetail = {
        method: 'GET',
        url: '',
        params: {amount: '', unit: ''},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
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

    const changeInputToSelected = (e) => {
        setFoodName(e.target.innerText)
        document.getElementById("food").value = e.target.innerText;
        setDetailsInput(true);
    }
    
    const handleClickDetails = (e, food) => {
        if(!quantity) {
            e.preventDefault()
            setMessage(t('quantityEmpty'))
            setModalMessage(true)
            return false
        }

        if(!volume) {
            e.preventDefault()
            setMessage(t('volumeEmpty'))
            setModalMessage(true)
            return false
        }

        getFoodDetails(food)
    }

    const getFoodDetails = (food) => {
        const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/'+ food.id +'/information';
        optionsDetail.url = url;
        optionsDetail.params.amount = volume.toString();
        optionsDetail.params.unit = quantity.toString();

        axios.request(optionsDetail).then(function (response) {
            setFoodDetails(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const search = _.debounce((text) => {
        if(text && text.length > 3) {
            requestToApi(text)
        } else {
            setDetailsInput(false)
        }
    }, 1500);

    const handleDragEnd = ({destination, source}) => {
        if (!destination) return //dropando fora das caixas
        if (destination.index === source.index && destination.droppableId === source.droppableId) return //dropando no mesmo lugar

        const itemsInDay = itemsList[destination.droppableId].items.map(el => el.timeAndFood)
        //Cria cópia do item antes de remover do array
        const itemCopy = {...itemsList[source.droppableId].items[source.index]}
        if (!verifyExistsInTime(itemsInDay, itemCopy.time)) {
            return false
        } else {
            setItemsList(prev => {
                prev = {...prev}
                prev[source.droppableId].items.splice(source.index, 1) //remove item do array de origem
    
                prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)  //adiciona item no array de destino
                return prev
            })
            setIsActive(true)
        }
    }
  
    const verifyExistsInTime = (itemsInDay, timeFood) => {
        if (!!itemsInDay && itemsInDay.length > 0 && itemsInDay.toString().includes(timeFood)) {
            setMessage(t('timeExists'))
            setModalMessage(true)
            return false
        }
        return true
    }

    const validateNumber = (e) => {
        if(!/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/.test(e.target.value)) {
            e.target.value = "";
        }
    }

    const editItem = (e) => {
        const hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
        const minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
        const timeFood = hour + ':' + minute

        _.map(itemsList, (data, key) => {
            data.items.map((item, index) => {
                if (item.id === itemData.id) {
                    let newData = {
                        id: v4(),
                        time: timeFood,
                        food: foodName,
                        timeAndFood: timeFood + ' - ' + foodName,
                        volume: volume,
                        quantity: quantity
                    }
                    setItemsList(prev => {
                        prev = {...prev}
                        prev[key].items.splice(index, 1)
                        prev[key].items.splice(index, 0, newData)  //adiciona item com as novas infos no array
                        return prev
                    })
                }
            })
        })
        clearInfos()
        setEdit(false)
    }

    const addItem = (e) => {
        const { name, titleItem } = e.target
        const key = name
        const title = titleItem
        const fName = edit ? foodName : food.name
        if (!time) {
            e.preventDefault()
            setMessage(t('timeEmpty'))
            setModalMessage(true)
            return false
        }
        if (!fName) {
            e.preventDefault()
            setMessage(t('foodEmpty'))
            setModalMessage(true)
            return false
        }
        if(!quantity) {
            e.preventDefault()
            setMessage(t('quantityEmpty'))
            setModalMessage(true)
            return false
        }

        if(!volume) {
            e.preventDefault()
            setMessage(t('volumeEmpty'))
            setModalMessage(true)
            return false
        }
        if (edit) { //quando clicou no item, quer dizer que o mesmo quer edita-lo, redireciona para o método de edição
            editItem(e)
            return false
        }

        setDetailsInput( !detailsInput ? detailsInput : !detailsInput)

        const hour = (time.getHours() < 10 ? '0' : '') + time.getHours()
        const minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
        const timeFood = hour + ':' + minute
        const itemsInDay = itemsList[key].items.map(el => el.timeAndFood)
        if (!verifyExistsInTime(itemsInDay, timeFood)) {
            e.preventDefault()
            return false
        }
        let newData = {
            id: v4(),
            time: timeFood,
            food: fName,
            foodInfo: food,
            timeAndFood: timeFood + ' - ' + fName,
            volume: volume,
            quantity: quantity
        }
        updateItemsList(key, title, newData)
        setItemKey(key)
        clearInfos()
    }

    const deleteItem = (e, itemData) => {
        _.map(itemsList, (data, key) => {
            data.items.map((item, index) => {
                if (item.id === itemData.id) {
                    setItemsList(prev => {
                        prev = {...prev}
                        prev[key].items.splice(index, 1)
                        return prev
                    })
                }
            })
        })
    }

    const clearInfos = () => {
        setTime(null)
        setFood(null)
        setFoodName(null)
        setVolume(null)
        setQuantity(null)
        setIsActive(true)
    }

    const updateItemsList = (key, title, itemData) => {
        setItemsList(prev => {
            return {
                ...prev,
                [key]: {
                    title: title,
                    items: [
                        itemData,
                        ...prev[key].items
                    ]
                }
            }
        })
    }

    const handleClick = () => {
        let cont = 0
        _.map(itemsList, (data, key) => {
            if (data.items.length === 0) {
                cont++
            }
        })
        if (cont === 7) {
            return false
        } else {
            const planModel = new PlanModel()
            planModel.add(itemsList)
        }
    }

    const handleClickItem = (e, itemData) => {
        const hoursMinutes = itemData.time.split(':')
        let newTime = setHours(setMinutes(new Date(), hoursMinutes[1]), hoursMinutes[0])
        setTime(newTime)
        setFoodName(itemData.food)
        setDetailsInput(true)
        setEdit(true)
        setVolume(itemData.volume)
        setQuantity(itemData.quantity)
        setItemData(itemData)
        setFood(itemData.foodInfo)
        document.getElementById("btnAdd").click()
    }

    const pull_data = (data, propsSuccess) => {
        setModalMessage(data)
    }

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!currentUser.isNutri) {
        return <Navigate to="/" replace />
    }

    // window.onbeforeunload = function() {
    //     return "Are you sure you want to leave?";
    // }

    return (
        <>
            {modalMessage && (
                <>
                    <ModalMessage func={pull_data} success={false}>{message}</ModalMessage>
                </>
            )}
            <Card cardTitle={<Translator path="createPlan"/>} maxWidth={"100%"}>
                <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                    <InfoMenu menuState={<Translator path="createPlan"/>}/>
                    <CardContent>
                        {/* <CardContentRow gap={"0 10px"}>
                            <StyledButton onClick={handleClick} primary>Salvar plano</StyledButton>
                        </CardContentRow> */}
                        <CardContentRow gap={"0 10px"}>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                {_.map(itemsList, (data, key) => {
                                    return (
                                        <CardPlanColumn key={key}>
                                            <CardPlanTitle><Translator path={key}/></CardPlanTitle>
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
                                                                                <>
                                                                                    <CardPlanWrapper>
                                                                                        <CardPlanItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`item ${snapshot.isDragging && "dragging"}`} onClick={(e) => handleClickItem(e, el)}>
                                                                                                {el.timeAndFood}
                                                                                        </CardPlanItem>
                                                                                        <StyledButton className="hideClose" primary width="initial">
                                                                                            <Cross2Icon onClick={(e) => deleteItem(e, el)}></Cross2Icon>
                                                                                        </StyledButton>
                                                                                        
                                                                                    </CardPlanWrapper>    
                                                                                </>
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
                                                                            <StyledButton id="btnAdd" primary><Translator path="add"/><PlusIcon/></StyledButton>
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
                                                                                        minTime={setHours(setMinutes(addDays(new Date(), 1), 0), 0)}
                                                                                        maxTime={setHours(setMinutes(addDays(new Date(), 1), 30), 23)}
                                                                                        dateFormat="HH:mm"
                                                                                        timeFormat="HH:mm"
                                                                                        placeholderText={t('selTime')}
                                                                                        // withPortal
                                                                                    />
                                                                                </StyledDatePicker>
                                                                            </Fieldset>
                                                                            <Fieldset>
                                                                                    <Label htmlFor="food"><Translator path="food"/></Label>
                                                                                    <Input id="food" placeholder={t('selFood')} onChange={(e) => search(e.target.value)} defaultValue={foodName} autoComplete="off"/>                                                                                
                                                                                    {selectState && (
                                                                                        <ul className='searchResult'>
                                                                                            {foodOption.results.map((data) => {
                                                                                                return (
                                                                                                    <li id={data.id} key={data.id} onClick={(e) => {setFood(data);setSelectState(false);changeInputToSelected(e)}}>{data.name}</li>
                                                                                                )
                                                                                            })}      
                                                                                        </ul>    
                                                                                    )}
                                                                            </Fieldset>
                                                                            <Fieldset>
                                                                            {detailsInput && (
                                                                                        <>
                                                                                            <Input onChange={(e) => {setVolume(e.target.value);validateNumber(e)}} defaultValue={volume} placeholder="gr/ml"/>
                                                                                            <Input onChange={(e) => {setQuantity(e.target.value);validateNumber(e)}} defaultValue={quantity} placeholder={t('quantity')}/>                                                             
                                                                                            <Dialog>
                                                                                                <DialogTrigger asChild>
                                                                                                    <StyledButton primary onClick={(e) => handleClickDetails(e, food)}><Translator path="seeDetails"/> <IdCardIcon/></StyledButton>
                                                                                                </DialogTrigger>
                                                                                                <DialogContent className="nutriValues">
                                                                                                    {foodDetails && (
                                                                                                        <CardNutritionalValueContainer>
                                                                                                            <CardNutritionalValueTitle><Translator path="name"/> - {foodDetails.name}</CardNutritionalValueTitle>
                                                                                                            <CardNutritionalValueSubtitle><Translator path="quantity"/> - {foodDetails.amount}</CardNutritionalValueSubtitle>
                                                                                                            <CardNutritionalValueList>
                                                                                                                <CardNutritionalValueListItemHeader>
                                                                                                                    <div><Translator path="name"/></div>
                                                                                                                    <div><Translator path="quantity"/> / <Translator path="unit"/></div>
                                                                                                                    <div><Translator path="dailyNecess"/></div>
                                                                                                                </CardNutritionalValueListItemHeader>
                                                                                                                {foodDetails.nutrition.nutrients.map((data) => {
                                                                                                                    return (
                                                                                                                        <>
                                                                                                                            <CardNutritionalValueListItem>
                                                                                                                                <div><Translator path={data.name}/></div>
                                                                                                                                <div>{data.amount} {data.unit}</div>
                                                                                                                                <div>{data.percentOfDailyNeeds}</div>
                                                                                                                            </CardNutritionalValueListItem>
                                                                                                                        </>
                                                                                                                    )
                                                                                                                })}
                                                                                                            </CardNutritionalValueList>
                                                                                                        </CardNutritionalValueContainer>
                                                                                                    )}
                                                                                                    
                                                                                                    <DialogClose asChild>
                                                                                                        <IconButton aria-label="Close">
                                                                                                            <Cross2Icon />
                                                                                                        </IconButton>
                                                                                                    </DialogClose>
                                                                                                </DialogContent>
                                                                                                
                                                                                            </Dialog>
                                                                                        </>  
                                                                                    )}                                                                                
                                                                                    
                                                                            </Fieldset>
                                                                            <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                                                                                <DialogClose asChild>
                                                                                    <StyledButton onClick={(e) => addItem(e)} name={key} titleItem={data.title} primary variant="green">{edit ? <Translator path="update"/> : <Translator path="save"/>}</StyledButton>
                                                                                </DialogClose>
                                                                            </Flex>
                                                                            <DialogClose onClick={() => setDetailsInput( !detailsInput ? detailsInput : !detailsInput)} asChild>
                                                                                <IconButton aria-label="Close">
                                                                                    <Cross2Icon />
                                                                                </IconButton>
                                                                            </DialogClose>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </CardPlanFlexItem>    
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
        </>
    )
}