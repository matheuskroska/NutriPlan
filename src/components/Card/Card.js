import React  from 'react';
import {CardContainer,CardWrapper,CardTitle} from './Card.elements'

export const Card = (props) => {
    return (
        <>
            <CardContainer margin={props.margin} borderRadius={props.borderRadius} maxWidth={props.maxWidth} display={props.display}>
                <CardTitle showTitle={props.showTitle} borderRadius={props.borderRadius} >{props.cardTitle}</CardTitle>
                <CardWrapper boxShadow={props.borderRadius} borderRadius={props.borderRadius}> 
                    {props.children}
                </CardWrapper>
            </CardContainer> 
        </>
    )
}