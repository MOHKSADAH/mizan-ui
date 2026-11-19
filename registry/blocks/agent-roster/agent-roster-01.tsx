import * as React from "react"

import type { BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { RunStatus, runStatusLabelsAr, type RunState } from "@/registry/ui/run-status"
import { Section } from "@/registry/ui/section"

export type AgentRoster01Labels = {
  title: string
  description: string
  agents: Plural
  noTask: string
  totalToday: string
}

const arPlural = (forms: Parameters<typeof plural>[1]): Plural => (n) => plural(n, forms, { lang: "ar" })

export const labelsEn: AgentRoster01Labels = {
  title: "Agent roster",
  description: "Your team of agents, what each one is doing and what it cost today.",
  agents: (n) => plural(n, { one: "{n} agent", other: "{n} agents" }, { lang: "en" }),
  noTask: "No task right now",
  totalToday: "Spent today",
}

export const labelsAr: AgentRoster01Labels = {
  title: "فريق الوكلاء",
  description: "وكلاؤك، وما يعمل عليه كل واحد منهم وكم كلّف اليوم.",
  agents: arPlural({ one: "وكيل واحد", two: "وكيلان", few: "{n} وكلاء", many: "{n} وكيلًا", other: "{n} وكيل" }),
  noTask: "لا توجد مهمة الآن",
  totalToday: "المصروف اليوم",
}

export type RosterAgent = {
  id: string
  name: string
  role: string
  // Model names stay Latin.
  model: string
  task?: string
  state: RunState
  // In US dollars, spent today.
  cost: number
}

export type AgentRoster01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<AgentRoster01Labels>
  agents: RosterAgent[]
}

export function AgentRoster01({ lang = "en", labels, agents, id, headingLevel = 2, className }: AgentRoster01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const total = agents.reduce((sum, agent) => sum + agent.cost, 0)

  return (
    <Section as="div" spacing="compact" id={id} className={className}>
      <Container dir={dir} className="max-w-3xl">
        <Card className="gap-0 pb-0">
          <CardHeader className="pb-4">
            <CardTitle>
              <Heading className="text-base leading-snug font-medium">{t.title}</Heading>
            </CardTitle>
            <CardDescription>{t.description}</CardDescription>
            <CardAction className="text-xs text-muted-foreground">
              <bdi>{t.agents(agents.length)}</bdi>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            <ul className="divide-y border-t">
              {agents.map((agent) => (
                <li
                  key={agent.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_7.5rem_4.5rem]"
                >
                  <div className="grid min-w-0 text-sm">
                    <span className="truncate font-medium">{agent.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{agent.role}</span>
                  </div>
                  <span className="text-end text-sm font-medium sm:order-last">
                    <Price amount={agent.cost} currency="USD" lang={lang} decimals />
                  </span>
                  <div className="col-span-2 grid min-w-0 text-sm sm:col-span-1 sm:col-start-2 sm:row-start-1">
                    <p className="line-clamp-2 text-muted-foreground">{agent.task ?? t.noTask}</p>
                    <bdi className="truncate text-xs text-muted-foreground">{agent.model}</bdi>
                  </div>
                  <div className="col-span-2 sm:col-span-1 sm:col-start-3 sm:row-start-1">
                    <RunStatus state={agent.state} labels={lang === "ar" ? runStatusLabelsAr : undefined} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="justify-between text-sm">
            <span className="text-muted-foreground">{t.totalToday}</span>
            <span className="text-base font-semibold">
              <Price amount={total} currency="USD" lang={lang} decimals />
            </span>
          </CardFooter>
        </Card>
      </Container>
    </Section>
  )
}

export default AgentRoster01

export const demo: { en: AgentRoster01Props; ar: AgentRoster01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    agents: [
      { id: "lead", name: "Back-office lead", role: "Orchestrator", model: "Claude Opus", task: "Close the October books", state: "idle", cost: 3.1 },
      { id: "invoices", name: "Invoice agent", role: "E-invoicing", model: "Claude Sonnet", task: "Create 38 invoices for the Riyadh supplier", state: "done", cost: 6.6 },
      { id: "support", name: "Support agent", role: "Zid store tickets", model: "Claude Haiku", task: "12 tickets answered, 3 refund replies to check", state: "needs-you", cost: 4.2 },
      { id: "stock", name: "Stock agent", role: "Inventory", model: "Claude Sonnet", state: "idle", cost: 1.8 },
      { id: "supplier", name: "Supplier agent", role: "Supplier messages", model: "Claude Haiku", task: "Supplier statement sent on WhatsApp", state: "done", cost: 0.6 },
    ],
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    agents: [
      { id: "lead", name: "مسؤول المكتب الخلفي", role: "منسّق", model: "Claude Opus", task: "إقفال حسابات أكتوبر", state: "idle", cost: 3.1 },
      { id: "invoices", name: "وكيل الفواتير", role: "الفوترة الإلكترونية", model: "Claude Sonnet", task: "إنشاء 38 فاتورة لمورّد الرياض", state: "done", cost: 6.6 },
      { id: "support", name: "وكيل الدعم", role: "تذاكر متجر زد", model: "Claude Haiku", task: "أُجيب عن 12 تذكرة، و3 ردود استرجاع تنتظر مراجعتك", state: "needs-you", cost: 4.2 },
      { id: "stock", name: "وكيل المخزون", role: "المخزون", model: "Claude Sonnet", state: "idle", cost: 1.8 },
      { id: "supplier", name: "وكيل الموردين", role: "رسائل الموردين", model: "Claude Haiku", task: "أُرسل كشف حساب المورّد عبر واتساب", state: "done", cost: 0.6 },
    ],
  },
}
