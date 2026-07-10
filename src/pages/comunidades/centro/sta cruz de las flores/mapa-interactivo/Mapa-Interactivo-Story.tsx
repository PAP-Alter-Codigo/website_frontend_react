import { useState } from "react"
import MapaInteractivoHumedalAguasSub from "./Mapa-Interactivo-Humedal-AguasSub"
import { DEFAULT_DATASETS } from "./data/loaders"
import {
  TABLEAU_EMBEDS,
  INMOBILIARIAS_CALLOUTS,
  DESPOJO_CALLOUTS,
  MAP_SNAPSHOTS,
  IMAGE_SNAPSHOTS,
  LEGAL_ARTICLES,
  METODOLOGIA_PARAGRAPHS,
  SECTION_CONFIGS,
  REFERENCIAS,
  type TableauEmbedData,
  type CalloutCardData,
  type SnapshotData,
  type LegalArticleData,
  type ReferenciasData,
  INSTRUCCIONES_TAMANO_VOLUMEN,
} from "./Mapa-Interactivo-Story-Data"


// ── Shared UI components ──────────────────────────────────────────────────────

interface SectionWrapperProps {
  children: React.ReactNode
  background?: string
}

function SectionWrapper({ children, background = "#ffffff" }: SectionWrapperProps) {
  return (
    <section
      className="py-16 px-[clamp(16px,4vw,64px)]"
      style={{ background }}
      data-aos="fade-up"
    >
      <div className="max-w-[1024px] mx-auto">{children}</div>
    </section>
  )
}

interface SectionTitleProps {
  color: string
  borderColor: string
  children: React.ReactNode
  marginBottom?: number
}

function SectionTitle({
  color,
  borderColor,
  children,
  marginBottom = 32,
}: SectionTitleProps) {
  return (
    <h2
      className="font-black pl-[18px] border-l-5 leading-tight text-[clamp(22px,3vw,34px)]"
      style={{
        color,
        borderLeftColor: borderColor,
        marginBottom,
      }}
    >
      {children}
    </h2>
  )
}

interface QuoteBlockProps {
  text: React.ReactNode
  author: string
  borderColor: string
  bgColor: string
  citeColor: string
  margin?: string
}

function QuoteBlock({
  text,
  author,
  borderColor,
  bgColor,
  citeColor,
  margin = "20px 0",
}: QuoteBlockProps) {
  return (
    <blockquote
      className="py-[18px] px-[22px] rounded-r-[10px] border-l-4"
      style={{
        borderLeftColor: borderColor,
        background: bgColor,
        margin,
      }}
    >
      <p className="text-gray-700 leading-relaxed text-[15px] italic mb-[10px]">{text}</p>
      <cite
        className="font-bold not-italic block text-xs"
        style={{ color: citeColor }}
      >
        {author}
      </cite>
    </blockquote>
  )
}

function TableauEmbed({ data }: { data: TableauEmbedData }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] my-7">
      <div className="bg-slate-50 py-[11px] px-4 border-b border-slate-200 flex items-center gap-2.5">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: data.color }}
        />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Visualización interactiva · Tableau Public
        </span>
      </div>
      <div className="bg-slate-50 pt-1.5 pb-2.5 px-4 text-[13px] font-semibold text-slate-800">
        {data.title}
      </div>
      <iframe
        src={data.src}
        width="100%"
        height={data.height ?? 500}
        className="block"
        allow="fullscreen"
        title={data.title}
      />
    </div>
  )
}

function Snapshot({ data }: { data: SnapshotData }) {
  return (
    <div className="my-7 rounded-[14px] overflow-hidden border border-slate-200">
      <div
        className="py-2.5 px-[18px] border-b flex items-center gap-2.5"
        style={{
          background: data.headerBg,
          borderBottomColor: data.headerBorder,
        }}
      >
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: data.dotColor }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: data.labelColor }}
        >
          {data.label}
        </span>
      </div>
      {data.image ? (
        <div className="w-full overflow-hidden">
          <img
            src={data.image}
            alt={data.label}
            className="w-full h-auto block"
          />
        </div>
      ) : (
        <div className="h-[220px] bg-slate-100 flex items-center justify-center flex-col gap-2.5">
          <span className="text-[13px] font-semibold font-mono text-slate-500">
            {data.label}
          </span>
        </div>
      )}
    </div>
  )
}

