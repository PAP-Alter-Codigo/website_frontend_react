// src/pages/comunidades/ComunidadPage.tsx
import { Link, useParams } from "react-router-dom";

export type RegionItem = { label: string; to: string };
export type Region = {
  title: string;
  img: string;         // URL/asset de la región
  items: RegionItem[]; // comunidades
  reverse?: boolean;
};

type Props = {
  regiones: Region[];
};

function getSlugFromTo(to: string) {
  const parts = to.split("/");
  return parts[parts.length - 1]?.trim().toLowerCase();
}

function getMatch(regiones: Region[], slug: String) {
  const region = regiones.find((e:Region) => {
    return e.title.toLowerCase() === slug;
  })
  return region
}

export default function ComunidadesDetailPage({ regiones }: Props) {
  const { slug = "" } = useParams<{ slug: string }>();

  const match = getMatch(regiones, slug)

  if (!match) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-4">Comunidad no encontrada</h1>
        <p className="text-gray-600 mb-6">
          La comunidad “{slug}” no existe en el catálogo.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2 hover:opacity-90"
        >
          Volver al inicio
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </section>
    );
  }

  return (
    <main className="relative">
      {/* Hero con imagen de región */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Imagen */}
          <figure className="relative overflow-hidden rounded-3xl shadow-xl">
            <img
              src={match.img}
              alt={`Región ${match.title}`}
              className="w-full h-56 sm:h-72 md:h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
          </figure>

          {/* Contenido */}
          <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight">
              <span className="bg-clip-text text-black">{match.title}</span>
            </h1>

            {/* Lista de comunidades de la región */}
            <ul className="mt-8 space-y-4">
              {match.items.map((c) => {
                const cSlug = getSlugFromTo(c.to);
                const isActive = cSlug === slug;
                return (
                  <li key={c.to}>
                    <Link
                      to={c.to}
                      className={`group flex items-center justify-between w-full rounded-full border px-5 py-4 shadow-sm transition focus:outline-none
                        ${isActive
                          ? "border-black bg-gray-100"
                          : "border-gray-200 bg-gray-50/70 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-sky-400"
                        }`}
                    >
                      <span className={`text-base sm:text-lg font-semibold ${isActive ? "text-black" : "text-gray-900"}`}>
                        {c.label}
                      </span>
                      <span
                        className={`flex items-center justify-center w-9 h-9 rounded-full bg-white shadow ring-1 ring-gray-200 transition-transform
                          ${isActive ? "" : "group-hover:translate-x-1"}`}
                        aria-hidden="true"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
