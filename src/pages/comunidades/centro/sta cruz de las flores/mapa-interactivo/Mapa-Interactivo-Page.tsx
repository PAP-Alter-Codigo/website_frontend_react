
import { useState } from "react"
import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import AppHeader from "../../../../../components/App-Header"
import MapaInteractivoHumedalAguasSub from "./Mapa-Interactivo-Humedal-AguasSub"
import MapaInteractivoStory from "./Mapa-Interactivo-Story"

// ── Bases de datos CSV ─────────────────────────────────────────────
const CSV_DESCARGAS = "/data/mapas/sta-cruz-de-las-flores/csv/descarga_aguas_residuales_2026.csv"
const CSV_EXTRACCIONES = "/data/mapas/sta-cruz-de-las-flores/csv/extraccion_agua_subterranea_2026.csv"
const CSV_POZOS_1991 = "/data/mapas/sta-cruz-de-las-flores/csv/pozos_1991.csv"

// ── Pequeños helpers de UI ─────────────────────────────────────────────────────

function SectionIcon({ children, bg }: { children: React.ReactNode; bg: string }) {
    return (
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${bg}`}>
            {children}
        </div>
    )
}

function Accordion({
    id,
    label,
    open,
    onToggle,
    children,
    colorClass = "bg-gray-50 hover:bg-gray-100",
    labelClass = "text-gray-800",
    arrowClass = "text-gray-500",
    borderClass = "border-gray-200",
}: {
    id: string
    label: string
    open: boolean
    onToggle: (id: string) => void
    children: React.ReactNode
    colorClass?: string
    labelClass?: string
    arrowClass?: string
    borderClass?: string
}) {
    return (
        <div className={`border ${borderClass} rounded-xl overflow-hidden`}>
            <button
                onClick={() => onToggle(id)}
                className={`w-full flex items-center justify-between px-6 py-4 ${colorClass} transition text-left`}
            >
                <span className={`font-semibold ${labelClass}`}>{label}</span>
                <svg
                    className={`w-5 h-5 ${arrowClass} transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && <div className="px-6 py-5 text-gray-700 leading-relaxed space-y-4 border-t border-gray-100">{children}</div>}
        </div>
    )
}

// ── Componente principal ───────────────────────────────────────────────────────

