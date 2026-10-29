// ==========================================
// ÍNDICE Y CATÁLOGO DE REGIONES (index.json)
// ==========================================

export interface RegionItem {
  label: string;
  slug?: string;
  to?: string;
}

export interface CMSRegion {
  id?: string;
  title: string;
  imagen?: string;
  img?: string; // Fallback legacy
  reverse?: boolean;
  comunidades?: RegionItem[];
  items?: RegionItem[]; // Fallback legacy
}

export interface RegionesIndexContent {
  regiones: CMSRegion[];
}

export interface RegionBlockProps {
  title: string;
  img: string;
  items: { label: string; to: string }[];
  reverse?: boolean;
}

// ==========================================
// CONTENIDO DETALLADO DE COMUNIDADES ([region]/[slug].json)
// ==========================================

export interface CommunitySection {
  subtitulo?: string;
  subtitle?: string;
  texto?: string;
  data?: string;
  imagen?: string;
  img?: string;
  reverse?: boolean;
}

export interface CommunityResource {
  titulo?: string;
  title?: string;
  tipo?: string;
  slug_recurso?: string;
  imagen?: string;
  img?: string;
  to: string;
}

export interface CommunityContent {
  nombre?: string;
  title?: string;
  imagen_principal?: string;
  imgPrincipal?: string;
  secciones?: CommunitySection[];
  sections?: CommunitySection[];
  recursos?: CommunityResource[];
  resourses?: CommunityResource[];
  carrusel?: string[];
  carrousel?: string[];
}
