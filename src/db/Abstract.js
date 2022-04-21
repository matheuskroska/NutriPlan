import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Abstract = {
    async createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                return user
            })
            .catch((error) => {
                return error.code
            })
    },
    
    async signIn(email, password) {
        let userData = await this.getUserByEmailAndPassword(email, password)
        if (!!userData && userData.access === 0) {
            return 'auth/login-not-approved'
        } else if (!!userData && userData.access === 2) {
            return 'auth/login-reproved'
        } else if (!!userData && !!!userData.active) {
            return 'auth/user-disabled'
        }
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                return user
            })
            .catch((error) => {
                return error.code
            })
    },

    async logout() {
        return signOut(auth).then(() => {
            return true
          }).catch((error) => {
            return error.code
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

    async getUserByEmailAndPassword(email, password) {
        const q = query(collection(db, "patients"), where("email", "==", email), where("password", "==", password))

        const dataResult = await this.getAllDataUser(q, "patients")
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            const q = query(collection(db, "nutritionists"), where("email", "==", email), where("password", "==", password))
            const dataResult = await this.getAllDataUser(q, "nutritionists")
            if (dataResult.length === 1) {
                return dataResult[0]
            } else {
                return null
            }
        }
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

    async approveReproveLoginUser(uuid, action) {
        let access = 0
        switch (action) {
            case 'approve':
                access = 1
                break
            case 'reprove':
                access = 2
                break
        }
        const user = await this.getUserByUid(uuid)
        const docRef = doc(db, user.dbName, user.docId)
        await updateDoc(docRef, {
            access: access
        })
    },

    async getUserByCpf(cpf) {
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

    async deleteUser(uuid) {
        const user = await this.getUserByUid(uuid)
        await deleteDoc(doc(db, user.dbName, user.docId));
    }
}

export default Abstract