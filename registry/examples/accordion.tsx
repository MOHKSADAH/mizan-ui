import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/registry/ui/accordion';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A vertically stacked set of headings that each reveal a section of content.',
    ar: 'مجموعة عناوين مرتبة عموديًا يكشف كل منها قسمًا من المحتوى.',
  },
  usage: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion defaultValue={["shipping"]}>
  <AccordionItem value="shipping">
    <AccordionTrigger>Shipping</AccordionTrigger>
    <AccordionContent>Delivery in 2 to 4 days.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Multiple: { en: 'Multiple open', ar: 'فتح أكثر من عنصر' },
    Disabled: { en: 'Disabled item', ar: 'عنصر معطّل' },
  },
  accessibility: [
    {
      en: 'Each trigger is a button inside a heading with aria-expanded. Enter or Space toggles it.',
      ar: 'كل مشغّل زر داخل عنوان مع aria-expanded. يبدّله Enter أو Space.',
    },
    {
      en: 'Up and Down arrows, Home and End move focus between triggers.',
      ar: 'تنقل الأسهم العليا والسفلى وHome وEnd التركيز بين المشغّلات.',
    },
    {
      en: 'The chevron is logical (end side), so it sits at the left edge in Arabic.',
      ar: 'السهم منطقي (جهة النهاية)، فيقع عند الحافة اليسرى في العربية.',
    },
  ],
};

const FAQ = {
  en: [
    ['shipping', 'How long does shipping take?', 'Orders arrive in 2 to 4 working days inside the Gulf.'],
    ['returns', 'What is the return policy?', 'Return unused items within 14 days for a full refund.'],
    ['payment', 'Which payment methods do you accept?', 'Cards, Apple Pay, mada and cash on delivery.'],
  ],
  ar: [
    ['shipping', 'كم تستغرق مدة الشحن؟', 'تصل الطلبات خلال 2 إلى 4 أيام عمل داخل الخليج.'],
    ['returns', 'ما هي سياسة الإرجاع؟', 'أرجع المنتجات غير المستخدمة خلال 14 يومًا لاسترداد كامل المبلغ.'],
    ['payment', 'ما طرق الدفع المتاحة؟', 'البطاقات وApple Pay ومدى والدفع عند الاستلام.'],
  ],
} as const;

export function Default({ lang }: ExampleProps) {
  return (
    <Accordion defaultValue={['shipping']} className="mx-auto max-w-lg">
      {FAQ[lang].map(([value, question, answer]) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Multiple({ lang }: ExampleProps) {
  return (
    <Accordion multiple defaultValue={['shipping', 'returns']} className="mx-auto max-w-lg">
      {FAQ[lang].map(([value, question, answer]) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Disabled({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Accordion className="mx-auto max-w-lg">
      <AccordionItem value="available">
        <AccordionTrigger>{ar ? 'قسم متاح' : 'Available section'}</AccordionTrigger>
        <AccordionContent>{ar ? 'يمكن فتح هذا القسم وإغلاقه.' : 'This section can be opened and closed.'}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="locked" disabled>
        <AccordionTrigger>{ar ? 'قسم معطّل' : 'Disabled section'}</AccordionTrigger>
        <AccordionContent>{ar ? 'لا يمكن فتح هذا القسم.' : 'This section cannot be opened.'}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
