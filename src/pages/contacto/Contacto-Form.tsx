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
    </>
  );
}
