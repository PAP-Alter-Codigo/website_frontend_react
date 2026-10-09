import { useMemo } from "react";
import { Link } from "react-router-dom";
import bursh1 from "@assets/brushStrokes/03-graf-1.png";
import bursh2 from "@assets/brushStrokes/03-graf-4.png";

import { useCMSContent } from "../../hooks/useCMSContent"; // Ajusta la ruta a tu hook si es necesario
import { regiones as legacyRegiones } from "./Comunidades-Data";

type Item = { label: string; to: string };

interface CMSRegionItem {
  label: string;
  slug?: string;
  to?: string;
}

interface CMSRegion {
  id?: string;
  title: string;
  imagen?: string;
  img?: string;
  reverse?: boolean;
  comunidades?: CMSRegionItem[];
  items?: Item[];
}

interface IndexContent {
  regiones: CMSRegion[];
}

type RegionBlockProps = {
  title: string;
  img: string;
  items: Item[];
  reverse?: boolean;
};

const IMG = {
  deco1: bursh1,
  deco2: bursh2,
};

function Chevron() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function RegionBlock({ title, img, items, reverse }: RegionBlockProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`grid gap-6 lg:gap-10 md:grid-cols-2 items-stretch ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        {/* Imagen */}
        <figure className="relative overflow-hidden rounded-3xl shadow-xl">
          <img
            src={img}
            alt={`Paisaje de la región ${title}`}
            className="w-full h-56 sm:h-72 md:h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
        </figure>

        {/* Tarjeta */}
        <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight">
            <span className="bg-clip-text text-black">{title.replace(/-/g, " ")}</span>
          </h2>

          <ul className="mt-8 space-y-4">
            {items.map((it) => (
              <li key={it.to}>
                <Link
                  to={it.to}
                  data-aos={reverse ? "fade-left" : "fade-right"}
                  className="group flex items-center justify-between w-full rounded-full border border-gray-200 bg-gray-50/70 px-4 py-3 sm:px-5 sm:py-4 shadow-sm transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{it.label}</span>
                  <span
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow ring-1 ring-gray-200 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <Chevron />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default function ComunidadesCatalogue() {
  // Objeto de respaldo con datos legacy
  const fallbackData = useMemo<IndexContent>(() => ({ regiones: legacyRegiones }), []);
  
  // Consumo del JSON del índice de regiones a través del hook useCMSContent
  const { data, loading } = useCMSContent<IndexContent>("/cms-content/comunidades/index.json", fallbackData);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  // Normalización de datos para soportar tanto la estructura del CMS como la del archivo local
  const formattedRegiones = (data?.regiones || []).map((r) => {
    const regionId = r.id || r.title.toLowerCase().replace(/\s+/g, "-");
    
    // Si viene desde index.json, mapea comunidades [{ label, slug }] a URLs relativas /comunidades/:region/:slug
    const items: Item[] = r.items
      ? r.items
      : (r.comunidades || []).map((c) => ({
          label: c.label,
          to: c.to || `/comunidades/${regionId}/${c.slug}`,
        }));

    return {
      title: r.title,
      img: r.imagen || r.img || "",
      items,
      reverse: Boolean(r.reverse),
    };
  });

  return (
    <section className="overflow-hidden">
      <div className="relative flex flex-1 justify-center pb-5">
        <div className="w-full">
          {/* Render dinámico de todas las regiones */}
          {formattedRegiones.map((r) => (
            <RegionBlock key={r.title} {...r} />
          ))}

          {/* Decorativos de fondo */}
          <div className="hidden md:block absolute top-0 left-0 -z-30">
            <img src={IMG.deco1} alt="decorativo 1" loading="lazy" />
          </div>
          <div className="hidden md:block absolute top-0 right-0 -z-30">
            <img src={IMG.deco2} alt="decorativo 2" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
