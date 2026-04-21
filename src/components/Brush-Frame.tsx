import { useMemo } from "react";
import type { FC, ReactNode } from "react";

/* ────────────────────────────────────────────
   Helpers de color (misma lógica que BrushCard)
──────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
    const clean = hex.replace("#", "");
    const full =
        clean.length === 3
            ? clean.split("").map((c) => c + c).join("")
            : clean;
    const num = parseInt(full, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
    return (
        "#" +
        [r, g, b]
            .map((v) =>
                Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, "0")
            )
            .join("")
    );
}

function shift(value: number, amount: number): number {
    return Math.min(255, Math.max(0, value + amount));
}

interface BrushPalette {
    shadow: string;
    mid: string;
    primary: string;
    highlight: string;
}

/**
 * Genera 4 tonos desde un color base:
 *  shadow    → -90  (muy oscuro, primer trazo)
 *  mid       → -40  (oscuro, segunda capa)
 *  primary   →  0   (el color base)
 *  highlight → +70  (claro, capa interior)
 */
function buildPalette(hex: string): BrushPalette {
    const [r, g, b] = hexToRgb(hex);
    return {
        shadow: rgbToHex(shift(r, -90), shift(g, -90), shift(b, -90)),
        mid: rgbToHex(shift(r, -40), shift(g, -40), shift(b, -40)),
        primary: hex,
        highlight: rgbToHex(shift(r, 70), shift(g, 70), shift(b, 70)),
    };
}

/* ────────────────────────────────────────────
   Interface del componente
──────────────────────────────────────────── */

export interface BrushFrameProps {
    /** Contenido que quedará dentro del marco */
    children: ReactNode;
    /**
     * Color base del marco en hex.
     * La sombra, tono medio y brillo se derivan automáticamente.
     * @default "#D4A840"
     */
    color?: string;
    /**
     * Grosor de los trazos principales en px.
     * Los trazos de sombra y brillo escalan proporcionalmente.
     * @default 28
     */
    strokeWidth?: number;
    /**
     * Intensidad de la distorsión del efecto pincelada (0–30).
     * Valores altos = trazos más irregulares/orgánicos.
     * @default 18
     */
    roughness?: number;
    /** Clases de Tailwind extras para el contenedor exterior */
    className?: string;
}

/* ────────────────────────────────────────────
   Componente principal
──────────────────────────────────────────── */

/**
 * BrushFrame — Marco de pinceladas gruesas que envuelve cualquier contenido HTML/JSX.
 *
 * El marco usa 5 capas SVG superpuestas con diferentes filtros feTurbulence
 * para crear profundidad y una apariencia orgánica de pincelada real.
 * El contenido se renderiza dentro del área interior, sin recortes.
 */
