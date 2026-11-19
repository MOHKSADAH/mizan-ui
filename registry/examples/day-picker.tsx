import { DayPicker, dayPickerLabelsAr } from '@/registry/ui/day-picker';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Daily, weekly and monthly segments. Weekly reveals the weekday chips, and a summary line reads the choice back. The week starts on Saturday for Arabic and on Sunday for English. Change it with weekStart.',
    ar: 'مقاطع يومي وأسبوعي وشهري. يكشف الأسبوعي رقائق أيام الأسبوع، ويقرأ سطر ملخص الاختيار. يبدأ الأسبوع بالسبت في العربية وبالأحد في الإنجليزية، ويمكن تغييره بالخاصية weekStart.',
  },
  usage: `import { DayPicker } from "@/components/ui/day-picker"\n\n<DayPicker lang="ar" defaultValue={{ frequency: "weekly", days: [6, 1] }} onValueChange={save} />`,
  examples: {
    Default: { en: 'Weekly on two days', ar: 'أسبوعيًا في يومين' },
    WeekStart: { en: 'Week starting on Monday', ar: 'أسبوع يبدأ بالاثنين' },
  },
  accessibility: [
    {
      en: 'The segments and the chips are toggle buttons with aria-pressed, in a fieldset with a legend. Each chip is named with the full weekday.',
      ar: 'المقاطع والرقائق أزرار تبديل بالسمة aria-pressed داخل fieldset بعنوان. كل رقاقة باسمها الكامل لليوم.',
    },
    {
      en: 'The chips are removed from the tab order while hidden. The summary is a polite live region. Weekday names come from Intl, so they follow the locale.',
      ar: 'تُزال الرقائق من ترتيب التبويب وهي مخفية. الملخص منطقة حية مهذبة. تأتي أسماء الأيام من Intl فتتبع اللغة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <DayPicker lang={lang} defaultValue={{ frequency: 'weekly', days: [6, 1] }} labels={lang === 'ar' ? dayPickerLabelsAr : undefined} />
    </div>
  );
}

export function WeekStart({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <DayPicker
        lang={lang}
        weekStart={1}
        defaultValue={{ frequency: 'weekly', days: [0, 3] }}
        labels={lang === 'ar' ? dayPickerLabelsAr : undefined}
      />
    </div>
  );
}
