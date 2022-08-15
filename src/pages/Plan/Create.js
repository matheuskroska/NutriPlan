import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Navigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { AuthContext } from '../../firebase/Auth'
import './index.css'

export const Create = () => {
    const { currentUser } = useContext(AuthContext)
    const [text, updateText] = useState([])

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

    const addItem = () => {
        updateItemsList(prev => {
            return {
                ...prev,
                sunday: {
                    title: "Domingo",
                    items: [
                        {
                            id: v4(),
                            name: text
                        },
                        ...prev.sunday.items
                    ]
                }
            }
        })
        updateText("")
    }

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    } else if (!currentUser.isNutri) {
        return <Navigate to="/" replace />
    }

    return (
        <div>
            <div className={text}>
                <input type="text" value={text} onChange={(e) => updateText(e.target.value)}></input>
                <button onClick={addItem}>Adicionar</button>
            </div>
            <br />
            <div className="App">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {_.map(itemsList, (data, key) => {
                        return (
                            <div key={key} className={"column"}>
                                <h3>{data.title}</h3>
                                <Droppable droppableId={key}>
                                    {(provided) => {
                                        return (
                                            <div ref={provided.innerRef} {...provided.droppableProps} className={`droppable-col ${key}`}>
                                                {data.items.map((el, index) => {
                                                    return (
                                                        <Draggable key={el.id} index={index} draggableId={el.id}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`item ${snapshot.isDragging && "dragging"}`}>
                                                                        {el.name}
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        )
                    })}
                </DragDropContext>
            </div>
        </div>
    )
}