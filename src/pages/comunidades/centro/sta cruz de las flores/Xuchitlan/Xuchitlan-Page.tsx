

import prtSup1 from "@assets/bigStrokes/01-prt-sup-1.png"
import prtInf1 from "@assets/bigStrokes/piedepag-1-1.png"

import AppHeader from "../../../../../components/App-Header"
import XuchitlanComponent from "./Xuchitlan-Component"
import AppFooter from "../../../../../components/App-Footer"

export default function XuchitlanPage() {
    return (
        <>
            <div className="bgColor">
                <AppHeader />
            </div>
            <img className="w-full select-none" src={prtSup1} alt="01 prt sup 1" />
            <div className="">
                <XuchitlanComponent/> 
            </div>
            <div className="relative flex items-center justify-center">
                <img className="w-full select-none" src={prtInf1} alt="logo resonancias 1" />
                <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                    <AppFooter />
                </div>
            </div>
        </>
    )
}