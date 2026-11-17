import type { ExampleDoc, ExampleProps } from "@/registry/examples/types"
import { AsciiText } from "@/registry/ui/ascii/ascii-text"

export const doc: ExampleDoc = {
  description: {
    en: "Large banner text drawn with figlet. The drawing is hidden from assistive technology and the plain text is read instead.",
    ar: "نص كبير يُرسم بحروف ASCII باستخدام figlet. يُخفى الرسم عن التقنيات المساعدة ويُقرأ النص العادي بدلًا منه.",
  },
  usage: `import { AsciiText } from "@/components/ui/ascii/ascii-text"\n\n<AsciiText text="Mizan" font="Small" />`,
  accessibility: [
    {
      en: "The drawing is aria-hidden and a screen-reader-only span repeats the text, so it reads as one word and not as a grid of symbols.",
      ar: "الرسم مخفي بالسمة aria-hidden، ويكرر عنصر span مخصص لقارئات الشاشة النص نفسه، فيُقرأ كلمة واحدة لا شبكة من الرموز.",
    },
    {
      en: "Use the as prop to render a real heading when the text titles a section.",
      ar: "استخدم الخاصية as لعرض عنوان حقيقي عندما يكون النص عنوانًا لقسم.",
    },
    {
      en: "The four bundled fonts draw Latin letters only. Use the component for Latin brand names, not for Arabic text.",
      ar: "الخطوط الأربعة المضمنة ترسم الأحرف اللاتينية فقط. استخدم المكوّن للأسماء التجارية اللاتينية لا للنص العربي.",
    },
    {
      en: "The drawing is always left to right and scrolls sideways inside a narrow container.",
      ar: "الرسم يُعرض دائمًا من اليسار إلى اليمين، ويمكن تمريره أفقيًا داخل الحاويات الضيقة.",
    },
  ],
  examples: {
    Fonts: { en: "Fonts", ar: "الخطوط" },
    Heading: { en: "As a heading", ar: "كعنوان" },
  },
}

export function Fonts() {
  return (
    <div className="flex max-w-full flex-col gap-6 overflow-x-auto">
      {(["Standard", "Small", "ANSI Shadow", "Big"] as const).map((font) => (
        <AsciiText key={font} text="Mizan" font={font} />
      ))}
    </div>
  )
}

export function Heading({ lang }: ExampleProps) {
  return (
    <div className="flex max-w-full flex-col gap-2 overflow-x-auto">
      <AsciiText text="Mizan" font="Small" as="h2" className="text-primary" />
      <p className="text-sm text-muted-foreground">
        {lang === "ar" ? "يُقرأ الرسم أعلاه كعنوان من المستوى الثاني." : "The drawing above is read as a level 2 heading."}
      </p>
    </div>
  )
}
