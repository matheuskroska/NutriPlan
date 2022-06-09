import React, { useContext, useState } from 'react';
import { StyledRadixToggleGroup } from "../Button/Button.elements"
import { CardAvatar, CardMenuContainer, CardMenuHeader, CardMenuItem, CardParagraph } from "../Card/Card.elements"
import { StyledLink, StyledRadixLink } from "../Link/Link.elements"
import avatar from '../../assets/images/user-test.png';
import { AuthContext } from '../../firebase/Auth';




export const InfoMenu = (props) => {
    const [menuState, setMenuState] = useState(props.menuState);
    const { currentUser } = useContext(AuthContext)	

    return (
        <CardMenuContainer>
        <CardMenuHeader>
            <CardParagraph>{currentUser.nome_completo}</CardParagraph>
            <CardAvatar src={avatar} alt="avatar"></CardAvatar>
            <StyledLink menu="true" to="/editar-perfil">Editar perfil</StyledLink>
        </CardMenuHeader>
        <StyledRadixToggleGroup value={menuState} height="100%" flexdirection="column" type="single" aria-label="usuario" >
            <CardMenuItem fontSize="inherit" width="100%">
                {currentUser.isAdmin && <StyledRadixLink edituserbuttons="true" value="Lista de usuários" aria-label="Lista de usuários"><StyledLink menu="true" link="true" to="/lista-usuarios">Lista de usuários</StyledLink></StyledRadixLink>}
                {/* <StyledRadixLink edituserbuttons="true" value="Notificações" aria-label="Notificações"><StyledLink menu="true" link="true" to="/notificacoes">Notificações</StyledLink></StyledRadixLink> */}
                <StyledRadixLink edituserbuttons="true" value="Agendar consulta" aria-label="Agendar consulta"><StyledLink menu="true" link="true" to="/agendar-consulta">Agendar consulta</StyledLink></StyledRadixLink>
                <StyledRadixLink edituserbuttons="true" value="Minhas consultas" aria-label="Minhas consultas"><StyledLink menu="true" link="true" to="/minhas-consultas">Minhas consultas</StyledLink></StyledRadixLink>
            </CardMenuItem>
        </StyledRadixToggleGroup>
        </CardMenuContainer>
    )
    
}