import type { Punto, Uso, RepdaEntry } from "./types";

let repdaCache: Record<string, RepdaEntry> | null = null;

const geojsonModules = import.meta.glob<string>('./geojson/*.geojson', { query: '?raw', import: 'default', eager: true }); // Carga de archivos GeoJSON dentro de la carpera geojson

// Carga y cacheo de datos REPDA para evitar múltiples fetches al acceder a la información detallada de los puntos en el mapa interactivo
async function loadRepda(): Promise<Record<string, RepdaEntry>> {
  if (repdaCache) return repdaCache;
  const dataBasePath = () => {
    const path = new URL(import.meta.url).pathname;
    return path.substring(0, path.lastIndexOf('/'));
  };
  const basePath = dataBasePath();
  const res = await fetch(`${basePath}/metadata/repda.json`);
  if (!res.ok) throw new Error(`Failed to load REPDA: ${res.statusText}`);
  const data = await res.json();
  repdaCache = data as Record<string, RepdaEntry>;
  return repdaCache;
}

// Inicializa los datos del mapa cargando los archivos GeoJSON y el REPDA, y construyendo la lista de puntos y la geometría del humedal para su visualización en el mapa interactivo
export async function initializeMapData(pozoMap: Record<string, Uso>): Promise<{
  puntos: Punto[];
  humedal: [number, number][];
}> {
  const humedalGeo = JSON.parse(geojsonModules['./geojson/humedal.geojson']);

  const allGeoJsons = Object.entries(geojsonModules)
    .filter(([path]) => !path.includes('humedal'))
    .map(([, raw]) => JSON.parse(raw));

  const repda = await loadRepda();

  // Construye la geometría del humedal a partir del archivo GeoJSON correspondiente
  const humedalFeature = humedalGeo.features[0];
  const humedal: [number, number][] = humedalFeature
    ? ((humedalFeature.geometry.coordinates as number[][][])[0] || []).map(([lng, lat]) => [lat, lng] as [number, number])
    : [];

  // Construye la lista de puntos a partir de los archivos GeoJSON, asignando el uso correspondiente según el mapa de capas y la información del REPDA
  const allFeatures = allGeoJsons.flatMap((geo: any) => geo.features || []);

  const puntos: Punto[] = allFeatures.map((f: any) => {
    const coords = f.geometry.coordinates as number[];
    const pozoUso = pozoMap[f.properties.source_layer];

    if (pozoUso) {
      return {
        name: f.properties.Name,
        lat: coords[1],
        lng: coords[0],
        uso: pozoUso,
        repda: null,
      };
    }

    const repdaEntry = repda[f.properties.Name] ?? null;
    const uso = (repdaEntry?.USO ?? "SERVICIOS") as Uso;

    return {
      name: f.properties.Name,
      lat: coords[1],
      lng: coords[0],
      uso,
      repda: repdaEntry,
    };
  });

  return { puntos, humedal };
}

// Hace fetch de datos REPDA para obtener la información detallada de un punto específico, utilizando el nombre del punto como clave de búsqueda
export async function getRepdaForPunto(name: string): Promise<RepdaEntry | null> {
  const repda = await loadRepda();
  return repda[name] ?? null;
}
