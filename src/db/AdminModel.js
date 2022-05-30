import { collection, doc, getDoc, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import UserModel from './UserModel'

class AdminModel extends UserModel {

    constructor() {
        super()
        this.table = "administrador"
    }

    async getAdmins() {
        const q = query(collection(db, this.table), orderBy("criado_em"))
        const dataResult = await this.getAllDataUser(q, this.table)
        if (dataResult.length === 1) {
            return dataResult[0]
        } else {
            return null
        }
    }

    async isAdmin(uuid) {
        const docRef = doc(db, this.table, uuid)
        const docSnap = await getDoc(docRef)
 
        if (docSnap.exists()) {
            return true
        } else {
            return false
        }
    }
 
}

export default AdminModel