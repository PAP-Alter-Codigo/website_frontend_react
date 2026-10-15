import { useMemo } from "react";
import { Link } from "react-router-dom";

import brush1 from "@assets/brushStrokes/img10-3-1.png";
import brush2 from "@assets/brushStrokes/img10-2-4.png";
import brush3 from "@assets/brushStrokes/img10-1-3.png";

import { useCMSContent } from "../../hooks/useCMSContent";
import type { RegionesIndexContent } from "../../types/regiones";

function formatRegionTitle(rawTitle: string): string {
  if (rawTitle.toUpperCase() === "CIENEGA") {
    return "Ciénega";
  }
  return rawTitle
    .toLowerCase()
    .split("-")
    .map((word) => {
      if (word === "de") return "de";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function HomeComunidades() {
  // Consumo dinámico del índice de regiones desde el CMS
  const { data, loading, error } = useCMSContent<RegionesIndexContent>("/cms-content/comunidades/index.json");

  // Transformación dinámica de los títulos y rutas de las regiones recibidas
  const comunidades = useMemo(() => {
    return (data?.regiones || []).map((r) => {
      const name = formatRegionTitle(r.title);
      const regionSlug = r.id || r.title.toLowerCase();

      return {
        name,
        img: r.imagen || r.img || "",
        to: `/regiones/${regionSlug}`,
      };
    });
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32 text-red-600 font-semibold">
        Error al cargar las comunidades: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="relative py-32">
        <div className="flex flex-1 justify-center z-10">
          <div className="w-9/12">
            <div className="text-4xl font-extrabold pb-5">COMUNIDADES</div>
            <p className="">
              Aquí encontrarás las comunidades en las que el equipo de Resonancias trabajó, junto con mujeres 
              defensoras de las 12 regiones del estado Jalisco.
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 -z-30">
          <img className="" src={brush1} alt="01 prt sup 1" />
        </div>
        <div className="absolute top-0 right-0 -z-30">
          <img className="" src={brush2} alt="01 prt sup 1" />
        </div>
      </div>

      <div className="relative flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-9/12">
          {comunidades.map((c) => (
            <Link key={c.name} data-aos="fade-up" to={c.to}>
              <div
                className="bg-white rounded-4xl shadow-md
                overflow-hidden transition duration-200 ease-in-out
                hover:scale-110"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-48 object-cover rounded-3xl shadow-md"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-4 flex justify-center">
                  <h3 className="w-full text-center text-3xl font-semibold text-gray-800">
                    {c.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <img src={brush3} className="absolute bottom-0 left-0 -z-10" alt="decoración" />
      </div>
    </>
  );
}
