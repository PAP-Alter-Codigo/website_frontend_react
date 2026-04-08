import "leaflet/dist/leaflet.css";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { DivIcon } from "leaflet";

// ─── GeoJSON ────────────────────────────────────────────────────────────────
import { GEOJSON } from './MapaGEOJsonPosos'


// ─── Tipos y datos derivados ─────────────────────────────────────────────────

type Capa =
    | "Pozos profundos y norias de riego"
    | "Pozos Domo sur la Primavera"
    | "Pozos para uso doméstico";

type Shape = "circle" | "square" | "hexagon";

const CAPAS: { key: Capa; label: string; color: string; shape: Shape }[] = [
    {
        key: "Pozos profundos y norias de riego",
        label: "Pozos profundos y norias de riego",
        color: "#1d4ed8",
        shape: "circle",
    },
    {
        key: "Pozos Domo sur la Primavera",
        label: "Pozos Domo sur La Primavera",
        color: "#15803d",
        shape: "square",
    },
    {
        key: "Pozos para uso doméstico",
        label: "Pozos para uso doméstico",
        color: "#b45309",
        shape: "hexagon",
    },
];

const colorMap: Record<Capa, string> = Object.fromEntries(
    CAPAS.map(({ key, color }) => [key, color])
) as Record<Capa, string>;

const shapeMap: Record<Capa, Shape> = Object.fromEntries(
    CAPAS.map(({ key, shape }) => [key, shape])
) as Record<Capa, Shape>;

type Punto = {
    name: string;
    lat: number;
    lng: number;
    capa: Capa;
};

const puntos: Punto[] = GEOJSON.features
    .filter((f) => f.geometry.type === "Point")
    .map((f) => ({
        name: f.properties.Name,
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
        capa: f.properties.source_layer as Capa,
    }));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeDivIcon(color: string, shape: Shape): DivIcon {
    let html: string;
    if (shape === "circle") {
        html = `<div style="background-color:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`;
    } else if (shape === "square") {
        html = `<div style="background-color:${color};width:14px;height:14px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`;
    } else {
        // hexagon via SVG
        html = `<svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"><polygon points="9,0.5 16.5,4.25 16.5,11.75 9,15.5 1.5,11.75 1.5,4.25" fill="${color}" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
    }
    return L.divIcon({
        className: "custom-marker",
        html,
        iconSize: [18, 16],
        iconAnchor: [9, 8],
    });
}

function ShapeIndicator({ color, shape }: { color: string; shape: Shape }) {
    if (shape === "circle") {
        return (
            <span style={{
                display: "inline-block",
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "9999px",
                backgroundColor: color,
                flexShrink: 0,
            }} />
        );
    }
    if (shape === "square") {
        return (
            <span style={{
                display: "inline-block",
                width: "0.75rem",
                height: "0.75rem",
                backgroundColor: color,
                flexShrink: 0,
            }} />
        );
    }
    // hexagon
    return (
        <svg width="13" height="12" viewBox="0 0 13 12" style={{ flexShrink: 0 }}>
            <polygon points="6.5,0.5 12,3.25 12,8.75 6.5,11.5 1,8.75 1,3.25" fill={color} />
        </svg>
    );
}

// ─── Componente ──────────────────────────────────────────────────────────────

export default function MapaInteractivoPososCombinados() {
    const [selected, setSelected] = useState<"all" | Capa>("all");

    const counts = useMemo(() => {
        const acc = {} as Record<Capa, number>;
        for (const c of CAPAS) acc[c.key] = 0;
        for (const p of puntos) acc[p.capa]++;
        return acc;
    }, []);

    const filtered = useMemo(
        () => (selected === "all" ? puntos : puntos.filter((p) => p.capa === selected)),
        [selected]
    );

    return (
        <section className="w-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                {/* Filtros */}
                <div className="p-4 border-b bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelected("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selected === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                            aria-pressed={selected === "all"}
                        >
                            Todos ({puntos.length})
                        </button>

                        {CAPAS.map(({ key, label, color, shape }) => (
                            <button
                                key={key}
                                onClick={() => setSelected(key)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${selected === key
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                                aria-pressed={selected === key}
                            >
                                <ShapeIndicator color={color} shape={shape} />
                                {label} ({counts[key]})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mapa */}
                <div className="h-[520px]">
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

                        {filtered.map((p, i) => (
                            <Marker
                                key={p.name + i}
                                position={[p.lat, p.lng]}
                                icon={makeDivIcon(colorMap[p.capa], shapeMap[p.capa])}
                            >
                                <Popup>
                                    <div className="text-center min-w-[120px]">
                                        <p className="font-bold text-base">Pozo {p.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{p.capa}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
}
