import { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { StyledButton } from "../../components/Button/Button.elements"
import { AuthContext } from "../../firebase/Auth"

export const Home = () => {

    const [user, setCurrentUser] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    if (!!!currentUser) {
        return <Navigate to="/login" replace />
    }

    const handleListUsers = () => {
        navigate("/usuarios", { replace: true });
    }

    return (
        <>
        {!!currentUser &&
            <StyledButton onClick={handleListUsers} primary>lista de usuários</StyledButton>
        }
        <h1>Home</h1>
        </>
    )
}