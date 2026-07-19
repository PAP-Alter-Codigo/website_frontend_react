import L, { DivIcon } from "leaflet";
import React from "react";
import type { Uso, MarkerShape, RepdaEntry, InstruccionPaso } from "./types";

export const CAPAS: { key: Uso; label: string; color: string }[] = [
  { key: "INDUSTRIAL", label: "Industrial", color: "#b45309" },
  { key: "AGRICOLA", label: "Agrícola", color: "#15803d" },
  { key: "PUBLICO URBANO", label: "Público urbano", color: "#1d4ed8" },
  { key: "SERVICIOS", label: "Servicios", color: "#7c3aed" },
  { key: "PECUARIO", label: "Pecuario", color: "#0f766e" },
  { key: "DOMESTICO", label: "Doméstico", color: "#db2777" },
  { key: "DIFERENTES USOS", label: "Diferentes usos", color: "#2e2e2e" },
  { key: "POZOS RIEGO", label: "Pozos profundos y norias de riego", color: "#dc2626" },
  { key: "POZOS DOMO", label: "Pozos Domo sur la Primavera", color: "#d97706" },
  { key: "POZOS DOMESTICO", label: "Pozos uso doméstico", color: "#0284c7" },
];

export const POZO_SOURCE_LAYER_MAP: Record<string, Uso> = {
  "Pozos profundos y norias de riego": "POZOS RIEGO",
  "Pozos Domo sur la Primavera": "POZOS DOMO",
  "Pozos para uso doméstico": "POZOS DOMESTICO",
};

export const TOOLTIPS: Record<Uso, string> = {
  INDUSTRIAL: "Este tipo de concesión ampara el agua utilizada directamente en fábricas o empresas",
  AGRICOLA: "Es el agua destinada exclusivamente a la producción de alimentos vegetales",
  "PUBLICO URBANO": "Es el agua que se entrega a las ciudades, municipios y pueblos para el beneficio común",
  SERVICIOS: "Este uso aplica para el agua destinada a actividades comerciales o de prestación de bienes y servicios que no son de índole doméstica ni manufacturera",
  PECUARIO: "Es el agua requerida expresamente para la actividad ganadera y de crianza animal",
  DOMESTICO: "Es el agua de uso estrictamente particular, enfocada en la subsistencia diaria de las personas",
  "DIFERENTES USOS": "Es el agua destinada a diferentes usos",
  "POZOS RIEGO": "Los pozos profundos suelen perforarse a mayor profundidad y requieren bombeo; las norias suelen ser excavaciones que aprovechan agua más cercana a la superficie. Ambos forman parte de la infraestructura local para acceder al agua del subsuelo",
  "POZOS DOMO": " Esta categoría reúne referencias comunitarias o territoriales sobre aprovechamientos de agua ubicados hacia esa zona.",
  "POZOS DOMESTICO": "Aprovechamiento de agua asociado a necesidades básicas de vivienda o unidades familiares, como consumo cotidiano, limpieza, higiene y otros usos del hogar.",
};

export const colorByUso: Record<Uso, string> = Object.fromEntries(
  CAPAS.map(({ key, color }) => [key, color])
) as Record<Uso, string>;

export const usoShape: Record<Uso, MarkerShape> = {
  INDUSTRIAL: "circle",
  AGRICOLA: "circle",
  "PUBLICO URBANO": "circle",
  SERVICIOS: "circle",
  PECUARIO: "circle",
  DOMESTICO: "circle",
  "DIFERENTES USOS": "circle",
  "POZOS RIEGO": "square",
  "POZOS DOMO": "square",
  "POZOS DOMESTICO": "square",
};

export const LABELS: { key: keyof RepdaEntry; label: string }[] = [
  { key: "titular", label: "Titular" },
  { key: "titulo", label: "Título" },
  { key: "uso", label: "Uso" },
  { key: "tipo", label: "Tipo" },
  { key: "volumen_m3_dia_limpio", label: "Vol. diario (m³/día)" },
  { key: "volumen_m3_anio_limpio", label: "Vol. anual (m³/año)" },
  { key: "fecha_registro", label: "Fecha de registro" },
  { key: "municipio_descarga", label: "Municipio descarga" },
  { key: "cuenca", label: "Cuenca" },
  { key: "procedencia", label: "Procedencia" },
  { key: "tipo_descarga", label: "Tipo descarga" },
  { key: "cuerpo_receptor", label: "Cuerpo receptor" },
  { key: "region_hidrologica", label: "Región hidrológica" },
];

