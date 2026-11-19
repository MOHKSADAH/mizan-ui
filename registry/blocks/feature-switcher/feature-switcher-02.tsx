"use client"

import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { AvatarStack, avatarStackLabelsAr } from "@/registry/ui/avatar-group"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { OrderStepper, orderStepperLabelsAr } from "@/registry/ui/order-stepper"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { StatCard, statCardLabelsAr } from "@/registry/ui/stat-card"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type TourStep = { id: string; label: string; title: string; description: string; media: React.ReactNode }

type FeatureSwitcher02Props = BlockBase & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  tabs: TourStep[]
  defaultTab?: string
}

const labelsEn = {}
const labelsAr = {}

function FeatureSwitcher02({ eyebrow, title, description, tabs, defaultTab, headingLevel = 2, id, className }: FeatureSwitcher02Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} align="center" />
        <Tabs defaultValue={defaultTab ?? tabs[0]?.id} className="gap-8">
          <div className="overflow-x-auto pb-2 md:flex md:justify-center">
            <TabsList variant="line" activateOnFocus className="h-auto w-max gap-2">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="min-h-10 flex-none px-4 text-base data-active:font-semibold data-active:text-foreground after:-bottom-px">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="flex flex-col gap-6">
              <div className="min-h-[24rem] rounded-xl border bg-muted p-4 sm:p-6 lg:p-10">{tab.media}</div>
              <div className="flex max-w-3xl flex-col gap-2">
                <p className="text-lg font-semibold md:text-xl">{tab.title}</p>
                <p className="text-base text-muted-foreground">{tab.description}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}

type Order = { name: string; number: string; amount: number; status: OrderStatus }

const orders = (ar: boolean): Order[] =>
  ar
    ? [
        { name: "فهد القحطاني", number: "#10482", amount: 1250, status: "paid" },
        { name: "نورة العتيبي", number: "#10481", amount: 385, status: "delivered" },
        { name: "مؤسسة الراشد للتجارة", number: "#10480", amount: 4720, status: "pending" },
      ]
    : [
        { name: "Fahad Al-Qahtani", number: "#10482", amount: 1250, status: "paid" },
        { name: "Noura Al-Otaibi", number: "#10481", amount: 385, status: "delivered" },
        { name: "Al-Rashed Trading", number: "#10480", amount: 4720, status: "pending" },
      ]

