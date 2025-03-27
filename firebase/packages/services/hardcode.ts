import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../..";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const cargarDatos = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("No hay usuario autenticado.");
      return;
    }

    const uid = user.uid;

    // Referencia al flag de carga
    const configRef = doc(database, `usuarios/${uid}/config/cargaInicial`);

    try {
      // Verificar si ya se cargaron datos para este usuario
      const queryDocs = query(
        collection(database, "paquetes"),
        where("idUsuario", "==", uid)
      );

      const configSnap = await getDocs(queryDocs);

      if (!configSnap.empty) {
        console.log("Los datos ya fueron cargados previamente.");
        return;
      }

      const paquetes = [
        { title: "Paquetes en tránsito", data: [] },
        {
          title: "Paquetes listos para recoger",
          data: [
            {
              idUsuario: uid,
              idRastreo: "PKG123456789",
              estado: "listo_para_retirar",
              via: "aereo",
              peso: { monto: 3, unidad: "kg" },
              tarifa: { monto: 10, moneda: "USD" },
              contenido: "libros",
              total: 30,
              rastreo: [
                { fecha: "2025-03-25", hora: "10:00", estado: "recibido" },
                { fecha: "2025-03-26", hora: "12:00", estado: "en_transito" },
                {
                  fecha: "2025-03-27",
                  hora: "15:00",
                  estado: "listo_para_retirar",
                },
              ],
            },
          ],
        },
        {
          title: "Paquetes recibidos",
          data: Array.from({ length: 6 }, (_, i) => ({
            idUsuario: uid,
            idRastreo: `PKG_RECIBIDO_${i}`,
            estado: "recibido",
            via: i % 2 === 0 ? "aereo" : "maritimo",
            peso: { monto: 5 + i, unidad: "lb" },
            tarifa: { monto: 7.5 + i, moneda: "USD" },
            contenido: "electrónicos",
            total: (7.5 + i) * (5 + i),
            rastreo: [
              { fecha: "2025-03-20", hora: "14:30", estado: "recibido" },
            ],
          })),
        },
        {
          title: "Paquetes entregados",
          data: Array.from({ length: 7 }, (_, i) => ({
            idUsuario: uid,
            idRastreo: `PKG_ENTREGADO_${i}`,
            estado: "entregado",
            via: i % 2 === 0 ? "aereo" : "maritimo",
            peso: { monto: 4 + i, unidad: "lb" },
            tarifa: { monto: 6.5 + i, moneda: "USD" },
            contenido: "ropa",
            total: (6.5 + i) * (4 + i),
            rastreo: [
              { fecha: "2025-03-21", hora: "10:00", estado: "recibido" },
              { fecha: "2025-03-22", hora: "12:00", estado: "en_transito" },
              { fecha: "2025-03-23", hora: "15:00", estado: "entregado" },
            ],
          })),
        },
      ];

      // Insertar datos en Firestore
      for (const section of paquetes) {
        for (const item of section.data) {
          await addDoc(collection(database, "paquetes"), item);
        }
      }

      // Marcar que los datos ya fueron insertados
      await setDoc(configRef, { cargado: true });

      console.log("Datos de prueba cargados correctamente.");
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  });
};

export default cargarDatos;
