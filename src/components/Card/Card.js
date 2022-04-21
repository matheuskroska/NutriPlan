import React  from 'react';
import {CardContainer,CardWrapper,CardTitle} from './Card.elements'

export const Card = (props) => {
    return (
        <>
            <CardContainer maxWidth={props.maxWidth} display={props.display}>
                <CardTitle>{props.cardTitle}</CardTitle>
                <CardWrapper> 
                    {props.children}
                </CardWrapper>
            </CardContainer> 
        </>
    )
}