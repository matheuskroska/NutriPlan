import React, {useState, useEffect}  from 'react';
import { useLocation } from 'react-router-dom';
import { NavContainer,NavWrapper, NavItem, NavLogo, NavLogoTitle, NavRight } from './Header.elements'
import logo from '../../assets/images/logo.png';
import { EnterIcon, EnvelopeClosedIcon, ExitIcon } from '@radix-ui/react-icons'
import { StyledLink } from '../Link/Link.elements';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/Auth';
import UserModel from '../../db/UserModel';
import I18n from '../I18n/I18n';
import { Translator } from '../I18n';
import AppointmentModel from '../../db/AppointmentModel';

export const Header = () => {

    const { currentUser } = useContext(AuthContext)
    const userModel = new UserModel()
    const appointmentModel = new AppointmentModel()

    const [notifications, setNotifications] = useState(false);

    const handleLogout = async () => {
        let retLogout = await userModel.logout()
        if (!!!retLogout) {
            alert(retLogout)
        }
    }

    const notificationList = async () => {
        var withNotification = await appointmentModel.getNotificationByPatientUuid(currentUser.uuid)
        setNotifications(withNotification)
    }

    useEffect(() => {
        notificationList()
    }, [])

    useEffect(() => {
        console.log(notifications)
    }, [notifications])


    const [headerVisibility, setHeaderVisibility] = useState(false)

    const currentPage  = () => {
        const location = useLocation();

        useEffect(() => {
            
            setHeaderVisibility(true);
        }, [location])
    }


    

    currentPage()

    

    return (
            <NavContainer>
                <NavWrapper justify={headerVisibility ? "space-between" : "center"}>
                    <NavItem>
                        <StyledLink to="/dashboard"><NavLogo src={logo}></NavLogo><NavLogoTitle>NutriPlan</NavLogoTitle></StyledLink>
                    </NavItem>
                    {headerVisibility && (
                            <>
                                <NavRight>
                                    {(!!!currentUser) ? (
                                <>
                                            
                                            <NavItem>
                                                <I18n />
                                            </NavItem>
                                            <StyledLink header="true" to="/login">Login</StyledLink>
                                            <StyledLink header="true" to="/cadastro"><Translator path="headerRegister"/><EnterIcon/></StyledLink>
                                        </>
                                    ) : (
                                    <>
                                        {notifications && (<>
                                            <div>
                                                <span>{ notifications.length}</span>
                                                <EnvelopeClosedIcon />
                                            </div>
                                            
                                            Uma de suas consultas sofreu alteração<br />
                                            {notifications.map(notification => {
                                                return (
                                                    <>
                                                        {notification.alterar && (
                                                            <div>
                                                                {notification.data} / {notification.horario}
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                            })}
                                        
                                        </>)}
                                            
                                            <NavItem>
                                                <I18n />
                                            </NavItem>
                                            <NavItem>
                                                <StyledLink header="true" to="/editar-perfil">{currentUser.nome_completo}</StyledLink>
                                                <StyledLink onClick={handleLogout} header="true" to="/"><Translator path="logout"/><ExitIcon/></StyledLink>
                                            </NavItem>
                                        </>
                                    )}
                                </NavRight> 
                            </>
                        )}
                     
                </NavWrapper>
            </NavContainer>
    )
}