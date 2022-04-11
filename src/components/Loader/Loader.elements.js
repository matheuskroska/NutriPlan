import styled from "styled-components";

export const StyledLoader = styled.div`
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgb(255,255,255, 60%);
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`