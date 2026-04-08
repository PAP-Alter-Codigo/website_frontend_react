import "leaflet/dist/leaflet.css";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L, { DivIcon } from "leaflet";

import { GEOJSON_HUMEDAL, repdaByTitulo, type RepdaEntry } from "./MapaGEOJsonHumedal";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Uso =
    | "INDUSTRIAL"
    | "AGRICOLA"
    | "PUBLICO URBANO"
    | "SERVICIOS"
    | "PECUARIO"
    | "DOMESTICO";

type Punto = {
    name: string;
    lat: number;
    lng: number;
    uso: Uso;
    repda: RepdaEntry | null;
};

// ─── Capas / filtros ──────────────────────────────────────────────────────────

const CAPAS: { key: Uso; label: string; color: string }[] = [
    { key: "INDUSTRIAL",    label: "Industrial",      color: "#b45309" },
    { key: "AGRICOLA",      label: "Agrícola",        color: "#15803d" },
    { key: "PUBLICO URBANO",label: "Público urbano",  color: "#1d4ed8" },
    { key: "SERVICIOS",     label: "Servicios",       color: "#7c3aed" },
    { key: "PECUARIO",      label: "Pecuario",        color: "#0f766e" },
    { key: "DOMESTICO",     label: "Doméstico",       color: "#db2777" },
];

const colorByUso: Record<Uso, string> = Object.fromEntries(
    CAPAS.map(({ key, color }) => [key, color])
) as Record<Uso, string>;

// ─── Datos derivados ──────────────────────────────────────────────────────────

const features = GEOJSON_HUMEDAL.features as unknown as {
    type: string;
    properties: { Name: string; source_layer: string };
    geometry: {
        type: string;
        coordinates: number[][] | number[][][] | number[][][][];
    };
}[];

const humedal: [number, number][] = (() => {
    const feat = features.find((f) => f.geometry.type === "Polygon");
    if (!feat) return [];
    const ring = (feat.geometry.coordinates as number[][][])[0];
    return ring.map(([lng, lat]) => [lat, lng] as [number, number]);
})();

const puntos: Punto[] = features
    .filter((f) => f.geometry.type === "Point")
    .map((f) => {
        const coords = f.geometry.coordinates as unknown as number[];
        const repda = repdaByTitulo[f.properties.Name] ?? null;
        const uso = (repda?.USO ?? "SERVICIOS") as Uso;
        return {
            name: f.properties.Name,
            lat: coords[1],
            lng: coords[0],
            uso,
            repda,
        };
    });

const conteoUso: Record<Uso, number> = (() => {
    const acc = {} as Record<Uso, number>;
    for (const c of CAPAS) acc[c.key] = 0;
    for (const p of puntos) acc[p.uso] = (acc[p.uso] ?? 0) + 1;
    return acc;
})();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeDivIcon(color: string): DivIcon {
    return L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });
}

function LeyendaDot({ color }: { color: string }) {
    return (
        <span
            style={{
                display: "inline-block",
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "9999px",
                backgroundColor: color,
                flexShrink: 0,
            }}
        />
    );
}

// ─── Panel de detalle ─────────────────────────────────────────────────────────

const LABELS: { key: keyof RepdaEntry; label: string }[] = [
    { key: "TITULO",         label: "Título" },
    { key: "ACUIFERO",       label: "Acuífero" },
    { key: "CUENCA",         label: "Cuenca" },
    { key: "NOMREGHID",      label: "Región hidrológica" },
    { key: "USO",            label: "Uso" },
    { key: "VOLSB",          label: "Vol. subterráneo (m³/año)" },
    { key: "CLAVE_ACUIFERO", label: "Clave acuífero" },
    { key: "OC",             label: "Oficina central (OC)" },
];

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
    const [filtroUso, setFiltroUso] = useState<"all" | Uso>("all");
    const [selectedPunto, setSelectedPunto] = useState<Punto | null>(null);

    const filtered = useMemo(
        () =>
            filtroUso === "all"
                ? puntos
                : puntos.filter((p) => p.uso === filtroUso),
        [filtroUso]
    );

    return (
        <section className="w-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

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
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                                    filtroUso === key
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                                aria-pressed={filtroUso === key}
                            >
                                <LeyendaDot color={color} />
                                {label} ({conteoUso[key] ?? 0})
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
                            {filtered.map((p, i) => (
                                <Marker
                                    key={p.name + i}
                                    position={[p.lat, p.lng]}
                                    icon={makeDivIcon(colorByUso[p.uso] ?? "#6b7280")}
                                    eventHandlers={{
                                        click: () => setSelectedPunto(p),
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
