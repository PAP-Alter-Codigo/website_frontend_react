// src/types/colaboradores.ts
export type Period = "primavera" | "verano" | "otoño";

export type Persona = {
  nombre: string;
  carrera: string;
  categoria: string;
  contacto?: string;
  imagen?: string; // ruta
};



import otoño1 from '@assets/colaboradores/2025/otoño/IMG_8544.png'
import otoño2 from '@assets/colaboradores/2025/otoño/IMG_8547.png'
import otoño3 from '@assets/colaboradores/2025/otoño/IMG_8550.png'
import otoño4 from '@assets/colaboradores/2025/otoño/IMG_8576.png'
import otoño5 from '@assets/colaboradores/2025/otoño/IMG_8569.png'
import otoño6 from '@assets/colaboradores/2025/otoño/IMG_8565.png'


export const otoño2025 = [
    {
        nombre: 'Victoria Valle Chávez',
        carrera: 'Lic. En Arte y Creación.',
        categoria: 'Artes',
        contacto: '',
        imagen: otoño1,
    },
    {
        nombre: ' Ximena García García ',
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
        nombre: 'Eduardo Sedano Álvarez. ',
        carrera: 'Lic. En Ciencias De La Comunicación.',
        categoria: 'Trabajo Comunitario',
        contacto: '',
        imagen: '',
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


export const primavera2026 = [
    {
        nombre: '',
        carrera: '',
        categoria: '',
        contacto: '',
        imagen: '',
    }
]