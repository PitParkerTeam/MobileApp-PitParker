import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { firestore, auth } from "./firebase-setup";


export async function createNewParking(parking) {
  try {
    const docRef = await addDoc(collection(firestore, "History"), {
      ...parking,
    //   user: auth.currentUser.uid,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getAllHistory() {
  const docRef = doc(firestore, "History");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No parking history!");
  }
}

  export async function updateParking(pid, parking) {
    try {
      await setDoc(doc(firestore, "Parkings", pid), parking);
    } catch (err) {
      console.log("update parking: ", err);
    }
  }

    export async function deleteParkingFromDB(key) {
      try {
        await deleteDoc(doc(firestore, "Parkings", key));
      } catch (err) {
        console.log(err);
      }
    }