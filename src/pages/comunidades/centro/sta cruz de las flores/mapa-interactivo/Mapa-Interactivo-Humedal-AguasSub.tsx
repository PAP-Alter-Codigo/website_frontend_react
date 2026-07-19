import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { initializeMapData, getRepdaForPunto, DEFAULT_DATASETS } from "./data/loaders";
import { CAPAS, TOOLTIPS, usoShape, LABELS, colorByUso, LeyendaDot, DEFAULT_INSTRUCCIONES } from "./data/constants.tsx";
import type { Punto, Uso, CapasEstructura, DatasetConfig, MarkerShape, InstruccionPaso } from "./data/types";

// ─── Componente para mostrar el detalle de un punto seleccionado, incluyendo su información REPDA si está disponible ───────────────────────
function DetallePunto({
    punto,
    onClose,
    instrucciones,
}: {
    punto: Punto | null;
    onClose: () => void;
    instrucciones?: InstruccionPaso[];
}) {
    if (!punto) {
        return (
            <div className="flex flex-col items-center justify-start h-full text-gray-500 gap-4 px-6 py-6 sm:px-8 sm:py-8 text-center overflow-y-auto">
                {/*Instrucciones de uso del mapa para el usuario*/}
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="text-sky-600 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10"
                >
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
                </svg>
                <h3 className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Instrucciones de uso
                </h3>
                <div className="text-[11px] sm:text-xs text-gray-600 text-left space-y-4 sm:space-y-6 w-full">
                    {(instrucciones ?? DEFAULT_INSTRUCCIONES).map((paso) => (
                        <div key={paso.numero}>
                            <p className="font-semibold text-gray-700 mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                                <span className="text-sky-600 font-bold">{paso.numero}</span> {paso.titulo}
                                {paso.titulo.toLowerCase().includes("seleccionar capas") && (
                                    <span className="inline-flex items-center justify-center w-7 h-7 bg-white border border-gray-300 rounded shadow-[0_1px_2.5px_rgba(0,0,0,0.18)] align-middle ml-1.5 select-none shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 26 26"
                                            className="w-5.5 h-5.5"
                                        >
                                            {/* Bottom Sheet */}
                                            <polygon
                                                points="13,11 21,15 13,19 5,15"
                                                fill="#d1d5db"
                                                stroke="#71717a"
                                                strokeWidth="1.2"
                                                strokeLinejoin="round"
                                            />
                                            {/* Middle Sheet */}
                                            <polygon
                                                points="13,8 21,12 13,16 5,12"
                                                fill="#e5e7eb"
                                                stroke="#71717a"
                                                strokeWidth="1.2"
                                                strokeLinejoin="round"
                                            />
                                            {/* Top Sheet */}
                                            <polygon
                                                points="13,5 21,9 13,13 5,9"
                                                fill="#ffffff"
                                                stroke="#71717a"
                                                strokeWidth="1.2"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                {paso.descripcion}
                            </p>
                            {paso.items && paso.items.length > 0 && (
                                <ul className="list-disc list-inside pl-3 mt-1 text-gray-500 space-y-0.5">
                                    {paso.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const color = colorByUso[punto.uso] ?? "#6b7280";

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 text-white"
                style={{ backgroundColor: color }}
            >
                <div>
                    <p className="text-xs font-medium opacity-80">{punto.capaKey || "Aguas subterráneas — REPDA"}</p>
                    <p className="text-base font-bold leading-tight">{punto.repda?.titular || punto.name}</p>
                    {punto.repda?.titular && (
                        <p className="text-xs font-mono opacity-80 mt-0.5">{punto.name}</p>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="ml-2 rounded-full p-1.5 sm:p-2 hover:bg-white/20 transition flex items-center justify-center"
                    aria-label="Cerrar detalle"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </div>

            {/* Contenido */}
            {punto.repda ? (
                <dl className="divide-y divide-gray-100 text-sm">
                    {LABELS.map(({ key, label }) => (
                        <div key={key} className="flex flex-col px-4 sm:px-6 py-2.5 sm:py-3.5">
                            <dt className="text-xs text-gray-500 font-medium">{label}</dt>
                            <dd className="text-gray-800 font-semibold mt-0.5">
                                {punto.repda![key] || "—"}
                            </dd>
                        </div>
                    ))}
                </dl>
            ) : (
                <div className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 text-sm text-gray-600">
                    {TOOLTIPS[punto.uso] ? (
                        <div className="rounded-xl text-left">
                            <h4 className="font-bold text-gray-900 mb-2.5 flex items-center gap-1.5 text-xs uppercase tracking-wider text-sky-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-sky-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Información del uso
                            </h4>
                            <p className="leading-relaxed text-gray-700 text-sm">
                                {TOOLTIPS[punto.uso]}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-6">
                            Este punto no tiene datos en el registro REPDA.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * Componente CapasControl
 * 
 * Se encarga de inicializar el control de capas nativo de Leaflet L.control.layers()
 * y de mantener sincronizado el estado capasActivas de React con las capas
 * agregadas o removidas en el mapa.
 */
function CapasControl({
    capas,
    setCapasActivas,
    setFiltroUso,
    datasets,
    showCapasControl = true,
}: {
    capas: CapasEstructura;
    setCapasActivas: React.Dispatch<React.SetStateAction<Set<string>>>;
    setFiltroUso: React.Dispatch<React.SetStateAction<"all" | Uso>>;
    datasets: DatasetConfig[];
    showCapasControl?: boolean;
}) {
    const map = useMap();
    const isSyncingRef = useRef(false);

    useEffect(() => {
        if (!map || !capas) return;

        const ALL_TOGGLE_NAME = "Visualizar todas al mismo tiempo";
        const TARGET_LAYERS = datasets.filter((d) => d.kind === "puntos").map((d) => d.key);

        const allLayersDummy = L.layerGroup();

        // Inicializamos el control de capas de Leaflet solo si showCapasControl es verdadero
        let controlLayers: L.Control.Layers | null = null;
        if (showCapasControl) {
            controlLayers = L.control.layers(undefined, undefined, {
                position: "topleft",
                collapsed: true,
            });
            allLayersDummy.addTo(map);
            controlLayers.addOverlay(allLayersDummy, ALL_TOGGLE_NAME);
        }

        // Agregamos cada capa al mapa (todas las capas se muestran en el mapa de manera predeterminada)
        Object.entries(capas).forEach(([name, capa]) => {
            capa.layerGroup.addTo(map);
            if (showCapasControl && controlLayers && name !== "Humedales") {
                controlLayers.addOverlay(capa.layerGroup, name);
            }
        });

        if (showCapasControl && controlLayers) {
            controlLayers.addTo(map);
        }

        // Al iniciar, todas las capas están activadas + el toggle general
        const initialCapas = new Set(Object.keys(capas));
        initialCapas.add(ALL_TOGGLE_NAME);
        setCapasActivas(initialCapas);

        // Eventos para actualizar la visibilidad en React al marcar/desmarcar en el control de Leaflet
        const handleOverlayAdd = (e: L.LayersControlEvent) => {
            setCapasActivas((prev) => {
                const next = new Set(prev);
                next.add(e.name);
                return next;
            });

            if (isSyncingRef.current) return;

            // Deferimos la sincronización con setTimeout para permitir que Leaflet termine
            // de procesar el evento de click (desactivando internally su bandera _handlingClick).
            setTimeout(() => {
                if (isSyncingRef.current) return;
                isSyncingRef.current = true;
                try {
                    if (e.name === ALL_TOGGLE_NAME) {
                        TARGET_LAYERS.forEach((name) => {
                            const capa = capas[name];
                            if (capa && !map.hasLayer(capa.layerGroup)) {
                                map.addLayer(capa.layerGroup);
                            }
                        });
                    } else if (TARGET_LAYERS.includes(e.name)) {
                        const allActive = TARGET_LAYERS.every((name) => {
                            const capa = capas[name];
                            return capa && map.hasLayer(capa.layerGroup);
                        });
                        if (allActive && !map.hasLayer(allLayersDummy)) {
                            map.addLayer(allLayersDummy);
                        }
                    }
                } finally {
                    isSyncingRef.current = false;
                }
            }, 0);
        };

        const handleOverlayRemove = (e: L.LayersControlEvent) => {
            setCapasActivas((prev) => {
                const next = new Set(prev);
                next.delete(e.name);
                return next;
            });

            if (isSyncingRef.current) return;

            // Deferimos la sincronización con setTimeout para permitir que Leaflet termine
            // de procesar el evento de click (desactivando internally su bandera _handlingClick).
            setTimeout(() => {
                if (isSyncingRef.current) return;
                isSyncingRef.current = true;
                try {
                    if (e.name === ALL_TOGGLE_NAME) {
                        TARGET_LAYERS.forEach((name) => {
                            const capa = capas[name];
                            if (capa && map.hasLayer(capa.layerGroup)) {
                                map.removeLayer(capa.layerGroup);
                            }
                        });
                    } else if (TARGET_LAYERS.includes(e.name)) {
                        if (map.hasLayer(allLayersDummy)) {
                            map.removeLayer(allLayersDummy);
                        }
                    }
                } finally {
                    isSyncingRef.current = false;
                }
            }, 0);
        };

        map.on("overlayadd", handleOverlayAdd);
        map.on("overlayremove", handleOverlayRemove);

        return () => {
            if (controlLayers) {
                controlLayers.remove();
            }
            if (map.hasLayer(allLayersDummy)) {
                map.removeLayer(allLayersDummy);
            }
            Object.values(capas).forEach((capa) => {
                capa.layerGroup.remove();
            });
            map.off("overlayadd", handleOverlayAdd);
            map.off("overlayremove", handleOverlayRemove);
        };
    }, [map, capas, setCapasActivas, setFiltroUso, datasets, showCapasControl]);

    return null;
}

/**
 * Componente FilterButtons
 * 
 * Renderiza dinámicamente los botones de filtrado de usos según el listado
 * de filtros válidos calculados de manera unificada para las capas seleccionadas.
 */
function FilterButtons({
    filtrosDisponibles,
    filtroUso,
    setFiltroUso,
    conteoUso,
    totalPuntosActivos,
}: {
    filtrosDisponibles: Set<Uso>;
    filtroUso: "all" | Uso;
    setFiltroUso: (uso: "all" | Uso) => void;
    conteoUso: Record<Uso, number>;
    totalPuntosActivos: number;
}) {
    // Filtramos la configuración CAPAS predefinida según los usos disponibles en capas activas
    const activeCapasConfigs = CAPAS.filter((c) => filtrosDisponibles.has(c.key));

    return (
        <div className="flex flex-wrap gap-2 relative z-50">
            <button
                onClick={() => setFiltroUso("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filtroUso === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                aria-pressed={filtroUso === "all"}
            >
                Todos ({totalPuntosActivos})
            </button>

            {activeCapasConfigs.map(({ key, label, color }) => (
                <button
                    key={key}
                    onClick={() => setFiltroUso(key)}
                    className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${filtroUso === key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    aria-pressed={filtroUso === key}
                    aria-describedby={`tooltip-${key}`}
                >
                    <LeyendaDot color={color} shape={usoShape[key]} />
                    {label} ({conteoUso[key] ?? 0})
                    {TOOLTIPS[key] && (
                        <div
                            id={`tooltip-${key}`}
                            className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3.5 py-2.5 bg-gray-50 text-gray-900 text-xs rounded-lg w-60 shadow-[0_12px_28px_rgba(0,0,0,0.18)] border border-gray-200 z-[9999] transition-all opacity-0 group-hover:opacity-100 pointer-events-none whitespace-normal leading-relaxed font-medium text-left"
                        >
                            {TOOLTIPS[key]}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-50" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export interface MapaInteractivoProps {
    datasets?: DatasetConfig[];                    // por defecto: DEFAULT_DATASETS de loaders.ts
    usoFiltroExacto?: Uso[];                        // por defecto: undefined (sin filtrado, comportamiento original)
    showFiltros?: boolean;                          // por defecto: true (muestra los filtros)
    showCapasControl?: boolean;                     // por defecto: true (muestra el icono de capas dentro del mapa)
    showLayerControl?: boolean;                     // alias de showCapasControl
    tamanoPorVolumen?: boolean;                     // por defecto: false (iconos fijos de 18px, comportamiento original)
    shapePorCapa?: Record<string, MarkerShape>;     // por defecto: undefined (usa usoShape por defecto)
    minIconSize?: number;                           // por defecto: 12
    maxIconSize?: number;                           // por defecto: 30
    center?: [number, number];                      // por defecto: [20.476, -103.506] (valor original)
    zoom?: number;                                  // por defecto: 12 (valor original)
    lazy?: boolean;                                 // por defecto: false (se monta inmediatamente, comportamiento original)
    instrucciones?: InstruccionPaso[];              // instrucciones personalizadas para la vista de ayuda
}

export default function MapaInteractivoHumedalAguasSub({
    datasets = DEFAULT_DATASETS,
    usoFiltroExacto,
    showFiltros = true,
    showCapasControl,
    showLayerControl,
    tamanoPorVolumen = false,
    shapePorCapa,
    minIconSize = 12,
    maxIconSize = 42,
    center = [20.476, -103.506],
    zoom = 12,
    lazy = false,
    instrucciones,
}: MapaInteractivoProps = {}) {
    const activeShowCapasControl = showCapasControl ?? showLayerControl ?? true;
    const [capas, setCapas] = useState<CapasEstructura | null>(null);
    const [, setPuntos] = useState<Punto[]>([]);
    const [, setHumedal] = useState<[number, number][]>([]);

    // Estado de las capas activas sincronizadas con el control de Leaflet
    const [capasActivas, setCapasActivas] = useState<Set<string>>(new Set());

    // Estado para el filtro de uso actual
    const [filtroUso, setFiltroUso] = useState<"all" | Uso>("all");
    const [selectedPunto, setSelectedPunto] = useState<Punto | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(!lazy);

    // Configura IntersectionObserver para carga diferida (lazy load) si está activado
    // Esto ayuda a que el mapa se cargue cuando el usuario hace scroll hasta el mapa
    useEffect(() => {
        if (!lazy) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "300px 0px", threshold: 0 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [lazy]);

    // Carga inicial de datos desde los GeoJSONs y REPDA metadata
    useEffect(() => {
        if (!shouldRender) return;

        initializeMapData(datasets, usoFiltroExacto, {
            tamanoPorVolumen,
            shapePorCapa,
            minIconSize,
            maxIconSize
        }).then(({ capas, puntos, humedal }) => {
            setCapas(capas);
            setPuntos(puntos);
            setHumedal(humedal);
        }).catch((err) => {
            console.error("Error loading map data:", err);
        });
    }, [shouldRender, datasets, usoFiltroExacto, tamanoPorVolumen, shapePorCapa, minIconSize, maxIconSize]);

    // Calcula la unión de usos/filtros disponibles basados en las capas seleccionadas actualmente
    const filtrosDisponibles = useMemo(() => {
        const available = new Set<Uso>();
        capasActivas.forEach((capaName) => {
            const capa = capas?.[capaName];
            if (capa && capa.usos) {
                capa.usos.forEach((uso) => available.add(uso));
            }
        });
        return available;
    }, [capasActivas, capas]);

    // Recopila los puntos pertenecientes únicamente a las capas que están activas en el mapa
    const puntosActivos = useMemo(() => {
        const list: Punto[] = [];
        capasActivas.forEach((capaName) => {
            const capa = capas?.[capaName];
            if (capa && capa.puntos) {
                list.push(...capa.puntos);
            }
        });
        return list;
    }, [capasActivas, capas]);

    // Calcula la cantidad de puntos de cada uso basándose únicamente en los puntos de las capas activas
    const conteoUso = useMemo(() => {
        const acc = {} as Record<Uso, number>;
        for (const c of CAPAS) acc[c.key] = 0;
        puntosActivos.forEach((p) => {
            acc[p.uso] = (acc[p.uso] ?? 0) + 1;
        });
        return acc;
    }, [puntosActivos]);

    // Sincroniza el filtro seleccionado cuando se desactivan capas; 
    // si el uso actual ya no es parte de las capas activas, se reinicia a "all" (Todos)
    useEffect(() => {
        if (filtroUso === "all") return;
        if (!filtrosDisponibles.has(filtroUso)) {
            setFiltroUso("all");
        }
    }, [filtrosDisponibles, filtroUso]);

    // Maneja la selección del punto detallado, cargando datos del REPDA si no están en caché local
    const handleMarkerClick = async (punto: Punto) => {
        if (!punto.repda) {
            try {
                const repda = await getRepdaForPunto(punto.name);
                setSelectedPunto({ ...punto, repda });
            } catch (err) {
                console.error("Error loading REPDA:", err);
                setSelectedPunto(punto);
            }
        } else {
            setSelectedPunto(punto);
        }
    };

    // Usamos una referencia para evitar recrear y rebincular listeners de clic a los marcadores Leaflet 
    // en cada renderizado de React
    const markerClickRef = useRef(handleMarkerClick);
    useEffect(() => {
        markerClickRef.current = handleMarkerClick;
    });

    // Vincula los listeners de click y hover a los marcadores de Leaflet una vez cargados
    useEffect(() => {
        if (!capas) return;

        Object.values(capas).forEach((capa) => {
            capa.puntos.forEach((punto) => {
                if (punto.marker) {
                    punto.marker.off("click");
                    punto.marker.off("mouseover");
                    punto.marker.off("mouseout");

                    punto.marker.on("click", () => {
                        markerClickRef.current(punto);
                    });

                    punto.marker.on("mouseover", () => {
                        punto.marker!.openPopup();
                    });

                    punto.marker.on("mouseout", () => {
                        punto.marker!.closePopup();
                    });
                }
            });
        });
    }, [capas]);

    // Filtra dinámicamente qué marcadores se agregan o remueven de cada layerGroup
    // según el filtroUso seleccionado en la interfaz
    useEffect(() => {
        if (!capas) return;

        Object.entries(capas).forEach(([name, capa]) => {
            const datasetConfig = datasets.find(d => d.key === name);
            if (datasetConfig && datasetConfig.kind !== "puntos") return;

            capa.layerGroup.clearLayers();
            capa.puntos.forEach((punto) => {
                if (filtroUso === "all" || punto.uso === filtroUso) {
                    if (punto.marker) {
                        capa.layerGroup.addLayer(punto.marker);
                    }
                }
            });
        });
    }, [capas, filtroUso, datasets]);

    return (
        <section ref={containerRef} className="w-full relative z-30">
            <div className="bg-white rounded-xl shadow-lg relative z-30">

                {/* Filtros Dinámicos */}
                {showFiltros && (
                    <div className="p-4 border-b bg-gray-50 rounded-t-xl relative z-40">
                        <FilterButtons
                            filtrosDisponibles={filtrosDisponibles}
                            filtroUso={filtroUso}
                            setFiltroUso={setFiltroUso}
                            conteoUso={conteoUso}
                            totalPuntosActivos={puntosActivos.length}
                        />
                    </div>
                )}

                {/* Cuerpo: mapa + panel */}
                <div className={`flex flex-col md:flex-row md:h-[560px] ${showFiltros ? 'rounded-b-xl' : 'rounded-xl'} overflow-hidden relative z-10`}>

                    {/* Mapa — 70% */}
                    <div className="w-full md:w-[70%] h-[400px] md:h-full min-w-0">
                        {shouldRender ? (
                            <MapContainer
                                center={center}
                                zoom={zoom}
                                scrollWheelZoom={true}
                                className="h-full w-full"
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                    maxZoom={18}
                                />

                                 {/* Control de Capas y Capas de Leaflet */}
                                {capas && (
                                    <CapasControl
                                        capas={capas}
                                        setCapasActivas={setCapasActivas}
                                        setFiltroUso={setFiltroUso}
                                        datasets={datasets}
                                        showCapasControl={activeShowCapasControl}
                                    />
                                )}
                            </MapContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 font-medium text-sm">
                                Cargando mapa...
                            </div>
                        )}
                    </div>

                    {/* Panel de detalle — 30% */}
                    <div className="w-full md:w-[30%] h-[380px] md:h-full border-t md:border-t-0 md:border-l border-gray-200 bg-white min-w-0 overflow-hidden">
                        <DetallePunto
                            punto={selectedPunto}
                            onClose={() => setSelectedPunto(null)}
                            instrucciones={instrucciones}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
