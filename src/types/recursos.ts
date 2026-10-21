// ==========================================
// MURAL DE JUANACATLÁN
// ==========================================

export interface CMSMuralImageItem {
  src: string;
  alt?: string;
  caption?: string;
  href?: string;
}

export interface CMSMuralContent {
  titulo: string;
  parrafos: string[];
  pdf_titulo: string;
  pdf_descripcion: string;
  pdf_archivo: string;
  imagenes: CMSMuralImageItem[];
}

// ==========================================
// JUEGO DE XUCHITLÁN (SANTA CRUZ DE LAS FLORES)
// ==========================================

export interface CMSXuchitlanCardItem {
  titulo: string;
  caption: string;
  color: string;
  front: string;
  back: string;
}

export interface CMSXuchitlanContent {
  titulo: string;
  descripcion: string;
  pdf_titulo: string;
  pdf_descripcion: string;
  pdf_archivo: string;
  tablero_titulo: string;
  tablero_descripcion: string;
  tablero_imagen: string;
  cartas: CMSXuchitlanCardItem[];
}
