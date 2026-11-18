import { CheckIcon, ThumbsUpIcon } from '@phosphor-icons/react/ssr';
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '@/registry/ui/bubble';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'The rounded surface of one chat message. Seven variants, start or end alignment, and optional reactions.',
    ar: 'السطح المستدير لرسالة محادثة واحدة. سبعة أنواع، ومحاذاة للبداية أو النهاية، وتفاعلات اختيارية.',
  },
  usage: `import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

<BubbleGroup>
  <Bubble variant="secondary">
    <BubbleContent>Hello</BubbleContent>
  </Bubble>
  <Bubble align="end">
    <BubbleContent>Hi</BubbleContent>
  </Bubble>
</BubbleGroup>`,
  examples: {
    Default: { en: 'Conversation', ar: 'محادثة' },
    Variants: { en: 'Variants', ar: 'الأنواع' },
    Reactions: { en: 'With reactions', ar: 'مع تفاعلات' },
    Interactive: { en: 'As a button', ar: 'كزر' },
  },
  accessibility: [
    { en: 'Align "start" and "end" follow the reading direction, so a sent message sits on the left in RTL.', ar: 'المحاذاة "start" و"end" تتبع اتجاه القراءة، فتكون الرسالة المرسلة على اليسار في RTL.' },
    { en: 'Do not rely on bubble color to show who sent a message: add a name or an aria-label.', ar: 'لا تعتمد على لون الفقاعة لمعرفة المرسل: أضف اسمًا أو aria-label.' },
    { en: 'Render the content as a button or link with render; it gets a visible focus ring.', ar: 'اعرض المحتوى كزر أو رابط عبر render؛ فتظهر له حلقة تركيز.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble variant="secondary">
        <BubbleContent>{ar ? 'مرحبًا، هل وصل طلبي؟' : 'Hi, has my order shipped?'}</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>
          {ar ? 'نعم، تم شحنه اليوم برقم تتبع ' : 'Yes, it shipped today with tracking '}
          <bdi dir="ltr">SA4821</bdi>
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}

const VARIANTS = ['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'] as const;
const VARIANT_LABELS = {
  en: ['Default', 'Secondary', 'Muted', 'Tinted', 'Outline', 'Ghost', 'Failed to send'],
  ar: ['افتراضي', 'ثانوي', 'خافت', 'ملوّن', 'بإطار', 'شفاف', 'فشل الإرسال'],
};

export function Variants({ lang }: ExampleProps) {
  return (
    <BubbleGroup className="w-full max-w-sm">
      {VARIANTS.map((v, i) => (
        <Bubble key={v} variant={v}>
          <BubbleContent>{VARIANT_LABELS[lang][i]}</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  );
}

export function Reactions({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <BubbleGroup className="w-full max-w-sm pb-4">
      <Bubble variant="secondary">
        <BubbleContent>{ar ? 'اجتماع الغد الساعة العاشرة.' : 'Tomorrow meeting at 10.'}</BubbleContent>
        <BubbleReactions>
          <span className="flex items-center gap-1" aria-label={ar ? 'إعجابان' : '2 likes'}>
            <ThumbsUpIcon weight="fill" aria-hidden className="size-3.5" />
            <bdi aria-hidden>2</bdi>
          </span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end" variant="tinted">
        <BubbleContent className="flex items-center gap-1.5">
          {ar ? 'تمام، سأكون هناك.' : 'Great, I will be there.'}
          <CheckIcon weight="bold" aria-label={ar ? 'تم التسليم' : 'Delivered'} className="size-3.5" />
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}

export function Interactive({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble variant="outline">
        <BubbleContent render={<button type="button" />}>{ar ? 'تتبع الشحنة' : 'Track shipment'}</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent render={<a href="#invoice" />}>{ar ? 'عرض الفاتورة' : 'View invoice'}</BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}
