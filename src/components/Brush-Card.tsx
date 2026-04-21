import { useState, useRef, useCallback } from "react";
import type { FC, ReactNode, MouseEvent } from "react";

/* ────────────────────────────────────────────
   Interfaces y tipos
──────────────────────────────────────────── */

interface BrushColors {
    /** Color principal del trazo (hex) */
    primaryColor?: string;
    /** Color de la sombra exterior del trazo (hex) */
    shadowColor?: string;
    /** Color del borde interior sutil (hex) */
    highlightColor?: string;
}

interface BrushBorderProps extends Required<BrushColors> {
    /** ID único para el primer filtro SVG (debe ser único en el DOM) */
    filterId1: string;
    /** ID único para el segundo filtro SVG (debe ser único en el DOM) */
    filterId2: string;
}

interface TiltState {
    x: number;
    y: number;
}

export interface BrushCardProps {
    /** URL de la imagen frontal */
    frontImage?: string;
    /** URL de la imagen posterior */
    backImage?: string;
    /** Contenido JSX para el frente (alternativa a frontImage) */
    frontContent?: ReactNode;
    /** Contenido JSX para el reverso (alternativa a backImage) */
    backContent?: ReactNode;
    /** Ancho de la carta en px (default: 260) */
    width?: number;
    /** Alto de la carta en px (default: 380) */
    height?: number;
    /** Ángulo máximo del efecto 3D en grados (default: 16) */
    tiltIntensity?: number;
    /** Colores del borde pincelado del frente */
    frontBrush?: BrushColors;
    /** Colores del borde pincelado del reverso */
    backBrush?: BrushColors;
}

/* ────────────────────────────────────────────
   Subcomponente: borde con efecto pincelada
──────────────────────────────────────────── */

/**
 * BrushBorder — SVG con borde estilo pincelada usando feTurbulence + feDisplacementMap.
 * Genera un efecto orgánico/pintado alrededor de la carta.
 */
const BrushBorder: FC<BrushBorderProps> = ({
    filterId1,
    filterId2,
    primaryColor,
    shadowColor,
    highlightColor,
}) => (
    <svg
        style={{
            position: "absolute",
            inset: "-13px",
            width: "calc(100% + 26px)",
            height: "calc(100% + 26px)",
            pointerEvents: "none",
            zIndex: 10,
            overflow: "visible",
        }}
        viewBox="0 0 286 406"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            {/* Filtro exterior: mayor desplazamiento, más "irregular" */}
            <filter id={filterId1} x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.03 0.055"
                    numOctaves={4}
                    seed={parseInt(filterId1.replace(/\D/g, ""), 10) || 42}
                    result="noise"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale={10}
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
            {/* Filtro interior: menor desplazamiento, más suave */}
            <filter id={filterId2} x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.025 0.04"
                    numOctaves={3}
                    seed={parseInt(filterId2.replace(/\D/g, ""), 10) || 17}
                    result="noise"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale={7}
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
        </defs>

        {/* Capa sombra exterior — pincelada gruesa oscura */}
        <rect
            x="10" y="10" width="266" height="386" rx="13"
            fill="none"
            stroke={shadowColor}
            strokeWidth="11"
            filter={`url(#${filterId1})`}
            opacity="0.65"
        />
        {/* Capa principal dorada */}
        <rect
            x="10" y="10" width="266" height="386" rx="13"
            fill="none"
            stroke={primaryColor}
            strokeWidth="5"
            filter={`url(#${filterId2})`}
            opacity="0.95"
        />
        {/* Capa interior sutil — borde interno brillante */}
        <rect
            x="17" y="17" width="252" height="372" rx="9"
            fill="none"
            stroke={highlightColor}
            strokeWidth="1.5"
            filter={`url(#${filterId1})`}
            opacity="0.4"
        />
    </svg>
);

/* ────────────────────────────────────────────
   Componente principal
──────────────────────────────────────────── */

/**
 * BrushCard — Carta con efecto 3D al hover y animación de volteo al click.
 */
