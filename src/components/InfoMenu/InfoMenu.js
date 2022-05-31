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
            <StyledLink menu to={`/editar-perfil`}>Editar perfil</StyledLink>
        </CardMenuHeader>
        <StyledRadixToggleGroup value={menuState} height="100%" flexDirection="column" type="single" aria-label="usuario" >
            <CardMenuItem fontSize="inherit" width="100%">
                <StyledRadixLink editUserButtons value="Lista de usuários" aria-label="Lista de usuários"><StyledLink menu link to="/lista-usuarios">Lista de usuários</StyledLink></StyledRadixLink>
                <StyledRadixLink editUserButtons value="Notificações" aria-label="Notificações"><StyledLink menu link to="/notificacoes">Notificações</StyledLink></StyledRadixLink>
                <StyledRadixLink editUserButtons value="Agendar consulta" aria-label="Agendar consulta"><StyledLink menu link to="/agendar-consulta">Agendar consulta</StyledLink></StyledRadixLink>
            </CardMenuItem>
        </StyledRadixToggleGroup>
        </CardMenuContainer>
    )
    
}