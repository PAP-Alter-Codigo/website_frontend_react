import { useMemo } from "react";

type Item = { src: string; alt?: string; href?: string; caption?: string };
type Props = {
  images: Item[];
  className?: string;
  rowHeightRem?: number;
};

type Tile = { col: number; colSpan: number; rowSpan: number };

// Secuencia de filas que se repite para cualquier número de imágenes.
// Cada entrada define los anchos (en columnas de 12) y la altura en unidades de fila.
type RowDef = { widths: number[]; height: number };

const ROW_SEQUENCE: RowDef[] = [
  { widths: [12],      height: 3 }, // hero completo
  { widths: [4, 4, 4], height: 2 }, // tercios
  { widths: [6, 6],    height: 2 }, // mitades
  { widths: [8, 4],    height: 3 }, // hero + lado
  { widths: [4, 4, 4], height: 2 }, // tercios
  { widths: [4, 8],    height: 3 }, // lado + hero
  { widths: [6, 6],    height: 2 }, // mitades
  { widths: [4, 4, 4], height: 2 }, // tercios
];

function redistributeWidths(count: number): number[] {
  if (count === 1) return [12];
  if (count === 2) return [6, 6];
  return [4, 4, 4]; // 3
}

function generateTiles(count: number): Tile[] {
  const tiles: Tile[] = [];
  let remaining = count;
  let seqIdx = 0;

  while (remaining > 0) {
    const row = ROW_SEQUENCE[seqIdx % ROW_SEQUENCE.length];
    const imagesInRow = Math.min(row.widths.length, remaining);
    const widths =
      imagesInRow === row.widths.length
        ? row.widths
        : redistributeWidths(imagesInRow);

    let col = 1;
    for (const w of widths) {
      tiles.push({ col, colSpan: w, rowSpan: row.height });
      col += w;
    }

    remaining -= imagesInRow;
    seqIdx++;
  }

  return tiles;
}

export default function MuralJuanacatlanCollage({
  images,
  className = "",
  rowHeightRem = 8,
}: Props) {
  const count = images?.length || 0;
  if (!count) return null;

  const tiles = useMemo(() => generateTiles(count), [count]);

  return (
    <section className={`w-full ${className}`}>
      {/* Móvil: columna única */}
      <div className="flex flex-col gap-4 md:hidden">
        {images.map((img, i) => (
          <ImageCard key={img.src + i} img={img} index={i} style={{ height: `${rowHeightRem * 2}rem` }} />
        ))}
      </div>

      {/* md+: grid de 12 columnas */}
      <div
        className="hidden md:grid md:grid-cols-12 gap-4"
        style={{ gridAutoRows: `${rowHeightRem}rem` }}
      >
        {images.map((img, i) => {
          const t = tiles[i];
          return (
            <div
              key={img.src + i}
              style={{
                gridColumn: `${t.col} / span ${t.colSpan}`,
                gridRow: `span ${t.rowSpan}`,
              }}
            >
              <ImageCard img={img} index={i} style={{ height: "100%" }} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ImageCard({
  img,
  index,
  style,
}: {
  img: Item;
  index: number;
  style?: React.CSSProperties;
}) {
  const figure = (
    <figure
      className="relative w-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
      style={style}
    >
      <img
        src={img.src}
        alt={img.alt || `imagen ${index + 1}`}
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

  if (img.href) {
    return (
      <a href={img.href} target="_blank" rel="noreferrer" className="block h-full">
        {figure}
      </a>
    );
  }
  return figure;
}
