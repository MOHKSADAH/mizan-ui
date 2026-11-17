import { TimePicker } from '@/registry/ui/time-picker';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Hour and minute segments with an optional AM or PM segment, or a popover with scrollable lists. 24 hour or 12 hour. No native time input.',
    ar: 'مقاطع للساعة والدقيقة مع مقطع اختياري لـ ص أو م، أو نافذة منبثقة بقوائم قابلة للتمرير. نظام 24 ساعة أو 12 ساعة. دون حقل وقت أصلي.',
  },
  usage: `import { TimePicker } from "@/components/ui/time-picker"\n\n<TimePicker hourCycle={12} defaultValue="14:30" aria-label="Opening time" onValueChange={setTime} />`,
  examples: {
    Default: { en: '24 hour segments', ar: 'مقاطع بنظام 24 ساعة' },
    TwelveHour: { en: '12 hour with AM or PM (ص / م)', ar: 'نظام 12 ساعة مع ص / م' },
    List: { en: 'Popover with lists', ar: 'نافذة منبثقة بقوائم' },
  },
  accessibility: [
    {
      en: 'Each segment is a spinbutton (APG pattern). Arrow Up and Down change the value, typing digits fills it and moves on, Home and End jump to the first and last value, Left and Right move between segments.',
      ar: 'كل مقطع من نوع spinbutton (نمط APG). يغيّر السهمان لأعلى وأسفل القيمة، وتملؤها الأرقام المكتوبة وتنتقل للمقطع التالي، وتنتقل Home وEnd إلى أول قيمة وآخرها، ويتنقل السهمان يمينًا ويسارًا بين المقاطع.',
    },
    {
      en: 'The time stays left to right in Arabic pages, so the segments and arrow keys do not swap sides. Digits typed in Arabic-Indic form are accepted.',
      ar: 'يبقى الوقت من اليسار إلى اليمين في الصفحات العربية، فلا تتبدل المقاطع ومفاتيح الأسهم. تُقبل الأرقام المكتوبة بالصيغة الهندية.',
    },
    {
      en: 'The list variant uses listbox columns: Tab moves between columns, arrow keys move inside a column, Enter or Space selects, Escape closes.',
      ar: 'يستخدم النمط القائمي أعمدة listbox: ينقل Tab بين الأعمدة، وتتحرك مفاتيح الأسهم داخل العمود، ويختار Enter أو Space، ويغلق Escape.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <TimePicker lang={lang} defaultValue="14:30" aria-label={lang === 'ar' ? 'وقت الفتح' : 'Opening time'} />;
}

export function TwelveHour({ lang }: ExampleProps) {
  return <TimePicker lang={lang} hourCycle={12} defaultValue="09:15" aria-label={lang === 'ar' ? 'وقت الفتح' : 'Opening time'} />;
}

export function List({ lang }: ExampleProps) {
  return <TimePicker lang={lang} variant="list" hourCycle={12} minuteStep={5} aria-label={lang === 'ar' ? 'وقت الموعد' : 'Appointment time'} />;
}
