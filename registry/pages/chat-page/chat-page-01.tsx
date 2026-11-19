"use client"

import * as React from "react"
import { PaperclipIcon } from "@phosphor-icons/react"

import {
  ChatThread01,
  demo as threadDemo,
  labelsAr as threadAr,
  labelsEn as threadEn,
} from "@/registry/blocks/chat-thread/chat-thread-01"
import {
  ConversationList01,
  demo as listDemo,
} from "@/registry/blocks/conversation-list/conversation-list-01"
import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/block-types"
import { Button } from "@/registry/ui/button"
import {
  ContextMeter,
  contextMeterLabelsAr,
  type ContextUsage,
} from "@/registry/ui/context-meter"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  messageScrollerLabelsAr,
} from "@/registry/ui/message-scroller"
import {
  ModelPicker,
  modelPickerLabelsAr,
  type Model,
} from "@/registry/ui/model-picker"
import { PromptInput, promptInputLabelsAr } from "@/registry/ui/prompt-input"

type ChatPage01Props = {
  list: React.ComponentProps<typeof ConversationList01>
  thread: React.ComponentProps<typeof ChatThread01>
  composer: {
    lang: Lang
    placeholder: string
    attach: string
    models: Model[]
    currency?: string
    // The tokens of the open chat against the window of the chosen model.
    used: number
    max: number
    usage: ContextUsage[]
  }
  className?: string
}

// Layout: history on the start side, the thread in a scroller, the prompt input pinned under it.
// On a narrow screen the history hides and the thread takes the width.
function ChatPage01({ list, thread, composer, className }: ChatPage01Props) {
  const lang = thread.lang ?? "en"
  const ar = lang === "ar"
  return (
    <div
      dir={ar ? "rtl" : "ltr"}
      className={cn(
        "grid h-svh min-h-[36rem] bg-background text-foreground md:grid-cols-[19rem_minmax(0,1fr)]",
        className
      )}
    >
      <aside className="hidden min-h-0 border-e bg-muted/40 p-3 md:block">
        <ConversationList01
          {...list}
          className="h-full max-w-none p-0 sm:p-0 md:p-0 lg:p-0"
        />
      </aside>
      <main id="main-content" className="flex min-h-0 min-w-0 flex-col">
        <MessageScrollerProvider defaultScrollPosition="start">
          <MessageScroller className="flex-1">
            <MessageScrollerViewport
              aria-label={(ar ? threadAr : threadEn).conversation}
            >
              <MessageScrollerContent>
                <ChatThread01 {...thread} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton
              labels={ar ? messageScrollerLabelsAr : undefined}
            />
          </MessageScroller>
        </MessageScrollerProvider>
        <div className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
          <PromptInput
            placeholder={composer.placeholder}
            labels={ar ? promptInputLabelsAr : undefined}
            tools={
              <Button variant="ghost" size="icon-sm" aria-label={composer.attach}>
                <PaperclipIcon />
              </Button>
            }
            model={
              <>
                <ContextMeter
                  used={composer.used}
                  max={composer.max}
                  usage={composer.usage}
                  lang={composer.lang}
                  currency={composer.currency}
                  labels={ar ? contextMeterLabelsAr : undefined}
                />
                <ModelPicker
                  models={composer.models}
                  lang={composer.lang}
                  currency={composer.currency}
                  labels={ar ? modelPickerLabelsAr : undefined}
                />
              </>
            }
          />
        </div>
      </main>
    </div>
  )
}

export { ChatPage01 }
export default ChatPage01

const models: Record<Lang, Model[]> = {
  en: [
    { id: "lite", name: "Mizan Lite", provider: "Mizan", context: 128000, price: { input: 0.15, output: 0.6 } },
    { id: "pro", name: "Mizan Pro", provider: "Mizan", context: 200000, price: { input: 3, output: 15 } },
    { id: "atlas", name: "Atlas 70B", provider: "Open weights", context: 128000, price: { input: 0.9, output: 0.9 } },
    { id: "noor", name: "Noor Mini", provider: "Open weights", context: 32000, price: { input: 0.05, output: 0.2 } },
  ],
  ar: [
    { id: "lite", name: "Mizan Lite", provider: "ميزان", context: 128000, price: { input: 0.15, output: 0.6 } },
    { id: "pro", name: "Mizan Pro", provider: "ميزان", context: 200000, price: { input: 3, output: 15 } },
    { id: "atlas", name: "Atlas 70B", provider: "نماذج مفتوحة", context: 128000, price: { input: 0.9, output: 0.9 } },
    { id: "noor", name: "Noor Mini", provider: "نماذج مفتوحة", context: 32000, price: { input: 0.05, output: 0.2 } },
  ],
}

const usage: Record<Lang, ContextUsage[]> = {
  en: [
    { id: "input", label: "Input", tokens: 98400, cost: 0.2952 },
    { id: "output", label: "Output", tokens: 21300, cost: 0.3195 },
    { id: "cached", label: "Cached", tokens: 14200, cost: 0.0043 },
  ],
  ar: [
    { id: "input", label: "المدخلات", tokens: 98400, cost: 0.2952 },
    { id: "output", label: "المخرجات", tokens: 21300, cost: 0.3195 },
    { id: "cached", label: "المخزّنة مؤقتًا", tokens: 14200, cost: 0.0043 },
  ],
}

export const demo: { en: ChatPage01Props; ar: ChatPage01Props } = {
  en: {
    list: listDemo.en,
    thread: threadDemo.en,
    composer: {
      lang: "en",
      placeholder: "Ask about your store",
      attach: "Attach a file",
      models: models.en,
      used: 133900,
      max: 200000,
      usage: usage.en,
    },
  },
  ar: {
    list: listDemo.ar,
    thread: threadDemo.ar,
    composer: {
      lang: "ar",
      placeholder: "اسأل عن متجرك",
      attach: "إرفاق ملف",
      models: models.ar,
      used: 133900,
      max: 200000,
      usage: usage.ar,
    },
  },
}
