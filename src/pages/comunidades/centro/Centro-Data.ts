import img1 from "@assets/comunidades/img-8458-1.png";

/* JUANACATLAN CARROUSEL */
import juanac1 from "@assets/comunidades/juanacatlan/DSCN0544.jpg";
import juanac2 from "@assets/comunidades/juanacatlan/IMG_3182.jpg";
import juanac3 from "@assets/comunidades/juanacatlan/IMG_3220.jpg";
import juanac4 from "@assets/comunidades/juanacatlan/IMG_3242.jpg";
import juanac5 from "@assets/comunidades/juanacatlan/IMG_3621.jpg";
import juanac6 from "@assets/comunidades/juanacatlan/IMG_20240529_100755.jpg";
import juanac7 from "@assets/comunidades/juanacatlan/IMG_20240529_125517.jpg";
import juanac8 from "@assets/comunidades/juanacatlan/IMG_20240611_091546.jpg";
import juanac9 from "@assets/comunidades/juanacatlan/IMG_20240611_091603.jpg";
import juanac10 from "@assets/comunidades/juanacatlan/IMG_20240611_113948.jpg";
import juanac11 from "@assets/comunidades/juanacatlan/IMG-20240529-WA0052.jpg";

import CortoJuanacatlan from "@assets/comunidades/juanacatlan/SoñeConNutrias/image-33.png"


export interface CommunitySection {
    subtitle?: string;
    img: string;        // en Vite, los imports de imágenes resultan en string (URL)
    data: string;
    reverse: boolean;  // opcional
}

export interface CommunityResource {
    title: string;
    img: string;
    to: string;         // ruta interna
}

// Objeto completo de una comunidad
export interface CommunityDetail {
    id: string,
    title: string;
    imgPrincipal: string;
    sections: CommunitySection[];
    resourses: CommunityResource[];
    carrousel: String[]
}


export const juanacatlan = {
    id: 'juanacatlan',
    title: 'JUANACATLAN',
    imgPrincipal: img1,
    sections: [
        {
            subtitle: 'Xonocatlan',
            img: img1,
            data: 'El pueblo de Juanacatlán enfrenta problemáticas socioambientales derivadas de la industrialización, proyectos extractivos, contaminación ambiental y del crecimiento inmobiliario irregular. Las consecuencias de estas problemáticas se ven reflejadas en: Contaminación del aire, suelo y cuerpos de agua de la cuenca Alta Lerma-Chapala-Santiago; afectaciones a la salud y pérdida de un entorno sano; Deforestación de bosques y cambio de uso de suelos; Pérdida de biodiversidad; Incendios forestales y de vertederos municipales; Caza furtiva; Desplazamiento y despojo de las comunidades; Violencias e inseguridad.',
            reverse: false
        },
        {
            subtitle: '',
            img: img1,
            data: 'La comunidad de Xonocatlan resiste ante estas problemáticas a través de distintas acciones: Actividades culturales y de protesta en el espacio público; Festivales, foros y talleres; Huertos comunitarios agroecológicos y medicinales; Recorridos de reconocimiento del paisaje y la herencia cultural; Conformación del Concejo Indígena de Xonocatlan; Investigación comunitaria; Defensa legal ante irregularidades, omisiones y afectaciones; Articulación con colectivos y universidades.',
            reverse: true
        }
    ],
    resourses: [
        {
            title: 'MURALES',
            img: img1,
            to: '/comunidades/juanacatlan/murales'
        },
        {
            title: 'CORTO',
            img: CortoJuanacatlan,
            to: '/comunidades/juanacatlan/soñe-con-nutrias'
        }
    ],
    carrousel: [
        juanac1,
        juanac2,
        juanac3,
        juanac4,
        juanac5,
        juanac6,
        juanac7,
        juanac8,
        juanac9,
        juanac10,
        juanac11,
    ]
}