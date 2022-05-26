import { auth, deleteUser } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, Timestamp, orderBy, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

class UserModel {
    constructor() {
        this.createUser = this.createUser.bind(this)
        this.signIn = this.signIn.bind(this)
        this.logout = this.logout.bind(this)
        this.getUserByUid = this.getUserByUid.bind(this)
        this.getAllDataUser = this.getAllDataUser.bind(this)
        this.getUserByEmailAndPassword = this.getUserByEmailAndPassword.bind(this)
        this.getUserByEmail = this.getUserByEmail.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.approveLoginUser = this.approveLoginUser.bind(this)
        this.activeDesactiveLoginUser = this.activeDesactiveLoginUser.bind(this)
        this.getUserByCpf = this.getUserByCpf.bind(this)
        this.getUserByCpf = this.getUserByCpf.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    async addUser(user, uid) {
        await setDoc(doc(db, "usuario", uid), {
            uuid: uid,
            nome: user.firstname,
            sobrenome: user.lastname,
            nome_completo: user.firstname + ' ' + user.lastname,
            email: user.email,
            ddd: user.ddd,
            telefone: user.phone,
            cpf: user.cpf,
            senha: user.password,
            acesso: 0,
            ativo: false,
            criado_em: Timestamp.now(),
            criado_por: uid,
            atualizado_em: Timestamp.now(),
            atualizado_por: uid,
        })
    }

    // Verifica se já existe um usuario com esse CPF
    async hasUser(user) {
        const q = query(collection(db, "usuario"), where("cpf", "==", user.cpf))

        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        if (dataResult.length === 1) {
            return true
        } else {
            return false
        }
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
        if (!!userData) {
            if (userData.acesso === 0) {
                return 'auth/login-not-approved'
            } else if (userData.acesso === 2) {
                return 'auth/login-reproved'
            } else if (!!!userData.ativo) {
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
        const q = query(collection(db, "usuario"), where("uuid", "==", uid))
        const dataResult = await this.getAllDataUser(q, "usuario")
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            return null
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
        const q = query(collection(db, "usuario"), where("email", "==", email), where("senha", "==", password))
        const dataResult = await this.getAllDataUser(q, "usuario")
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            return null
        }
    }

    async getUserByEmail(email) {
        const q = query(collection(db, "usuario"), where("email", "==", email))
        const dataResult = await this.getAllDataUser(q, "usuario")
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            return null
        }
    }

    async resetPassword(email, newPassword) {
        const user = await this.getUserByEmail(email)
        const docRef = doc(db, "usuario", user.docId)
        await updateDoc(docRef, {
            password: newPassword
        })
    }

    async approveLoginUser(uuid) {
        const docRef = doc(db, "usuario", uuid)
        await updateDoc(docRef, {
            acesso: 1
        })
    }

    async activeDesactiveLoginUser(uuid, active) {
        const docRef = doc(db, "usuario", uuid)
        await updateDoc(docRef, {
            ativo: active
        })
    }

    async getUserByCpf(cpf) {
        const q = query(collection(db, "usuario"), where("cpf", "==", cpf))
        const dataResult = await this.getAllDataUser(q, "usuario")
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            return null
        }
    }

    async deleteUser(uuid) {
        await deleteDoc(doc(db, "usuario", uuid))
        await deleteUser(uuid)
    }

    async delete(uuid) {
        const q = query(collection(db, this.table), where("usuario_uuid", "==", uuid))
        const dataResult = await this.getAllDataUser(q, this.table)
        if (dataResult.length === 1) {
            await this.deleteUser(uuid)
            await deleteDoc(doc(db, this.table, uuid))
        }
    }

    // Recupera todos os usuários da base
    async getUsers() {
        const q = query(collection(db, "usuario"), orderBy("criado_em"))

        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))

        return dataResult
    }

    // Listener para recuperar todos os pacientes da base
    getUsersSnapshot() {
        const q = query(collection(db, "usuario"), orderBy("criado_em"))
        const usersList = onSnapshot(q, (data) => {
            const dataResult = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            return dataResult
        })
        return usersList
    }


}

export default UserModel