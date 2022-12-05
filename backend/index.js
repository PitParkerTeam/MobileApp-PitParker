export { auth, firestore } from "./firestore/firebase_setup";
export { createNewParking, fetchParking, updateParking, deleteParking } from "./firestore/parking_store";
export { createNewPit, getPit} from './firestore/pit_store'
export { addUser , getUser } from "./firestore/user_store";