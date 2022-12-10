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
    const { parkTime, duration, durationUnit, longitude, latitude, pitID } =
      parking;
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
            longitude,
            latitude,
            pitID,
          }
        )
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
    try {
      const docRef = doc(firestore, "parkings", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch {}
  },

  async updateParking(pid, parking) {
    try {
      await setDoc(doc(firestore, "parkings", pid), parking);
    } catch (err) {
      console.log("update parking: ", err);
    }
  },
  async deleteParking(pid) {
    try {
      await deleteDoc(doc(firestore, auth.currentUser.uid, "parkings", pid));
    } catch (err) {
      console.log(err);
    }
  },
};

export default parkingAPI;
