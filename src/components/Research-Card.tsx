import type { FC } from "react";


export const ResearchTypeEnum = {
  Article: "article",
  Video: "video",
  Infographic: "infographic",
  Book: "book",
} as const;

export interface ResearchItem {
  id: string; 
  title: string;
  description: string;
  type: typeof ResearchTypeEnum[keyof typeof ResearchTypeEnum];
  image: string;
  url: string;
  author?: string;
  date?: string;
}

interface ResearchCardProps {
  item: ResearchItem;
  dataAosDelay?: number;
}

const typeConfig: Record<typeof ResearchTypeEnum[keyof typeof ResearchTypeEnum], { label: string; color: string;}> = {
  article: { label: "Artículo", color: "bg-blue-100 text-blue-800" },
  video: { label: "Video", color: "bg-purple-100 text-purple-800" },
  infographic: { label: "Infografía", color: "bg-orange-100 text-orange-800"},
  book: { label: "Libro", color: "bg-red-100 text-red-800" },
};

const ResearchCard: FC<ResearchCardProps> = ({ item, dataAosDelay }) => {
  const config = typeConfig[item.type];

  return (
    <article
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
      className="group bg-white rounded-2xl sm:rounded-3xl shadow-md overflow-hidden h-full flex flex-col border border-transparent transition-[transform,box-shadow,border-color] duration-500 ease-out transform-gpu will-change-transform hover:-translate-y-1 hover:shadow-xl hover:border-cello/15 focus-within:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden bg-gray-200">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transform-gpu will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5">
        {/* Type Badge */}
        <div className="mb-2 sm:mb-3">
          <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${config.color}`}>
            {config.label}
          </span>
        </div>

        {/* Title - clamp to 2 lines, max 60 chars */}
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2 leading-tight">
          {item.title}
        </h3>

        {/* Description - max 150 chars */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-1 line-clamp-3">
          {item.description}
        </p>

        {/* Metadata (author/date) */}
        {(item.author || item.date) && (
          <div className="text-xs text-gray-500 mb-3 sm:mb-4 space-y-0.5">
            {item.author && <p className="line-clamp-1">Autor: {item.author}</p>}
            {item.date && <p>Fecha: {item.date}</p>}
          </div>
        )}

        {/* CTA Button */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-auto px-4 sm:px-6 py-1.5 sm:py-2 bg-cello text-cello border-2 border-cello rounded-full font-medium text-xs sm:text-sm text-center
                     transition-[transform,box-shadow,filter] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cello/40 focus-visible:ring-offset-2"
        >
          Ver más
        </a>
      </div>
    </article>
  );
};

export default ResearchCard;
export type { ResearchCardProps };
