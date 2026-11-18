import { Button } from '@/registry/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/ui/drawer';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A panel that slides from a screen edge and can be dragged to dismiss. Built on Base UI Drawer.',
    ar: 'لوحة تنزلق من حافة الشاشة ويمكن سحبها لإغلاقها. مبنية على Drawer من Base UI.',
  },
  usage: `import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Directions: { en: 'Directions', ar: 'الاتجاهات' },
    SwipeHandle: { en: 'With a swipe handle', ar: 'مع مقبض سحب' },
  },
  accessibility: [
    {
      en: 'Modal by default: focus is trapped, Escape closes it, and focus returns to the trigger.',
      ar: 'مشروط افتراضيًا: يُحصر التركيز، ويغلقه Escape، ويعود التركيز إلى الزر.',
    },
    {
      en: 'Dragging is an extra way to close it. Always keep a visible close action for keyboard users.',
      ar: 'السحب طريقة إضافية للإغلاق. أبقِ دائمًا إجراء إغلاق ظاهرًا لمستخدمي لوحة المفاتيح.',
    },
    {
      en: 'Provide a DrawerTitle so the panel has an accessible name.',
      ar: 'وفّر DrawerTitle ليكون للوحة اسم متاح للقارئات.',
    },
    {
      en: 'swipeDirection left and right place the drawer at the start and end edge, so it mirrors in RTL.',
      ar: 'تضع القيمتان left وright في swipeDirection الدرج عند حافة البداية والنهاية، فينعكس في RTL.',
    },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>{ar ? 'فتح الدرج' : 'Open drawer'}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{ar ? 'حدّد هدفك' : 'Set your goal'}</DrawerTitle>
          <DrawerDescription>{ar ? 'اضبط هدف السعرات اليومي.' : 'Set your daily calorie goal.'}</DrawerDescription>
        </DrawerHeader>
        <p className="px-4 text-center text-5xl font-semibold tracking-tight tabular-nums">
          <bdi>350</bdi>
        </p>
        <DrawerFooter>
          <DrawerClose render={<Button />}>{ar ? 'حفظ' : 'Save'}</DrawerClose>
          <DrawerClose render={<Button variant="outline" />}>{ar ? 'إلغاء' : 'Cancel'}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const DIRECTIONS = [
  { en: 'Top', ar: 'أعلى', swipe: 'up' },
  { en: 'Start', ar: 'البداية', swipe: 'left' },
  { en: 'End', ar: 'النهاية', swipe: 'right' },
  { en: 'Bottom', ar: 'أسفل', swipe: 'down' },
] as const;

export function Directions({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {DIRECTIONS.map((d) => (
        <Drawer key={d.en} swipeDirection={d.swipe}>
          <DrawerTrigger render={<Button variant="outline" />}>{d[lang]}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{ar ? 'الإعدادات' : 'Settings'}</DrawerTitle>
              <DrawerDescription>
                {ar ? `ينزلق هذا الدرج من جهة: ${d.ar}.` : `This drawer slides in from the ${d.en.toLowerCase()}.`}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>{ar ? 'إغلاق' : 'Close'}</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}

export function SwipeHandle({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>{ar ? 'فتح مع مقبض' : 'Open with handle'}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{ar ? 'اسحب للإغلاق' : 'Drag to close'}</DrawerTitle>
          <DrawerDescription>{ar ? 'اسحب المقبض إلى الأسفل لإغلاق الدرج.' : 'Drag the handle down to close the drawer.'}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>{ar ? 'إغلاق' : 'Close'}</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