function OrderRows({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  return (
    <ul className="grid gap-2">
      {orders(ar).map((o) => (
        <li key={o.number}>
          <Card size="sm" className="flex-row items-center gap-3 px-3 text-sm">
            <div className="grid min-w-0 flex-1">
              <span className="truncate font-medium">{o.name}</span>
              <span className="text-xs text-muted-foreground"><bdi>{o.number}</bdi></span>
            </div>
            <Price amount={o.amount} lang={lang} className="font-medium" />
            <StatusBadge status={o.status} labels={ar ? statusBadgeLabelsAr : undefined} />
          </Card>
        </li>
      ))}
    </ul>
  )
}

function DashboardMedia({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const labels = ar ? statCardLabelsAr : undefined
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label={ar ? "مبيعات اليوم" : "Sales today"} value={<Price amount={12430} lang={lang} />} delta={12.4} spark={[4, 6, 5, 8, 7, 11, 12]} lang={lang} labels={labels} />
        <StatCard label={ar ? "الطلبات" : "Orders"} value={86} delta={8.1} spark={[3, 4, 4, 6, 5, 7, 8]} lang={lang} labels={labels} />
        <StatCard label={ar ? "متوسط السلة" : "Average basket"} value={<Price amount={144} lang={lang} />} delta={-2.3} spark={[9, 8, 8, 7, 8, 7, 6]} lang={lang} labels={labels} />
      </div>
      <OrderRows lang={lang} />
    </div>
  )
}

function OrdersMedia({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const steps = ar
    ? [{ id: "placed", label: "تم الطلب" }, { id: "packing", label: "قيد التجهيز" }, { id: "courier", label: "مع المندوب" }, { id: "delivered", label: "تم التسليم" }]
    : [{ id: "placed", label: "Placed" }, { id: "packing", label: "Packing" }, { id: "courier", label: "With courier" }, { id: "delivered", label: "Delivered" }]
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="grid gap-5">
          <p className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium">
              {ar ? "الطلب" : "Order"} <bdi>#10482</bdi>
            </span>
            <span className="text-muted-foreground">{ar ? "الرياض، حي العليا" : "Riyadh, Al-Olaya"}</span>
          </p>
          <OrderStepper steps={steps} current="courier" lang={lang} labels={ar ? orderStepperLabelsAr : undefined} />
        </CardContent>
      </Card>
      <OrderRows lang={lang} />
    </div>
  )
}

function CustomersMedia({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const people = ar
    ? ["فهد القحطاني", "نورة العتيبي", "سلطان الراشد", "ريم الغامدي", "خالد الدوسري", "هند الشمري", "ماجد الحربي"]
    : ["Fahad Al-Qahtani", "Noura Al-Otaibi", "Sultan Al-Rashed", "Reem Al-Ghamdi", "Khalid Al-Dosari", "Hind Al-Shammari", "Majed Al-Harbi"]
  const top = ar
    ? [["فهد القحطاني", "الرياض", 18240], ["ريم الغامدي", "جدة", 12980], ["سلطان الراشد", "الخبر", 9460]] as const
    : [["Fahad Al-Qahtani", "Riyadh", 18240], ["Reem Al-Ghamdi", "Jeddah", 12980], ["Sultan Al-Rashed", "Khobar", 9460]] as const
  return (
    <Card>
      <CardContent className="grid gap-5">
        <div className="flex items-center justify-between gap-3">
          <div className="grid">
            <span className="font-medium">{ar ? "عملاء هذا الشهر" : "Customers this month"}</span>
            <span className="text-sm text-muted-foreground">{ar ? "أكثرهم شراءً" : "Highest spenders"}</span>
          </div>
          <AvatarStack people={people.map((name) => ({ name }))} max={5} lang={lang} labels={ar ? avatarStackLabelsAr : undefined} />
        </div>
        <ul className="grid gap-3">
          {top.map(([name, city, spent]) => (
            <li key={name} className="flex items-center justify-between gap-3 border-t pt-3 text-sm">
              <div className="grid">
                <span className="font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{city}</span>
              </div>
              <Price amount={spent} lang={lang} className="font-medium" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

const tour = (lang: Lang) => [<DashboardMedia key="a" lang={lang} />, <OrdersMedia key="b" lang={lang} />, <CustomersMedia key="c" lang={lang} />]
const enMedia = tour("en")
const arMedia = tour("ar")

const demo: { en: FeatureSwitcher02Props; ar: FeatureSwitcher02Props } = {
  en: {
    eyebrow: "Product tour",
    title: "Walk through a normal morning in the dashboard",
    tabs: [
      { id: "dashboard", label: "Dashboard", title: "Sales before your first coffee", description: "Today's sales, orders and average basket, each compared with yesterday, with the latest orders underneath." },
      { id: "orders", label: "Orders", title: "Every order, one status", description: "Follow an order from payment to the courier. Your customer sees the same steps on the tracking link." },
      { id: "customers", label: "Customers", title: "Know who buys most", description: "See your highest spenders by city, and message them on WhatsApp in one tap." },
    ].map((tab, i) => ({ ...tab, media: enMedia[i] })),
  },
  ar: {
    eyebrow: "جولة في المنتج",
    title: "صباح عادي داخل لوحة التحكم",
    tabs: [
      { id: "dashboard", label: "لوحة التحكم", title: "مبيعاتك قبل قهوة الصباح", description: "مبيعات اليوم والطلبات ومتوسط السلة، كلٌّ منها مقارنةً بالأمس، وتحتها آخر الطلبات." },
      { id: "orders", label: "الطلبات", title: "كل طلب، وحالته الواضحة", description: "تابع الطلب من الدفع حتى المندوب، ويرى عميلك الخطوات نفسها في رابط التتبع." },
      { id: "customers", label: "العملاء", title: "اعرف من يشتري أكثر", description: "اطلع على أكثر عملائك شراءً حسب المدينة، وراسلهم على واتساب بلمسة واحدة." },
    ].map((tab, i) => ({ ...tab, media: arMedia[i] })),
  },
}

export { FeatureSwitcher02, labelsEn, labelsAr, demo }
export type { FeatureSwitcher02Props, TourStep }
export default FeatureSwitcher02
