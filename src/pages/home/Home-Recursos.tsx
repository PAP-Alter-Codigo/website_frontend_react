import { Link } from "react-router-dom";
// Si usas alias @assets:
import imgPodcast from "@assets/general/image-4-1.png";
import imgMedios from "@assets/general/image-5-1.png";
import imgDirectorio from "@assets/general/image-18.png";
// Si prefieres /public, borra los imports y usa src={`${import.meta.env.BASE_URL}img/image-4-1.png`}.

type Card = {
  to: string;
  title: string;
  desc: string;
  img: string;
  alt: string;
};

const cards: Card[] = [
  {
    to: "/podcast",
    title: "PODCAST",
    desc:
      "Escucha los capítulos del podcast Resonante, donde encontrarás avances investigativos, reflexiones, experiencias, dinámicas y memorias de mujeres defensoras.",
    img: imgPodcast,
    alt: "Imagen de podcast",
  },
  {
    to: "/medios",
    title: "MEDIOS",
    desc:
      "Aquí están los diferentes recursos informativos en torno a luchas a los que puedes acceder de modo general.",
    img: imgMedios,
    alt: "Imagen de medios",
  },
  {
    to: "/colaboradores",
    title: "DIRECTORIO",
    desc: "Explora el directorio virtual de asesoras especialistas para mujeres defensoras.",
    img: imgDirectorio,
    alt: "Imagen de directorio",
  },
];

export default function HomeRecursos() {
  return (
    <section className="mt-40">
      <div className="flex flex-1 justify-center z-10">
        <div className="w-9/12">
          <h2 className="text-4xl font-extrabold pb-5">RECURSOS</h2>
          <p>
            Aquí están los diferentes recursos informativos en torno a luchas a los que puedes acceder de modo general.
          </p>
        </div>
      </div>

      <div className="flex justify-center py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-9/12 items-stretch">
          {cards.map((c) => (
            <Link key={c.to} to={c.to} className="h-full">
              <article data-aos="fade-right"
                className="bg-white rounded-4xl shadow-md overflow-hidden transition duration-200 ease-in-out 
                           hover:scale-105 h-full flex flex-col"
              >
                <div className="px-5 pt-5">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover rounded-3xl shadow-lg"
                  />
                </div>

                <div className="p-4 flex flex-1 items-center justify-center">
                  <div className="p-5 text-center">
                    <h3 className="text-4xl font-semibold text-gray-800">{c.title}</h3>
                    <p className="pt-4">{c.desc}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
