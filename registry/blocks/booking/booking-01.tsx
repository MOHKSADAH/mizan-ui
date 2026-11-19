"use client"

import * as React from "react"

import type { BlockBase, Currency, Lang, Plural } from "@/registry/lib/block-types"
import { formatDate, plural } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Label } from "@/registry/ui/label"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { SlotPicker, slotPickerLabelsAr, type Slot, type SlotValue } from "@/registry/ui/slot-picker"

type Service = { id: string; name: string; minutes: number; price: number }
type Booking = { service: string; date: string; time: string }

type Booking01Labels = {
  service: string
  servicePlaceholder: string
  when: string
  summary: string
  date: string
  time: string
  duration: string
  fee: string
  minutes: Plural
  empty: string
  confirm: string
  confirmed: string
}

type Booking01Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  currency?: Currency
  services: Service[]
  // Available times by Gregorian ISO date, as SlotPicker reads them.
  slots: Record<string, Slot[]>
  startDate?: string
  note?: string
  onConfirm?: (booking: Booking) => void
  labels?: Partial<Booking01Labels>
}

const labelsEn: Booking01Labels = {
  service: "Service",
  servicePlaceholder: "Choose a service",
  when: "Date and time",
  summary: "Your appointment",
  date: "Date",
  time: "Time",
  duration: "Duration",
  fee: "Fee",
  minutes: (n) => plural(n, { one: "{n} minute", other: "{n} minutes" }, { lang: "en" }),
  empty: "Choose a service, a day and a time to see your appointment here.",
  confirm: "Confirm booking",
  confirmed: "Your booking is confirmed. We will send a reminder by text message.",
}

const labelsAr: Booking01Labels = {
  service: "الخدمة",
  servicePlaceholder: "اختر الخدمة",
  when: "التاريخ والوقت",
  summary: "موعدك",
  date: "التاريخ",
  time: "الوقت",
  duration: "المدة",
  fee: "الرسوم",
  minutes: (n) =>
    plural(n, { one: "دقيقة", two: "دقيقتان", few: "{n} دقائق", many: "{n} دقيقة", other: "{n} دقيقة" }, { lang: "ar" }),
  empty: "اختر الخدمة واليوم والوقت لتظهر تفاصيل موعدك هنا.",
  confirm: "تأكيد الحجز",
  confirmed: "تم تأكيد حجزك. سنرسل لك تذكيرًا برسالة نصية.",
}

