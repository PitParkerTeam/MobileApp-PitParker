import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { firestore, auth } from "./firebase-setup";

export async function createNewParking(parking) {
  try {
    const docRef = await addDoc(collection(firestore, "Parkings"), {
      ...parking,
      user: auth.currentUser.uid,
    });
  } catch (err) {
    console.log(err);
  }
}
export function userParkingSnapshot(cb) {
  const q = query(
    collection(firestore, "cities"),
    where("user", "==", auth.currentUser.uid)
  );
  return onSnapshot(q, cb);
}

export async function updateParking(pid, parking) {
  try {
    await setDoc(doc(firestore, "Parkings", pid), parking);
  } catch (err) {
    console.log("update parking: ", err);
  }
}

export async function deleteParking(key) {
  try {
    await deleteDoc(doc(firestore, "Parkings", key));
  } catch (err) {
    console.log(err);
  }
}
