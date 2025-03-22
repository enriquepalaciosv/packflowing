import { getFirestore } from "firebase/firestore";
import app from "..";

const database = getFirestore(app);

export default database;