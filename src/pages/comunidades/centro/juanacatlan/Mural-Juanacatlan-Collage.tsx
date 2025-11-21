// src/components/VariedCollage.tsx
import { useMemo } from "react";

type Item = { src: string; alt?: string; href?: string; caption?: string };
type Props = {
  images: Item[];
  className?: string;
  // "auto" elige un patrón según el número de imágenes; o fuerza "A" | "B" | "C"
  layout?: "auto" | "A" | "B" | "C";
  rowHeightRem?: number; // altura base de fila (default 8)
};

type Tile = { c: number; w: number; h: number }; // columnStart, colSpan, rowSpan
type Pattern = Tile[];

// ========= PATRONES (pensados para 6–7 imágenes) =========
// Grid 12 cols (md:+). En móvil se apila (col-1).
// A — inspirado en tu dibujo
const PATTERN_A_6: Pattern = [
  // fila 1 (--------)
  { c: 1,  w: 12, h: 2 },
  // fila 2 (--- ----)
  { c: 1,  w: 4,  h: 2 },
  { c: 7,  w: 6,  h: 2 },
  // fila 3 (-- -- --)
  { c: 1,  w: 4,  h: 2 },
  { c: 5,  w: 4,  h: 2 },
  { c: 9,  w: 4,  h: 2 },
  // fila 4 (--------)
  // (ya usamos 6 imágenes arriba)
];

const PATTERN_A_7: Pattern = [
  { c: 1,  w: 12, h: 2 },
  { c: 1,  w: 4,  h: 2 },
  { c: 7,  w: 6,  h: 2 },
  { c: 1,  w: 4,  h: 2 },
  { c: 5,  w: 4,  h: 2 },
  { c: 9,  w: 4,  h: 2 },
  // fila 4 (----- --)
  { c: 1,  w: 8,  h: 2 },
  { c: 9,  w: 4,  h: 2 },
];

// B — hero arriba, dos medianas, banner abajo
const PATTERN_B_6: Pattern = [
  { c: 1,  w: 12, h: 3 }, // hero
  { c: 1,  w: 6,  h: 2 },
  { c: 7,  w: 6,  h: 2 },
  { c: 1,  w: 4,  h: 2 },
  { c: 5,  w: 4,  h: 2 },
  { c: 9,  w: 4,  h: 2 },
];

const PATTERN_B_7: Pattern = [
  { c: 1,  w: 8,  h: 3 },
  { c: 9,  w: 4,  h: 2 },
  { c: 9,  w: 4,  h: 1 },
  { c: 1,  w: 4,  h: 2 },
  { c: 5,  w: 4,  h: 2 },
  { c: 9,  w: 4,  h: 2 },
  { c: 1,  w: 12, h: 2 }, // banner
];

// C — escalones
const PATTERN_C_6: Pattern = [
  { c: 1,  w: 8,  h: 3 },
  { c: 9,  w: 4,  h: 2 },
  { c: 1,  w: 4,  h: 2 },
  { c: 5,  w: 4,  h: 2 },
  { c: 9,  w: 4,  h: 2 },
  { c: 1,  w: 12, h: 2 },
];

const PATTERN_C_7: Pattern = [
  { c: 1,  w: 8,  h: 3 },
  { c: 9,  w: 4,  h: 2 },
  { c: 1,  w: 4,  h: 2 },
  { c: 5,  w: 4,  h: 2 },
  { c: 9,  w: 4,  h: 2 },
  { c: 1,  w: 8,  h: 2 },
  { c: 9,  w: 4,  h: 2 },
];

// Selección por tamaño y layout
function pickPattern(count: number, layout: "A" | "B" | "C"): Pattern {
  const n = Math.min(Math.max(count, 1), 7);
  const is7 = n >= 7;

  if (layout === "A") return is7 ? PATTERN_A_7 : PATTERN_A_6;
  if (layout === "B") return is7 ? PATTERN_B_7 : PATTERN_B_6;
  return is7 ? PATTERN_C_7 : PATTERN_C_6;
}

export default function MuralJuanacatlanCollage({
  images,
  className = "",
  layout = "auto",
  rowHeightRem = 8,
}: Props) {
  const count = images?.length || 0;
  if (!count) return null;

  const chosenLayout = useMemo<"A" | "B" | "C">(() => {
    if (layout !== "auto") return layout;
    // elige por conteo (y un poco de variación)
    if (count % 3 === 1) return "B";
    if (count % 3 === 2) return "C";
    return "A";
  }, [count, layout]);

  const pattern = useMemo(() => pickPattern(count, chosenLayout), [count, chosenLayout]);
  const tiles = pattern.slice(0, Math.min(pattern.length, count));
  const safe = images.slice(0, tiles.length);

  return (
    <section className={`w-full ${className}`}>
      <div
        className={`
          grid grid-cols-1 gap-4
          md:grid-cols-12
        `}
        style={{ gridAutoRows: `${rowHeightRem}rem` }}
      >
        {safe.map((img, i) => {
          const t = tiles[i];
          const figure = (
            <figure
              className="relative w-full h-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
              style={{
                // en móvil ocupa 1 col, en md+ ubicamos
                gridColumn: `span 1`,
                gridRow: `span ${t.h}`,
              }}
            >
              <img
                src={img.src}
                alt={img.alt || `imagen ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              {img.caption && (
                <figcaption className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/60 to-transparent text-white text-sm px-3 py-2">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          );

          return (
            <div
              key={img.src + i}
              className="md:contents"
              // En md+ colocamos cada tile en su columna/colspan
              style={
                {
                  "--gc": `${t.c} / span ${t.w}`,
                } as React.CSSProperties
              }
            >
              <div
                className="hidden md:block"
                style={{
                  gridColumn: `var(--gc)`,
                  gridRow: `span ${t.h}`,
                }}
              >
                {img.href ? (
                  <a href={img.href} target="_blank" rel="noreferrer">
                    {figure}
                  </a>
                ) : (
                  figure
                )}
              </div>

              {/* móvil: ocupa 1 columna y se apila */}
              <div className="md:hidden">{img.href ? <a href={img.href}>{figure}</a> : figure}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
