import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

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
 
}

export default AppointmentModel