const BrushFrame: FC<BrushFrameProps> = ({
    children,
    color = "#D4A840",
    strokeWidth = 28,
    roughness = 18,
    className = "",
}) => {
    const id = useMemo(
        () => `bf-${Math.random().toString(36).slice(2, 7)}`,
        []
    );

    const p = useMemo(() => buildPalette(color), [color]);

    // Los IDs de filtro deben ser únicos por instancia para evitar
    // colisiones cuando hay múltiples BrushFrame en la misma página.
    const f = {
        outer: `${id}-f-outer`,
        mid: `${id}-f-mid`,
        inner: `${id}-f-inner`,
        accent: `${id}-f-accent`,
        glow: `${id}-f-glow`,
    };

    // El SVG usa un viewBox fijo de 600×460. El padding del wrapper
    // (padding: strokeWidth * 2.2) asegura que los trazos nunca tapen el contenido.
    const pad = Math.round(strokeWidth * 2.2);

    return (
        <div
            className={className}
            style={{ position: "relative", display: "inline-block", padding: pad }}
        >
            {/* Contenido del usuario */}
            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>

            {/* Marco SVG — cubre todo el contenedor incluyendo el padding */}
            <svg
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                    pointerEvents: "none",
                    zIndex: 2,
                }}
                preserveAspectRatio="none"
                viewBox="0 0 600 460"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Capa 1 — sombra exterior muy áspera */}
                    <filter id={f.outer} x="-25%" y="-25%" width="150%" height="150%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={`${0.012 + roughness * 0.0004} ${0.018 + roughness * 0.0006}`}
                            numOctaves={5}
                            seed={7}
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={roughness * 1.4}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>

                    {/* Capa 2 — tono medio, desplazamiento diferente para variar el contorno */}
                    <filter id={f.mid} x="-25%" y="-25%" width="150%" height="150%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={`${0.015 + roughness * 0.0003} ${0.022 + roughness * 0.0005}`}
                            numOctaves={4}
                            seed={23}
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={roughness * 1.0}
                            xChannelSelector="G"
                            yChannelSelector="R"
                        />
                    </filter>

                    {/* Capa 3 — color primario, movimiento suave */}
                    <filter id={f.inner} x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={`${0.018 + roughness * 0.0003} ${0.028 + roughness * 0.0004}`}
                            numOctaves={4}
                            seed={41}
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={roughness * 0.7}
                            xChannelSelector="R"
                            yChannelSelector="B"
                        />
                    </filter>

                    {/* Capa 4 — acento diagonal, simula la dirección de la brocha */}
                    <filter id={f.accent} x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence
                            type="turbulence"
                            baseFrequency={`${0.022 + roughness * 0.0002} ${0.01 + roughness * 0.0002}`}
                            numOctaves={3}
                            seed={63}
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={roughness * 0.55}
                            xChannelSelector="G"
                            yChannelSelector="B"
                        />
                    </filter>

                    {/* Capa 5 — brillo interior, muy fino */}
                    <filter id={f.glow} x="-15%" y="-15%" width="130%" height="130%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={`${0.025 + roughness * 0.0002} ${0.035 + roughness * 0.0003}`}
                            numOctaves={3}
                            seed={89}
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={roughness * 0.35}
                            xChannelSelector="B"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>

                {/* ── Capa 1: sombra exterior ── */}
                <rect
                    x="4" y="4" width="592" height="452" rx="6"
                    fill="none"
                    stroke={p.shadow}
                    strokeWidth={strokeWidth * 2.6}
                    filter={`url(#${f.outer})`}
                    opacity="0.55"
                />

                {/* ── Capa 2: tono medio ── */}
                <rect
                    x="8" y="8" width="584" height="444" rx="6"
                    fill="none"
                    stroke={p.mid}
                    strokeWidth={strokeWidth * 1.9}
                    filter={`url(#${f.mid})`}
                    opacity="0.75"
                />

                {/* ── Capa 3: color primario principal ── */}
                <rect
                    x="10" y="10" width="580" height="440" rx="6"
                    fill="none"
                    stroke={p.primary}
                    strokeWidth={strokeWidth * 1.3}
                    filter={`url(#${f.inner})`}
                    opacity="0.92"
                />

                {/* ── Capa 4: acento direccional ── */}
                <rect
                    x="12" y="12" width="576" height="436" rx="6"
                    fill="none"
                    stroke={p.primary}
                    strokeWidth={strokeWidth * 0.85}
                    filter={`url(#${f.accent})`}
                    opacity="0.6"
                />

                {/* ── Capa 5: brillo interior ── */}
                <rect
                    x="16" y="16" width="568" height="428" rx="4"
                    fill="none"
                    stroke={p.highlight}
                    strokeWidth={strokeWidth * 0.45}
                    filter={`url(#${f.glow})`}
                    opacity="0.5"
                />
            </svg>
        </div>
    );
};

export default BrushFrame;

/*
────────────────────────────────────────────────────────
 EJEMPLO DE USO
────────────────────────────────────────────────────────

import BrushFrame from "./BrushFrame";

// Uso básico con color:
<BrushFrame color="#C0392B">
  <img src="/mi-foto.jpg" alt="..." />
</BrushFrame>

// Con más opciones:
<BrushFrame
  color="#2E86AB"
  strokeWidth={36}
  roughness={22}
  className="my-8"
>
  <div className="p-6 text-center">
    <h2>Título</h2>
    <p>Cualquier contenido aquí...</p>
  </div>
</BrushFrame>

// Ajuste fino de roughness:
//  roughness={8}  → trazos más controlados / caligráficos
//  roughness={25} → trazos muy sueltos / expresionistas
────────────────────────────────────────────────────────
*/