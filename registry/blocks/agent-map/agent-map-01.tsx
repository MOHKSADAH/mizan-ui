import * as React from "react"
import { RobotIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { RunStatus, runStatusLabelsAr, type RunState } from "@/registry/ui/run-status"
import { Section } from "@/registry/ui/section"

export type AgentMap01Labels = {
  title: string
  description: string
  orchestrator: string
  agents: string
  tools: string
  needsReview: string
  review: string
}

export const labelsEn: AgentMap01Labels = {
  title: "Agent map",
  description: "Who is working on what, and which apps each agent uses.",
  orchestrator: "Orchestrator",
  agents: "Sub-agents",
  tools: "Tools",
  needsReview: "Waiting for your review",
  review: "Review",
}

export const labelsAr: AgentMap01Labels = {
  title: "خريطة الوكلاء",
  description: "من يعمل على ماذا، وأي تطبيقات يستخدمها كل وكيل.",
  orchestrator: "المنسّق",
  agents: "الوكلاء الفرعيون",
  tools: "الأدوات",
  needsReview: "بانتظار مراجعتك",
  review: "راجع",
}

export type MapAgent = {
  id: string
  name: string
  task: string
  // Model names stay Latin.
  model: string
  state: RunState
  // Ids of the tools this agent calls.
  tools: string[]
  review?: { href: string }
}

export type AgentMap01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<AgentMap01Labels>
  orchestrator: { name: string; task: string; model: string; state: RunState }
  agents: MapAgent[]
  tools: { id: string; name: string }[]
}

// Height of one row of nodes. The columns share one height, so the lines are drawn in percent of it and need no measuring.
const ROW = 120

const lineTone: Partial<Record<RunState, string>> = {
  running: "text-info",
  "needs-you": "text-warning",
}

const centerOf = (index: number, count: number) => ((index + 0.5) / count) * 100

