import styled from "styled-components/macro";
import { css } from "styled-components";

export const StyledError = styled.span`
    color: var(--font-dark);
    display: flex;
    align-items: center;
    font-size: 1.3em;
    font-weight: 600;
    gap: 0 10px;
    width: 100%;

    ${props => props.visibility ?
    css`
        visibility: visible;
        opacity: 1;
        height: auto;
        margin-top: 10px;
    ` : 
    css`
        visibility: hidden;
        opacity: 0;
        height: 0;
    `};
    transition: 0.5s all;
`