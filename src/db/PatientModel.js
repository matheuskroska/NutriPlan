import { createUser, db } from '../firebase'
import { setDoc, doc, deleteDoc, query, collection, where } from 'firebase/firestore'
import UserModel from './UserModel'

class PatientModel extends UserModel {

    constructor() {
        super()
        this.table = "paciente"
    }

    // Adiciona paciente na base
    async add(patient) {
        try {
            const retUser = await createUser(patient).then(function (result) {
                return result.data.response
            })
            if (typeof(retUser) === 'object') {
                await this.addUser(patient, retUser.uid)
                await setDoc(doc(db, this.table, retUser.uid), {
                    usuario_uuid: retUser.uid,
                    nutritionist_uuid: '',
                })
                return retUser.uid
            } else {
                return retUser
            }
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    async delete(uuid) {
        const q = query(collection(db, this.table), where("usuario_uuid", "==", uuid))
        const dataResult = await this.getAllDataUser(q, this.table)
        console.log('dataResult', dataResult)
        if (dataResult.length === 1) {
            await this.deleteUser(uuid)
            await deleteDoc(doc(db, this.table, uuid))
            return true
        } else {
            return false
        }
    }

}

export default PatientModel