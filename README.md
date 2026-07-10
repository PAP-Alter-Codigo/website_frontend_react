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

Esta sección detalla cómo mantener, actualizar y expandir el sitio web de **Resonancias**.

### 1. 📁 Gestión de Imágenes y Assets
Para mantener el proyecto ordenado, todas las imágenes deben organizarse por carpetas temáticas dentro de `src/assets/`:
- **`src/assets/comunidades/`**: Fotos generales de las comunidades. Si una comunidad tiene recursos específicos (como mapas o cortos), crea una subcarpeta dedicada (ej. `staCruz/` o `juanacatlan/`).
- **`src/assets/colaboradores/`**: Fotografías de los colaboradores organizadas por año y periodo académico (ej. `colaboradores/2025/otoño/`).
- **`src/assets/colaboradoresNosotros/`**: Fotografías de las asesoras y el equipo principal (advisors).
- **`src/assets/regiones/`**: Banners e imágenes principales para cada región geográfica.
- **`src/assets/investigacion/`**: Portadas de artículos y recursos de investigación.
- **`src/assets/brushStrokes/` / `src/assets/bigStrokes/`**: Pinceladas y elementos decorativos de la interfaz.

**Recomendaciones de formato:**
* Se sugiere el uso del formato **`.webp`** por su alta compresión y optimización de rendimiento para web.
* También se aceptan formatos estándar como `.png`, `.jpg` y `.jpeg`.
* Nombra los archivos de forma descriptiva utilizando minúsculas y guiones (ej: `foto-comunidad-principal.webp`).

---

### 2. 🗄️ Archivos de Datos `*-Data.ts` (Base de Datos Local)
El proyecto utiliza una arquitectura desacoplada donde el diseño visual se separa del contenido usando archivos de datos estáticos `*-Data.ts` (o `*-data.ts`). Estos actúan como la "base de datos" del sitio. 
Para cambiar textos, imágenes o enlaces de una sección, **no necesitas modificar el código del componente JSX/TSX**, solo edita su archivo de datos correspondiente:

* **`src/pages/comunidades/Comunidades-Data.ts`**: Define las regiones (Centro, Valles, etc.) y los enlaces a sus respectivas comunidades.
* **`src/pages/comunidades/centro/Centro-Data.ts`**: Contiene la información estructurada de las comunidades de la región Centro (Juanacatlán, Santa Cruz de las Flores) como subtítulos, textos de secciones, carruseles de fotos y recursos.
* **`src/pages/colaboradores/Colaboradores-Data.ts`**: Contiene la lista de personas colaboradoras organizadas por año y periodo académico (Otoño, Verano, Primavera).
* **`src/pages/nosotros/Advisors-Data.ts`**: Define la información académica, experiencia y foto de las asesoras del PAP.
* **`src/pages/investigacion/Investigacion-Data.ts`**: Alberga la información de artículos, publicaciones y videos de investigación.
* **`src/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/Mapa-Interactivo-Story-Data.ts`**: Estructura la narrativa, métricas destacadas y enlaces de Tableau del mapa interactivo.

**Cómo editar:**
1. Importa la imagen al inicio del archivo: `import miImagen from "@assets/carpeta/imagen.webp"`.
2. Añádela en la estructura del objeto o arreglo tipado que corresponda.

---

### 3. 🗺️ Mapa Interactivo de Santa Cruz de las Flores
El mapa interactivo es una de las herramientas clave del sitio para visualizar la defensa y despojo del agua.

* **Ubicación del código:** `src/pages/comunidades/centro/sta cruz de las flores/mapa-interactivo/`
  * `Mapa-Interactivo-Page.tsx`: Contenedor principal de la página, acordeones y descripciones.
  * `Mapa-Interactivo-Humedal-AguasSub.tsx`: Lógica de renderizado del mapa usando Leaflet y React-Leaflet.
  * `Mapa-Interactivo-Story.tsx` y `Mapa-Interactivo-Story-Data.ts`: Narrativa de la crisis del agua y las secciones complementarias (despojo, luchas, metodología, etc.).
  * Subcarpeta `data/`: Contiene los cargadores (`loaders.ts`), constantes de colores e íconos por uso (`constants.tsx`) y los tipos TypeScript (`types.ts`).

* **Ubicación de los Datos Geográficos:** Los datos del mapa se sirven de forma estática desde la carpeta pública en:
  `public/data/mapas/sta-cruz-de-las-flores/`
  * **`/geojson/`**: Archivos `.geojson` que definen los puntos geográficos en el mapa (ej. `humedal.geojson`, `santa-cruz-aguas-subterraneas.geojson`, etc.).
  * **`/metadata/`**: Archivos `.json` de REPDA que contienen la información detallada que aparece al hacer clic en un pozo (se asocian dinámicamente mediante el atributo `Name` del geojson).
  * **`/csv/`**: Archivos `.csv` disponibles para que los usuarios los descarguen directamente.

**Cómo colaborar o actualizar el mapa:**
* Si deseas **actualizar la información detallada** o añadir nuevos pozos con datos gubernamentales, edita o reemplaza los JSON del REPDA en `/metadata/` o los GeoJSON en `/geojson/`.
* Si quieres **modificar la narrativa, las gráficas embebidas de Tableau o las referencias**, hazlo desde `Mapa-Interactivo-Story-Data.ts`.

---

### 4. 🗂️ Páginas de Comunidades (Community Pages)
* Dentro de `src/pages/comunidades` encontrarás las páginas y componentes de las fichas de comunidades.
* Dentro de la carpeta `centro` se definió una estructura basada en datos en donde solo hay que nutrir un JSON/objeto en `Centro-Data.ts` para que se renderice automáticamente (ideal para escalabilidad y facilidad).
  * En caso de comenzar con otras regiones (Valles, Lagunas, etc.), **replica esta estructura basada en datos**.
* En el caso de fichas internas complejas para cada comunidad (como un mural, un cortometraje o un juego de mesa), desarrolla la página y componentes de forma individual dentro de una subcarpeta dedicada a dicha comunidad.

---

### 5. 🚀 Crear Nuevas Secciones o Páginas desde Cero
Si necesitas añadir una página completamente nueva al sitio, sigue estos pasos:

1. **Crear el Componente de Página:**
   Crea una nueva carpeta bajo `src/pages/` (ej. `src/pages/mi-nueva-pagina/`) y dentro de ella define tu archivo principal TSX (ej. `Mi-Nueva-Pagina.tsx`).
   
2. **Definir la Ruta:**
   Abre [src/App.tsx] e importa tu nuevo componente de página. Luego, regístralo bajo el componente `<Routes>`:
   ```tsx
   import MiNuevaPagina from './pages/mi-nueva-pagina/Mi-Nueva-Pagina';
   
   // ... dentro de <Routes>
   <Route path="/mi-nueva-ruta" element={<MiNuevaPagina />} />
   ```

3. **Agregar Navegación:**
   Si la página debe ser accesible globalmente, agrégala en el componente de cabecera (`AppHeader` en `src/components/App-Header.tsx`) o como enlace en alguna sección existente.