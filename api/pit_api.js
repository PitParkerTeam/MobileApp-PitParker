import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  writeBatch,
  setDoc,
} from "firebase/firestore";

import { firestore, auth } from "./firestore/firebase_setup";


const pitAPI = {
  async batchAddPits(pits) {
    const batch = writeBatch(firestore);
    pits.forEach((pit) => {
      const { id, ...others } = pit;
      const pitRef = doc(firestore, "pits", id);
      batch.set(pitRef, others, { merge: true });
    });
    await batch.commit();
  },

  async createNewPit(pit) {
    try {
      const docRef = await addDoc(
        collection(firestore, "pits"),
        {
          ...pit,
        }
      );
      return docRef.id;
    } catch (err) {
      console.log(err);
    }
  },

  async saveAsMyPit(pit) {
    const uid = auth.currentUser.uid;
    try {
      const docRef = await setDoc(
        doc(firestore, "users", uid, "pits", pit.pitID),
        pit
      );
    } catch (err) {
      console.log(err);
    }
  },

  fetchPits(cb) {
    const uid = auth.currentUser.uid;
    return onSnapshot(collection(firestore, "users", uid, "pits"), cb);
  },

  async getPit(id) {
    try {
      const docRef = doc(firestore, "pits", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (err) {
      console.log(err);
    }
  },

  async deletePit(pid) {
    try {
      await deleteDoc(doc(firestore, auth.currentUser.uid, "pits", pid));
    } catch (err) {
      console.log(err);
    }
  },
};
export default pitAPI;
