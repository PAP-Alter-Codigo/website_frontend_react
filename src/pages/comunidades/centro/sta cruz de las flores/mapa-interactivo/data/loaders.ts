import L from "leaflet";
import type { Punto, Uso, RepdaEntry, CapasEstructura } from "./types";
import { colorByUso, usoShape, makeDivIcon } from "./constants";

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
  capas: CapasEstructura;
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

  const capas: CapasEstructura = {
    "Mapa de concesiones de descarga de aguas residuales": {
      layerGroup: L.layerGroup(),
      puntos: [],
      usos: new Set<Uso>(),
      filterType: "uso"
    },
    "Mapa de concesiones de extracción de agua subterránea": {
      layerGroup: L.layerGroup(),
      puntos: [],
      usos: new Set<Uso>(),
      filterType: "uso"
    },
    "Mapa comunitario de 1991": {
      layerGroup: L.layerGroup(),
      puntos: [],
      usos: new Set<Uso>(),
      filterType: "pozo"
    },
    "Humedal 2020": {
      layerGroup: L.layerGroup(),
      puntos: [],
      usos: new Set<Uso>(),
      filterType: "uso"
    }
  };

  // 1. Aguas subterráneas Tlajomulco (Mapa de concesiones de descarga de aguas residuales)
  const tlajomulcoPuntos: Punto[] = (aguaGeoTlajomulco.features || []).map((f: any) => {
    const coords = f.geometry.coordinates as number[];
    const repdaEntry = repda[f.properties.Name] ?? null;
    const uso = (repdaEntry?.uso ?? "SERVICIOS") as Uso;
    const marker = L.marker([coords[1], coords[0]], {
      icon: makeDivIcon(colorByUso[uso] ?? "#6b7280", usoShape[uso] ?? "circle")
    });
    marker.bindPopup(`
      <div class="text-center min-w-[120px]">
        <p class="font-bold text-sm">${f.properties.Name}</p>
        <p class="text-xs text-gray-500 mt-1">${uso}</p>
        <p class="text-xs text-blue-600 mt-1 cursor-pointer">Ver detalle →</p>
      </div>
    `);

    const punto: Punto = {
      name: f.properties.Name,
      lat: coords[1],
      lng: coords[0],
      uso,
      repda: repdaEntry,
      marker
    };

    capas["Mapa de concesiones de descarga de aguas residuales"].puntos.push(punto);
    capas["Mapa de concesiones de descarga de aguas residuales"].usos.add(uso);
    capas["Mapa de concesiones de descarga de aguas residuales"].layerGroup.addLayer(marker);
    return punto;
  });

  // 2. Aguas subterráneas Santa Cruz (Mapa de concesiones de extracción de agua subterránea)
  const santaCruzPuntos: Punto[] = (aguaGeoStaCruz.features || []).map((f: any) => {
    const coords = f.geometry.coordinates as number[];
    const repdaEntry = repda[f.properties.Name] ?? null;
    const uso = (repdaEntry?.uso ?? "SERVICIOS") as Uso;
    const marker = L.marker([coords[1], coords[0]], {
      icon: makeDivIcon(colorByUso[uso] ?? "#6b7280", usoShape[uso] ?? "circle")
    });
    marker.bindPopup(`
      <div class="text-center min-w-[120px]">
        <p class="font-bold text-sm">${f.properties.Name}</p>
        <p class="text-xs text-gray-500 mt-1">${uso}</p>
        <p class="text-xs text-blue-600 mt-1 cursor-pointer">Ver detalle →</p>
      </div>
    `);

    const punto: Punto = {
      name: f.properties.Name,
      lat: coords[1],
      lng: coords[0],
      uso,
      repda: repdaEntry,
      marker
    };

    capas["Mapa de concesiones de extracción de agua subterránea"].puntos.push(punto);
    capas["Mapa de concesiones de extracción de agua subterránea"].usos.add(uso);
    capas["Mapa de concesiones de extracción de agua subterránea"].layerGroup.addLayer(marker);
    return punto;
  });

  // 3. Pozos (Riego, Domo, Doméstico) [Mapa comunitario de 1991]
  const pozosPuntos: Punto[] = (pozosGeo.features || []).map((f: any) => {
    const coords = f.geometry.coordinates as number[];
    const pozoUso = pozoMap[f.properties.source_layer] || "POZOS RIEGO";
    const marker = L.marker([coords[1], coords[0]], {
      icon: makeDivIcon(colorByUso[pozoUso] ?? "#6b7280", usoShape[pozoUso] ?? "square")
    });
    marker.bindPopup(`
      <div class="text-center min-w-[120px]">
        <p class="font-bold text-sm">${f.properties.Name}</p>
        <p class="text-xs text-gray-500 mt-1">${pozoUso}</p>
        <p class="text-xs text-blue-600 mt-1 cursor-pointer">Ver detalle →</p>
      </div>
    `);

    const punto: Punto = {
      name: f.properties.Name,
      lat: coords[1],
      lng: coords[0],
      uso: pozoUso,
      repda: null,
      marker
    };

    capas["Mapa comunitario de 1991"].puntos.push(punto);
    capas["Mapa comunitario de 1991"].usos.add(pozoUso);
    capas["Mapa comunitario de 1991"].layerGroup.addLayer(marker);
    return punto;
  });

  // 4. Humedal 2020
  if (humedal.length > 0) {
    const polygon = L.polygon(humedal, {
      color: "#0ea5e9",
      fillColor: "#7dd3fc",
      fillOpacity: 0.35,
      weight: 2,
    });
    polygon.bindPopup(`
      <div class="text-center min-w-[120px]">
        <p class="font-bold text-base">Humedal 2020</p>
        <p class="text-xs text-gray-500 mt-1">
          Área de humedal documentada en 2020
        </p>
      </div>
    `);
    capas["Humedal 2020"].layerGroup.addLayer(polygon);
  }

  const puntos = [...tlajomulcoPuntos, ...santaCruzPuntos, ...pozosPuntos];

  return { capas, puntos, humedal };
}

// Hace fetch de datos REPDA para obtener la información detallada de un punto específico, utilizando el nombre del punto como clave de búsqueda
export async function getRepdaForPunto(name: string): Promise<RepdaEntry | null> {
  const repda = await loadRepda();
  return repda[name] ?? null;
}
