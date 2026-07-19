import L from "leaflet";
import type { Punto, Uso, RepdaEntry, CapasEstructura, DatasetConfig, MarkerShape } from "./types";
import { colorByUso, usoShape, makeDivIcon, POZO_SOURCE_LAYER_MAP } from "./constants";

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

export const DEFAULT_DATASETS: DatasetConfig[] = [
  {
    key: "Permisos de descarga de aguas residuales, REPDA (2026)",
    url: `${DATA_BASE_PATH}/geojson/tlajomulco-aguas-subterraneas.geojson`,
    filterType: "uso",
    kind: "puntos",
  },
  {
    key: "Concesiones de extracción de agua subterránea, REPDA (2026)",
    url: `${DATA_BASE_PATH}/geojson/santa-cruz-aguas-subterraneas.geojson`,
    filterType: "uso",
    kind: "puntos",
  },
  {
    key: "Mapa comunitario 1991",
    url: `${DATA_BASE_PATH}/geojson/pozos-domestico-domo-riego.geojson`,
    filterType: "pozo",
    kind: "puntos",
    pozoSourceLayerMap: POZO_SOURCE_LAYER_MAP,
  },
  {
    key: "Humedales",
    url: `${DATA_BASE_PATH}/geojson/humedal.geojson`,
    filterType: "uso",
    kind: "poligono",
  },
];

function parseVolumen(raw?: string): number | undefined {
  if (!raw) return undefined;
  const value = parseFloat(raw.replace(/,/g, ""));
  return Number.isNaN(value) ? undefined : value;
}

// Inicializa los datos del mapa cargando los archivos GeoJSON y el REPDA, y construyendo la lista de puntos y la geometría del humedal para su visualización en el mapa interactivo
export async function initializeMapData(
  datasets: DatasetConfig[] = DEFAULT_DATASETS,
  usoFiltroExacto?: Uso[],
  options?: {
    tamanoPorVolumen?: boolean;
    shapePorCapa?: Record<string, MarkerShape>;
    minIconSize?: number;
    maxIconSize?: number;
  }
): Promise<{
  capas: CapasEstructura;
  puntos: Punto[];
  humedal: [number, number][];
}> {
  // Asegura que la capa de Humedales esté siempre presente en todos los mapas interactivos
  const hasHumedal = datasets.some((d) => d.key === "Humedales");
  const humedalDataset = DEFAULT_DATASETS.find((d) => d.key === "Humedales");
  const effectiveDatasets = hasHumedal || !humedalDataset
    ? datasets
    : [...datasets, humedalDataset];

  // Carga los archivos GeoJSON en paralelo
  const geojsons = await Promise.all(
    effectiveDatasets.map(d => fetch(d.url).then(r => r.json()))
  );

  const repda = await loadRepda();

  const capas: CapasEstructura = {};
  let humedal: [number, number][] = [];
  const puntos: Punto[] = [];

  // Inicializa capas
  effectiveDatasets.forEach((d) => {
    capas[d.key] = {
      layerGroup: L.layerGroup(),
      puntos: [],
      usos: new Set<Uso>(),
      filterType: d.filterType,
    };
  });

  // Procesa cada dataset
  effectiveDatasets.forEach((dataset, index) => {
    const geojson = geojsons[index];

    if (dataset.kind === "poligono") {
      const feature = geojson.features?.[0];
      const coords: [number, number][] = feature
        ? ((feature.geometry.coordinates as number[][][])[0] || []).map(
          ([lng, lat]) => [lat, lng] as [number, number]
        )
        : [];
      if (coords.length > 0) {
        humedal = coords;
        const polygon = L.polygon(coords, {
          color: "#0ea5e9",
          fillColor: "#7dd3fc",
          fillOpacity: 0.35,
          weight: 2,
        });
        polygon.bindPopup(`
          <div class="text-center min-w-[120px]">
            <p class="font-bold text-base">${dataset.key}</p>
            <p class="text-xs text-gray-500 mt-1">
              Área de humedal documentada en 2020
            </p>
          </div>
        `);
        capas[dataset.key].layerGroup.addLayer(polygon);
      }
    } else if (dataset.kind === "puntos") {
      // Primera pasada: recolectar, filtrar y parsear los puntos candidatos
      interface Candidate {
        feature: any;
        coords: number[];
        uso: Uso;
        repdaEntry: RepdaEntry | null;
        volumenM3Anio?: number;
      }
      const candidates: Candidate[] = [];

      (geojson.features || []).forEach((f: any) => {
        const coords = f.geometry.coordinates as number[];
        const repdaEntry = repda[f.properties.Name] ?? null;

        let uso: Uso;
        if (dataset.pozoSourceLayerMap) {
          uso = (dataset.pozoSourceLayerMap[f.properties.source_layer] || "POZOS RIEGO") as Uso;
        } else {
          uso = (repdaEntry?.uso ?? "SERVICIOS") as Uso;
        }

        // Filtro exacto por uso si se proporciona
        if (usoFiltroExacto && !usoFiltroExacto.includes(uso)) {
          return;
        }

        const volumenM3Anio = repdaEntry ? parseVolumen(repdaEntry.volumen_m3_anio_limpio) : undefined;

        candidates.push({
          feature: f,
          coords,
          uso,
          repdaEntry,
          volumenM3Anio,
        });
      });

      // Calcular el volumen máximo para el dataset si se solicita escalado de tamaño
      let maxVol: number | undefined;
      if (options?.tamanoPorVolumen) {
        const volumes = candidates
          .map(c => c.volumenM3Anio)
          .filter((v): v is number => v !== undefined);
        if (volumes.length > 0) {
          maxVol = Math.max(...volumes);
        }
      }

      // Segunda pasada: crear marcadores/íconos y registrar puntos
      candidates.forEach(({ feature, coords, uso, repdaEntry, volumenM3Anio }) => {
        // Resolver forma
        const shape = options?.shapePorCapa?.[dataset.key] ?? usoShape[uso] ?? "circle";

        // Resolver tamaño
        let size = 18;
        if (options?.tamanoPorVolumen && volumenM3Anio !== undefined && maxVol !== undefined && maxVol > 0) {
          size = Math.round(11 + Math.sqrt(volumenM3Anio / maxVol) * 31);
        }

        const color = colorByUso[uso] ?? "#6b7280";
        const marker = L.marker([coords[1], coords[0]], {
          icon: makeDivIcon(color, shape, size),
        });

        const popupLabel = repdaEntry?.titular || feature.properties.Name;
        marker.bindPopup(`
          <div class="text-center min-w-[120px]">
            <p class="font-bold text-sm">${popupLabel}</p>
            <p class="text-xs text-gray-500 mt-1">${uso}</p>
            <p class="text-xs text-blue-600 mt-1 cursor-pointer">Ver detalle →</p>
          </div>
        `);

        const punto: Punto = {
          name: feature.properties.Name,
          lat: coords[1],
          lng: coords[0],
          uso,
          repda: repdaEntry,
          marker,
          capaKey: dataset.key,
          volumenM3Anio,
        };

        capas[dataset.key].puntos.push(punto);
        capas[dataset.key].usos.add(uso);
        capas[dataset.key].layerGroup.addLayer(marker);
        puntos.push(punto);
      });
    }
  });

  return { capas, puntos, humedal };
}

// Hace fetch de datos REPDA para obtener la información detallada de un punto específico, utilizando el nombre del punto como clave de búsqueda
export async function getRepdaForPunto(name: string): Promise<RepdaEntry | null> {
  const repda = await loadRepda();
  return repda[name] ?? null;
}
