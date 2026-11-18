'use client';

import { WarningCircleIcon } from '@phosphor-icons/react';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/registry/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/registry/ui/field';
import type { ExampleProps } from '@/registry/examples/types';

const CITIES = {
  en: ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah', 'Abha'],
  ar: ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'أبها'],
};

const COUNTRIES = {
  en: [
    { value: 'GCC', items: ['Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar'] },
    { value: 'Other', items: ['Egypt', 'Jordan'] },
  ],
  ar: [
    { value: 'دول الخليج', items: ['السعودية', 'الإمارات', 'الكويت', 'قطر'] },
    { value: 'دول أخرى', items: ['مصر', 'الأردن'] },
  ],
};

const TAGS = {
  en: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books'],
  ar: ['إلكترونيات', 'أزياء', 'منزل', 'جمال', 'رياضة', 'كتب'],
};

export function CityCombobox({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Combobox items={CITIES[lang]}>
      <ComboboxInput className="w-64" placeholder={ar ? 'اختر مدينة' : 'Select a city'} aria-label={ar ? 'المدينة' : 'City'} />
      <ComboboxContent>
        <ComboboxEmpty>{ar ? 'لا توجد مدينة مطابقة.' : 'No city found.'}</ComboboxEmpty>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function GroupedCombobox({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const groups = COUNTRIES[lang];
  return (
    <Combobox items={groups} defaultValue={groups[0].items[0]}>
      <ComboboxInput className="w-64" showClear placeholder={ar ? 'اختر دولة' : 'Select a country'} aria-label={ar ? 'الدولة' : 'Country'} />
      <ComboboxContent>
        <ComboboxEmpty>{ar ? 'لا توجد دولة مطابقة.' : 'No country found.'}</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof groups)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(country: string) => (
                  <ComboboxItem key={country} value={country}>
                    {country}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function MultiCombobox({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const anchor = useComboboxAnchor();
  return (
    <Combobox multiple items={TAGS[lang]} defaultValue={[TAGS[lang][0], TAGS[lang][1]]}>
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder={ar ? 'أضف فئة' : 'Add a category'} aria-label={ar ? 'الفئات' : 'Categories'} />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{ar ? 'لا توجد فئة مطابقة.' : 'No category found.'}</ComboboxEmpty>
        <ComboboxList>
          {(tag: string) => (
            <ComboboxItem key={tag} value={tag}>
              {tag}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function InvalidCombobox({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Field data-invalid="true" className="max-w-xs">
      <FieldLabel htmlFor="combobox-invalid">{ar ? 'مدينة التوصيل' : 'Delivery city'}</FieldLabel>
      <Combobox items={CITIES[lang]}>
        <ComboboxInput id="combobox-invalid" aria-invalid aria-describedby="combobox-invalid-error" placeholder={ar ? 'اختر مدينة' : 'Select a city'} />
        <ComboboxContent>
          <ComboboxEmpty>{ar ? 'لا توجد مدينة مطابقة.' : 'No city found.'}</ComboboxEmpty>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldError id="combobox-invalid-error" className="flex items-center gap-1.5">
        <WarningCircleIcon weight="regular" className="size-4 shrink-0" />
        {ar ? 'اختر مدينة التوصيل.' : 'Choose a delivery city.'}
      </FieldError>
    </Field>
  );
}
