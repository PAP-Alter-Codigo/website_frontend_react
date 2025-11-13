import logoSrc from "@assets/comunidades/juanacatlan/SoñeConNutrias/logo-nutrias-1.png"
import img2 from "@assets/comunidades/juanacatlan/SoñeConNutrias/image-33.png"
import img3 from "@assets/comunidades/juanacatlan/SoñeConNutrias/image-35.png"

/* strokes */
import brushLT from "@assets/brushStrokes/img10-3-1.png";
import brushRT from "@assets/brushStrokes/img10-2-4.png";
import brushLM from "@assets/brushStrokes/img9-1-7.png";
import brushLT1 from "@assets/brushStrokes/img9-1-2.png";
import brushRT1 from "@assets/brushStrokes/03-graf-2.png";

export default function SoñeConNutriasInfo() {
    return (
        <>
            {/* Sección encabezado + intro */}
            <section className="pt-10 sm:pt-12 lg:pt-16">
                <div className="relative">
                    <div className="w-11/12 sm:w-10/12 md:w-10/12 lg:w-10/12 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
                            {/* Logo/imagen izquierda */}
                            <div className="flex items-center">
                                <img
                                    src={logoSrc}
                                    alt="Soñé con Nutrias - logo"
                                    className="w-full h-auto object-contain p-6"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            <div className="">
                            <div className="flex justify-center p-6 sm:p-8 lg:p-10">
                                <div className="w-full md:w-10/12">
                                <div className="flex justify-center md:justify-start">
                                    <div className="relative">
                                    {/* cinta degradada */}
                                    <div className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 shadow-lg ring-1 ring-black/5
                                                    bg-linear-to-r from-emerald-300 via-lime-300 to-amber-300">

                                        {/* texto del slogan */}
                                        <span className=" p-6
                                        text-center md:text-left
                                        text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight
                                        text-emerald-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]
                                        ">
                                        Un relato animado sobre la defensa del territorio
                                        </span>
                                    </div>
                                    </div>
                                </div>

                                {/* línea decorativa */}
                                <div data-aos="fade-right" className="mt-4 flex justify-center md:justify-start">
                                    <span className="h-1 w-24 sm:w-32 rounded-full bg-linear-to-r from-emerald-500 to-lime-500" />
                                </div>
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>
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
                <div className="flex justify-center" data-aos="fade-up">
                    <div className="w-9/12 text-lg sm:text-xl lg:text-2xl font-semibold text-black/90 leading-relaxed">
                        Soñé con Nutrias es un cortometraje animado que nace de la lucha y la memoria de la comunidad de Juanacatlán. A través de técnicas de stop motion, da vida a paisajes, rostros y símbolos que evocan la profunda conexión entre el territorio y quienes lo habitan. 
                        Creado dentro del Programa de Aplicación Profesional de Territorios del ITESO, y en colaboración con las y los defensores del territorio de Juanacatlán, este proyecto entrelaza arte y resistencia. Más que un relato visual, Soñé con Nutrias es una invitación a reflexionar sobre la conexión entre la tierra y quienes la habitan, recordándonos la importancia de cuidar, respetar y proteger nuestro entorno. 
                        <div className="mt-4 flex justify-center md:justify-start">
                            <span className="h-1 w-24 sm:w-32 rounded-full bg-linear-to-r from-blue-400 to-indigo-900" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero */}
            <section className="py-8 sm:py-10 lg:py-12">
                <div className="w-11/12 sm:w-10/12 md:w-10/12 lg:w-10/12 max-w-6xl mx-auto">
                    <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
                        <img
                            src={img2}
                            alt="Frame del cortometraje"
                            className="w-full h-56 sm:h-72 md:h-96 lg:h-[400px] object-cover shadow-lg"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
            </section>

            {/* Producción */}
            <section className="py-8 sm:py-10 lg:py-12">
                <div className="relative">

                    <div className="w-11/12 sm:w-10/12 md:w-10/12 lg:w-10/12 max-w-6xl mx-auto">
                        <div className="mb-6 sm:mb-8">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-4 sm:pb-6 text-center">
                                PRODUCCIÓN
                            </h3>
                            <p className="text-lg sm:text-xl lg:text-2xl text-black/90 leading-relaxed">
                                El cortometraje “Soñé con Nutrias” surge como parte del Proyecto de Aplicación Profesional (PAP)
                                TerritoRios, con el objetivo de visibilizar la lucha socioambiental de las mujeres de Juanacatlán,
                                una comunidad históricamente afectada por la contaminación del río Santiago. Esta obra no solo tiene
                                un fin narrativo o estético, sino que se construye desde el compromiso ético y político de dar voz a
                                quienes han sido silenciadas, especialmente por los medios tradicionales y por estructuras
                                institucionales.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center pt-8 lg:pt-12">
                            {/* Texto */}
                            <div className="">
                                <div className="flex justify-center p-6 sm:p-8 lg:p-10">
                                    <div className="">
                                        <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-4 sm:pb-6 text-center">
                                            CORTO
                                        </h4>
                                        <p className="text-lg sm:text-xl lg:text-2xl text-black/90 leading-relaxed">
                                            La producción fue realizada por un equipo multidisciplinario compuesto por estudiantes de diseño,
                                            animación, diseño sonoro, música y comunicación. Se trabajó de forma horizontal, manteniendo
                                            comunicación constante con los colectivos comunitarios de Juanacatlán para garantizar que el
                                            producto fuera respetuoso, relevante y coherente con sus vivencias y demandas. Este enfoque
                                            participativo permitió una producción consciente, donde cada decisión fue discutida en colectivo y
                                            siempre con una mirada sensible a las realidades del territorio.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Imagen derecha */}
                            <div className="flex items-center">
                                <img
                                    src={img3}
                                    alt="Proceso de producción"
                                    className="w-full h-auto object-cover rounded-2xl"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block absolute top-6 left-0 -z-30 select-none">
                        <img className="max-w-[40vw] lg:max-w-[32vw]" src={brushLT1} alt="" />
                    </div>
                    <div className="hidden md:block absolute top-15 right-0 -z-30 select-none">
                        <img className="max-w-[38vw] lg:max-w-[30vw]" src={brushRT1} alt="" />
                    </div>
                </div>
            </section>
        </>
    );
}
