"use client"

import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Bubble, BubbleContent } from "@/registry/ui/bubble"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  codeBlockLabelsAr,
} from "@/registry/ui/code-block"
import { Container } from "@/registry/ui/container"
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/registry/ui/message"
import {
  MessageActions,
  messageActionsLabelsAr,
  type Feedback,
} from "@/registry/ui/message-actions"
import { Reasoning, reasoningLabelsAr } from "@/registry/ui/reasoning"
import {
  SourceCitation,
  Sources,
  sourcesLabelsAr,
  type Source,
} from "@/registry/ui/sources"
import {
  ToolCall,
  toolCallLabelsAr,
  type ToolCallState,
} from "@/registry/ui/tool-call"

export type ChatThread01Labels = {
  conversation: string
  you: string
  assistant: string
}

export const labelsEn: ChatThread01Labels = {
  conversation: "Conversation",
  you: "You",
  assistant: "Assistant",
}

export const labelsAr: ChatThread01Labels = {
  conversation: "المحادثة",
  you: "أنت",
  assistant: "المساعد",
}

export type ThreadPart =
  | { type: "reasoning"; text: string; duration?: number; status?: "running" | "done" }
  | {
      type: "tool"
      name: string
      state: ToolCallState
      input?: unknown
      output?: unknown
      errorText?: string
    }
  // Paragraphs split at blank lines, each with dir="auto". A marker like [1] becomes a citation of the sources part.
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; title?: string }
  | { type: "sources"; sources: Source[] }

export type ThreadMessage = {
  id: string
  role: "user" | "assistant"
  parts: ThreadPart[]
  // The regenerated responses of an assistant message. index starts at 1.
  branch?: { index: number; count: number }
}

export type ChatThread01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<ChatThread01Labels>
  messages: ThreadMessage[]
  onRegenerate?: (id: string) => void
  onFeedback?: (id: string, feedback: Feedback | null) => void
  onBranchChange?: (id: string, index: number) => void
}

const answerOf = (message: ThreadMessage) =>
  message.parts
    .flatMap((part) => (part.type === "text" ? [part.text.replace(/\[\d+\]/g, "")] : []))
    .join("\n\n")

function Paragraphs({
  text,
  sources,
  lang,
}: {
  text: string
  sources: Source[]
  lang: Lang
}) {
  return text.split(/\n{2,}/).map((paragraph, index) => (
    <p key={index} dir="auto" className="leading-relaxed text-pretty rtl:leading-loose">
      {paragraph.split(/(\[\d+\])/).map((piece, at) => {
        const number = /^\[(\d+)\]$/.exec(piece)?.[1]
        const source = number ? sources[Number(number) - 1] : undefined
        return source ? (
          <SourceCitation
            key={at}
            index={Number(number)}
            source={source}
            labels={lang === "ar" ? sourcesLabelsAr : undefined}
          />
        ) : (
          piece
        )
      })}
    </p>
  ))
}

export function ChatThread01({
  lang = "en",
  labels,
  messages,
  onRegenerate,
  onFeedback,
  onBranchChange,
  id,
  className,
}: ChatThread01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const ar = lang === "ar"
  const [feedback, setFeedback] = React.useState<Record<string, Feedback | null>>({})
  const [branches, setBranches] = React.useState<Record<string, number>>({})

  return (
    <Container size="prose" dir={dir} id={id} className={cn("py-6 md:py-8", className)}>
      <MessageGroup role="log" aria-label={t.conversation} className="gap-8">
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <Message key={message.id} align="end">
                <MessageContent>
                  <MessageHeader className="sr-only">{t.you}</MessageHeader>
                  <Bubble variant="secondary">
                    <BubbleContent className="text-base leading-relaxed rtl:leading-loose">
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          <p key={index} dir="auto">
                            {part.text}
                          </p>
                        ) : null
                      )}
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            )
          }

          const sources = message.parts.flatMap((part) =>
            part.type === "sources" ? part.sources : []
          )
          return (
            <Message key={message.id}>
              <MessageContent className="gap-4">
                <MessageHeader className="sr-only">{t.assistant}</MessageHeader>
                {message.parts.map((part, index) => {
                  switch (part.type) {
                    case "reasoning":
                      return (
                        <Reasoning
                          key={index}
                          status={part.status}
                          duration={part.duration}
                          labels={ar ? reasoningLabelsAr : undefined}
                        >
                          {part.text}
                        </Reasoning>
                      )
                    case "tool":
                      return (
                        <ToolCall
                          key={index}
                          name={part.name}
                          state={part.state}
                          input={part.input}
                          output={part.output}
                          errorText={part.errorText}
                          labels={ar ? toolCallLabelsAr : undefined}
                        />
                      )
                    case "text":
                      return (
                        <Bubble key={index} variant="ghost">
                          <BubbleContent className="flex flex-col gap-3 text-base">
                            <Paragraphs text={part.text} sources={sources} lang={lang} />
                          </BubbleContent>
                        </Bubble>
                      )
                    case "list":
                      return (
                        <ul key={index} className="flex list-disc flex-col gap-1.5 ps-6 text-base leading-relaxed marker:text-muted-foreground rtl:leading-loose">
                          {part.items.map((item) => (
                            <li key={item} dir="auto">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )
                    case "code":
                      return (
                        <CodeBlock key={index} size="sm">
                          {part.title && (
                            <CodeBlockHeader>
                              <CodeBlockTitle dir="ltr">{part.title}</CodeBlockTitle>
                              <CodeBlockActions>
                                <CodeBlockCopyButton
                                  value={part.code}
                                  labels={ar ? codeBlockLabelsAr : undefined}
                                />
                              </CodeBlockActions>
                            </CodeBlockHeader>
                          )}
                          <CodeBlockContent>{part.code}</CodeBlockContent>
                        </CodeBlock>
                      )
                    case "sources":
                      return (
                        <Sources
                          key={index}
                          sources={part.sources}
                          labels={ar ? sourcesLabelsAr : undefined}
                        />
                      )
                  }
                })}
                <MessageFooter className="px-0">
                  <MessageActions
                    text={answerOf(message)}
                    labels={ar ? messageActionsLabelsAr : undefined}
                    feedback={feedback[message.id]}
                    onFeedback={(next) => {
                      setFeedback((current) => ({ ...current, [message.id]: next }))
                      onFeedback?.(message.id, next)
                    }}
                    onRegenerate={() => onRegenerate?.(message.id)}
                    branch={
                      message.branch && {
                        count: message.branch.count,
                        index: branches[message.id] ?? message.branch.index,
                      }
                    }
                    onBranchChange={(index) => {
                      setBranches((current) => ({ ...current, [message.id]: index }))
                      onBranchChange?.(message.id, index)
                    }}
                  />
                </MessageFooter>
              </MessageContent>
            </Message>
          )
        })}
      </MessageGroup>
    </Container>
  )
}

