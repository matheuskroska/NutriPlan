import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NavContainer,
  NavWrapper,
  NavItem,
  NavLogo,
  NavLogoTitle,
  NavRight,
} from "./Header.elements";
import logo from "../../assets/images/logo.png";
import {
  ArrowRightIcon,
  EnterIcon,
  EnvelopeClosedIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { StyledLink } from "../Link/Link.elements";
import { useContext } from "react";
import { AuthContext } from "../../firebase/Auth";
import UserModel from "../../db/UserModel";
import I18n from "../I18n/I18n";
import { Translator } from "../I18n";
import AppointmentModel from "../../db/AppointmentModel";
import NutritionistModel from "../../db/NutritionistModel";
import "./style.css";

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const userModel = new UserModel();
  const appointmentModel = new AppointmentModel();
  const [updateNotification, setUpdateNotification] = useState(false);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(false);

  const handleLogout = async () => {
    let retLogout = await userModel.logout();
    if (!!!retLogout) {
      alert(retLogout);
    }
  };

  const notificationList = async () => {
    var withNotification = await appointmentModel.getNotificationByPatientUuid(
      currentUser.uuid
    );
    setNotifications(withNotification);
  };

  const getDocByID = async (e) => {
    let id = e.currentTarget.id;
    let appointment = await appointmentModel.getByDocId(id);

    if (
      window.confirm(
        "Você aceita essa alteração na data da sua consulta? Não aceitar cancela a consulta"
      ) == true
    ) {
      appointment.alterar = false;
      updateAppointment(id, appointment);
      //   navigate(0);
      setUpdateNotification(!updateNotification);
    } else {
      appointmentModel.delete(id);
      setUpdateNotification(!updateNotification);
      navigate("/agendar-consulta", { replace: true });
    }
  };

  const updateAppointment = async (id, appointment) => {
    await appointmentModel.update(id, appointment);
  };

  useEffect(() => {
    notificationList();
  }, [updateNotification]);

  const [headerVisibility, setHeaderVisibility] = useState(false);

  const currentPage = () => {
    const location = useLocation();

    useEffect(() => {
      setHeaderVisibility(true);
    }, [location]);
  };

  currentPage();

  return (
    <NavContainer>
      <NavWrapper justify={headerVisibility ? "space-between" : "center"}>
        <NavItem>
          <StyledLink to="/dashboard">
            <NavLogo src={logo}></NavLogo>
            <NavLogoTitle>NutriPlan</NavLogoTitle>
          </StyledLink>
        </NavItem>
        {headerVisibility && (
          <>
            <NavRight>
              {!!!currentUser ? (
                <>
                  <NavItem>
                    <I18n />
                  </NavItem>
                  <StyledLink header="true" to="/login">
                    Login
                  </StyledLink>
                  <StyledLink header="true" to="/cadastro">
                    <Translator path="headerRegister" />
                    <EnterIcon />
                  </StyledLink>
                </>
              ) : (
                <>
                  {notifications && (
                    <div class="notificacaoContainer">
                      <div className="notificacoes">
                        <span className="itemCount">
                          {notifications.length}
                        </span>
                        <EnvelopeClosedIcon />
                      </div>
                      <div className="notificacoesList">
                        <p>Uma de suas consultas sofreu alteração</p>
                        <p>clique para confirmar ou cancelar essa consulta!</p>
                        <ul>
                          {notifications.map((notification) => {
                            return (
                              <>
                                {notification.alterar && (
                                  <li onClick={getDocByID} id={notification.id}>
                                    <span>{notification.previousDate}</span>
                                    <ArrowRightIcon />
                                    <span>
                                      {notification.data} {notification.horario}{" "}
                                    </span>
                                  </li>
                                )}
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}

                  <NavItem>
                    <I18n />
                  </NavItem>
                  <NavItem>
                    <StyledLink header="true" to="/editar-perfil">
                      {currentUser.nome_completo}
                    </StyledLink>
                    <StyledLink onClick={handleLogout} header="true" to="/">
                      <Translator path="logout" />
                      <ExitIcon />
                    </StyledLink>
                  </NavItem>
                </>
              )}
            </NavRight>
          </>
        )}
      </NavWrapper>
    </NavContainer>
  );
};
