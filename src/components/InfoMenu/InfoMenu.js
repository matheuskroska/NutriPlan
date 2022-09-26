import React, { useContext, useState } from 'react';
import { StyledRadixToggleGroup } from "../Button/Button.elements"
import { CardAvatar, CardCloseButton, CardMenuContainer, CardMenuHeader, CardMenuItem, CardParagraph } from "../Card/Card.elements"
import { StyledLink, StyledRadixLink } from "../Link/Link.elements"
import avatar from '../../assets/images/user-test.png';
import { AuthContext } from '../../firebase/Auth'
import {DoubleArrowRightIcon, DoubleArrowLeftIcon} from '@radix-ui/react-icons'
import { Translator } from '../I18n';

export const InfoMenu = (props) => {
    const menuState = props.menuState
    const [menu, setMenu] = useState(1);
    const { currentUser } = useContext(AuthContext);

    const handleMenuState = () => {
        menu ? setMenu(0) : setMenu(1);
    }

    return (
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
                <CardMenuItem fontSize="inherit" width="100%">
                    {currentUser.isAdmin && <StyledRadixLink edituserbuttons="true" value={<Translator path="userList"/>} aria-label={<Translator path="userList"/>}><StyledLink menu="true" link="true" to="/lista-usuarios"><Translator path="userList"/></StyledLink></StyledRadixLink>}
                    {/* <StyledRadixLink edituserbuttons="true" value="Notificações" aria-label="Notificações"><StyledLink menu="true" link="true" to="/notificacoes">Notificações</StyledLink></StyledRadixLink> */}
                    {currentUser.isNutri && <StyledRadixLink edituserbuttons="true" value={<Translator path="createPlan"/>} aria-label={<Translator path="createPlan"/>}><StyledLink menu="true" link="true" to="/lista-pacientes"><Translator path="createPlan"/></StyledLink></StyledRadixLink>}
                    {!currentUser.isNutri && <StyledRadixLink edituserbuttons="true" value={<Translator path="makeAppoint"/>} aria-label={<Translator path="makeAppoint"/>}><StyledLink menu="true" link="true" to="/agendar-consulta"><Translator path="makeAppoint"/></StyledLink></StyledRadixLink>}
                    <StyledRadixLink edituserbuttons="true" value={<Translator path="myAppoint"/>} aria-label={<Translator path="myAppoint"/>}><StyledLink menu="true" link="true" to="/minhas-consultas"><Translator path="myAppoint"/></StyledLink></StyledRadixLink>
                </CardMenuItem>
            </StyledRadixToggleGroup>
        </CardMenuContainer>
    )
    
}