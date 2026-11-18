import { BankIcon, CreditCardIcon, MoneyIcon, WalletIcon } from '@phosphor-icons/react/ssr';
import { PaymentMethodSelect, paymentMethodSelectLabelsAr, type PaymentMethod } from '@/registry/ui/payment-method-select';
import { Price } from '@/registry/ui/price';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A radio group of payment methods: card, mada, Apple Pay, STC Pay, Tabby, Tamara and cash on delivery. Each method has an icon slot, an optional fee and description, a disabled reason and a details panel while selected. Mizan ships no payment logos, so you pass your own.',
    ar: 'مجموعة اختيار لطرق الدفع: البطاقة ومدى وأبل باي وSTC Pay وتابي وتمارا والدفع عند الاستلام. لكل طريقة خانة أيقونة ورسوم ووصف اختياريان وسبب تعطيل ولوحة تفاصيل عند اختيارها. لا يوفّر ميزان شعارات دفع، فمرّر شعاراتك.',
  },
  usage: `import { PaymentMethodSelect } from "@/components/ui/payment-method-select"\n\n<PaymentMethodSelect\n  label="Payment method"\n  methods={[{ id: "mada", label: "mada", icon: <MadaLogo /> }]}\n  defaultValue="mada"\n/>`,
  examples: { Default: { en: 'Gulf payment methods', ar: 'طرق الدفع الخليجية' } },
  accessibility: [
    {
      en: 'A radio group with arrow-key movement. Fees, descriptions and disabled reasons are linked as descriptions, so a screen reader reads them with the method.',
      ar: 'مجموعة اختيار بمفاتيح الأسهم. ترتبط الرسوم والأوصاف وأسباب التعطيل كوصف للطريقة فتقرؤها قارئة الشاشة معها.',
    },
    {
      en: 'Logos are hidden from screen readers. The method name is always text.',
      ar: 'الشعارات مخفية عن قارئات الشاشة. اسم الطريقة نص دائمًا.',
    },
    {
      en: 'Wrap the page in a DirectionProvider so arrow keys follow RTL.',
      ar: 'غلّف الصفحة بـ DirectionProvider لتتبع مفاتيح الأسهم اتجاه RTL.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const methods: PaymentMethod[] = [
    {
      id: 'card',
      label: ar ? 'بطاقة ائتمانية' : 'Credit card',
      icon: <CreditCardIcon weight="regular" className="size-6" />,
      details: <p className="text-muted-foreground">{ar ? 'تُفتح نافذة الدفع الآمنة بعد المراجعة.' : 'A secure payment window opens after review.'}</p>,
    },
    {
      id: 'mada',
      label: ar ? 'مدى' : 'mada',
      description: ar ? 'بطاقات الخصم السعودية' : 'Saudi debit cards',
      icon: <BankIcon weight="regular" className="size-6" />,
    },
    {
      id: 'tabby',
      label: ar ? 'تابي' : 'Tabby',
      icon: <WalletIcon weight="regular" className="size-6" />,
      disabledReason: (
        <>
          {ar ? 'متاح للطلبات من' : 'Available for orders from'} <Price amount={100} lang={lang} />
        </>
      ),
    },
    {
      id: 'cod',
      label: ar ? 'الدفع عند الاستلام' : 'Cash on delivery',
      icon: <MoneyIcon weight="regular" className="size-6" />,
      fee: 10,
    },
  ];
  return (
    <div className="w-full max-w-md">
      <PaymentMethodSelect
        label={ar ? 'طريقة الدفع' : 'Payment method'}
        methods={methods}
        defaultValue="card"
        lang={lang}
        labels={ar ? paymentMethodSelectLabelsAr : undefined}
      />
    </div>
  );
}
