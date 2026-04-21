

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"

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
                {/* Texto */}
                <div className="py-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
                        Mapa Interactivo
                    </h2>
                    <h4 className="text-2xl sm:text-3xl lg:text-2xl font-extrabold text-black pb-3 sm:pb-4">
                        ¿Qué es este mapa?
                    </h4>
                    <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                        Este mapa muestra los pozos, humedales y otras formas en las que el agua está presente en Santa Cruz de las Flores. No es solo un mapa para ubicar puntos, sino una herramienta para entender cómo se vive, se usa y se cuida el agua en el territorio. Aquí se integran dos formas distintas de conocer el agua: por un lado, el conocimiento de la comunidad, y por otro, la información registrada por instituciones en la actualidad.
                        <br /><br />
                        Esto permite conocer dónde está el agua, entender cómo ha cambiado el territorio con el tiempo y reconocer la importancia de este recurso en la vida de la comunidad. Además, busca hacer más accesible información que normalmente es técnica o difícil de obtener, para que cualquier persona pueda comprenderla y utilizarla.
                    </p>
                </div>
                <MapaInteractivoHumedalAguasSub />
                {/* Texto */}
                <div className='pb-6 pt-12'>
                    <h2 className="text-2xl sm:text-3xl lg:text-2xl font-extrabold text-black pb-3 sm:pb-4">
                        ¿Qué hay en este mapa?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                        El agua puede entenderse de diferentes maneras. Por ello, en este mapa se presentan dos capas: la primera del año 1991, que muestra el conocimiento de la comunidad basado en la experiencia y la vida cotidiana, y la segunda del año 2020, que presenta la forma en que las instituciones registran y administran el agua, en este caso a través de CONAGUA.
                    </p>
                </div>
                <div className='py-6'>
                    <h2 className="text-2xl sm:text-3xl lg:text-2xl font-extrabold text-black pb-3 sm:pb-4">
                        ¿Qué son los pozos?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                        Los pozos son perforaciones hechas en la tierra para obtener agua del subsuelo, y décadas atrás entre 1970 hasta 1990, la mayoría de las casas en Santa Cruz tenían uno propio para cubrir sus necesidades diarias como cocinar, lavar o bañarse. De igual manera, existían manantiales dentro de la localidad, los cuales son lugares donde el agua brota de forma natural, sin necesidad de perforar; estos eran puntos importantes para la comunidad que hoy en día ya no existen.
                    </p>
                </div>
                <div className='py-6'>
                    <h2 className="text-2xl sm:text-3xl lg:text-2xl font-extrabold text-black pb-3 sm:pb-4">
                        Capa de 1991: el conocimiento de la comunidad 
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                        Este mapa representa la memoria del territorio, es decir, cómo las personas conocían y se relacionaban con el agua a partir de su experiencia cotidiana. Además, de acuerdo con testimonios de personas de la comunidad, muchos de estos pozos existían desde mucho antes de 1991, incluso antes de la llegada de las empresas a la zona, que en Santa Cruz de las Flores comenzó alrededor de 1975. 
                        <br /><br />
                        Parte importante del proceso de la elaboración de este mapa fue el colectivo para la defensa del territorio conformado por la comunidad de Santa Cruz de Flores, de la mano del señor Heliodoro, un perforador de pozos originario de la comunidad, quien, sin saber leer ni escribir, conocía el territorio a partir de la observación, la memoria y el recorrido. Gracias a este conocimiento fue posible identificar distintos tipos de pozos, como los de soga, agrícolas e incluso algunos de uso más intensivo. 
                    </p>
                </div>
            </div>
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}