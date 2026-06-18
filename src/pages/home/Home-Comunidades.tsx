import { Link } from "react-router-dom";

import brush1 from "@assets/brushStrokes/img10-3-1.png"
import brush2 from "@assets/brushStrokes/img10-2-4.png"
import brush3 from "@assets/brushStrokes/img10-1-3.png"

import imgAltosNorte from "@assets/regiones/altos-norte.jpg"
import imgCienega from "@assets/regiones/cienega.jpg"
import imgNorte from "@assets/regiones/norte.jpg"
import imgSierraOccidental from "@assets/regiones/sierra-occidental.jpeg"
import imgAltosSur from "@assets/regiones/altos-sur-2.jpeg"
import imgCentro from "@assets/regiones/centro.jpg"
import imgLagunas from "@assets/regiones/lagunas.jpeg"
import imgSierraAmula from "@assets/regiones/sierra-amula.jpeg"
import imgCostaSur from "@assets/regiones/costa-sur.jpeg"
import imgValles from "@assets/regiones/valles.jpeg"
import imgSur from "@assets/regiones/sur.jpeg"
import imgSureste from "@assets/regiones/image-2-2.png"

const comunidades = [
    {
        name: 'Norte',
        img: imgNorte,
        to: '/regiones/norte'
    },
    {
        name: 'Altos Norte',
        img: imgAltosNorte,
        to: '/regiones/altos-norte'
    },
    {
        name: 'Altos Sur',
        img: imgAltosSur,
        to: '/regiones/altos-sur'
    },
    {
        name: 'Ciénega',
        img: imgCienega,
        to: '/regiones/cienega'
    },
    {
        name: 'Sureste',
        img: imgSureste,
        to: '/regiones/sureste'
    },
    {
        name: 'Sur',
        img: imgSur,
        to: '/regiones/sur'
    },
    {
        name: 'Sierra de Amula',
        img: imgSierraAmula,
        to: '/regiones/sierra-de-amula'
    },
    {
        name: 'Costa Sur',
        img: imgCostaSur,
        to: '/regiones/costa-sur'
    },
    {
        name: 'Costa Sierra Occidental',
        img: imgSierraOccidental,
        to: '/regiones/costa-sierra-occidental'
    },
    {
        name: 'Valles',
        img: imgValles,
        to: '/regiones/valles'
    },
    {
        name: 'Centro',
        img: imgCentro,
        to: '/regiones/centro'
    },
    {
        name: 'Lagunas',
        img: imgLagunas,
        to: '/regiones/lagunas'
    }
]

export default function HomeComunidades() {
    return <>
        <div className="relative py-32">
            <div className="flex flex-1 justify-center z-10">
                <div className="w-9/12">
                    <div className="text-4xl font-extrabold  pb-5">COMUNIDADES</div>
                    <p className="">
                        Aquí encontrarás información al respecto de las luchas y conflictos socioambientales en comunidades de
                        las 12 regiones del estado de Jalisco. Explóralas en el siguiente mapa y conoce sus experiencias.
                    </p>
                </div>
            </div>
            <div className="absolute top-0 left-0 -z-30">
                <img className="" src={brush1} alt="01 prt sup 1" />
            </div>
            <div className="absolute top-0 right-0 -z-30">
                <img className="" src={brush2} alt="01 prt sup 1" />
            </div>
        </div>
        <div className="relative flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-9/12">
                {comunidades.map((c) => (
                    <Link key={c.name} data-aos="fade-up" to={c.to}>
                        <div
                        className="bg-white rounded-4xl shadow-md
                        overflow-hidden transition duration-200 ease-in-out
                        hover:scale-110">
                            <img src={c.img} alt="Imagen 1" className="w-full h-48 object-cover rounded-3xl shadow-md"></img>
                            <div className="p-4 flex justify-center">
                                <h3 className="w-full text-center text-3xl font-semibold text-gray-800">{c.name}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <img src={brush3} className="absolute bottom-0 left-0 -z-10"/>
        </div>
    </>;
}