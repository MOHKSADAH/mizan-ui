import { ZatcaInvoice } from '@/registry/ui/zatca-invoice';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A simplified tax invoice layout in Arabic and English: seller with VAT number, lines, VAT at 15% (a prop), totals and the ZATCA QR code. It prints cleanly with print styles. Phase 1 only: it has no Phase 2 cryptographic stamp, invoice hash or clearance, so it is not a complete e-invoicing solution. The sample VAT number and seller are fake.',
    ar: 'تصميم فاتورة ضريبية مبسطة بالعربية والإنجليزية: البائع مع الرقم الضريبي، البنود، ضريبة 15% (قابلة للتعديل)، الإجماليات ورمز الاستجابة السريعة. تُطبع بشكل نظيف بأنماط الطباعة. المرحلة الأولى فقط: لا يتضمن ختم المرحلة الثانية التشفيري ولا تجزئة الفاتورة ولا الإجازة، فهو ليس حلاً متكاملاً للفوترة الإلكترونية. البائع والرقم الضريبي في المثال وهميان.',
  },
  usage: `import { ZatcaInvoice } from "@/components/ui/zatca-invoice"\n\n<ZatcaInvoice lang="ar" seller={{ name: "Store", nameAr: "المتجر", vatNumber: "300000000000003" }} invoiceNumber="INV-1" issuedAt={new Date()} lines={[{ description: "Item", quantity: 2, unitPrice: 50 }]} />`,
  examples: {
    Default: { en: 'English first', ar: 'الإنجليزية أولاً' },
    Arabic: { en: 'Arabic first', ar: 'العربية أولاً' },
  },
  accessibility: [
    {
      en: 'The QR code is an image with a text name. Each label is shown in both languages, and the secondary language is marked with its own lang attribute.',
      ar: 'رمز الاستجابة السريعة صورة باسم نصي. تظهر كل تسمية باللغتين، وتحمل اللغة الثانية سمة lang خاصة بها.',
    },
    {
      en: 'The lines are a real table with column headers. Numbers and the VAT number stay in LTR order inside Arabic text.',
      ar: 'البنود جدول حقيقي برؤوس أعمدة. تبقى الأرقام والرقم الضريبي بترتيب LTR داخل النص العربي.',
    },
  ],
};

const seller = { name: 'Al Noor Trading Co.', nameAr: 'شركة النور للتجارة', address: 'Riyadh, Saudi Arabia', vatNumber: '300000000000003' };
const lines = [
  { description: 'Arabic coffee, 500 g', descriptionAr: 'قهوة عربية ٥٠٠ جم', quantity: 2, unitPrice: 45 },
  { description: 'Dates, Sukkari, 1 kg', descriptionAr: 'تمر سكري ١ كجم', quantity: 3, unitPrice: 32.5 },
];
const issuedAt = new Date('2026-03-04T10:30:00Z');

export function Default({ lang }: ExampleProps) {
  return <ZatcaInvoice lang={lang} seller={seller} buyer={{ name: 'Walk-in customer', nameAr: 'عميل نقدي' }} invoiceNumber="INV-2026-0042" issuedAt={issuedAt} lines={lines} />;
}

export function Arabic({ lang }: ExampleProps) {
  return <ZatcaInvoice lang={lang === 'ar' ? 'en' : 'ar'} seller={seller} invoiceNumber="INV-2026-0043" issuedAt={issuedAt} lines={lines} />;
}
