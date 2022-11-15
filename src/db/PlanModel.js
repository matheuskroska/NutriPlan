import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

class PlanModel {
    constructor() {
        this.add = this.add.bind(this)
        this.table = "plano"
    }

    async add(plan) {
        const docRef = await addDoc(collection(db, this.table), plan)
        return docRef.id
    }

    async get(planId) {
        const docRef = doc(db, this.table, planId);
        if (!docRef) return false
        const docSnap = await getDoc(docRef);
 
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return false
        }
    }
}

export default PlanModel