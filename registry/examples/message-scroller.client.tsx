'use client';

import * as React from 'react';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { Bubble, BubbleContent } from '@/registry/ui/bubble';
import { Button } from '@/registry/ui/button';
import { Input } from '@/registry/ui/input';
import { Message, MessageContent } from '@/registry/ui/message';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  messageScrollerLabelsAr,
} from '@/registry/ui/message-scroller';
import type { Lang } from '@/registry/lib/format';

const SEED = {
  en: ['Hi, I need help with my order.', 'Of course. What is the order number?'],
  ar: ['مرحبًا، أحتاج مساعدة بخصوص طلبي.', 'بكل سرور. ما رقم الطلب؟'],
};

// A composer that appends messages: the scroller follows new ones while you are at the end.
export function MessageScrollerLive({ lang }: { lang: Lang }) {
  const ar = lang === 'ar';
  const [messages, setMessages] = React.useState(SEED[lang].map((text, id) => ({ id, text, mine: id % 2 === 0 })));
  const [draft, setDraft] = React.useState('');

  function send(event: React.FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: m.length, text, mine: true }]);
    setDraft('');
  }

  return (
    <div className="grid w-full max-w-md gap-3">
      <MessageScrollerProvider>
        <MessageScroller className="h-64 rounded-xl border">
          <MessageScrollerViewport aria-label={ar ? 'المحادثة' : 'Conversation'}>
            <MessageScrollerContent className="p-4">
              {messages.map((m) => (
                <MessageScrollerItem key={m.id} messageId={String(m.id)} scrollAnchor={m.mine}>
                  <Message align={m.mine ? 'end' : 'start'}>
                    <MessageContent>
                      <Bubble variant={m.mine ? 'default' : 'secondary'}>
                        <BubbleContent>{m.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton labels={ar ? messageScrollerLabelsAr : undefined} />
        </MessageScroller>
      </MessageScrollerProvider>
      <form onSubmit={send} className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          aria-label={ar ? 'رسالتك' : 'Your message'}
          placeholder={ar ? 'اكتب رسالة' : 'Write a message'}
        />
        <Button type="submit" size="icon" aria-label={ar ? 'إرسال' : 'Send'}>
          <PaperPlaneRightIcon className="rtl:-scale-x-100" />
        </Button>
      </form>
    </div>
  );
}
