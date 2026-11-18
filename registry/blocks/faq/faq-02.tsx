import * as React from "react"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"
import { WhatsAppButton } from "@/registry/ui/whatsapp-button"

type FaqItem = { id: string; question: string; answer: React.ReactNode }

type Faq02Labels = { whatsapp: string; whatsappOpens: string }

type Faq02Props = BlockBase & {
  title: string
  description?: string
  items: FaqItem[]
  contactText?: string
  contactCta?: Action
  whatsapp?: { phone: string; message: string }
  labels?: Partial<Faq02Labels>
}

const labelsEn: Faq02Labels = { whatsapp: "Chat on WhatsApp", whatsappOpens: "(opens WhatsApp)" }
const labelsAr: Faq02Labels = { whatsapp: "تحدث معنا", whatsappOpens: "(يفتح واتساب)" }

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function Faq02({
  title,
  description,
  items,
  contactText,
  contactCta,
  whatsapp,
  headingLevel = 2,
  labels,
  id,
  className,
}: Faq02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <SectionHeader
            id={sid}
            title={title}
            description={description}
            headingLevel={headingLevel}
            className="mb-0 md:mb-0 md:flex-col md:items-start md:justify-start"
          />
          {contactText || contactCta || whatsapp ? (
            <div className="flex flex-col items-start gap-3">
              {contactText ? <p className="font-medium">{contactText}</p> : null}
              {whatsapp ? (
                <WhatsAppButton
                  phone={whatsapp.phone}
                  message={whatsapp.message}
                  variant="outline"
                  className="h-10 px-4"
                  labels={{ label: t.whatsapp, opens: t.whatsappOpens }}
                />
              ) : null}
              {contactCta ? (
                <a
                  href={contactCta.href}
                  {...external(contactCta)}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}
                >
                  {contactCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <Accordion className="lg:col-span-8">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="py-4 text-base">{item.question}</AccordionTrigger>
              <AccordionContent className="pb-4 text-base text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}

const demo: { en: Faq02Props; ar: Faq02Props } = {
  en: {
    title: "Frequently asked questions",
    description: "Quick answers to what customers ask us most.",
    items: [
      {
        id: "einvoicing",
        question: "Does the platform support e-invoicing?",
        answer:
          "Yes. The platform issues tax invoices that meet ZATCA requirements, including the QR code.",
      },
      {
        id: "setup",
        question: "How long does setup take?",
        answer:
          "You can start within minutes, and our team helps you move your data from your current system at no extra cost.",
      },
      {
        id: "mobile",
        question: "Can I use the platform on my phone?",
        answer: "Yes. It works fully in the browser and on mobile, so your team can reach it from anywhere.",
      },
      {
        id: "payment",
        question: "Which payment methods do you accept for subscriptions?",
        answer: "We accept mada, Visa, Mastercard, Apple Pay and bank transfer.",
      },
      {
        id: "cancel",
        question: "Can I cancel at any time?",
        answer: "Yes. Cancel from your account page whenever you like, and your data stays available for export.",
      },
    ],
    contactText: "Did not find your answer?",
    whatsapp: { phone: "+966 50 555 0142", message: "Hello, I have a question about Rafid." },
    labels: labelsEn,
  },
  ar: {
    title: "الأسئلة الشائعة",
    description: "إجابات سريعة عن أكثر ما يسألنا عنه العملاء.",
    items: [
      {
        id: "einvoicing",
        question: "هل تدعم المنصة الفوترة الإلكترونية؟",
        answer:
          "نعم، تصدر المنصة فواتير ضريبية تلبي متطلبات هيئة الزكاة والضريبة والجمارك، بما في ذلك رمز الاستجابة السريعة.",
      },
      {
        id: "setup",
        question: "كم تستغرق عملية الإعداد؟",
        answer: "يمكنك البدء خلال دقائق، ويساعدك فريقنا في نقل بياناتك من نظامك الحالي دون أي رسوم إضافية.",
      },
      {
        id: "mobile",
        question: "هل يمكنني استخدام المنصة من الجوال؟",
        answer: "نعم، تعمل المنصة بالكامل على المتصفح والجوال، ويستطيع فريقك الوصول إليها من أي مكان.",
      },
      {
        id: "payment",
        question: "ما طرق الدفع المتاحة للاشتراك؟",
        answer: "نقبل مدى وفيزا وماستركارد وأبل باي والتحويل البنكي.",
      },
      {
        id: "cancel",
        question: "هل أستطيع إلغاء الاشتراك في أي وقت؟",
        answer: "نعم، يمكنك الإلغاء من صفحة حسابك متى شئت، وتبقى بياناتك متاحة لك للتصدير.",
      },
    ],
    contactText: "لم تجد إجابتك؟",
    whatsapp: { phone: "+966 50 555 0142", message: "السلام عليكم، لدي سؤال عن رافد." },
    labels: labelsAr,
  },
}

export { Faq02, labelsEn, labelsAr, demo }
export type { Faq02Props, Faq02Labels, FaqItem }
export default Faq02
