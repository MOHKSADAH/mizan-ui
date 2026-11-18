import { Bubble, BubbleContent } from '@/registry/ui/bubble';
import { Message, MessageContent } from '@/registry/ui/message';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/registry/ui/message-scroller';
import { MessageScrollerLive } from '@/registry/examples/message-scroller.client';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'A scroll area for chat that stays at the newest message, keeps your place when you scroll up, and shows a jump button.',
    ar: 'منطقة تمرير للمحادثات تبقى عند أحدث رسالة، وتحفظ موضعك عند التمرير للأعلى، وتعرض زر قفز.',
  },
  usage: `import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

<MessageScrollerProvider>
  <MessageScroller className="h-80">
    <MessageScrollerViewport aria-label="Conversation">
      <MessageScrollerContent>
        <MessageScrollerItem>...</MessageScrollerItem>
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    FromStart: { en: 'Starts at the top, both buttons', ar: 'تبدأ من الأعلى بزرين' },
    Live: { en: 'Live composer', ar: 'مربع إرسال مباشر' },
  },
  accessibility: [
    { en: 'The viewport is a focusable, labelled region: set aria-label on MessageScrollerViewport.', ar: 'نافذة العرض منطقة قابلة للتركيز ولها تسمية: اضبط aria-label على MessageScrollerViewport.' },
    { en: 'New content is announced politely and auto-scroll stops when the user scrolls away.', ar: 'يُعلن المحتوى الجديد بهدوء ويتوقف التمرير التلقائي عندما يبتعد المستخدم.' },
    { en: 'The jump button has an sr-only label; pass messageScrollerLabelsAr for Arabic.', ar: 'لزر القفز تسمية sr-only؛ مرّر messageScrollerLabelsAr للعربية.' },
  ],
};

const LINES = {
  en: [
    'Hello, how can I help?',
    'I want to change my delivery address.',
    'Sure. Is the order already shipped?',
    'Not yet, it is still being packed.',
    'Then I can update it now. What is the new address?',
    'Riyadh, Olaya Street, building 12.',
    'Done. The address is updated.',
    'Thank you, that was quick.',
    'You are welcome. Anything else?',
    'No, that is all.',
  ],
  ar: [
    'مرحبًا، كيف أساعدك؟',
    'أريد تغيير عنوان التوصيل.',
    'بالتأكيد. هل شُحن الطلب؟',
    'ليس بعد، ما زال قيد التجهيز.',
    'إذن أستطيع تحديثه الآن. ما العنوان الجديد؟',
    'الرياض، شارع العليا، مبنى 12.',
    'تم. حُدّث العنوان.',
    'شكرًا، كان ذلك سريعًا.',
    'عفوًا. هل من شيء آخر؟',
    'لا، هذا كل شيء.',
  ],
};

const labelsAr = { toEnd: 'التمرير إلى النهاية', toStart: 'التمرير إلى البداية' };

function Conversation({ lang }: ExampleProps) {
  return LINES[lang].map((text, i) => (
    <MessageScrollerItem key={text} messageId={String(i)} scrollAnchor={i === LINES[lang].length - 1}>
      <Message align={i % 2 === 0 ? 'start' : 'end'}>
        <MessageContent>
          <Bubble variant={i % 2 === 0 ? 'secondary' : 'default'}>
            <BubbleContent>{text}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  ));
}

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <MessageScrollerProvider>
      <MessageScroller className="h-72 w-full max-w-md rounded-xl border">
        <MessageScrollerViewport aria-label={ar ? 'المحادثة' : 'Conversation'}>
          <MessageScrollerContent className="p-4">
            <Conversation lang={lang} />
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton labels={ar ? labelsAr : undefined} />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

export function FromStart({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <MessageScrollerProvider defaultScrollPosition="start">
      <MessageScroller className="h-72 w-full max-w-md rounded-xl border">
        <MessageScrollerViewport aria-label={ar ? 'المحادثة' : 'Conversation'}>
          <MessageScrollerContent className="p-4">
            <Conversation lang={lang} />
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="start" labels={ar ? labelsAr : undefined} />
        <MessageScrollerButton labels={ar ? labelsAr : undefined} />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

export function Live({ lang }: ExampleProps) {
  return <MessageScrollerLive lang={lang} />;
}
