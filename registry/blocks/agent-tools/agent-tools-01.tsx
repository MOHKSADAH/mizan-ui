"use client"

import * as React from "react"
import {
  ArrowClockwiseIcon,
  CaretDownIcon,
  EyeIcon,
  LockKeyIcon,
  PencilSimpleIcon,
  WarningIcon,
} from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"
import { Switch } from "@/registry/ui/switch"

export type AgentTools01Labels = {
  title: string
  description: string
  enabled: (on: number, total: number) => string
  tools: Plural
  readOnly: string
  writes: string
  needsSignIn: string
  timedOut: string
  signIn: string
  retry: string
  toggle: (name: string) => string
}

const arPlural = (forms: Parameters<typeof plural>[1]): Plural => (n) => plural(n, forms, { lang: "ar" })

export const labelsEn: AgentTools01Labels = {
  title: "MCP servers",
  description: "The apps your agents can reach. Switch one off and no agent can call it.",
  enabled: (on, total) => `${on} of ${total} on`,
  tools: (n) => plural(n, { one: "{n} tool", other: "{n} tools" }, { lang: "en" }),
  readOnly: "Read-only",
  writes: "Writes",
  needsSignIn: "Needs sign-in",
  timedOut: "Timed out",
  signIn: "Sign in",
  retry: "Retry",
  toggle: (name) => `Turn ${name} on or off`,
}

export const labelsAr: AgentTools01Labels = {
  title: "خوادم MCP",
  description: "التطبيقات التي يصل إليها وكلاؤك. أطفئ أحدها فلا يستطيع أي وكيل استدعاءه.",
  enabled: (on, total) => `${on} من ${total} مفعّلة`,
  tools: arPlural({ one: "أداة واحدة", two: "أداتان", few: "{n} أدوات", many: "{n} أداة", other: "{n} أداة" }),
  readOnly: "قراءة فقط",
  writes: "تكتب",
  needsSignIn: "يحتاج تسجيل دخول",
  timedOut: "انتهت المهلة",
  signIn: "تسجيل الدخول",
  retry: "أعد المحاولة",
  toggle: (name) => `تشغيل ${name} أو إيقافه`,
}

export type McpTool = { id: string; name: string; access: "read" | "write" }

export type McpServer = {
  id: string
  name: string
  description: string
  state: "connected" | "needs-sign-in" | "timed-out"
  enabled: boolean
  tools: McpTool[]
}

export type AgentTools01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<AgentTools01Labels>
  servers: McpServer[]
  onSignIn?: (id: string) => void
  onRetry?: (id: string) => void
}

