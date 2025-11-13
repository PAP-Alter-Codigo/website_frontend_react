// src/components/RegionResourceCard.tsx
import { Link } from "react-router-dom";

type Props = {
  title: string;
  image: string; // URL (import de Vite)
  to: string;    // ruta interna
  className?: string;
};

export default function CentroButtons({ title, image, to, className }: Props) {
  return (
    <section className={`flex justify-center pt-16 ${className ?? ""}`}>
      <div className="w-11/12 sm:w-10/12 md:w-9/12">
        <Link to={to} aria-label={title}>
          <div className="relative h-56 sm:h-64 md:h-[300px] overflow-hidden rounded-2xl sm:rounded-3xl transition duration-200 ease-in-out hover:scale-105">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />

            {/* Banda/placa del título */}
            <div className="absolute top-0 left-0 bg-gray-300/95 w-8/12 sm:w-7/12 md:w-6/12 rounded-br-full">
              <div className="flex justify-evenly items-center gap-3 sm:gap-4 p-5 sm:p-6 md:p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
                  {title}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
