import { ShareButton, shareButtonLabelsAr } from '@/registry/ui/share-button';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Opens the system share sheet when the browser has one. Otherwise it opens a popover with copy link, WhatsApp and X.',
    ar: 'يفتح قائمة المشاركة في النظام إذا كانت متاحة في المتصفح. وإلا يفتح نافذة منبثقة بنسخ الرابط وواتساب وإكس.',
  },
  usage: `import { ShareButton } from "@/components/ui/share-button"\n\n<ShareButton url="https://example.com/p/1" title="Product" />`,
  examples: { Default: { en: 'Default', ar: 'افتراضي' } },
  accessibility: [
    {
      en: 'The fallback popover is a dialog opened by a button, and its copy action announces the result in a live region.',
      ar: 'النافذة البديلة حوار يفتحه زر، وإجراء النسخ فيها يعلن النتيجة في منطقة حية.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ShareButton
      url="https://example.com/p/1"
      title={ar ? 'منتج رائع' : 'A great product'}
      labels={ar ? shareButtonLabelsAr : undefined}
    />
  );
}
