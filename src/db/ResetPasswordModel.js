import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth"
import { auth } from "../firebase"
import { Errors } from "../firebase/Errors"
import UserModel from "./UserModel"

const ResetPasswordModel = {
    async handleResetPassword(actionCode, continueUrl, lang) {
        // Verificar se o código de reset da senha é válido
        const ret = await verifyPasswordResetCode(auth, actionCode)
        .then((email) => {
            return email
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = !!Errors[errorCode] ? Errors[errorCode] : error.message
            return errorMessage
        })

        return ret
    },

    async handleConfirmNewPassword(email, newPassword, actionCode) {
        // Salva nova senha
        const ret = await confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
            let userModel = new UserModel()
            userModel.resetPassword(email, newPassword)
            return true
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = !!Errors[errorCode] ? Errors[errorCode] : error.message
            return errorMessage
        })

        return ret
    }
}


export default ResetPasswordModel