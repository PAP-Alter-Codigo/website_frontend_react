import pozoImg from "@assets/comunidades/staCruz/mapa-interactivo/DSCF0307.jpg"
import lirioImg from "@assets/comunidades/staCruz/mapa-interactivo/DSCF0308.jpg"
import type { InstruccionPaso } from "./data/types"
// ── Interfaces ───────────────────────────────────────────────────────────────

export interface TableauEmbedData {
  title: string
  src: string
  color: string
  height?: number
}

export interface CalloutCardData {
  value: string
  label: string
  description?: string
  bgColor: string
  borderColor: string
  valueColor: string
}

export interface SnapshotData {
  label: string
  headerBg: string
  headerBorder: string
  dotColor: string
  labelColor: string
  image?: string
}

export interface LegalArticleData {
  number: string
  // HTML string — use dangerouslySetInnerHTML
  text: string
}

export interface SectionConfig {
  id: string
  background: string
  titleColor: string
  borderColor: string
}

export interface ReferenciasData {
  autores: string
  fecha: string
  titulo: string
  lugar: string
  url?: string
}

// ── Section configs ───────────────────────────────────────────────────────────

export const SECTION_CONFIGS: Record<string, SectionConfig> = {
  despojo: {
    id: "despojo",
    background: "#ffffff",
    titleColor: "#0c4a6e",
    borderColor: "#0284c7",
  },
  luchas: {
    id: "luchas",
    background: "#f8fafc",
    titleColor: "#b45309",
    borderColor: "#f59e0b",
  },
  inmobiliarias: {
    id: "inmobiliarias",
    background: "#ffffff",
    titleColor: "#5b21b6",
    borderColor: "#7c3aed",
  },
  industria: {
    id: "industria",
    background: "#f8fafc",
    titleColor: "#b91c1c",
    borderColor: "#ef4444",
  },
  despojoAgua: {
    id: "despojoAgua",
    background: "#ffffff",
    titleColor: "#0c4a6e",
    borderColor: "#0284c7",
  },
  metodologia: {
    id: "metodologia",
    background: "#f8fafc",
    titleColor: "#334155",
    borderColor: "#64748b",
  },
}

// ── Tableau embeds ────────────────────────────────────────────────────────────

export const TABLEAU_EMBEDS = {
  extraccion2005: {
    title: "Extracción de agua subterránea a 2005",
    src: "https://public.tableau.com/views/Extraccindeaguasubterraneaa2005/Tiempoareadescargasuso8?:embed=y&:showVizHome=no&:display_count=n",
    color: "#0284c7",
    height: 500,
  },
  extraccionTiempo: {
    title: "Extracción a lo largo del tiempo en Santa Cruz",
    src: "https://public.tableau.com/views/ExtraccinalolargodeltiempenSantaCruz/Dashboard11?:embed=y&:showVizHome=no&:display_count=n",
    color: "#f59e0b",
    height: 500,
  },
  serviciosTreemap: {
    title: "Servicios en Santa Cruz: descarga y extracción, tamaño por volumen",
    src: "https://public.tableau.com/views/VolumendeextraccinparausodeserviciosdeaguassubterraneasdelacuferoSanIsidro/treemapextraccion2?:embed=y&:showVizHome=no&:display_count=n",
    color: "#7c3aed",
    height: 500,
  },
  industriaBubbles: {
    title: "Industria en Santa Cruz: descarga y extracción por volumen",
    src: "https://public.tableau.com/views/ConcesionesdeextraccinydescargasindustrialesenSantaCruzbubble/bubbles?:embed=y&:showVizHome=no&:display_count=n",
    color: "#ef4444",
    height: 520,
  },
  volumenTiempo: {
    title: "Volumen de concesiones en el tiempo · Santa Cruz",
    src: "https://public.tableau.com/views/VolumendeconcesioneseneltiempoSantaCruz/GrficasTiempo?:embed=y&:showVizHome=no&:display_count=n",
    color: "#6366f1",
    height: 480,
  },
  tiempoPorTitular: {
    title: "Tiempo por titular · Descargas de agua",
    src: "https://public.tableau.com/views/graficotiempoportitular/Tiempoareadescargas2?:embed=y&:showVizHome=no&:display_count=n",
    color: "#6366f1",
    height: 480,
  },
  concesiones2021: {
    title: "Concesiones de extracción de aguas subterráneas después de 2021",
    src: "https://public.tableau.com/views/Concesionesparaextraccindeaguassubterraneasdespuesde2021/Dashboard13?:embed=y&:showVizHome=no&:display_count=n",
    color: "#0284c7",
    height: 520,
  },
  radialYPastelStzCruz: {
    title: "Radial y pastel · Santa Cruz",
    src: "https://public.tableau.com/views/RadialyPastelSantaCruz/Story6?:embed=y&:showVizHome=no&:display_count=n",
    color: "#0284c7",
    height: 520,
  }
} satisfies Record<string, TableauEmbedData>

