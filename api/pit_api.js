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
    pits.forEach(async (pit) => {
      const { id, ...others } = pit;
      const pitRef = doc(firestore, "pits", id);
      const docSnap = await getDoc(pitRef)
      if (!docSnap.exists()) batch.set(pitRef, others);
    });
    await batch.commit();
  },

  async createNewPit(pit) {
    try {
      const docRef = await addDoc(collection(firestore, "pits"), {
        ...pit,
      });
      return docRef.id;
    } catch (err) {
      console.log(err);
    }
  },
  async updatePit(pit) {
    const { id, ...others } = pit;
    try {
      const docRef = await setDoc(
        doc(firestore, "pits", id),
        others
      );
    } catch (err) {
      console.log(err);
    }
  },
  async saveAsMyPit(pit) {
    const uid = auth.currentUser.uid;
    const { id, ...others } = pit;
    try {
      const docRef = await setDoc(
        doc(firestore, "users", uid, "pits", id),
        others
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

  async removeFromMyPit(pid) {
    try {
      await deleteDoc(doc(firestore,"users", auth.currentUser.uid, "pits", pid));
    } catch (err) {
      console.log(err);
    }
  },
};
export default pitAPI;
