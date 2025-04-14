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

export const createCollectionAgencia = async (
  name: string,
  database: Firestore
) => {
  try {
    const collectionRef = collection(database, name);
    const docRef = doc(collectionRef, "default");
    await setDoc(docRef, {
      contacto: "+12224343434",
      politicaPrivacidad: "https://example.com/polity",
      AI: true,
      activo: true,
    });
    console.log("Colección " + name + " creada.");
    console.log(
      "Agencia creada con número de contacto: +12224343434, URL de politica de privacidad https://example.com/polity, AI y activo en true"
    );
  } catch (error) {
    console.error("Error creando la colección " + name, error);
  }
};
