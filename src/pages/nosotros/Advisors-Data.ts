export interface Advisor {
  name: string;
  degrees: string[];
  expertise: string;
  photoPath: string;
}


import imgAdvisor1 from '@assets/colaboradoresNosotros/Selene.jpg'
import imgAdvisor2 from '@assets/colaboradoresNosotros/DaniGloss.jpg'
import imgAdvisor3 from '@assets/colaboradoresNosotros/Frank.jpg'
import imgAdvisor4 from '@assets/colaboradoresNosotros/JoseRamon.jpeg'
import imgAdvisor5 from '@assets/colaboradoresNosotros/LuzEstela.jpeg'
import imgAdvisor6 from '@assets/colaboradoresNosotros/Roberto.jpg'
import imgAdvisor7 from '@assets/colaboradoresNosotros/Alexei.jpeg'
import imgAdvisor8 from '@assets/colaboradoresNosotros/Andrea.jpeg'


export const ADVISORS: Advisor[] = [
  {
    name: "Selene Cruz Pastrana",
    degrees: [
      "Lic. en Antropología Social",
      "Mtra. en Antropología y Ciencias Sociales",
      "Dra. en Ciencias Sociales con especialidad en Antropología"
    ],
    expertise: "Cuidados, pueblos indígenas y salud",
    photoPath: imgAdvisor1
  },
  {
    name: "Daniela Gloss Nuñez",
    degrees: [
      "Lic. en Ciencias de la Comunicación",
      "Mtra. en Comunicación de la Ciencia y la Cultura",
      "Dra. en Ciencias Sociales"
    ],
    expertise: "Conflictividad socioambiental, defensa del territorio, emociones y cuidados",
    photoPath: imgAdvisor2
  },
  {
    name: "Francisco Rivera Gutiérrez",
    degrees: ["Lic. en Comunicación"],
    expertise: "Postproducción, guionismo y animación 2D",
    photoPath: imgAdvisor3
  },
  {
    name: "José Ramón Becerra Zendejas",
    degrees: ["Mtro. en Derechos humanos y paz"],
    expertise: "Estudios de derechos humanos y comunicación",
    photoPath: imgAdvisor4
  },
  {
    name: "Luz Estela Álvarez Iturriaga",
    degrees: ["Mtra. en Mercadotecnia Global"],
    expertise: "Comunicación de la ciencia, gestión de la investigación y posgrado",
    photoPath: imgAdvisor5
  },
  {
    name: "Roberto Castellanos Hernández",
    degrees: ["Lic. en Comunicación y Artes Audiovisuales"],
    expertise: "Diseño de videojuegos",
    photoPath: imgAdvisor6
  },
  {
    name: "Alexei de Alba Álvarez",
    degrees: ["Ingeniero en Sistemas"],
    expertise: "Diseño y desarrollo de software",
    photoPath: imgAdvisor7
  },
  {
    name: "Andrea Garibay García",
    degrees: [
      "Educadora Ambiental",
      "Licenciada en Artes Visuales para la Expresión Plástica",
      "Maestrante en Diseño Estratégico e Innovación Social"
    ],
    expertise: "Educación ambiental, diseño estratégico e innovación social",
    photoPath: imgAdvisor8
  }
];