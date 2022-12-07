import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

import { firestore, auth, myApp } from "./firebase_setup";

export async function createNewParking(parking) {
  const { parkTime, duration, durationUnit, longitude, latitude } = parking;
  try {
    const docRef = await addDoc(collection(firestore, "parkings"), {
      ...parking,
    }).then(() =>
      setDoc(
        doc(firestore, "users", auth.currentUser.uid, "parkings", docRef.id),
        {
          parkTime,
          duration,
          durationUnit,
        }
      )
    );
  } catch (err) {
    console.log(err);
  }
}

export function fetchParkings(cb) {
  const uid = auth.currentUser.uid;
  return onSnapshot(collection(firestore, "users", uid, "parkings"), cb);
}

export const getParking = async (id) => {
  try {
    const docRef = doc(firestore, "parkings", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch {

  }
};

export async function updateParking(pid, parking) {
  try {
    await setDoc(doc(firestore, "parkings", pid), parking);
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
