

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"

import MapaInteractivoComponent from "./Mapa-Interactivo-Component"
import AppHeader from "../../../../../components/App-Header"

export default function MapaInteractivoPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <div className="p-16">
                <MapaInteractivoComponent/>
            </div>
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}