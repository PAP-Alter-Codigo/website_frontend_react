import brush1 from "@assets/brushStrokes/img10-3-1.png"
import brush2 from "@assets/brushStrokes/img10-2-4.png"
import brush3 from "@assets/brushStrokes/img10-1-3.png"
import imgTmp from "@assets/comunidades/image-2-2.png"


const comunidades = [
    {
        name: 'Norte',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Altos Norte',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Altos Sur',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Ciénega',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Sureste',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Sur',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Sierra de Amula',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Costa Sur',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Costa Norte',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Sierra Occidental',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Valles',
        img: imgTmp,
        to: '/'
    },
    {
        name: 'Centro',
        img: imgTmp,
        to: '/'
    },
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
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-9/12">
                {comunidades.map((c) => (
                    <div key={c.name} data-aos="fade-up"
                    className="bg-white rounded-4xl shadow-md 
                    overflow-hidden transition duration-200 ease-in-out 
                    hover:scale-110">
                        <img src={c.img} alt="Imagen 1" className="w-full h-48 object-cover rounded-3xl shadow-md"></img>
                        <div className="p-4 flex justify-center">
                            <h3 className="text-4xl font-semibold text-gray-800">{c.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <img src={brush3}/>
    </>;
}