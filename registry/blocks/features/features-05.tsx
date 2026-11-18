import * as React from "react"
import { CheckIcon, ImageIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Media } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type FeatureTab = {
  id: string
  label: string
  title: string
  description: string
  bullets: string[]
  media: Media | React.ReactNode
}

type Features05Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  tabs: FeatureTab[]
  defaultTab?: string
}

const labelsEn = {}
const labelsAr = {}

const isMedia = (m: Media | React.ReactNode): m is Media =>
  typeof m === "object" && m !== null && !React.isValidElement(m) && "src" in m

function Features05({ eyebrow, title, description, tabs, defaultTab, headingLevel = 2, id, className }: Features05Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const PanelHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <Tabs defaultValue={defaultTab ?? tabs[0]?.id} className="gap-8">
          <div className="overflow-x-auto pb-2 md:flex md:justify-center">
            <TabsList className="h-auto w-max">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="min-h-10 px-4 text-base">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-4">
                <PanelHeading className="text-xl font-semibold md:text-2xl">{tab.title}</PanelHeading>
                <p className="text-base text-muted-foreground md:text-lg">{tab.description}</p>
                <ul className="flex flex-col gap-3 text-base">
                  {tab.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <CheckIcon aria-hidden="true" weight="bold" className="mt-1 size-4 shrink-0 text-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg border">
                {isMedia(tab.media) ? (
                  <img src={tab.media.src} alt={tab.media.alt} width={tab.media.width} height={tab.media.height} className="size-full object-cover" />
                ) : (
                  tab.media
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const demo: { en: Features05Props; ar: Features05Props } = {
  en: {
    eyebrow: "Modules",
    title: "Pick the module that fits your day",
    description: "Each module works alone and connects to the rest when you need it.",
    tabs: [
      {
        id: "invoicing",
        label: "Invoicing",
        title: "Invoices that comply from day one",
        description: "Issue tax invoices with the QR code and send them on WhatsApp or email.",
        bullets: ["ZATCA-compliant tax invoices", "Credit notes and refunds", "Automatic payment reminders"],
        media: placeholder,
      },
      {
        id: "inventory",
        label: "Inventory",
        title: "Stock you can trust",
        description: "Know what you have in every warehouse and branch.",
        bullets: ["Transfers between branches", "Low-stock alerts", "Barcode scanning"],
        media: placeholder,
      },
      {
        id: "reports",
        label: "Reports",
        title: "Reports for every decision",
        description: "Compare branches, products and months in seconds.",
        bullets: ["Live sales dashboard", "Profit by product", "Export to Excel"],
        media: placeholder,
      },
      {
        id: "payroll",
        label: "Payroll",
        title: "Payroll without spreadsheets",
        description: "Calculate salaries and prepare the monthly file for your bank.",
        bullets: ["Allowances and deductions", "Salary files for banks", "Employee payslips"],
        media: placeholder,
      },
    ],
  },
  ar: {
    eyebrow: "الوحدات",
    title: "اختر الوحدة التي تناسب يومك",
    description: "تعمل كل وحدة بمفردها، وترتبط بالباقي حين تحتاج إلى ذلك.",
    tabs: [
      {
        id: "invoicing",
        label: "الفوترة",
        title: "فواتير متوافقة منذ اليوم الأول",
        description: "أصدر فواتير ضريبية برمز الاستجابة السريعة وأرسلها عبر واتساب أو البريد الإلكتروني.",
        bullets: ["فواتير ضريبية متوافقة مع هيئة الزكاة والضريبة والجمارك", "إشعارات دائنة ومرتجعات", "تذكيرات دفع تلقائية"],
        media: placeholder,
      },
      {
        id: "inventory",
        label: "المخزون",
        title: "مخزون تثق بأرقامه",
        description: "اعرف ما لديك في كل مستودع وفرع.",
        bullets: ["نقل الكميات بين الفروع", "تنبيهات انخفاض المخزون", "مسح الباركود"],
        media: placeholder,
      },
      {
        id: "reports",
        label: "التقارير",
        title: "تقارير لكل قرار",
        description: "قارن الفروع والمنتجات والأشهر في ثوانٍ.",
        bullets: ["لوحة مبيعات فورية", "الأرباح حسب المنتج", "تصدير إلى إكسل"],
        media: placeholder,
      },
      {
        id: "payroll",
        label: "الرواتب",
        title: "رواتب دون جداول يدوية",
        description: "احسب الرواتب وجهّز الملف الشهري لبنكك.",
        bullets: ["البدلات والاستقطاعات", "ملفات الرواتب للبنوك", "قسائم رواتب الموظفين"],
        media: placeholder,
      },
    ],
  },
}

export { Features05, labelsEn, labelsAr, demo }
export type { Features05Props, FeatureTab }
export default Features05
