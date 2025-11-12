import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold text-gray-500">Error 404</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">
          Página no encontrada
        </h1>
        <p className="mt-4 text-gray-600">
          No pudimos encontrar la ruta <span className="font-mono text-gray-800">{pathname}</span>.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            Volver
          </button>
          <Link
            to="/"
            className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
