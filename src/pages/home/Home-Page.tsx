import AppHeader from "../../components/App-Header";
import AppFooter from "../../components/App-Footer";
import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import logo from "@assets/logo/logo-resonancias-1-1.png"
import HomeComunidades from "./Home-Comunidades";
import HomeRecursos from "./Home-Recursos";

export default function HomePage() {
    return <>
        <div className="bgColor">
            <AppHeader />
            <img className="px-11 select-none" src={logo} alt="logo resonancias 1" />
            <div className="flex flex-1 justify-center pb-5">
                <div className="w-9/12">
                    <div className="text-4xl font-extrabold text-white pb-5">Mujeres y Territorios</div>
                    <p className="text-lg text-white">
                        Este sitio tiene la finalidad de ser un proyecto de comunicación transmedia que contribuya
                        como herramienta para el reconocimiento de mujeres y comunidades defensoras del territorio de Jalisco. 
                        Este es un producto de la colaboración entre académicas, estudiantes universitarios y mujeres defensoras.
                    </p> <br />
                    <p className="text-lg text-white">
                        El proyecto surge desde el reconocimiento de los conflictos socioambientales en los que las mujeres,
                        conscientes de las afectaciones sobre sus dinámicas culturales, sociales, económicas y emocionales, juegan
                        un papel central en la defensa de los territorios. Las colaboradoras principales en este proyecto son mujeres 
                        que lideran espacios comunitarios y que generan herramientas para el cuidado como parte de su lucha y 
                        subsistencia, en resistencia frente a situaciones de violencia, despojo y vulnerabilidad.
                    </p>
                </div>
            </div>
        </div>
        <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
        <HomeComunidades/>
        <HomeRecursos/>
        <div className="relative flex items-center justify-center">
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                <AppFooter />
            </div>
        </div>
    </>;
}