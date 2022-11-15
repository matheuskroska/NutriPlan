import { createUser, db } from '../firebase'
import { setDoc, doc, getDoc, query, collection, getDocs, where } from 'firebase/firestore'
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
                    nutricionista_uuid: '',
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

    async getPatients() {
        const q = query(collection(db, this.table))

        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))

        let result = {}
        dataResult.forEach((value) => {
            result[value.usuario_uuid] = value
        })

        return result
    }

    async getAllPatients() {
        const q = query(collection(db, this.table))

        const docsPatient = await getDocs(q)
        const dataPatient = docsPatient.docs.map((docPatient) => ({
            ...docPatient.data(),
            id: doc.id
        }))

        let result = []
        let uuids = []
        dataPatient.forEach((value) => {
            result[value.usuario_uuid] = value
            uuids.push(value.usuario_uuid)
        })
        
        const queryUser = query(collection(db, "usuario"), where('uuid', 'in', uuids))
        const docsUser = await getDocs(queryUser)
        const dataUser = docsUser.docs.map((docUser) => ({
            ...docUser.data()
        }))
        
        let dataTemp = []
        let merge = null
        let fullData = []
        dataUser.forEach((valueResultUser) => {
            dataTemp[valueResultUser.uuid] = valueResultUser
            merge = Object.assign(dataTemp[valueResultUser.uuid], result[valueResultUser.uuid])
            fullData.push(merge)
        })

        return fullData
    }

    async addPlan(plan_id, uuid, nutritionist_uuid) {
        await setDoc(doc(db, this.table, uuid), {
            usuario_uuid: uuid,
            nutricionista_uuid: nutritionist_uuid,
            plano_id: plan_id
        })
    }

    async getPlanId(uuid) {
        const docRef = doc(db, this.table, uuid);
        const docSnap = await getDoc(docRef);
 
        if (docSnap.exists()) {
            return docSnap.data().plano_id
        } else {
            return false
        }
    }
 
}

export default PatientModel