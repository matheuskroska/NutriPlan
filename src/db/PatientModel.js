import { createUser, db } from '../firebase'
import { collection, addDoc, getDocs, Timestamp, query, where, setDoc, doc } from 'firebase/firestore'
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

}

export default PatientModel