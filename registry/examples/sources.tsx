import { SourcesCitation, SourcesList } from '@/registry/examples/sources.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A collapsed "Used 3 sources" line that opens numbered source cards, and numbered citations you put inside a paragraph. A citation opens a hover card with the title and a snippet.',
    ar: 'سطر مطوي "استند إلى 3 مصادر" يفتح بطاقات مصادر مرقّمة، وإحالات مرقّمة تضعها داخل الفقرة. تفتح الإحالة بطاقة تعرض العنوان ومقتطفًا.',
  },
  usage: `import { SourceCitation, Sources } from "@/components/ui/sources"

<Sources sources={sources} />

<p>Sales rose 12%<SourceCitation index={1} source={sources[0]} /></p>`,
  examples: {
    Default: { en: 'Source list', ar: 'قائمة المصادر' },
    Citation: { en: 'Inline citations', ar: 'إحالات داخل النص' },
  },
  accessibility: [
    { en: 'A citation is a link with a label such as "Source 1: Sales report", not only a number.', ar: 'الإحالة رابط له تسمية مثل "المصدر 1: تقرير المبيعات"، وليست رقمًا فقط.' },
    { en: 'The hover card opens on focus too, so a keyboard user gets the same details.', ar: 'تُفتح بطاقة التمرير عند التركيز أيضًا، فيحصل مستخدم لوحة المفاتيح على التفاصيل نفسها.' },
    { en: 'Sources open in a new tab with rel="noreferrer". Site names and numbers stay left to right inside Arabic text.', ar: 'تُفتح المصادر في تبويب جديد مع rel="noreferrer". تبقى أسماء المواقع والأرقام من اليسار إلى اليمين داخل النص العربي.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <SourcesList lang={lang} />;
}

export function Citation({ lang }: ExampleProps) {
  return <SourcesCitation lang={lang} />;
}
