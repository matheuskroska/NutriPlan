import React, { useContext, useEffect, useState } from 'react';
import { StyledRadixToggleGroup } from "../Button/Button.elements"
import { CardAvatar, CardCloseButton, CardMenuContainer, CardMenuHeader, CardMenuItem, CardParagraph } from "../Card/Card.elements"
import { StyledLink, StyledRadixLink } from "../Link/Link.elements"
import avatar from '../../assets/images/user-test.png';
import { AuthContext } from '../../firebase/Auth'
import {DoubleArrowRightIcon, DoubleArrowLeftIcon} from '@radix-ui/react-icons'
import { Translator } from '../I18n';
import { InfoMenuBG } from './InfoMenu.elements';

export const InfoMenu = (props) => {
    const menuState = props.menuState
    const [menu, setMenu] = useState(1);
    const { currentUser } = useContext(AuthContext);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleMenuState = () => {
        menu ? setMenu(0) : setMenu(1);
    }

    const checkActive = () => {
        const url = window.location.pathname;
        const urlArray = url.split('/');
        const urlPath = urlArray[1];
        const menuButtons = document.querySelectorAll('.menuButton');
        menuButtons.forEach((button) => {
            if (urlPath === button.name) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

    }

    useEffect(() => {
        checkActive();
        screenWidth > 768 ? setMenu(1) : setMenu(0);
    }, []);
    

    return (
        <>
        <CardMenuContainer mstate={!menu}>
            <CardCloseButton onClick={handleMenuState}>
                {menu ? <DoubleArrowLeftIcon/> : <DoubleArrowRightIcon/>}
            </CardCloseButton>
            <CardMenuHeader mstate={menu}>
                <CardParagraph>{currentUser.nome_completo}</CardParagraph>
                <CardAvatar src={avatar} alt="avatar"></CardAvatar>
                <StyledLink menu="true" to="/editar-perfil"><Translator path="editProfile"/></StyledLink>
            </CardMenuHeader>
            <StyledRadixToggleGroup mstate={menu} value={menuState} height="100%" flexdirection="column" type="single" aria-label="usuario" >
                    {currentUser.isAdmin && <StyledRadixLink className="menuButton" name="lista-usuarios" edituserbuttons="true" value={<Translator path="userList"/>} aria-label={<Translator path="userList"/>}><StyledLink menu="true" link="true" to="/lista-usuarios"><Translator path="userList"/></StyledLink></StyledRadixLink>}
                    {currentUser.isNutri && <StyledRadixLink className="menuButton" name="lista-pacientes" edituserbuttons="true" value={<Translator path="planNutri" />} aria-label={<Translator path="planNutri" />}><StyledLink menu="true" link="true" to="/lista-pacientes"><Translator path="planNutri" /></StyledLink></StyledRadixLink>}
                    {!currentUser.isNutri && <StyledRadixLink className="menuButton" name="dashboard" edituserbuttons="true" value={<Translator path="dashboard"/>} aria-label={<Translator path="dashboard"/>}><StyledLink menu="true" link="true" to="/dashboard"><Translator path="dashboard"/></StyledLink></StyledRadixLink>}
                    {!currentUser.isNutri && <StyledRadixLink className="menuButton" name="agendar-consulta" edituserbuttons="true" value={<Translator path="makeAppoint"/>} aria-label={<Translator path="makeAppoint"/>}><StyledLink menu="true" link="true" to="/agendar-consulta"><Translator path="makeAppoint"/></StyledLink></StyledRadixLink>}
                    <StyledRadixLink className="menuButton" name="minhas-consultas" edituserbuttons="true" value={<Translator path="myAppoint"/>} aria-label={<Translator path="myAppoint"/>}><StyledLink menu="true" link="true" to="/minhas-consultas"><Translator path="myAppoint"/></StyledLink></StyledRadixLink>
            </StyledRadixToggleGroup>
            </CardMenuContainer>
            {menu && screenWidth < 768 ? <InfoMenuBG onClick={handleMenuState}></InfoMenuBG> : null}
        </>
    )
    
}