import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { Errors } from "../firebase/Errors"
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
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
        let user = await this.getUserByEmail(email)
        if (!!!user.login_approved) {
            return Errors['auth/login-not-approved']
        }
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
          })
    },

    async getUserByUid(uid) {
        const q = query(collection(db, "patients"), where("uuid", "==", uid))

        const dataResult = await this.getAllDataUser(q, "patients")
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            const q = query(collection(db, "nutritionists"), where("uuid", "==", uid))
            const dataResult = await this.getAllDataUser(q, "nutritionists")
            if (dataResult.length === 1) {
                return dataResult[0]
            } else {
                return null
            }
        }
    },

    async getAllDataUser(q, dbName) {
        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
            dbName: dbName
        }))
        return dataResult
    },

    async getUserByEmail(email) {
        const q = query(collection(db, "patients"), where("email", "==", email))

        const dataResult = await this.getAllDataUser(q, "patients")
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            const q = query(collection(db, "nutritionists"), where("email", "==", email))
            const dataResult = await this.getAllDataUser(q, "nutritionists")
            if (dataResult.length === 1) {
                return dataResult[0]
            } else {
                return null
            }
        }
    },

    async resetPassword(email, newPassword) {
        const user = await this.getUserByEmail(email)
        const docRef = doc(db, user.dbName, user.docId)
        await updateDoc(docRef, {
            password: newPassword
        })
    },

    async approveLoginUser(cpf) {
        const user = await this.getUserByCpf(cpf)
        const docRef = doc(db, user.dbName, user.docId)
        await updateDoc(docRef, {
            login_approved: true
        })
    },

    async getUserByCpf(cpf) {
        console.log(cpf)
        const q = query(collection(db, "patients"), where("cpf", "==", cpf))

        const dataResult = await this.getAllDataUser(q, "patients")
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            const q = query(collection(db, "nutritionists"), where("cpf", "==", cpf))
            const dataResult = await this.getAllDataUser(q, "nutritionists")
            if (dataResult.length === 1) {
                return dataResult[0]
            } else {
                return null
            }
        }
    },
}

export default Abstract