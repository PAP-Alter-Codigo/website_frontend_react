import { Link } from "react-router-dom";
import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png";
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png";
import AppHeader from "../../../../components/App-Header";
import AppFooter from "../../../../components/App-Footer";
import MuralJuanacatlanCollage from "./Mural-Juanacatlan-Collage";

import { useCMSContent } from "../../../../hooks/useCMSContent";
import type { CMSMuralContent } from "../../../../types/recursos";

export default function MuralJuanacatlanPage() {
  // Consumo dinámico con useCMSContent directamente desde el CMS sin fallback local
  const jsonUrl = "/cms-content/comunidades/centro/mural.json";
  const { data, loading, error } = useCMSContent<CMSMuralContent>(jsonUrl);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Contenido no disponible</h1>
        <p className="text-gray-600 mb-6">
          No se pudo cargar la información del Mural de Juanacatlán desde el CMS.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2 hover:opacity-90"
        >
          Volver al inicio
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </section>
    );
  }

  return (
    <>
      <div className="bgColor">
        <AppHeader />
      </div>
      <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />

      <div className="flex justify-center pt-8 sm:pt-12 px-4">
        <div className="w-full md:w-10/12 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-black pb-4 sm:pb-6">
            {data.titulo}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Texto Principal dinámico */}
            <div className="lg:col-span-2 text-base sm:text-lg text-black/90 leading-relaxed space-y-4">
              {(data.parrafos || []).map((parrafo, idx) => (
                <p key={idx}>{parrafo}</p>
              ))}
            </div>

            {/* Tarjeta de Descarga PDF dinámica */}
            <div className="lg:col-span-1">
              <div className="group relative bg-amber-50/60 border-2 border-amber-200 hover:border-amber-400 rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-out shadow-sm hover:shadow-md">
                {/* Badge e Ícono */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-200/60 text-amber-900">
                    Documento PDF
                  </span>
                  <div className="p-2 bg-amber-100 rounded-2xl text-amber-800 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 9h1a1 1 0 011 1v1a1 1 0 01-1 1H9m0-3v5m0 0h3m-3 0H9"
                      />
                    </svg>
                  </div>
                </div>

                {/* Título y descripción dinámicos */}
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {data.pdf_titulo}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                  {data.pdf_descripcion}
                </p>

                {/* Enlace al archivo PDF */}
                {data.pdf_archivo && (
                  <a
                    href={data.pdf_archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group-hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    <span>Abrir Documento</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Collage de imágenes dinámico */}
          <MuralJuanacatlanCollage
            images={data.imagenes || []}
            className="pt-12 sm:pt-16"
          />
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <img
          className="w-full select-none"
          src={prtInf1}
          alt="logo resonancias 1"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <AppFooter />
        </div>
      </div>
    </>
  );
}
