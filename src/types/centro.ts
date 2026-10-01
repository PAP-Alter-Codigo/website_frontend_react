export interface CMSRegion {
  slug: string;
  title: string;
  img: string;
  items: Array<{
    label: string;
    to: string;
  }>;
  reverse?: boolean;
}

export interface CMSMapaMetadata {
  slug: string;
  titulo: string;
  descripcion: string;
  centroPredeterminado?: [number, number];
  zoomPredeterminado?: number;
}
