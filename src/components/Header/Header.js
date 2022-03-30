import {NavContainer,NavWrapper, NavItem, NavLogo, NavLogoTitle} from './Header.elements'
import logo from '../../assets/images/logo.png';


export const Header = () => {
    return (
            <NavContainer>
                <NavWrapper>
                    <NavItem>
                        <NavLogo src={logo}/>
                        <NavLogoTitle>NutriPlan</NavLogoTitle>
                    </NavItem>
                </NavWrapper>
            </NavContainer>
    )
}