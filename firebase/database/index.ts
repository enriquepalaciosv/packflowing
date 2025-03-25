import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from "..";

const database = getFirestore(app);

const createCollection = async (name: string) => {
  try {
    const collectionRef = collection(database, name);
    const docRef = doc(collectionRef, "initDoc");
    await setDoc(docRef, { initialized: true });
    console.log("Colección " + name + " creada con un documento inicial.");
  } catch (error) {
    console.error("Error creando la colección " + name, error);
  }
};

// Crear coleccion users
createCollection("users")
  .then((response) => console.log({ response }))
  .catch((error) => console.log({ error }));

// Agregar demás tablas

export default database;
