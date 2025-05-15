export interface Peso {
  monto: number;
  unidad: "lb" | "kg"; // Puede incluir más unidades si es necesario
}

export interface Tarifa {
  monto: number;
  moneda: "USD" | "EUR" | "MXN"; // Puede incluir otras monedas
}

export interface Rastreo {
  fecha: string; // Podría usar Date en lugar de string si prefieres
  hora: string; // Lo mismo que para fecha, puedes usar Date si lo deseas
  estado: "recibido" | "en_transito" | "listo_para_retirar" | "entregado";
}

export interface Paquete {
  idUsuario: string;
  idRastreo: string;
  estado: "recibido" | "en_transito" | "listo_para_retirar" | "entregado";
  via: "aereo" | "maritimo"; // Se pueden agregar más tipos de transporte si es necesario
  peso?: Peso;
  tarifa?: Tarifa;
  contenido?: string;
  total?: number;
  rastreo: Rastreo[];
  observaciones?: string
}

export interface Section {
  title:
    | "Paquetes recibidos"
    | "Paquetes en tránsito"
    | "Paquetes listos para recoger"
    | "Paquetes entregados";
  data: Paquete[];
}
