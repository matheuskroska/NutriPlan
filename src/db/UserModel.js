import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

class UserModel {
// const UserModel = {
    constructor() {
        this.createUser = this.createUser.bind(this)
        this.signIn = this.signIn.bind(this)
        this.logout = this.logout.bind(this)
        this.getUserByUid = this.getUserByUid.bind(this)
        this.getAllDataUser = this.getAllDataUser.bind(this)
        this.getUserByEmailAndPassword = this.getUserByEmailAndPassword.bind(this)
        this.getUserByEmail = this.getUserByEmail.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.approveReproveLoginUser = this.approveReproveLoginUser.bind(this)
        this.activeDesactiveLoginUser = this.activeDesactiveLoginUser.bind(this)
        this.getUserByCpf = this.getUserByCpf.bind(this)
        this.getUserByCpf = this.getUserByCpf.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    async createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                return user
            })
            .catch((error) => {
                return error.code
            })
    }
    
    async signIn(email, password) {
        let userData = await this.getUserByEmailAndPassword(email, password)
        console.log(userData)
        if (!!userData) {
            if (userData.access === 0) {
                return 'auth/login-not-approved'
            } else if (userData.access === 2) {
                return 'auth/login-reproved'
            } else if (!!!userData.active) {
                return 'auth/user-disabled'
            }
        } else {
            return 'auth/user-not-found'
        }
        
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                return user
            })
            .catch((error) => {
                return error.code
            })
    }

    async logout() {
        return signOut(auth).then(() => {
            return true
          }).catch((error) => {
            return error.code
          })
    }

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
    }

    async getAllDataUser(q, dbName) {
        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
            dbName: dbName
        }))
        return dataResult
    }

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
    }

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
    }

    async resetPassword(email, newPassword) {
        const user = await this.getUserByEmail(email)
        const docRef = doc(db, user.dbName, user.docId)
        await updateDoc(docRef, {
            password: newPassword
        })
    }

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
    }

    async activeDesactiveLoginUser(uuid, active) {
        console.log(uuid, active)
        const user = await this.getUserByUid(uuid)
        const docRef = doc(db, user.dbName, user.docId)
        await updateDoc(docRef, {
            active: active
        })
    }

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
    }

    async deleteUser(uuid) {
        const user = await this.getUserByUid(uuid)
        await deleteDoc(doc(db, user.dbName, user.docId))
    }
}

export default UserModel