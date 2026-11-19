"use client"

import * as React from "react"
import {
  CoinsIcon,
  GearIcon,
  PlayCircleIcon,
  PlugsConnectedIcon,
  SignOutIcon,
  SquaresFourIcon,
  UserIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react"

import { AgentCost01, demo as costDemo } from "@/registry/blocks/agent-cost/agent-cost-01"
import { AgentMap01, demo as mapDemo } from "@/registry/blocks/agent-map/agent-map-01"
import { AgentPlan01, demo as planDemo } from "@/registry/blocks/agent-plan/agent-plan-01"
import { AgentRoster01, demo as rosterDemo } from "@/registry/blocks/agent-roster/agent-roster-01"
import { AgentRuns01, demo as runsDemo } from "@/registry/blocks/agent-runs/agent-runs-01"
import { AgentSpend01, demo as spendDemo } from "@/registry/blocks/agent-spend/agent-spend-01"
import { AgentTools01, demo as toolsDemo } from "@/registry/blocks/agent-tools/agent-tools-01"
import { AgentTrace01, demo as traceDemo } from "@/registry/blocks/agent-trace/agent-trace-01"
import { AppShell01, labelsAr as shellAr, labelsEn as shellEn, type AppShell01Props } from "@/registry/blocks/app-shell/app-shell-01"
import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"

type AgentsDashboardPage01Props = {
  shell: Omit<AppShell01Props, "children">
  title: string
  description: string
  runs: React.ComponentProps<typeof AgentRuns01>
  plan: React.ComponentProps<typeof AgentPlan01>
  map: React.ComponentProps<typeof AgentMap01>
  roster: React.ComponentProps<typeof AgentRoster01>
  spend: React.ComponentProps<typeof AgentSpend01>
  trace: React.ComponentProps<typeof AgentTrace01>
  tools: React.ComponentProps<typeof AgentTools01>
  cost: React.ComponentProps<typeof AgentCost01>
}

// Each section brings its own Section and Container. Inside the dashboard grid they give up their padding and width.
function Cell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "min-w-0 [&_[data-slot=container]]:max-w-none [&_[data-slot=container]]:px-0 [&_[data-slot=section]]:py-0",
        className
      )}
    >
      {children}
    </div>
  )
}

// Layout rhythm: a live list beside the running plan, the agent map at full width, roster beside spend, the trace at full width, tools beside the estimate.
function AgentsDashboardPage01({ shell, title, description, className, ...sections }: AgentsDashboardPage01Props & { className?: string }) {
  const dir = shell.lang === "ar" ? "rtl" : "ltr"
  return (
    <div className="bg-background text-foreground">
      <AppShell01 {...shell} className={cn("h-svh rounded-none border-0", className)}>
        <main dir={dir} className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-balance">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="grid items-start gap-6 xl:grid-cols-12">
            <Cell className="xl:col-span-7">
              <AgentRuns01 {...sections.runs} />
            </Cell>
            <Cell className="xl:col-span-5">
              <AgentPlan01 {...sections.plan} />
            </Cell>
          </div>
          <Cell>
            <AgentMap01 {...sections.map} />
          </Cell>
          <div className="grid items-start gap-6 xl:grid-cols-12">
            <Cell className="xl:col-span-7">
              <AgentRoster01 {...sections.roster} />
            </Cell>
            <Cell className="xl:col-span-5">
              <AgentSpend01 {...sections.spend} />
            </Cell>
          </div>
          <Cell>
            <AgentTrace01 {...sections.trace} />
          </Cell>
          <div className="grid items-start gap-6 xl:grid-cols-12">
            <Cell className="xl:col-span-7">
              <AgentTools01 {...sections.tools} />
            </Cell>
            <Cell className="xl:col-span-5">
              <AgentCost01 {...sections.cost} />
            </Cell>
          </div>
        </main>
      </AppShell01>
    </div>
  )
}

