import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

type NavItem = { to: string; label: string };

const defaultItems: NavItem[] = [
  { to: "/", label: "INICIO" },
  { to: "/comunidades", label: "COMUNIDADES" },
  { to: "/monitoreo", label: "MONITOREO" },
  { to: "/nosotros", label: "NOSOTROS" },
  { to: "/contacto", label: "CONTACTO" },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AppHeader({ items = defaultItems }: { items?: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Colapsable: ajustar altura
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    el.style.maxHeight = open ? el.scrollHeight + "px" : "0px";
  }, [open]);

  // Cierra con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Cierra al pasar a viewport >= 1024px (lg)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Cierra al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkBase =
    "text-sm/6 font-semibold text-black bg-white rounded-full transition duration-200";
  const linkDesktop = "px-11 py-4 hover:scale-110 hover:text-indigo-600";
  const linkMobile = "px-5 py-3 border border-gray-200 hover:bg-gray-50";

  return (
    <header>
      <nav aria-label="Global" className="mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            {/* <img src="/img/logo.svg" alt="Resonancias" className="h-8 w-auto" /> */}
            <span className="sr-only">Resonancias</span>
          </NavLink>

          {/* Botón hamburguesa (mobile) */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-gray-300 p-2 text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-controls="mobileMenu"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {/* icon burger */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cx("h-6 w-6", open ? "hidden" : "block")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* icon close */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cx("h-6 w-6", open ? "block" : "hidden")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menú desktop */}
          <div className="hidden lg:flex lg:gap-x-12">
            {items.map((it) => (
              <NavLink
                key={it.to + it.label}
                to={it.to}
                className={({ isActive }) =>
                  cx(linkBase, linkDesktop, isActive && "text-indigo-600 scale-110")
                }
                end
              >
                {it.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Menú móvil */}
        <div
          id="mobileMenu"
          ref={menuRef}
          className="lg:hidden max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out"
        >
          <div className="pt-3 pb-5 flex flex-col gap-3">
            {items.map((it) => (
              <NavLink
                key={it.to + it.label}
                to={it.to}
                className={({ isActive }) =>
                  cx(linkBase, linkMobile, isActive && "text-indigo-600")
                }
                end
              >
                {it.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
