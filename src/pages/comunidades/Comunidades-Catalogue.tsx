// src/components/Regiones.tsx
import { Link } from "react-router-dom";

import img1 from "@assets/comunidades/img-8458-1.png"; 
import img2 from "@assets/comunidades/image-19.png"; 
import img3 from "@assets/comunidades/image-28.png"; 
import img4 from "@assets/comunidades/image-17.png"; 
import img5 from "@assets/comunidades/image-20.png"; 
import img6 from "@assets/comunidades/image-26.png"; 
import img7 from "@assets/comunidades/image-17-2.png"; 
import img8 from "@assets/comunidades/image-24.png"; 
import img9 from "@assets/comunidades/image-30.png"; 
import bursh1 from "@assets/brushStrokes/03-graf-1.png"; 
import bursh2 from "@assets/brushStrokes/03-graf-4.png"; 


const IMG = {
  centro: img1,
  lagunas: img2,
  valles: img3,
  cienega: img4,
  sureste: img5,
  sur: img6,
  sierraAmula: img7,
  costaSur: img8,
  costaOcc: img9,
  deco1: bursh1,
  deco2: bursh2,
};


type Item = { label: string; to: string };
type Region = {
  title: string;
  img: string;
  items: Item[];
  reverse?: boolean; // alterna imagen/tarjeta
};

const regiones: Region[] = [
  {
    title: "CENTRO",
    img: IMG.centro,
    items: [
      { label: "Juanacatlán", to: "/comunidades/centro/juanacatlan" },
      { label: "Santa Cruz de las Flores", to: "/comunidades/centro/santa-cruz-de-las-flores" },
      { label: "El Salto", to: "/comunidades/centro/el-salto" },
      { label: "Ixtlahuacán del Río", to: "/comunidades/centro/ixtlahuacan-del-rio" },
    ],
  },
  {
    title: "LAGUNAS",
    img: IMG.lagunas,
    items: [{ label: "Sayula", to: "/comunidades/sayula" }],
    reverse: true,
  },
  {
    title: "VALLES",
    img: IMG.valles,
    items: [
      { label: "Tequila", to: "/comunidades/tequila" },
      { label: "Tecolotlán", to: "/comunidades/tecolotlan" },
      { label: "Tala", to: "/comunidades/tala" },
      { label: "Sierra de Quila", to: "/comunidades/sierra-de-quila" },
    ],
  },
  {
    title: "CIÉNEGA",
    img: IMG.cienega,
    items: [
      { label: "La Noria", to: "/comunidades/la-noria" },
      { label: "Agua Caliente", to: "/comunidades/agua-caliente" },
    ],
    reverse: true,
  },
  {
    title: "SURESTE",
    img: IMG.sureste,
    items: [
      { label: "Santa Cruz de la Soledad", to: "/comunidades/santa-cruz-de-la-soledad" },
      { label: "Mezcala", to: "/comunidades/mezcala" },
      { label: "San Antonio Tlayacapan", to: "/comunidades/san-antonio-tlayacapan" },
    ],
  },
  {
    title: "SUR",
    img: IMG.sur,
    items: [
      { label: "Sierra de Manantlán", to: "/comunidades/sierra-de-manantlan" },
      { label: "Ciudad Guzmán", to: "/comunidades/ciudad-guzman" },
    ],
    reverse: true,
  },
  {
    title: "SIERRA DE AMULA",
    img: IMG.sierraAmula,
    items: [
      { label: "Autlán", to: "/comunidades/autlan" },
      { label: "El Grullo", to: "/comunidades/el-grullo" },
    ],
  },
  {
    title: "COSTA SUR",
    img: IMG.costaSur,
    items: [{ label: "Costa Careyes", to: "/comunidades/costa-careyes" }],
    reverse: true,
  },
  {
    title: "COSTA SIERRA-OCCIDENTAL",
    img: IMG.costaOcc,
    items: [{ label: "Puerto Vallarta", to: "/comunidades/puerto-vallarta" }],
  },
];

function Chevron() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function RegionBlock({ title, img, items, reverse }: Region) {
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
            <span className="bg-clip-text text-black">{title}</span>
          </h2>

          <ul className="mt-8 space-y-4">
            {items.map((it) => (
              <li key={it.to}>
                <Link
                  to={it.to}
                  data-aos={reverse ? "fade-left" : "fade-right"}
                  className="group flex items-center justify-between w-full rounded-full border border-gray-200 bg-gray-50/70 px-5 py-4 shadow-sm transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-900">{it.label}</span>
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow ring-1 ring-gray-200 transition-transform group-hover:translate-x-1"
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
  return (
    <section className="">
      <div className="relative flex flex-1 justify-center pb-5">
        <div className="w-full">
          {/* Render dinámico de todas las regiones */}
          {regiones.map((r) => (
            <RegionBlock key={r.title} {...r} />
          ))}

          {/* Decorativos de fondo */}
          <div className="absolute top-0 left-0 -z-30">
            <img src={IMG.deco1} alt="decorativo 1" loading="lazy" />
          </div>
          <div className="absolute top-0 right-0 -z-30">
            <img src={IMG.deco2} alt="decorativo 2" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
