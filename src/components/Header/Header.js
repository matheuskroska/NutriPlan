import { NavContainer,NavWrapper, NavItem, NavLogo, NavLogoTitle, NavRight } from './Header.elements'
import logo from '../../assets/images/logo.png';
import { EnterIcon } from '@radix-ui/react-icons'
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
                                <StyledLink header to="/login">login</StyledLink>
                                <StyledLink header to="/cadastro">cadastre-se<EnterIcon/></StyledLink>
                            </>
                        ) : (
                            <div>
                                <h3>{currentUser.fullname}</h3>
                                <a onClick={handleLogout} href="/">sair</a>                       
                            </div>
                        )}
                    </NavRight>  
                </NavWrapper>
            </NavContainer>
    )
}