import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { Card, InfoMenu } from '../../components'
import { StyledButton } from '../../components/Button/Button.elements'
import { CardContainer, CardContent, CardContentCol, CardContentRow, CardPlanDroppableColumn, CardPlanColumn, CardPlanTitle, CardPlanItem, CardPlanFlexItem, CardPlanFlexWrapper } from '../../components/Card/Card.elements'
import { Dialog } from '../../components/Dialog/Dialog'
import { AuthContext } from '../../firebase/Auth'
import {MagnifyingGlassIcon, PlusIcon} from '@radix-ui/react-icons'
import './index.css'

export const Create = () => {
    const { currentUser } = useContext(AuthContext)
    const [text, updateText] = useState([])
    const [textList, setTextList] = useState({
        sunday: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
    })

    const item = {
        id: v4(),
        name: "ABARÁ"
    }

    const item2 = {
        id: v4(),
        name: "AÇAÍ"
    }

    const item3 = {
        id: v4(),
        name: "Cerveja"
    }

    const item4 = {
        id: v4(),
        name: "Peixe"
    }

    const item5 = {
        id: v4(),
        name: "Batata frita com queijo parmesão e bacon"
    }

    const item6 = {
        id: v4(),
        name: "Sorvete de creme"
    }

    const item7 = {
        id: v4(),
        name: "Milho verde"
    }

    const [itemsList, updateItemsList] = useState({
        "sunday": {
            title: "Domingo",
            items: [item, item3]
        },
        "monday": {
            title: "Segunda",
            items: [item2]
        },
        "tuesday": {
            title: "Terça",
            items: []
        },
        "wednesday": {
            title: "Quarta",
            items: [item6]
        },
        "thursday": {
            title: "Quinta",
            items: [item7]
        },
        "friday": {
            title: "Sexta",
            items: [item4]
        },
        "saturday": {
            title: "Sábado",
            items: [item5]
        }
    })

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
        const { name } = e.target
        const key = name
        if (!textList[key]['value']) {
            return false
        }
        updateItemsList(prev => {
            return {
                ...prev,
                [key]: {
                    title: textList[key]['title'],
                    items: [
                        {
                            id: v4(),
                            name: textList[key]['value']
                        },
                        ...prev[key].items
                    ]
                }
            }
        })
        setTextList(prev => ({
            ...prev,
            [key]: {
                title: textList[key]['title'],
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
        <Card cardTitle={"Criar plano nutricional"} maxWidth={"100%"}>
            <CardContainer justify={"space-between"} maxWidth={"100%"} display={"flex"}>
                <InfoMenu menuState={"Criar plano nutricional"}/>
                <CardContent>
                    <CardContentRow className={text}>
                        <CardContentCol wSearchIcon fontSize overflowVisible={"visible"}>
                            <input placeholder="Pesquise..." type="text" value={text} onChange={(e) => updateText(e.target.value)}></input>
                            <MagnifyingGlassIcon/>
                        </CardContentCol>
                        <StyledButton width="initial" mLeft="10px" onClick={addItem} primary>Adicionar<PlusIcon/></StyledButton>
                    </CardContentRow>
                    <CardContentRow>
                        <CardContentCol>
                            <Dialog></Dialog>
                        </CardContentCol>
                    </CardContentRow>
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
                                                        {provided.placeholder}
                                                        <CardPlanFlexWrapper>
                                                            <CardPlanFlexItem>
                                                                <input placeholder="Pesquise..." type="text" value={textList[`${key}`]['value']} name={key} title={data.title} onChange={handleChange} autoComplete="off"></input>
                                                                <MagnifyingGlassIcon/>
                                                            </CardPlanFlexItem>    
                                                            <StyledButton onClick={(e) => addItem(e)} name={key} primary>Adicionar<PlusIcon/></StyledButton>
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