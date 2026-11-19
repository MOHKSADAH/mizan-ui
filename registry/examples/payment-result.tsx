import { Button } from '@/registry/ui/button';
import { PaymentResult } from '@/registry/ui/payment-result';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The state of a payment: processing, success or failed. Use it after a payment or when the customer returns from a provider redirect (BNPL, Apple Pay, STC Pay). It holds no text of its own, so the title, reason and actions come from your props.',
    ar: 'حالة الدفع: قيد المعالجة أو نجاح أو فشل. استخدمه بعد الدفع أو عند عودة العميل من إعادة توجيه مزوّد الخدمة (الدفع بالتقسيط أو أبل باي أو STC Pay). لا يحتوي على نص خاص به، فالعنوان والسبب والإجراءات من خصائصك.',
  },
  usage: `import { PaymentResult } from "@/components/ui/payment-result"\n\n<PaymentResult\n  status="failed"\n  title="Payment failed"\n  reason="The bank declined the card."\n  actions={<Button>Try again</Button>}\n/>`,
  examples: {
    Processing: { en: 'Processing', ar: 'قيد المعالجة' },
    Success: { en: 'Success', ar: 'نجاح' },
    Failed: { en: 'Failed, with retry and another method', ar: 'فشل، مع إعادة المحاولة وطريقة أخرى' },
  },
  accessibility: [
    {
      en: 'Processing and success are a status region (role="status"), so a screen reader announces them politely. Processing also sets aria-busy.',
      ar: 'المعالجة والنجاح منطقة حالة (role="status") تعلنها قارئات الشاشة بأدب. وتضبط المعالجة أيضًا aria-busy.',
    },
    {
      en: 'Failed is an alert (role="alert"), announced at once. The icon is hidden from screen readers: the title and reason carry the meaning, so color is never the only signal.',
      ar: 'الفشل تنبيه (role="alert") يُعلن فورًا. الأيقونة مخفية عن قارئات الشاشة: العنوان والسبب يحملان المعنى فلا يكون اللون الإشارة الوحيدة.',
    },
    {
      en: 'The title is a real heading. Set headingLevel to fit the page.',
      ar: 'العنوان عنوان فعلي. اضبط headingLevel ليناسب الصفحة.',
    },
  ],
};

const t = (lang: ExampleProps['lang'], en: string, ar: string) => (lang === 'ar' ? ar : en);

export function Processing({ lang }: ExampleProps) {
  return (
    <PaymentResult
      status="processing"
      title={t(lang, 'Confirming your payment', 'جارٍ تأكيد الدفع')}
      description={t(lang, 'Do not close this page. It takes a few seconds.', 'لا تغلق هذه الصفحة. يستغرق الأمر بضع ثوانٍ.')}
    />
  );
}

export function Success({ lang }: ExampleProps) {
  return (
    <PaymentResult
      status="success"
      title={t(lang, 'Payment received', 'تم استلام الدفع')}
      description={t(lang, 'We sent the receipt to your email.', 'أرسلنا الإيصال إلى بريدك الإلكتروني.')}
      actions={<Button>{t(lang, 'View order', 'عرض الطلب')}</Button>}
    />
  );
}

export function Failed({ lang }: ExampleProps) {
  return (
    <PaymentResult
      status="failed"
      title={t(lang, 'Payment failed', 'فشلت عملية الدفع')}
      description={t(lang, 'You were not charged.', 'لم يتم خصم أي مبلغ.')}
      reason={t(lang, 'The bank declined the card.', 'رفض البنك البطاقة.')}
      actions={
        <>
          <Button>{t(lang, 'Try again', 'إعادة المحاولة')}</Button>
          <Button variant="outline">{t(lang, 'Choose another method', 'اختيار طريقة أخرى')}</Button>
        </>
      }
    />
  );
}
