import { Container } from '@/registry/ui/container';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Centers page content at a fixed maximum width with responsive inline padding.',
    ar: 'يوسّط محتوى الصفحة بعرض أقصى ثابت مع هوامش أفقية متجاوبة.',
  },
  usage: `import { Container } from "@/components/ui/container"\n\n<Container size="narrow">…</Container>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Sizes: { en: 'Sizes', ar: 'الأحجام' },
  },
  accessibility: [
    {
      en: 'A plain div with no role. Padding uses logical properties, so it is symmetric in both directions.',
      ar: 'عنصر div بلا دور. الهوامش متماثلة في الاتجاهين.',
    },
  ],
};

const SIZES = ['prose', 'narrow', 'default', 'wide'] as const;

function Box({ label }: { label: string }) {
  return <div className="rounded-lg border border-border bg-muted p-4 text-center text-sm text-muted-foreground">{label}</div>;
}

export function Default({ lang }: ExampleProps) {
  return (
    <Container>
      <Box label={lang === 'ar' ? 'المحتوى' : 'Content'} />
    </Container>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <Container key={size} size={size}>
          <Box label={size} />
        </Container>
      ))}
    </div>
  );
}
