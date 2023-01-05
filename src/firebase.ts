import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAuEH6jb1s8I-_zVPN-Ep-Pv__Y0ps-1QI",
  authDomain: "helpdesk-bot-e91b5.firebaseapp.com",
  projectId: "helpdesk-bot-e91b5",
  storageBucket: "helpdesk-bot-e91b5.appspot.com",
  messagingSenderId: "382979904862",
  appId: "1:382979904862:web:7cb36645770e5c8e266bcf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createTicket(threadId: string, text: string) {
    try {
        await addDoc(collection(db, "tickets"), {
            threadId,
            text,
            openedAt: Date()
        })
    } catch(err) {
        console.error("Error asdding document: ", err);
    }
}
