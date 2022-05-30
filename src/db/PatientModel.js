import { createUser, db } from '../firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
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

    async isPatient(uuid) {
        const docRef = doc(db, this.table, uuid);
        const docSnap = await getDoc(docRef);
 
        if (docSnap.exists()) {
            return true
        } else {
            return false
        }
    }
 
}

export default PatientModel