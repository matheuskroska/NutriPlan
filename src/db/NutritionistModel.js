import { createUser, db } from '../firebase'
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore'
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
    
    async confUserNutritionist(users) {
        users.map(async (user) => {
            const q = query(collection(db, this.table), where("usuario_uuid", "==", user.uuid))

            const data = await getDocs(q)
            if (!!data && data.docs.length > 0) {
                const dataResult = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                user.crn = dataResult[0].crn
            }
        })
        return users
    }

}

export default NutritionistModel