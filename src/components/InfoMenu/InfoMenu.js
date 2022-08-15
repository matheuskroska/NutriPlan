import React, { useContext, useState } from 'react';
import { StyledRadixToggleGroup } from "../Button/Button.elements"
import { CardAvatar, CardCloseButton, CardMenuContainer, CardMenuHeader, CardMenuItem, CardParagraph } from "../Card/Card.elements"
import { StyledLink, StyledRadixLink } from "../Link/Link.elements"
import avatar from '../../assets/images/user-test.png';
import { AuthContext } from '../../firebase/Auth'

export const InfoMenu = (props) => {
    const menuState = props.menuState
    const [menu, setMenu] = useState(true);
    const { currentUser } = useContext(AuthContext);

    const handleMenuState = () => {
        menu ? setMenu(false) : setMenu(true);
    }

    return (
        <CardMenuContainer mState={!menu}>
            <CardCloseButton onClick={handleMenuState}>X</CardCloseButton>
            <CardMenuHeader mState={menu}>
                <CardParagraph>{currentUser.nome_completo}</CardParagraph>
                <CardAvatar src={avatar} alt="avatar"></CardAvatar>
                <StyledLink menu="true" to="/editar-perfil">Editar perfil</StyledLink>
            </CardMenuHeader>
            <StyledRadixToggleGroup mState={menu} value={menuState} height="100%" flexdirection="column" type="single" aria-label="usuario" >
                <CardMenuItem fontSize="inherit" width="100%">
                    {currentUser.isAdmin && <StyledRadixLink edituserbuttons="true" value="Lista de usuários" aria-label="Lista de usuários"><StyledLink menu="true" link="true" to="/lista-usuarios">Lista de usuários</StyledLink></StyledRadixLink>}
                    {/* <StyledRadixLink edituserbuttons="true" value="Notificações" aria-label="Notificações"><StyledLink menu="true" link="true" to="/notificacoes">Notificações</StyledLink></StyledRadixLink> */}
                    {currentUser.isNutri && <StyledRadixLink edituserbuttons="true" value="Criar plano nutricional" aria-label="Criar plano nutricional"><StyledLink menu="true" link="true" to="/criar-plano">Criar plano nutricional</StyledLink></StyledRadixLink>}
                    {!currentUser.isNutri && <StyledRadixLink edituserbuttons="true" value="Agendar consulta" aria-label="Agendar consulta"><StyledLink menu="true" link="true" to="/agendar-consulta">Agendar consulta</StyledLink></StyledRadixLink>}
                    <StyledRadixLink edituserbuttons="true" value="Minhas consultas" aria-label="Minhas consultas"><StyledLink menu="true" link="true" to="/minhas-consultas">Minhas consultas</StyledLink></StyledRadixLink>
                </CardMenuItem>
            </StyledRadixToggleGroup>
        </CardMenuContainer>
    )
    
}