import { useState } from "react";
import AppHeader from "../../components/App-Header";
import { researchItems } from "./Investigacion-Data";

import ResearchCard from "../../components/Research-Card";
import { ResearchTypeEnum } from "../../components/Research-Card";

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png";
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png";
import brushLT from "@assets/brushStrokes/img10-3-1.png";
import brushRT from "@assets/brushStrokes/img10-2-4.png";
import brushLM from "@assets/brushStrokes/img9-1-7.png";
import imgInvestigacion from "@assets/general/investigacion.webp";


type FilterType = "all" | typeof ResearchTypeEnum[keyof typeof ResearchTypeEnum];

const filterOptions: { value: FilterType; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: ResearchTypeEnum.Article, label: "Artículos" },
    { value: ResearchTypeEnum.Video, label: "Videos" },
    { value: ResearchTypeEnum.Infographic, label: "Infografías" },
    { value: ResearchTypeEnum.Book, label: "Libros" },
];

export default function InvestigacionPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredItems =
    activeFilter === "all" ? researchItems : researchItems.filter((item) => item.type === activeFilter);

  return (
    <>
        {/* Header Section with Background */}
        <div className="bgColor relative overflow-hidden">
            <AppHeader />
            {/* Content */}
            <div className="py-12 md:py-20 lg:py-40">
                <div className="flex justify-center px-4">
                    <div className="w-full md:w-9/12 text-white">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white pb-3 sm:pb-4 md:pb-5">
                            POLÍTICAS DE LOS CUIDADOS
                        </h1>
                        <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-white pt-2 sm:pt-3 md:pt-4 lg:pt-6 mb-2 sm:mb-3 md:mb-4">
                            Las luchas de las mujeres por la defensa del territorio en Jalisco.
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed">
                            Una aproximación desde la investigación vinculada.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />

        {/* Introduction Section */}
        <section className="relative isolate overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="flex justify-center px-4">
                <div className="w-full md:w-9/12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
                        {/* Text Content */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-5 md:mb-6">Objetivo de la Investigación</h2>
                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                                    Esta investigación se coordina desde el Centro Interdisciplinario para la Formación y Vinculación Social del ITESO,
                                    Universidad Jesuita de Guadalajara y es acreedora del Fondo de Apoyo a la Investigación del ITESO.
                                </p>
                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                                    El objetivo principal es describir cómo los cuidados interactúan con las luchas por la defensa
                                    del territorio en los casos de mujeres pertenecientes a diferentes agrupaciones en las 12 regiones del estado de Jalisco.
                                </p>
                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                                    Estas mujeres han construido estrategias para cuidar la vida como un proyecto personal y colectivo, lo que otorga un matiz
                                    profundamente político. La organización colectiva a la que pertenecen también aporta e influye en la producción de
                                    conocimientos, estrategias emocionales y prácticas de autonomía y autogestión que ellas generan.
                                </p>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="flex justify-center md:justify-end">
                            <div data-aos="fade-left" className="w-full md:w-auto">
                                <img
                                    src={imgInvestigacion}
                                    alt="Investigación Política de los Cuidados"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl rounded-3xl shadow-lg object-cover h-48 sm:h-56 md:h-80 lg:h-[450px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Brushes decorativos: ocultos en móviles, visibles desde md */}
            <div className="pointer-events-none hidden md:block absolute -top-2 left-[-4vw] -z-10 select-none">
                <img className="max-w-[30vw] lg:max-w-[24vw] opacity-90" src={brushLT} alt="" />
            </div>
            <div className="pointer-events-none hidden md:block absolute top-10 right-[-3vw] -z-10 select-none">
                <img className="max-w-[28vw] lg:max-w-[22vw] opacity-85" src={brushRT} alt="" />
            </div>
            <div className="pointer-events-none hidden md:block absolute top-[30%] left-0 -z-10 select-none">
                <img className="max-w-[20vw] lg:max-w-[18vw] opacity-80" src={brushLM} alt="" />
            </div>
        </section>

        {/* Research Hub Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
            <div className="flex justify-center px-4">
            <div className="w-full max-w-7xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4">
                Aquí podrás explorar sus resultados a través de distintos productos:
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-8 sm:mb-10 md:mb-12">
                Descubre los artículos científicos, materiales de divulgación, videos e infografías
                generados a partir de nuestro proceso investigativo.
                </p>

                {/* Filter Tabs */}
                <div className="mb-8 sm:mb-10 md:mb-12 flex flex-wrap gap-2 sm:gap-3">
                {filterOptions.map((option) => (
                    <button
                    key={option.value}
                    onClick={() => setActiveFilter(option.value)}
                    className={`group relative px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base rounded-full font-semibold border-2 transition-all duration-300 ease-out transform-gpu hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cello/50 focus-visible:ring-offset-2 ${
                        activeFilter === option.value
                        ? "bg-cello text-cello border-cello shadow-lg scale-105"
                        : "bg-white text-gray-700 border-gray-300 hover:border-cello hover:text-cello hover:bg-cello/5"
                    }`}
                    >
                    {option.label}
                    </button>
                ))}
                </div>

                {/* Research Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4 2xl:gap-8 items-stretch">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <ResearchCard key={item.id} item={item} dataAosDelay={index * 60} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                    <p className="text-lg">Aún no hay resultados disponibles para este filtro.</p>
                    </div>
                )}
                </div>
            </div>
            </div>
            
        </section>

        {/* Decorative Stroke */}
        <img className="w-full select-none" src={prtInf1} alt="decorative stroke" />
    </>
  );
}
