import { Button } from '@/registry/ui/button';
import { DeliveryEstimate, deliveryEstimateLabelsAr } from '@/registry/ui/delivery-estimate';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The arrival date of an order, a slot for your city picker and a free shipping progress bar. The date is shown in the zone you pass, so it does not depend on the server.',
    ar: 'تاريخ وصول الطلب، وخانة لمحدد المدينة، وشريط تقدم الشحن المجاني. يُعرض التاريخ بالمنطقة الزمنية التي تمررها فلا يعتمد على الخادم.',
  },
  usage: `import { DeliveryEstimate } from "@/components/ui/delivery-estimate"\n\n<DeliveryEstimate date={arrival} city={<CitySelect />} freeShipping={{ threshold: 200, subtotal: 151 }} />`,
  examples: {
    Default: { en: 'With city and progress', ar: 'مع المدينة والتقدم' },
    Reached: { en: 'Free shipping reached', ar: 'تحقق الشحن المجاني' },
  },
  accessibility: [
    {
      en: 'The progress bar is named by its text, "SAR 49 away from free shipping", and the amount has a spoken currency name.',
      ar: 'يُسمّى شريط التقدم بنصه "تبقّى 49 ر.س للحصول على شحن مجاني" وللمبلغ اسم عملة منطوق.',
    },
    {
      en: 'The truck icon flips in RTL and is hidden from screen readers.',
      ar: 'تنعكس أيقونة الشاحنة في RTL وهي مخفية عن قارئات الشاشة.',
    },
  ],
};

const arrival = new Date('2026-11-22T09:00:00Z');

function city(lang: ExampleProps['lang']) {
  return (
    <Button variant="outline" size="sm">
      {lang === 'ar' ? 'الرياض' : 'Riyadh'}
    </Button>
  );
}

export function Default({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <DeliveryEstimate
        date={arrival}
        lang={lang}
        labels={lang === 'ar' ? deliveryEstimateLabelsAr : undefined}
        city={city(lang)}
        freeShipping={{ threshold: 200, subtotal: 151 }}
      />
    </div>
  );
}

export function Reached({ lang }: ExampleProps) {
  return (
    <div className="w-full max-w-sm">
      <DeliveryEstimate
        date={arrival}
        lang={lang}
        labels={lang === 'ar' ? deliveryEstimateLabelsAr : undefined}
        freeShipping={{ threshold: 200, subtotal: 260 }}
      />
    </div>
  );
}
