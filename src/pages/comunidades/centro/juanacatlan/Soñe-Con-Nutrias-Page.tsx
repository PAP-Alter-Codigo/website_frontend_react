import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import AppHeader from "../../../../components/App-Header"
import SoñeConNutriasInfo from "./Soñe-Con-Nutrias-Info"



export default function SoñeConNutriasPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <SoñeConNutriasInfo/>
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}