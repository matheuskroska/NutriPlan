import { db } from '../firebase'
import { collection, addDoc, getDocs, Timestamp, query, where, orderBy } from 'firebase/firestore'
import Abstract from './Abstract'

const Patients = {
    // Adiciona paciente na base
    async addPatient(patient) {
        try {
            const retUser = await Abstract.createUser(patient.email, patient.password)
            if (typeof(retUser) === 'object') {
                const docRef = await addDoc(collection(db, "patients"), {
                    uuid: retUser.uid,
                    firstname: patient.firstname,
                    lastname: patient.lastname,
                    fullname: patient.firstname + ' ' + patient.lastname,
                    email: patient.email,
                    ddd: patient.ddd,
                    phone: patient.phone,
                    cpf: patient.cpf,
                    password: patient.password,
                    nutritionist_uuid: '',
                    login_approved: false,
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

    async addUser(patient) {
        // const retUser = await Abstract.addUser(patient, userCategory)

        try {
            const retUser = await Abstract.createUser(patient.email, patient.password)
            if (typeof(retUser) === 'object') {
                const docRef = await addDoc(collection(db, "patients"), {
                    uuid: retUser.uid,
                    firstname: patient.firstname,
                    lastname: patient.lastname,
                    fullname: patient.firstname + ' ' + patient.lastname,
                    email: patient.email,
                    ddd: patient.ddd,
                    phone: patient.phone,
                    cpf: patient.cpf,
                    nutritionist_uuid: '',
                    password: patient.password,
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

        // return retUser
    },

    // Verifica se já existe um paciente com esse CPF
    async hasPatient(patient) {
        const q = query(collection(db, "patients"), where("cpf", "==", patient.cpf))

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
    },

    // Recupera todos os pacientes da base
    async getPatients() {
        const q = query(collection(db, "patients"), orderBy("created_at"))

        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        return dataResult
    },

}

export default Patients