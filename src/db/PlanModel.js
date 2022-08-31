import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

class PlanModel {
    constructor() {
        this.add = this.add.bind(this)
    }

    async add(plan) {
        // const docRef = await addDoc(collection(db, "plano"), plan)
        await addDoc(collection(db, "plano"), plan)
    }
}

export default PlanModel