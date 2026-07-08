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

export interface DatasetConfig {
  key: string;                    // clave única; también el nombre de la capa que se muestra en el control de capas de Leaflet
  url: string;                    // ruta al archivo geojson
  filterType: "uso" | "pozo";     // mismo significado que el filterType de CapasEstructura actual
  kind: "puntos" | "poligono";    // "puntos" crea marcadores; "poligono" crea un polígono (humedal)
  pozoSourceLayerMap?: Record<string, Uso>; // solo para conjuntos de datos tipo pozo sin entradas REPDA
}

export type Punto = {
  name: string;
  lat: number;
  lng: number;
  uso: Uso;
  repda: RepdaEntry | null;
  marker?: L.Marker;
  capaKey?: string;         // de qué conjunto de datos/capa proviene este punto (para la búsqueda de forma por capa)
  volumenM3Anio?: number;   // parsed de repda.volumen_m3_anio_limpio, utilizado para el escalado de tamaño
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

export interface InstruccionPaso {
  numero: string;
  titulo: string;
  descripcion: string;
  items?: string[];
}

