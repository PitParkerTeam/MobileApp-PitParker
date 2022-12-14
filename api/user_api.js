import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { firestore, auth } from "./firestore/firebase_setup";

const userAPI = {
  async addUser(user) {
    const { uid, email } = user;
    try {
      const docRef = await setDoc(doc(firestore, "users", uid), {
        email,
      });
    } catch (err) {
      console.log("save user ", err);
    }
  },
  async getUser() {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  },
};
export default userAPI;