// Genera el SVG para un marcador personalizado basado en la forma y color especificados, utilizado para crear los íconos de los puntos en el mapa interactivo
function shapeToSVG(shape: MarkerShape, color: string, size = 18): string {
  const h = size / 2;
  const sw = size <= 12 ? 1.5 : 2;
  switch (shape) {
    case "circle":
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${h}" cy="${h}" r="${h - sw}" fill="${color}" stroke="white" stroke-width="${sw}"/></svg>`;
    case "square":
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><rect x="${sw}" y="${sw}" width="${size - sw * 2}" height="${size - sw * 2}" fill="${color}" stroke="white" stroke-width="${sw}"/></svg>`;
    case "diamond":
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="${h},${sw} ${size - sw},${h} ${h},${size - sw} ${sw},${h}" fill="${color}" stroke="white" stroke-width="${sw}"/></svg>`;
    case "hexagon":
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="${h},${sw} ${size - sw},${Math.round(size * 0.28)} ${size - sw},${Math.round(size * 0.72)} ${h},${size - sw} ${sw},${Math.round(size * 0.72)} ${sw},${Math.round(size * 0.28)}" fill="${color}" stroke="white" stroke-width="${sw}"/></svg>`;
    case "pentagon":
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="${h},${sw} ${size - sw},${Math.round(size * 0.38)} ${Math.round(size * 0.8)},${size - sw} ${Math.round(size * 0.2)},${size - sw} ${sw},${Math.round(size * 0.38)}" fill="${color}" stroke="white" stroke-width="${sw}"/></svg>`;
    case "cross": {
      const t = Math.round(size * 0.3);
      const e = size - t;
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><path d="M${t} ${sw} H${e} V${t} H${size - sw} V${e} H${e} V${size - sw} H${t} V${e} H${sw} V${t} H${t} Z" fill="${color}" stroke="white" stroke-width="${sw * 0.6}" stroke-linejoin="round"/></svg>`;
    }
    case "octagon": {
      const cut = Math.round(size * 0.29);
      const far = size - cut;
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="${cut},${sw} ${far},${sw} ${size - sw},${cut} ${size - sw},${far} ${far},${size - sw} ${cut},${size - sw} ${sw},${far} ${sw},${cut}" fill="${color}" stroke="white" stroke-width="${sw}"/></svg>`;
    }
    case "star4":
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="${h},${sw} ${Math.round(h + size * 0.15)},${Math.round(h - size * 0.15)} ${size - sw},${h} ${Math.round(h + size * 0.15)},${Math.round(h + size * 0.15)} ${h},${size - sw} ${Math.round(h - size * 0.15)},${Math.round(h + size * 0.15)} ${sw},${h} ${Math.round(h - size * 0.15)},${Math.round(h - size * 0.15)}" fill="${color}" stroke="white" stroke-width="${sw}" stroke-linejoin="round"/></svg>`;
    case "ring":
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${h}" cy="${h}" r="${h - sw}" fill="${color}" stroke="white" stroke-width="${sw}"/><circle cx="${h}" cy="${h}" r="${Math.round(h * 0.42)}" fill="white"/></svg>`;
  }
}

// Genera un ícono de marcador personalizado para Leaflet utilizando la forma y color especificados
export function makeDivIcon(color: string, shape: MarkerShape, size: number = 18): DivIcon {
  const svg = shapeToSVG(shape, color, size);
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.45));line-height:0;">${svg}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// Componente para mostrar un punto en la leyenda, con su color y forma representativos
export const LeyendaDot = React.memo(function LeyendaDot({ color, shape }: { color: string; shape: MarkerShape }) {
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: shapeToSVG(shape, color, 13) }}
    />
  );
});

export const DEFAULT_INSTRUCCIONES: InstruccionPaso[] = [
  {
    numero: "1.",
    titulo: "Seleccionar capas",
    descripcion: "En la esquina superior izquierda del mapa, usa el icono de capas para elegir entre \"Visualizar todas al mismo tiempo\" o cualquiera de las capas disponibles:",
    items: ["Concesiones de extracción de agua subterránea, REPDA (2026)", "Permisos de descarga de aguas residuales, REPDA (2026)", "Mapa comunitario 1991"],
  },
  {
    numero: "2.",
    titulo: "Filtrar por uso",
    descripcion: "En la parte superior del mapa, usa los botones para filtrar por tipo de uso. Pasa el cursor sobre cada botón para ver una breve explicación.",
  },
  {
    numero: "3.",
    titulo: "Ver detalle",
    descripcion: "Haz clic en un punto del mapa para ver aquí su información detallada, como fecha de registro, volumen de extracción (m³ al año o día), municipio, cuerpo receptor y más.",
  },
];
