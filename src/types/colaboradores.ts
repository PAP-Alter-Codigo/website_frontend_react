export interface CMSColaborador {
  slug: string;
  nombre: string;
  carrera: string;
  categoria: string;
  contacto?: string;
  imagen?: string;
}

export interface Periodo {
  name: string;
  data: CMSColaborador[];
}

export interface YearBlock {
  year: number;
  periodos: Periodo[];
}

export interface ColaboradoresCMSResponse {
  colaboradores?: YearBlock[];
}
