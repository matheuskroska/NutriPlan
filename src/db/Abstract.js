import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Errors } from "../firebase/Errors"

const Abstract = {
    async createUserWithEmailPassword(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                return user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = !!Errors[errorCode] ? Errors[errorCode] : error.message
                return errorMessage
            })
    },
}

export default Abstract