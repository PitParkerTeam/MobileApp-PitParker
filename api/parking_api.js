import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

import { firestore, auth } from "./firestore/firebase_setup";

const parkingAPI = {
  async createNewParking(parking) {
    const uid = auth.currentUser.uid;
    try {
      const docRef = await addDoc(
        collection(firestore, "users", uid, "parkings"),
        parking
      );
    } catch (err) {
      console.log(err);
    }
  },

  fetchParkings(cb) {
    const uid = auth.currentUser.uid;
    return onSnapshot(collection(firestore, "users", uid, "parkings"), cb);
  },

  async getParking(id) {
    const uid = auth.currentUser.uid;
    try {
      const docRef = doc(firestore, "users", uid, "parkings", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch {}
  },

  async updateParking(pid, parking) {
    const uid = auth.currentUser.uid;
    try {
      await setDoc(doc(firestore, "users", uid, "parkings", pid), parking);
    } catch (err) {
      console.log("update parking: ", err);
    }
  },
  async deleteParking(pid) {
    const uid = auth.currentUser.uid;

    try {
      await deleteDoc(doc(firestore, uid, "parkings", pid));
    } catch (err) {
      console.log(err);
    }
  },
};

export default parkingAPI;
