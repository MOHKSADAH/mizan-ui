import type { ExampleDoc, ExampleProps } from "@/registry/examples/types"
import { plural, type Lang } from "@/registry/lib/format"
import { AsciiBarChart, AsciiSparkline } from "@/registry/ui/ascii/ascii-chart"

export const doc: ExampleDoc = {
  description: {
    en: "A bar chart and a sparkline drawn with block characters. Each chart has a hidden data table as its text alternative.",
    ar: "مخطط أعمدة وخط بياني مصغّر مرسومان بحروف كتلية. لكل مخطط جدول بيانات مخفي يُستخدم بديلًا نصيًا.",
  },
  usage: `import { AsciiBarChart, AsciiSparkline } from "@/components/ui/ascii/ascii-chart"\n\nconst data = [\n  { label: "Mon", value: 120 },\n  { label: "Tue", value: 86 },\n]\n\n<AsciiBarChart data={data} width={24} caption="Visits per day" />\n<AsciiSparkline data={data} caption="Visits per day" />`,
  accessibility: [
    {
      en: "The drawing is aria-hidden. A screen-reader-only table lists every label and value, with the caption as its table caption.",
      ar: "الرسم مخفي بالسمة aria-hidden. ويعرض جدول مخصص لقارئات الشاشة كل تسمية وقيمة، ويكون العنوان هو caption الجدول.",
    },
    {
      en: "Use the format prop to add units. The same text is used in the drawing and in the table.",
      ar: "استخدم الخاصية format لإضافة الوحدات. يُستخدم النص نفسه في الرسم وفي الجدول.",
    },
    {
      en: "The bars and the values are always drawn left to right. The labels follow the page direction.",
      ar: "تُرسم الأعمدة والقيم دائمًا من اليسار إلى اليمين، بينما تتبع التسميات اتجاه الصفحة.",
    },
  ],
  examples: {
    Bars: { en: "Bar chart", ar: "مخطط أعمدة" },
    Sparkline: { en: "Sparkline", ar: "خط بياني مصغّر" },
  },
}

const DAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  ar: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
}

const VALUES = [120, 86, 142, 31, 97]

const VISITS = {
  en: { one: "{n} visit", other: "{n} visits" },
  ar: {
    zero: "{n} زيارة",
    one: "زيارة واحدة",
    two: "زيارتان",
    few: "{n} زيارات",
    many: "{n} زيارة",
    other: "{n} زيارة",
  },
}

const data = (lang: Lang) => DAYS[lang].map((label, i) => ({ label, value: VALUES[i] }))
const visits = (lang: Lang) => (n: number) => plural(n, VISITS[lang], { lang })
const caption = (lang: Lang) => (lang === "ar" ? "الزيارات اليومية" : "Visits per day")

export function Bars({ lang }: ExampleProps) {
  return <AsciiBarChart data={data(lang)} width={24} format={visits(lang)} caption={caption(lang)} />
}

export function Sparkline({ lang }: ExampleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">{caption(lang)}</span>
      <AsciiSparkline data={data(lang)} format={visits(lang)} caption={caption(lang)} />
    </div>
  )
}
