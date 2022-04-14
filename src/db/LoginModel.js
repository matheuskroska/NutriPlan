import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"
import { Errors } from "../firebase/Errors";
import Abstract from "./Abstract";

const LoginModel = {
    async sendEmailResetPassword(email) {
        const user = await Abstract.getUserByEmail(email)
        if (!!!user) {
            return Errors['auth/null-email']
        }
        return await sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            return true
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = !!Errors[errorCode] ? Errors[errorCode] : error.message
            return errorMessage
        })
    },
}


export default LoginModel