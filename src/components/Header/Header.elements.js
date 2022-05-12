import styled from "styled-components"



export const NavContainer = styled.div`
   background-color: var(--primary);
    box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px, rgb(0 0 0 / 30%) 0px 3px 7px;
`

export const NavWrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: ${props => props.justify || "space-between"};;
    padding: 20px 20px;
    position: relative;
`



export const NavItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 10px;
`
export const NavRight = styled.div`
    display: flex; 
    align-items:center;
    justify-content: center;
    gap: 0 20px;
    a {
        white-space: nowrap;
    }
`

export const NavLogo = styled.img`
    max-height: 50px;
    filter: brightness(0.5)
`

export const NavLogoTitle = styled.h1`
    margin-left: 10px;
    font-size: 22px;
    color: var(--font-dark);
    font-weight: 600;
`