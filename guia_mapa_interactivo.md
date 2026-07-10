# 🗺️ Guía del Componente: Mapa Interactivo (`MapaInteractivoHumedalAguasSub`)

El componente principal del mapa interactivo está diseñado para ser dinámico y altamente configurable, permitiendo su reutilización con diferentes conjuntos de datos geográficos (GeoJSON), metadatos de pozos (REPDA), coordenadas y configuraciones visuales.

## 📌 Ubicación de Archivos
* **Componente React principal:** `src/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/Mapa-Interactivo-Humedal-AguasSub.tsx`
* **Cargadores de datos:** `src/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/data/loaders.ts`
* **Definición de Tipos (TypeScript):** `src/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/data/types.ts`
* **Constantes visuales y estilos:** `src/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/data/constants.tsx`

---

## ⚙️ Propiedades del Componente (Props)

El componente `<MapaInteractivoHumedalAguasSub />` acepta las siguientes propiedades opcionales a través de la interfaz `MapaInteractivoProps`:

| Propiedad | Tipo | Valor por defecto | Descripción |
| --- | --- | --- | --- |
| `datasets` | `DatasetConfig[]` | `DEFAULT_DATASETS` | Lista de capas de datos (GeoJSON) a cargar en el mapa. |
| `usoFiltroExacto` | `Uso[]` | `undefined` | Si se especifica, solo cargará los puntos cuyo uso coincida exactamente (ej. `["SERVICIOS"]`). |
| `showFiltros` | `boolean` | `false` | Si se especifica, se mostrarán los filtros de búsqueda por uso. |
| `tamanoPorVolumen` | `boolean` | `false` | Activa el escalado dinámico del tamaño de los marcadores basado en su volumen anual de extracción/descarga. |
| `shapePorCapa` | `Record<string, MarkerShape>` | `undefined` | Permite asignar una forma fija de marcador por capa (ej. círculo para extracción, cuadrado para descarga). |
| `minIconSize` | `number` | `12` | Tamaño mínimo en píxeles del marcador para los puntos con menor volumen. |
| `maxIconSize` | `number` | `42` | Tamaño máximo en píxeles del marcador para los puntos con mayor volumen. |
| `center` | `[number, number]` | `[20.476, -103.506]` | Coordenadas de latitud y longitud en las que se centra el mapa al inicializar. |
| `zoom` | `number` | `12` | Nivel de zoom inicial del mapa. |
| `lazy` | `boolean` | `false` | Activa la carga diferida. Si es `true`, el mapa no se monta ni hace peticiones hasta que esté cerca de aparecer en pantalla. |
| `instrucciones` | `InstruccionPaso[]` | `undefined` | Si se especifica, se mostrarán las instrucciones del mapa. |

---

## 🛠️ Carga y Procesamiento de Datos (`loaders.ts`)

La lógica de carga de datos separa el consumo masivo de coordenadas de la información detallada (REPDA) para garantizar un alto rendimiento.

### 1. `initializeMapData(datasets, usoFiltroExacto, options)`
* Hace peticiones HTTP en paralelo para descargar los archivos GeoJSON definidos en `datasets`.
* Realiza la precarga del diccionario de metadatos REPDA (haciendo fetch una sola vez y guardándolo en un caché en memoria local, `repdaCache`).
* Itera sobre las geometrías:
  * Si es un **polígono** (como un humedal), crea un polígono Leaflet con estilos personalizados y popup.
  * Si es un **punto** (un pozo o descarga), determina su tipo de uso (`Uso`), busca sus metadatos detallados en el diccionario REPDA, calcula su escala de tamaño en base al volumen anual de metros cúbicos y genera un marcador con un SVG interactivo en formato Leaflet `DivIcon`.
* Retorna un objeto con la estructura de capas de Leaflet (`CapasEstructura`), la lista cruda de puntos procesados y las coordenadas del humedal.

### 2. `getRepdaForPunto(name)`
* Obtiene de forma asíncrona la entrada del registro REPDA asociada a un pozo específico a través de su nombre único (`Name`).
* Se utiliza para cargar bajo demanda (lazy-loading) los detalles del pozo seleccionado cuando el usuario hace clic sobre un marcador, evitando sobrecargar la memoria al renderizar el mapa por primera vez.

---

## 🏷️ Tipos de Datos Clave (`types.ts`)

