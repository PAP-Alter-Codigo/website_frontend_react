
import tablero from "@assets/comunidades/staCruz/xuchitlan/TABLERO_Final.png"

import BrushCard from "../../../../../components/Brush-Card"

import juegoXuchitlanPdf from "@assets/comunidades/staCruz/xuchitlan/Memoria-de-Xuchitlan.pdf"

import card1_F from "@assets/comunidades/staCruz/xuchitlan/cartas frente-05.png"
import card1_B from "@assets/comunidades/staCruz/xuchitlan/cartas-02.png"

import card2_F from "@assets/comunidades/staCruz/xuchitlan/cartas frente-06.png"
import card2_B from "@assets/comunidades/staCruz/xuchitlan/cartas-03.png"

import card3_F from "@assets/comunidades/staCruz/xuchitlan/cartas frente-07.png"
import card3_B from "@assets/comunidades/staCruz/xuchitlan/cartas-04.png"

/*
export default function XuchitlanComponent() {
    return (
        <>
            <div className="max-w-6xl mx-auto px-4 pt-12">
                <div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
                            Xuchitlán
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                            Xuchitlán es un juego que busca recuperar los saberes intergeneracionales del antiguo valle de Xuchitlán mediante el reconocimiento de los elementos bioculturales (flora, fauna y cultura) que dan forma a su identidad. Se trata de un recorrido visual e interactivo por el territorio para conocer los pueblos originarios como Cofradía,Buenavista, Santa Cruz de las Flores, Cruz Vieja, Santa Cruz de la Loma cuya relación interdependiente con el Cerro del Totoltepec, el bosque El Malvaste, el humedal La Playa que forman parte de un mismo ecosistema conocido como Corredor de Tlaxomulli, resaltando la importancia del ciclo sociohidrológico.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 lg:gap-10 pt-4 sm:pt-14 lg:pt-14 items-stretch">

                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
                            Tablero
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                            El diseño del tablero se realizó en colaboración con el Comité Agua y Vida de Santa Cruz de las Flores, quienes nos proporcionaron distintos mapas de los cuales querían que nos basáramos para el diseño del mapa. Se trabajo a partir de dicho diseño, corrigiendo los elementos mal representados, además de que se le agregaron diversos elementos que el comité nos pidió, como fueron las distintas corrientes de agua que fluyen desde el cerro del Totoltepec.
                            <br /><br />
                            Para los distintos elementos bioculturales que se incluyeron, se realizó una investigación previa de cuáles eran los más prominentes y representativos del territorio.
                        </p>
                    </div>

                    <div className="w-full overflow-hidden flex items-center justify-center p-4 md:p-8">
                        <img
                            className="max-w-full h-auto max-h-[500px] object-contain rounded-2xl shadow-lg select-none"
                            src={tablero}
                            alt="Tablero del juego Xuchitlán"
                        />
                    </div>

                </div>
                <div className="mt-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
                        Cartas
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-6">
                    {[
                        { front: card1_B, back: card1_F, color: '#629FDE', title: "Informativas", caption: "Este tipo de cartas se encargan de transmitir distinta información de los elementos bioculturales de Santa Cruz de las Flores, como lo son datos curiosos, sus funciones, y palabras en la lengua coca." },
                        { front: card2_B, back: card2_F, color: '#DE9862', title: "Trivia", caption: "Este tipo de cartas se encargan de cuestionar los conocimientos de los participantes a través de distintas preguntas." },
                        { front: card3_B, back: card3_F, color: '#227839', title: "Comunidad", caption: "Este tipo de cartas busca que los participantes realicen actividades en conjunto, como puede ser que todos imiten alguna especie del territorio, generando una comunidad más unida entre ellos. " },
                    ].map(({ front, back, title, caption, color }) => (
                        <div key={title} className="flex flex-col items-center gap-3">
                            <div className="flex-none">
                                <BrushCard frontImage={front} backImage={back} frontBrush={{primaryColor: color}} backBrush={{primaryColor: color}}/>
                            </div>
                            <div className="text-center px-2 pt-4">
                                <h3 className="font-bold text-black text-base sm:text-lg leading-tight">
                                    {title}
                                </h3>
                                <p className="text-black/70 text-sm sm:text-base leading-relaxed mt-1">
                                    {caption}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
*/

