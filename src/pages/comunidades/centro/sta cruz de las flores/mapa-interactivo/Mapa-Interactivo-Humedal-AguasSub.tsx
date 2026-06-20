import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { initializeMapData, getRepdaForPunto } from "./data/loaders";
import { CAPAS, POZO_SOURCE_LAYER_MAP, TOOLTIPS, usoShape, LABELS, colorByUso, LeyendaDot } from "./data/constants.tsx";
import type { Punto, Uso, CapasEstructura } from "./data/types";

// ─── Componente para mostrar el detalle de un punto seleccionado, incluyendo su información REPDA si está disponible ───────────────────────
function DetallePunto({
    punto,
    onClose,
}: {
    punto: Punto | null;
    onClose: () => void;
}) {
    if (!punto) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 px-6 text-center">
                <svg
                    width="40"
                    height="40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
                </svg>
                <p className="text-sm">
                    Haz clic en un punto del mapa para ver su detalle.
                </p>
            </div>
        );
    }

    const color = colorByUso[punto.uso] ?? "#6b7280";

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-3 text-white"
                style={{ backgroundColor: color }}
            >
                <div>
                    <p className="text-xs font-medium opacity-80">Aguas subterráneas — REPDA</p>
                    <p className="text-base font-bold leading-tight">{punto.name}</p>
                </div>
                <button
                    onClick={onClose}
                    className="ml-2 rounded-full p-1 hover:bg-white/20 transition"
                    aria-label="Cerrar detalle"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>
            </div>

            {/* Contenido */}
            {punto.repda ? (
                <dl className="divide-y divide-gray-100 text-sm">
                    {LABELS.map(({ key, label }) => (
                        <div key={key} className="flex flex-col px-4 py-2">
                            <dt className="text-xs text-gray-500 font-medium">{label}</dt>
                            <dd className="text-gray-800 font-semibold mt-0.5">
                                {punto.repda![key] || "—"}
                            </dd>
                        </div>
                    ))}
                </dl>
            ) : (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                    Este punto no tiene datos en el registro REPDA.
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
}: {
    capas: CapasEstructura;
    setCapasActivas: React.Dispatch<React.SetStateAction<Set<string>>>;
    setFiltroUso: React.Dispatch<React.SetStateAction<"all" | Uso>>;
}) {
    const map = useMap();

    useEffect(() => {
        if (!map || !capas) return;

        // Inicializamos el control de capas de Leaflet en la posición superior izquierda
        const controlLayers = L.control.layers(undefined, undefined, {
            position: "topleft",
            collapsed: true,
        });

        // Agregamos cada capa al mapa y las registramos en el control como overlay por defecto
        Object.entries(capas).forEach(([name, capa]) => {
            capa.layerGroup.addTo(map);
            controlLayers.addOverlay(capa.layerGroup, name);
        });

        controlLayers.addTo(map);

        // Al iniciar, todas las capas están activadas
        setCapasActivas(new Set(Object.keys(capas)));

        // Eventos para actualizar la visibilidad en React al marcar/desmarcar en el control de Leaflet
        const handleOverlayAdd = (e: L.LayersControlEvent) => {
            setCapasActivas((prev) => {
                const next = new Set(prev);
                next.add(e.name);
                return next;
            });
        };

        const handleOverlayRemove = (e: L.LayersControlEvent) => {
            setCapasActivas((prev) => {
                const next = new Set(prev);
                next.delete(e.name);
                return next;
            });
        };

        map.on("overlayadd", handleOverlayAdd);
        map.on("overlayremove", handleOverlayRemove);

        return () => {
            controlLayers.remove();
            Object.values(capas).forEach((capa) => {
                capa.layerGroup.remove();
            });
            map.off("overlayadd", handleOverlayAdd);
            map.off("overlayremove", handleOverlayRemove);
        };
    }, [map, capas, setCapasActivas, setFiltroUso]);

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
        <div className="flex flex-wrap gap-2">
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
                            className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-gray-50 text-gray-900 text-sm rounded-lg w-52 shadow-xl border border-gray-200 z-50 transition-all opacity-0 group-hover:opacity-100 pointer-events-none whitespace-normal leading-snug font-medium"
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

export default function MapaInteractivoHumedalAguasSub() {
    const [capas, setCapas] = useState<CapasEstructura | null>(null);
    const [, setPuntos] = useState<Punto[]>([]);
    const [, setHumedal] = useState<[number, number][]>([]);

    // Estado de las capas activas sincronizadas con el control de Leaflet
    const [capasActivas, setCapasActivas] = useState<Set<string>>(new Set());

    // Estado para el filtro de uso actual
    const [filtroUso, setFiltroUso] = useState<"all" | Uso>("all");
    const [selectedPunto, setSelectedPunto] = useState<Punto | null>(null);

    // Carga inicial de datos desde los GeoJSONs y REPDA metadata
    useEffect(() => {
        initializeMapData(POZO_SOURCE_LAYER_MAP).then(({ capas, puntos, humedal }) => {
            setCapas(capas);
            setPuntos(puntos);
            setHumedal(humedal);
        }).catch((err) => {
            console.error("Error loading map data:", err);
        });
    }, []);

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

    // Vincula el listener de click a los marcadores de Leaflet una vez cargados
    useEffect(() => {
        if (!capas) return;

        Object.values(capas).forEach((capa) => {
            capa.puntos.forEach((punto) => {
                if (punto.marker) {
                    punto.marker.off("click");
                    punto.marker.on("click", () => {
                        punto.marker!.openPopup();
                        markerClickRef.current(punto);
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
            if (name === "Humedal 2020") return;

            capa.layerGroup.clearLayers();
            capa.puntos.forEach((punto) => {
                if (filtroUso === "all" || punto.uso === filtroUso) {
                    if (punto.marker) {
                        capa.layerGroup.addLayer(punto.marker);
                    }
                }
            });
        });
    }, [capas, filtroUso]);

    return (
        <section className="w-full">
            <div className="bg-white rounded-xl shadow-lg">

                {/* Filtros Dinámicos */}
                <div className="p-4 border-b bg-gray-50">
                    <FilterButtons
                        filtrosDisponibles={filtrosDisponibles}
                        filtroUso={filtroUso}
                        setFiltroUso={setFiltroUso}
                        conteoUso={conteoUso}
                        totalPuntosActivos={puntosActivos.length}
                    />
                </div>

                {/* Cuerpo: mapa + panel */}
                <div className="flex" style={{ height: "560px" }}>

                    {/* Mapa — 70% */}
                    <div className="flex-7 min-w-0">
                        <MapContainer
                            center={[20.476, -103.506]}
                            zoom={11}
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
                                />
                            )}
                        </MapContainer>
                    </div>

                    {/* Panel de detalle — 30% */}
                    <div className="flex-3 border-l border-gray-200 bg-white min-w-0 overflow-hidden">
                        <DetallePunto
                            punto={selectedPunto}
                            onClose={() => setSelectedPunto(null)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
