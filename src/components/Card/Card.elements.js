import styled from "styled-components";

export const CardContainer = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 15px;
    position: relative;
`
export const CardInput = styled.input`
    border-radius: 15px;
    border: 1px solid #66A571;
    color: var(--font-dark);
    width: ${props => props.inputWidth || "100%"};
    height: 31px;
    font-size: 1.3em;
    font-weight: 400;
    outline: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 0 20px;
    ::placeholder {
        color: rgb(74 77 38 / 50%);
    }
    
`

export const CardWrapper = styled.div`
    display: block;
    padding: 26px 32px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: rgb(111 140 67 / 90%);
    border-radius: 0 0 15px 15px;
`

export const CardItem = styled.div`
    display: flex;
    flex-wrap: ${props => props.wrap || "wrap"};
    margin-bottom: 10px;
    gap: ${props => props.gap || "0 8px"};
    justify-content: ${props => props.justifyContent || "initial"};
    input:not(:placeholder-shown):invalid ~ span {
        visibility: visible;
        opacity: 1;
        height: auto;
        margin-top: 10px;
    }

`

export const CardItemContainer = styled.div`
    opacity: ${props => props.visibility ? "1" : "0"};
    max-height: ${props => props.visibility ? "100%" : "0"};
    transition: all 1.5s ease-in-out;
`

export const CardTitle = styled.h1`
    font-weight: bold;
    font-size: 2.8em;
    color: var(--font-dark);
    text-align: center;
    padding: 25px 0 25px 0;
    background-color: rgb(255 255 255 / 90%);
    border-radius: 15px 15px 0 0;
`
export const CardDescription = styled.h2`
    font-size: 1.3em;
    font-weight: 400;
    margin: 10px 0;
    color: var(--font-soft);
    min-width: fit-content;
    margin-right: 15px;
`



