import { doc, getDoc } from "firebase/firestore";
import { database } from "../..";


export async function getAgenciaByDefault() {
    try {

        const userRef = doc(database, "agencia", "default");
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch (error) {
        console.error("Error al obtener información sobre la agencia:", error);
        return null;
    }
}