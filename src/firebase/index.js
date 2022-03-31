import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// Configuração do firebase
const firebaseConfig = {
  apiKey: "AIzaSyC49ICUftn9MlHFJb7bToIIkFQTP_W73mw",
  authDomain: "nutriplan-8753e.firebaseapp.com",
  projectId: "nutriplan-8753e",
  storageBucket: "nutriplan-8753e.appspot.com",
  messagingSenderId: "313276693423",
  appId: "1:313276693423:web:f68ee924a78940175b0d5a",
  measurementId: "G-E2ME69P5SB"
}

// Inicialização do firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)