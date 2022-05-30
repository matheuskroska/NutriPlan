import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "../../components"
import { StyledButton } from "../../components/Button/Button.elements"
import UserModel from "../../db/UserModel"
import { AuthContext } from "../../firebase/Auth"

export const Home = () => {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    if (!!currentUser) {
        if (currentUser.acesso === 0 && currentUser.ativo === false) {
            let userModel = new UserModel()
            userModel.logout()
        }
    }

    const handleListUsers = () => {
        navigate("/lista-usuarios", { replace: true });
    }

    if (!!currentUser) {
        return (
            <>
                <Card margin={"140px 0"}>
                    <StyledButton onClick={handleListUsers} primary>painel de informações</StyledButton>
                </Card>
                
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