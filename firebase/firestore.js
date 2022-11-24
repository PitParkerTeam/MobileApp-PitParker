import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
  } from "firebase/firestore";
  
  import { firestore, auth } from "./firebase-setup";



  // CREATE
  export async function createParking(parking) {
    try {
      const docRef = await addDoc(collection(firestore, "Parkings"), {
        ...parking,
        // user: auth.currentUser.uid,
      });
    } catch (err) {
      console.log(err);
    }
  }

  export async function createFavPit(pit) {
    try {
      const docRef = await addDoc(collection(firestore, "FavPits"), {
        ...pit,
        // user: auth.currentUser.uid,
      });
    } catch (err) {
      console.log(err);
    }
  }

  export async function createPlate(plate) {
    try {
      const docRef = await addDoc(collection(firestore, "Plates"), {
        ...plate,
        // user: auth.currentUser.uid,
      });
    } catch (err) {
      console.log(err);
    }
  }



  // READ
  export async function getParkingHistory() {

    const docRef = doc(firestore, "Parkings")
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
  
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No parking history!");
    }

  }

  export async function getPlates() {

    const docRef = doc(firestore, "Plates")
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
  
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No plates!");
    }

  }

  export async function getFavPits() {

    const docRef = doc(firestore, "FavPits")
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
  
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No favourite parking pits!");
    }

  }




  // UPDATE
  
  export async function updateParking(pid, parking) {
    try {
      await setDoc(doc(firestore, "Parkings", pid), parking);
    } catch (err) {
      console.log("update parking: ", err);
    }
  }

  export async function updatePlate(pid, plate) {
    try {
      await setDoc(doc(firestore, "Plates", pid), plate);
    } catch (err) {
      console.log("update palte: ", err);
    }
  }

  export async function updateFavPit(fpid, favPit) {
    try {
      await setDoc(doc(firestore, "FavPits", fpid), favPit);
    } catch (err) {
      console.log("update favourite pit: ", err);
    }
  }


  

  // DELETE
  export async function deleteParkingFromDB(key) {
    try {
      await deleteDoc(doc(firestore, "Parkings", key));
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function deleteFavPitFromDB(key) {
    try {
      await deleteDoc(doc(firestore, "FavPits", key));
    } catch (err) {
      console.log(err);
    }
  }

  export async function deletePlateFromDB(key) {
    try {
      await deleteDoc(doc(firestore, "Plates", key));
    } catch (err) {
      console.log(err);
    }
  }
