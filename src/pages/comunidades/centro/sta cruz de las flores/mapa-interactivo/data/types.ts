export type RepdaEntry = {
  ACUIFERO: string;
  CUENCA: string;
  NOMREGHID: string;
  USO: string;
  VOLSB: string;
  CLAVE_ACUIFERO?: string;
  OC?: string;
  USO2?: string;
  VOLSB2?: string;
  USO3?: string;
  VOLSB3?: string;
};

export type Uso =
  | "INDUSTRIAL"
  | "AGRICOLA"
  | "PUBLICO URBANO"
  | "SERVICIOS"
  | "PECUARIO"
  | "DOMESTICO"
  | "POZOS RIEGO"
  | "POZOS DOMO"
  | "POZOS DOMESTICO";

export type Punto = {
  name: string;
  lat: number;
  lng: number;
  uso: Uso;
  repda: RepdaEntry | null;
};

export type MarkerShape =
  | "circle"
  | "square"
  | "diamond"
  | "hexagon"
  | "pentagon"
  | "cross"
  | "octagon"
  | "star4"
  | "ring";
