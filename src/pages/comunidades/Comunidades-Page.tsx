import AppHeader from "../../components/App-Header";
import ComunidadesCatalogue from "./Comunidades-Catalogue";

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import ComunidadesMap from "./Comunidades-Map";
import AppFooter from "../../components/App-Footer";

export default function ComunidadesPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
                <div className="py-16 md:py-28 lg:py-40">
                    <div className="flex flex-1 justify-center pb-5">
                        <div className="w-full max-w-4xl px-6 md:px-0 md:w-9/12">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white pb-5">COMUNIDADES</div>
                            <p className="text-white text-base sm:text-lg leading-relaxed">
                                Aquí encontrarás las comunidades en las que el equipo de Resonancias trabajó, junto con mujeres 
                                defensoras de las 12 regiones del estado Jalisco.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <ComunidadesMap />
            <ComunidadesCatalogue />
            <div className="relative flex items-center justify-center">
                <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
                <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                    <AppFooter />
                </div>
            </div>
        </>
    )
}