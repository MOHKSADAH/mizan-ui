import type { ExampleDoc, ExampleProps } from "@/registry/examples/types"
import { AsciiBox, AsciiDivider } from "@/registry/ui/ascii/ascii-box"

export const doc: ExampleDoc = {
  description: {
    en: "A frame drawn with borders, and a divider line with an optional label. The content inside stays real DOM, so it can be selected and read.",
    ar: "إطار مرسوم بحدود، وخط فاصل بتسمية اختيارية. يبقى المحتوى بداخله عناصر حقيقية في DOM فيمكن تحديده وقراءته.",
  },
  usage: `import { AsciiBox, AsciiDivider } from "@/components/ui/ascii/ascii-box"\n\n<AsciiBox variant="double" title="Note">\n  <p>Content stays real DOM.</p>\n</AsciiBox>\n<AsciiDivider variant="double" label="or" />`,
  accessibility: [
    {
      en: "When a title is set, the box is a fieldset and the title is its legend, so assistive technology reads it as a named group.",
      ar: "عند تحديد عنوان يصبح الإطار عنصر fieldset ويكون العنوان هو legend، فتقرؤه التقنيات المساعدة كمجموعة مسماة.",
    },
    {
      en: "The divider has role separator. Its label is used as the accessible name, and the drawn line is aria-hidden.",
      ar: "للخط الفاصل الدور separator. تُستخدم تسميته اسمًا يمكن الوصول إليه، ويُخفى الخط المرسوم بالسمة aria-hidden.",
    },
    {
      en: "The borders use theme colors and logical spacing, so the box works in both directions.",
      ar: "تستخدم الحدود ألوان السمة والمسافات المنطقية، فيعمل الإطار في الاتجاهين.",
    },
  ],
  examples: {
    Variants: { en: "Variants", ar: "الأنواع" },
    Dividers: { en: "Dividers", ar: "الفواصل" },
  },
}

const TITLES = {
  single: { en: "single", ar: "فردي" },
  double: { en: "double", ar: "مزدوج" },
  rounded: { en: "rounded", ar: "مستدير" },
  heavy: { en: "heavy", ar: "سميك" },
  ascii: { en: "ascii", ar: "ASCII" },
} as const

export function Variants({ lang }: ExampleProps) {
  return (
    <div className="flex flex-col gap-6">
      {(Object.keys(TITLES) as (keyof typeof TITLES)[]).map((variant) => (
        <AsciiBox key={variant} variant={variant} title={TITLES[variant][lang]}>
          <p>{lang === "ar" ? "يبقى المحتوى نصًا حقيقيًا." : "Content stays real text."}</p>
        </AsciiBox>
      ))}
    </div>
  )
}

export function Dividers({ lang }: ExampleProps) {
  return (
    <div className="flex flex-col gap-4">
      <AsciiDivider />
      <AsciiDivider variant="double" label={lang === "ar" ? "أو" : "or"} />
      <AsciiDivider variant="ascii" label={lang === "ar" ? "النهاية" : "end"} />
    </div>
  )
}
