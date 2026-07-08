import type L from "leaflet";

export type RepdaEntry = {
  titular?: string;
  titulo?: string;
  uso?: string;
  tipo?: string;
  volumen_m3_dia_limpio?: string;
  volumen_m3_anio_limpio?: string;
  fecha_registro?: string;
  municipio_descarga?: string;
  cuenca?: string;
  procedencia?: string;
  tipo_descarga?: string;
  cuerpo_receptor?: string;
  volumen_m3_anio_subterraneo?: string;
  region_hidrologica?: string;
};


export type Uso =
  | "INDUSTRIAL"
  | "AGRICOLA"
  | "PUBLICO URBANO"
  | "SERVICIOS"
  | "PECUARIO"
  | "DOMESTICO"
  | "DIFERENTES USOS"
  | "POZOS RIEGO"
  | "POZOS DOMO"
  | "POZOS DOMESTICO";

export type Punto = {
  name: string;
  lat: number;
  lng: number;
  uso: Uso;
  repda: RepdaEntry | null;
  marker?: L.Marker;
};

export type CapasEstructura = {
  [capaName: string]: {
    layerGroup: L.LayerGroup;
    puntos: Punto[];
    usos: Set<Uso>;
    filterType: "uso" | "pozo";
  };
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
