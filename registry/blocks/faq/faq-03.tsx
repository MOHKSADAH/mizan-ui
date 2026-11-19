import * as React from "react"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type FaqItem = { id: string; question: string; answer: React.ReactNode }
type FaqCategory = { id: string; label: string; items: FaqItem[] }

type Faq03Labels = { categories: string }

type Faq03Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  categories: FaqCategory[]
  contactText?: string
  contactCta?: Action
  labels?: Partial<Faq03Labels>
}

const labelsEn: Faq03Labels = { categories: "Question categories" }
const labelsAr: Faq03Labels = { categories: "أقسام الأسئلة" }

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function Faq03({
  eyebrow,
  title,
  description,
  categories,
  contactText,
  contactCta,
  headingLevel = 2,
  labels,
  id,
  className,
}: Faq03Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container size="prose">
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <Tabs defaultValue={categories[0]?.id} className="gap-6">
          <div className="mx-auto max-w-full overflow-x-auto">
            <TabsList aria-label={t.categories} className="h-10 w-max">
              {categories.map((c) => (
                <TabsTrigger key={c.id} value={c.id} className="px-4 text-base">
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {categories.map((c) => (
            <TabsContent key={c.id} value={c.id}>
              <Accordion>
                {c.items.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="py-4 text-base">{item.question}</AccordionTrigger>
                    <AccordionContent className="pb-4 text-base text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
        {contactText || contactCta ? (
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            {contactText ? <p className="font-medium">{contactText}</p> : null}
            {contactCta ? (
              <a
                href={contactCta.href}
                {...external(contactCta)}
                className={buttonVariants({ variant: "outline", size: "lg", className: "h-10 px-4" })}
              >
                {contactCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}

const demo: { en: Faq03Props; ar: Faq03Props } = {
  en: {
    eyebrow: "Support",
    title: "Answers by topic",
    description: "Pick a topic to see the questions customers ask most.",
    categories: [
      {
        id: "billing",
        label: "Billing",
        items: [
          {
            id: "methods",
            question: "Which payment methods do you accept?",
            answer: "We accept mada, Visa, Mastercard, Apple Pay and bank transfer.",
          },
          {
            id: "vat",
            question: "Do the prices include VAT?",
            answer: "Prices are shown before VAT. The 15% VAT is added at checkout and appears on your tax invoice.",
          },
          {
            id: "cancel",
            question: "Can I cancel at any time?",
            answer: "Yes. Cancel from your account page and your plan ends on the last day you paid for.",
          },
        ],
      },
      {
        id: "setup",
        label: "Setup",
        items: [
          {
            id: "time",
            question: "How long does setup take?",
            answer: "Most stores are ready within a day. Our team moves your products and customers for you.",
          },
          {
            id: "devices",
            question: "Can my team use it on phones?",
            answer: "Yes. It works in any browser and in the Rafid app for iPhone and Android.",
          },
        ],
      },
      {
        id: "support",
        label: "Support",
        items: [
          {
            id: "hours",
            question: "When can I reach support?",
            answer: "Our team answers on WhatsApp and by phone from 9 a.m. to 9 p.m., Sunday to Thursday.",
          },
          {
            id: "language",
            question: "Is support available in Arabic?",
            answer: "Yes. Every agent speaks Arabic, and English is available on request.",
          },
        ],
      },
    ],
    contactText: "Still have a question?",
    contactCta: { label: "Talk to our team", href: "#contact" },
    labels: labelsEn,
  },
  ar: {
    eyebrow: "الدعم",
    title: "إجابات حسب الموضوع",
    description: "اختر موضوعًا لتشاهد الأسئلة التي يسألها عملاؤنا أكثر.",
    categories: [
      {
        id: "billing",
        label: "الفوترة",
        items: [
          {
            id: "methods",
            question: "ما طرق الدفع المتاحة؟",
            answer: "نقبل مدى وفيزا وماستركارد وأبل باي والتحويل البنكي.",
          },
          {
            id: "vat",
            question: "هل الأسعار شاملة ضريبة القيمة المضافة؟",
            answer: "الأسعار المعروضة قبل الضريبة. تُضاف ضريبة القيمة المضافة 15% عند الدفع وتظهر في فاتورتك الضريبية.",
          },
          {
            id: "cancel",
            question: "هل أستطيع الإلغاء في أي وقت؟",
            answer: "نعم، يمكنك الإلغاء من صفحة حسابك وتنتهي باقتك في آخر يوم دفعت عنه.",
          },
        ],
      },
      {
        id: "setup",
        label: "الإعداد",
        items: [
          {
            id: "time",
            question: "كم تستغرق عملية الإعداد؟",
            answer: "تجهز معظم المتاجر خلال يوم واحد، ويتولى فريقنا نقل منتجاتك وعملائك.",
          },
          {
            id: "devices",
            question: "هل يستطيع فريقي استخدامه من الجوال؟",
            answer: "نعم، يعمل على أي متصفح وعلى تطبيق رافد للآيفون والأندرويد.",
          },
        ],
      },
      {
        id: "support",
        label: "الدعم",
        items: [
          {
            id: "hours",
            question: "متى أستطيع التواصل مع الدعم؟",
            answer: "يرد فريقنا على واتساب والهاتف من التاسعة صباحًا حتى التاسعة مساءً، من الأحد إلى الخميس.",
          },
          {
            id: "language",
            question: "هل الدعم متاح بالعربية؟",
            answer: "نعم، جميع موظفينا يتحدثون العربية، والإنجليزية متاحة عند الطلب.",
          },
        ],
      },
    ],
    contactText: "ما زال لديك سؤال؟",
    contactCta: { label: "تحدث مع فريقنا", href: "#contact" },
    labels: labelsAr,
  },
}

export { Faq03, labelsEn, labelsAr, demo }
export type { Faq03Props, Faq03Labels, FaqItem, FaqCategory }
export default Faq03
