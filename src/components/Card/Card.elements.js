import styled from "styled-components";

export const CardContainer = styled.div`
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 15px;
    position: relative;
`
export const CardInput = styled.input`
        border-radius: 15px;
    border: 1px solid #66A571;
    color: #66A571;
    width: ${props => props.inputWidth || "100%"};
    padding: 0px 10px;
    height: 35px;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 0 20px;
    ::placeholder {
        color: rgb(102 165 113 / 55%);
    }
`

export const CardWrapper = styled.div`
    padding: 20px 64px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: var(--secundary);
    border-radius: 0 0 15px 15px;
`

export const CardItem = styled.div`
    display: flex;
    margin-bottom: 13px;
    gap: ${props => props.gap || "8px"};
    justify-content: ${props => props.justifyContent || "initial"};
`

export const CardTitle = styled.h1`
    font-weight: bold;
    font-size: 48px;
    color: var(--font-dark);
    text-align: center;
    margin: 25px 0 25px 0;
`

export const CardButton = styled.div`
    border-radius: 25px;
    background-color: var(--primary);
    max-width: 155px;
    height: 55px;
    font-size: 24px;
    font-weight: 500;
    color: var(--font-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;
`

