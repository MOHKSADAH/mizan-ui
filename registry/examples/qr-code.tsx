import { QrCode } from '@/registry/ui/qr-code';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A QR code drawn as one SVG path in the current text color, on the card background, with an optional center logo.',
    ar: 'رمز QR مرسوم كمسار SVG واحد بلون النص الحالي على خلفية البطاقة، مع شعار اختياري في الوسط.',
  },
  usage: `import { QrCode } from "@/components/ui/qr-code"\n\n<QrCode value="https://example.com/menu" label="Menu link" />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Logo: { en: 'With a center logo', ar: 'مع شعار في الوسط' },
  },
  accessibility: [
    {
      en: 'The required label names what the code is for, not its payload.',
      ar: 'التسمية المطلوبة تصف غرض الرمز وليس محتواه.',
    },
    {
      en: 'The code is never mirrored in RTL and keeps a quiet zone of 4 modules. Test scanning in dark themes, because the code inverts there.',
      ar: 'لا يُعكس الرمز في RTL ويحتفظ بهامش هادئ من 4 وحدات. جرّب المسح في الأوضاع الداكنة لأن الرمز ينعكس فيها.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <QrCode value="https://example.com/menu" label={lang === 'ar' ? 'رابط قائمة الطعام' : 'Menu link'} />;
}

export function Logo({ lang }: ExampleProps) {
  return (
    <QrCode
      value="https://example.com/menu"
      label={lang === 'ar' ? 'رابط قائمة الطعام' : 'Menu link'}
      logo={<span className="text-xs font-semibold">M</span>}
    />
  );
}
