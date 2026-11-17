import { QrCode } from '@/registry/ui/qr-code';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A QR code drawn as one SVG path, black on a white chip in every theme, with an optional center logo.',
    ar: 'رمز QR مرسوم كمسار SVG واحد، أسود على خلفية بيضاء في كل الأوضاع، مع شعار اختياري في الوسط.',
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
      en: 'The code is never mirrored in RTL and keeps a quiet zone of 4 modules. It stays dark on light in dark themes, because many scanners cannot read an inverted code.',
      ar: 'لا يُعكس الرمز في RTL ويحتفظ بهامش هادئ من 4 وحدات. يبقى داكنا على خلفية فاتحة في الأوضاع الداكنة، لأن كثيرا من الماسحات لا تقرأ الرمز المعكوس.',
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
