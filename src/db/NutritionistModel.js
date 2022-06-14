import { createUser, db } from '../firebase'
import { collection, getDocs, query, setDoc, doc, getDoc, where } from 'firebase/firestore'
import UserModel from './UserModel'
import ScheduleModel from './ScheduleModel'

class NutritionistModel extends UserModel {

    constructor() {
        super()
        this.table = "nutricionista"
    }

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
                let scheduleModel = new ScheduleModel()
                await scheduleModel.add(retUser.uid)
                return retUser.uid
            } else {
                return retUser
            }
        } catch (e) {
            console.error("Error adding document: ", e)
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

    async getAllNutritionists() {
        const q = query(collection(db, this.table))

        const docsNutri = await getDocs(q)
        const dataNutri = docsNutri.docs.map((docNutri) => ({
            ...docNutri.data(),
            id: doc.id
        }))

        let result = []
        let uuids = []
        dataNutri.forEach((value) => {
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

    async isNutritionist(uuid) {
        const docRef = doc(db, this.table, uuid)
        const docSnap = await getDoc(docRef)
 
        if (docSnap.exists()) {
            return true
        } else {
            return false
        }
    }
 
    async getCrnByUuid(uuid) {
        const docRef = doc(db, this.table, uuid)
        const docSnap = await getDoc(docRef)
 
        if (docSnap.exists()) {
            return docSnap.data().crn
        } else {
            return false
        }
    }
 
}

export default NutritionistModel