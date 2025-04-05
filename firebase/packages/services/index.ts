import { database } from "../../index"; // Asegúrate de importar tu configuración de Firebase
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  getDoc,
} from "firebase/firestore";

export default async function getAllPackageUser(idUser: string) {
  try {
    const paquetesRef = collection(database, "paquetes"); // Referencia a la colección "paquetes"
    const q = query(paquetesRef, where("idUsuario", "==", idUser)); // Filtra por el id del usuario
    const querySnapshot = await getDocs(q);

    // Mapear los documentos obtenidos a un array de objetos
    const paquetes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return paquetes;
  } catch (error) {
    console.error("Error obteniendo paquetes:", error);
    return [];
  }
}

export const getPackagesByState = async (
  estado: "recibido" | "en_transito" | "listo_para_retirar" | "entregado",
  idUsuario: string,
  limitCount: number = 5
) => {
  const paquetesRef = collection(database, "paquetes");

  const q = query(
    paquetesRef,
    where("estado", "==", estado),
    where("idUsuario", "==", idUsuario),
    orderBy("rastreo[-1].fecha", "desc"), // Ordena por la fecha del último rastreo
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export async function getPackageById(idRastreo: string) {
  try {
    const paquetesRef = collection(database, "paquetes"); // Referencia a la colección "paquetes"
    const q = query(paquetesRef, where("idRastreo", "==", idRastreo)); // Filtrar por idRastreo
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // 🔹 Si no hay resultados, devuelve null
    }

    const paquete = querySnapshot.docs[0].data(); // 🔹 Obtiene el primer documento
    return { id: querySnapshot.docs[0].id, ...paquete }; // 🔹 Devuelve el objeto con su ID
  } catch (error) {
    console.error("Error al obtener el paquete:", error);
    return null;
  }
}
