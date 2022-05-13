import styled from "styled-components";


export const FooterContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    bottom: 0;
`

export const FooterWrapper = styled.div`
    background-color: ${props => props.bgColor || "var(--primary)"};
    display: flex;
    justify-content: center;
    position:relative;
    width: 100%;
`

export const FooterItem = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: ${props => props.padding || "10px 20px"};
    display: flex;
    width: 100%;
    justify-content: space-around;
    background-color: ${props => props.bgColor || "initial"};
`

export const FooterCol = styled.div`
    padding: 15px 10px;
    text-align: center;
`
export const FooterColTitle = styled.h3`
    font-size: 1.6em;
    color: var(--font-dark);
    font-weight: bold;
    margin-bottom: 10px;
`
export const FooterColList = styled.ul`

`
export const FooterColSocial = styled.ul`
    color: var(--font-dark);
    display: flex;
    gap: 0 10px;
    svg {
        width: 20px;
        height: 20px;
    }
`

export const FooterColItem = styled.li`
    font-size: 1.4em;
    margin-bottom: 10px;
    font-weight: 500;
    color: var(--font-dark);
`

export const FooterLogo = styled.img`
    max-height: 50px;
    margin-bottom: 10px;
    filter: brightness(0.5)
`