const BrushCard: FC<BrushCardProps> = ({
    frontImage,
    backImage,
    frontContent,
    backContent,
    width = 260,
    height = 380,
    tiltIntensity = 16,
    frontBrush = {
        primaryColor: "#D4A840",
        shadowColor: "#6B4B0A",
        highlightColor: "#F0D880",
    },
    backBrush = {
        primaryColor: "#B06520",
        shadowColor: "#3D1408",
        highlightColor: "#E09050",
    },
}) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
    const [glossPos, setGlossPos] = useState<TiltState>({ x: 50, y: 50 });
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const cardRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>): void => {
            if (isFlipped) return;
            const card = cardRef.current;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const rx = -((e.clientY - cy) / (rect.height / 2)) * tiltIntensity;
            const ry = ((e.clientX - cx) / (rect.width / 2)) * tiltIntensity;
            const mx = ((e.clientX - rect.left) / rect.width) * 100;
            const my = ((e.clientY - rect.top) / rect.height) * 100;

            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                setTilt({ x: rx, y: ry });
                setGlossPos({ x: mx, y: my });
            });
        },
        [isFlipped, tiltIntensity]
    );

    const handleMouseLeave = useCallback((): void => {
        if (!isFlipped) {
            setTilt({ x: 0, y: 0 });
            setGlossPos({ x: 50, y: 50 });
        }
    }, [isFlipped]);

    const handleClick = useCallback((): void => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTilt({ x: 0, y: 0 });
        setIsFlipped((prev) => !prev);
        setTimeout(() => setIsAnimating(false), 800);
    }, [isAnimating]);

    const cardTransform: string = isFlipped
        ? "rotateY(180deg)"
        : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

    const cardTransition: string =
        isFlipped || isAnimating
            ? "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)"
            : "transform 0.06s linear";

    return (
        <div
            style={{
                perspective: "1100px",
                width: `${width}px`,
                height: `${height}px`,
                cursor: "pointer",
            }}
        >
            <div
                ref={cardRef}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: cardTransform,
                    transition: cardTransition,
                }}
            >
                {/* ── FRENTE ── */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    {/* Contenido de la carta (imagen o nodo personalizado) */}
                    <div
                        className="rounded-[10px] overflow-hidden"
                        style={{ position: "absolute", inset: 0 }}
                    >
                        {frontImage ? (
                            <img
                                src={frontImage}
                                alt="Card front"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            frontContent ?? <DefaultFront />
                        )}
                    </div>

                    {/* Brillo que sigue al cursor — refuerza la ilusión 3D */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: 10,
                            pointerEvents: "none",
                            zIndex: 5,
                            background: `radial-gradient(circle at ${glossPos.x}% ${glossPos.y}%, rgba(255,255,255,0.14) 0%, transparent 58%)`,
                            transition: "background 0.06s linear",
                        }}
                    />

                    {/* Borde pincelado */}
                    <BrushBorder
                        filterId1="brush-front-1"
                        filterId2="brush-front-2"
                        primaryColor={frontBrush.primaryColor ?? "#D4A840"}
                        shadowColor={frontBrush.shadowColor ?? "#6B4B0A"}
                        highlightColor={frontBrush.highlightColor ?? "#F0D880"}
                    />
                </div>

                {/* ── REVERSO ── */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div
                        className="rounded-[10px] overflow-hidden"
                        style={{ position: "absolute", inset: 0 }}
                    >
                        {backImage ? (
                            <img
                                src={backImage}
                                alt="Card back"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            backContent ?? <DefaultBack />
                        )}
                    </div>

                    {/* Borde pincelado (reverso) */}
                    <BrushBorder
                        filterId1="brush-back-1"
                        filterId2="brush-back-2"
                        primaryColor={backBrush.primaryColor ?? "#B06520"}
                        shadowColor={backBrush.shadowColor ?? "#3D1408"}
                        highlightColor={backBrush.highlightColor ?? "#E09050"}
                    />
                </div>
            </div>
        </div>
    );
};

/* ────────────────────────────────────────────
   Contenidos por defecto (placeholders de demo)
   Reemplaza con tus propias imágenes o contenido
──────────────────────────────────────────── */

const DefaultFront: FC = () => (
    <div
        className="w-full h-full flex flex-col items-center justify-center relative"
        style={{ background: "#09111e" }}
    >
        {/* Luna creciente */}
        <div className="relative mb-5" style={{ width: 78, height: 78 }}>
            <div
                className="absolute inset-0 rounded-full"
                style={{ background: "#e8c96e" }}
            />
            <div
                className="absolute rounded-full"
                style={{ width: 62, height: 62, background: "#09111e", top: -8, right: -12 }}
            />
        </div>
        <div
            className="text-center"
            style={{ fontFamily: "Georgia, serif", color: "#e8c96e" }}
        >
            <p style={{ fontSize: 9, letterSpacing: "0.45em", opacity: 0.55, marginBottom: 4 }}>
                XVIII
            </p>
            <p style={{ fontSize: 18, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                The Moon
            </p>
        </div>
    </div>
);

const DefaultBack: FC = () => (
    <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{ background: "#0f0609" }}
    >
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="80" stroke="#7a3a15" strokeWidth=".7" opacity=".5" />
            <circle cx="90" cy="90" r="62" stroke="#c47828" strokeWidth=".8" opacity=".55" />
            <circle cx="90" cy="90" r="46" stroke="#d4924a" strokeWidth=".8" opacity=".6" />
            <rect x="28" y="28" width="124" height="124" stroke="#a05520" strokeWidth=".5" opacity=".4" transform="rotate(0 90 90)" />
            <rect x="28" y="28" width="124" height="124" stroke="#a05520" strokeWidth=".5" opacity=".35" transform="rotate(45 90 90)" />
            <ellipse cx="90" cy="60" rx="7" ry="24" fill="#c47828" opacity=".28" />
            <ellipse cx="90" cy="60" rx="7" ry="24" fill="#c47828" opacity=".25" transform="rotate(90 90 90)" />
            <circle cx="90" cy="90" r="5" fill="#f0c870" opacity=".8" />
            <circle cx="90" cy="90" r="2" fill="#fff8e0" opacity=".95" />
        </svg>
        <p
            style={{
                color: "#a05520",
                fontSize: 9,
                letterSpacing: "0.5em",
                fontFamily: "Georgia, serif",
                textTransform: "uppercase",
                marginTop: 8,
                opacity: 0.7,
            }}
        >
            Arcana Maior
        </p>
    </div>
);

export default BrushCard;

/*
────────────────────────────────────────────────────────
 EJEMPLO DE USO
────────────────────────────────────────────────────────

import BrushCard, { BrushCardProps } from "./BrushCard";

// Con imágenes propias:
<BrushCard
  frontImage="/img/frente.jpg"
  backImage="/img/reverso.jpg"
/>

// Con contenido personalizado:
<BrushCard
  frontContent={<MiComponenteFront />}
  backContent={<MiComponenteBack />}
  width={300}
  height={420}
  tiltIntensity={18}
  frontBrush={{ primaryColor: "#7EC8E3", shadowColor: "#1A5276", highlightColor: "#ADE8F4" }}
  backBrush={{ primaryColor: "#F4A460", shadowColor: "#7B3F00", highlightColor: "#FFDEAD" }}
/>
────────────────────────────────────────────────────────
*/