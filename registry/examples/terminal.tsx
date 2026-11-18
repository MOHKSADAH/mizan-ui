import type { ExampleDoc, ExampleProps } from "@/registry/examples/types"
import { Terminal } from "@/registry/ui/ascii/terminal"

export const doc: ExampleDoc = {
  description: {
    en: "A terminal window for command snippets, with an optional typing effect and a button that copies the commands.",
    ar: "نافذة طرفية لعرض مقاطع الأوامر، مع تأثير كتابة اختياري وزر ينسخ الأوامر.",
  },
  usage: `import { Terminal } from "@/components/ui/ascii/terminal"\n\n<Terminal\n  title="bash"\n  lines={[\n    { type: "comment", text: "add the component" },\n    { type: "command", text: "npx shadcn@latest add @mizan/terminal" },\n    { type: "output", text: "Done." },\n  ]}\n  copyLabel="Copy commands"\n  copiedLabel="Copied"\n  copyFailedLabel="Copy failed"\n/>`,
  accessibility: [
    {
      en: "The copy button has a text name from copyLabel and copiedLabel. Its focus ring comes from the theme ring color.",
      ar: "للزر اسم نصي من copyLabel وcopiedLabel، وتأتي حلقة التركيز من لون الحلقة في السمة.",
    },
    {
      en: "Only the command lines are copied. The prompt symbols are not selectable.",
      ar: "تُنسخ أسطر الأوامر فقط، ولا يمكن تحديد رموز المحثّ.",
    },
    {
      en: "If the browser blocks the copy, the commands are selected in a hidden read-only field and copyFailedLabel is announced in a polite live region.",
      ar: "إذا منع المتصفح النسخ، تُحدَّد الأوامر في حقل مخفي للقراءة فقط، ويُعلَن copyFailedLabel في منطقة حية مهذبة.",
    },
    {
      en: "The typing effect starts when the window enters the view. With reduced motion it shows the full text at once. Do not use it for the only copy of important commands.",
      ar: "يبدأ تأثير الكتابة عندما تظهر النافذة في العرض. وعند تفضيل تقليل الحركة يظهر النص كاملًا دفعة واحدة. لا تستخدمه للنسخة الوحيدة من أوامر مهمة.",
    },
    {
      en: "The window is always left to right, because commands are left to right.",
      ar: "النافذة تُعرض دائمًا من اليسار إلى اليمين لأن الأوامر تُكتب من اليسار إلى اليمين.",
    },
  ],
  examples: {
    Default: { en: "Default", ar: "افتراضي" },
    Typing: { en: "Typing effect", ar: "تأثير الكتابة" },
  },
}

const LINES = {
  en: [
    { type: "comment", text: "add the component" },
    { type: "command", text: "npx shadcn@latest add @mizan/terminal" },
    { type: "output", text: "Done." },
    { type: "command", text: "bun dev" },
  ],
  ar: [
    { type: "comment", text: "أضف المكوّن" },
    { type: "command", text: "npx shadcn@latest add @mizan/terminal" },
    { type: "output", text: "تم." },
    { type: "command", text: "bun dev" },
  ],
} as const

const LABELS = {
  en: { copyLabel: "Copy commands", copiedLabel: "Copied", copyFailedLabel: "Copy failed" },
  ar: { copyLabel: "نسخ الأوامر", copiedLabel: "تم النسخ", copyFailedLabel: "تعذّر النسخ" },
}

export function Default({ lang }: ExampleProps) {
  return <Terminal title="bash" lines={[...LINES[lang]]} {...LABELS[lang]} />
}

export function Typing({ lang }: ExampleProps) {
  return <Terminal title="bash" lines={[...LINES[lang]]} typing {...LABELS[lang]} />
}