export default function MapaInteractivoPage() {
    const [open, setOpen] = useState<string | null>(null)
    const toggle = (id: string) => setOpen(prev => prev === id ? null : id)

    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>


            {/* ── HERO ─────────────────────────────────────────────────────────── */}
            {/* TODO: reemplazar el gradiente con una imagen: añadir backgroundImage:"url('...')", backgroundSize:"cover", backgroundPosition:"center" */}
            <section
                id="inicio"
                className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(160deg, #0c2d48 0%, #145a7d 40%, #1a6e4a 100%)" }}
            >
                <div className="absolute top-0 z-10">
                    <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
                </div>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto py-20">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-sky-300 mb-5 border border-sky-400/40 rounded-full px-4 py-1.5">
                        Pueblo originario Coca
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                        Santa Cruz de las Flores
                    </h1>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-sky-200 mb-6">
                        Memoria y defensa del agua
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
                        Un mapa comunitario para entender cómo el agua ha cambiado y cómo la comunidad ha defendido ese bien común a lo largo del tiempo.
                    </p>
                    <a
                        href="#mapa"
                        className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl"
                    >
                        Explorar el mapa
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </section>

            {/* ── MAPA ─────────────────────────────────────────────────────────── */}
            <section id="mapa" className="bg-slate-50 py-12 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <span className="text-sky-600 text-xs font-semibold uppercase tracking-widest">Herramienta interactiva</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-6">
                        Mapas y datos de concesiones y pozos de agua en el territorio
                    </h2>
                    <MapaInteractivoHumedalAguasSub />
                </div>
            </section>

            {/* ── ¿QUÉ ES ESTE MAPA? ───────────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <SectionIcon bg="bg-sky-100 text-sky-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </SectionIcon>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">¿Qué es este mapa?</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="lg:col-span-2 text-gray-700 leading-relaxed space-y-4 text-base">
                            <p>Este mapa muestra humedales y pozos de extracción presentes en el pueblo originario de Santa Cruz de las Flores. No es solo un mapa para ubicar puntos geográficos; también sirve como una herramienta que se conoce como "transecto social", para entender cómo se vive, se usa y se defiende el agua en el territorio. Aquí se integran dos formas distintas de conocer el agua: por un lado, el conocimiento que la comunidad tiene desde su convivencia natural ancestral con los bienes naturales comunes, y por otro, la información registrada por instituciones gubernamentales en la actualidad.</p>
                            <p>Esto permite conocer dónde está el agua, entender cómo se han sufrido las oleadas del despojo debido a los procesos productivos que han impactado el territorio y la vida de las personas con el tiempo, y de igual manera reconocer la importancia histórica y vital del agua como un bien común fundamental para la vida de la comunidad. Además, es una herramienta que busca hacer más accesible información que normalmente es técnica o difícil de obtener, para que cualquier persona pueda comprenderla en la interpretación de la realidad y utilizarla.</p>

                            <blockquote className="mt-6 border-l-4 border-sky-400 pl-4 text-gray-600 bg-sky-50 py-3 pr-4 rounded-r-lg not-italic">
                                <strong className="not-italic">Sobre el término "bien común":</strong> Distintas luchas comunitarias cuestionan el uso de conceptos como "recurso", empleados frecuentemente por instituciones gubernamentales y académicas; reducen el agua a una mercancía, separándola de su relación con la vida, el cuerpo y el territorio.
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ¿QUÉ HAY EN ESTE MAPA? ───────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-8 lg:px-16 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <SectionIcon bg="bg-indigo-100 text-indigo-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        </SectionIcon>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">¿Qué hay en este mapa?</h2>
                    </div>
                    <p className="text-gray-600 mb-8 leading-relaxed max-w-3xl">
                        El agua puede entenderse y representarse de diferentes maneras. Por ello, en este mapa se presentan <strong>tres capas</strong> sobre los pozos de agua, cada una con su propia fuente y enfoque.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-amber-200 flex flex-col">
                            <div className="bg-amber-500 px-6 py-5">
                                <span className="text-white/75 text-xs font-bold uppercase tracking-widest">Capa 1</span>
                                <h3 className="text-white text-lg font-bold mt-1 leading-snug">1991 — Memoria comunitaria</h3>
                            </div>
                            <div className="px-6 py-5 flex flex-col flex-1">
                                <p className="text-gray-600 text-sm leading-relaxed">Muestra el conocimiento basado en la vida cotidiana que la comunidad tiene en torno a la tendencia de extracción del agua. Este saber estructuró su lucha en defensa del agua subterránea.</p>
                                <div className="mt-auto pt-4 flex items-center gap-2 text-amber-700 text-sm font-medium">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Fuente: conocimiento comunitario
                                </div>
                                <a
                                    href={CSV_POZOS_1991}
                                    download
                                    className="mt-3 flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Descargar CSV
                                </a>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-sky-200 flex flex-col">
                            <div className="bg-sky-600 px-6 py-5">
                                <span className="text-white/75 text-xs font-bold uppercase tracking-widest">Capa 2</span>
                                <h3 className="text-white text-lg font-bold mt-1 leading-snug">2026 — Datos de extracción de agua subterránea REPDA</h3>
                            </div>
                            <div className="px-6 py-5 flex flex-col flex-1">
                                <p className="text-gray-600 text-sm leading-relaxed">Para obtener permisos de extracción de agua subterránea, las empresas, instituciones y personas deben solicitar una concesión a Conagua a través del Registro Público de Derechos del Agua o Repda. Estos registros son públicos y abiertos.</p>
                                <div className="mt-auto pt-4 flex items-center gap-2 text-sky-700 text-sm font-medium">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Fuente: CONAGUA — REPDA
                                </div>
                                <a
                                    href={CSV_EXTRACCIONES}
                                    download
                                    className="mt-3 flex items-center justify-center gap-2 w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Descargar CSV
                                </a>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-emerald-200 flex flex-col md:col-span-2 lg:col-span-1">
                            <div className="bg-emerald-600 px-6 py-5">
                                <span className="text-white/75 text-xs font-bold uppercase tracking-widest">Capa 3</span>
                                <h3 className="text-white text-lg font-bold mt-1 leading-snug">2026 — Datos de descarga de aguas residuales</h3>
                            </div>
                            <div className="px-6 py-5 flex flex-col flex-1">
                                <p className="text-gray-600 text-sm leading-relaxed">Las concesiones de Repda también registran permisos de descargas de aguas residuales, junto con su volumen total de descarga.</p>
                                <div className="mt-auto pt-4 flex items-center gap-2 text-emerald-700 text-sm font-medium">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Fuente: CONAGUA — REPDA
                                </div>
                                <a
                                    href={CSV_DESCARGAS}
                                    download
                                    className="mt-3 flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Descargar CSV
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ¿QUÉ SON LOS POZOS? ──────────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <SectionIcon bg="bg-teal-100 text-teal-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <circle cx="12" cy="12" r="5" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                            </svg>
                        </SectionIcon>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">¿Qué son los pozos de extracción de agua?</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 text-gray-700 leading-relaxed space-y-4 text-base">
                            <p>Los pozos son perforaciones hechas en la tierra para obtener agua del subsuelo. Esta agua forma parte de la <strong>Cuenca Lerma-Santiago-Pacífico</strong> y del <strong>acuífero San Isidro</strong>.</p>
                            <p>Hace apenas unas décadas, entre 1970 y 1990, la mayoría de las casas en Santa Cruz tenían su propio <em>pozo de soga</em> para cubrir sus necesidades diarias: cocinar, lavar, bañarse. También existían manantiales y lugares pantanosos en el Humedal de "La Playa" Santa Cruz-Totoltepec, donde el agua brotaba de forma natural.</p>
                            <p>Hoy en día estos pozos de soga han casi desaparecido y han surgido otros de mayor impacto, como los pozos industriales, conduciendo a un <strong>estrés hídrico</strong> en el territorio desde los años 70.</p>
                        </div>
                        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 flex flex-col gap-3">
                            <h4 className="font-bold text-teal-800 text-sm">Antes (1970–1990)</h4>
                            <ul className="space-y-2 text-sm text-teal-700">
                                {["Pozos de soga en cada hogar", "Manantiales naturales", "Humedal 'La Playa' extenso"].map(t => (
                                    <li key={t} className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <hr className="border-teal-200" />
                            <h4 className="font-bold text-red-700 text-sm">Hoy</h4>
                            <ul className="space-y-2 text-sm text-red-600">
                                {["Pozos industriales de alto impacto", "Estrés hídrico en el territorio", "Manantiales desaparecidos"].map(t => (
                                    <li key={t} className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CAPA 1991 ────────────────────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-8 lg:px-16 bg-amber-50">
                <div className="max-w-5xl mx-auto">
                    <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">CAPA 1991</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">El conocimiento de la comunidad</h2>

                    {/* Heliodoro */}
                    <div className="bg-white border-l-4 border-amber-400 rounded-r-xl px-6 py-5 mb-8 shadow-sm flex gap-4 items-start">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mt-0.5">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            El mapeo comunitario tuvo como referencia el caminar por el territorio del señor <strong>Heliodoro</strong>, perforador de pozos originario de la comunidad. Su experiencia basada en la observación, la memoria y el recorrido permitió identificar, junto con otros/as defensoras, los distintos tipos de pozos presentes en el territorio.
                        </p>
                    </div>

                    <h3 className="text-base font-semibold text-gray-700 mb-4">¿Qué significa cada punto?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {[
                            { dot: "bg-red-500", title: "Pozos profundos", desc: "Pozos hechos para obtener agua del subsuelo que llegan a capas más profundas de la tierra." },
                            { dot: "bg-orange-500", title: "Norias de riego", desc: "Formas más tradicionales de extraer agua, generalmente menos profundas. Se usaban principalmente para riego y actividades del campo." },
                            { dot: "bg-blue-500", title: "Pozos uso doméstico", desc: "Pozos utilizados para la reproducción cotidiana de la vida en los hogares: cocinar, bañarse, lavar." },
                            { dot: "bg-yellow-500", title: "Otros pozos (Domo Sur La Primavera)", desc: "Puntos de la expansión urbano-industrial identificados por la comunidad. Representan el conocimiento local sobre el despojo del territorio." },
                        ].map(item => (
                            <div key={item.title} className="bg-white border border-amber-100 rounded-xl p-4 shadow-sm flex items-start gap-3">
                                <span className={`mt-1.5 w-3 h-3 rounded-sm flex-shrink-0 ${item.dot}`} />
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Accordion
                        id="capa-1991" label="Leer texto completo sobre esta capa" open={open === "capa-1991"} onToggle={toggle}
                        colorClass="bg-amber-50 hover:bg-amber-100" labelClass="text-amber-800" arrowClass="text-amber-600" borderClass="border-amber-200"
                    >
                        <p>Este mapa representa la memoria del territorio, es decir, cómo las personas conocían y se relacionaban con el agua a partir de su experiencia cotidiana. El mapeo comunitario tuvo como referencia el caminar por el territorio del señor Heliodoro, que tenía como oficio ser perforador de pozos, originario de la comunidad, cuya experiencia basada en la observación, la memoria y el recorrido permitió identificar, junto con otros/as defensoras, los distintos tipos de pozos, como los de soga, agrícolas e incluso algunos de uso más intensivo, y desde luego los pozos comunitarios de consumo humano.</p>
                        <p>Los otros pozos (como Domo Sur La Primavera) también se pueden conocer como pozos de la expansión urbano-industrial de la Zona Metropolitana de Guadalajara. Estos son puntos identificados por la comunidad que pueden tener características específicas según sea autorizado por los gobiernos locales para el acceso, uso y aprovechamiento por agentes del capitalismo: urbano, industrial, agroindustrial del monocultivo de exportación (berries y jitomates). Representan el conocimiento local del territorio.</p>
                    </Accordion>
                </div>
            </section>

            {/* ── CAPA 2020 ────────────────────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-8 lg:px-16 bg-sky-50">
                <div className="max-w-5xl mx-auto">
                    <span className="inline-block bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">CAPAS 2026</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Información de CONAGUA</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed max-w-3xl text-sm">
                        Los pozos de esta capa forman parte del <strong>REPDA</strong> (Registro Público de Derechos de Agua). Sin embargo, este registro no siempre refleja lo que ocurre en el territorio por prácticas de corrupción y pozos clandestinos, y su acceso suele ser limitado para la comunidad.
                    </p>

                    <h3 className="text-base font-semibold text-gray-700 mb-4">¿Qué información tiene cada punto?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Título", desc: "Clave o código único que identifica el registro del pozo en el sistema de CONAGUA." },
                            { label: "Acuífero", desc: "Lugar de donde viene el agua. Un acuífero es un depósito natural debajo de la tierra. Muchos pozos pertenecen al acuífero San Isidro." },
                            { label: "Cuenca", desc: "Zona más grande donde circula el agua, conectando ríos, lluvias y escurrimientos." },
                            { label: "Región hidrológica", desc: "Organización del territorio según el agua que hay en él, agrupando varias cuencas." },
                            { label: "Uso del agua", desc: "Para qué se utiliza el agua: Agrícola, Doméstico, Público urbano, Pecuario, Industrial o Servicios." },
                            { label: "Vol. subterráneo (m³/año)", desc: "Cantidad de agua que se puede extraer en un año. A mayor número, mayor volumen extraído." },
                            { label: "Clave de acuífero", desc: "Número que usan las instituciones para identificar el acuífero en sus sistemas internos." },
                            { label: "Oficina central (OC)", desc: "Número administrativo interno que indica desde qué oficina se lleva el registro." },
                        ].map((item, i) => (
                            <div key={item.label} className="bg-white border border-sky-200 rounded-xl p-4 shadow-sm">
                                <span className="text-sky-400 text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                                <h4 className="font-bold text-gray-900 text-sm mt-1 mb-2">{item.label}</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tipos de uso */}
                    <div className="bg-white border border-sky-200 rounded-xl p-6 mb-6">
                        <h4 className="font-bold text-gray-800 text-sm mb-4">Tipos de uso del agua</h4>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { label: "Agrícola", desc: "Para cultivos", color: "bg-green-100 text-green-800" },
                                { label: "Doméstico", desc: "Para el hogar", color: "bg-blue-100 text-blue-800" },
                                { label: "Público urbano", desc: "Para viviendas", color: "bg-indigo-100 text-indigo-800" },
                                { label: "Pecuario", desc: "Para animales", color: "bg-yellow-100 text-yellow-800" },
                                { label: "Industrial", desc: "Para fábricas", color: "bg-orange-100 text-orange-800" },
                                { label: "Servicios", desc: "Para negocios", color: "bg-purple-100 text-purple-800" },
                            ].map(u => (
                                <div key={u.label} className={`flex flex-col px-3 py-2 rounded-lg ${u.color}`}>
                                    <span className="text-xs font-bold">{u.label}</span>
                                    <span className="text-xs opacity-75">{u.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Accordion
                        id="capa-2026" label="Leer texto completo sobre esta capa" open={open === "capa-2026"} onToggle={toggle}
                        colorClass="bg-sky-50 hover:bg-sky-100" labelClass="text-sky-800" arrowClass="text-sky-600" borderClass="border-sky-200"
                    >
                        <p>Los pozos que aparecen en esta capa (2026) forman parte de un registro oficial que lleva la Comisión Nacional del Agua (CONAGUA), conocido como REPDA (Registro Público de Derechos de Agua). En este sistema se inscriben los aprovechamientos de agua subterránea, donde se asigna a cada pozo una concesión que indica quién puede usar el agua, para qué se utiliza y cuánta cantidad se permite extraer.</p>
                        <p>Sin embargo, este registro funciona principalmente con fines administrativos y no siempre refleja de manera completa lo que ocurre en el territorio, porque persisten prácticas de corrupción relacionadas a los pozos clandestinos y el saqueo para su comercialización. Además, el acceso a esta información puede ser limitado o poco claro para la comunidad, lo que dificulta conocer con precisión quiénes son los usuarios, cómo se distribuye y aprovecha el agua en la práctica, y cómo se resuelve su tratamiento para su reutilización, por la falta de auditorías.</p>
                        <p>Esta información es más técnica y no siempre es fácil de consultar o entender, por lo que en este mapa se adaptó a un lenguaje más claro acompañado de la explicación de cada indicador, para que pueda ser útil para la comunidad, ya que en el sitio oficial no existe un acceso sencillo a estas explicaciones.</p>
                    </Accordion>
                </div>
            </section>

            {/* ── ¿QUÉ HA PASADO CON EL AGUA? ─────────────────────────────────── */}
            <MapaInteractivoStory />

            {/* ── LA IMPORTANCIA DE LA COMUNIDAD ───────────────────────────────── */}
            <section
                className="py-20 px-4 sm:px-8 lg:px-16"
                style={{ background: "linear-gradient(160deg, #0c2d48 0%, #1a5276 60%, #145a7d 100%)" }}
            >
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <SectionIcon bg="bg-white/15 text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </SectionIcon>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">La importancia de la comunidad</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {[
                            {
                                title: "Cinco décadas de lucha",
                                desc: "La defensa del agua en Santa Cruz no es algo reciente, sino una lucha que viene de generaciones atrás y continúa hasta hoy.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Pueblo de Agua",
                                desc: 'Santa Cruz de las Flores es uno de los pueblos "cocas" reconocidos como los "Pueblos de Agua", históricamente vinculado al agua como parte de su identidad.',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Pedagogía del agua",
                                desc: "Este mapa no solo muestra datos; recupera la memoria del territorio, hace accesible la información y apoya la defensa de un bien común fundamental para la vida.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                            },
                        ].map(c => (
                            <div key={c.title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                                <div className="text-sky-300 mb-3">{c.icon}</div>
                                <h3 className="text-white font-bold mb-2 text-sm">{c.title}</h3>
                                <p className="text-white/70 text-sm leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border border-white/20 rounded-xl overflow-hidden">
                        <button
                            onClick={() => toggle("comunidad")}
                            className="w-full flex items-center justify-between px-6 py-4 bg-white/10 hover:bg-white/15 transition text-left"
                        >
                            <span className="font-semibold text-white">Leer más sobre la lucha comunitaria</span>
                            <svg className={`w-5 h-5 text-white/70 transition-transform ${open === "comunidad" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {open === "comunidad" && (
                            <div className="px-6 py-5 text-white/80 leading-relaxed space-y-4 border-t border-white/10">
                                <p>La defensa del agua en Santa Cruz de las Flores no es algo reciente, sino una lucha que viene desde hace cinco décadas, que continúa hasta el día de hoy. Frente a los cambios en el territorio y a la falta de transparencia de la información por parte de las instituciones, la comunidad ha tenido que organizarse para entender lo que está pasando con el agua y buscar formas de cuidarla. Como señalan integrantes de la comunidad, Santa Cruz de las Flores es uno de los pueblos "cocas" reconocidos como los "Pueblos de Agua", un territorio históricamente vinculado al agua como parte del imaginario social e identidad de la vida comunitaria.</p>
                                <p>En este proceso de larga data, los pueblos han logrado organizarse de manera colectiva y en muchos casos, han sido las mujeres quienes han impulsado estas acciones de defensa y resistencia, poniendo en el centro de sus luchas la defensa de la vida digna, comunicando, organizándose, compartiendo información e investigando en torno a la defensa del territorio y protección de su vida colectiva.</p>
                                <p>Este mapa forma parte de ese esfuerzo del sentido y persistencia por la vida y dignidad, a manera de una pedagogía del agua ya que no solo muestra datos, sino que también busca recuperar la memoria del territorio, hacer accesible la información y apoyar a la comunidad en la defensa de un bien común fundamental para la vida. Al mismo tiempo, es un esfuerzo de la comunidad por generar sus propias herramientas para comprender lo que sucede, construyendo información y memoria colectiva que les permite identificar y hacer visible el despojo y la mercantilización del agua.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}