function CalloutCard({ data }: { data: CalloutCardData }) {
  return (
    <div
      className="rounded-xl py-5 px-[22px] flex-1 min-w-[200px] border"
      style={{
        background: data.bgColor,
        borderColor: data.borderColor,
      }}
    >
      <div
        className="text-[clamp(26px,4vw,40px)] font-black leading-none tracking-tight"
        style={{ color: data.valueColor }}
      >
        {data.value}
      </div>
      <div className="text-[13px] font-bold text-gray-700 mt-2">{data.label}</div>
      {data.description && (
        <div className="text-xs text-gray-500 mt-1 leading-normal">
          {data.description}
        </div>
      )}
    </div>
  )
}

function CalloutRow({ callouts }: { callouts: CalloutCardData[] }) {
  return (
    <div className="flex flex-wrap gap-4 my-7">
      {callouts.map((c) => (
        <CalloutCard key={c.label} data={c} />
      ))}
    </div>
  )
}

function LegalArticleBlock({ articles }: { articles: LegalArticleData[] }) {
  return (
    <div className="bg-sky-50 border border-sky-200 rounded-xl py-[22px] px-[26px] my-7">
      <h4 className="text-[12px] font-bold text-sky-700 uppercase tracking-[0.06em] mb-[18px]">
        Obligaciones de Conagua · Ley Nacional de Aguas
      </h4>
      <div className="flex flex-col gap-4">
        {articles.map((a) => (
          <div key={a.number} className="border-l-2 border-sky-300/40 pl-[18px]">
            <div className="text-[11px] font-bold text-sky-700 mb-[6px] uppercase tracking-[0.06em]">
              {a.number}
            </div>
            <p
              className="text-sm text-gray-700 leading-[1.7] m-0"
              dangerouslySetInnerHTML={{ __html: a.text }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface AccordionProps {
  label: string
  children: React.ReactNode
}

function Accordion({ label, children }: AccordionProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-[18px] px-6 bg-slate-100 cursor-pointer border-none text-left font-inherit text-sm"
      >
        <span className="font-semibold text-slate-700">{label}</span>
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#64748b"
          strokeWidth="2"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="py-6 px-[26px] border-t border-slate-200 text-slate-600 text-sm leading-relaxed flex flex-col gap-4">
          {children}
        </div>
      )}
    </div>
  )
}

// ── Section 1: El despojo originario ─────────────────────────────────────────

function Section1ElDespojo() {
  const { background, titleColor, borderColor } = SECTION_CONFIGS.despojo
  return (
    <SectionWrapper background={background}>
      <SectionTitle color={titleColor} borderColor={borderColor}>
        El despojo originario del agua en el valle de Xuchitlán
      </SectionTitle>

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-[18px]">
        <p>
          Cuando R, investigadora del comité Agua y Vida y miembro de una de las familias fundadoras del pueblo,
          a quien se le otorgó ese pseudónimo por seguridad, era niña, el agua parecía brotar por sí sola de la tierra.
          Cada casa tenía su propio pozo y había bebederos comunitarios. Al estar el pueblo sentado en la parte más
          baja de la cuenca del río Santiago-Guadalajara, el agua de los diversos manantiales y arroyos como Los Guayabos,
          El Arenal y las múltiples escorrentías de los cerros circundantes bajaba por la gravedad y surtía las tomas
          ubicadas en distintos puntos del pueblo. No eran pozos grandes, sino pedestales pequeños y con sogas donde
          había que meter la cubeta para sacar el agua.{" "}
          <strong>
            El agua estaba tan cerca que R recuerda haber alcanzado a ver el espejo de agua a unos 10 metros.
          </strong>
        </p>
        <p>
          La abundancia de agua vio a Santa Cruz de las Flores ―de la misma forma en que vio a muchos otros
          pueblos― prosperar gracias a ella y a la capacidad que les daba de llevar una forma de vida autónoma;
          el agua les daba el poder de generar subsistencia propia, sin tener que depender de la industria,
          teniendo sus medios de sobrevivencia asegurados.
        </p>

        <QuoteBlock
          text='"Yo pienso que es como una cierta forma de vida hasta entregada a que tú te haces
          responsable de ti mismo. ¿Quieres un huevo? Ahí tienes tu gallina. ¿Quieres fruta?
          Ahí está el árbol."'
          author="— R, integrante del comité Agua y Vida de Santa Cruz de las Flores, Tlaj."
          borderColor="#38bdf8"
          bgColor="#f0f9ff"
          citeColor="#0284c7"
          margin="4px 0"
        />

        <p>Por lo mismo, cuenta R, que se tenía en Santa Cruz una cultura de no desperdicio.</p>

      </div>

      {/* mapa con capa de 1991 */}
      <div className="my-7 rounded-[14px] overflow-hidden border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div
          className="py-2.5 px-[18px] border-b flex items-center gap-2.5"
          style={{
            background: MAP_SNAPSHOTS.mapa1991.headerBg,
            borderBottomColor: MAP_SNAPSHOTS.mapa1991.headerBorder,
          }}
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: MAP_SNAPSHOTS.mapa1991.dotColor }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: MAP_SNAPSHOTS.mapa1991.labelColor }}
          >
            {MAP_SNAPSHOTS.mapa1991.label}
          </span>
        </div>
        <MapaInteractivoHumedalAguasSub
          datasets={[
            DEFAULT_DATASETS.find(d => d.key === "1991")!,
            DEFAULT_DATASETS.find(d => d.key === "Humedal 2020")!,
          ]}
          lazy
        />
      </div>

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-[18px]">
        <p>
          A pesar de esto, los problemas ya se gestaban en el territorio. Los primeros asentamientos
          industriales se dieron en los 60 y 70, con la explotación geológica de la zona, recuerda
          R, quienes extraían metales de los cerros de la parte volcánica y de Tala. Este fenómeno
          se dio en paralelo a otros procesos industriales en la zona, como la industrialización en
          El Salto. {" "}
          <strong>
            A mediados de los setentas se establece la Empresa de Calzado Canadá
          </strong>
          , la cual utiliza sustancias para sus procesos de curtido que comenzaron
          a dañar y acidificar las tierras de la zona.
        </p>
        <p>
          Durante las siguientes décadas, también se empezó a dar el cambio a la industrialización
          del pueblo y las personas. Con la llegada de las primeras fábricas, los campesinos
          comenzaron a entrar en dinámicas de trabajo asalariado. Sin embargo, en esta etapa aún
          mantenían una vida anfibia, como le llama R, donde trabajaban en la fábrica, pero
          no dejaban sus parcelas ni sus siembras.
        </p>
        <p>
          No es hasta finales de los 80 cuando se intensifica la idea del cambio de proyecto de vida
          de la comunidad. El discurso de la transición a un pueblo industrial se vendía como un
          suceso aspiracionista y de progreso, con posibilidades de buenas prestaciones laborales.
          Lo que no sabían es que, a cambio, tendrían que entregar aquello que les permitía ser autónomos.
          Serían despojados del agua, la tierra y demás recursos naturales.{" "}
          <strong>
            Así, y con la llegada de la empresa agroindustrial Bayer Monsanto, comienza un
            proceso sistemático de destrucción del imaginario campesino.
          </strong>
        </p>
        <p>
          Y lo que se perdió con la llegada de esta industria fue una vida arraigada al campo y
          cercana al entorno natural, donde las familias sembraban árboles de frutas en sus hogares,
          como duraznos, aguacates, limones y mandarinas. En las parcelas del campo se cultivaba
          garbanzo y semillas como maíz, sorgo y calabaza. El maíz y el garbanzo todavía
          se sembraban en la década de los 70 y 80 directamente en la zona del humedal,
          pero hoy en día solo unos cuantos de estos sembradíos han logrado sobrevivir
          a la industrialización.
        </p>
        <p>
          Esta agricultura campesina tradicional ha sido reemplazada por métodos agresivos
          y agroindustriales modernos, como los monocultivos de berries y tomates,
          cuya forma de mantenimiento ha contaminado los flujos del pueblo.
        </p>
      </div>

      <TableauEmbed data={TABLEAU_EMBEDS.extraccion2005} />

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-[18px]">
        <p>
          Inicialmente, al estar el pozo en terreno ejidal, se mantuvo un esquema híbrido
          donde los pueblos administraban el agua a través de juntas locales.
          Sin embargo, R relata que estas juntas se convirtieron en centros
          de disputa de poder entre los ejidatarios y los representantes del municipio.
          Este conflicto anticiparía otros similares que debilitaron la habilidad de
          Santa Cruz de conservar su autonomía del agua.
        </p>
      </div>
    </SectionWrapper>
  )
}

