"use client"

import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatDate, formatNumber } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Field, FieldError, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Section } from "@/registry/ui/section"

type Issue = {
  number: number
  title: string
  // ISO date, formatted with the lang prop.
  date: string
  href?: string
}

type Newsletter01Labels = {
  email: string
  submit: string
  submitting: string
  consent: string
  policy: string
  readers: string
  latestIssues: string
  issue: string
  required: string
  invalidEmail: string
  success: string
  failure: string
}

type Newsletter01Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  // Write the key words in <strong>: the heading is regular weight, so the contrast is real.
  title: React.ReactNode
  description?: string
  readers?: number
  issues: Issue[]
  policyHref: string
  onSubscribe?: (email: string) => void | Promise<void>
  labels?: Partial<Newsletter01Labels>
}

const labelsEn: Newsletter01Labels = {
  email: "Email address",
  submit: "Subscribe",
  submitting: "Subscribing",
  consent: "By subscribing you agree to our",
  policy: "privacy policy",
  readers: "readers get it every Thursday",
  latestIssues: "Latest issues",
  issue: "Issue",
  required: "Enter your email address.",
  invalidEmail: "Enter a valid email address.",
  success: "Done. Check your inbox to confirm your subscription.",
  failure: "Something went wrong. Try again in a moment.",
}

const labelsAr: Newsletter01Labels = {
  email: "البريد الإلكتروني",
  submit: "اشترك",
  submitting: "جارٍ الاشتراك",
  consent: "باشتراكك فأنت توافق على",
  policy: "سياسة الخصوصية",
  readers: "قارئ تصلهم النشرة كل خميس",
  latestIssues: "آخر الأعداد",
  issue: "العدد",
  required: "أدخل بريدك الإلكتروني.",
  invalidEmail: "أدخل بريدًا إلكترونيًا صحيحًا.",
  success: "تم الاشتراك. افتح بريدك وأكّد الاشتراك.",
  failure: "تعذّر الاشتراك. حاول مرة أخرى بعد قليل.",
}

type Status = "idle" | "sending" | "success" | "failure"

