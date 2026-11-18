import { Countdown, countdownLabelsAr } from '@/registry/ui/countdown';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Days, hours, minutes and seconds left until a date. It shows the target date on the server and starts ticking once mounted.',
    ar: 'الأيام والساعات والدقائق والثواني المتبقية حتى تاريخ معين. يعرض تاريخ الهدف في الخادم ويبدأ العد بعد التحميل في المتصفح.',
  },
  usage: `import { Countdown } from "@/components/ui/countdown"\n\n<Countdown to={new Date("2026-12-31T20:00:00Z")} onComplete={() => {}} />`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    {
      en: 'The digits are hidden from screen readers. A polite live region announces the time left only when the minute changes, not every second.',
      ar: 'الأرقام مخفية عن قارئات الشاشة. وتعلن منطقة حية مهذبة الوقت المتبقي عند تغير الدقيقة فقط وليس كل ثانية.',
    },
    {
      en: 'Digits keep days-to-seconds order in RTL and use the chosen digit set.',
      ar: 'تحافظ الأرقام على ترتيب الأيام إلى الثواني في RTL وتستخدم نوع الأرقام المختار.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <Countdown
      lang={lang}
      to={new Date('2031-01-01T00:00:00Z')}
      labels={lang === 'ar' ? countdownLabelsAr : undefined}
    />
  );
}
