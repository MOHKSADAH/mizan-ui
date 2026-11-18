import { Button } from '@/registry/ui/button';
import { Container } from '@/registry/ui/container';
import { Section, SectionHeader } from '@/registry/ui/section';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Vertical rhythm for a page section, and a header with eyebrow, heading, description and actions.',
    ar: 'التباعد العمودي لقسم في الصفحة، ورأس قسم يضم عنوانًا فرعيًا وعنوانًا ووصفًا وأزرارًا.',
  },
  usage: `import { Container } from "@/components/ui/container"\nimport { Section, SectionHeader } from "@/components/ui/section"\n\n<Section id="features">\n  <Container>\n    <SectionHeader id="features" eyebrow="Features" title="Everything you need" />\n  </Container>\n</Section>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Centered: { en: 'Centered', ar: 'في الوسط' },
  },
  accessibility: [
    {
      en: 'Pass the same id to Section and SectionHeader. The section becomes a named region through aria-labelledby, and the heading level stays 2 or 3.',
      ar: 'مرّر المعرّف نفسه إلى Section وSectionHeader. يصبح القسم منطقة مسمّاة عبر aria-labelledby، ويبقى مستوى العنوان 2 أو 3.',
    },
  ],
};

const copy = {
  en: { eyebrow: 'Features', title: 'Everything you need to sell online', description: 'Orders, payments and shipping in one place.', action: 'View all' },
  ar: { eyebrow: 'المزايا', title: 'كل ما تحتاجه للبيع عبر الإنترنت', description: 'الطلبات والمدفوعات والشحن في مكان واحد.', action: 'عرض الكل' },
};

export function Default({ lang }: ExampleProps) {
  const t = copy[lang];
  return (
    <Section id="section-default" spacing="compact">
      <Container>
        <SectionHeader
          id="section-default"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          actions={<Button variant="outline">{t.action}</Button>}
        />
      </Container>
    </Section>
  );
}

export function Centered({ lang }: ExampleProps) {
  const t = copy[lang];
  return (
    <Section id="section-centered" spacing="compact">
      <Container>
        <SectionHeader id="section-centered" align="center" eyebrow={t.eyebrow} title={t.title} description={t.description} />
      </Container>
    </Section>
  );
}
