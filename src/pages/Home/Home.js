import React, { useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { StyledButton } from "../../components/Button/Button.elements"
import { AuthContext } from "../../firebase/Auth"

export const Home = () => {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
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