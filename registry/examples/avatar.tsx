import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/registry/ui/avatar';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'An image with a text fallback, in three sizes, with a status badge and an overlapping group.',
    ar: 'صورة مع نص بديل، بثلاثة مقاسات، مع شارة حالة ومجموعة متداخلة.',
  },
  usage: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.png" alt="Sara" />
  <AvatarFallback>SA</AvatarFallback>
</Avatar>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Sizes: { en: 'Sizes', ar: 'المقاسات' },
    WithBadge: { en: 'With status badge', ar: 'مع شارة حالة' },
    Group: { en: 'Group', ar: 'مجموعة' },
  },
  accessibility: [
    { en: 'Give AvatarImage an alt text with the person name, or leave the fallback initials as the label.', ar: 'أعطِ AvatarImage نصًا بديلًا باسم الشخص، أو اترك أحرف البديل كتسمية.' },
    { en: 'A status badge needs a text label next to the avatar or an aria-label on a wrapper.', ar: 'تحتاج شارة الحالة إلى تسمية نصية بجانب الصورة أو aria-label على غلاف.' },
    { en: 'The group overlaps from the inline start, so the stack mirrors in RTL.', ar: 'تتداخل المجموعة من بداية السطر، فينعكس التكديس في RTL.' },
  ],
};

const INITIALS = { en: ['SA', 'KM', 'LN', 'OF'], ar: ['سا', 'خم', 'لن', 'عف'] };

export function Default({ lang }: ExampleProps) {
  return (
    <Avatar>
      <AvatarFallback>{INITIALS[lang][0]}</AvatarFallback>
    </Avatar>
  );
}

export function Sizes({ lang }: ExampleProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>{INITIALS[lang][0]}</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>{INITIALS[lang][0]}</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>{INITIALS[lang][0]}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function WithBadge({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{INITIALS[lang][1]}</AvatarFallback>
          <AvatarBadge className="bg-success" />
        </Avatar>
        <span className="text-sm">{ar ? 'متصل' : 'Online'}</span>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{INITIALS[lang][2]}</AvatarFallback>
          <AvatarBadge className="bg-muted-foreground" />
        </Avatar>
        <span className="text-sm">{ar ? 'غير متصل' : 'Offline'}</span>
      </div>
    </div>
  );
}

export function Group({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <AvatarGroup role="group" aria-label={ar ? 'أعضاء الفريق' : 'Team members'}>
      {INITIALS[lang].map((initials) => (
        <Avatar key={initials}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>
        <bdi>+5</bdi>
      </AvatarGroupCount>
    </AvatarGroup>
  );
}