// ── Section 2: Las primeras luchas ────────────────────────────────────────────

function Section2PrimerasLuchas() {
  const { background, titleColor, borderColor } = SECTION_CONFIGS.luchas
  return (
    <SectionWrapper background={background}>
      <SectionTitle color={titleColor} borderColor={borderColor}>
        Las primeras luchas por el agua
      </SectionTitle>

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-[18px]">
        <p>
          R forma parte de la segunda generación de mujeres y vecinos de Santa Cruz de las Flores
          que se encuentran en la lucha por la defensa del agua y del territorio.
          Ella comenzó a integrarse a estas luchas en los ochentas, participando
          en un plantón en el centro de Guadalajara que impidió la llegada del basurero
          que eventualmente se convertiría en el vertedero “Los Laureles”, que quería
          instaurarse en un terreno del ejido de Santa Cruz. Este se terminó instalando
          en los municipios de El Salto y Tonalá.
        </p>
        <p>
          Una década después,{" "}
          <strong>
            entre 1990 y 1993, se detonó una lucha más intensa contra el despojo y saqueo del agua.
          </strong>{" "}
          El objetivo era impedir que el Estado extrajera agua a través
          de 20 pozos profundos para llevarla fuera del territorio. En esa defensa hubo una vinculación
          con los pueblos de la zona, lo que llevó al movimiento a agruparse con una amplia participación social.
        </p>
        <p>
          Sin embargo, a principios de los 2000 y durante el gobierno de{" "}
          <strong>Francisco Ramírez Acuña</strong>, se reactivó el proyecto estatal para volver a intentar extraer
          agua de los pozos profundos de Santa Cruz.
        </p>

        <QuoteBlock
          text='"Todavía estaba muy viva la memoria de esta lucha del anterior, de una década atrás, y
        fue mucho más fuerte y más participativa porque vinieron más poblaciones de Tala, de los
        ranchitos. Yo creo que era tan fuerte la resistencia porque se sabía que sí se podía.
        Antes teníamos la duda, la incertidumbre, porque íbamos con el Estado. Aun así, pudimos
        parar y suspender esa decisión de extraer agua."'
          author="— R, integrante del comité Agua y Vida de Santa Cruz de las Flores, Tlaj."
          borderColor="#f59e0b"
          bgColor="#fffbeb"
          citeColor="#d97706"
          margin="0"
        />
        <p>
          R describe que lograr detener las obras fue como detener a dos jerarcas en dos épocas:
          uno del PRI en los 90 y otro del PAN en los 2000.
        </p>
        <p>
          Sin embargo, estos éxitos no durarían mucho. La década de los 2000, como se puede ver en
          la siguiente gráfica, marcó la primera oleada de aumento de permisos de descargas y extracción,
          y más adelante, aún más llegarían.
        </p>
      </div>

      <TableauEmbed data={TABLEAU_EMBEDS.extraccionTiempo} />
    </SectionWrapper>
  )
}

