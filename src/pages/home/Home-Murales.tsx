// src/components/MuralesSection.tsx
import muralImg from "@assets/general/image-3-1.png"; // o usa public: `${import.meta.env.BASE_URL}img/image-3-1.png`

export default function HomeMural() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Imagen derecha */}
      <img
        src={muralImg}
        alt="Murales"
        className="absolute inset-y-0 right-0 h-full w-7/12 object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Bloque verde con curva */}
      <div
        className="
          relative w-[88%] sm:w-[75%] md:w-[58%] lg:w-[55%] xl:w-[52%]
          min-h-[420px] md:min-h-[520px] flex items-center py-32
          bg-[#b7d557] rounded-br-[180px]
        "
      >
        <div className="px-6 sm:px-10 lg:px-12 py-10 lg:py-14">
          <h2
            className="
              font-black text-black tracking-tight mb-4
              text-5xl sm:text-6xl lg:text-8xl xl:text-9xl
            "
          >
            MURALES
          </h2>

          <p className="text-black/90 font-semibold mb-6 text-lg sm:text-xl lg:text-2xl">
            “Murales de las comunidades de Jalisco”
          </p>

          <p className="text-black font-semibold text-base sm:text-lg lg:text-2xl max-w-[56ch]">
            Aquí podrás ver y conocer más sobre los murales hechos por las comunidades, desde sus
            procesos de planeación, hasta su creación.
          </p>
        </div>
      </div>

      {/* Círculos decorativos */}
      <div className="pointer-events-none absolute bottom-6 right-6 flex gap-4">
        <span className="inline-block rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] w-[44px] h-[44px] bg-[#b7d557]" />
        <span className="inline-block rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] w-[36px] h-[36px] bg-[#b7d557]" />
        <span className="inline-block rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] w-[32px] h-[32px] bg-[#b7d557]" />
        <span className="inline-block rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] w-[52px] h-[52px] bg-[#b7d557]" />
      </div>
    </section>
  );
}
