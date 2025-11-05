import col1 from '@assets/colaboradoresNosotros/dsc02721-1.png'
import col2 from '@assets/colaboradoresNosotros/dsc02744-1.png'
import col3 from '@assets/colaboradoresNosotros/dsc02749-1.png'
import col4 from '@assets/colaboradoresNosotros/dsc02749-2.png'
import col5 from '@assets/colaboradoresNosotros/dsc02721-1.png'


const IMGS = {
  col1a: col1,
  col1b: col2,
  center: col3,
  col3a: col4,
  col3b: col5,
};

export default function NosotrosGalery() {
  return (
    <>
      {/* Galería */}
      <section className="px-6 sm:px-10 lg:px-32 py-12"  data-aos="fade-up">
        {/* En móviles: 1 col; md: 2 cols; lg+: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto">
          {/* Columna 1 */}
          <div className="grid gap-6 items-center">
            <div className="rounded-4xl overflow-hidden">
              <img
                src={IMGS.col1a}
                alt="Galería 1"
                loading="lazy"
                decoding="async"
                className="w-full h-56 sm:h-64 md:h-60 lg:h-56 xl:h-60 object-cover"
              />
            </div>
            <div className="rounded-4xl overflow-hidden">
              <img
                src={IMGS.col1b}
                alt="Galería 2"
                loading="lazy"
                decoding="async"
                className="w-full h-56 sm:h-64 md:h-60 lg:h-56 xl:h-60 object-cover"
              />
            </div>
          </div>

          {/* Columna 2 (central alta) */}
          <div className="rounded-4xl overflow-hidden h-full md:min-h-112 lg:min-h-144">
            <img
              src={IMGS.center}
              alt="Imagen central"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Columna 3 */}
          <div className="grid gap-6 items-center">
            <div className="rounded-4xl overflow-hidden">
              <img
                src={IMGS.col3a}
                alt="Galería 3"
                loading="lazy"
                decoding="async"
                className="w-full h-56 sm:h-64 md:h-60 lg:h-56 xl:h-60 object-cover"
              />
            </div>
            <div className="rounded-4xl overflow-hidden">
              <img
                src={IMGS.col3b}
                alt="Galería 4"
                loading="lazy"
                decoding="async"
                className="w-full h-56 sm:h-64 md:h-60 lg:h-56 xl:h-60 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