// ── Callout cards ─────────────────────────────────────────────────────────────

export const INMOBILIARIAS_CALLOUTS: CalloutCardData[] = [
  {
    value: "62.57%",
    label: "Servicios",
    description: "Mayor uso registrado de concesiones de descargas · incluye cotos e inmobiliarias",
    bgColor: "#f5f3ff",
    borderColor: "#ddd6fe",
    valueColor: "#5b21b6",
  },
  {
    value: "17.17%",
    label: "Público urbano",
    description: "Incluye el condominio de Santa Anita",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    valueColor: "#1d4ed8",
  },
]

export const DESPOJO_CALLOUTS: CalloutCardData[] = [
  {
    value: "2,950,790 m³",
    label: "Déficit anual · Acuífero San Isidro (Conagua, 2024)",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    valueColor: "#dc2626",
  },
  {
    value: "44,460,000 m³",
    label: "Límite del acuífero · superado desde 2020",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    valueColor: "#dc2626",
  },
]

// ── Map snapshots ─────────────────────────────────────────────────────────────

export const MAP_SNAPSHOTS: Record<string, SnapshotData> = {
  mapa1991: {
    label: "Capa 1991 · Memoria comunitaria",
    headerBg: "#fef3c7",
    headerBorder: "#fde68a",
    dotColor: "#f59e0b",
    labelColor: "#92400e",
  },
  serviciosSantaCruz: {
    label: "Servicios en Santa Cruz, descarga y extracción, tamaño por volumen. Fuente: Repda.",
    headerBg: "#ede9fe",
    headerBorder: "#ddd6fe",
    dotColor: "#7c3aed",
    labelColor: "#5b21b6",
  },
  industriaSantaCruz: {
    label: "Industria en Santa Cruz, descarga y extracción, tamaño por volumen. Fuente: Repda.",
    headerBg: "#fef3c7",
    headerBorder: "#fde68a",
    dotColor: "#b45309",
    labelColor: "#b45309",
  },
} satisfies Record<string, SnapshotData>

// ── Image snapshots ─────────────────────────────────────────────────────────────

export const IMAGE_SNAPSHOTS: Record<string, SnapshotData> = {
  pozoZarco: {
    label: "Pozo de descargas a un lado del arroyo El Zarco",
    headerBg: "#fef3c7",
    headerBorder: "#fde68a",
    dotColor: "#b45309",
    labelColor: "#b45309",
    image: pozoImg,
  },
  zarcoLirio: {
    label: "Arroyo El Zarco cubierto de lirio",
    headerBg: "#fef3c7",
    headerBorder: "#fde68a",
    dotColor: "#b45309",
    labelColor: "#b45309",
    image: lirioImg,
  },
} satisfies Record<string, SnapshotData>

// ── Legal articles ────────────────────────────────────────────────────────────

