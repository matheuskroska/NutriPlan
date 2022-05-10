import React, {useState, useEffect}  from 'react';
import { useLocation } from 'react-router-dom';
import { NavContainer,NavWrapper, NavItem, NavLogo, NavLogoTitle, NavRight } from './Header.elements'
import logo from '../../assets/images/logo.png';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons'
import { StyledLink } from '../Link/Link.elements';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/Auth';
import User from '../../db/User';

export const Header = () => {

    const { currentUser } = useContext(AuthContext)

    const handleLogout = async () => {
        let retLogout = await User.logout()
        if (!!!retLogout) {
            alert(retLogout)
        }
    }

    const [headerVisibility, setHeaderVisibility] = useState(false)

    const currentPage  = () => {
        const location = useLocation();

        useEffect(() => {
            location.pathname == "/login" || location.pathname == "/cadastro" || location.pathname == "/alterar-senha" || location.pathname == "/redefinir-senha" 
            ? setHeaderVisibility(false) : setHeaderVisibility(true);
        }, [location])
    }

    currentPage()

    

    return (
            <NavContainer>
                <NavWrapper justify={headerVisibility ? "space-between" : "center"}>
                    <NavItem>
                        <StyledLink to="/"><NavLogo src={logo}></NavLogo><NavLogoTitle>NutriPlan</NavLogoTitle></StyledLink>
                    </NavItem>
                    {headerVisibility && (
                            <>
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
                            </>
                        )}
                     
                </NavWrapper>
            </NavContainer>
    )
}