### `DatasetConfig`
Define el origen y comportamiento de cada capa del mapa:
```typescript
export interface DatasetConfig {
  key: string;                    // Nombre de la capa a mostrar en la UI
  url: string;                    // Ruta relativa al archivo .geojson en /public/
  filterType: "uso" | "pozo";     // Tipo de filtrado (por uso de agua o categoría de pozo de 1991)
  kind: "puntos" | "poligono";    // Tipo de geometría
  pozoSourceLayerMap?: Record<string, Uso>; // Mapeo especial para capas de pozos antiguos sin REPDA
}
```

### `Uso` (Categorías del Agua)
Las categorías válidas de uso del agua en la base de datos son:
`INDUSTRIAL` | `AGRICOLA` | `PUBLICO URBANO` | `SERVICIOS` | `PECUARIO` | `DOMESTICO` | `DIFERENTES USOS` | `POZOS RIEGO` | `POZOS DOMO` | `POZOS DOMESTICO`.

### `MarkerShape` (Formas de Icono Disponibles)
Formas SVG generadas dinámicamente:
`circle` | `square` | `diamond` | `hexagon` | `pentagon` | `cross` | `octagon` | `star4` | `ring`.

---

## 🚀 Ejemplos de Uso y Reutilización

### Ejemplo 1: Uso básico por defecto (Caso Santa Cruz de las Flores)
Carga el mapa con la configuración por defecto de 3 capas, centrado en Santa Cruz y con iconos fijos de 18px:
```tsx
import MapaInteractivo from "@/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/Mapa-Interactivo-Humedal-AguasSub";

export default function MiPagina() {
  return (
    <div className="py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mapa del Territorio</h2>
      <MapaInteractivo />
    </div>
  );
}
```

### Ejemplo 2: Mapa de otra Comunidad (ej. Juanacatlán)
Supongamos que subiste archivos GeoJSON y metadatos JSON de Juanacatlán a `public/data/mapas/juanacatlan/`. Puedes reutilizar el componente pasándole las nuevas rutas, el centro y zoom:
```tsx
import MapaInteractivo from "@/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/Mapa-Interactivo-Humedal-AguasSub";
import type { DatasetConfig } from "@/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/data/types";

const DATASETS_JUANACATLAN: DatasetConfig[] = [
  {
    key: "Extracción Juanacatlán",
    url: "/data/mapas/juanacatlan/geojson/juanacatlan-extracciones.geojson",
    filterType: "uso",
    kind: "puntos",
  },
  {
    key: "Zonas Protegidas",
    url: "/data/mapas/juanacatlan/geojson/areas-verdes.geojson",
    filterType: "uso",
    kind: "poligono",
  }
];

export default function JuanacatlanMapa() {
  return (
    <MapaInteractivo 
      datasets={DATASETS_JUANACATLAN}
      center={[20.510, -103.125]} // Coordenadas de Juanacatlán
      zoom={13}
      lazy={true} // Se cargará cuando el usuario haga scroll hasta el mapa
    />
  );
}
```

### Ejemplo 3: Escalar iconos por volumen y personalizar formas
Muestra los marcadores escalando su tamaño según la cantidad de agua concesionada (de 12px a 40px) y asocia formas distintas a cada capa:
```tsx
import MapaInteractivo from "@/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/Mapa-Interactivo-Humedal-AguasSub";

export default function MapaAvanzado() {
  return (
    <MapaInteractivo 
      tamanoPorVolumen={true}
      minIconSize={14}
      maxIconSize={38}
      shapePorCapa={{
        "Descargas de aguas residuales": "diamond", // Descargas se verán como rombos
        "Extracción de agua subterránea": "circle",   // Extracciones se verán como círculos
        "1991": "square"                              // Pozos antiguos se verán como cuadrados
      }}
    />
  );
}
```

### Ejemplo 4: Filtrado estricto por uso en la carga inicial
Si deseas presentar un mapa enfocado únicamente en la problemática industrial, puedes filtrar los usos permitidos:
```tsx
import MapaInteractivo from "@/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/Mapa-Interactivo-Humedal-AguasSub";

export default function MapaIndustrial() {
  return (
    <MapaInteractivo 
      usoFiltroExacto={["INDUSTRIAL", "SERVICIOS"]}
      zoom={11}
    />
  );
}
```
