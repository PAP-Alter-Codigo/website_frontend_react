export const ResearchTypeEnum = {
  Article: "article",
  Video: "video",
  Infographic: "infographic",
  Book: "book",
} as const;

export type ResearchType = typeof ResearchTypeEnum[keyof typeof ResearchTypeEnum];

export interface CMSInvestigacionItem {
  slug: string;
  title: string;
  description: string;
  type: ResearchType;
  image: string;
  url: string;
  author?: string;
  date?: string;
}
