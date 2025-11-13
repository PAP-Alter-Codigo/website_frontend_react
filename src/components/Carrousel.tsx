// src/components/Carousel.tsx
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    images: string[];          // rutas de las imágenes
    autoPlay?: boolean;        // autoplay opcional
    intervalMs?: number;       // intervalo del autoplay (ms)
    className?: string;        // clases extra para el wrapper
    caption?: string;          // aria-label del carrusel
};

export default function Carousel({
    images,
    autoPlay = false,
    intervalMs = 4500,
    className = "",
    caption = "Carrusel de imágenes",
}: Props) {
    const slidesRef = useRef<(HTMLLIElement | null)[]>([]);
    const viewportRef = useRef<HTMLUListElement | null>(null);
    const [current, setCurrent] = useState(0);

    const safeImages = useMemo(() => images.filter(Boolean), [images]);
    const count = safeImages.length;

    const setSlideRef = (idx: number) => (el: HTMLLIElement | null) => {
        slidesRef.current[idx] = el; // sin return
    };

    // Observa qué slide está centrado para actualizar el índice actual
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const opts: IntersectionObserverInit = {
            root: viewport,
            threshold: 0.6, // ~60% visible
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    const idx = slidesRef.current.findIndex((el) => el === e.target);
                    if (idx >= 0) setCurrent(idx);
                }
            });
        }, opts);

        slidesRef.current.forEach((el) => el && io.observe(el));
        return () => io.disconnect();
    }, [count]);

    // Autoplay (pausa si no hay imágenes)
    useEffect(() => {
        if (!autoPlay || count <= 1) return;
        const id = setInterval(() => {
            goTo(current + 1);
        }, intervalMs);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, intervalMs, current, count]);

    const goTo = (idx: number) => {
        if (!count) return;
        const next = (idx + count) % count;
        const viewport = viewportRef.current;
        const el = slidesRef.current[next];
        if (viewport && el) {
            viewport.scrollTo({
                left: el.offsetLeft,
                behavior: "smooth",
            });
        }
    };

    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);

    if (!count) return null;

    return (
        <section
            className={`relative ${className}`}
            aria-roledescription="carousel"
            aria-label={caption}
        >
            {/* Viewport (scroll-snap) */}
            <ul
                ref={viewportRef}
                className="
          flex overflow-x-auto scroll-smooth snap-x snap-mandatory
          rounded-2xl sm:rounded-3xl
          [&>li]:snap-center [&>li]:shrink-0
          [-ms-overflow-style:none] [scrollbar-width:none]
        "
                // Oculta barra en WebKit
                style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
                {safeImages.map((src, i) => (
                    <li
                        key={src + i}
                        ref={setSlideRef(i)}
                        className="min-w-full"
                        aria-roledescription="slide"
                        aria-label={`Slide ${i + 1} de ${count}`}
                    >
                        {/* Ajusta alturas por breakpoint a tu gusto */}
                        <div className="w-full h-56 sm:h-72 md:h-96 lg:h-[480px] overflow-hidden">
                            <img
                                src={src}
                                alt={`Imagen ${i + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {/* Flechas */}
            {count > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="Anterior"
                        className="
              absolute left-2 sm:left-3 top-1/2 -translate-y-1/2
              rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow
              hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/30
            "
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        aria-label="Siguiente"
                        className="
              absolute right-2 sm:right-3 top-1/2 -translate-y-1/2
              rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow
              hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/30
            "
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots */}
            {count > 1 && (
                <div className="absolute inset-x-0 bottom-2 sm:bottom-3 flex items-center justify-center gap-2">
                    {safeImages.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Ir al slide ${i + 1}`}
                            onClick={() => goTo(i)}
                            className={`
                h-2 w-2 rounded-full transition
                ${current === i ? "bg-white ring-2 ring-black/40" : "bg-white/70 hover:bg-white"}
              `}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
