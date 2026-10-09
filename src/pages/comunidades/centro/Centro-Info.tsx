import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import brushLT from "@assets/brushStrokes/img10-3-1.png";
import brushRT from "@assets/brushStrokes/img10-2-4.png";
import brushLM from "@assets/brushStrokes/img9-1-7.png";

import { useCMSContent } from "../../../hooks/useCMSContent"; // Ajusta la ruta a tu hook si es necesario
import { juanacatlan, staCruzDeLasFlores, type CommunityDetail } from "./Centro-Data";
import CentroButtons from "./Centro-buttons";
import Carrousel from "../../../components/Carrousel";

interface SectionData {
    subtitulo?: string;
    subtitle?: string;
    texto?: string;
    data?: string;
    imagen?: string;
    img?: string;
    reverse?: boolean;
}

interface ResourceData {
    titulo?: string;
    title?: string;
    imagen?: string;
    img?: string;
    to: string;
}

interface CommunityContent {
    nombre?: string;
    title?: string;
    imagen_principal?: string;
    imgPrincipal?: string;
    secciones?: SectionData[];
    sections?: SectionData[];
    recursos?: ResourceData[];
    resourses?: ResourceData[];
    carrusel?: string[];
    carrousel?: string[];
}

const legacyComunidades: CommunityDetail[] = [
    juanacatlan,
    staCruzDeLasFlores
];

function getLegacyMatch(slug: string): CommunityContent | undefined {
    const match = legacyComunidades.find((e) => e.id === slug);
    if (!match) return undefined;

    return {
        nombre: match.title,
        imagen_principal: match.imgPrincipal,
        secciones: match.sections.map((s) => ({
            subtitulo: s.subtitle,
            texto: s.data,
            imagen: s.img,
            reverse: s.reverse,
        })),
        recursos: match.resourses.map((r) => ({
            titulo: r.title,
            imagen: r.img,
            to: r.to,
        })),
        carrusel: match.carrousel,
    };
}

export default function CentroInfo() {
    const { region = "centro", slug = "" } = useParams<{ region?: string; slug?: string }>();

    // Fallback con los datos locales legacy
    const fallbackData = useMemo(() => getLegacyMatch(slug), [slug]);
    const jsonUrl = `/cms-content/comunidades/${region}/${slug}.json`;

    // Consumo del hook useCMSContent
    const { data, loading } = useCMSContent<CommunityContent>(jsonUrl, fallbackData);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
            </div>
        );
    }

    if (!data) {
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

    // Normalización para soportar tanto la nomenclatura JSON del CMS como el fallback
    const nombre = data.nombre || data.title || "";
    const imagenPrincipal = data.imagen_principal || data.imgPrincipal || "";
    const carrusel = data.carrusel || data.carrousel;
    const secciones = (data.secciones || data.sections || []).map((s) => ({
        subtitulo: s.subtitulo ?? s.subtitle ?? "",
        texto: s.texto || s.data || "",
        imagen: s.imagen || s.img || "",
        reverse: Boolean(s.reverse),
    }));
    const recursos = (data.recursos || data.resourses || []).map((r) => ({
        titulo: r.titulo || r.title || "",
        imagen: r.imagen || r.img || "",
        to: r.to || "",
    }));

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
                                        {nombre}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="flex justify-center">
                            <div className="w-11/12 sm:w-10/12 md:w-9/12 lg:w-9/12 max-w-6xl">
                                {/* Hero / Galería principal */}
                                <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
                                    {carrusel && carrusel.length > 0 ? (
                                        <Carrousel
                                            images={carrusel}
                                            autoPlay
                                            intervalMs={5000}
                                            className="rounded-2xl"
                                            caption="Galería de comunidad"
                                        />
                                    ) : (
                                        <img
                                            src={imagenPrincipal}
                                            alt={`Paisaje de ${nombre}`}
                                            className="w-full h-48 sm:h-64 md:h-80 lg:h-[420px] object-cover shadow-lg"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    )}
                                </div>

                                {/* Secciones informativas */}
                                {secciones.map((section, key) => (
                                    <div
                                        key={key}
                                        className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 pt-10 sm:pt-14 lg:pt-24 items-stretch ${
                                            section.reverse ? "md:[&>*:first-child]:order-2" : ""
                                        }`}
                                    >
                                        {/* Texto */}
                                        <div>
                                            {section.subtitulo && (
                                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
                                                    {section.subtitulo}
                                                </h2>
                                            )}
                                            <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                                                {section.texto}
                                            </p>
                                        </div>

                                        {/* Imagen */}
                                        <figure className="relative overflow-hidden rounded-3xl shadow-xl">
                                            <img
                                                src={section.imagen}
                                                alt={section.subtitulo || nombre}
                                                className="w-full h-56 sm:h-96 object-cover transition-transform duration-500 hover:scale-[1.02]"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent" />
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Brushes decorativos */}
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

            {/* Botones de Recursos / Proyectos */}
            <section>
                {recursos.map((resource, key) => (
                    <CentroButtons
                        key={key}
                        title={resource.titulo}
                        image={resource.imagen}
                        to={resource.to}
                    />
                ))}
            </section>
        </div>
    );
}
