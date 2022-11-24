import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
  } from "firebase/firestore";
  
  import { firestore, auth } from "./firebase-setup";
  
  export async function saveUser(user) {
    try {
      await setDoc(doc(firestore, "users", auth.currentUser.uid), user);
    } catch (err) {
      console.log("save user ", err);
    }
  }
  export async function getUser() {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
  
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  export async function writeToDB(goal) {
    try {
      const docRef = await addDoc(collection(firestore, "goals"), {
        ...goal,
        user: auth.currentUser.uid,
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function deleteFromDB(key) {
    try {
      await deleteDoc(doc(firestore, "goals", key));
    } catch (err) {
      console.log(err);
    }
  }