export default function XuchitlanComponent() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-8 sm:pt-12">
        {/* Sección Superior: Texto Descriptivo + Tarjeta Descargable */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Texto Principal */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
              Xuchitlán
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
              Xuchitlán es un juego que busca recuperar los saberes intergeneracionales del antiguo valle de Xuchitlán mediante el reconocimiento de los elementos bioculturales (flora, fauna y cultura) que dan forma a su identidad. Se trata de un recorrido visual e interactivo por el territorio para conocer los pueblos originarios como Cofradía, Buenavista, Santa Cruz de las Flores, Cruz Vieja, Santa Cruz de la Loma cuya relación interdependiente con el Cerro del Totoltepec, el bosque El Malvaste, el humedal La Playa que forman parte de un mismo ecosistema conocido como Corredor de Tlaxomulli, resaltando la importancia del ciclo sociohidrológico.
            </p>
          </div>

          {/* Tarjeta de Descarga PDF */}
          <div className="lg:col-span-1">
            <div className="group relative bg-amber-50/60 border-2 border-amber-200 hover:border-amber-400 rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-out shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-200/60 text-amber-900">
                  Documento PDF
                </span>
                <div className="p-2 bg-amber-100 rounded-2xl text-amber-800 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9h1a1 1 0 011 1v1a1 1 0 01-1 1H9m0-3v5m0 0h3m-3 0H9" />
                  </svg>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 leading-tight">
                Conoce la experiencia completa aquí
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                Consulta o descarga el material educativo, reglas y contexto del juego Xuchitlán.
              </p>

              <a
                href={juegoXuchitlanPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group-hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <span>Abrir Documento</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Sección del Tablero */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 lg:gap-10 pt-10 sm:pt-14 lg:pt-14 items-stretch">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
              Tablero
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
              El diseño del tablero se realizó en colaboración con el Comité Agua y Vida de Santa Cruz de las Flores, quienes nos proporcionaron distintos mapas de los cuales querían que nos basáramos para el diseño del mapa. Se trabajó a partir de dicho diseño, corrigiendo los elementos mal representados, además de que se le agregaron diversos elementos que el comité nos pidió, como fueron las distintas corrientes de agua que fluyen desde el cerro del Totoltepec.
              <br /><br />
              Para los distintos elementos bioculturales que se incluyeron, se realizó una investigación previa de cuáles eran los más prominentes y representativos del territorio.
            </p>
          </div>

          <div className="w-full overflow-hidden flex items-center justify-center p-4 md:p-8">
            <img
              className="max-w-full h-auto max-h-[500px] object-contain rounded-2xl shadow-lg select-none"
              src={tablero}
              alt="Tablero del juego Xuchitlán"
            />
          </div>
        </div>

        {/* Sección de las Cartas */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 sm:pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black">
              Cartas
            </h2>
            {/* Mensaje indicador global */}
            <span className="text-xs sm:text-sm font-semibold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full w-fit flex items-center gap-1.5 shadow-sm">
              <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Haz clic sobre cualquier carta para voltearla
            </span>
          </div>
        </div>

        {/* Grid de Cartas Interactivas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-6">
          {[
            {
              front: card1_B,
              back: card1_F,
              color: "#629FDE",
              title: "Informativas",
              caption:
                "Este tipo de cartas se encargan de transmitir distinta información de los elementos bioculturales de Santa Cruz de las Flores, como lo son datos curiosos, sus funciones, y palabras en la lengua coca.",
            },
            {
              front: card2_B,
              back: card2_F,
              color: "#DE9862",
              title: "Trivia",
              caption:
                "Este tipo de cartas se encargan de cuestionar los conocimientos de los participantes a través de distintas preguntas.",
            },
            {
              front: card3_B,
              back: card3_F,
              color: "#227839",
              title: "Comunidad",
              caption:
                "Este tipo de cartas busca que los participantes realicen actividades en conjunto, como puede ser que todos imiten alguna especie del territorio, generando una comunidad más unida entre ellos.",
            },
          ].map(({ front, back, title, caption, color }) => (
            <div key={title} className="flex flex-col items-center gap-3 group w-full">
              {/* Contenedor relativo para montar la superposición indicadora */}
              <div className="relative flex-none cursor-pointer">
                {/* Badge Flotante "Voltear" */}
                <div className="absolute top-3 right-3 z-20 pointer-events-none transition-all duration-300 group-hover:scale-110">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-gray-800 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200">
                    <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Voltear
                  </span>
                </div>

                {/* Tarjeta Brush */}
                <BrushCard
                  frontImage={front}
                  backImage={back}
                  frontBrush={{ primaryColor: color }}
                  backBrush={{ primaryColor: color }}
                />
              </div>

              <div className="text-center px-2 pt-2">
                <h3 className="font-bold text-black text-base sm:text-lg leading-tight flex items-center justify-center gap-1.5">
                  {title}
                </h3>
                <p className="text-black/70 text-sm sm:text-base leading-relaxed mt-1">
                  {caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
