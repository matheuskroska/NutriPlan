import { createUser, db } from '../firebase'
import { collection, getDocs, query, where, setDoc, doc, deleteDoc } from 'firebase/firestore'
import UserModel from './UserModel'

class NutritionistModel extends UserModel {

    constructor() {
        super()
        this.table = "nutricionista"
    }

    // Adiciona paciente na base
    async add(nutritionist) {
        try {
            const retUser = await createUser(nutritionist).then(function (result) {
                return result.data.response
            })
            if (typeof(retUser) === 'object') {
                await this.addUser(nutritionist, retUser.uid)
                await setDoc(doc(db, this.table, retUser.uid), {
                    usuario_uuid: retUser.uid,
                    crn: nutritionist.crn,
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
    
    async getNutritionists() {
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

}

export default NutritionistModel