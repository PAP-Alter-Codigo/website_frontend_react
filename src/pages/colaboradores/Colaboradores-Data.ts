// src/types/colaboradores.ts
export type Period = "primavera" | "verano" | "otoño";

export type Persona = {
  nombre: string;
  carrera: string;
  categoria: string;
  contacto?: string;
  imagen?: string; // ruta
};
export type YearData = {
  year: number;
  periodos: { name: string; data: Persona[] }[];
}[];


import otoño1 from '@assets/colaboradores/2025/otoño/IMG_8544.png'
import otoño2 from '@assets/colaboradores/2025/otoño/IMG_8547.png'
import otoño3 from '@assets/colaboradores/2025/otoño/IMG_8550.png'
import otoño4 from '@assets/colaboradores/2025/otoño/IMG_8576.png'
import otoño5 from '@assets/colaboradores/2025/otoño/IMG_8569.png'
import otoño6 from '@assets/colaboradores/2025/otoño/IMG_8565.png'
import otoño7 from '@assets/colaboradores/2025/otoño/IMG_8932.png'

import verano1 from '@assets/colaboradores/2024/verano/FranciscoMeza.jpeg'
import verano2 from '@assets/colaboradores/2024/verano/ChristaBarrios.jpeg'
import verano3 from '@assets/colaboradores/2024/verano/ErnestoRodriguez.jpeg'
import verano4 from '@assets/colaboradores/2024/verano/IvanaLedesma.jpeg'
import verano5 from '@assets/colaboradores/2024/verano/OdetteLopez.jpeg'
import verano6 from '@assets/colaboradores/2024/verano/IanParres.jpeg'


export const ColaboradoresVerano2024: Persona[] = [
    {
        nombre: 'Francisco Meza Escoto',
        carrera: 'Lic. en Comunicación y Artes Audiovisuales',
        categoria: 'Audio',
        contacto: '',
        imagen: verano1,
    },
    {
        nombre: 'Christa Barrios Martínez',
        carrera: 'Ingeniería y Ciencia de Datos',
        categoria: 'Tecnologias y desarrollo',
        contacto: '',
        imagen: verano2,
    },
    {
        nombre: 'Ernesto Rodríguez Hernández',
        carrera: 'Lic. en Comunicación y Artes Audiovisuales',
        categoria: 'Audio',
        contacto: '',
        imagen: verano3,
    },
    {
        nombre: 'Ivana Ledesma Osuna',
        carrera: 'Lic. en Ciencias de la Comunicación',
        categoria: 'Trabajo comunitario',
        contacto: '',
        imagen: verano4,
    },
    {
        nombre: 'Odette López Cuevas',
        carrera: 'Lic. en Gestión Cultural',
        categoria: 'Trabajo comunitario',
        contacto: '',
        imagen: verano5,
    },
    {
        nombre: 'Ian Parres Ocegueda',
        carrera: 'Lic. en Comunicación y Artes Audiovisuales',
        categoria: 'Audio',
        contacto: '',
        imagen: verano6,
    }
]

export const ColaboradoresOtoño2025: Persona[] = [
    {
        nombre: 'Victoria Valle Chávez',
        carrera: 'Lic. En Arte y Creación.',
        categoria: 'Artes',
        contacto: '',
        imagen: otoño1,
    },
    {
        nombre: 'Ximena García García',
        carrera: 'Lic. En Diseño Integral.',
        categoria: 'Redes',
        contacto: '',
        imagen: otoño4,
    },
    {
        nombre: 'Carla Ximena Ramírez Gutiérrez',
        carrera: 'Lic. En Diseño Integral.',
        categoria: 'Redes',
        contacto: '',
        imagen: otoño5,
    },
    {
        nombre: 'Eduardo Sedano Álvarez',
        carrera: 'Lic. En Ciencias De La Comunicación.',
        categoria: 'Trabajo Comunitario',
        contacto: '',
        imagen: otoño7,
    },
    {
        nombre: 'Santiago González Solórzano',
        carrera: 'Lic. En Comunicación y Artes Audiovisuales.',
        categoria: 'Audio',
        contacto: '',
        imagen: otoño2,
    },
    {
        nombre: 'Mónica Michelle Reyes Hernández',
        carrera: 'Lic. En Comunicación y Artes Audiovisuales.',
        categoria: 'Audio',
        contacto: '',
        imagen: otoño3,
    },
    {
        nombre: 'Daniela Bustos Crispin',
        carrera: 'Lic. En Comunicación y Artes Audiovisuales.',
        categoria: 'Redes',
        contacto: '',
        imagen: '',
    },
    {
        nombre: 'José Jorge Villarreal Farias',
        carrera: 'Lic. En Desarrollo de Software. ',
        categoria: 'Tecnologias y desarrollo',
        contacto: '',
        imagen: otoño6,
    },
]


export const ColaboradoresPrimavera2026: Persona[] = [
    {
        nombre: '',
        carrera: '',
        categoria: '',
        contacto: '',
        imagen: '',
    }
]




export const PeriodosData: YearData = [
    {
        year: 2025,
        periodos: [
            {
                name: "Otoño",
                data: ColaboradoresOtoño2025
            }
        ]
    },
    {
        year: 2024,
        periodos: [
            {
                name: "Verano",
                data: ColaboradoresVerano2024
            }
        ]
    }
];