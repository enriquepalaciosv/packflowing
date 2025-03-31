export default function formatearFecha(fecha: string) {
    const [year, month, day] = fecha.split("-").map(Number);
    const fechaObj = new Date(year, month - 1, day);
    return fechaObj.toLocaleDateString(
        "es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};