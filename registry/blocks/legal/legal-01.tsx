import * as React from "react"
import { CaretDownIcon, DownloadSimpleIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Button, buttonVariants } from "@/registry/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type LegalSection = { id: string; heading: string; body: React.ReactNode }

type Legal01Labels = { toc: string; updated: string; version: string; download: string }

type Legal01Props = Omit<BlockBase, "headingLevel"> & {
  title: string
  updatedAt: string
  version?: string
  sections: LegalSection[]
  downloadHref?: string
  labels?: Partial<Legal01Labels>
}

const labelsEn: Legal01Labels = {
  toc: "On this page",
  updated: "Last updated",
  version: "Version",
  download: "Download PDF",
}

const labelsAr: Legal01Labels = {
  toc: "في هذه الصفحة",
  updated: "آخر تحديث",
  version: "الإصدار",
  download: "تنزيل نسخة PDF",
}

function TocLinks({ sections }: { sections: LegalSection[] }) {
  return (
    <ul className="flex flex-col gap-1 text-sm">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex min-h-8 items-center rounded-md px-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {section.heading}
          </a>
        </li>
      ))}
    </ul>
  )
}

function Legal01({ title, updatedAt, version, sections, downloadHref, labels, id, className }: Legal01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container>
        <header className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 id={`${sid}-heading`} className="text-3xl font-semibold text-balance md:text-4xl">
              {title}
            </h1>
            <p className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
              <span>
                {t.updated}: <bdi>{updatedAt}</bdi>
              </span>
              {version ? (
                <span>
                  {t.version}: <bdi>{version}</bdi>
                </span>
              ) : null}
            </p>
          </div>
          {downloadHref ? (
            <a
              href={downloadHref}
              download
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 w-full px-4 md:w-auto")}
            >
              <DownloadSimpleIcon aria-hidden="true" />
              {t.download}
            </a>
          ) : null}
        </header>
        <div className="grid gap-10 lg:grid-cols-12">
          <Collapsible className="lg:hidden">
            <CollapsibleTrigger
              render={<Button variant="outline" size="lg" className="h-11 w-full justify-between px-3 text-base" />}
            >
              {t.toc}
              <CaretDownIcon aria-hidden="true" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <nav aria-label={t.toc} className="pt-2">
                <TocLinks sections={sections} />
              </nav>
            </CollapsibleContent>
          </Collapsible>
          <div className="flex max-w-prose flex-col gap-10 lg:col-span-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24">
                <h2 id={`${section.id}-heading`} className="mb-3 text-xl font-semibold md:text-2xl">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground [&_ul]:list-disc [&_ul]:ps-6">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
          <aside className="hidden lg:col-span-4 lg:block">
            <nav aria-label={t.toc} className="sticky top-24">
              <p className="mb-2 px-2 text-sm font-semibold">{t.toc}</p>
              <TocLinks sections={sections} />
            </nav>
          </aside>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Legal01Props; ar: Legal01Props } = {
  en: {
    title: "Privacy policy",
    updatedAt: "November 15, 2026",
    version: "2.1",
    downloadHref: "#privacy.pdf",
    sections: [
      {
        id: "collect",
        heading: "Information we collect",
        body: (
          <>
            <p>We collect the information you give us when you create an account, place an order or contact support.</p>
            <ul>
              <li>Your name, mobile number and email address</li>
              <li>Billing and delivery details</li>
              <li>Messages you send to our team</li>
            </ul>
          </>
        ),
      },
      {
        id: "use",
        heading: "How we use your information",
        body: <p>We use your information to provide the service, issue invoices, answer your requests and improve the platform.</p>,
      },
      {
        id: "sharing",
        heading: "Sharing your data",
        body: <p>We never sell your data. We share it only with service providers who help us run the platform, under written agreements.</p>,
      },
      {
        id: "rights",
        heading: "Your rights",
        body: <p>Under the Personal Data Protection Law, you can ask to access, correct or delete your data at any time.</p>,
      },
      {
        id: "contact",
        heading: "Contact us",
        body: <p>For any privacy question, write to privacy@rafid.example and we will reply within five business days.</p>,
      },
    ],
    labels: labelsEn,
  },
  ar: {
    title: "سياسة الخصوصية",
    updatedAt: "15 نوفمبر 2026",
    version: "2.1",
    downloadHref: "#privacy.pdf",
    sections: [
      {
        id: "collect",
        heading: "المعلومات التي نجمعها",
        body: (
          <>
            <p>نجمع المعلومات التي تقدمها لنا عند إنشاء حساب أو إتمام طلب أو التواصل مع الدعم.</p>
            <ul>
              <li>اسمك ورقم جوالك وبريدك الإلكتروني</li>
              <li>بيانات الفوترة والتوصيل</li>
              <li>الرسائل التي ترسلها إلى فريقنا</li>
            </ul>
          </>
        ),
      },
      {
        id: "use",
        heading: "كيف نستخدم معلوماتك",
        body: <p>نستخدم معلوماتك لتقديم الخدمة وإصدار الفواتير والرد على طلباتك وتحسين المنصة.</p>,
      },
      {
        id: "sharing",
        heading: "مشاركة البيانات",
        body: <p>لا نبيع بياناتك أبدًا. نشاركها فقط مع مزودي الخدمة الذين يساعدوننا في تشغيل المنصة، وفق اتفاقيات مكتوبة.</p>,
      },
      {
        id: "rights",
        heading: "حقوقك",
        body: <p>يحق لك وفق نظام حماية البيانات الشخصية أن تطلب الاطلاع على بياناتك أو تصحيحها أو حذفها في أي وقت.</p>,
      },
      {
        id: "contact",
        heading: "تواصل معنا",
        body: <p>لأي استفسار عن الخصوصية، راسلنا على privacy@rafid.example وسنرد عليك خلال خمسة أيام عمل.</p>,
      },
    ],
    labels: labelsAr,
  },
}

export { Legal01, labelsEn, labelsAr, demo }
export type { Legal01Props, Legal01Labels, LegalSection }
export default Legal01
