import { Avatar, AvatarFallback } from '@/registry/ui/avatar';
import { Bubble, BubbleContent } from '@/registry/ui/bubble';
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from '@/registry/ui/message';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'One entry in a conversation: an avatar, a header, the bubbles and a footer. Align "end" flips the row for the sender.',
    ar: 'مدخل واحد في المحادثة: صورة رمزية ورأس وفقاعات وتذييل. المحاذاة "end" تقلب الصف للمرسل.',
  },
  usage: `import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent, MessageHeader } from "@/components/ui/message"

<Message>
  <MessageContent>
    <MessageHeader>Sara</MessageHeader>
    <Bubble variant="secondary">
      <BubbleContent>Hello</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`,
  examples: {
    Default: { en: 'Conversation', ar: 'محادثة' },
    HeaderFooter: { en: 'With header and footer', ar: 'مع رأس وتذييل' },
    Ghost: { en: 'Plain assistant reply', ar: 'رد مساعد بلا فقاعة' },
  },
  accessibility: [
    { en: 'Put the sender name in MessageHeader so the author is announced, not only shown by position.', ar: 'ضع اسم المرسل في MessageHeader ليُعلن المؤلف، وليس فقط بحسب الموضع.' },
    { en: 'Render a list of messages inside a role="log" container so new ones are announced politely.', ar: 'اعرض قائمة الرسائل داخل حاوية role="log" لتُعلن الرسائل الجديدة بهدوء.' },
    { en: 'align "end" uses flex-row-reverse, so the sender side swaps in RTL with no extra code.', ar: 'تستخدم المحاذاة "end" الخاصية flex-row-reverse، فيتبدل جانب المرسل في RTL دون شيفرة إضافية.' },
  ],
};

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <MessageGroup className="w-full max-w-md" role="log" aria-label={ar ? 'المحادثة' : 'Conversation'}>
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>{ar ? 'سا' : 'SA'}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>{ar ? 'هل يمكنك مراجعة الفاتورة؟' : 'Can you review the invoice?'}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>{ar ? 'بالتأكيد، سأرسل ملاحظاتي خلال ساعة.' : 'Sure, I will send notes within an hour.'}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}

export function HeaderFooter({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <MessageGroup className="w-full max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>{ar ? 'خم' : 'KM'}</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>{ar ? 'خالد المطيري' : 'Khalid Almutairi'}</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>{ar ? 'تم رفع الملفات إلى المجلد المشترك.' : 'The files are in the shared folder.'}</BubbleContent>
          </Bubble>
          <MessageFooter>
            <bdi>{ar ? '٩:٤٢ ص' : '9:42 AM'}</bdi>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble variant="tinted">
            <BubbleContent>{ar ? 'شكرًا، وصلت.' : 'Thanks, got them.'}</BubbleContent>
          </Bubble>
          <MessageFooter>
            {ar ? 'تم التسليم' : 'Delivered'} · <bdi>{ar ? '٩:٤٣ ص' : '9:43 AM'}</bdi>
          </MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}

export function Ghost({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <MessageGroup className="w-full max-w-md">
      <Message align="end">
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>{ar ? 'لخّص لي هذه الفاتورة.' : 'Summarize this invoice.'}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <MessageHeader>{ar ? 'المساعد' : 'Assistant'}</MessageHeader>
          <Bubble variant="ghost">
            <BubbleContent>
              {ar ? 'الفاتورة ' : 'Invoice '}
              <bdi dir="ltr">INV-1042</bdi>
              {ar ? ' مستحقة الدفع خلال ' : ' is due in '}
              <bdi>{ar ? '٧ أيام' : '7 days'}</bdi>
              {ar ? '، وإجماليها شامل ضريبة القيمة المضافة.' : ', and the total includes VAT.'}
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