// ── Section 3: Las inmobiliarias ──────────────────────────────────────────────

function Section3Inmobiliarias() {
  const { background, titleColor, borderColor } = SECTION_CONFIGS.inmobiliarias
  return (
    <SectionWrapper background={background}>
      <SectionTitle color={titleColor} borderColor={borderColor}>
        La presencia de las inmobiliarias
      </SectionTitle>

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-[18px]">
        <p>
          Con la llegada del fraccionamiento Banús en 2006, la comunidad alertó que esto podría
          significar una gran problemática para su calidad y estilo de vida. Calisto Guzmán, uno de
          los vecinos de Santa Cruz de las Flores, a quien R describe como alguien que “defendió hasta
          el final sus parcelas”, ya en la defensa del 2005 anticipaba que el poblado no podía
          permitirse convertirse en la{" "}
          <strong>"basílica de todos los fraccionamientos"</strong>. Preveía que todas las descargas
          de aguas residuales irían cuesta abajo hacia donde Santa Cruz se encontraba, en la parte más
          baja. Esta situación detonó, en ese mismo año, una lucha con plantones de la comunidad en
          el cabildo municipal para exigir que no se aprobaran más fraccionamientos.
        </p>

        <p>
          Actualmente, en el registro público de descargas de aguas residuales predominan los cotos y
          las inmobiliarias. El mayor uso registrado de concesiones de descargas de aguas residuales
          es de “servicios”, con un 62,57% del total. Esta es agua destinada a actividades comerciales
          o de prestación de bienes y servicios que no son de índole doméstica ni manufacturera.
          De ahí le sigue un uso público urbano con 17,17%, donde este también incluye el condominio
          de Santa Anita. Le siguen en cantidad de volumen total “diferentes usos”, y en este mismo
          grupo de “diferentes usos”, también vemos la presencia de inmobiliarias con titulares como
          Proyectos Inmobiliarios Culiacán.
        </p>
      </div>

      <CalloutRow callouts={INMOBILIARIAS_CALLOUTS} />

      <TableauEmbed data={TABLEAU_EMBEDS.serviciosTreemap} />

      <p className="text-gray-700 leading-relaxed text-[15px]">
        Otro titular, (persona, empresa o institución con un permiso de concesión) con fuerte
        presencia en este sector es el de la empresa inmobiliaria Tierra y Armonía. Sus dos
        concesiones juntas tienen más de 30,000 m³ de extracción anual. Esta constructora ha estado
        edificando y ampliando el proyecto de fraccionamiento “Vista Sur”, cerca del corazón del
        arroyo Los Guayabos. Dicha ampliación ha provocado denuncias, movilizaciones y amparos
        por parte de la comunidad entre los años 2018 y 2024. El fraccionamiento está ubicado justo
        a un lado del condominio industrial FEMSA, el conglomerado de Coca-Cola. Tierra y Armonía
        pertenece a Beatriz Alfaro, tía del exgobernador.
      </p>

      {/*Mapa de Servicios en Santa Cruz, descarga y extraccion, tamaño por volumen*/}
      <div className="my-7 rounded-[14px] overflow-hidden border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div
          className="py-2.5 px-[18px] border-b flex items-center gap-2.5"
          style={{
            background: MAP_SNAPSHOTS.serviciosSantaCruz.headerBg,
            borderBottomColor: MAP_SNAPSHOTS.serviciosSantaCruz.headerBorder,
          }}
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: MAP_SNAPSHOTS.serviciosSantaCruz.dotColor }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: MAP_SNAPSHOTS.serviciosSantaCruz.labelColor }}
          >
            {MAP_SNAPSHOTS.serviciosSantaCruz.label}
          </span>
        </div>
        <MapaInteractivoHumedalAguasSub
          datasets={[
            DEFAULT_DATASETS.find(d => d.key === "Extracción de agua subterránea")!,
            DEFAULT_DATASETS.find(d => d.key === "Descargas de aguas residuales")!,
            DEFAULT_DATASETS.find(d => d.key === "Humedal 2020")!,
          ]}
          usoFiltroExacto={["SERVICIOS"]}
          showFiltros={false}
          tamanoPorVolumen
          shapePorCapa={{
            "Extracción de agua subterránea": "circle",
            "Descargas de aguas residuales": "square",
          }}
          instrucciones={INSTRUCCIONES_TAMANO_VOLUMEN}
          lazy
        />
      </div>

    </SectionWrapper>
  )
}

