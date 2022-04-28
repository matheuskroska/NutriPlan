import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"
import User from "./User";

const LoginModel = {
    async sendEmailResetPassword(email) {
        const user = await User.getUserByEmail(email)
        if (!!!user) {
            return 'auth/null-email'
        }
        return await sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            return true
        })
        .catch((error) => {
            return error.code
        })
    },
}


export default LoginModel