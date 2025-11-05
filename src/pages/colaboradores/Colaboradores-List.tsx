// src/components/ColaboradoresAcordeon.tsx
import { useMemo } from "react";
import { loadColaboradores, type ColaboradorEntry, type Temporada } from "./loader";

type Volunteer = {
  nombre: string;
  carrera: string;
  avatar?: string; // opcional
  categoria: string; // área (Trabajo Social, Comunicación, Tecnologías, etc.)
};

type Props = {
  volunteers?: Volunteer[]; // para renderizar la sección VOLUNTARIOS
  title?: string;
};

const SEASONS: Temporada[] = ["primavera", "verano", "otoño"];

function Chevron({ className = "w-5 h-5 text-gray-500" }: { className?: string }) {
  return (
    <svg className={`${className} transition-transform group-open:rotate-180`} xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function groupBy<T, K extends string | number>(arr: T[], getKey: (v: T) => K): Record<K, T[]> {
  return arr.reduce((acc, v) => {
    const k = getKey(v);
    (acc[k] ||= []).push(v);
    return acc;
  }, {} as Record<K, T[]>);
}

export default function ColaboradoresList({ volunteers = [], title = "Colaboradores por Año y Semestre" }: Props) {
  const data = useMemo(() => loadColaboradores(), []);
  // Agrupar por año
  const byYear = useMemo(() => groupBy(data, (d) => d.year), [data]);

  // Ordenar años desc
  const orderedYears = useMemo(
    () => Object.keys(byYear).map((y) => Number(y)).sort((a, b) => b - a),
    [byYear]
  );

  // Agrupar voluntarios por categoría
  const volunteersByCat = useMemo(() => groupBy(volunteers, (v) => v.categoria), [volunteers]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold pb-12 text-center">{title}</h2>

      {/* VOLUNTARIOS */}
      {volunteers.length > 0 && (
        <details className="group mb-4 rounded-xl border border-gray-200 bg-white open:shadow">
          <summary className="flex items-center justify-between cursor-pointer select-none px-5 py-4">
            <span className="text-xl font-bold text-gray-900">VOLUNTARIOS</span>
            <Chevron />
          </summary>

          <div className="px-4 pb-4 space-y-6">
            {Object.entries(volunteersByCat).map(([categoria, people]) => (
              <div key={categoria}>
                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">{categoria}</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {people.map((p, idx) => (
                    <li key={`${categoria}-${idx}`} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                      <img
                        src={p.avatar || ""}
                        alt="Avatar"
                        className="h-11 w-11 rounded-full object-cover bg-gray-100"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 leading-tight">{p.nombre}</p>
                        <p className="text-sm text-gray-600">{p.carrera}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* AÑOS */}
      {orderedYears.map((year) => {
        const entries = byYear[year]!;
        // agrupar por temporada
        const bySeason = groupBy(entries, (e) => e.season);
        return (
          <details key={year} className="group mb-4 rounded-xl border border-gray-200 bg-white open:shadow">
            <summary className="flex items-center justify-between cursor-pointer select-none px-5 py-4">
              <span className="text-xl font-bold text-gray-900">{year}</span>
              <Chevron />
            </summary>

            <div className="px-5 pb-5 space-y-4">
              {SEASONS.map((season) => {
                const list = bySeason[season];
                if (!list || list.length === 0) return null;

                // agrupar por categoría dentro de la temporada
                const byCat = groupBy(list, (e) => e.categoria || "Sin categoría");

                return (
                  <details key={`${year}-${season}`} className="group rounded-lg border border-gray-100 open:shadow-sm">
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer">
                      <span
                        className={
                          season === "primavera"
                            ? "font-semibold text-indigo-700 capitalize"
                            : season === "verano"
                            ? "font-semibold text-amber-700 capitalize"
                            : "font-semibold text-emerald-700 capitalize"
                        }
                      >
                        {season}
                      </span>
                      <Chevron className="w-4 h-4 text-gray-500" />
                    </summary>

                    <div className="px-4 pb-4 space-y-6">
                      {Object.entries(byCat).map(([categoria, people]) => (
                        <div key={`${year}-${season}-${categoria}`}>
                          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">{categoria}</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {people.map((p: ColaboradorEntry) => (
                              <li key={p.file} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
                                <img
                                  src={p.src}
                                  alt={`${p.name} avatar`}
                                  className="h-11 w-11 rounded-full object-cover bg-gray-100"
                                  loading="lazy"
                                  decoding="async"
                                />
                                <div>
                                  <p className="font-semibold text-gray-900 leading-tight">{p.name}</p>
                                  <p className="text-sm text-gray-600">{p.carrera}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
          </details>
        );
      })}
    </section>
  );
}