// ── Section 4: La industria ───────────────────────────────────────────────────

function Section4Industria() {
  const { background, titleColor, borderColor } = SECTION_CONFIGS.industria
  return (
    <SectionWrapper background={background}>
      <SectionTitle color={titleColor} borderColor={borderColor}>
        La industria
      </SectionTitle>

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-[18px]">
        <p>
          El uso industrial del agua acapara 3,42%. A pesar de ser el uso con menor porcentaje
          de descargas residuales, Santa Cruz es el poblado donde se encuentra una de las mayores
          concentraciones de concesiones en el municipio, representando 37.93% de los permisos
          industriales para descarga y extracción. El pueblo se ha visto asediado por problemas
          ambientales derivados de la industria, como malos olores, contaminación a los cuerpos de
          agua como el humedal de La Playa e incluso una contingencia ambiental cuando se quemó uno de
          los parques industriales.
        </p>
      </div>

      {/* Callout: Comité Agua y Vida */}
      <QuoteBlock
        text={
          <>
            <span className="not-italic block mb-[14px]">
              El colectivo Agua y Vida ha documentado de forma profunda el desarrollo de la industria
              en la zona del Antiguo Valle de Xuchitlán desde las décadas de los 60 con la explotación de
              tierras. La llegada de la industria se ha dado de forma irregular y dañina. De acuerdo con
              los archivos del Comité Agua y Vida, particularmente de la Ficha Técnica de Industrias e
              Inmobiliarias que realizaron, el impacto real de estas no se ha transparentado de forma
              correcta a la población. Por ejemplo, reportan manejos irregulares en las descargas
              residuales de las farmacéuticas, siendo descargadas estas a cielo abierto en el arroyo El
              Zarco, que atraviesa el humedal La Playa.
            </span>
            "La comunidad ha percibido espuma, color y olor penetrante; presentando dolor de cabeza,
            ardor de nariz y ojos, así como náuseas."
          </>
        }
        author="— Ficha Técnica de Industrias e Inmobiliarias, Comité Agua y Vida"
        borderColor="#ef4444"
        bgColor="#fef2f2"
        citeColor="#dc2626"
        margin="24px 0"
      />

      <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
        <Snapshot data={IMAGE_SNAPSHOTS.pozoZarco} />
        <Snapshot data={IMAGE_SNAPSHOTS.zarcoLirio} />
      </div>

      <p className="text-gray-700 leading-relaxed text-[15px] mb-6">
        En 2021, la Comisión Estatal de Derechos Humanos de Jalisco realizó un{" "}
        <a
          href="https://historico.cedhj.org.mx/recomendaciones/pronunciamientos/2021/Pronunciamiento%2015-2021.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 underline"
        >
          pronunciamiento
        </a>
        {" "}para atender el corredor industrial de Santa Cruz de las Flores en Tlajomulco de Zúñiga,
        con la perspectiva desde los estándares internacionales e interamericanos de derechos humanos
        y empresas. Ahí se explicitó la necesidad de llevar a cabo un diagnóstico sobre las implicaciones
        de los procesos contaminantes "derivados de comercio e industria" en Santa Cruz de las Flores.
      </p>

      <p className="text-gray-700 leading-relaxed text-[15px] mb-6">
        En 2019, los habitantes de Santa Cruz de las Flores{" "}
        <a
          href="https://oem.com.mx/eloccidental/local/habitantes-de-santa-cruz-de-las-flores-denuncian-contaminacion-ante-profepa-23991331"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 underline"
        >
          denunciaron
        </a>
        {" "}ante Profepa contaminación de las aguas residuales que son arrojadas directamente
        al drenaje de la población, y que sus calles habían sido invadidas por aguas espumosas
        de la empresa Pisa (El Occidental, 2019).
      </p>

      <p className="text-gray-700 leading-relaxed text-[15px] mb-6">
        Actualmente, no se ha realizado un diagnóstico de las afectaciones de salud en Santa Cruz de las Flores que se correlacione con la presencia de la industria. Pero se pueden adelantar  posibles daños a la salud tomando como referencia el pueblo industrial vecino de Santa Cruz, El Salto. En{" "}
        <a
          href="https://evalua.jalisco.gob.mx/wp-content/uploads/2024/06/Afectaciones_a_la_Salud_Rio_Santiago.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 underline"
        >
          afectaciones a la salud por la contaminación del río Santiago
        </a>
        {" "}(Secretaría de Planeación y Participación Ciudadana, 2024), se menciona que la exposición
        de las comunidades a contaminantes como resultado de la proximidad con la industria,
        como el mercurio, el plomo y el cadmio, puede causar afectaciones renales, hipertensión,
        enfermedades pulmonares, trastornos de tipo neurológico, enfermedades cardiovasculares,
        reacciones alérgicas y fallos respiratorios.
      </p>

      {/** Mapa Industria en Santa Cruz, descarga y extracción, tamaño por volumen*/}
      <div className="my-7 rounded-[14px] overflow-hidden border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div
          className="py-2.5 px-[18px] border-b flex items-center gap-2.5"
          style={{
            background: MAP_SNAPSHOTS.industriaSantaCruz.headerBg,
            borderBottomColor: MAP_SNAPSHOTS.industriaSantaCruz.headerBorder,
          }}
        >
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: MAP_SNAPSHOTS.industriaSantaCruz.dotColor }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: MAP_SNAPSHOTS.industriaSantaCruz.labelColor }}
          >
            {MAP_SNAPSHOTS.industriaSantaCruz.label}
          </span>
        </div>
        <MapaInteractivoHumedalAguasSub
          datasets={[
            DEFAULT_DATASETS.find(d => d.key === "Extracción de agua subterránea")!,
            DEFAULT_DATASETS.find(d => d.key === "Descargas de aguas residuales")!,
            DEFAULT_DATASETS.find(d => d.key === "Humedal 2020")!,
          ]}
          usoFiltroExacto={["INDUSTRIAL"]}
          showFiltros={false}
          tamanoPorVolumen
          shapePorCapa={{
            "Extracción de agua subterránea": "circle",
            "Descargas de aguas residuales": "square",
          }}
          instrucciones={INSTRUCCIONES_TAMANO_VOLUMEN}
          lazy
        />
      </div>

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-4 mb-7">
        <p>
          En 2017, PISA comenzó a expandir sus instalaciones. Actualmente,
          es la empresa con mayor cantidad de extracción de aguas subterráneas
          del acuífero San Isidro.{" "}
          <strong>
            PISA extrae un volumen de 3 millones 250 mil al año.
          </strong>{" "}
          Por otro lado, esta empresa tiene registros de descargas de aguas residuales,
          pero la cantidad de metros cúbicos que desecha no está registrada. Esta es
          una de las tantas inconsistencias y opacidades observadas en registro de
          concesiones de Repda.
        </p>
        <p>
          En cuanto a las descargas residuales industriales, Harinas de Maíz de Jalisco es la empresa
          que más descarga, seguida por Flextronics Technologies, Alan del Norte, Dulces Vero y
          Tequila del Señor.
        </p>
      </div>

      <TableauEmbed data={TABLEAU_EMBEDS.industriaBubbles} />

      <p className="text-gray-700 leading-relaxed text-[15px] mb-7">
        R recuerda que Pisa pretendía incrustarse en la región y conectar sus descargas
        industriales directamente a la red de drenaje de Santa Cruz para no pagar los costos de
        tratar sus propios desechos. Al darse cuenta de esta situación y del daño acumulado, las
        mujeres defensoras e integrantes de colectivos exigieron en 2017 frenar todo avance industrial
        para declararse como <strong>"pueblos libres de la industria"</strong>, y así empezaron a
        conectar su lucha a nivel regional. Estos colectivos se unieron a la Asamblea de Afectados
        Ambientales y a compañeros defensores de la cuenca Lerma-Chapala-Santiago. A pesar de esto,
        PISA sigue teniendo una fuerte presencia en el pueblo hoy en día.
      </p>

      <div className="flex flex-col gap-5">
        <TableauEmbed data={TABLEAU_EMBEDS.volumenTiempo} />
        <TableauEmbed data={TABLEAU_EMBEDS.tiempoPorTitular} />
      </div>

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-4 mt-6">
        <p>
          En este mismo periodo, podemos ver un alza significativa de descargas residuales.
          Además, a la empresa constructora{" "}
          <strong>
            Geo Jalisco se le otorgó una enorme concesión en 2010 de 4 millones 400 mil metros
            cúbicos al año.
          </strong>{" "}
          En ese mismo periodo, en un pico grande, se aumentó el Consorcio Hogar de Occidente y
          Consorcio de Ingeniería Integral y colonos BSA.
        </p>
        <p>
          En el siguiente pico, de 2014-2017, parece ser que apenas se integró al registro
          el sistema de agua y alcantarillado de Tlajomulco. Justo después, se le otorga
          otra gran concesión a Tierra y Armonía Construcción, con un volumen de{" "}
          <strong>689,000 metros cúbicos al año.</strong>
        </p>
      </div>
    </SectionWrapper>
  )
}

