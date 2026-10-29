import { useMemo } from "react";
import { useCMSContent } from "../../hooks/useCMSContent";
import type { CMSAsesor, AsesoresCMSResponse } from "../../types/asesores";

export default function NosotrosAdvisors() {
  // Petición directa al JSON de asesores en el CMS (sin fallback local)
  const { data: rawData, loading, error } = useCMSContent<
    CMSAsesor[] | AsesoresCMSResponse
  >("/cms-content/asesores/index.json");

  // Normalización para soportar arreglo directo o la propiedad 'asesores'
  const advisors = useMemo<CMSAsesor[]>(() => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (
      typeof rawData === "object" &&
      "asesores" in rawData &&
      Array.isArray(rawData.asesores)
    ) {
      return rawData.asesores;
    }
    return [];
  }, [rawData]);

  if (loading) {
    return <div className="text-center py-12">Cargando asesores...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error al cargar asesores: {error.message}
      </div>
    );
  }

  return (
    <section className="px-6 sm:px-10 lg:px-32 py-12" data-aos="fade-up">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-extrabold pb-5 text-center">
          Asesores del Proyecto
        </h2>

        {advisors.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay asesores registrados actualmente.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {advisors.map((advisor, index) => {
              const { name, degrees, expertise, photoPath, contact, slug } = advisor;

              return (
                <div
                  key={slug || name || index}
                  className="w-full max-w-72 bg-white rounded-4xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  {/* Photo */}
                  <div className="w-full h-56 overflow-hidden bg-gray-200">
                    <img
                      src={photoPath}
                      alt={name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="px-3 py-4 text-center flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name */}
                      <h3 className="text-base font-bold text-gray-900 mb-2">
                        {name}
                      </h3>

                      {/* Degrees */}
                      <div className="mb-3 space-y-0.5">
                        {degrees?.map((degree, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-gray-700 line-clamp-1"
                          >
                            {degree}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Expertise */}
                      {expertise && (
                        <p className="border-t border-gray-200 pt-3 mt-3">
                          <span className="text-xs font-semibold text-indigo-700 mr-1.5">
                            Especialidad:
                          </span>
                          <span className="text-sm italic text-gray-600">
                            {expertise}
                          </span>
                        </p>
                      )}

                      {/* Contact */}
                      {contact && (
                        <p className="border-t border-gray-200 pt-3 mt-3">
                          <span className="text-xs font-semibold text-indigo-700 mr-1.5">
                            Contacto:
                          </span>
                          <span className="text-sm italic text-gray-600">
                            {contact}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
