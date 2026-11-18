import { CopyButton, copyButtonLabelsAr } from '@/registry/ui/copy-button';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A button that copies a value to the clipboard and says so. If the browser refuses, it selects the text in a readonly field.',
    ar: 'زر ينسخ قيمة إلى الحافظة ويُعلن ذلك. إذا رفض المتصفح يحدد النص في حقل للقراءة فقط.',
  },
  usage: `import { CopyButton } from "@/components/ui/copy-button"\n\n<CopyButton value="SUMMER25" />`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Icon: { en: 'Icon only', ar: 'أيقونة فقط' },
  },
  accessibility: [
    {
      en: 'A polite live region announces "Copied" or the failure message. The failure message tells the user the text is selected.',
      ar: 'منطقة حية مهذبة تعلن "تم النسخ" أو رسالة الفشل. وتخبر رسالة الفشل المستخدم أن النص محدد.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <CopyButton value="SUMMER25" labels={lang === 'ar' ? copyButtonLabelsAr : undefined} />;
}

export function Icon({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <CopyButton value="SA0380000000608010167519" size="icon" labels={ar ? copyButtonLabelsAr : undefined}>
      <span className="sr-only">{ar ? copyButtonLabelsAr.copy : 'Copy'}</span>
    </CopyButton>
  );
}
