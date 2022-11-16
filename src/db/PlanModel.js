import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import _ from "lodash";
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
    
    async update(planId, plan) {
        const docRef = doc(db, this.table, planId)
        await setDoc(docRef, plan)
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

    async getMacroNutri(planId) {
        let plan = await this.get(planId)
        let carbs = 0
        let fat = 0
        let protein = 0
        let numItems = 0
        _.map(plan, (data, key) => {
            _.map(data.items, (dataItem, keyItem) => {
                let caloricBreakdown = dataItem.foodDetails.nutrition.caloricBreakdown
                carbs += caloricBreakdown.percentCarbs
                fat += caloricBreakdown.percentFat
                protein += caloricBreakdown.percentProtein
                numItems++
            })
        })
        carbs = Math.round((carbs/numItems) * 100) / 100
        fat = Math.round((fat/numItems) * 100) / 100
        protein = Math.round((protein/numItems) * 100) / 100
        let macroNutri = [carbs, fat, protein]
        return macroNutri
    }

    async getMacroNutriPerFood(planId) {
        let plan = await this.get(planId)
        let macroNutriFood = {
            labels: [],
            data: []
        }
        _.map(plan, (data, key) => {
            _.map(data.items, (dataItem, keyItem) => {
                let caloricBreakdown = dataItem.foodDetails.nutrition.caloricBreakdown
                if (macroNutriFood.labels.indexOf(dataItem.food) === -1) {
                    macroNutriFood.labels.push(dataItem.food)
                    
                    macroNutriFood.data.push({
                        carbs: caloricBreakdown.percentCarbs,
                        fat: caloricBreakdown.percentFat,
                        protein: caloricBreakdown.percentProtein,
                    })
                }
            })
        })
        return macroNutriFood
    }
}

export default PlanModel