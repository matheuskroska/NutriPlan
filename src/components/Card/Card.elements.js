import styled from "styled-components";
import { css } from "styled-components";
import InputMask from 'react-input-mask';

export const CardContainer = styled.div`
    max-width: ${props => props.maxWidth || "420px"};
    display: ${props=> props.display || "initial"};
    justify-content: ${props=> props.justify || "initial"};
    width: 100%;
    margin: ${props=> props.margin || "0 auto"};
    border-radius: ${props=> props.borderRadius || "5px"};
    position: relative;
`
export const CardInput = styled.input`
    border-radius: 5px;
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

export const CardInputMask = styled(InputMask)`
    border-radius: 5px;
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
`;


export const CardWrapper = styled.div`
    display: block;
    padding: 26px 32px;
    box-shadow: ${props => props.boxShadow || "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"};
    background-color: rgb(111 140 67 / 90%);
    border-radius: ${props => props.borderRadius || "0 0 5px 5px"};
`

export const CardItem = styled.div`
    display: flex;
    flex-wrap: ${props => props.wrap || "wrap"};
    width: ${props => props.width || "initial"};
    max-width: ${props => props.maxWidth || "initial"};
    margin-bottom: ${props => props.marginBottom || "10px"};
    gap: ${props => props.gap || "0 8px"};
    justify-content: ${props => props.justifyContent || "initial"};
    input:not(:placeholder-shown):invalid ~ span {
        visibility: visible;
        opacity: 1;
        height: 10px;
        margin-top: 10px;
        transition-delay: 2s;
        color: var(--deny-dark);
    }

    input:not(:placeholder-shown):invalid {
        border-color: 1px solid var(--deny);
        transition-delay: 2s;
        color: var(--deny);
    }

    input:focus {
        border-color: var(--tertiary);
    }

    a {
        color: var(--font-soft);
        font-size: 1.3em;
        font-weight: 400;
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
    border-radius: ${props => props.borderRadius || "5px 5px 0 0"};
`
export const CardDescription = styled.h2`
    font-size: 1.3em;
    font-weight: 400;
    margin: 10px 0;
    color: var(--font-soft);
    min-width: fit-content;
    margin-right: 15px;
`

export const CardMessage = styled.h2`
    font-size: 1.4em;
    line-height: 1.3em;
    margin: 10px 0;
    text-align: center;
    color: var(--font-soft);
    min-width: fit-content;
`

export const CardMenuContainer = styled.div`
    color: var(--font-dark);
    text-align: center;
    background-color: rgb(170 215 108 / 90%);
    border-radius: 5px;
    min-width: 300px;
    margin-right: 32px;
`

export const CardMenuHeader = styled.div`
    padding: 0.5em;
    font-weight: bold;
    border-radius: 5px;
    background-color: rgb(255 255 255 / 90%);
    color: var(--font-dark);
    font-size: 2.5em;
`

export const CardAvatar = styled.img`
        padding: 0.5em;
    width: 4em;
    height: 4em;
    border-radius: 50%;
    object-fit: cover;
`

export const CardMenuItem = styled.div`
    padding: 0.5em;
    font-size: 1.6em;
    ${props => props.selected ?
    css`
        background-color: rgb(111 140 67 / 90%);
        color: var(--font-soft);
    ` : 
    css`
        color: var(--font-dark);
    `};
`

export const CardContent = styled.div`
    display: block;
    border-radius: 5px;
    width: 100%;
`

export const CardContentRow = styled.div`
    padding: 0.5em;
    /* border-radius: 5px; */
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    /* :not(:first-child) {
        margin-top: 2em;
    } */
    :first-child {
        border-radius: 5px;
        margin-bottom: 10px;
    }

    :nth-child(2) {
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }

    :last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    :not(:first-child):nth-child(odd) {
        background-color: #f8f8f8;
    }
`

export const CardContentHeader = styled.div`
    padding: 0.5em;
    color: var(--font-dark);
    display: block;
    width: ${props => props.icon ? "5%" : "100%"};
`

export const CardContentCol = styled.div`
    padding: 0.5em;
    color: var(--font-dark);
    display: flex;
    font-size: ${props => props.fontSize ? "1em" : "1.6em"};
    white-space: nowrap;
    align-items: center;
    justify-content: ${props => props.justify || "center"};
    overflow: hidden;
    text-overflow: ellipsis;
    width: ${props => props.icon ? "5%" : "100%"};
    max-width: ${props => props.maxWidth || "initial"};
    min-width: ${props => props.maxWidth || "initial"};
    strong {
        font-weight: bold;
    }

    svg {
        width: 25px;
    }

    a {
        color: var(--font-dark);
    }

    ${props => props.wSearchIcon &&
    css`
        input {
            width: 100%;
        }

        position: relative;
        svg {
            position: absolute;
            right: 10px;
        }
        input {
            border: 1px solid var(--secondary);
            padding: 5px 10px;
            border-radius: 5px;
        }
    `
    };

    ${props => props.confirmTheme &&
    css`
        background-color: var(--primary);
        color: var(--font-dark);
        border-radius: 5px;
        font-size: 1em;
        cursor: pointer;
        :hover {
            background-color: var(--tertiary);
            color: var(--font-soft);
        }

    `};

    ${props => props.denyTheme &&
    css`
        background-color: var(--deny);
        color: var(--font-soft);
        border-radius: 5px;
        font-size: 1em;
        cursor: pointer;
        :hover {
            background-color: var(--deny-dark);
            color: var(--font-soft);
        }
    `};
`