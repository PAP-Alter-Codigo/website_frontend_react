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
    resourses?: CommunityResource[];
    carrousel?: string[]
}



import vallarta1 from "@assets/comunidades/puertoVallarta/vallarta1.jpg";
import vallarta2 from "@assets/comunidades/puertoVallarta/vallarta2.jpg";
import vallarta3 from "@assets/comunidades/puertoVallarta/vallarta3.jpg";
import vallarta4 from "@assets/comunidades/puertoVallarta/vallarta4.jpg";
import vallarta7 from "@assets/comunidades/puertoVallarta/vallarta7.jpg";
import vallarta8 from "@assets/comunidades/puertoVallarta/vallarta8.jpg";
import vallarta9 from "@assets/comunidades/puertoVallarta/vallarta9.jpg";
import vallarta10 from "@assets/comunidades/puertoVallarta/vallarta10.jpg";


export const puertoVallarta = {
    id: 'puerto-vallarta',
    title: 'PUERTO VALLARTA',
    imgPrincipal: vallarta1,
    sections: [
        {
            subtitle: 'Ubicación y Entorno Geográfico',
            img: vallarta2,
            data: 'Puerto Vallarta se localiza en la costa pacífica de Jalisco, entre la Bahía de Banderas y la Sierra Madre Occidental, y abarca cerca de 1,300 km². Su relieve combina las montañas de la Sierra Madre Occidental con valles formados por ríos como el Ameca, el Cuale y el Pitillal. Además, alberga ecosistemas costeros clave como el Área Natural Protegida del Estero El Salado.',
            reverse: false
        },
        {
            subtitle: 'Historia y Evolución Turística',
            img: vallarta3,
            data: 'Fundado originalmente bajo el nombre de "Las Peñas", el municipio basó sus primeras décadas en el comercio, la pesca y la agricultura. A partir de los años 40 y 60, impulsado por políticas gubernamentales y la proyección cinematográfica internacional, transitó hacia un modelo turístico masivo. Esto aceleró un crecimiento demográfico desproporcionado, pasando de 24,155 habitantes en 1970 a más de 255,000 en 2010.',
            reverse: true
        },
        {
            subtitle: 'Economía y Dinámica Laboral',
            img: vallarta4,
            data: 'La economía local presenta una especialización extrema en el sector servicios, el cual absorbe aproximadamente al 88% de la población ocupada. Aunque genera empleo, este modelo crea una alta dependencia y empleos predominantemente operativos y temporales. Existe una marcada división sexual del trabajo, donde las mujeres suelen concentrarse en puestos de servicios domésticos extrapolados (camaristas, lavandería) y enfrentan el desgaste de una doble jornada laboral y del hogar.',
            reverse: false
        },
        {
            subtitle: 'Riqueza Natural y Biodiversidad',
            img: vallarta9,
            data: 'La región destaca por una gran biodiversidad que incluye selvas tropicales secas, manglares y ecosistemas marinos. Su vegetación cuenta con especies como la parota, la ceiba y manglares que protegen contra huracanes. En su fauna habitan jaguares, ocelotes, cocodrilos y más de 400 especies de aves, además de recibir anualmente a la ballena jorobada entre diciembre y marzo.',
            reverse: true
        },
        {
            subtitle: 'Conflictos Socioambientales Identificados',
            img: vallarta7,
            data: 'El desarrollo inmobiliario de lujo y el turismo de masas causan una crisis socioambiental en Puerto Vallarta, provocando desabasto de agua y playas contaminadas por obras que rompen mantos acuíferos. A esto se suma el cierre ilegal de 15 playas, daños en los ríos Ameca y Los Horcones, deforestación con riesgo de deslaves y un colapso en el manejo de basura que genera incendios y constantes alertas atmosféricas.',
            reverse: false
        },
        {
            subtitle: 'Gentrificación y Desigualdad Social',
            img: vallarta10,
            data: 'La proliferación de plataformas de hospedaje digital como Airbnb ha encarecido drásticamente las rentas para la población local. Zonas residenciales tradicionales (como la colonia Versalles) viven procesos de gentrificación que desplazan a los residentes originarios hacia la periferia. Esto ha generado un modelo de segregación donde los desarrollos de lujo coexisten con colonias trabajadoras que carecen de servicios básicos e infraestructura adecuada.',
            reverse: true
        },
        {
            subtitle: 'Actores que Trabajan por el Cambio',
            img: vallarta8,
            data: 'Frente al deterioro socioambiental, diversas organizaciones locales impulsan el cambio: "Amigos por la Tierra" realiza campañas de limpieza y reforestación; el Grupo Ecológico de Puerto Vallarta defiende legalmente áreas como el Estero El Salado; el Colectivo "Playas Libres" denuncia la privatización de accesos públicos; y la Organización para la Conservación de los Árboles (OCA) protege el arbolado urbano.',
            reverse: false
        },
    ]
}