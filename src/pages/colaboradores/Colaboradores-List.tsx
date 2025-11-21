// src/components/ColaboradoresAcordeon.tsx
import { otoño2025, type Persona } from "./Colaboradores-Data";
import { useEffect, useMemo, useRef, useState } from "react";


const data: {
    year: number;
    periodos: { name: string; data: Persona[] }[];
}[] = [
        {
            year: 2025,
            periodos: [
                {
                    name: "Otoño",
                    data: otoño2025
                }
            ]
        },
    ];

/* ---------- Utils ---------- */
function Chevron({ className = "w-5 h-5 text-gray-500" }: { className?: string }) {
    return (
        <svg className={`${className} transition-transform group-open:rotate-180`} xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

function groupBy<T, K extends string | number>(arr: T[], getKey: (v: T) => K): Record<K, T[]> {
    return arr.reduce((acc, v) => {
        const k = getKey(v);
        (acc[k] ||= []).push(v);
        return acc;
    }, {} as Record<K, T[]>);
}

function seasonClass(name: string) {
    const s = name.trim().toLowerCase();
    if (s === "primavera") return "font-semibold text-indigo-700 capitalize";
    if (s === "verano") return "font-semibold text-amber-700 capitalize";
    return "font-semibold text-emerald-700 capitalize";
}

function initialsFromName(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const ini = (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "");
    return ini.toUpperCase();
}

function Avatar({ src, name, className = "h-11 w-11" }: { src?: string; name: string; className?: string }) {
    if (src) {
        return (
            <img
                src={src}
                alt={`${name} avatar`}
                className={`${className} rounded-full object-cover bg-gray-100`}
                loading="lazy"
                decoding="async"
            />
        );
    }
    return (
        <div className={`${className} rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-semibold`}>
            {initialsFromName(name)}
        </div>
    );
}

/* ---------- Helpers de contacto ---------- */
function isEmail(x: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x); }
function isUrl(x: string) { try { new URL(x); return true; } catch { return false; } }
function isPhone(x: string) { return /^\+?[0-9 ()-]{6,}$/.test(x); }

function ContactLink({ value }: { value?: string }) {
    if (!value) return null;
    const v = value.trim();
    if (!v) return null;

    if (isEmail(v)) return <a className="text-indigo-700 hover:underline" href={`mailto:${v}`}>{v}</a>;
    if (isUrl(v)) return <a className="text-indigo-700 hover:underline" href={v} target="_blank" rel="noreferrer">{v}</a>;
    if (isPhone(v)) return <a className="text-indigo-700 hover:underline" href={`tel:${v}`}>{v}</a>;

    return <span>{v}</span>;
}

/* ---------- Modal ---------- */
type ModalProps = {
    open: boolean;
    onClose: () => void;
    person?: Persona;
};

function PersonModal({ open, onClose, person }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    // Bloquear scroll del body cuando está abierto
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    // Cerrar con ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !person) return null;

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
            aria-label={`Ficha de ${person.nombre}`}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/* Dialog */}
            <div
                ref={dialogRef}
                className="relative z-101 max-w-3xl w-[92%] sm:w-[85%] md:w-[720px] rounded-2xl bg-white shadow-xl overflow-hidden"
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Imagen grande */}
                    <div className="bg-gray-50">
                        {person.imagen ? (
                            <img
                                src={person.imagen}
                                alt={`${person.nombre} foto`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : (
                            <div className="w-full h-full min-h-60 flex items-center justify-center bg-gray-100">
                                <Avatar name={person.nombre} className="h-24 w-24" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="p-5 sm:p-6 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{person.nombre}</h3>
                            <button
                                onClick={onClose}
                                aria-label="Cerrar"
                                className="shrink-0 rounded-full p-1.5 bg-gray-100 hover:bg-gray-200"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5">
                                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-2 space-y-2 text-sm">
                            {person.carrera && (
                                <p className="text-gray-700">
                                    <span className="font-semibold">Carrera: </span>{person.carrera}
                                </p>
                            )}
                            {person.categoria && (
                                <p className="text-gray-700">
                                    <span className="font-semibold">Categoría: </span>{person.categoria}
                                </p>
                            )}
                            {person.contacto && (
                                <p className="text-gray-700">
                                    <span className="font-semibold">Contacto: </span>
                                    <ContactLink value={person.contacto} />
                                </p>
                            )}
                        </div>

                        <div className="mt-5">
                            <button
                                onClick={onClose}
                                className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2 text-sm font-semibold hover:opacity-90"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- Componente principal ---------- */
type Props = { title?: string };

export default function ColaboradoresList({ title = "Colaboradores por Año y Semestre" }: Props) {
    const [selected, setSelected] = useState<Persona | undefined>(undefined);

    const ordered = useMemo(
        () =>
            [...data].sort((a, b) => b.year - a.year).map((y) => ({
                ...y,
                periodos: [...y.periodos].sort((a, b) => {
                    const rank = (s: string) => {
                        const v = s.toLowerCase();
                        if (v === "primavera") return 1;
                        if (v === "verano") return 2;
                        if (v === "otoño") return 3;
                        return 99;
                    };
                    return rank(a.name) - rank(b.name);
                }),
            })),
        []
    );

    return (
        <>
            <section className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-4xl font-extrabold pb-12 text-center">{title}</h2>

                {ordered.map((yearBlock) => (
                    <details key={yearBlock.year} className="group mb-4 rounded-xl border border-gray-200 bg-white open:shadow">
                        <summary className="flex items-center justify-between cursor-pointer select-none px-5 py-4">
                            <span className="text-xl font-bold text-gray-900">{yearBlock.year}</span>
                            <Chevron />
                        </summary>

                        <div className="px-5 pb-5 space-y-4">
                            {yearBlock.periodos.map((season) => {
                                const byCat = groupBy(season.data, (e) => (e.categoria && e.categoria.trim()) || "Sin categoría");

                                return (
                                    <details key={`${yearBlock.year}-${season.name}`} className="group rounded-lg border border-gray-100 open:shadow-sm">
                                        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer">
                                            <span className={seasonClass(season.name)}>{season.name}</span>
                                            <Chevron className="w-4 h-4 text-gray-500" />
                                        </summary>

                                        <div className="px-4 pb-4 space-y-6">
                                            {Object.entries(byCat).map(([categoria, people]) => (
                                                <div key={`${yearBlock.year}-${season.name}-${categoria}`}>
                                                    <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">{categoria}</h4>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {people.map((p) => (
                                                            <li
                                                                key={`${p.nombre}-${p.carrera}`}
                                                                className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition cursor-pointer"
                                                                onClick={() => setSelected(p)}
                                                                role="button"
                                                                tabIndex={0}
                                                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(p); }}
                                                                aria-label={`Abrir ficha de ${p.nombre}`}
                                                            >
                                                                <Avatar src={p.imagen} name={p.nombre} />
                                                                <div>
                                                                    <p className="font-semibold text-gray-900 leading-tight">{p.nombre}</p>
                                                                    <p className="text-sm text-gray-600">{p.carrera}</p>
                                                                </div>
                                                                <div className="ml-auto opacity-60">
                                                                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                                                                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                                    </svg>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                );
                            })}
                        </div>
                    </details>
                ))}
            </section>

            {/* Modal */}
            <PersonModal
                open={!!selected}
                onClose={() => setSelected(undefined)}
                person={selected}
            />
        </>
    );
}
