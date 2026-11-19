'use client';

import * as React from 'react';
import { FormWizard, formWizardLabelsAr } from '@/registry/ui/form-wizard';
import { Field, FieldLabel } from '@/registry/ui/field';
import { Input } from '@/registry/ui/input';
import type { ExampleProps } from '@/registry/examples/types';

const text = {
  en: {
    store: 'Store details',
    storeDescription: 'The name customers see in the store.',
    name: 'Store name',
    namePlaceholder: 'Dar Al-Oud',
    mobile: 'Mobile number',
    address: 'Address',
    addressDescription: 'Where orders ship from.',
    city: 'City',
    district: 'District',
    review: 'Review',
    reviewDescription: 'Check the details, then finish.',
    done: 'Your store is ready',
    doneDescription: 'You can add the first product now.',
    invalid: 'Enter the store name to continue.',
  },
  ar: {
    store: 'بيانات المتجر',
    storeDescription: 'الاسم الذي يراه العملاء في المتجر.',
    name: 'اسم المتجر',
    namePlaceholder: 'دار العود',
    mobile: 'رقم الجوال',
    address: 'العنوان',
    addressDescription: 'المكان الذي تشحن منه الطلبات.',
    city: 'المدينة',
    district: 'الحي',
    review: 'المراجعة',
    reviewDescription: 'راجع البيانات ثم أنهِ.',
    done: 'متجرك جاهز',
    doneDescription: 'يمكنك إضافة أول منتج الآن.',
    invalid: 'أدخل اسم المتجر للمتابعة.',
  },
};

export function FormWizardDemo({ lang, indicator }: ExampleProps & { indicator?: 'numbers' | 'dots' }) {
  const t = text[lang];
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [city, setCity] = React.useState(lang === 'ar' ? 'الرياض' : 'Riyadh');
  const [district, setDistrict] = React.useState(lang === 'ar' ? 'العليا' : 'Al-Olaya');

  const field = (id: string, label: string, value: string, onChange: (v: string) => void, extra?: React.ComponentProps<typeof Input>) => (
    <Field>
      <FieldLabel htmlFor={`wizard-${indicator}-${id}`}>{label}</FieldLabel>
      <Input id={`wizard-${indicator}-${id}`} value={value} onChange={(e) => onChange(e.target.value)} {...extra} />
    </Field>
  );

  return (
    <FormWizard
      className="max-w-md"
      lang={lang}
      indicator={indicator}
      labels={{
        ...(lang === 'ar' ? formWizardLabelsAr : undefined),
        invalid: t.invalid,
        completeTitle: t.done,
        completeDescription: t.doneDescription,
      }}
      steps={[
        {
          id: 'store',
          label: t.store,
          description: t.storeDescription,
          validate: () => name.trim().length > 0,
          content: (
            <div className="grid gap-4">
              {field('name', t.name, name, setName, { placeholder: t.namePlaceholder })}
              {field('mobile', t.mobile, mobile, setMobile, { type: 'tel', inputMode: 'tel', dir: 'ltr', placeholder: '05xxxxxxxx' })}
            </div>
          ),
        },
        {
          id: 'address',
          label: t.address,
          description: t.addressDescription,
          content: (
            <div className="grid gap-4">
              {field('city', t.city, city, setCity)}
              {field('district', t.district, district, setDistrict)}
            </div>
          ),
        },
        {
          id: 'review',
          label: t.review,
          description: t.reviewDescription,
          content: (
            <dl className="grid gap-2 text-sm">
              {[
                [t.name, name || '-'],
                [t.mobile, mobile || '-'],
                [t.city, city],
                [t.district, district],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3 border-b pb-2 last:border-b-0">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium">
                    <bdi>{value}</bdi>
                  </dd>
                </div>
              ))}
            </dl>
          ),
        },
      ]}
    />
  );
}
