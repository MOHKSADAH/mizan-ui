import { Button } from '@/registry/ui/button';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/registry/ui/popover';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Rich content in a floating panel anchored to a trigger. Opens on click and closes on outside click or Escape.',
    ar: 'محتوى غني في لوحة عائمة مثبتة على زر. تُفتح بالنقر وتُغلق بالنقر خارجها أو بمفتاح Escape.',
  },
  usage: `import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Open</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Sides: { en: 'Sides', ar: 'الجوانب' },
    Align: { en: 'Alignment', ar: 'المحاذاة' },
  },
  accessibility: [
    {
      en: 'Enter or Space on the trigger opens it. Focus moves into the panel and Escape returns it to the trigger.',
      ar: 'يفتحها Enter أو Space على الزر. ينتقل التركيز إلى اللوحة ويعيده Escape إلى الزر.',
    },
    {
      en: 'Use inline-start and inline-end for sides so the panel mirrors in Arabic. left and right do not.',
      ar: 'استخدم inline-start وinline-end للجوانب لتنعكس اللوحة في العربية. أما left وright فلا تنعكس.',
    },
    {
      en: 'Add a PopoverTitle so the panel is labelled for screen readers.',
      ar: 'أضف PopoverTitle ليكون للوحة اسم تقرؤه قارئات الشاشة.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>{ar ? 'الأبعاد' : 'Dimensions'}</PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>{ar ? 'الأبعاد' : 'Dimensions'}</PopoverTitle>
          <PopoverDescription>{ar ? 'اضبط أبعاد العنصر.' : 'Set the dimensions of the element.'}</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="popover-width">{ar ? 'العرض' : 'Width'}</Label>
            <Input id="popover-width" dir="ltr" className="col-span-2" defaultValue="100%" />
          </div>
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="popover-height">{ar ? 'الارتفاع' : 'Height'}</Label>
            <Input id="popover-height" dir="ltr" className="col-span-2" defaultValue="25px" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const SIDES = [
  { side: 'top', en: 'Top', ar: 'أعلى' },
  { side: 'inline-start', en: 'Start', ar: 'البداية' },
  { side: 'inline-end', en: 'End', ar: 'النهاية' },
  { side: 'bottom', en: 'Bottom', ar: 'أسفل' },
] as const;

export function Sides({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SIDES.map((s) => (
        <Popover key={s.side}>
          <PopoverTrigger render={<Button variant="outline" />}>{s[lang]}</PopoverTrigger>
          <PopoverContent side={s.side} className="w-56">
            <PopoverHeader>
              <PopoverTitle>{ar ? 'ملاحظة' : 'Note'}</PopoverTitle>
              <PopoverDescription>{ar ? `تظهر هذه اللوحة في جهة: ${s.ar}.` : `This panel opens on the ${s.en.toLowerCase()} side.`}</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}

const ALIGNS = [
  { align: 'start', en: 'Start', ar: 'بداية' },
  { align: 'center', en: 'Center', ar: 'وسط' },
  { align: 'end', en: 'End', ar: 'نهاية' },
] as const;

export function Align({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {ALIGNS.map((a) => (
        <Popover key={a.align}>
          <PopoverTrigger render={<Button variant="outline" />}>{a[lang]}</PopoverTrigger>
          <PopoverContent align={a.align} className="w-56">
            <PopoverHeader>
              <PopoverTitle>{ar ? 'المحاذاة' : 'Alignment'}</PopoverTitle>
              <PopoverDescription>{ar ? `محاذاة إلى: ${a.ar}.` : `Aligned to the ${a.en.toLowerCase()}.`}</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