export default ChatThread01

const REPORT = {
  period: "last_7_days",
  compare: true,
  currency: "SAR",
}

const RESULT = {
  total: 48320,
  orders: 164,
  average_cart: 294.6,
  previous_total: 43150,
  change: 0.12,
}

const CSV = `product,units,revenue_sar
Royal Oud Perfume,64,22336
Cotton Thobe,41,11849
Arabic Coffee Dallah,33,6567`

const messagesEn: ThreadMessage[] = [
  {
    id: "m1",
    role: "user",
    parts: [{ type: "text", text: "Summarize this week's sales" }],
  },
  {
    id: "m2",
    role: "assistant",
    branch: { index: 1, count: 3 },
    parts: [
      {
        type: "reasoning",
        duration: 4,
        text: "I need the sales of the last 7 days, compared with the week before.\n\nI will pull the report from the store, then rank the products by revenue.",
      },
      { type: "tool", name: "get_sales_report", state: "done", input: REPORT, output: RESULT },
      {
        type: "text",
        text: "Last week's sales reached SAR 48,320 from 164 orders, up 12% on the week before [1]. The average cart was SAR 294.60.",
      },
      {
        type: "list",
        items: [
          "Royal Oud Perfume: 64 units, SAR 22,336",
          "Cotton Thobe, Saudi Cut: 41 units, SAR 11,849",
          "Arabic Coffee Dallah with 6 Cups: 33 units, SAR 6,567",
        ],
      },
      {
        type: "text",
        text: "The oud perfume grew the most after the weekend campaign, and most orders came from Riyadh and Jeddah [2]. Here is the summary as CSV, ready to export:",
      },
      { type: "code", title: "weekly-sales.csv", code: CSV },
      {
        type: "sources",
        sources: [
          {
            title: "Sales report, last 7 days",
            url: "https://mystore.example/admin/reports/sales",
            snippet: "Orders, revenue and average cart by day.",
          },
          {
            title: "Orders by city",
            url: "https://mystore.example/admin/reports/cities",
            snippet: "Riyadh and Jeddah lead the orders this week.",
          },
          { title: "Stock report", url: "https://mystore.example/admin/reports/stock" },
        ],
      },
    ],
  },
]

const messagesAr: ThreadMessage[] = [
  {
    id: "m1",
    role: "user",
    parts: [{ type: "text", text: "لخّص مبيعات الأسبوع" }],
  },
  {
    id: "m2",
    role: "assistant",
    branch: { index: 1, count: 3 },
    parts: [
      {
        type: "reasoning",
        duration: 4,
        text: "أحتاج مبيعات آخر 7 أيام ومقارنتها بالأسبوع السابق.\n\nسأجلب التقرير من المتجر ثم أرتّب المنتجات حسب الإيراد.",
      },
      { type: "tool", name: "get_sales_report", state: "done", input: REPORT, output: RESULT },
      {
        type: "text",
        text: "بلغت مبيعات الأسبوع الماضي 48,320 ر.س من 164 طلبًا، بزيادة 12% عن الأسبوع الذي قبله [1]. ومتوسط السلة 294.60 ر.س.",
      },
      {
        type: "list",
        items: [
          "عطر عود ملكي: 64 قطعة، 22,336 ر.س",
          "ثوب قطني قصّة سعودية: 41 قطعة، 11,849 ر.س",
          "دلّة قهوة عربية مع 6 فناجين: 33 قطعة، 6,567 ر.س",
        ],
      },
      {
        type: "text",
        text: "كان عطر العود الأكثر نموًا بعد حملة نهاية الأسبوع، وجاءت أغلب الطلبات من الرياض وجدة [2]. وهذا ملخص الأرقام بصيغة CSV جاهز للتصدير:",
      },
      { type: "code", title: "weekly-sales.csv", code: CSV },
      {
        type: "sources",
        sources: [
          {
            title: "تقرير المبيعات لآخر 7 أيام",
            url: "https://mystore.example/admin/reports/sales",
            snippet: "الطلبات والإيرادات ومتوسط السلة حسب اليوم.",
          },
          {
            title: "الطلبات حسب المدينة",
            url: "https://mystore.example/admin/reports/cities",
            snippet: "تتصدر الرياض وجدة الطلبات هذا الأسبوع.",
          },
          { title: "تقرير المخزون", url: "https://mystore.example/admin/reports/stock" },
        ],
      },
    ],
  },
]

export const demo: { en: ChatThread01Props; ar: ChatThread01Props } = {
  en: { lang: "en", labels: labelsEn, messages: messagesEn },
  ar: { lang: "ar", labels: labelsAr, messages: messagesAr },
}
