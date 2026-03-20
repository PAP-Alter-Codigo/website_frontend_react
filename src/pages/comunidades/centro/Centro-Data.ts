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
    carrousel?: string[]
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
            title: 'MURAL',
            img: img1,
            to: '/comunidades/juanacatlan/mural'
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

import staCruz from "@assets/comunidades/staCruz/20250619_100617.jpg";
import staCruz1 from "@assets/comunidades/staCruz/IMG_20250302_090141.jpg";
import staCruz2 from "@assets/comunidades/staCruz/20250619_115704.jpg";
import staCruz3 from "@assets/comunidades/staCruz/IMG_20250302_091528.jpg";
import staCruz4 from "@assets/comunidades/staCruz/IMG_20250302_094013.jpg";
import staCruz5 from "@assets/comunidades/staCruz/IMG_20250302_113404.jpg";
import staCruz6 from "@assets/comunidades/staCruz/20250619_100252.jpg";
import staCruz7 from "@assets/comunidades/staCruz/imagen-20250406-182143-ee7a7830.jpeg";


export const staCruzDeLasFlores = {
    id: 'santa-cruz-de-las-flores',
    title: 'SANTA CRUZ DE LAS FLORES',
    imgPrincipal: staCruz,
    sections: [
        {
            subtitle: 'Territorio',
            img: staCruz1,
            data: 'El antiguo valle de Xuchitlán, habitado desde el año 1550 por los pueblos cocas, tecuexes y tlajomulcas, se ubica en el eje volcánico y ha sido testigo de una larga historia de vida y transformación. En este territorio se encuentran los pueblos originarios de Cofradía, Buenavista, Santa Cruz de las Flores, Cruz Vieja y Santa Cruz de la Loma, comunidades que han mantenido una relación interdependiente con los cerros, barrancas y manantiales. ',
            reverse: false
        },
        {
            subtitle: 'Ecosistema del Corredor de Tlaxomulli',
            img: staCruz2,
            data: 'Los pueblos de Santa Cruz cohabitan con el volcán inactivo Totoltepec, los cerros El Conejo y La Coronilla, el bosque El Malvaste y el humedal La Playa. En conjunto, conforman el Corredor de Tlaxomulli, un ecosistema esencial para la regulación del clima, la reducción de desastres naturales y el control del crecimiento urbano. Además, este corredor mantiene activo el ciclo sociohidrológico que alimenta el acuífero de San Isidro, vital para la subcuenca de San Marcos.',
            reverse: true
        },
        {
            subtitle: 'Saberes y oficios',
            img: staCruz3,
            data: 'La comunidad de Santa Cruz preserva sus saberes intergeneracionales a través de los oficios tradicionales: el panadero que elabora los panes de trigo, el campesino que cultiva la tierra, y los músicos que mantienen vivas las tradiciones. Estos elementos forman parte del patrimonio cultural que da identidad y sentido de pertenencia al valle de Xuchitlán.',
            reverse: false
        },
        {
            subtitle: 'Símbolos y memoria colectiva',
            img: staCruz4,
            data: 'Los símbolos y lugares emblemáticos de Santa Cruz como el punto geodésico, el Templo de Santa Cruz, Tlalocan y la placita son espacios donde se expresa la identidad comunitaria. En ellos se guarda la memoria viva y colectiva de los pueblos, y se fortalecen los lazos sociales a través de celebraciones y rituales.',
            reverse: true
        },
        {
            subtitle: 'Luchas y defensas del territorio',
            img: staCruz5,
            data: 'La comunidad ha enfrentado procesos de despojo y contaminación provocados por la llegada de industrias que alteran el equilibrio ambiental. La defensa del agua subterránea, llevada a cabo en 1991, 2001 y 2021, forma parte de una memoria de resistencia que une a las generaciones. Personajes como el cantautor Vicente Miranda y las mujeres defensoras simbolizan la fuerza del territorio frente a las injusticias ambientales.',
            reverse: false
        },
        {
            subtitle: 'Impacto industrial y esperanza de recuperación ',
            img: staCruz6,
            data: 'El crecimiento de distintas industrias ha provocado contaminación del aire y del agua, pérdida de espacios naturales y afectaciones a la salud. Sin embargo, en medio de la crisis ambiental, la comunidad busca reconstruir la esperanza, recuperar el territorio y fortalecer la defensa de los bienes comunes, promoviendo la armonía entre las personas y la naturaleza.',
            reverse: true
        },
        {
            subtitle: 'Colaboración comunitaria',
            img: staCruz7,
            data: 'En colaboración con el Comité Agua y Vida de Santa Cruz de las Flores, quienes comparten su conocimiento, memoria y compromiso por la defensa del valle y su entorno. Su participación demuestra que el trabajo colectivo es la base para la transformación del territorio.',
            reverse: false
        },
    ],
    resourses: [
        {
            title: 'Mapa Interactivo',
            img: staCruz1,
            to: '/comunidades/sta-cruz-de-las-flores/mapa'
        },
        {
            title: 'Juego de Mesa Xuchitlan',
            img: staCruz3,
            to: '/comunidades/sta-cruz-de-las-flores/xuchitlan'
        },
    ],
}