function Newsletter01({
  lang = "en",
  eyebrow,
  title,
  description,
  readers,
  issues,
  policyHref,
  onSubscribe,
  headingLevel = 2,
  labels,
  id,
  className,
}: Newsletter01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [error, setError] = React.useState<string>()
  const [status, setStatus] = React.useState<Status>("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = String(new FormData(form).get("email") ?? "").trim()
    const problem = !email ? t.required : !/^\S+@\S+\.\S+$/.test(email) ? t.invalidEmail : undefined
    setError(problem)
    if (problem) {
      form.querySelector<HTMLElement>('[name="email"]')?.focus()
      return
    }
    setStatus("sending")
    try {
      await onSubscribe?.(email)
      setStatus("success")
      form.reset()
    } catch {
      setStatus("failure")
    }
  }

  const [lead, ...rest] = issues
  const row = (issue: Issue, isLead: boolean) => (
    <li key={issue.number} className="border-t first:border-t-0">
      <a
        href={issue.href ?? "#"}
        className="group flex items-start gap-4 py-6 md:gap-6"
      >
        <span className="w-14 shrink-0 text-sm text-muted-foreground tabular-nums md:w-16">
          <span className="sr-only">{t.issue} </span>
          <bdi>{`#${issue.number}`}</bdi>
        </span>
        <span className="flex min-w-0 flex-col gap-2">
          <span
            className={
              isLead
                ? "text-2xl font-semibold text-balance group-hover:underline md:text-3xl"
                : "text-lg font-medium text-balance group-hover:underline md:text-xl"
            }
          >
            {issue.title}
          </span>
          <time dateTime={issue.date} className="text-sm text-muted-foreground">
            {formatDate(new Date(issue.date), { lang }, { dateStyle: "long" })}
          </time>
        </span>
      </a>
    </li>
  )

  return (
    <Section id={sid} className={className}>
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:col-span-5">
          {eyebrow ? (
            <Badge variant="secondary" className="h-7 px-3 text-sm">
              {eyebrow}
            </Badge>
          ) : null}
          <Heading id={`${sid}-heading`} className="text-4xl font-normal text-balance md:text-5xl">
            {title}
          </Heading>
          {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
          {status === "success" ? (
            <p role="status" className="rounded-lg bg-muted px-4 py-3 text-base">
              {t.success}
            </p>
          ) : (
            <form noValidate onSubmit={handleSubmit} aria-busy={status === "sending"} className="flex w-full flex-col gap-3">
              <Field>
                <FieldLabel htmlFor={`${sid}-email`} className="sr-only">
                  {t.email}
                </FieldLabel>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    id={`${sid}-email`}
                    name="email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    placeholder="name@example.com"
                    required
                    aria-required="true"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${sid}-email-error` : undefined}
                    className="h-12 text-start"
                  />
                  <Button type="submit" size="lg" disabled={status === "sending"} className="h-12 px-6 text-base">
                    {status === "sending" ? t.submitting : t.submit}
                  </Button>
                </div>
                {error ? <FieldError id={`${sid}-email-error`}>{error}</FieldError> : null}
              </Field>
              <p role="status" className="text-sm text-destructive">
                {status === "failure" ? t.failure : null}
              </p>
            </form>
          )}
          <p className="text-sm text-muted-foreground">
            {t.consent}{" "}
            <a href={policyHref} className="underline underline-offset-4 hover:text-foreground">
              {t.policy}
            </a>
            .
          </p>
          {readers ? (
            <p className="text-sm font-medium">
              <bdi className="tabular-nums">{formatNumber(readers, { lang })}</bdi> {t.readers}
            </p>
          ) : null}
        </div>
        <div className="lg:col-span-7">
          <p className="mb-2 border-b pb-4 text-sm font-semibold">{t.latestIssues}</p>
          <ol className="flex flex-col">
            {lead ? row(lead, true) : null}
            {rest.map((issue) => row(issue, false))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Newsletter01Props; ar: Newsletter01Props } = {
  en: {
    lang: "en",
    eyebrow: "Weekly newsletter",
    title: (
      <>
        <strong>Thursday letter,</strong> Gulf commerce in five minutes
      </>
    ),
    description: "Numbers, stories and merchant questions, in your inbox every Thursday morning. No ads, and you can leave any time.",
    readers: 12400,
    issues: [
      { number: 128, title: "What does a store lose when shipping runs two days late?", date: "2026-11-12", href: "#issue-128" },
      { number: 127, title: "Cash on delivery: when is it worth the risk?", date: "2026-11-05", href: "#issue-127" },
      { number: 126, title: "A perfume store in Jeddah that doubled its returning customers", date: "2026-10-29", href: "#issue-126" },
    ],
    policyHref: "#privacy",
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "النشرة الأسبوعية",
    title: (
      <>
        <strong>نشرة الخميس،</strong> تجارة الخليج في خمس دقائق
      </>
    ),
    description: "أرقام وقصص وأسئلة التجّار، تصلك صباح كل خميس. بلا إعلانات، وتلغي اشتراكك متى شئت.",
    readers: 12400,
    issues: [
      { number: 128, title: "كم يخسر المتجر حين يتأخر الشحن يومين؟", date: "2026-11-12", href: "#issue-128" },
      { number: 127, title: "الدفع عند الاستلام: متى يستحق المخاطرة؟", date: "2026-11-05", href: "#issue-127" },
      { number: 126, title: "متجر عطور في جدة ضاعف زبائنه العائدين", date: "2026-10-29", href: "#issue-126" },
    ],
    policyHref: "#privacy",
    labels: labelsAr,
  },
}

export { Newsletter01, labelsEn, labelsAr, demo }
export type { Newsletter01Props, Newsletter01Labels, Issue }
export default Newsletter01
