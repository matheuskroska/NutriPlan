import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"
import UserModel from "./UserModel";

const LoginModel = {
    async sendEmailResetPassword(email) {
        let userModel = new UserModel()
        const user = await userModel.getUserByEmail(email)
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