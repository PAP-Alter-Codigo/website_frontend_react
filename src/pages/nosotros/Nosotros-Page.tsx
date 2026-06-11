import AppHeader from "../../components/App-Header";

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/03-piedepag-gu-1.png"
import NosotrosDescription from "./Nosotros-Description";
import NosotrosAdvisors from "./Nosotros-Advisors";
import NostrosButtons from "./Nosotros-Buttons";


export default function NosotrosPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <NosotrosDescription/>
            <NosotrosAdvisors/>
            <NostrosButtons/>
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}