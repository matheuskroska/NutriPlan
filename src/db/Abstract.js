import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { Errors } from "../firebase/Errors"
import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const Abstract = {
    async createUser(email, password) {
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
    
    async signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
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

    async logout() {
        return signOut(auth).then(() => {
            return true
          }).catch((error) => {
            const errorCode = error.code
            const errorMessage = !!Errors[errorCode] ? Errors[errorCode] : error.message
            return errorMessage
          });
    },

    async addUser(user, userCategory) {
        try {
            const retUser = await Abstract.createUser(user.email, user.password)
            if (typeof(retUser) === 'object') {
                let dbName = null
                let userInfo = {
                    uuid: retUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    fullname: user.firstname + ' ' + user.lastname,
                    email: user.email,
                    ddd: user.ddd,
                    phone: user.phone,
                    cpf: user.cpf,
                    password: user.password,
                    created_at: Timestamp.now(),
                    updated_at: Timestamp.now(),
                }
                if (userCategory) { // nutricionista
                    dbName = "nutritionists"
                    userInfo.crn = user.crn
                } else { // paciente
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

    async getUserByUid(uid) {
        const q = query(collection(db, "patients"), where("uuid", "==", uid))

        const data = await getDocs(q)
        // console.log(data.docs)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            return null
        }
    },
}

export default Abstract