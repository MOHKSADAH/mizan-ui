import * as React from "react"
import { StarIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { formatNumber, plural } from "@/registry/lib/format"
import { buttonVariants } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { QrCode } from "@/registry/ui/qr-code"
import { Section, SectionHeader } from "@/registry/ui/section"

type AppDownload01Labels = {
  scan: string
  qrLabel: string
  ratingLabel: (rating: string) => string
  ratings: Plural
}

type AppDownload01Props = BlockBase & {
  lang?: Lang
  title: string
  description?: string
  // Store links are plain text buttons: pass the store name as the label.
  appStore?: Action
  googlePlay?: Action
  // What the QR code opens: a smart link that sends each phone to its own store.
  qrValue: string
  rating?: { value: number; count: number }
  labels?: Partial<AppDownload01Labels>
}

const labelsEn: AppDownload01Labels = {
  scan: "Scan with your phone camera",
  qrLabel: "QR code to download the app",
  ratingLabel: (rating) => `Rated ${rating} out of 5`,
  ratings: (n) => plural(n, { one: "{n} rating", other: "{n} ratings" }, { lang: "en" }),
}

const labelsAr: AppDownload01Labels = {
  scan: "امسح الرمز بكاميرا جوالك",
  qrLabel: "رمز QR لتحميل التطبيق",
  ratingLabel: (rating) => `التقييم ${rating} من 5`,
  ratings: (n) =>
    plural(
      n,
      { one: "تقييم واحد", two: "تقييمان", few: "{n} تقييمات", many: "{n} تقييمًا", other: "{n} تقييم" },
      { lang: "ar" }
    ),
}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function AppDownload01({
  lang = "en",
  title,
  description,
  appStore,
  googlePlay,
  qrValue,
  rating,
  headingLevel = 2,
  labels,
  id,
  className,
}: AppDownload01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const stores = [appStore, googlePlay].filter((s): s is Action => !!s)
  const score = rating ? formatNumber(rating.value, { lang }, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : ""
  return (
    <Section id={sid} spacing="compact" className={className}>
      <Container size="narrow">
        <Card className="md:[--card-spacing:--spacing(8)]">
          <div className="flex flex-col gap-8 px-(--card-spacing) md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-6">
              <SectionHeader
                id={sid}
                title={title}
                description={description}
                headingLevel={headingLevel}
                className="mb-0 md:mb-0"
              />
              {stores.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {stores.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      {...external(s)}
                      className={buttonVariants({ size: "lg", className: "h-10 px-4" })}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              ) : null}
              {rating ? (
                <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1 font-medium text-foreground">
                    <StarIcon aria-hidden="true" weight="fill" className="size-4" />
                    <bdi aria-label={t.ratingLabel(score)}>{score}</bdi>
                  </span>
                  <bdi>{t.ratings(rating.count)}</bdi>
                </p>
              ) : null}
            </div>
            <div className="hidden shrink-0 flex-col items-center gap-3 text-center md:flex">
              <div className="rounded-lg border p-1">
                <QrCode value={qrValue} label={t.qrLabel} size={144} className="rounded-md" />
              </div>
              <p className="text-sm text-muted-foreground">{t.scan}</p>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  )
}

const demo: { en: AppDownload01Props; ar: AppDownload01Props } = {
  en: {
    lang: "en",
    title: "Take Rafid with you",
    description: "Track sales, approve orders and chat with customers from your phone.",
    appStore: { label: "App Store", href: "#app-store" },
    googlePlay: { label: "Google Play", href: "#google-play" },
    qrValue: "https://rafid.example/app",
    rating: { value: 4.8, count: 12400 },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    title: "خذ رافد معك أينما كنت",
    description: "تابع مبيعاتك واعتمد الطلبات وتحدث مع عملائك من جوالك.",
    appStore: { label: "App Store", href: "#app-store" },
    googlePlay: { label: "Google Play", href: "#google-play" },
    qrValue: "https://rafid.example/app",
    rating: { value: 4.8, count: 12400 },
    labels: labelsAr,
  },
}

export { AppDownload01, labelsEn, labelsAr, demo }
export type { AppDownload01Props, AppDownload01Labels }
export default AppDownload01
