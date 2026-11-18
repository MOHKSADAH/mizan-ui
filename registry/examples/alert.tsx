import { CheckCircleIcon, InfoIcon, WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/registry/ui/alert';
import { Button } from '@/registry/ui/button';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A short message that needs attention but does not block the page.',
    ar: 'رسالة قصيرة تحتاج انتباهًا دون أن تعطّل الصفحة.',
  },
  usage: `import { InfoIcon } from "@phosphor-icons/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <InfoIcon />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>You can add components to your app.</AlertDescription>
</Alert>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Destructive: { en: 'Destructive', ar: 'تحذيري' },
    WithAction: { en: 'With action', ar: 'مع إجراء' },
    TitleOnly: { en: 'Title only', ar: 'عنوان فقط' },
  },
  accessibility: [
    { en: 'The alert has role="alert", so screen readers announce it when it appears.', ar: 'للتنبيه role="alert" فيعلنه قارئ الشاشة عند ظهوره.' },
    { en: 'Keep the message short. For a long message, use a dialog or a page section.', ar: 'اجعل الرسالة قصيرة. للرسائل الطويلة استخدم نافذة حوار أو قسمًا في الصفحة.' },
    { en: 'Pair the destructive variant with an icon and a title: color alone does not carry the meaning.', ar: 'اجمع النوع التحذيري مع أيقونة وعنوان: اللون وحده لا ينقل المعنى.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Alert className="max-w-md">
      <CheckCircleIcon weight="regular" />
      <AlertTitle>{ar ? 'تم حفظ التغييرات' : 'Changes saved'}</AlertTitle>
      <AlertDescription>{ar ? 'ستظهر إعدادات المتجر الجديدة للعملاء خلال دقائق.' : 'Your new store settings show to customers within minutes.'}</AlertDescription>
    </Alert>
  );
}

export function Destructive({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Alert variant="destructive" className="max-w-md">
      <WarningCircleIcon weight="regular" />
      <AlertTitle>{ar ? 'تعذّر إكمال الدفع' : 'Payment failed'}</AlertTitle>
      <AlertDescription>{ar ? 'تحقق من بيانات البطاقة ثم حاول مرة أخرى.' : 'Check your card details and try again.'}</AlertDescription>
    </Alert>
  );
}

export function WithAction({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Alert className="max-w-md">
      <InfoIcon weight="regular" />
      <AlertTitle>{ar ? 'تحديث جديد متاح' : 'A new update is available'}</AlertTitle>
      <AlertDescription>{ar ? 'أعد تحميل الصفحة للحصول على أحدث إصدار.' : 'Reload the page to get the latest version.'}</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          {ar ? 'إعادة التحميل' : 'Reload'}
        </Button>
      </AlertAction>
    </Alert>
  );
}

export function TitleOnly({ lang }: ExampleProps) {
  return (
    <Alert className="max-w-md">
      <InfoIcon weight="regular" />
      <AlertTitle>{lang === 'ar' ? 'يتم إغلاق المتجر مؤقتًا للصيانة.' : 'The store closes briefly for maintenance.'}</AlertTitle>
    </Alert>
  );
}
