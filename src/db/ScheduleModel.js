import { db } from '../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { addDays } from 'date-fns'

class ScheduleModel {

    constructor() {
        this.table = "agenda"
    }

    async add(nutritionist_uuid) {
        let dates = [addDays(new Date(), 1), addDays(new Date(), 2), addDays(new Date(), 3), addDays(new Date(), 4), addDays(new Date(), 5)]
        let randomD = Math.floor(Math.random() * 5)
        let times = ["08:00", "10:30", "11:00", "13:30", "14:00", "15:00", "16:30", "17:00", "17:30"]
        for (let i = 0; i < times.length; i++) {
            let day = (dates[randomD].getDate() < 10) ? "0"+dates[randomD].getDate() : dates[randomD].getDate()
            let month = ((dates[randomD].getMonth()+1) < 10) ? "0"+(dates[randomD].getMonth()+1) : (dates[randomD].getMonth()+1) 
            let date = day + '/' + month + '/' + dates[randomD].getFullYear()
            await addDoc(collection(db, this.table), {
                nutricionista_uuid: nutritionist_uuid,
                data: date,
                horario: times[i]
            })
        }
    }

    async addNew(nutritionist_uuid, date, time) {
        await addDoc(collection(db, this.table), {
            nutricionista_uuid: nutritionist_uuid,
            data: date,
            horario: time
        })
    }

    async getAll(nutriUuid) {
        const q = query(collection(db, this.table), where("nutricionista_uuid", "==", nutriUuid))
        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        return dataResult
    }

    async getDocId(date, time, nutriUuid) {
        const q = query(collection(db, this.table), where("data", "==", date), where("horario", "==", time), where("nutricionista_uuid", "==", nutriUuid))
        const data = await getDocs(q)
        const dataResult = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        if (dataResult.length === 1) {
            return dataResult[0].id
        } else {
            return false
        }
    }

    async removeDateTime(date, time, nutriUuid) {
        const docId = await this.getDocId(date, time, nutriUuid)
        if (docId) {
            await deleteDoc(doc(db, this.table, docId))
        }
    }

    async update(nutriUuid, previousDate, previousTime, date, time) {
        const docId = await this.getDocId(previousDate, previousTime, nutriUuid)
        const data = {
            data: date,
            horario: time,
            nutricionista_uuid: nutriUuid
        }
        if (docId) {
            await updateDoc(doc(db, this.table, docId), data);
        }
    }
}

export default ScheduleModel