

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"

import MapaInteractivoPososCombinados from "./Mapa-Interactivo-Pozos-Combinados"
import AppHeader from "../../../../../components/App-Header"
import MapaInteractivoHumedalAguasSub from "./Mapa-Interactivo-Humedal-AguasSub"

export default function MapaInteractivoPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <div className="px-16 py-8">
                <div className="text-3xl font-bold p-8">
                    Mapa comunidad 1991
                </div>
                <MapaInteractivoPososCombinados/>
            </div>
            <div className="px-16 py-8">
                <div className="text-3xl font-bold p-8">
                    Mapa aguas humedal y subterráneas 2020
                </div>
                <MapaInteractivoHumedalAguasSub/>
            </div>
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}