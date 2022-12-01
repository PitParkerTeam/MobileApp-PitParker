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
    const docRef = await addDoc(collection(firestore, auth.currentUser.uid, "parkings"), {
      ...parking,
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
    await setDoc(
      doc(firestore, auth.currentUser.uid, "parkings", pid),
      parking
    );
  } catch (err) {
    console.log("update parking: ", err);
  }
}

export async function deleteParking(pid) {
  try {
    await deleteDoc(doc(firestore, auth.currentUser.uid, "parkings", pid));
  } catch (err) {
    console.log(err);
  }
}