// A server that is not connected cannot be switched on, so its switch is off and disabled until it connects.
export function AgentTools01({
  lang = "en",
  labels,
  servers,
  onSignIn,
  onRetry,
  id,
  headingLevel = 2,
  className,
}: AgentTools01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [enabled, setEnabled] = React.useState(() => new Set(servers.filter((s) => s.enabled).map((s) => s.id)))
  const [open, setOpen] = React.useState<Set<string>>(() => new Set([servers.find((s) => s.tools.length)?.id ?? ""]))
  const toggle = (set: Set<string>, key: string) => {
    const next = new Set(set)
    if (!next.delete(key)) next.add(key)
    return next
  }

  return (
    <Section as="div" spacing="compact" className={className}>
      <Container dir={dir} className="max-w-2xl">
        <Card className="gap-0 pb-0">
          <CardHeader className="pb-4">
            <CardTitle>
              <Heading className="text-base leading-snug font-medium">{t.title}</Heading>
            </CardTitle>
            <CardDescription>{t.description}</CardDescription>
            <p className="text-xs text-muted-foreground">
              <bdi>{t.enabled(enabled.size, servers.length)}</bdi>
            </p>
          </CardHeader>
          <CardContent className="px-0">
            <ul className="divide-y border-t">
              {servers.map((server) => {
                const connected = server.state === "connected"
                const expanded = open.has(server.id) && server.tools.length > 0
                return (
                  <li key={server.id}>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`${sid}-${server.id}`}
                        disabled={!server.tools.length}
                        onClick={() => setOpen((set) => toggle(set, server.id))}
                        className="flex min-w-0 flex-1 items-center gap-3 rounded-md text-start outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-default"
                      >
                        <span
                          aria-hidden="true"
                          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium"
                        >
                          {[...server.name][0]}
                        </span>
                        <span className="grid min-w-0 flex-1 text-sm">
                          <span className="flex flex-wrap items-center gap-x-2">
                            <bdi className="font-medium">{server.name}</bdi>
                            {server.tools.length > 0 && (
                              <span className="text-xs text-muted-foreground">
                                <bdi>{t.tools(server.tools.length)}</bdi>
                              </span>
                            )}
                            {server.state === "needs-sign-in" && (
                              <Badge variant="outline">
                                <LockKeyIcon weight="bold" />
                                {t.needsSignIn}
                              </Badge>
                            )}
                            {server.state === "timed-out" && (
                              <Badge variant="destructive">
                                <WarningIcon weight="bold" />
                                {t.timedOut}
                              </Badge>
                            )}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">{server.description}</span>
                        </span>
                        {server.tools.length > 0 && (
                          <CaretDownIcon
                            aria-hidden="true"
                            className={cn("size-4 shrink-0 text-muted-foreground", expanded && "rotate-180")}
                          />
                        )}
                      </button>
                      {server.state === "needs-sign-in" && (
                        <Button variant="outline" size="sm" onClick={() => onSignIn?.(server.id)}>
                          {t.signIn}
                        </Button>
                      )}
                      {server.state === "timed-out" && (
                        <Button variant="outline" size="sm" onClick={() => onRetry?.(server.id)}>
                          <ArrowClockwiseIcon weight="bold" data-icon="inline-start" />
                          {t.retry}
                        </Button>
                      )}
                      <Switch
                        size="sm"
                        checked={connected && enabled.has(server.id)}
                        disabled={!connected}
                        onCheckedChange={() => setEnabled((set) => toggle(set, server.id))}
                        aria-label={t.toggle(server.name)}
                      />
                    </div>
                    {expanded && (
                      <ul id={`${sid}-${server.id}`} className="grid border-t bg-muted/40 py-1 sm:grid-cols-2">
                        {server.tools.map((tool) => (
                          <li key={tool.id} className="flex items-center justify-between gap-2 px-4 py-2">
                            <bdi className="truncate font-mono text-xs">{tool.name}</bdi>
                            <Badge variant={tool.access === "write" ? "secondary" : "outline"}>
                              {tool.access === "write" ? (
                                <PencilSimpleIcon weight="bold" />
                              ) : (
                                <EyeIcon weight="bold" />
                              )}
                              {tool.access === "write" ? t.writes : t.readOnly}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export default AgentTools01

const read = (id: string, name: string): McpTool => ({ id, name, access: "read" })
const write = (id: string, name: string): McpTool => ({ id, name, access: "write" })

export const demo: { en: AgentTools01Props; ar: AgentTools01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    servers: [
      {
        id: "zid",
        name: "Zid",
        description: "Orders, products and customers of the store",
        state: "connected",
        enabled: true,
        tools: [
          read("list_orders", "list_orders"),
          read("get_order", "get_order"),
          read("list_products", "list_products"),
          write("update_order_status", "update_order_status"),
          write("adjust_stock", "adjust_stock"),
        ],
      },
      {
        id: "fatoora",
        name: "ZATCA Fatoora",
        description: "E-invoices and clearance",
        state: "connected",
        enabled: true,
        tools: [
          read("validate_invoice", "validate_invoice"),
          write("create_invoice", "create_invoice"),
          write("submit_invoice", "submit_invoice"),
        ],
      },
      {
        id: "whatsapp",
        name: "WhatsApp Business",
        description: "Customer and supplier messages",
        state: "connected",
        enabled: false,
        tools: [read("list_templates", "list_templates"), write("send_message", "send_message")],
      },
      {
        id: "qoyod",
        name: "Qoyod",
        description: "Accounting ledger",
        state: "needs-sign-in",
        enabled: false,
        tools: [],
      },
      {
        id: "sheets",
        name: "Google Sheets",
        description: "Reorder and price sheets",
        state: "timed-out",
        enabled: false,
        tools: [],
      },
    ],
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    servers: [
      {
        id: "zid",
        name: "Zid",
        description: "طلبات المتجر ومنتجاته وعملاؤه",
        state: "connected",
        enabled: true,
        tools: [
          read("list_orders", "list_orders"),
          read("get_order", "get_order"),
          read("list_products", "list_products"),
          write("update_order_status", "update_order_status"),
          write("adjust_stock", "adjust_stock"),
        ],
      },
      {
        id: "fatoora",
        name: "ZATCA Fatoora",
        description: "الفواتير الإلكترونية والإبلاغ",
        state: "connected",
        enabled: true,
        tools: [
          read("validate_invoice", "validate_invoice"),
          write("create_invoice", "create_invoice"),
          write("submit_invoice", "submit_invoice"),
        ],
      },
      {
        id: "whatsapp",
        name: "WhatsApp Business",
        description: "رسائل العملاء والموردين",
        state: "connected",
        enabled: false,
        tools: [read("list_templates", "list_templates"), write("send_message", "send_message")],
      },
      {
        id: "qoyod",
        name: "Qoyod",
        description: "دفتر الأستاذ والمحاسبة",
        state: "needs-sign-in",
        enabled: false,
        tools: [],
      },
      {
        id: "sheets",
        name: "Google Sheets",
        description: "جداول إعادة الطلب والأسعار",
        state: "timed-out",
        enabled: false,
        tools: [],
      },
    ],
  },
}
