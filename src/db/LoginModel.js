import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"
import Abstract from "./Abstract";

const LoginModel = {
    async sendEmailResetPassword(email) {
        const user = await Abstract.getUserByEmail(email)
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