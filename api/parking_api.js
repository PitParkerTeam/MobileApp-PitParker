import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { firestore, auth, storage } from "./firestore/firebase_setup";

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

  async uploadImage (uri) {

    const getImage = async (uri) => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
      } catch (err) {
        console.log("fetch image ", err);
      }
    };

    try {
      if (uri) {
        const imageBlob = await getImage(uri);
        const imageName = uri.substring(uri.lastIndexOf("/") + 1);
        const imageRef = await ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytes(imageRef, imageBlob);
        uri = uploadResult.metadata.fullPath; //replaced the uri with reference to the storage location
      }
      return uri;
    } catch (err) {
      console.log("image upload ", err);
    }
  },
};

export default parkingAPI;
