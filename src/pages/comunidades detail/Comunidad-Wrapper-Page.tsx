
import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png";
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png";

import img1 from "@assets/comunidades/img-8458-1.png"; 
import img2 from "@assets/comunidades/image-19.png"; 
import img3 from "@assets/comunidades/image-28.png"; 
import img4 from "@assets/comunidades/image-17.png"; 
import img5 from "@assets/comunidades/image-20.png"; 
import img6 from "@assets/comunidades/image-26.png"; 
import img7 from "@assets/comunidades/image-17-2.png"; 
import img8 from "@assets/comunidades/image-24.png"; 
import img9 from "@assets/comunidades/image-30.png"; 
import bursh1 from "@assets/brushStrokes/03-graf-1.png"; 
import bursh2 from "@assets/brushStrokes/03-graf-4.png"; 
import AppHeader from "../../components/App-Header";
import ComunidadesDetailPage from "./Comunidades-Detail-Page";


const IMG = {
  centro: img1,
  lagunas: img2,
  valles: img3,
  cienega: img4,
  sureste: img5,
  sur: img6,
  sierraAmula: img7,
  costaSur: img8,
  costaOcc: img9,
  deco1: bursh1,
  deco2: bursh2,
};


type Item = { label: string; to: string };
type Region = {
  title: string;
  img: string;
  items: Item[];
  reverse?: boolean; // alterna imagen/tarjeta
};

const regiones: Region[] = [
  {
    title: "CENTRO",
    img: IMG.centro,
    items: [
      { label: "Juanacatlán", to: "/comunidades/centro/juanacatlan" },
      { label: "Santa Cruz de las Flores", to: "/comunidades/centro/santa-cruz-de-las-flores" },
      { label: "El Salto", to: "/comunidades/centro/el-salto" },
      { label: "Ixtlahuacán del Río", to: "/comunidades/centro/ixtlahuacan-del-rio" },
    ],
  },
  {
    title: "LAGUNAS",
    img: IMG.lagunas,
    items: [{ label: "Sayula", to: "/comunidades/sayula" }],
    reverse: true,
  },
  {
    title: "VALLES",
    img: IMG.valles,
    items: [
      { label: "Tequila", to: "/comunidades/tequila" },
      { label: "Tecolotlán", to: "/comunidades/tecolotlan" },
      { label: "Tala", to: "/comunidades/tala" },
      { label: "Sierra de Quila", to: "/comunidades/sierra-de-quila" },
    ],
  },
  {
    title: "CIENEGA",
    img: IMG.cienega,
    items: [
      { label: "La Noria", to: "/comunidades/la-noria" },
      { label: "Agua Caliente", to: "/comunidades/agua-caliente" },
    ],
    reverse: true,
  },
  {
    title: "SURESTE",
    img: IMG.sureste,
    items: [
      { label: "Santa Cruz de la Soledad", to: "/comunidades/santa-cruz-de-la-soledad" },
      { label: "Mezcala", to: "/comunidades/mezcala" },
      { label: "San Antonio Tlayacapan", to: "/comunidades/san-antonio-tlayacapan" },
    ],
  },
  {
    title: "SUR",
    img: IMG.sur,
    items: [
      { label: "Sierra de Manantlán", to: "/comunidades/sierra-de-manantlan" },
      { label: "Ciudad Guzmán", to: "/comunidades/ciudad-guzman" },
    ],
    reverse: true,
  },
  {
    title: "SIERRA-DE-AMULA",
    img: IMG.sierraAmula,
    items: [
      { label: "Autlán", to: "/comunidades/autlan" },
      { label: "El Grullo", to: "/comunidades/el-grullo" },
    ],
  },
  {
    title: "COSTA-SUR",
    img: IMG.costaSur,
    items: [{ label: "Costa Careyes", to: "/comunidades/costa-careyes" }],
    reverse: true,
  },
  {
    title: "COSTA-SIERRA-OCCIDENTAL",
    img: IMG.costaOcc,
    items: [{ label: "Puerto Vallarta", to: "/comunidades/puerto-vallarta" }],
  },
];

export default function ComunidadWrapperPage() {
  return (
    <>
      <div className="bgColor">
        <AppHeader />
      </div>

      <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />

      {/* Aquí va la página dinámica */}
      <ComunidadesDetailPage regiones={regiones} />

      <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
    </>
  );
}
