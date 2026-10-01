export interface CMSColaborador {
  slug: string;
  nombre: string;
  carrera: string;
  categoria: string;
  contacto?: string;
  imagen?: string; // Ruta estática (ej: "/cms-content/colaboradores/foto.jpg")
}
