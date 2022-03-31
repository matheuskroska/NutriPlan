import { db } from '../firebase'
import { collection, addDoc, getDocs, Timestamp, query, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import Abstract from './Abstract'

const Patients = {
    // Adiciona paciente na base
    async addPatient(patient) {
        try {
            const retUser = await Abstract.createUserWithEmailPassword(patient.email, patient.password)
            if (typeof(retUser) === 'object') {
                const docRef = await addDoc(collection(db, "patients"), {
                    uuid: retUser.uid,
                    name: patient.name,
                    surname: patient.surname,
                    email: patient.email,
                    ddd: patient.ddd,
                    phone: patient.phone,
                    cpf: patient.cpf,
                    password: patient.password,
                    nutritionist_uuid: '',
                    created_at: Timestamp.now(),
                    updated_at: Timestamp.now(),
                })
                return docRef.id
            } else {
                return retUser
            }
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    },

    // Verifica se já existe um paciente com esse CPF
    async hasPatient(patient) {
        const q = query(collection(db, "patients"), where("cpf", "==", patient.cpf))

        const data = await getDocs(q)
        // console.log(data.docs)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        console.log(dataResult.length)
        if (dataResult.length === 1) {
            return true
        } else {
            return false
        }
    },

    // Recupera todos os pacientes da base
    async getPatients() {
        const data = await getDocs(collection(db, "patients"))
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        return dataResult
    },

}

export default Patients