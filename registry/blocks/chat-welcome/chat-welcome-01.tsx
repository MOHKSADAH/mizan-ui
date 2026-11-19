"use client"

import * as React from "react"
import {
  ChartLineUpIcon,
  PackageIcon,
  PencilLineIcon,
  SparkleIcon,
  TruckIcon,
} from "@phosphor-icons/react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import {
  PromptInput,
  promptInputLabelsAr,
} from "@/registry/ui/prompt-input"
import { Section, SectionHeader } from "@/registry/ui/section"
import {
  Suggestions,
  suggestionsLabelsAr,
  type Suggestion,
} from "@/registry/ui/suggestions"

export type ChatWelcome01Labels = {
  greeting: (name: string) => string
  description: string
  placeholder: string
}

export const labelsEn: ChatWelcome01Labels = {
  greeting: (name) => `Hello ${name}, what should we work on?`,
  description:
    "Ask about your sales, orders and stock, or have me write a product description.",
  placeholder: "Ask about your store",
}

export const labelsAr: ChatWelcome01Labels = {
  greeting: (name) => `أهلًا ${name}، من أين نبدأ؟`,
  description: "اسألني عن مبيعاتك وطلباتك ومخزونك، أو اطلب مني كتابة وصف منتج.",
  placeholder: "اسأل عن متجرك",
}

export type ChatWelcome01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<ChatWelcome01Labels>
  name: string
  suggestions: Suggestion[]
  // Called with the text when the user sends. A suggestion only fills the input.
  onSubmit?: (text: string) => void
}

// An empty chat: a greeting, the input in the middle and prompt chips below it.
export function ChatWelcome01({
  lang = "en",
  labels,
  name,
  suggestions,
  onSubmit,
  headingLevel = 2,
  id,
  className,
}: ChatWelcome01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const uid = React.useId()
  const sid = id ?? uid
  const [value, setValue] = React.useState("")
  const input = React.useRef<HTMLTextAreaElement>(null)

  return (
    <Section id={sid} className={className}>
      <Container size="prose" dir={dir} className="flex flex-col items-center gap-8">
        <span
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-xl border bg-card text-foreground"
        >
          <SparkleIcon className="size-6" weight="fill" />
        </span>
        <SectionHeader
          id={sid}
          align="center"
          headingLevel={headingLevel}
          title={t.greeting(name)}
          description={t.description}
          className="mb-0"
        />
        <PromptInput
          value={value}
          onValueChange={setValue}
          textareaRef={input}
          placeholder={t.placeholder}
          labels={lang === "ar" ? promptInputLabelsAr : undefined}
          onSubmit={(text) => {
            onSubmit?.(text)
            setValue("")
          }}
        />
        <Suggestions
          suggestions={suggestions}
          className="justify-center"
          labels={lang === "ar" ? suggestionsLabelsAr : undefined}
          onSelect={(prompt) => {
            setValue(prompt)
            input.current?.focus()
          }}
        />
      </Container>
    </Section>
  )
}

export default ChatWelcome01

const en: Suggestion[] = [
  { label: "Summarize this week's sales", icon: <ChartLineUpIcon data-icon="inline-start" /> },
  { label: "Which products are almost out of stock?", icon: <PackageIcon data-icon="inline-start" /> },
  { label: "Write a description for Royal Oud Perfume", icon: <PencilLineIcon data-icon="inline-start" /> },
  { label: "Which orders are late for delivery?", icon: <TruckIcon data-icon="inline-start" /> },
]

const ar: Suggestion[] = [
  { label: "لخّص مبيعات الأسبوع", icon: <ChartLineUpIcon data-icon="inline-start" /> },
  { label: "أي المنتجات أوشكت على النفاد؟", icon: <PackageIcon data-icon="inline-start" /> },
  { label: "اكتب وصفًا لمنتج «عطر عود ملكي»", icon: <PencilLineIcon data-icon="inline-start" /> },
  { label: "ما الطلبات المتأخرة عن موعد التوصيل؟", icon: <TruckIcon data-icon="inline-start" /> },
]

export const demo: { en: ChatWelcome01Props; ar: ChatWelcome01Props } = {
  en: { lang: "en", labels: labelsEn, name: "Khalid", suggestions: en },
  ar: { lang: "ar", labels: labelsAr, name: "خالد", suggestions: ar },
}
