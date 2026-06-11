import { ADVISORS } from "./Advisors-Data";

export default function NosotrosAdvisors() {
  return (
    <section className="px-6 sm:px-10 lg:px-32 py-12" data-aos="fade-up">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-extrabold pb-5 text-center">Asesores del Proyecto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVISORS.map((advisor) => (
            <div
              key={advisor.name}
              className="bg-white rounded-4xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Photo */}
              <div className="w-full h-56 overflow-hidden bg-gray-200">
                <img
                  src={`${advisor.photoPath}`}
                  alt={advisor.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="px-3 py-4">
                {/* Name */}
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {advisor.name}
                </h3>

                {/* Degrees */}
                <div className="mb-3 space-y-0.5">
                  {advisor.degrees.map((degree, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-700 line-clamp-1"
                    >
                      {degree}
                    </p>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  {/* Expertise Label */}
                  <p className="text-xs font-semibold text-indigo-700 mb-2">
                    Especialidad:
                  </p>
                  {/* Expertise Text */}
                  <p className="text-sm italic text-gray-600">
                    {advisor.expertise}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
