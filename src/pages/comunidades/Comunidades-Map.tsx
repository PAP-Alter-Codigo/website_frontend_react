import "leaflet/dist/leaflet.css";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

import bursh1 from "@assets/brushStrokes/img10-3-1.png"; 
import bursh2 from "@assets/brushStrokes/img10-2-4.png"; 

type Categoria =
  | "valles"
  | "lagunas"
  | "centro"
  | "altos"
  | "cienega"
  | "sureste"
  | "sur"
  | "sierra_de_amula"
  | "costa_sur"
  | "costa_sierra_occidental";

type Lugar = {
  name: string;
  lat: number;
  lng: number;
  category: Categoria;
};

const lugares: Lugar[] = [
  { name: "Tequila", lat: 20.8811, lng: -103.835, category: "valles" },
  { name: "Tecolotlán", lat: 20.1894, lng: -104.0694, category: "valles" },
  { name: "Tala", lat: 20.6586, lng: -103.7103, category: "valles" },
  { name: "Sierra de Quila", lat: 20.7667, lng: -103.8833, category: "valles" },

  { name: "Sayula", lat: 19.8769, lng: -103.6053, category: "lagunas" },

  { name: "El Salto", lat: 20.5214, lng: -103.2172, category: "centro" },
  { name: "Santa Cruz de las Flores", lat: 20.5867, lng: -103.56, category: "centro" },
  { name: "Juanacatlán", lat: 20.5117, lng: -103.1764, category: "centro" },
  { name: "Ixtlahuacán del Río", lat: 20.8697, lng: -103.2342, category: "centro" },

  { name: "Santa Catarina Cuexcomatitlán", lat: 20.79, lng: -104.32, category: "altos" },
  { name: "Lagos de Moreno", lat: 21.3558, lng: -101.9311, category: "altos" },
  { name: "San Andrés Cohamiata", lat: 22.035, lng: -104.36, category: "altos" },

  { name: "La Noria", lat: 20.68, lng: -103.35, category: "cienega" },
  { name: "Agua Caliente", lat: 20.45, lng: -102.7, category: "cienega" },

  { name: "Santa Cruz de la Soledad", lat: 20.82, lng: -103.65, category: "sureste" },
  { name: "Mezcala", lat: 20.5258, lng: -103.3478, category: "sureste" },
  { name: "San Antonio Tlayacapan", lat: 20.38, lng: -103.52, category: "sureste" },

  { name: "Sierra de Manantlán", lat: 19.5833, lng: -104.25, category: "sur" },
  { name: "Ciudad Guzmán", lat: 19.7019, lng: -103.4614, category: "sur" },

  { name: "Autlán", lat: 19.77, lng: -104.365, category: "sierra_de_amula" },
  { name: "El Grullo", lat: 19.8089, lng: -104.2206, category: "sierra_de_amula" },

  { name: "Costa Careyes", lat: 19.4439, lng: -105.0414, category: "costa_sur" },

  { name: "Puerto Vallarta", lat: 20.6534, lng: -105.2253, category: "costa_sierra_occidental" },
];

const categoryColors: Record<Categoria, string> = {
  valles: "#332288",
  lagunas: "#6699CC",
  centro: "#0099C6",
  altos: "#44AA99",
  cienega: "#117733",
  sureste: "#66AA00",
  sur: "#FFD700",
  sierra_de_amula: "#FF9900",
  costa_sur: "#DC3912",
  costa_sierra_occidental: "#CC6677",
};

const CATEGORIES: { key: Categoria; label: string }[] = [
  { key: "valles", label: "Valles" },
  { key: "lagunas", label: "Lagunas" },
  { key: "centro", label: "Centro" },
  { key: "altos", label: "Altos" },
  { key: "cienega", label: "Ciénega" },
  { key: "sureste", label: "Sureste" },
  { key: "sur", label: "Sur" },
  { key: "sierra_de_amula", label: "Sierra de Amula" },
  { key: "costa_sur", label: "Costa Sur" },
  { key: "costa_sierra_occidental", label: "Costa Sierra Occidental" },
];

function dotStyle(color: string): React.CSSProperties {
  return {
    backgroundColor: color,
    width: "0.875rem",
    height: "0.875rem",
    borderRadius: "9999px",
  };
}

function makeDivIcon(color: string): DivIcon {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color:${color};width:30px;height:30px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function ComunidadesMap() {
  const [selected, setSelected] = useState<"all" | Categoria>("all");

  const counts = useMemo(() => {
    const acc: Record<Categoria, number> = {
      valles: 0,
      lagunas: 0,
      centro: 0,
      altos: 0,
      cienega: 0,
      sureste: 0,
      sur: 0,
      sierra_de_amula: 0,
      costa_sur: 0,
      costa_sierra_occidental: 0,
    };
    for (const l of lugares) acc[l.category]++;
    return acc;
  }, []);

  const filtered = useMemo(
    () => (selected === "all" ? lugares : lugares.filter((l) => l.category === selected)),
    [selected]
  );

  return (
    <section className="relative py-6">
      {/* Decorativos */}
      <div className="absolute top-70 left-0 -z-30">
        <img src={bursh1} alt="decorativo 1" loading="lazy" />
      </div>
      <div className="absolute top-0 right-0 -z-30">
        <img src={bursh2} alt="decorativo 2" loading="lazy" />
      </div>

      {/* Contenido principal */}
      <div className="flex justify-between">
        <div className="container mx-auto px-4 py-8 w-10/12">
          <div className="pb-5">
            <h1 className="text-4xl font-extrabold text-green-800">MAPA</h1>
            <p className="text-gray-700">
              Mapa del estado de Jalisco donde se muestran todas las comunidades activas del movimiento TerritoRios
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Filtros */}
            <div className="p-6 border-b bg-gray-50">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelected("all")}
                  className={`px-4 py-2 rounded-lg transition ${
                    selected === "all"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  aria-pressed={selected === "all"}
                >
                  Todos ({lugares.length})
                </button>

                {CATEGORIES.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                      selected === key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    aria-pressed={selected === key}
                  >
                    <span className="dot" style={dotStyle(categoryColors[key])} />
                    {label} ({counts[key]})
                  </button>
                ))}
              </div>
            </div>

            {/* Mapa */}
            <div className="h-120">
              <MapContainer
                center={[20.6597, -103.3496]}
                zoom={8}
                scrollWheelZoom={true}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                  maxZoom={18}
                />
                {filtered.map((l) => (
                  <Marker
                    key={l.name}
                    position={[l.lat, l.lng]}
                    icon={makeDivIcon(categoryColors[l.category])}
                  >
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-1">{l.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{l.category.replaceAll("_", " ")}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