// ── Section 5: Despojo del agua ───────────────────────────────────────────────

function Section5DespojoAgua() {
  const { background, titleColor, borderColor } = SECTION_CONFIGS.despojoAgua
  return (
    <SectionWrapper background={background}>
      <SectionTitle color={titleColor} borderColor={borderColor} marginBottom={36}>
        Despojo del agua
      </SectionTitle>

      <div className="text-gray-700 leading-relaxed text-[15px] flex flex-col gap-[18px] mb-7">
        <p>
          La pérdida de acceso a fuentes de abastecimiento del agua no fue un proceso inocuo.
          Para Santa Cruz de las Flores, el largo trayecto de pueblo originario a pueblo “industrial”
          fue una ruptura que propició una acumulación originaria a costa de sus habitantes,
          donde el Estado participó de forma directa.
        </p>
        <p>
          El despojo originario o la acumulación primitiva, concepto que Marx teorizó primero para
          describir el arrebatamiento de tierras comunales a propiedad feudal, también se puede ver
          desde el punto de vista del agua como la ruptura que priva a una comunidad de su autosustento.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-7">
        <QuoteBlock
          text='"Fue como esa manera de mantener el control, por parte de los gobiernos locales, 
          sobre algo tan valiosísimo para la vida que era el agua, porque esa es la parte de cómo 
          hacerse de ellos de recursos, de cómo establecer una relación de subalternidad de los 
          ciudadanos a depender de un papá grandote, ¿verdad?"'
          author="— R, investigadora del comité Agua y Vida"
          borderColor="#38bdf8"
          bgColor="#f0f9ff"
          citeColor="#0284c7"
          margin="0"
        />
      </div>

      <p className="text-gray-700 leading-relaxed text-[15px] mb-7">
        Además de la pérdida de autonomía, R relata cómo el pueblo ha perdido sus imaginarios colectivos
        de otras formas de vida y relación con el ambiente posibles. “Se ha venido mermando y dislocando
        toda esta memoria por parte de los gobiernos municipales. Tiene que ver con procesos de generación, pero
        creo que sobre todo se ha venido intensificando toda una campaña por parte del Estado de crear imaginarios
        o proyectos de vida donde las poblaciones ya estamos en otra etapa de progreso.”
      </p>

      <p className="text-gray-700 leading-relaxed text-[15px] mb-7" >
        Este “progreso” para el estado y las empresas solo tiene cara de un proceso industrial y
        capital, un proceso que, cuando se enfrenta con los límites de las capacidades de los
        ecosistemas, encuentra que no puede sostener un crecimiento infinito.
      </p>

      <p className="text-gray-700 leading-relaxed text-[15px] mb-6">
        En 2024, Conagua realizó un estudio al acuífero San Isidro, donde determinó que este enfrentaba
        un déficit de 2,950,790 m³ anuales. Sin embargo, el acuífero ya había pasado este límite de
        44,460,000 m³ desde antes.
      </p>

      <CalloutRow callouts={DESPOJO_CALLOUTS} />

      <p className="text-gray-700 leading-relaxed text-[15px] mb-7">
        De acuerdo con los registros actuales de REPDA, este límite fue superado en 2020. Sin embargo,
        una cantidad de nuevos titulares ha sido registrada desde entonces. Aunque los nuevos registros
        no significan nuevas concesiones. Pueden serlo, pero debido a la opacidad mencionada, no tenemos
        forma de diferenciar entre una nueva concesión o primera inscripción, una prórroga, alguna
        modificación del título, alguna corrección, algún cambio de titular o una resolución administrativa.
      </p>

      <p className="text-gray-700 leading-relaxed text-[15px] mb-6">
        En la siguiente gráfica, se pueden visualizar todos los nuevos registros a partir de 2021 y
        el volumen de extracción otorgado. La segunda gráfica muestra el punto en que las concesiones
        de extracción rebasaron el límite permitido. En la{" "}
        <a
          href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LAN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 underline"
        >
          Ley Nacional de Aguas
        </a>
        , hay varias secciones que mencionan de forma directa la responsabilidad de Conagua de
        prevenir, mitigar y revertir efectos de sobreexplotación:
      </p>

      <LegalArticleBlock articles={LEGAL_ARTICLES} />

      <TableauEmbed data={TABLEAU_EMBEDS.concesiones2021} />
      <TableauEmbed data={TABLEAU_EMBEDS.radialYPastelStzCruz} />
    </SectionWrapper>
  )
}

