import type { ExampleDoc, ExampleProps } from "@/registry/examples/types"
import { AsciiSpinner } from "@/registry/ui/ascii/ascii-spinner"

import { SpinnerButton } from "./ascii-spinner.client"

export const doc: ExampleDoc = {
  description: {
    en: "A loading spinner made of text frames. It has five frame sets and always needs a label.",
    ar: "مؤشر تحميل مصنوع من إطارات نصية. يتوفر بخمس مجموعات من الإطارات ويحتاج دائمًا إلى تسمية.",
  },
  usage: `import { AsciiSpinner } from "@/components/ui/ascii/ascii-spinner"\n\n<AsciiSpinner variant="braille" label="Loading" />`,
  accessibility: [
    {
      en: "The spinner has role status. The frames are aria-hidden and screen readers read the required label.",
      ar: "للمؤشر الدور status. الإطارات مخفية بالسمة aria-hidden، وتقرأ قارئات الشاشة التسمية المطلوبة.",
    },
    {
      en: "When the user prefers reduced motion, the spinner shows its first frame and does not animate. The label still tells the state.",
      ar: "عندما يفضّل المستخدم تقليل الحركة، يعرض المؤشر إطاره الأول دون تحريك. وتبقى التسمية تصف الحالة.",
    },
    {
      en: "Frames are always drawn left to right, also in Arabic pages.",
      ar: "تُرسم الإطارات دائمًا من اليسار إلى اليمين، حتى في الصفحات العربية.",
    },
  ],
  examples: {
    Variants: { en: "Variants", ar: "الأنواع" },
    InButton: { en: "Next to a button", ar: "بجانب زر" },
  },
}

export function Variants({ lang }: ExampleProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
      {(["dots", "line", "braille", "arc", "bounce"] as const).map((variant) => (
        <span key={variant} className="inline-flex items-center gap-2">
          <AsciiSpinner variant={variant} label={lang === "ar" ? "جارٍ التحميل" : "Loading"} />
          <span className="font-mono text-sm">{variant}</span>
        </span>
      ))}
    </div>
  )
}

export function InButton({ lang }: ExampleProps) {
  return lang === "ar" ? <SpinnerButton idle="حفظ" busy="جارٍ الحفظ" /> : <SpinnerButton idle="Save" busy="Saving" />
}
