import {CardContainer,CardWrapper,CardTitle} from './Card.elements'

export const Card = (props) => {
    return (
        <>
            <CardContainer>
                <CardTitle>{props.cardTitle}</CardTitle>
                <CardWrapper> 
                    {props.children}
                </CardWrapper>
            </CardContainer> 
        </>
    )
}