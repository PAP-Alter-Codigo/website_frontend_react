export interface CMSCommunitySection {
  subtitle?: string;
  img: string;
  data: string;
  reverse?: boolean;
}

export interface CMSCommunityResource {
  title: string;
  img: string;
  to: string;
}

export interface CMSComunidad {
  slug: string;
  title: string;
  imgPrincipal: string;
  sections: CMSCommunitySection[];
  resources: CMSCommunityResource[];
  carrousel?: string[];
}
