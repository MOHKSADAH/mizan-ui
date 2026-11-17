import type { ExampleDoc, ExampleProps } from "@/registry/examples/types"
import { AsciiProgress } from "@/registry/ui/ascii/ascii-progress"

import { ProgressStepper } from "./ascii-progress.client"

export const doc: ExampleDoc = {
  description: {
    en: "A progress bar drawn with text characters, with a percentage. The fill character, the empty character, the width and the maximum are props.",
    ar: "شريط تقدم مرسوم بحروف نصية مع نسبة مئوية. حرف الجزء المكتمل وحرف الجزء الفارغ والعرض والحد الأقصى كلها خصائص.",
  },
  usage: `import { AsciiProgress } from "@/components/ui/ascii/ascii-progress"\n\n<AsciiProgress value={57} width={14} label="Upload progress" />`,
  accessibility: [
    {
      en: "The element has role progressbar with aria-valuemin, aria-valuemax, aria-valuenow and aria-valuetext in percent.",
      ar: "للعنصر الدور progressbar مع السمات aria-valuemin وaria-valuemax وaria-valuenow وaria-valuetext بالنسبة المئوية.",
    },
    {
      en: "Show a visible label next to the bar so users know what it measures.",
      ar: "اعرض تسمية ظاهرة بجانب الشريط ليعرف المستخدم ما الذي يقيسه.",
    },
    {
      en: "The bar and the percentage are always drawn left to right, so the fill grows in the same direction in Arabic pages.",
      ar: "يُرسم الشريط والنسبة المئوية دائمًا من اليسار إلى اليمين، فيمتد الجزء المكتمل في الاتجاه نفسه في الصفحات العربية.",
    },
  ],
  examples: {
    Default: { en: "Default", ar: "افتراضي" },
    Characters: { en: "Custom characters", ar: "حروف مخصصة" },
    Interactive: { en: "Interactive", ar: "تفاعلي" },
  },
}

export function Default({ lang }: ExampleProps) {
  return (
    <div className="flex flex-col gap-1 text-muted-foreground">
      <span className="text-sm">{lang === "ar" ? "رفع الملف" : "Uploading file"}</span>
      <AsciiProgress value={57} width={14} label={lang === 'ar' ? 'تقدم التحميل' : 'Upload progress'} />
    </div>
  )
}

export function Characters({ lang }: ExampleProps) {
  return (
    <div className="flex flex-col gap-3 text-muted-foreground">
      <div className="flex flex-col gap-1">
        <span className="text-sm">
          {lang === "ar" ? (
            <>
              الخطوة <bdi>3</bdi> من <bdi>8</bdi>
            </>
          ) : (
            "Step 3 of 8"
          )}
        </span>
        <AsciiProgress value={3} max={8} fill="=" empty="." width={24} label={lang === 'ar' ? 'خطوات الإعداد' : 'Setup steps'} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">{lang === "ar" ? "اكتمل" : "Done"}</span>
        <AsciiProgress value={100} showPercent={false} label={lang === 'ar' ? 'اكتمل' : 'Complete'} />
      </div>
    </div>
  )
}

export function Interactive({ lang }: ExampleProps) {
  return lang === "ar" ? (
    <ProgressStepper label="تثبيت الحزم" advance="تقدّم" reset="إعادة ضبط" />
  ) : (
    <ProgressStepper label="Installing packages" advance="Advance" reset="Reset" />
  )
}
