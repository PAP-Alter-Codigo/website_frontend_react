// src/pages/colaboradores/loader.ts
export type Temporada = "primavera" | "verano" | "otoño";

export interface ColaboradorEntry {
  year: number;
  season: Temporada;
  name: string;
  categoria: string;
  carrera: string;
  src: string;
  file: string;
}

const modules = import.meta.glob(
  // 👈 todo literal, sin variables
  "/src/assets/colaboradores/*/*/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const SEASON_ORDER: Record<Temporada, number> = {
  primavera: 0,
  verano: 1,
  otoño: 2,
};

function decodeUnderscoreWords(s: string) {
  return s.replace(/_/g, " ").replace(/\s+/g, " ").trim();
}

function parsePath(path: string) {
  const re =
    /\/colaboradores\/(\d{4})\/(primavera|verano|otoño)\/([^/]+)\.(png|jpg|jpeg|webp)$/i;
  const m = path.match(re);
  if (!m) return null;

  const year = Number(m[1]);
  const season = m[2].toLowerCase() as Temporada;
  const filename = m[3];

  const parts = filename.split("-");
  if (parts.length < 3) {
    return { year, season, name: decodeUnderscoreWords(filename), categoria: "", carrera: "" };
  }

  const [rawName, rawCategoria, ...rest] = parts;
  return {
    year,
    season,
    name: decodeUnderscoreWords(rawName),
    categoria: decodeUnderscoreWords(rawCategoria),
    carrera: decodeUnderscoreWords(rest.join("-")),
  };
}

export function loadColaboradores(): ColaboradorEntry[] {
  const out: ColaboradorEntry[] = [];
  for (const [file, url] of Object.entries(modules)) {
    const meta = parsePath(file);
    if (!meta) continue;
    out.push({
      year: meta.year,
      season: meta.season,
      name: meta.name,
      categoria: meta.categoria,
      carrera: meta.carrera,
      src: url,
      file,
    });
  }
  out.sort((a, b) => (b.year !== a.year ? b.year - a.year : SEASON_ORDER[a.season] - SEASON_ORDER[b.season]));
  return out;
}
