import { db } from '../firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

class AppointmentModel {

    constructor() {
        this.table = "consulta"
    }

    async add(patient_uuid, nutritionist_uuid, date, time) {
        await addDoc(collection(db, this.table), {
            nutricionista_uuid: nutritionist_uuid,
            paciente_uuid: patient_uuid,
            data: date,
            horario: time
        })
    }

    async getByPatientUuid(uuid) {
        const q = query(collection(db, this.table), where("paciente_uuid", "==", uuid))
        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id
        }))
        return dataResult
    }
 
}

export default AppointmentModel