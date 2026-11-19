import * as React from "react"
import { ArrowUpRightIcon, LifebuoyIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { buttonVariants } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { CopyButton, copyButtonLabelsAr } from "@/registry/ui/copy-button"
import { DeliveryEstimate, deliveryEstimateLabelsAr } from "@/registry/ui/delivery-estimate"
import { Section } from "@/registry/ui/section"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"
import { Timeline, TimelineItem, timelineLabelsAr, type TimelineStatus } from "@/registry/ui/timeline"
import { cn } from "@/registry/lib/utils"

export type OrderTracking01Labels = {
  title: string
  order: string
  progress: string
  courier: string
  trackingNumber: string
  trackOnCourier: string
  courierPending: string
  help: string
  helpText: string
}

export const labelsEn: OrderTracking01Labels = {
  title: "Track your order",
  order: "Order number",
  progress: "Shipment progress",
  courier: "Courier",
  trackingNumber: "Tracking number",
  trackOnCourier: "Track on the courier site",
  courierPending: "We send you the tracking number by text message when the courier collects your order.",
  help: "Get help with this order",
  helpText: "Something looks wrong with your delivery?",
}

export const labelsAr: OrderTracking01Labels = {
  title: "تتبّع طلبك",
  order: "رقم الطلب",
  progress: "مراحل الشحنة",
  courier: "شركة الشحن",
  trackingNumber: "رقم الشحنة",
  trackOnCourier: "تتبّع من موقع شركة الشحن",
  courierPending: "نرسل لك رقم الشحنة برسالة نصية عند استلام شركة الشحن لطلبك.",
  help: "تواصل معنا بخصوص الطلب",
  helpText: "هل لديك ملاحظة على التوصيل؟",
}

export type TrackingStep = {
  id: string
  title: string
  description?: string
  // An ISO date and time. Leave it out for a step that has not happened yet.
  date?: string
  state: "done" | "current" | "upcoming"
}

export type OrderTracking01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<OrderTracking01Labels>
  order: { number: string; status: OrderStatus }
  steps: TrackingStep[]
  // Leave it out until the courier has the parcel and a tracking number exists.
  courier?: { name: string; trackingNumber: string; trackHref?: string }
  // `date` is an ISO date. The city follows "Deliver to".
  estimate: { date: string; city?: string }
  helpHref: string
}

const tone: Record<TrackingStep["state"], TimelineStatus> = { done: "success", current: "info", upcoming: "muted" }

