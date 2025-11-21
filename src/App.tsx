import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import AOS from "aos";
import "aos/dist/aos.css";

import ComunidadesPage from './pages/comunidades/Comunidades-Page';
/* import HomePage from './pages/home/home-page'; */
import HomePage from './pages/home/Home-Page'
import MonitoreoPage from './pages/monitoreo/Monitoreo-Page';
import ContactoPage from './pages/contacto/Contacto-Page';
import NosotrosPage from './pages/nosotros/Nosotros-Page';
import ColaboradoresPage from './pages/colaboradores/Colaboradores-Page';
import ComunidadWrapperPage from './pages/comunidades detail/Comunidad-Wrapper-Page';
import NotFoundPage from './pages/notFound/Not-Found-Page';
import CentroPage from './pages/comunidades/centro/Centro-Page';
import SoñeConNutriasPage from './pages/comunidades/centro/juanacatlan/Soñe-Con-Nutrias-Page';
import MuralJuanacatlanPage from './pages/comunidades/centro/juanacatlan/Mural-Juanacatlan-Page';


function AOSRouterSync() {
  const location = useLocation();
  useEffect(() => {
    // pequeño timeout ayuda cuando hay imágenes o layouts que cambian altura
    const t = setTimeout(() => AOS.refresh(), 0);
    return () => clearTimeout(t);
  }, [location.pathname]);
  return null;
}

function App() {
   useEffect(() => {
      AOS.init({ duration: 600, once: true, offset: 30 }); // config
    }, []);

  return (
    <BrowserRouter>
      <AOSRouterSync/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comunidades" element={<ComunidadesPage />} />
        <Route path="/comunidades/juanacatlan/soñe-con-nutrias" element={<SoñeConNutriasPage />} />
        <Route path="/comunidades/juanacatlan/mural" element={<MuralJuanacatlanPage />} />
        <Route path="/comunidades/centro/:slug" element={<CentroPage />} />
        <Route path="/regiones/:slug" element={<ComunidadWrapperPage />} />
        <Route path="/monitoreo" element={<MonitoreoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} /> 
        <Route path="/colaboradores" element={<ColaboradoresPage />} /> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
