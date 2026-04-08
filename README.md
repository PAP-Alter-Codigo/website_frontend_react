# 🌱 Resonancias: Mujeres y Territorios

Proyecto web colaborativo para **visibilizar las luchas socioambientales en Jalisco** desde una perspectiva de género, comunidad y resistencia.  
Este sitio reúne recursos digitales, podcasts, medios, directorios y colaboradores que forman parte del colectivo.

---

## 📖 Descripción

**Resonancias** es una plataforma transmedia desarrollada con tecnologías web modernas.  
Busca ser un espacio de encuentro y memoria donde las mujeres y comunidades defensoras del territorio puedan compartir experiencias, recursos y proyectos.

El sitio incluye:
- **Inicio** con presentación del proyecto.
- **Podcast**: acceso a episodios de _Resonante_, con reflexiones y experiencias.
- **Medios**: catálogo de imágenes y videos producidos por el colectivo.
- **Directorio**: listado de asesoras y especialistas.
- **Colaboradores**: historial de quienes han participado en cada semestre/año, organizado por áreas.
- Etc

---

## 🛠️ Tecnologías utilizadas

- **React** para la estructura de las páginas.
- **[Tailwind CSS](https://tailwindcss.com/)** para estilos modernos y responsivos.
- **Typescript** para interactividad (carruseles, modales, filtros, acordeones).
- **Git/GitHub** para control de versiones.

---

## 🛠️ Desarrollo
```
# 1) Instalar pnpm
npm install -g pnpm

# 2) Instalar con pnpm
pnpm install

# 3) Entorno de desarrollo
pnpm dev

# 4) Build producción
pnpm build

# 5) Previsualizar build
pnpm preview
```

## 🛠️ Contribution

### Imagenes
- Mantener una organizacion por carpetas de las imagenes a utilizar
- src/assets
- organizar todo por carpetas
- las principales carpetas seran 
    - Comunidades
    - Colaboradores

### Comunity Pages
- dentro de src/pages/comunidades encontraras las pages y componentes de las fichas de comunidades
- dentro de centro se definio ya una estructura en donde solo hay que nutrir un json y ya se renderiza automaticamente para escalabilidad y facilidad, en caso de comenzar con otras regiones replicar lo hecho aqui
    - para modificar solo hay que editar Centro-Data.ts, ahi estan los imports y la estructura
    - reproducir esta estructura para las siguientes comunidades y regiones
- En el caso de las fichas internas de cada comunidad (mural, juegos de mesa, corto, etc.), la ficha debera de ser desarrollada individualmente en su respectiva carpeta