function Booking01({
  lang = "en",
  eyebrow,
  title,
  description,
  currency = "SAR",
  services,
  slots,
  startDate,
  note,
  onConfirm,
  headingLevel = 2,
  labels,
  id,
  className,
}: Booking01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const [serviceId, setServiceId] = React.useState<string | null>(null)
  const [slot, setSlot] = React.useState<SlotValue | null>(null)
  const [done, setDone] = React.useState(false)
  const service = services.find((s) => s.id === serviceId)
  const ready = !!service && !!slot?.time
  const SubHeading = `h${headingLevel + 1}` as "h3" | "h4"

  const day = slot ? new Date(`${slot.date}T00:00:00Z`) : null
  const show = (calendar: "gregory" | "islamic-umalqura", options: Intl.DateTimeFormatOptions) =>
    formatDate(day!, { lang, calendar, timeZone: "UTC" }, options)
  const [h, m] = (slot?.time || "00:00").split(":").map(Number)
  const rows = ready
    ? [
        {
          label: t.date,
          value: (
            <>
              <bdi>{show("gregory", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</bdi>
              <span className="block text-muted-foreground">
                <bdi>{show("islamic-umalqura", { day: "numeric", month: "long", year: "numeric" })}</bdi>
              </span>
            </>
          ),
        },
        {
          label: t.time,
          value: (
            <bdi>
              {formatDate(new Date(Date.UTC(2000, 0, 1, h, m)), { lang, timeZone: "UTC" }, { hour: "numeric", minute: "2-digit", hour12: true })}
            </bdi>
          ),
        },
        { label: t.duration, value: <bdi>{t.minutes(service.minutes)}</bdi> },
        { label: t.fee, value: <Price amount={service.price} lang={lang} currency={currency} /> },
      ]
    : []

  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <div className="grid items-start gap-6 lg:grid-cols-5">
          <Card className="md:[--card-spacing:--spacing(6)] lg:col-span-3">
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${sid}-service`}>{t.service}</Label>
                <Select
                  items={services.map((s) => ({ value: s.id, label: s.name }))}
                  value={serviceId}
                  onValueChange={(v) => {
                    setServiceId(v)
                    setDone(false)
                  }}
                >
                  <SelectTrigger id={`${sid}-service`} className="h-10 w-full">
                    <SelectValue placeholder={t.servicePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm leading-none font-medium">{t.when}</span>
                <SlotPicker
                  lang={lang}
                  slots={slots}
                  startDate={startDate}
                  labels={lang === "ar" ? slotPickerLabelsAr : undefined}
                  value={slot}
                  onValueChange={(v) => {
                    setSlot(v)
                    setDone(false)
                  }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="md:[--card-spacing:--spacing(6)] lg:col-span-2">
            <CardContent className="flex flex-col gap-6">
              <SubHeading className="text-lg font-semibold md:text-xl">{t.summary}</SubHeading>
              {ready ? (
                <>
                  <p className="font-medium">{service.name}</p>
                  <dl className="flex flex-col">
                    {rows.map((r) => (
                      <div key={r.label} className="flex items-start justify-between gap-4 border-t py-3 text-sm">
                        <dt className="text-muted-foreground">{r.label}</dt>
                        <dd className="text-end font-medium">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">{t.empty}</p>
              )}
              {note ? <p className="text-xs text-muted-foreground">{note}</p> : null}
              <Button
                size="lg"
                className="h-10 w-full"
                disabled={!ready}
                onClick={() => {
                  setDone(true)
                  onConfirm?.({ service: service!.id, ...slot! })
                }}
              >
                {t.confirm}
              </Button>
              <p role="status" className="text-sm font-medium">
                {done ? t.confirmed : null}
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}

// A fixed week keeps the demo identical on every render. Friday is closed.
const START = "2026-12-06"
const times = ["09:00", "09:30", "10:30", "11:30", "16:00", "17:30", "18:30", "20:00"]
const demoSlots: Record<string, Slot[]> = Object.fromEntries(
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.parse(`${START}T00:00:00Z`) + i * 864e5)
    const open = d.getUTCDay() !== 5
    return [d.toISOString().slice(0, 10), open ? times.map((time, n) => ({ time, disabled: (n + i) % 4 === 3 })) : []]
  })
)

const demo: { en: Booking01Props; ar: Booking01Props } = {
  en: {
    lang: "en",
    eyebrow: "Book online",
    title: "Book your visit in a minute",
    description: "Choose a service and a time that suits you. No calls and no waiting.",
    services: [
      { id: "checkup", name: "Check-up and exam", minutes: 30, price: 150 },
      { id: "cleaning", name: "Cleaning and polishing", minutes: 45, price: 250 },
      { id: "whitening", name: "Teeth whitening", minutes: 60, price: 900 },
      { id: "ortho", name: "Braces consultation", minutes: 30, price: 200 },
    ],
    slots: demoSlots,
    startDate: START,
    note: "Pay at the clinic. Prices include VAT.",
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "احجز عبر الإنترنت",
    title: "احجز زيارتك في دقيقة",
    description: "اختر الخدمة والوقت المناسب لك، دون مكالمات ودون انتظار.",
    services: [
      { id: "checkup", name: "كشف وفحص الأسنان", minutes: 30, price: 150 },
      { id: "cleaning", name: "تنظيف وتلميع الأسنان", minutes: 45, price: 250 },
      { id: "whitening", name: "تبييض الأسنان", minutes: 60, price: 900 },
      { id: "ortho", name: "استشارة تقويم الأسنان", minutes: 30, price: 200 },
    ],
    slots: demoSlots,
    startDate: START,
    note: "الدفع في العيادة. الأسعار تشمل ضريبة القيمة المضافة.",
    labels: labelsAr,
  },
}

export { Booking01, labelsEn, labelsAr, demo }
export type { Booking01Props, Booking01Labels, Service, Booking }
export default Booking01
