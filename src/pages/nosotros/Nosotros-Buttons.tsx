// src/components/AtajosSection.tsx
import { Link } from "react-router-dom";

type Item = { label: string; to: string };

const items: Item[] = [
  { label: "Directorio", to: "/directorio" },
  { label: "Comunidad", to: "/colaboradores" },
];

export default function NostrosButtons() {
  return (
    <section>
      <div className="flex justify-center py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-11/12 md:w-8/12">
          {items.map((it) => (
            <Link key={it.to} to={it.to} aria-label={it.label}>
              <div
                className="
                  flex items-center justify-between gap-4 p-4
                  rounded-tl-4xl rounded-br-4xl
                  transition duration-200 ease-in-out hover:scale-110 hover:bg-gray-300
                  will-change-transform
                "
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-black">{it.label}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-10 h-10 sm:w-12 sm:h-12 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
