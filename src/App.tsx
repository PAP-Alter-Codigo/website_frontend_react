import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import AOS from "aos";
import "aos/dist/aos.css";

import HomePage from './pages/home/Home-page';


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
      <AOSRouterSync />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
