import React, { useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { StyledButton } from "../../components/Button/Button.elements"
import User from "../../db/User"
import { AuthContext } from "../../firebase/Auth"

export const Home = () => {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    if (!!currentUser) {
        if (currentUser.access === 0 && currentUser.active === false) {
            User.logout()
        }
    }

    const handleListUsers = () => {
        navigate("/usuarios", { replace: true });
    }

    if (!!currentUser) {
        return (
            <>
                <StyledButton onClick={handleListUsers} primary>lista de usuários</StyledButton>
            </>
        )
    } else {
        return (
            <>
                <h1>Home</h1>
            </>
        )
    }
}