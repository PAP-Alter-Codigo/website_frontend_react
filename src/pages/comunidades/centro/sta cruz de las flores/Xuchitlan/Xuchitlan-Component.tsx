
import tablero from "@assets/comunidades/staCruz/xuchitlan/TABLERO_Final.png"
import card1 from "@assets/comunidades/staCruz/xuchitlan/cardFrontTemp.png"
import card2 from "@assets/comunidades/staCruz/xuchitlan/cardBack.png"
import BrushCard from "../../../../../components/Brush-Card"



export default function XuchitlanComponent() {
    return (
        <>
            <div className="max-w-6xl mx-auto px-4 pt-12">
                <div>
                    {/* Texto */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
                            Xuchitlán
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed">
                            Xuchitlán es un juego que busca recuperar los saberes intergeneracionales del antiguo valle de Xuchitlán mediante el reconocimiento de los elementos bioculturales (flora, fauna y cultura) que dan forma a su identidad. Se trata de un recorrido visual e interactivo por el territorio para conocer los pueblos originarios como Cofradía,Buenavista, Santa Cruz de las Flores, Cruz Vieja, Santa Cruz de la Loma cuya relación interdependiente con el Cerro del Totoltepec, el bosque El Malvaste, el humedal La Playa que forman parte de un mismo ecosistema conocido como Corredor de Tlaxomulli, resaltando la importancia del ciclo sociohidrológico.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-6 lg:gap-10 pt-4 sm:pt-14 lg:pt-14 items-stretch">

                    {/* Texto */}
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

                    {/* Imagen */}
                    <figure className="relative min-h-[300px] p-8">
                        <img
                            className="w-full h-full object-cover object-center select-none"
                            src={tablero}
                            alt="logo resonancias 1"
                        />
                    </figure>

                </div>
                <div className="mt-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black pb-3 sm:pb-4">
                        Cartas
                    </h2>
                </div>

                <div className="grid grid-cols-3 items-start gap-4 mt-6">
                    {[
                        { front: card1, back: card2, title: "Informativas", caption: "Este tipo de cartas se encargan de transmitir distinta información de los elementos bioculturales de Santa Cruz de las Flores, como lo son datos curiosos, sus funciones, y palabras en la lengua coca." },
                        { front: card1, back: card2, title: "Trivia", caption: "Este tipo de cartas se encargan de cuestionar los conocimientos de los participantes a través de distintas preguntas." },
                        { front: card1, back: card2, title: "Comunidad", caption: "Este tipo de cartas busca que los participantes realicen actividades en conjunto, como puede ser que todos imiten alguna especie del territorio, generando una comunidad más unida entre ellos. " },
                    ].map(({ front, back, title, caption }) => (
                        <div key={title} className="flex flex-col items-center gap-3">
                            <div className="flex-none">
                                <BrushCard frontImage={front} backImage={back} />
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