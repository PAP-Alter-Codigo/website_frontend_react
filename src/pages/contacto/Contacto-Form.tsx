import { useState } from "react";
import type { FormEvent } from "react";

import bursh1 from "@assets/brushStrokes/img10-3-1.png"; 
import bursh2 from "@assets/brushStrokes/img10-2-4.png"; 

type FormValues = {
  email: string;
  telefono: string;
  nombre: string;
  mensaje: string;
};

type Props = {
  onSubmit?: (values: FormValues) => Promise<void> | void;
};

export default function ContactoForm({ onSubmit }: Props) {
  const [values, setValues] = useState<FormValues>({
    email: "",
    telefono: "",
    nombre: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setValues((v) => ({ ...v, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(values);
    } else {
      // demo: reemplaza por tu lógica (fetch/axios/EmailJS/etc.)
      console.log("Contacto form:", values);
      alert("Enviado (demo). Conecta tu backend o EmailJS aquí.");
    }
  };

  return (
    <>
      <section className="">
        <div className="relative">
          <div>
            <div className="py-12">
              <div className="flex flex-1 justify-center pb-5">
                <div className="w-9/12">
                  <h2 className="text-4xl font-extrabold text-black pb-5">CONTACTO</h2>
                  <p className="text-black">
                    Si formas parte de una comunidad, colectivo o iniciativa vinculada a la defensa del territorio en
                    Jalisco, o si deseas colaborar, aportar o conocer más sobre Resonancias, ponte en contacto con
                    nosotras. Este espacio está abierto para escuchar, compartir y tejer redes de apoyo entre mujeres
                    defensoras y aliadas.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-1 justify-center pb-5">
              <form onSubmit={handleSubmit} className="w-9/12" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-center">
                  {/* Email */}
                  <div>
                    <div className="rounded-md bg-white px-3 pt-2.5 pb-1.5 outline -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <label htmlFor="email" className="block text-xs font-medium text-gray-900">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                        placeholder="tu@correo.com"
                        className="block w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <div className="rounded-md bg-white px-3 pt-2.5 pb-1.5 outline -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <label htmlFor="telefono" className="block text-xs font-medium text-gray-900">
                        Teléfono
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        value={values.telefono}
                        onChange={handleChange}
                        placeholder="+52 33 0000 0000"
                        className="block w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* Nombre */}
                  <div className="sm:col-span-2 md:col-span-2">
                    <div className="rounded-md bg-white px-3 pt-2.5 pb-1.5 outline -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <label htmlFor="nombre" className="block text-xs font-medium text-gray-900">
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        required
                        value={values.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="block w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                {/* Mensaje */}
                <div className="pt-6">
                  <label htmlFor="mensaje" className="block text-sm/6 font-medium text-gray-900">
                    Mensaje
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="mensaje"
                      rows={4}
                      required
                      value={values.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos en qué podemos ayudarte…"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 rounded-full bg-white px-8 py-2.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>

          {/* Decorativos de fondo */}
          <div className="absolute top-0 left-0 -z-30">
            <img src={bursh1} alt="Decorativo 1" loading="lazy" />
          </div>
          <div className="absolute top-0 right-0 -z-30">
            <img src={bursh2} alt="Decorativo 2" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CONTACT: redes sociales / datos */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"  data-aos="fade-up">
          {/* Correo */}
          <a
            href="mailto:contacto@tu-dominio.com"
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
              <p className="font-semibold text-gray-900 group-hover:text-indigo-700 transition">contacto@tu-dominio.com</p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/tu_usuario"
            target="_blank"
            rel="noopener"
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
              <p className="font-semibold text-gray-900 group-hover:text-pink-700 transition">@tu_usuario</p>
            </div>
          </a>

          {/* Teléfono */}
          <a
            href="tel:+523330000000"
            className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              {/* Heroicon Phone */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.27 1.06L8.1 9.73a14.5 14.5 0 006.17 6.17l1.69-1.99a1 1 0 011.06-.27l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.16 21 3 14.84 3 7V6a1 1 0 011-1z"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition">+52 33 3000 0000</p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
