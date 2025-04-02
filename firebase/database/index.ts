import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export const createCollection = async (name: string, database: Firestore) => {
  try {
    const collectionRef = collection(database, name);
    const docRef = doc(collectionRef, "initDoc");
    await setDoc(docRef, { initialized: true });
    console.log("Colección " + name + " creada.");
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error creando la colección " + name, error);
  }
};
