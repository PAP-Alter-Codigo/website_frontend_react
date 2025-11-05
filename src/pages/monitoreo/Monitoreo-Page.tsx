import AppHeader from "../../components/App-Header";

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import monitoreoSS from "@assets/general/monitoreo.png"



export default function MonitoreoPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
                <div className="py-40">
                    <div className="flex flex-1 justify-center pb-5">
                        <div className="w-9/12">
                            <div className="text-4xl font-extrabold text-white pb-5">HERRAMIENTA DE MONITOREO</div>
                            <p className="text-white">
                                La herramienta de monitoreo de TerritorioRios centraliza información sobre conflictos socioambientales 
                                en Jalisco, facilitando el acceso a datos relevantes para organizaciones, 
                                investigadores y defensores del territorio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />

            <div className="flex justify-center">
                <a href="http://localhost:5173" target="_blank" className="group bg-gray-100 inline-flex items-center gap-2 py-4 px-8 shadow-2xl rounded-4xl transition duration-200 hover:scale-105 hover:bg-green-200">
                IR A LA HERRAMIENTA
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </a>
            </div>


            <div className="flex justify-center">
                <div className="w-7/12 p-12">
                <img className="rounded-4xl shadow-2xl transition duration-200 hover:scale-105" src={monitoreoSS} alt=""/>
                </div>
            </div>

            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}