import { CityCombobox, GroupedCombobox, InvalidCombobox, MultiCombobox } from '@/registry/examples/combobox.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'An input with a filtered list of options. Type to narrow the list, then pick one or several values.',
    ar: 'حقل إدخال مع قائمة خيارات تُصفّى أثناء الكتابة. اكتب لتضييق القائمة ثم اختر قيمة أو أكثر.',
  },
  usage: `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const cities = ["Riyadh", "Jeddah", "Dammam"]

<Combobox items={cities}>
  <ComboboxInput placeholder="Select a city" />
  <ComboboxContent>
    <ComboboxEmpty>No city found.</ComboboxEmpty>
    <ComboboxList>
      {(city) => (
        <ComboboxItem key={city} value={city}>
          {city}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Groups: { en: 'Groups and clear button', ar: 'مجموعات وزر مسح' },
    Multiple: { en: 'Multiple with chips', ar: 'اختيار متعدد بشرائح' },
    Invalid: { en: 'Invalid', ar: 'غير صالح' },
  },
  accessibility: [
    { en: 'The input has role="combobox" and controls a listbox. Arrow keys move through options, Enter selects, Escape closes.', ar: 'للحقل role="combobox" ويتحكم بقائمة. تتنقل الأسهم بين الخيارات، ويختار Enter، ويغلق Escape.' },
    { en: 'Give the input an aria-label or a Field label.', ar: 'امنح الحقل aria-label أو تسمية Field.' },
    { en: 'Pass items so the list filters as you type. ComboboxEmpty tells screen reader users when nothing matches.', ar: 'مرّر items لتُصفّى القائمة أثناء الكتابة. يخبر ComboboxEmpty مستخدمي قارئ الشاشة عندما لا يوجد تطابق.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  return <CityCombobox lang={lang} />;
}

export function Groups({ lang }: ExampleProps) {
  return <GroupedCombobox lang={lang} />;
}

export function Multiple({ lang }: ExampleProps) {
  return <MultiCombobox lang={lang} />;
}

export function Invalid({ lang }: ExampleProps) {
  return <InvalidCombobox lang={lang} />;
}
