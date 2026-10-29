import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png";
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png";

import AppHeader from "../../components/App-Header";
import ComunidadesDetailPage from "./Comunidades-Detail-Page";
import AppFooter from "../../components/App-Footer";

import { useCMSContent } from "../../hooks/useCMSContent";
import type { RegionesIndexContent } from "../../types/regiones";

export default function ComunidadWrapperPage() {
  // Obtención dinámica del índice de regiones desde el CMS
  const { data, loading, error } = useCMSContent<RegionesIndexContent>("/cms-content/comunidades/index.json");

  return (
    <>
      <div className="bgColor">
        <AppHeader />
      </div>

      <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />

      {/* Manejo de estados de carga y error antes de renderizar la página de detalle */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[50vh] text-red-600 font-semibold">
          Error al cargar las regiones: {error.message}
        </div>
      ) : (
        /* Renderizado dinámico pasando el arreglo de regiones del CMS */
        <ComunidadesDetailPage regiones={data?.regiones || []} />
      )}

      <div className="relative flex items-center justify-center">
        <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <AppFooter />
        </div>
      </div>
    </>
  );
}
