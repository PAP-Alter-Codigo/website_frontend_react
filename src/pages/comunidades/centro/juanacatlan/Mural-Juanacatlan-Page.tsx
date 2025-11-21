import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import AppHeader from "../../../../components/App-Header"
import MuralJuanacatlanCollage from "./Mural-Juanacatlan-Collage"

import juanac1 from "@assets/comunidades/juanacatlan/DSCN0544.jpg";
import juanac2 from "@assets/comunidades/juanacatlan/IMG_3182.jpg";
import juanac3 from "@assets/comunidades/juanacatlan/IMG_3220.jpg";
import juanac4 from "@assets/comunidades/juanacatlan/IMG_3242.jpg";
import juanac5 from "@assets/comunidades/juanacatlan/IMG_3621.jpg";
import juanac6 from "@assets/comunidades/juanacatlan/IMG_20240529_100755.jpg";
import juanac7 from "@assets/comunidades/juanacatlan/IMG_20240529_125517.jpg";
import juanac8 from "@assets/comunidades/juanacatlan/IMG_20240611_091546.jpg";
import juanac9 from "@assets/comunidades/juanacatlan/IMG_20240611_091603.jpg";


const imgs = [
    { src: juanac1 },
    { src: juanac2 },
    { src: juanac3 },
    { src: juanac4 },
    { src: juanac5 },
    { src: juanac6 },
    { src: juanac7 },
    { src: juanac8 },
    { src: juanac9 },
]


export default function MuralJuanacatlanPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <div className="flex justify-center pt-12">
                <div className="w-10/12">
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-black pb-3 sm:pb-4">
                        Mural
                    </h1>
                    <div className=" text-lg sm:text-xl lg:text-2xl text-black/90 leading-relaxed">
                        El mural comunitario “Nuestro territorio” es el resultado del encuentro entre imaginación, memoria y colaboración. A través del arte, las y los estudiantes y profesorado de la Escuela Josefa Ortiz de Domínguez, junto con el Grupo El Roble y Un Salto de Vida, en la cabecera municipal de Juanacatlán, transformaron los muros de su entrada en un espacio vivo, lleno de colores, relatos y significados compartidos. Cada trazo fue una conversación, cada color una emoción, cada imagen una ventana al territorio. 
                        <br /><br />
                        El mural comunitario que hemos realizado no solo es una expresión artística, sino un reflejo del esfuerzo colectivo de las infancias, la identidad compartida y la memoria de quienes participaron en su creación. Representa la memoria viva de Juanacatlán, la conexión con su territorio y la esperanza de que las nuevas generaciones encuentren en el arte un camino de unión, aprendizaje y  memoria comunitaria. 
                    </div>
                    <MuralJuanacatlanCollage images={imgs} className="pt-12"/>
                </div>
            </div>
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}