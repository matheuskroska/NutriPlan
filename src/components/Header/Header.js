import {NavContainer,NavWrapper, NavItem, NavLogo, NavLogoTitle, NavRight, NavLink} from './Header.elements'
import logo from '../../assets/images/logo.png';
import { StyledButton } from '../Button/Button.elements';
import {ExitIcon, EnterIcon} from '@radix-ui/react-icons'
import { Link } from '../Link/Link';



export const Header = () => {
    return (
            <NavContainer>
                <NavWrapper>
                    <NavItem>
                        <NavLogo src={logo}/>
                        <NavLogoTitle>NutriPlan</NavLogoTitle>
                    </NavItem>
                    <NavRight>
                        {/* <StyledButton secundary>paciente</StyledButton> 
                        <StyledButton secundary>nutricionista</StyledButton> */}
                        <Link to="/cadastro" css="header">login/cadastre-se<EnterIcon/></Link>
                    </NavRight>  
                </NavWrapper>
            </NavContainer>
    )
}