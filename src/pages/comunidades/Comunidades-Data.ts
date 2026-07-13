import img1 from "@assets/regiones/centro.jpg";
import img2 from "@assets/regiones/lagunas.jpeg";
import img3 from "@assets/regiones/valles.jpeg";
import img4 from "@assets/regiones/cienega.jpg";
import img5 from "@assets/comunidades/image-2-2.png";
import img6 from "@assets/regiones/sur.jpeg";
import img7 from "@assets/regiones/sierra-amula.jpeg";
import img8 from "@assets/regiones/costa-sur.jpeg";
import img9 from "@assets/regiones/sierra-occidental.jpeg";
import img10 from "@assets/regiones/norte.jpg";
import img11 from "@assets/regiones/altos-norte.jpg";
import img12 from "@assets/regiones/altos-sur-2.jpeg";
import img13 from "@assets/regiones/image-2-2.png";


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
  norte: img10,
  altosNorte: img11,
  altosSur: img12,
  costaNorte: img13,
};


export interface Item { label: string; to: string };
export interface Region {
  title: string;
  img: string;
  items: Item[];
  reverse?: boolean; // alterna imagen/tarjeta
};

export const regiones: Region[] = [
  {
    title: "NORTE",
    img: IMG.norte,
    items: [
      { label: "Santa Catarina Cuexcomatitlán", to: "/comunidades/santa-catarina-cuexcomatitlan" },
      { label: "San Andrés Cohamiata", to: "/comunidades/san-andres-cohamiata" }
    ],
    reverse: true,
  },
  {
    title: "ALTOS-NORTE",
    img: IMG.altosNorte,
    items: [{ label: "Lagos de Moreno", to: "/comunidades/lagos-de-moreno" }],
  },
  {
    title: "ALTOS-SUR",
    img: IMG.altosSur,
    items: [{ label: "Lagos de Moreno", to: "/comunidades/lagos-de-moreno" }],
    reverse: true,
  },
  {
    title: "CIENEGA",
    img: IMG.cienega,
    items: [
      { label: "La Noria", to: "/comunidades/la-noria" },
      { label: "Agua Caliente", to: "/comunidades/agua-caliente" },
      { label: "Mezcala", to: "/comunidades/mezcala" },
    ],
  },
  {
    title: "SURESTE",
    img: IMG.sureste,
    items: [
      { label: "Santa Cruz de la Soledad", to: "/comunidades/santa-cruz-de-la-soledad" },
      { label: "Mezcala", to: "/comunidades/mezcala" },
      { label: "San Antonio Tlayacapan", to: "/comunidades/san-antonio-tlayacapan" },
    ],
    reverse: true,
  },
  {
    title: "SUR",
    img: IMG.sur,
    items: [
      { label: "Sierra de Manantlán", to: "/comunidades/sierra-de-manantlan" },
      { label: "Ciudad Guzmán", to: "/comunidades/ciudad-guzman" },
    ],
  },
  {
    title: "SIERRA-DE-AMULA",
    img: IMG.sierraAmula,
    items: [
      { label: "Autlán", to: "/comunidades/autlan" },
      { label: "El Grullo", to: "/comunidades/el-grullo" },
    ],
    reverse: true,
  },
  {
    title: "COSTA-SUR",
    img: IMG.costaSur,
    items: [{ label: "Costa Careyes", to: "/comunidades/costa-careyes" }],
  },
  {
    title: "COSTA-SIERRA-OCCIDENTAL",
    img: IMG.costaOcc,
    items: [{ label: "Puerto Vallarta", to: "/comunidades/puerto-vallarta" }],
    reverse: true
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
    title: "CENTRO",
    img: IMG.centro,
    items: [
      { label: "Juanacatlán", to: "/comunidades/centro/juanacatlan" },
      { label: "Santa Cruz de las Flores", to: "/comunidades/centro/santa-cruz-de-las-flores" },
      { label: "El Salto", to: "/comunidades/centro/el-salto" },
      { label: "Ixtlahuacán del Río", to: "/comunidades/centro/ixtlahuacan-del-rio" },
    ],
    reverse: true,
  },
  {
    title: "LAGUNAS",
    img: IMG.lagunas,
    items: [{ label: "Sayula", to: "/comunidades/sayula" }],
  },

];