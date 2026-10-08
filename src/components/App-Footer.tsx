export default function AppFooter() {
  return (
    <footer className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
        {/* Correo */}
        <a
          href="mailto:resonanciasweb@gmail.com"
          className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            {/* Heroicon Mail */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm text-gray-500">Correo</p>
            <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition">resonanciasweb@gmail.com</p>
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/territoriositeso/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-pink-600">
            {/* Instagram glyph */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M224 202a54 54 0 1 0 54 54 54 54 0 0 0-54-54Zm124-41a21 21 0 1 0-21-21 21 21 0 0 0 21 21Zm76 41c-.5-35.3-9.6-66.6-35.1-92.1S336.3 74.5 301 74c-36.2-.5-144.8-.5-181 0C84.7 74.5 53.4 83.6 27.9 109.1S-7.5 166.7-8 202.9c-.5 36.2-.5 144.8 0 181  .5 35.3 9.6 66.6 35.1 92.1S111.7 501.5 147 502c36.2.5 144.8.5 181 0 35.3-.5 66.6-9.6 92.1-35.1s34.6-56.8 35.1-92.1c.5-36.2.5-144.8 0-181ZM224 388a132 132 0 1 1 132-132A132 132 0 0 1 224 388Zm146-218a30 30 0 1 1 30-30 30 30 0 0 1-30 30Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm text-gray-500">Instagram</p>
            <p className="font-semibold text-gray-900 group-hover:text-pink-700 transition">@territoriositeso</p>
          </div>
        </a>
      </div>
    </footer>
  );
}
