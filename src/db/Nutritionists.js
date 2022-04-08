import { db } from '../firebase'
import { collection, addDoc, getDocs, Timestamp, query, where } from 'firebase/firestore'
import Abstract from './Abstract'

const Nutritionists = {
    // Adiciona nutricionista na base
    async addUser(nutritionist, userCategory) {
        // const retUser = await Abstract.addUser(nutritionist, userCategory)
        try {
            const retUser = await Abstract.createUser(nutritionist.email, nutritionist.password)
            if (typeof(retUser) === 'object') {
                const docRef = await addDoc(collection(db, "nutritionists"), {
                    uuid: retUser.uid,
                    firstname: nutritionist.firstname,
                    lastname: nutritionist.lastname,
                    fullname: nutritionist.firstname + ' ' + nutritionist.lastname,
                    email: nutritionist.email,
                    ddd: nutritionist.ddd,
                    phone: nutritionist.phone,
                    cpf: nutritionist.cpf,
                    crn: nutritionist.crn,
                    password: nutritionist.password,
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

    // Verifica se já existe um nutricionista com esse CPF
    async hasNutritionist(nutritionist) {
        const q = query(collection(db, "nutritionists"), where("cpf", "==", nutritionist.cpf))

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

    // Recupera todos os nutricionistas da base
    async getNutritionists() {
        const data = await getDocs(collection(db, "nutritionists"))
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        return dataResult
    },

}

export default Nutritionists