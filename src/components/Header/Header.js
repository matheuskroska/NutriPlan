import React  from 'react';
import { NavContainer,NavWrapper, NavItem, NavLogo, NavLogoTitle, NavRight } from './Header.elements'
import logo from '../../assets/images/logo.png';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons'
import { StyledLink } from '../Link/Link.elements';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/Auth';
import Abstract from '../../db/Abstract';

export const Header = () => {

    const { currentUser } = useContext(AuthContext)

    const handleLogout = async () => {
        let retLogout = await Abstract.logout()
        if (!!!retLogout) {
            alert(retLogout)
        }
    }

    return (
            <NavContainer>
                <NavWrapper>
                    <NavItem>
                        <NavLogo src={logo}/>
                        <NavLogoTitle>NutriPlan</NavLogoTitle>
                    </NavItem>
                    <NavRight>
                        {(!!!currentUser) ? (
                            <>
                                <StyledLink header="true" to="/login">login</StyledLink>
                                <StyledLink header="true" to="/cadastro">cadastre-se<EnterIcon/></StyledLink>
                            </>
                        ) : (
                            <NavItem>
                                <StyledLink header="true" to="/">{currentUser.fullname}</StyledLink>
                                <StyledLink onClick={handleLogout} header="true" to="/">sair<ExitIcon/></StyledLink>
                            </NavItem>
                        )}
                    </NavRight>  
                </NavWrapper>
            </NavContainer>
    )
}