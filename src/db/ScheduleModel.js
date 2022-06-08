import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
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
                nutritionist_uuid: nutritionist_uuid,
                data: date,
                horario: times[i]
            })
        }
    }
}

export default ScheduleModel