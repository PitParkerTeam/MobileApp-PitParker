import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { firestore, auth } from "./firebase-setup";

export async function createNewPit(pit) {
    try {
        const docRef = await addDoc(collection(firestore, auth.currentUser.uid, "pits"), {
            ...pit,
        });
    } catch (err) {
        console.log(err)
    }
}

export function getPit(userPits) {
    return onSnapshot(collection(firestore, "users", auth.currentUser.uid, "pits"), userPits);
}

export async function deletePit(pid) {
    try {
        await deleteDoc(doc(firestore, auth.currentUser.uid, "pits", pid));
    } catch (err) {
        console.log(err)
    }
}

