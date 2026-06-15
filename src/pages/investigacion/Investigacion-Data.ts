import { ResearchTypeEnum, type ResearchItem } from "../../components/Research-Card";

// Import images (add actual images to @assets/investigacion/)

import img1 from "@assets/investigacion/IMG_8323.webp";
import img2 from "@assets/investigacion/IMG_9789.webp";
import img3 from "@assets/investigacion/IMG_8494.webp";
import img4 from "@assets/investigacion/IMG_8256.webp";
import img5 from "@assets/investigacion/IMG_8489.webp";
import img6 from "@assets/investigacion/IMG_9742.webp";

export const researchItems: ResearchItem[] = [
  {
    id: "1",
    title: "Emotional Management Strategies and Care for Women Defenders of the Territory in Jalisco",
    description: "Cómo las activistas de Jalisco transforman el miedo y la sobrecarga de cuidados en resistencia colectiva.",
    type: ResearchTypeEnum.Article, 
    image: img1,
    url: "https://www.researchgate.net/publication/384323212_Emotional_Management_Strategies_and_Care_for_Women_Defenders_of_the_Territory_in_Jalisco",
    author: "Daniela Gloss Nuñez, Silvana Mabel Nuñez Fadda",
    date: "2024-09"
  },
  {
    id: "2",
    title: "Place Attachment Disruption: Emotions and Psychological Distress in Mexican Land Defenders",
    description: "Estudio sobre el impacto psicológico del daño ambiental en defensores del territorio de El Salto y Juanacatlán.",
    type: ResearchTypeEnum.Article,
    image: img2,
    url: "https://www.researchgate.net/publication/399289286_Place_Attachment_Disruption_Emotions_and_Psychological_Distress_in_Mexican_Land_Defenders",
    author: "Silvana Mabel Nuñez Fadda, Daniela Mabel Gloss Nuñez",
    date: "2026-01" 
  },
  {
    id: "3",
    title: "Emociones y estrategias de manejo emocional en la defensa del territorio de mujeres de la cuenca Lerma-Chapala-Santiago",
    description: "Análisis sobre cómo las defensoras de la cuenca superan el aislamiento mediante redes de apoyo mutuo.",
    type: ResearchTypeEnum.Book,
    image: img3, 
    url: "https://www.researchgate.net/publication/400631215_Emociones_y_estrategias_de_manejo_emocional_en_la_defensa_del_territorio_de_mujeres_de_la_cuenca_Lerma-Chapala-Santiago",
    author: "Daniela Gloss Nuñez",
    date: "2024-02"
  },
  {
    id: "4",
    title: "Política de los cuidados: Las luchas de las mujeres por la defensa del territorio en Jalisco",
    description: "Video introductorio sobre la invisibilización de los cuidados en defensoras ambientales de Jalisco.",
    type: ResearchTypeEnum.Video,
    image: img4,
    url: "https://youtu.be/7L7SRjAlnM0",
    author: "Lab de Análisis de Orgs y Movimientos Sociales",
    date: "2025-03"
  },
  {
    id: "5",
    title: "Día del Medio Ambiente",
    description: "Capsula Informativa con la Maestra Daniela Gloss con reflexiones sobre activismo y cuidado mutuo en el Día del Medio Ambiente.",
    type: ResearchTypeEnum.Video, 
    image: img5, 
    url: "https://www.facebook.com/reel/3496106597211627",
    author: "Anima tv",
    date: "2025"
  },
  {
    id: "6",
    title: "Espiritualidad y emociones en las luchas de mujeres defensoras del territorio en Jalisco",
    description: "Cápsula audiovisual sobre el uso de rituales y la espiritualidad como herramientas de resistencia.",
    type: ResearchTypeEnum.Video,
    image: img6,
    url: "https://youtu.be/VKBPVGO7wFQ",
    author: "Lab de Análisis de Orgs y Movimientos Sociales",
    date: "2025-03"
  }
];