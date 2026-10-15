export interface CMSAsesor {
  slug: string;
  name: string;
  degrees: string[];
  expertise: string;
  photoPath: string;
  contact?: string;
}

export interface AsesoresCMSResponse {
  asesores?: CMSAsesor[];
}
