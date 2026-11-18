import { WarningCircleIcon } from '@phosphor-icons/react/ssr';
import { Field, FieldError, FieldLabel } from '@/registry/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/registry/ui/select';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A dropdown to pick one value from a list. Built on Base UI Select.',
    ar: 'قائمة منسدلة لاختيار قيمة واحدة من قائمة. مبنية على Select من Base UI.',
  },
  usage: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select items={[{ value: "riyadh", label: "Riyadh" }]}>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select a city" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="riyadh">Riyadh</SelectItem>
  </SelectContent>
</Select>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Groups: { en: 'Groups', ar: 'مجموعات' },
    Sizes: { en: 'Sizes', ar: 'المقاسات' },
    States: { en: 'Disabled and invalid', ar: 'معطّل وغير صالح' },
  },
  accessibility: [
    { en: 'The trigger is a button with a listbox popup. Arrow keys, Home, End and type-ahead work.', ar: 'الزر المشغّل يفتح قائمة. تعمل الأسهم وHome وEnd والبحث بالكتابة.' },
    { en: 'Pass items so the trigger shows the selected label, not the raw value.', ar: 'مرّر items ليعرض الزر تسمية العنصر المحدد وليس قيمته الخام.' },
    { en: 'Name the trigger with a label or aria-label.', ar: 'سمِّ الزر بتسمية أو aria-label.' },
  ],
};

const CITIES = {
  en: [
    { value: 'riyadh', label: 'Riyadh' },
    { value: 'jeddah', label: 'Jeddah' },
    { value: 'dammam', label: 'Dammam' },
    { value: 'makkah', label: 'Makkah' },
  ],
  ar: [
    { value: 'riyadh', label: 'الرياض' },
    { value: 'jeddah', label: 'جدة' },
    { value: 'dammam', label: 'الدمام' },
    { value: 'makkah', label: 'مكة المكرمة' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Select items={CITIES[lang]}>
      <SelectTrigger className="w-48" aria-label={ar ? 'المدينة' : 'City'}>
        <SelectValue placeholder={ar ? 'اختر مدينة' : 'Select a city'} />
      </SelectTrigger>
      <SelectContent>
        {CITIES[lang].map((c) => (
          <SelectItem key={c.value} value={c.value}>
            {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const SHIPPING = {
  en: {
    labels: ['Domestic', 'International'],
    items: [
      { value: 'standard', label: 'Standard, 3 to 5 days' },
      { value: 'express', label: 'Express, next day' },
      { value: 'gcc', label: 'GCC shipping' },
      { value: 'world', label: 'Worldwide shipping' },
    ],
  },
  ar: {
    labels: ['محلي', 'دولي'],
    items: [
      { value: 'standard', label: 'عادي، من 3 إلى 5 أيام' },
      { value: 'express', label: 'سريع، في اليوم التالي' },
      { value: 'gcc', label: 'الشحن لدول الخليج' },
      { value: 'world', label: 'الشحن حول العالم' },
    ],
  },
};

export function Groups({ lang }: ExampleProps) {
  const { labels, items } = SHIPPING[lang];
  return (
    <Select items={items}>
      <SelectTrigger className="w-64" aria-label={lang === 'ar' ? 'خدمة الشحن' : 'Shipping service'}>
        <SelectValue placeholder={lang === 'ar' ? 'اختر خدمة الشحن' : 'Select a shipping service'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{labels[0]}</SelectLabel>
          {items.slice(0, 2).map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>{labels[1]}</SelectLabel>
          {items.slice(2).map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function Sizes({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select items={CITIES[lang]} defaultValue="riyadh">
        <SelectTrigger size="sm" className="w-40" aria-label={ar ? 'المدينة، صغير' : 'City, small'}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CITIES[lang].map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={CITIES[lang]} defaultValue="jeddah">
        <SelectTrigger className="w-40" aria-label={ar ? 'المدينة، افتراضي' : 'City, default'}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CITIES[lang].map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function States({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field data-disabled="true">
        <FieldLabel id="select-disabled-label">{ar ? 'المدينة' : 'City'}</FieldLabel>
        <Select items={CITIES[lang]} defaultValue="riyadh" disabled>
          <SelectTrigger className="w-full" aria-labelledby="select-disabled-label">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CITIES[lang].map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field data-invalid="true">
        <FieldLabel id="select-invalid-label">{ar ? 'مدينة التوصيل' : 'Delivery city'}</FieldLabel>
        <Select items={CITIES[lang]}>
          <SelectTrigger className="w-full" aria-labelledby="select-invalid-label" aria-invalid aria-describedby="select-invalid-error">
            <SelectValue placeholder={ar ? 'اختر مدينة' : 'Select a city'} />
          </SelectTrigger>
          <SelectContent>
            {CITIES[lang].map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError id="select-invalid-error" className="flex items-center gap-1.5">
          <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
          {ar ? 'اختر مدينة التوصيل.' : 'Choose a delivery city.'}
        </FieldError>
      </Field>
    </div>
  );
}
