export type RepdaEntry = {
  titular?: string;
  registro?: string;
  uso?: string;
  autoridad_emisora?: string;
  fecha_registro?: string;
  volumen_extraccion_m3_anio?: string;
  anexos_superficiales?: string;
  volumen_superficiales_m3_anio?: string;
  anexos_subterraneas?: string;
  volumen_subterraneas_m3_anio?: string;
  numero_anexos_descarga?: string;
  volumen_descarga_m3_dia_resultado?: string;
  anexos_zonas_federales?: string;
  superficie_m2?: string;
  record_key?: string;
  detalle_href?: string;
  numero_descarga?: string;
  lat_grados?: string;
  lat_minutos?: string;
  lat_segundos?: string;
  latitud?: string;
  lon_grados?: string;
  lon_minutos?: string;
  lon_segundos?: string;
  longitud?: string;
  estado_descarga?: string;
  municipio_descarga?: string;
  region_hidrologica?: string;
  cuenca?: string;
  cuerpo_receptor?: string;
  descarga_afluente?: string;
  procedencia?: string;
  forma_descargar?: string;
  tipo_descarga?: string;
  volumen_descarga_m3_dia_detalle?: string;
  volumen_descarga_m3_anio_detalle?: string;
  pagina_resultados?: string;
  indice_pagina?: string;
  error?: string;
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
