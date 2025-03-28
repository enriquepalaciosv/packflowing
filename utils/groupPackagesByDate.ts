import { Paquete } from "../interfaces/packages";

// Función para ordenar y agrupar los paquetes por la fecha del último rastreo
export default function groupAndSortPackagesByRastreo(
  paquetes: Paquete[]
): Record<string, Paquete[]> {
  // Ordenar los paquetes por la fecha y hora del último rastreo
  const paquetesOrdenados = paquetes.sort((a, b) => {
    const lastRastreoA = a.rastreo[a.rastreo.length - 1];
    const lastRastreoB = b.rastreo[b.rastreo.length - 1];

    const dateA = new Date(`${lastRastreoA.fecha}T${lastRastreoA.hora}`);
    const dateB = new Date(`${lastRastreoB.fecha}T${lastRastreoB.hora}`);

    return dateB.getTime() - dateA.getTime(); // Orden descendente: más reciente primero
  });

  // Agrupar los paquetes por fecha
  const agrupadoPorFecha: Record<string, Paquete[]> = {};

  paquetesOrdenados.forEach((paquete) => {
    const lastRastreo = paquete.rastreo[paquete.rastreo.length - 1];
    const fecha = lastRastreo.fecha;

    // Si no existe una entrada para esa fecha, la creamos
    if (!agrupadoPorFecha[fecha]) {
      agrupadoPorFecha[fecha] = [];
    }

    // Añadir el paquete a la lista correspondiente
    agrupadoPorFecha[fecha].push(paquete);
  });

  return agrupadoPorFecha;
}
