import {CardContainer,CardWrapper,CardTitle} from './Card.elements'

export const Card = (props) => {
    return (
        <>
            <CardContainer menu={props.menu}>
                <CardTitle>{props.cardTitle}</CardTitle>
                <CardWrapper> 
                    {props.children}
                </CardWrapper>
            </CardContainer> 
        </>
    )
}