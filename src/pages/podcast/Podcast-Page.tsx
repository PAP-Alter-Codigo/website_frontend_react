import AppHeader from "../../components/App-Header";
import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png";
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png";
import podcastImage from "@assets/general/podcast.jpeg";

const PODCAST_URL = "https://open.spotify.com/show/7qyGikxtrqvf6OlcNtCcMx?si=fb2f0dcc2f964554";
const PODCAST_TITLE = "Resonante Podcast";
const PODCAST_DESCRIPTION =
  "Es un espacio de difusión de la investigación \"Política de los cuidados: Las luchas de las mujeres por la defensa del territorio en Jalisco. Una aproximación desde la investigación vinculada\". Piso común para el vínculo con todas las actrices involucradas en el proyecto.";

export default function PodcastPage() {
  return (
    <>
      <div className="bgColor">
        <AppHeader />
      </div>
      <img className="w-full select-none" src={prtSup1} alt="" />

      <section className="py-12">
        <div className="flex flex-col items-center w-9/12 mx-auto">
          {/* Podcast Image Banner */}
          <div className="mb-8 w-full max-w-md">
            <img
              src={podcastImage}
              alt={PODCAST_TITLE}
              className="rounded-4xl shadow-2xl transition duration-200 hover:scale-105"
            />
          </div>

          {/* Podcast Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-gray-900">
            {PODCAST_TITLE}
          </h1>

          {/* Podcast Description */}
          <div className="max-w-2xl mb-8">
            <p className="text-lg leading-relaxed text-gray-700 text-center">
              {PODCAST_DESCRIPTION}
            </p>
          </div>

          {/* Listen Button */}
          <div className="flex justify-center">
            <a href={PODCAST_URL} target="_blank" className="group bg-gray-100 inline-flex items-center gap-2 py-4 px-8 shadow-2xl rounded-4xl transition duration-200 hover:scale-105 hover:bg-green-200">
              ESCUCHAR PODCAST
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <img className="w-full select-none" src={prtInf1} alt="" />
    </>
  );
}
