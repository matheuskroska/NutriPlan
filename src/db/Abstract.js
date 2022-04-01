import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Errors } from "../firebase/Errors"
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'

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

    async addUser(user, userCategory) {
        try {
            const retUser = await Abstract.createUserWithEmailPassword(user.email, user.password)
            if (typeof(retUser) === 'object') {
                let dbName = null
                let userInfo = {
                    uuid: retUser.uid,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    ddd: user.ddd,
                    phone: user.phone,
                    cpf: user.cpf,
                    password: user.password,
                    created_at: Timestamp.now(),
                    updated_at: Timestamp.now(),
                }
                if (userCategory) { // true = nutricionista
                    dbName = "nutritionists"
                    userInfo.crn = user.crn
                } else { // false = paciente
                    dbName = "patients"
                    userInfo.nutritionist_uuid = ''
                }
                const docRef = await addDoc(collection(db, dbName), {
                    userInfo
                })
                return docRef.id
            } else {
                return retUser
            }
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    },
}

export default Abstract