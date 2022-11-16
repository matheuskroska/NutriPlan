import styled from "styled-components/macro"


export const ModalContainer = styled.div`
    position: fixed;
    max-width: 100%;
    border-radius: 15px;
    background-color: rgb(255,255,255, 0.5);
    width: 100%;
    z-index: 99999;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export const ModalWrapper = styled.div`
    max-width: 350px;
    position: fixed;
    background-color: rgb(111 140 67 / 90%);
    width: 100%;
    padding: 10px;
    border-radius: 15px;
`

export const ModalTitle = styled.h2`
    color: var(--font-soft);
    font-size: 3.6em;
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
    }
`

export const ModalContent = styled.p`
    font-size: 1.4em;
    line-height: 1.2em;
    color: var(--font-soft);
    text-align: center;
    margin-bottom: 20px;
`
export const ModalButtonsWrapper = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 10px;

`