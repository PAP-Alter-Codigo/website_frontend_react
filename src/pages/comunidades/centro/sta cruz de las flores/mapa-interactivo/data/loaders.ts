import type { Punto, Uso, RepdaEntry } from "./types";

let repdaCache: Record<string, RepdaEntry> | null = null;

const DATA_BASE_PATH = '/data/mapas/sta-cruz-de-las-flores';

// Carga y cacheo de datos REPDA para evitar múltiples fetches al acceder a la información detallada de los puntos en el mapa interactivo
async function loadRepda(): Promise<Record<string, RepdaEntry>> {
  if (repdaCache) return repdaCache;

  const metadataFiles = ["repda-santa-cruz.json", "repda-tlajomulco.json"];
  const merged: Record<string, RepdaEntry> = {};

  await Promise.all(
    metadataFiles.map(async (file) => {
      try {
        const res = await fetch(`${DATA_BASE_PATH}/metadata/${file}`);
        if (!res.ok) {
          console.error(`Failed to load metadata file ${file}: ${res.statusText}`);
          return;
        }
        const data = await res.json();
        Object.assign(merged, data);
      } catch (err) {
        console.error(`Error loading or parsing metadata file ${file}:`, err);
      }
    })
  );

  repdaCache = merged;
  return repdaCache;
}


// Inicializa los datos del mapa cargando los archivos GeoJSON y el REPDA, y construyendo la lista de puntos y la geometría del humedal para su visualización en el mapa interactivo
export async function initializeMapData(pozoMap: Record<string, Uso>): Promise<{
  puntos: Punto[];
  humedal: [number, number][];
}> {
  // Fetch GeoJSON files from public/data/geojson/
  const [humedalGeo, aguaGeoTlajomulco, aguaGeoStaCruz, pozosGeo] = await Promise.all([
    fetch(`${DATA_BASE_PATH}/geojson/humedal.geojson`).then(r => r.json()),
    fetch(`${DATA_BASE_PATH}/geojson/tlajomulco-aguas-subterraneas.geojson`).then(r => r.json()),
    fetch(`${DATA_BASE_PATH}/geojson/santa-cruz-aguas-subterraneas.geojson`).then(r => r.json()),
    fetch(`${DATA_BASE_PATH}/geojson/pozos-domestico-domo-riego.geojson`).then(r => r.json()),
  ]);

  const repda = await loadRepda();

  // Construye la geometría del humedal a partir del archivo GeoJSON correspondiente
  const humedalFeature = humedalGeo.features[0];
  const humedal: [number, number][] = humedalFeature
    ? ((humedalFeature.geometry.coordinates as number[][][])[0] || []).map(([lng, lat]) => [lat, lng] as [number, number])
    : [];

  // Construye la lista de puntos a partir de los archivos GeoJSON, asignando el uso correspondiente según el mapa de capas y la información del REPDA
  const allFeatures = [
    ...aguaGeoTlajomulco.features,
    ...aguaGeoStaCruz.features,
    ...pozosGeo.features,
  ];

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
    const uso = (repdaEntry?.uso ?? "SERVICIOS") as Uso;

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
