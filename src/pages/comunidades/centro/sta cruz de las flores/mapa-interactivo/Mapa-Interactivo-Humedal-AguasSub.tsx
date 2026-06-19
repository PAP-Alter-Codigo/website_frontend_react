import "leaflet/dist/leaflet.css";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";

import { initializeMapData, getRepdaForPunto } from "./data/loaders";
import { CAPAS, POZO_SOURCE_LAYER_MAP, TOOLTIPS, usoShape, LABELS, colorByUso, makeDivIcon, LeyendaDot } from "./data/constants.tsx";
import type { Punto, Uso } from "./data/types";

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

// ─── Componente principal ─────────────────────────────────────────────────────

export default function MapaInteractivoHumedalAguasSub() {
    const [puntos, setPuntos] = useState<Punto[]>([]);
    const [humedal, setHumedal] = useState<[number, number][]>([]);
    const [filtroUso, setFiltroUso] = useState<"all" | Uso>("all");
    const [selectedPunto, setSelectedPunto] = useState<Punto | null>(null);

    useEffect(() => {
        initializeMapData(POZO_SOURCE_LAYER_MAP).then(({ puntos, humedal }) => {
            setPuntos(puntos);
            setHumedal(humedal);
        }).catch((err) => {
            console.error("Error loading map data:", err);
        });
    }, []);

    const filtered = useMemo(
        () =>
            filtroUso === "all"
                ? puntos
                : puntos.filter((p: Punto) => p.uso === filtroUso),
        [filtroUso, puntos]
    );

    const conteoUso = useMemo(() => {
        const acc = {} as Record<Uso, number>;
        for (const c of CAPAS) acc[c.key] = 0;
        for (const p of puntos) acc[p.uso] = (acc[p.uso] ?? 0) + 1;
        return acc;
    }, [puntos]);

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

    return (
        <section className="w-full">
            <div className="bg-white rounded-xl shadow-lg">

                {/* Filtros */}
                <div className="p-4 border-b bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFiltroUso("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                filtroUso === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                            aria-pressed={filtroUso === "all"}
                        >
                            Todos ({puntos.length})
                        </button>

                        {CAPAS.map(({ key, label, color }) => (
                            <button
                                key={key}
                                onClick={() => setFiltroUso(key)}
                                className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                                    filtroUso === key
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

                            {/* Polígono del Humedal */}
                            {humedal.length > 0 && (
                                <Polygon
                                    positions={humedal}
                                    pathOptions={{
                                        color: "#0ea5e9",
                                        fillColor: "#7dd3fc",
                                        fillOpacity: 0.35,
                                        weight: 2,
                                    }}
                                >
                                    <Popup>
                                        <div className="text-center min-w-[120px]">
                                            <p className="font-bold text-base">Humedal 2020</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Área de humedal documentada en 2020
                                            </p>
                                        </div>
                                    </Popup>
                                </Polygon>
                            )}

                            {/* Puntos de aguas subterráneas */}
                            {filtered.map((p: Punto, i: number) => (
                                <Marker
                                    key={p.name + i}
                                    position={[p.lat, p.lng]}
                                    icon={makeDivIcon(colorByUso[p.uso] ?? "#6b7280", usoShape[p.uso] ?? "circle")}
                                    eventHandlers={{
                                        click: () => handleMarkerClick(p),
                                    }}
                                >
                                    <Popup>
                                        <div className="text-center min-w-[120px]">
                                            <p className="font-bold text-sm">{p.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{p.uso}</p>
                                            <p className="text-xs text-blue-600 mt-1 cursor-pointer">
                                                Ver detalle →
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
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