export function OrderTracking01({
  lang = "en",
  labels,
  order,
  steps,
  courier,
  estimate,
  helpHref,
  id,
  headingLevel = 2,
  className,
}: OrderTracking01Props) {
  const t = { ...labelsEn, ...labels }
  const ar = lang === "ar"
  const dir = ar ? "rtl" : "ltr"
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const Sub = `h${headingLevel + 1}` as "h3" | "h4"

  return (
    <Section as="div" spacing="compact" id={id} className={className}>
      <Container dir={dir} className="flex max-w-4xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <Heading className="text-2xl font-semibold">{t.title}</Heading>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              {t.order}
              <bdi dir="ltr" className="font-medium text-foreground tabular-nums">
                #{order.number}
              </bdi>
            </p>
          </div>
          <StatusBadge status={order.status} labels={ar ? statusBadgeLabelsAr : undefined} />
        </div>
        <div className="grid items-start gap-4 md:grid-cols-[1fr_20rem]">
          <Card className="gap-4 px-4">
            <Sub className="text-base font-semibold">{t.progress}</Sub>
            <Timeline
              lang={lang}
              labels={ar ? timelineLabelsAr : undefined}
              dateOptions={{ day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Riyadh" }}
            >
              {steps.map((step) => (
                <TimelineItem
                  key={step.id}
                  title={step.title}
                  date={step.date ? new Date(step.date) : undefined}
                  status={tone[step.state]}
                  aria-current={step.state === "current" ? "step" : undefined}
                  className={cn(step.state === "upcoming" && "text-muted-foreground")}
                >
                  {step.description}
                </TimelineItem>
              ))}
            </Timeline>
          </Card>
          <div className="flex flex-col gap-4">
            <Card className="gap-4 px-4">
              <DeliveryEstimate
                date={new Date(estimate.date)}
                lang={lang}
                labels={ar ? deliveryEstimateLabelsAr : undefined}
                city={estimate.city ? <span className="font-medium text-foreground">{estimate.city}</span> : undefined}
              />
              {courier ? (
                <dl className="flex flex-col gap-3 border-t border-border pt-4 text-sm">
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">{t.courier}</dt>
                    <dd className="font-medium">{courier.name}</dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="text-muted-foreground">{t.trackingNumber}</dt>
                    <dd className="flex flex-wrap items-center justify-between gap-2">
                      <bdi dir="ltr" className="font-medium tabular-nums">
                        {courier.trackingNumber}
                      </bdi>
                      <CopyButton value={courier.trackingNumber} size="sm" labels={ar ? copyButtonLabelsAr : undefined} />
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="border-t border-border pt-4 text-sm text-muted-foreground">{t.courierPending}</p>
              )}
              {courier?.trackHref && (
                <a href={courier.trackHref} className={cn(buttonVariants({ variant: "outline" }), "h-10 w-full")}>
                  {t.trackOnCourier}
                  <ArrowUpRightIcon aria-hidden="true" weight="regular" data-icon="inline-end" className="rtl:-scale-x-100" />
                </a>
              )}
            </Card>
            <Card className="gap-3 px-4">
              <p className="text-sm text-muted-foreground">{t.helpText}</p>
              <a href={helpHref} className={cn(buttonVariants({ variant: "outline" }), "h-10 w-full")}>
                <LifebuoyIcon aria-hidden="true" weight="regular" data-icon="inline-start" />
                {t.help}
              </a>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default OrderTracking01

export const demo: { en: OrderTracking01Props; ar: OrderTracking01Props } = {
  ar: {
    lang: "ar",
    labels: labelsAr,
    order: { number: "360244", status: "shipped" },
    steps: [
      { id: "confirmed", title: "تم استلام طلبك", description: "تم الدفع، وطلبك مؤكد.", date: "2026-11-16T10:42:00+03:00", state: "done" },
      { id: "preparing", title: "تم تجهيز الطلب", description: "جهّزنا منتجاتك في مستودع الرياض.", date: "2026-11-16T15:20:00+03:00", state: "done" },
      { id: "courier", title: "سُلّم لشركة الشحن", description: "استلمت سمسا إكسبرس الشحنة من المستودع.", date: "2026-11-17T09:05:00+03:00", state: "done" },
      { id: "transit", title: "وصلت إلى مركز الفرز", description: "الشحنة في مركز الفرز بالرياض.", date: "2026-11-18T22:40:00+03:00", state: "done" },
      { id: "out", title: "مع المندوب", description: "المندوب في الطريق إليك، وسيتصل بك قبل الوصول.", date: "2026-11-19T08:10:00+03:00", state: "current" },
      { id: "delivered", title: "تم التسليم", state: "upcoming" },
    ],
    courier: { name: "سمسا إكسبرس", trackingNumber: "SM4802917365", trackHref: "#courier" },
    estimate: { date: "2026-11-19", city: "الرياض، حي الياسمين" },
    helpHref: "#help",
  },
  en: {
    lang: "en",
    labels: labelsEn,
    order: { number: "360244", status: "shipped" },
    steps: [
      { id: "confirmed", title: "Order received", description: "Payment is done and your order is confirmed.", date: "2026-11-16T10:42:00+03:00", state: "done" },
      { id: "preparing", title: "Order packed", description: "We packed your items at the Riyadh warehouse.", date: "2026-11-16T15:20:00+03:00", state: "done" },
      { id: "courier", title: "Handed to the courier", description: "SMSA Express collected the parcel from the warehouse.", date: "2026-11-17T09:05:00+03:00", state: "done" },
      { id: "transit", title: "Reached the sorting hub", description: "The parcel is at the Riyadh sorting hub.", date: "2026-11-18T22:40:00+03:00", state: "done" },
      { id: "out", title: "Out for delivery", description: "The courier is on the way and will call you before arriving.", date: "2026-11-19T08:10:00+03:00", state: "current" },
      { id: "delivered", title: "Delivered", state: "upcoming" },
    ],
    courier: { name: "SMSA Express", trackingNumber: "SM4802917365", trackHref: "#courier" },
    estimate: { date: "2026-11-19", city: "Riyadh, Al Yasmin district" },
    helpHref: "#help",
  },
}
