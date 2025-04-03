export type SectionTitle =
    | "Paquetes recibidos"
    | "Paquetes en tránsito"
    | "Paquetes listos para recoger"
    | "Paquetes entregados";

export type PackageTitle =
    | "Paquete recibido"
    | "Paquete en tránsito"
    | "Paquete listo"
    | "Paquete entregado";

export type PackageByRastreo =
    | "Recibido"
    | "En tránsito"
    | "Listo"
    | "Entregado";

export const statusMapping: Record<string, SectionTitle> = {
    recibido: "Paquetes recibidos",
    en_transito: "Paquetes en tránsito",
    listo_para_retirar: "Paquetes listos para recoger",
    entregado: "Paquetes entregados",
};

export const packageMapping: Record<string, PackageTitle> = {
    recibido: "Paquete recibido",
    en_transito: "Paquete en tránsito",
    listo_para_retirar: "Paquete listo",
    entregado: "Paquete entregado",
};


export const actionPackageByRastreo: Record<string, PackageByRastreo> = {
    recibido: "Recibido",
    en_transito: "En tránsito",
    listo_para_retirar: "Listo",
    entregado: "Entregado",
};