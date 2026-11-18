import { Fragment } from 'react';
import { CaretRightIcon, PackageIcon, ShieldCheckIcon } from '@phosphor-icons/react/ssr';
import { Avatar, AvatarFallback } from '@/registry/ui/avatar';
import { Button } from '@/registry/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/registry/ui/item';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A flexible row for a title, description, media and actions. Use it for lists, settings and menus.',
    ar: 'صف مرن لعنوان ووصف ووسائط وإجراءات. استخدمه للقوائم والإعدادات.',
  },
  usage: `import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

<Item variant="outline">
  <ItemContent>
    <ItemTitle>Title</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm">Open</Button>
  </ItemActions>
</Item>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Variants: { en: 'Variants', ar: 'الأنواع' },
    Sizes: { en: 'Sizes', ar: 'المقاسات' },
    Group: { en: 'Group as a link list', ar: 'مجموعة كقائمة روابط' },
  },
  accessibility: [
    { en: 'ItemGroup has role "list". Give each Item role "listitem" when it is a list entry.', ar: 'لـ ItemGroup الدور "list". أعطِ كل Item الدور "listitem" عندما يكون عنصر قائمة.' },
    { en: 'Use render={<a />} to make the whole row a link; the row then shows a focus ring.', ar: 'استخدم render={<a />} لجعل الصف كله رابطًا؛ فتظهر حلقة التركيز على الصف.' },
    { en: 'Chevrons are directional and get rtl:rotate-180.', ar: 'الأسهم اتجاهية وتأخذ rtl:rotate-180.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Item variant="outline" className="max-w-md">
      <ItemMedia variant="icon">
        <ShieldCheckIcon weight="regular" aria-hidden />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{ar ? 'التحقق بخطوتين' : 'Two-step verification'}</ItemTitle>
        <ItemDescription>{ar ? 'أضف طبقة حماية إضافية لحسابك.' : 'Add an extra layer of protection to your account.'}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          {ar ? 'تفعيل' : 'Enable'}
        </Button>
      </ItemActions>
    </Item>
  );
}

const VARIANTS = ['default', 'outline', 'muted'] as const;
const VARIANT_LABELS = { en: ['Default', 'Outline', 'Muted'], ar: ['افتراضي', 'بإطار', 'خافت'] };

export function Variants({ lang }: ExampleProps) {
  return (
    <ItemGroup className="max-w-md gap-3">
      {VARIANTS.map((v, i) => (
        <Item key={v} variant={v} role="listitem">
          <ItemContent>
            <ItemTitle>{VARIANT_LABELS[lang][i]}</ItemTitle>
            <ItemDescription>{lang === 'ar' ? 'وصف قصير للعنصر.' : 'A short description of the item.'}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  );
}

export function Sizes({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ItemGroup className="max-w-md gap-3">
      {(['default', 'sm', 'xs'] as const).map((size) => (
        <Item key={size} variant="outline" size={size} role="listitem">
          <ItemMedia variant="icon">
            <PackageIcon weight="regular" aria-hidden />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{ar ? 'الطلب جاهز للشحن' : 'Order ready to ship'}</ItemTitle>
            <ItemDescription>{ar ? 'تم تجهيز الطلب في المستودع.' : 'The order is packed at the warehouse.'}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  );
}

export function Group({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const people = ar
    ? [
        { initials: 'سا', name: 'سارة العتيبي', email: 'sara@example.com' },
        { initials: 'خم', name: 'خالد المطيري', email: 'khalid@example.com' },
        { initials: 'نع', name: 'نورة العمري', email: 'noura@example.com' },
      ]
    : [
        { initials: 'SA', name: 'Sara Alotaibi', email: 'sara@example.com' },
        { initials: 'KM', name: 'Khalid Almutairi', email: 'khalid@example.com' },
        { initials: 'NA', name: 'Noura Alomari', email: 'noura@example.com' },
      ];
  return (
    <ItemGroup className="max-w-md gap-0">
      {people.map((p, i) => (
        <Fragment key={p.email}>
          <Item render={<a href="#" />} role="listitem">
            <ItemMedia>
              <Avatar>
                <AvatarFallback>{p.initials}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{p.name}</ItemTitle>
              <ItemDescription>
                <bdi dir="ltr">{p.email}</bdi>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <CaretRightIcon weight="regular" aria-hidden className="size-4 text-muted-foreground rtl:rotate-180" />
            </ItemActions>
          </Item>
          {i < people.length - 1 && <ItemSeparator className="my-0" />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
