import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";

import { firestore, auth } from "./firebase_setup";

const pitAPI = {
  async batchAddPits(pits) {
    const batch = writeBatch(firestore);
    pits.forEach((pit) => {
      const { place_id, ...others } = pit;
      const pitRef = doc(firestore, "pits", place_id);
      batch.set(pitRef, others, { merge: true });
    });
    await batch.commit();
  },

  async createNewPit(pit) {
    try {
      const docRef = await addDoc(
        collection(firestore, auth.currentUser.uid, "pits"),
        {
          ...pit,
        }
      );
    } catch (err) {
      console.log(err);
    }
  },

  fetchPits(userPits) {
    const uid = auth.currentUser.uid;
    return onSnapshot(collection(firestore, "users", uid, "pits"), userPits);
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
