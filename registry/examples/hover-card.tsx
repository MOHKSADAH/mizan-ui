import { CalendarBlankIcon } from '@phosphor-icons/react/ssr';
import { Avatar, AvatarFallback } from '@/registry/ui/avatar';
import { Button } from '@/registry/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/registry/ui/hover-card';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A preview card that appears when a sighted user hovers or focuses a link. Built on Base UI Preview Card.',
    ar: 'بطاقة معاينة تظهر عندما يمرّر مستخدم مبصر المؤشر على رابط أو يركّز عليه. مبنية على Preview Card من Base UI.',
  },
  usage: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger render={<a href="/sara" />}>@sara</HoverCardTrigger>
  <HoverCardContent>Profile preview</HoverCardContent>
</HoverCard>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Sides: { en: 'Sides', ar: 'الجوانب' },
    Delays: { en: 'Delays', ar: 'التأخير' },
  },
  accessibility: [
    {
      en: 'The card opens on hover and on keyboard focus of the trigger, so keep the trigger a real link.',
      ar: 'تُفتح البطاقة عند التمرير وعند تركيز لوحة المفاتيح على المشغّل، فاجعله رابطًا حقيقيًا.',
    },
    {
      en: 'The preview is a supplement. Touch and screen reader users cannot rely on it, so repeat key facts on the target page.',
      ar: 'المعاينة إضافية فقط. لا يعتمد عليها مستخدمو اللمس وقارئات الشاشة، فكرّر المعلومات المهمة في الصفحة الهدف.',
    },
    {
      en: 'Use inline-start and inline-end for sides so the card mirrors in Arabic.',
      ar: 'استخدم inline-start وinline-end للجوانب لتنعكس البطاقة في العربية.',
    },
  ],
};

function ProfileCard({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarFallback>{ar ? 'سا' : 'SA'}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="font-medium">{ar ? 'سارة العتيبي' : 'Sara Alotaibi'}</p>
        <p className="text-muted-foreground">
          {ar ? 'مصممة منتجات تعمل على نظام التصميم.' : 'Product designer working on the design system.'}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarBlankIcon weight="regular" className="size-3.5" />
          {ar ? 'انضمت في مارس 2024' : 'Joined March 2024'}
        </p>
      </div>
    </div>
  );
}

export function Default({ lang }: ExampleProps) {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>
        <bdi>@sara</bdi>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <ProfileCard lang={lang} />
      </HoverCardContent>
    </HoverCard>
  );
}

const SIDES = [
  { side: 'top', en: 'Top', ar: 'أعلى' },
  { side: 'inline-start', en: 'Start', ar: 'البداية' },
  { side: 'inline-end', en: 'End', ar: 'النهاية' },
  { side: 'bottom', en: 'Bottom', ar: 'أسفل' },
] as const;

export function Sides({ lang }: ExampleProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SIDES.map((s) => (
        <HoverCard key={s.side}>
          <HoverCardTrigger render={<Button variant="outline" />}>{s[lang]}</HoverCardTrigger>
          <HoverCardContent side={s.side} className="w-72">
            <ProfileCard lang={lang} />
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}

export function Delays({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <HoverCard>
        <HoverCardTrigger delay={0} closeDelay={0} render={<Button variant="outline" />}>
          {ar ? 'فوري' : 'Instant'}
        </HoverCardTrigger>
        <HoverCardContent className="w-64">{ar ? 'يظهر فورًا ويختفي فورًا.' : 'Opens and closes at once.'}</HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger delay={800} closeDelay={400} render={<Button variant="outline" />}>
          {ar ? 'بطيء' : 'Slow'}
        </HoverCardTrigger>
        <HoverCardContent className="w-64">{ar ? 'يظهر بعد 800 مللي ثانية.' : 'Opens after 800 ms.'}</HoverCardContent>
      </HoverCard>
    </div>
  );
}