// ── Section 6: Metodología y Referencias ──────────────────────────────────────

function Section6Metodologia() {
  const { background, titleColor, borderColor } = SECTION_CONFIGS.metodologia
  return (
    <SectionWrapper background={background}>
      <SectionTitle color={titleColor} borderColor={borderColor} marginBottom={24}>
        Metodología y Referencias
      </SectionTitle>

      <div className="flex flex-col gap-4">
        {/* Metodología*/}
        <Accordion label="Leer nota metodológica completa">
          {METODOLOGIA_PARAGRAPHS.map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </Accordion>

        {/* Referencias*/}
        <Accordion label="Ver fuentes y referencias bibliográficas">
          <div className="flex flex-col gap-5">
            {REFERENCIAS.map((ref: ReferenciasData, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-1.5 border-b border-slate-100 last:border-0 pb-4 last:pb-0"
                >
                  <p className="leading-relaxed text-slate-700 text-[14px]">
                    {ref.autores && (
                      <span className="font-semibold text-slate-900">
                        {ref.autores}.{" "}
                      </span>
                    )}
                    {ref.fecha && (
                      <span className="text-slate-500">
                        ({ref.fecha}).{" "}
                      </span>
                    )}
                    {ref.titulo && (
                      <span className="italic text-slate-800">
                        {ref.titulo}.{" "}
                      </span>
                    )}
                    {ref.lugar && (
                      <span className="text-slate-600">
                        {ref.lugar}.{" "}
                      </span>
                    )}
                  </p>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-800 font-bold self-start mt-0.5 transition-colors group/link"
                    >
                      <span>Ver recurso original</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </Accordion>
      </div>
    </SectionWrapper>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function MapaInteractivoStory() {
  return (
    <div>
      <Section1ElDespojo />
      <Section2PrimerasLuchas />
      <Section3Inmobiliarias />
      <Section4Industria />
      <Section5DespojoAgua />
      <Section6Metodologia />
    </div>
  )
}
