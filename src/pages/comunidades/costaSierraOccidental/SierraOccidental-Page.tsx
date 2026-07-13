

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import AppHeader from "../../../components/App-Header"
import SierraOccidentalInfo from "./SierraOccidental-Info"



export default function SierraOccidentalPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <SierraOccidentalInfo />
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}