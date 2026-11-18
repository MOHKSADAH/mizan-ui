"use client"

import * as React from "react"
import {
  ClockIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
  type Icon,
} from "@phosphor-icons/react"

import type { BlockBase } from "@/registry/lib/block-types"
import { whatsappUrl } from "@/registry/lib/whatsapp"
import { Button } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Field, FieldError, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Textarea } from "@/registry/ui/textarea"

type InfoType = "phone" | "email" | "address" | "hours" | "whatsapp"
type ContactInfo = { type: InfoType; label: string; value: string; href?: string }
type ContactValues = { name: string; phone: string; email?: string; topic?: string; message: string }

type Contact01Labels = {
  name: string
  phone: string
  email: string
  topic: string
  topicPlaceholder: string
  message: string
  optional: string
  submit: string
  sending: string
  required: string
  invalidEmail: string
  success: string
  failure: string
}

type Contact01Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  info: ContactInfo[]
  topics?: { value: string; label: string }[]
  onSubmit?: (values: ContactValues) => Promise<void>
  labels?: Partial<Contact01Labels>
}

const labelsEn: Contact01Labels = {
  name: "Full name",
  phone: "Mobile number",
  email: "Email",
  topic: "Topic",
  topicPlaceholder: "Choose a topic",
  message: "Message",
  optional: "(optional)",
  submit: "Send message",
  sending: "Sending",
  required: "This field is required",
  invalidEmail: "Enter a valid email address",
  success: "Thank you. We received your message and will reply soon.",
  failure: "Your message was not sent. Try again.",
}

const labelsAr: Contact01Labels = {
  name: "الاسم الكامل",
  phone: "رقم الجوال",
  email: "البريد الإلكتروني",
  topic: "الموضوع",
  topicPlaceholder: "اختر الموضوع",
  message: "رسالتك",
  optional: "(اختياري)",
  submit: "إرسال الرسالة",
  sending: "جارٍ الإرسال",
  required: "هذا الحقل مطلوب",
  invalidEmail: "أدخل بريدًا إلكترونيًا صحيحًا",
  success: "شكرًا لك، وصلتنا رسالتك وسنرد عليك قريبًا.",
  failure: "لم يتم إرسال رسالتك. حاول مرة أخرى.",
}

const ICONS: Record<InfoType, Icon> = {
  phone: PhoneIcon,
  email: EnvelopeSimpleIcon,
  address: MapPinIcon,
  hours: ClockIcon,
  whatsapp: WhatsappLogoIcon,
}

const hrefFor = ({ type, value, href }: ContactInfo) => {
  if (href) return href
  if (type === "phone") return `tel:${value.replace(/[^\d+]/g, "")}`
  if (type === "email") return `mailto:${value}`
  if (type === "whatsapp") return whatsappUrl(value)
  return undefined
}

type FieldName = "name" | "phone" | "email" | "message"
type Status = "idle" | "sending" | "success" | "failure"

