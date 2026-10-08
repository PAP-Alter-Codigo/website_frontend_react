import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import AppHeader from "../../../../components/App-Header"
import MuralJuanacatlanCollage from "./Mural-Juanacatlan-Collage"

import muralPdf from "@assets/comunidades/juanacatlan/Mural/Memoria-mural-Extendida.pdf"
import AppFooter from "../../../../components/App-Footer"

//import juanac1 from "@assets/comunidades/juanacatlan/DSCN0544.jpg";
/* import juanac2 from "@assets/comunidades/juanacatlan/IMG_3182.jpg";
import juanac3 from "@assets/comunidades/juanacatlan/IMG_3220.jpg";
import juanac4 from "@assets/comunidades/juanacatlan/IMG_3242.jpg"; */
//import juanac5 from "@assets/comunidades/juanacatlan/IMG_3621.jpg";
import juanac6 from "@assets/comunidades/juanacatlan/IMG_20240529_100755.jpg";
//import juanac7 from "@assets/comunidades/juanacatlan/IMG_20240529_125517.jpg";
import juanac8 from "@assets/comunidades/juanacatlan/IMG_20240611_091546.jpg";
//import juanac9 from "@assets/comunidades/juanacatlan/IMG_20240611_091603.jpg";

import mural1 from "@assets/comunidades/juanacatlan/Mural/mural1.jpeg";
//import mural2 from "@assets/comunidades/juanacatlan/Mural/mural2.jpeg";
//import mural3 from "@assets/comunidades/juanacatlan/Mural/mural3.jpeg";
import mural4 from "@assets/comunidades/juanacatlan/Mural/mural4.jpeg";
import mural5 from "@assets/comunidades/juanacatlan/Mural/mural5.jpeg";
//import mural6 from "@assets/comunidades/juanacatlan/Mural/mural6.jpeg";
import mural7 from "@assets/comunidades/juanacatlan/Mural/mural7.jpeg";


const imgs = [
    { src: mural1 },
    { src: juanac6 },
    { src: juanac8 },
    { src: mural4 },
    { src: mural5 },
    { src: mural7 },
]

export default function MuralJuanacatlanPage() {
  return (
    <>
      <div className="bgColor">
        <AppHeader />
      </div>
      <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />

      <div className="flex justify-center pt-8 sm:pt-12 px-4">
        <div className="w-full md:w-10/12 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-black pb-4 sm:pb-6">
            Mural
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            
            {/* Texto Principal (Ocupa 2 columnas en pantallas grandes) */}
            <div className="lg:col-span-2 text-base sm:text-lg text-black/90 leading-relaxed space-y-4">
              <p>
                El mural comunitario <strong>“Nuestro territorio”</strong> es el resultado del encuentro entre imaginación, memoria y colaboración. A través del arte, las y los estudiantes y profesorado de la Escuela Josefa Ortiz de Domínguez, junto con el Grupo El Roble y Un Salto de Vida, en la cabecera municipal de Juanacatlán, transformaron los muros de su entrada en un espacio vivo, lleno de colores, relatos y significados compartidos. Cada trazo fue una conversación, cada color una emoción, cada imagen una ventana al territorio.
              </p>
              <p>
                El mural comunitario que hemos realizado no solo es una expresión artística, sino un reflejo del esfuerzo colectivo de las infancias, la identidad compartida y la memoria de quienes participaron en su creación. Representa la memoria viva de Juanacatlán, la conexión con su territorio y la esperanza de que las nuevas generaciones encuentren en el arte un camino de unión, aprendizaje y memoria comunitaria.
              </p>
            </div>

            {/* Tarjeta de Descarga PDF (Ocupa 1 columna a un lado) */}
            <div className="lg:col-span-1">
              <div className="group relative bg-amber-50/60 border-2 border-amber-200 hover:border-amber-400 rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-out shadow-sm hover:shadow-md">
                
                {/* Badge e Ícono */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-200/60 text-amber-900">
                    Documento PDF
                  </span>
                  <div className="p-2 bg-amber-100 rounded-2xl text-amber-800 group-hover:scale-110 transition-transform duration-300">
                    {/* Icono de PDF / Documento */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9h1a1 1 0 011 1v1a1 1 0 01-1 1H9m0-3v5m0 0h3m-3 0H9" />
                    </svg>
                  </div>
                </div>

                {/* Título de la llamada a la acción */}
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 leading-tight">
                  Conoce la experiencia completa aquí
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                  NUESTRO TERRITORIO: Memorias del Mural Comunitario en la Escuela Josefa Ortiz de Domínguez en Juanacatlán
                </p>

                {/* Botón con indicador visual de clic y apertura externa */}
                <a
                  href={muralPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group-hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                  <span>Abrir Documento</span>
                  {/* Ícono indicador de enlace externo */}
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

              </div>
            </div>

          </div>

          {/* Collage de imágenes */}
          <MuralJuanacatlanCollage images={imgs} className="pt-12 sm:pt-16" />
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <AppFooter />
        </div>
      </div>
    </>
  );
}