const shellCopy = {
  ar: {
    lang: "ar",
    labels: shellAr,
    brand: { name: "وكلاء النخبة", plan: "مؤسسة النخبة للتوريدات" },
    nav: [
      {
        label: "الوكلاء",
        items: [
          { id: "overview", label: "نظرة عامة", href: "#overview", icon: SquaresFourIcon },
          { id: "runs", label: "التشغيلات", href: "#runs", icon: PlayCircleIcon, badge: "6" },
          { id: "roster", label: "الفريق", href: "#roster", icon: UsersThreeIcon },
          { id: "tools", label: "الأدوات", href: "#tools", icon: PlugsConnectedIcon },
        ],
      },
      {
        label: "الحساب",
        items: [
          { id: "spend", label: "الإنفاق والرصيد", href: "#spend", icon: CoinsIcon },
          { id: "settings", label: "الإعدادات", href: "#settings", icon: GearIcon },
        ],
      },
    ],
    activeId: "overview",
    user: {
      name: "فهد القحطاني",
      email: "fahad@alnokhba.sa",
      menu: [
        { label: "الملف الشخصي", href: "#profile", icon: UserIcon },
        { label: "الإعدادات", href: "#settings", icon: GearIcon },
        { label: "تسجيل الخروج", icon: SignOutIcon, destructive: true },
      ],
    },
    breadcrumbs: [{ label: "الوكلاء", href: "#overview" }, { label: "نظرة عامة" }],
  },
  en: {
    lang: "en",
    labels: shellEn,
    brand: { name: "Al-Nokhba Agents", plan: "Al-Nokhba Supplies" },
    nav: [
      {
        label: "Agents",
        items: [
          { id: "overview", label: "Overview", href: "#overview", icon: SquaresFourIcon },
          { id: "runs", label: "Runs", href: "#runs", icon: PlayCircleIcon, badge: "6" },
          { id: "roster", label: "Team", href: "#roster", icon: UsersThreeIcon },
          { id: "tools", label: "Tools", href: "#tools", icon: PlugsConnectedIcon },
        ],
      },
      {
        label: "Account",
        items: [
          { id: "spend", label: "Spend and credits", href: "#spend", icon: CoinsIcon },
          { id: "settings", label: "Settings", href: "#settings", icon: GearIcon },
        ],
      },
    ],
    activeId: "overview",
    user: {
      name: "Fahad Al-Qahtani",
      email: "fahad@alnokhba.sa",
      menu: [
        { label: "Profile", href: "#profile", icon: UserIcon },
        { label: "Settings", href: "#settings", icon: GearIcon },
        { label: "Sign out", icon: SignOutIcon, destructive: true },
      ],
    },
    breadcrumbs: [{ label: "Agents", href: "#overview" }, { label: "Overview" }],
  },
} satisfies Record<Lang, Omit<AppShell01Props, "children">>

const pageCopy = {
  ar: {
    title: "وكلاؤك اليوم",
    description: "6 تشغيلات، 2 منها تحتاج إليك. أُنفق 16.30 دولارًا من ميزانية اليوم.",
  },
  en: {
    title: "Your agents today",
    description: "6 runs, 2 of them need you. $16.30 spent of today's budget.",
  },
}

// Arabic is written first. The sections share one company and one day, so each takes its sample data from its own demo.
const demo: { en: AgentsDashboardPage01Props; ar: AgentsDashboardPage01Props } = {
  ar: {
    shell: shellCopy.ar,
    ...pageCopy.ar,
    runs: runsDemo.ar,
    plan: planDemo.ar,
    map: mapDemo.ar,
    roster: rosterDemo.ar,
    spend: spendDemo.ar,
    trace: traceDemo.ar,
    tools: toolsDemo.ar,
    cost: costDemo.ar,
  },
  en: {
    shell: shellCopy.en,
    ...pageCopy.en,
    runs: runsDemo.en,
    plan: planDemo.en,
    map: mapDemo.en,
    roster: rosterDemo.en,
    spend: spendDemo.en,
    trace: traceDemo.en,
    tools: toolsDemo.en,
    cost: costDemo.en,
  },
}

export { AgentsDashboardPage01, demo }
export type { AgentsDashboardPage01Props }
export default AgentsDashboardPage01