// Both lines are one SVG each. They flip with `rtl:-scale-x-100`, so the orchestrator stays on the start side.
function Connectors({ links }: { links: { from: number; to: number; tone?: string }[] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full overflow-visible rtl:-scale-x-100">
      {links.map((link, index) => (
        <path
          key={index}
          d={`M0 ${link.from} C50 ${link.from} 50 ${link.to} 100 ${link.to}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          className={cn(link.tone ?? "text-border")}
        />
      ))}
    </svg>
  )
}

function Slot({ children }: { children: React.ReactNode }) {
  return <li className="flex flex-1 items-center">{children}</li>
}

function NodeBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("w-full min-w-0 rounded-lg border bg-card p-3 text-start text-sm", className)}>{children}</div>
}

// An orchestrator on the start side, sub-agents in the middle and tools on the end side. One agent can wait for a review.
export function AgentMap01({
  lang = "en",
  labels,
  orchestrator,
  agents,
  tools,
  id,
  headingLevel = 2,
  className,
}: AgentMap01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const statusLabels = lang === "ar" ? runStatusLabelsAr : undefined
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const rows = Math.max(agents.length, tools.length)
  const toolIndex = new Map(tools.map((tool, index) => [tool.id, index]))
  const columns = "grid grid-cols-[minmax(11rem,1fr)_3.5rem_minmax(14rem,1.3fr)_3.5rem_minmax(9rem,0.8fr)]"

  const fan = agents.map((agent, index) => ({ from: 50, to: centerOf(index, agents.length), tone: lineTone[agent.state] }))
  const calls = agents.flatMap((agent, index) =>
    agent.tools.flatMap((toolId) => {
      const target = toolIndex.get(toolId)
      return target === undefined
        ? []
        : [{ from: centerOf(index, agents.length), to: centerOf(target, tools.length), tone: lineTone[agent.state] }]
    })
  )

  return (
    <Section as="div" spacing="compact" id={id} className={className}>
      <Container dir={dir} size="narrow">
        <Card>
          <CardHeader>
            <CardTitle>
              <Heading className="text-base leading-snug font-medium">{t.title}</Heading>
            </CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[44rem]">
              <div className={cn(columns, "pb-2 text-xs text-muted-foreground")}>
                <span>{t.orchestrator}</span>
                <span />
                <span>{t.agents}</span>
                <span />
                <span>{t.tools}</span>
              </div>
              <div className={columns} style={{ height: rows * ROW }}>
                <ul className="flex flex-col">
                  <Slot>
                    <NodeBox className="flex flex-col gap-2 border-primary/40">
                      <span className="flex items-center gap-2 font-medium">
                        <span
                          aria-hidden="true"
                          className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground"
                        >
                          <RobotIcon weight="bold" className="size-4" />
                        </span>
                        {orchestrator.name}
                      </span>
                      <span className="line-clamp-2 text-xs text-muted-foreground">{orchestrator.task}</span>
                      <span className="flex items-center justify-between gap-2">
                        <bdi className="text-xs text-muted-foreground">{orchestrator.model}</bdi>
                        <RunStatus state={orchestrator.state} labels={statusLabels} />
                      </span>
                    </NodeBox>
                  </Slot>
                </ul>
                <Connectors links={fan} />
                <ul className="flex flex-col">
                  {agents.map((agent) => (
                    <Slot key={agent.id}>
                      <NodeBox className={cn("flex flex-col gap-2", agent.state === "needs-you" && "border-warning ring-2 ring-warning/30")}>
                        <span className="flex items-start justify-between gap-2">
                          <span className="font-medium">{agent.name}</span>
                          <RunStatus state={agent.state} labels={statusLabels} />
                        </span>
                        <span className="line-clamp-2 text-xs text-muted-foreground">{agent.task}</span>
                        {agent.state === "needs-you" && agent.review ? (
                          <span className="flex items-center justify-between gap-2 border-t pt-2">
                            <span className="text-xs font-medium">{t.needsReview}</span>
                            <Button size="xs" nativeButton={false} render={<a href={agent.review.href} />}>
                              {t.review}
                            </Button>
                          </span>
                        ) : (
                          <bdi className="text-xs text-muted-foreground">{agent.model}</bdi>
                        )}
                      </NodeBox>
                    </Slot>
                  ))}
                </ul>
                <Connectors links={calls} />
                <ul className="flex flex-col">
                  {tools.map((tool) => (
                    <Slot key={tool.id}>
                      <NodeBox className="flex items-center gap-2 p-2">
                        <span
                          aria-hidden="true"
                          className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-muted text-[10px] font-medium"
                        >
                          {[...tool.name][0]}
                        </span>
                        <bdi className="truncate text-xs">{tool.name}</bdi>
                      </NodeBox>
                    </Slot>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export default AgentMap01

export const demo: { en: AgentMap01Props; ar: AgentMap01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    orchestrator: {
      name: "Back-office lead",
      task: "Close the October books for Al-Nokhba Supplies",
      model: "Claude Opus",
      state: "running",
    },
    agents: [
      {
        id: "invoices",
        name: "Invoice agent",
        task: "Creating 38 e-invoices from Zid purchase orders",
        model: "Claude Sonnet",
        state: "running",
        tools: ["zid", "zatca"],
      },
      {
        id: "support",
        name: "Support agent",
        task: "Answering 12 open Zid store tickets",
        model: "Claude Haiku",
        state: "running",
        tools: ["zid", "whatsapp"],
      },
      {
        id: "stock",
        name: "Stock agent",
        task: "Reorder list for 6 low-stock items is ready",
        model: "Claude Sonnet",
        state: "needs-you",
        tools: ["zid", "sheets"],
        review: { href: "#review-stock" },
      },
      {
        id: "supplier",
        name: "Supplier agent",
        task: "Sent the invoice copies to the supplier",
        model: "Claude Haiku",
        state: "done",
        tools: ["whatsapp"],
      },
    ],
    tools: [
      { id: "zid", name: "Zid" },
      { id: "zatca", name: "ZATCA Fatoora" },
      { id: "whatsapp", name: "WhatsApp" },
      { id: "sheets", name: "Google Sheets" },
    ],
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    orchestrator: {
      name: "مسؤول المكتب الخلفي",
      task: "إقفال حسابات أكتوبر لمؤسسة النخبة للتوريدات",
      model: "Claude Opus",
      state: "running",
    },
    agents: [
      {
        id: "invoices",
        name: "وكيل الفواتير",
        task: "إنشاء 38 فاتورة إلكترونية من أوامر الشراء في زد",
        model: "Claude Sonnet",
        state: "running",
        tools: ["zid", "zatca"],
      },
      {
        id: "support",
        name: "وكيل الدعم",
        task: "الرد على 12 تذكرة مفتوحة في متجر زد",
        model: "Claude Haiku",
        state: "running",
        tools: ["zid", "whatsapp"],
      },
      {
        id: "stock",
        name: "وكيل المخزون",
        task: "قائمة إعادة الطلب جاهزة لـ6 أصناف منخفضة المخزون",
        model: "Claude Sonnet",
        state: "needs-you",
        tools: ["zid", "sheets"],
        review: { href: "#review-stock" },
      },
      {
        id: "supplier",
        name: "وكيل الموردين",
        task: "أرسل نسخ الفواتير إلى المورّد",
        model: "Claude Haiku",
        state: "done",
        tools: ["whatsapp"],
      },
    ],
    tools: [
      { id: "zid", name: "Zid" },
      { id: "zatca", name: "ZATCA Fatoora" },
      { id: "whatsapp", name: "WhatsApp" },
      { id: "sheets", name: "Google Sheets" },
    ],
  },
}