export const LEGAL_ARTICLES: LegalArticleData[] = [
  {
    number: "Artículo 13 bis 4",
    text: '"Consultará con las personas usuarias y con las organizaciones de la sociedad, en el ámbito de los Consejos de Cuenca, y resolverá las posibles limitaciones temporales a los derechos de agua existentes para enfrentar situaciones de emergencia, escasez extrema, desequilibrio hidrológico, sobreexplotación, reserva, contaminación y riesgo o se comprometa la sustentabilidad de los ecosistemas vitales.  (Ley de Aguas Nacionales, 1992/2025)."',
  },
  {
    number: "Artículo 15",
    text: 'Habla de programas para atender problemas de "escasez o contaminación" y "corregir la sobreexplotación de aguas superficiales y subterráneas". Para el acuífero San Isidro, a pesar de la actual sobreexplotación, no existe dicho programa.',
  },
]

// ── Methodology paragraphs ────────────────────────────────────
export const METODOLOGIA_PARAGRAPHS: string[] = [
  "Para construir los mapas y las visualizaciones, se trabajó con información del Registro Público de Derechos de Agua (REPDA) de la Conagua. Aunque las bases del REPDA pueden descargarse directamente desde la plataforma, estas descargas no incluyen las coordenadas geográficas de cada registro. Por esa razón fue necesario crear un procedimiento adicional para obtener la ubicación de las concesiones.",
  "El primer paso consistió en adaptar códigos previos de web scraping que ya había desarrollado para consultar el REPDA. Estos scripts fueron elaborados en lenguaje de programación Python, utilizando Selenium y otras herramientas de automatización, y se modificaron específicamente para descargar las coordenadas asociadas a dos conjuntos de registros: las concesiones de extracción de agua subterránea del acuífero San Isidro y las concesiones de descargas de aguas residuales en Tlajomulco.",
  "Una vez corrido el código y realizado el proceso de descarga de las bases de datos con las coordenadas, estas fueron modificadas. La descarga inicial de coordenadas las entrega en grados, por lo cual se utilizó OpenRefine para convertir los grados a decimales usando códigos y expresiones de Grell, o Google Refine Expression Language, el lenguaje nativo de OpenRefine para interactuar y transformar datos.",
  "Después, se descargaron las bases generales del REPDA para ambos tipos de concesión: extracción de agua subterránea y descargas de aguas residuales. Estas bases no contenían coordenadas, por lo que fueron trabajadas por separado. La limpieza se realizó en OpenRefine, un software de código abierto diseñado para trabajar con bases de datos. En este proceso se eliminaron columnas que no eran útiles para el análisis, se estandarizaron los nombres de campos, se corrigieron espacios iniciales y finales, y se revisaron titulares que aparecían como distintos por diferencias menores, como dobles espacios o variaciones de escritura.",
  "También se armonizaron las columnas de volumen. Para ello, se limpiaron y normalizaron los valores de volumen anual y volumen diario utilizando expresiones y transformaciones en OpenRefine, basadas en códigos de limpieza de Grell. Esto permitió tener campos comparables para analizar tanto volúmenes en metros cúbicos por año como en metros cúbicos por día.",
  "Posteriormente, las bases limpias del REPDA se unieron con las bases de coordenadas obtenidas mediante scraping. Esta unión permitió construir dos bases georreferenciadas: una para las concesiones de extracción de agua subterránea y otra para las concesiones de descargas de aguas residuales.",
  "Para los mapas interactivos se utilizaron las bases georreferenciadas. La visualización cartográfica se construyó con Leaflet, una librería de JavaScript para mapas interactivos. En los mapas, los puntos se diferenciaron por tipo de concesión y por uso del agua, y su tamaño se escaló de acuerdo con el volumen registrado en metros cúbicos por año. También se incorporó la capa del humedal La Playa de Santa Cruz, documentado en 2020 para contextualizar espacialmente las concesiones respecto al territorio y las zonas de humedal.",
  "Para las gráficas se utilizaron las bases limpias sin coordenadas, ya que el objetivo era analizar distribución, concentración, usos, titulares y evolución de los volúmenes concesionados o registrados. Estas visualizaciones se desarrollaron en Tableau, un software de análisis y visualización de datos.",
  "Para las visualizaciones, se generaron diferentes gráficos, como gráficos de pastel, mapas de árbol, de burbujas radial y de área a través del tiempo, cada uno con la intención de transmitir la información de forma que permitiera distintas lecturas. Los gráficos de pastel, radial y de árbol sirven para poder dimensionar la magnitud del volumen de descargas o de extracción y contrastarla directamente contra otros usos u otros titulares. De igual forma, las gráficas de burbujas permiten identificar de forma rápida a las empresas con mayor magnitud de volumen de extracción o descarga.",
  "Las gráficas que muestran los cambios a través del tiempo evidencian los picos donde el otorgamiento de concesiones y el volumen de extracción o descarga aumentaron. Dividirlas por uso y por empresa permite identificar de forma rápida a qué situaciones correspondían estos picos.",
  "Se realizaron entrevistas a los pobladores en el Valle de Xuchitlán y de forma virtual, con las cuales se enriqueció el contexto de las gráficas y la línea temporal. Se realizó una investigación con documentación archivada y compilada por las integrantes del Comité de Agua y Vida, que sirvió para guiar los ejes de la investigación. Parte de este archivo contenía el mapa de 1991, el cual se implementó en la capa del mapa Leaflet."
]