function Contact01({
  eyebrow,
  title,
  description,
  info,
  topics,
  onSubmit,
  headingLevel = 2,
  labels,
  id,
  className,
}: Contact01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const [topic, setTopic] = React.useState<string | null>(null)
  const [errors, setErrors] = React.useState<Partial<Record<FieldName, string>>>({})
  const [status, setStatus] = React.useState<Status>("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const read = (key: string) => String(data.get(key) ?? "").trim()
    const values = { name: read("name"), phone: read("phone"), email: read("email"), message: read("message") }
    const next: Partial<Record<FieldName, string>> = {}
    for (const key of ["name", "phone", "message"] as const) if (!values[key]) next[key] = t.required
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) next.email = t.invalidEmail
    setErrors(next)
    const first = (["name", "phone", "email", "message"] as const).find((key) => next[key])
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus("sending")
    try {
      await onSubmit?.({ ...values, email: values.email || undefined, topic: topic ?? undefined })
      setStatus("success")
      form.reset()
      setTopic(null)
    } catch {
      setStatus("failure")
    }
  }

  const field = (name: FieldName) => ({
    id: `${sid}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${sid}-${name}-error` : undefined,
  })
  const error = (name: FieldName) =>
    errors[name] ? <FieldError id={`${sid}-${name}-error`}>{errors[name]}</FieldError> : null

  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <div className="grid gap-10 lg:grid-cols-12">
          <ul className="flex flex-col gap-4 lg:col-span-5">
            {info.map((item) => {
              const ItemIcon = ICONS[item.type]
              const href = hrefFor(item)
              const ltr = item.type === "phone" || item.type === "whatsapp" || item.type === "email"
              const value = ltr ? (
                <bdi dir="ltr" className="tabular-nums">
                  {item.value}
                </bdi>
              ) : (
                <span dir="auto">{item.value}</span>
              )
              return (
                <li key={`${item.type}-${item.value}`}>
                  <Card>
                    <CardContent className="flex items-center gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                        <ItemIcon aria-hidden="true" className="size-5" />
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        {href ? (
                          <a
                            href={href}
                            {...(item.type === "whatsapp" ? { target: "_blank", rel: "noopener" } : {})}
                            className="font-medium break-words hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="font-medium">{value}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </li>
              )
            })}
          </ul>
          <Card className="lg:col-span-7 md:[--card-spacing:--spacing(6)]">
            <CardContent>
              <form noValidate onSubmit={handleSubmit} aria-busy={status === "sending"} className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor={`${sid}-name`}>{t.name}</FieldLabel>
                  <Input {...field("name")} autoComplete="name" required aria-required="true" className="h-10" />
                  {error("name")}
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${sid}-phone`}>{t.phone}</FieldLabel>
                  <Input
                    {...field("phone")}
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    autoComplete="tel"
                    required
                    aria-required="true"
                    className="h-10 text-start"
                  />
                  {error("phone")}
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${sid}-email`}>
                    {t.email} <span className="font-normal text-muted-foreground">{t.optional}</span>
                  </FieldLabel>
                  <Input {...field("email")} type="email" dir="ltr" autoComplete="email" className="h-10 text-start" />
                  {error("email")}
                </Field>
                {topics ? (
                  <Field>
                    <FieldLabel htmlFor={`${sid}-topic`}>
                      {t.topic} <span className="font-normal text-muted-foreground">{t.optional}</span>
                    </FieldLabel>
                    <Select items={topics} value={topic} onValueChange={setTopic}>
                      <SelectTrigger id={`${sid}-topic`} className="h-10 w-full">
                        <SelectValue placeholder={t.topicPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                ) : null}
                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor={`${sid}-message`}>{t.message}</FieldLabel>
                  <Textarea {...field("message")} rows={5} required aria-required="true" />
                  {error("message")}
                </Field>
                <div className="flex flex-col gap-3 sm:col-span-2">
                  <Button type="submit" size="lg" disabled={status === "sending"} className="h-11 w-full text-base sm:w-fit sm:px-6">
                    {status === "sending" ? t.sending : t.submit}
                  </Button>
                  <p
                    role="status"
                    className={status === "failure" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}
                  >
                    {status === "success" ? t.success : status === "failure" ? t.failure : null}
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Contact01Props; ar: Contact01Props } = {
  en: {
    eyebrow: "Contact us",
    title: "We are here to help",
    description: "Send us a message or reach the team directly. We reply within one business day.",
    info: [
      { type: "phone", label: "Phone", value: "+966 11 555 0142" },
      { type: "whatsapp", label: "WhatsApp", value: "+966 50 555 0142" },
      { type: "email", label: "Email", value: "hello@rafid.example" },
      { type: "address", label: "Address", value: "King Fahd Road, Riyadh 12211" },
      { type: "hours", label: "Working hours", value: "Sunday to Thursday, 9 AM to 6 PM" },
    ],
    topics: [
      { value: "sales", label: "Sales" },
      { value: "support", label: "Support" },
      { value: "partnership", label: "Partnership" },
    ],
    labels: labelsEn,
  },
  ar: {
    eyebrow: "تواصل معنا",
    title: "يسعدنا مساعدتك",
    description: "أرسل لنا رسالة أو تواصل مع الفريق مباشرة، وسنرد عليك خلال يوم عمل واحد.",
    info: [
      { type: "phone", label: "الهاتف", value: "+966 11 555 0142" },
      { type: "whatsapp", label: "واتساب", value: "+966 50 555 0142" },
      { type: "email", label: "البريد الإلكتروني", value: "hello@rafid.example" },
      { type: "address", label: "العنوان", value: "طريق الملك فهد، الرياض 12211" },
      { type: "hours", label: "ساعات العمل", value: "من الأحد إلى الخميس، من 9 صباحًا إلى 6 مساءً" },
    ],
    topics: [
      { value: "sales", label: "المبيعات" },
      { value: "support", label: "الدعم الفني" },
      { value: "partnership", label: "الشراكات" },
    ],
    labels: labelsAr,
  },
}

export { Contact01, labelsEn, labelsAr, demo }
export type { Contact01Props, Contact01Labels, ContactInfo, ContactValues }
export default Contact01
