import AppHeader from "../../components/App-Header";

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"
import ContactoForm from "./Contacto-Form";


export default function ContactoPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <ContactoForm/>
            <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
        </>
    )
}