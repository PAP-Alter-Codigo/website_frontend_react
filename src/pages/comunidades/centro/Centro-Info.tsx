import brushLT from "@assets/brushStrokes/img10-3-1.png";
import brushRT from "@assets/brushStrokes/img10-2-4.png";
import brushLM from "@assets/brushStrokes/img9-1-7.png";
import { Link, useParams } from "react-router-dom";

import { juanacatlan, type CommunityDetail } from "./Centro-Data";
import CentroButtons from "./Centro-buttons";
import Carrousel from "../../../components/Carrousel";

const comunidades = [
    juanacatlan,
]

function getMatch(slug: String) {
    return comunidades.find((e: CommunityDetail) => {
        return e.id === slug;
    })
}

export default function CentroInfo() {
    const { slug = "" } = useParams<{ slug: string }>();

    const match = getMatch(slug)

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
        <div>
            <section>
                <div className="relative">
                    <div>
                        {/* Header título */}
                        <div className="py-8 sm:py-10 lg:py-12">
                            <div className="flex justify-center">
                                <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 max-w-6xl">
                                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-black pb-3 sm:pb-4">
                                        {match.title}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="flex justify-center">
                            <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-9/12 max-w-6xl">
                                {/* Hero responsivo */}
                                <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
                                    {/* <img
                                        src={match.imgPrincipal}
                                        alt={`Paisaje de ${match.title}`}
                                        className="w-full h-48 sm:h-64 md:h-80 lg:h-[420px] object-cover shadow-lg"
                                        loading="lazy"
                                        decoding="async"
                                    /> */}
                                    <Carrousel images={match.carrousel}
                                        autoPlay
                                        intervalMs={5000}
                                        className="rounded-2xl"
                                        caption="Galería de comunidad"
                                    />
                                </div>

                                {
                                    match.sections.map((section, key) => (
                                        <div key={key} className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 pt-10 sm:pt-14 lg:pt-24 items-stretch ${section.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                                            {/* Texto */}
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
                                                    {section.subtitle}
                                                </h2>
                                                <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                                                    {section.data}
                                                </p>
                                            </div>

                                            {/* Imagen */}
                                            <figure className="relative overflow-hidden rounded-3xl shadow-xl">
                                                <img
                                                    src={section.img}
                                                    className="w-full h-56 sm:h-72 md:h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
                                            </figure>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>

                    {/* Brushes decorativos: ocultos en móviles, visibles desde md */}
                    <div className="hidden md:block absolute top-6 left-0 -z-30 select-none">
                        <img className="max-w-[40vw] lg:max-w-[32vw]" src={brushLT} alt="" />
                    </div>
                    <div className="hidden md:block absolute top-24 right-0 -z-30 select-none">
                        <img className="max-w-[38vw] lg:max-w-[30vw]" src={brushRT} alt="" />
                    </div>
                    <div className="hidden md:block absolute top-[28%] left-0 -z-30 select-none">
                        <img className="max-w-[34vw] lg:max-w-[26vw]" src={brushLM} alt="" />
                    </div>
                </div>
            </section>
            <section>
                {match.resourses.map((resource, key) => (
                    <CentroButtons key={key} title={resource.title} image={resource.img} to={resource.to} />
                ))}
            </section>
            {/* <section>
                <div className="pt-12 flex justify-center">
                    <Carrousel images={match.carrousel}
                        autoPlay
                        intervalMs={5000}
                        className="rounded-2xl w-11/12"
                        caption="Galería de comunidad"
                    />
                </div>
            </section> */}
        </div>

    );
}