// ── References list ───────────────────────────────────────────────────────────
export const REFERENCIAS: ReferenciasData[] = [
  {
    autores: "Comisión Estatal de Derechos Humanos Jalisco",
    fecha: "2021, 30 de junio",
    titulo: "Pronunciamiento 15/2021: Pronunciamiento para atender el corredor industrial de Santa Cruz de las Flores, en Tlajomulco de Zúñiga, con una perspectiva desde los estándares internacionales e interamericanos de derechos humanos y empresas",
    lugar: "",
    url: "https://historico.cedhj.org.mx/recomendaciones/pronunciamientos/2021/Pronunciamiento%2015-2021.pdf"
  },
  {
    autores: "Habitantes de Santa Cruz de las Flores denuncian contaminación ante Profepa",
    fecha: "2019, 6 de agosto",
    titulo: "",
    lugar: "El Occidental",
    url: "https://oem.com.mx/eloccidental/local/habitantes-de-santa-cruz-de-las-flores-denuncian-contaminacion-ante-profepa-23991331"
  },
  {
    autores: "Secretaría de Planeación y Participación Ciudadana",
    fecha: "2024",
    titulo: "Afectaciones a la salud por la contaminación del río Santiago",
    lugar: "Gobierno del Estado de Jalisco",
    url: "https://evalua.jalisco.gob.mx/wp-content/uploads/2024/06/Afectaciones_a_la_Salud_Rio_Santiago.pdf"
  },
  {
    autores: "Ley de Aguas Nacionales, Diario Oficial de la Federación [DOF]",
    fecha: "1 de diciembre de 1992, última reforma 11 de diciembre de 2025 (México)",
    titulo: "",
    lugar: "",
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LAN.pdf"
  }
]

export const INSTRUCCIONES_TAMANO_VOLUMEN: InstruccionPaso[] = [
  {
    numero: "1.",
    titulo: "Capas mostradas",
    descripcion:
      "Este mapa muestra las tres capas al mismo tiempo: extracción de agua subterránea, descargas de aguas residuales y el humedal La Playa.",
  },
  {
    numero: "2.",
    titulo: "Círculo y cuadrado",
    descripcion:
      "El círculo representa puntos de extracción de agua subterránea y el cuadrado representa puntos de descarga de aguas residuales.",
  },
  {
    numero: "3.",
    titulo: "Tamaño por volumen",
    descripcion:
      "El tamaño de cada punto está determinado por el volumen de extracción o descarga en metros cúbicos al año: entre más grande el punto, mayor el volumen.",
  },
  {
    numero: "4.",
    titulo: "Ver detalle",
    descripcion: "Haz clic en un punto para ver su información detallada.",
  },
]