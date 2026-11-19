import * as React from "react"
import {
  BellRingingIcon,
  FileTextIcon,
  FingerprintIcon,
  ImageIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/ssr"

import { AppDownload01, labelsAr as appAr, labelsEn as appEn } from "@/registry/blocks/app-download/app-download-01"
import { Calculator01, labelsAr as calcAr, labelsEn as calcEn } from "@/registry/blocks/calculator/calculator-01"
import { Faq02, labelsAr as faqAr, labelsEn as faqEn } from "@/registry/blocks/faq/faq-02"
import { Features02 } from "@/registry/blocks/features/features-02"
import { Features04 } from "@/registry/blocks/features/features-04"
import { Footer05, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-05"
import { Hero02 } from "@/registry/blocks/hero/hero-02"
import { LogoCloud04 } from "@/registry/blocks/logo-cloud/logo-cloud-04"
import { Navbar01, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-01"
import type { Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Card, CardContent } from "@/registry/ui/card"
import { Price } from "@/registry/ui/price"
import { Progress } from "@/registry/ui/progress"

type FintechPage01Props = {
  navbar: React.ComponentProps<typeof Navbar01>
  hero: React.ComponentProps<typeof Hero02>
  steps: React.ComponentProps<typeof Features02>
  calculator: React.ComponentProps<typeof Calculator01>
  partners: React.ComponentProps<typeof LogoCloud04>
  trust: React.ComponentProps<typeof Features04>
  app: React.ComponentProps<typeof AppDownload01>
  faq: React.ComponentProps<typeof Faq02>
  footer: React.ComponentProps<typeof Footer05>
  className?: string
}

// Layout rhythm: split hero with an account card, alternating product rows, calculator, partner boxes,
// sticky-heading trust list, app download, split FAQ, footer with the licence line.
// Section ids match the navbar links.
function FintechPage01(props: FintechPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar01 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero02 {...props.hero} />
        <Features02 id="how" {...props.steps} />
        <Calculator01 id="calculator" {...props.calculator} />
        <LogoCloud04 {...props.partners} />
        <Features04 id="trust" {...props.trust} />
        <AppDownload01 id="app" {...props.app} />
        <Faq02 id="faq" {...props.faq} />
      </main>
      <Footer05 {...props.footer} />
    </div>
  )
}

// A screenshot slot. Pass a real screenshot as the item's media later.
const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const accountCopy = {
  en: { title: "Your financing", next: "Next installment", date: "Dec 1", paid: "Installments paid", of: "of", amount: 30000, installment: 911, done: 11, total: 36 },
  ar: { title: "تمويلك الحالي", next: "القسط القادم", date: "1 ديسمبر", paid: "الأقساط المسددة", of: "من", amount: 30000, installment: 911, done: 11, total: 36 },
}

// The hero shows the product itself: one financing, its next installment and how much is repaid.
function AccountCard({ lang }: { lang: Lang }) {
  const c = accountCopy[lang]
  return (
    <div className="flex size-full items-center bg-muted p-4 sm:p-6">
      <Card className="w-full">
        <CardContent className="grid gap-3">
          <p className="text-sm text-muted-foreground">{c.title}</p>
          <p className="text-3xl font-semibold">
            <Price amount={c.amount} lang={lang} />
          </p>
          <p className="flex items-baseline justify-between gap-3 border-t pt-3 text-sm">
            <span className="text-muted-foreground">
              {c.next} <bdi>{c.date}</bdi>
            </span>
            <Price amount={c.installment} lang={lang} className="font-medium" />
          </p>
          <Progress value={Math.round((c.done / c.total) * 100)} aria-label={c.paid} className="gap-2" />
          <p className="text-xs text-muted-foreground">
            {c.paid}: <bdi>{c.done}</bdi> {c.of} <bdi>{c.total}</bdi>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

const whatsapp = "+966 50 555 0188"

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: FintechPage01Props; ar: FintechPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "ميسرة", href: "#" },
      links: [
        { label: "كيف تعمل", href: "#how", current: true },
        { label: "الحاسبة", href: "#calculator" },
        { label: "الأمان", href: "#trust" },
        { label: "الأسئلة الشائعة", href: "#faq" },
      ],
      cta: { label: "حمّل التطبيق", href: "#app" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "شركة تمويل مرخّصة من البنك المركزي السعودي",
      title: "تمويل شخصي بقسط ثابت، وأرباح تعرفها قبل أن توقّع",
      description:
        "اطلب من 5,000 إلى 100,000 ريال من جوالك، وشاهد القسط الشهري وإجمالي الأرباح قبل أن توافق. بلا ورق، وبلا رسوم إدارية.",
      primaryCta: { label: "حمّل التطبيق", href: "#app" },
      secondaryCta: { label: "احسب قسطك", href: "#calculator" },
      media: <AccountCard lang="ar" />,
    },
    steps: {
      eyebrow: "كيف تعمل",
      title: "من الطلب إلى حسابك البنكي في يوم عمل",
      description: "ثلاث خطوات من جوالك، دون زيارة فرع.",
      items: [
        {
          title: "اطلب من جوالك",
          description: "ادخل عبر نفاذ، واختر المبلغ والمدة. تظهر لك الموافقة المبدئية خلال خمس دقائق.",
          media: placeholder,
        },
        {
          title: "اعرف الربح قبل التوقيع",
          description: "نعرض لك القسط الشهري وإجمالي الأرباح وجدول السداد كاملًا قبل أن توافق، بلا رسوم مخفية.",
          media: placeholder,
        },
        {
          title: "استلم المبلغ",
          description: "بعد موافقتك يصل المبلغ إلى حسابك البنكي خلال يوم عمل، وتتابع أقساطك من التطبيق.",
          media: placeholder,
        },
      ],
    },
    calculator: {
      lang: "ar",
      eyebrow: "حاسبة التمويل",
      title: "اعرف قسطك قبل أن تطلب",
      description: "حرّك المبلغ واختر مدة السداد، وشاهد القسط الشهري وإجمالي الأرباح.",
      amount: { min: 5_000, max: 100_000, step: 1_000, default: 30_000 },
      terms: [1, 2, 3, 4, 5],
      defaultTerm: 3,
      rate: 0.059,
      cta: { label: "اطلب التمويل", href: "#app" },
      labels: calcAr,
    },
    partners: {
      title: "موظفو أكثر من 600 جهة يثقون بميسرة",
      description: "جهات حكومية وخاصة، من الرياض إلى تبوك.",
      logos: [
        { name: "مستشفيات الأفق" },
        { name: "مجموعة وعد" },
        { name: "جامعة الخليج التقنية" },
        { name: "نسمة للاتصالات" },
        { name: "مصانع الجزيرة" },
        { name: "مدارس الرواد" },
      ],
    },
    trust: {
      eyebrow: "الأمان والثقة",
      title: "أمانك قبل أي شيء آخر",
      description: "نعمل تحت رقابة البنك المركزي السعودي، ونشرح كل شروطنا بلغة واضحة.",
      cta: { label: "اطّلع على سياسة الأمان", href: "#security" },
      items: [
        {
          icon: ShieldCheckIcon,
          title: "مرخّصة ومراقَبة",
          description: "نخضع لرقابة البنك المركزي السعودي، ويظهر رقم ترخيصنا في أسفل كل صفحة.",
        },
        {
          icon: FingerprintIcon,
          title: "دخول ببصمتك",
          description: "يفتح التطبيق ببصمة الإصبع أو الوجه، ولا نحتفظ بكلمة مرورك على جوالك.",
        },
        {
          icon: FileTextIcon,
          title: "عقد في صفحة واحدة",
          description: "الأقساط والأرباح والرسوم معلنة في صفحة واحدة، تقرؤها قبل أن توقّع.",
        },
        {
          icon: BellRingingIcon,
          title: "تنبيه قبل كل قسط",
          description: "نذكّرك قبل موعد الخصم بثلاثة أيام، حتى لا يتأخر قسطك.",
        },
      ],
    },
    app: {
      lang: "ar",
      title: "ميسرة في جيبك",
      description: "اطلب تمويلك، وتابع أقساطك، وسدّد مبكرًا من التطبيق.",
      appStore: { label: "App Store", href: "#app-store" },
      googlePlay: { label: "Google Play", href: "#google-play" },
      qrValue: "https://maysara.example/app",
      rating: { value: 4.7, count: 8600 },
      labels: appAr,
    },
    faq: {
      title: "أسئلة يسألها عملاؤنا",
      description: "لم تجد إجابتك؟ اكتب لنا على واتساب.",
      items: [
        {
          id: "sharia",
          question: "هل التمويل متوافق مع أحكام الشريعة؟",
          answer: "نعم. تعتمد هيئة شرعية مستقلة عقودنا ومنتجاتنا، ويظهر اعتمادها في صفحة العقد.",
        },
        {
          id: "time",
          question: "كم يستغرق القرار؟",
          answer: "تظهر الموافقة المبدئية خلال خمس دقائق، ويصل المبلغ خلال يوم عمل من توقيعك.",
        },
        {
          id: "early",
          question: "هل أستطيع السداد مبكرًا؟",
          answer: "نعم، في أي وقت من التطبيق. تدفع المتبقي من أصل المبلغ مع أرباح المدة التي استخدمتها فقط.",
        },
        {
          id: "terms",
          question: "ما شروط الطلب؟",
          answer: "أن يكون عمرك 21 سنة فأكثر، وأن يُحوَّل راتبك إلى حساب بنكي سعودي، وأن يكون لديك حساب في نفاذ.",
        },
        {
          id: "late",
          question: "ماذا لو تأخرت عن قسط؟",
          answer: "نتواصل معك أولًا ونرتّب موعدًا جديدًا. لا نضيف أي رسوم قبل أن نسمع منك.",
        },
      ],
      whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن التمويل في ميسرة." },
      labels: faqAr,
    },
    footer: {
      brand: { name: "ميسرة", description: "تمويل شخصي رقمي في المملكة، بأرباح معلنة وقسط ثابت." },
      columns: [
        {
          title: "المنتج",
          links: [
            { label: "كيف تعمل", href: "#how" },
            { label: "حاسبة التمويل", href: "#calculator" },
            { label: "التطبيق", href: "#app" },
          ],
        },
        {
          title: "الشركة",
          links: [
            { label: "من نحن", href: "#about" },
            { label: "الهيئة الشرعية", href: "#sharia" },
            { label: "الوظائف", href: "#careers" },
          ],
        },
        {
          title: "الدعم",
          links: [
            { label: "مركز المساعدة", href: "#help" },
            { label: "الشكاوى", href: "#complaints" },
            { label: "الرسوم والأرباح", href: "#fees" },
          ],
        },
      ],
      support: {
        phone: "920 004 200",
        hours: "كل يوم، من 8 صباحًا إلى 12 منتصف الليل",
        whatsapp: { phone: whatsapp, message: "السلام عليكم، أحتاج مساعدة بخصوص حسابي في ميسرة." },
      },
      apps: [
        { store: "App Store", href: "#app-store" },
        { store: "Google Play", href: "#google-play" },
      ],
      legal: {
        text: "© 2026 شركة ميسرة للتمويل. جميع الحقوق محفوظة.",
        crNumber: "1010678901",
        vatNumber: "300067890100003",
        licence: { text: "شركة تمويل مرخّصة من البنك المركزي السعودي بترخيص رقم", number: "7/202601" },
        links: [
          { label: "الخصوصية", href: "#privacy" },
          { label: "الشروط والأحكام", href: "#terms" },
          { label: "الأمان", href: "#security" },
        ],
      },
      labels: footerAr,
    },
  },
  en: {
    navbar: {
      brand: { name: "Maysara", href: "#" },
      links: [
        { label: "How it works", href: "#how", current: true },
        { label: "Calculator", href: "#calculator" },
        { label: "Security", href: "#trust" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: { label: "Get the app", href: "#app" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "A financing company licensed by the Saudi Central Bank",
      title: "Personal financing with a fixed installment, and a profit you know before you sign",
      description:
        "Ask for SAR 5,000 to SAR 100,000 from your phone, and see the monthly installment and total profit before you agree. No paperwork, no admin fees.",
      primaryCta: { label: "Get the app", href: "#app" },
      secondaryCta: { label: "Calculate your installment", href: "#calculator" },
      media: <AccountCard lang="en" />,
    },
    steps: {
      eyebrow: "How it works",
      title: "From request to your bank account in one business day",
      description: "Three steps from your phone, with no branch visit.",
      items: [
        {
          title: "Apply from your phone",
          description: "Sign in with Nafath and choose the amount and term. You see a preliminary approval within five minutes.",
          media: placeholder,
        },
        {
          title: "Know the profit before you sign",
          description: "We show the monthly installment, the total profit and the full repayment schedule before you agree, with no hidden fees.",
          media: placeholder,
        },
        {
          title: "Receive the money",
          description: "After you agree, the money reaches your bank account within a business day, and you follow your installments in the app.",
          media: placeholder,
        },
      ],
    },
    calculator: {
      lang: "en",
      eyebrow: "Financing calculator",
      title: "Know your installment before you apply",
      description: "Move the amount, pick a term, and see the monthly installment and the total profit.",
      amount: { min: 5_000, max: 100_000, step: 1_000, default: 30_000 },
      terms: [1, 2, 3, 4, 5],
      defaultTerm: 3,
      rate: 0.059,
      cta: { label: "Apply for financing", href: "#app" },
      labels: calcEn,
    },
    partners: {
      title: "Employees of more than 600 organizations trust Maysara",
      description: "Government and private employers, from Riyadh to Tabuk.",
      logos: [
        { name: "Al-Ufuq Hospitals" },
        { name: "Wa'd Group" },
        { name: "Gulf Technical University" },
        { name: "Nasma Telecom" },
        { name: "Al-Jazeera Factories" },
        { name: "Al-Ruwad Schools" },
      ],
    },
    trust: {
      eyebrow: "Security and trust",
      title: "Your safety comes first",
      description: "We work under the supervision of the Saudi Central Bank, and we explain every term in plain language.",
      cta: { label: "Read the security policy", href: "#security" },
      items: [
        {
          icon: ShieldCheckIcon,
          title: "Licensed and supervised",
          description: "We are supervised by the Saudi Central Bank, and our licence number is at the bottom of every page.",
        },
        {
          icon: FingerprintIcon,
          title: "Sign in with your fingerprint",
          description: "The app opens with your fingerprint or face, and we never keep your password on your phone.",
        },
        {
          icon: FileTextIcon,
          title: "A contract on one page",
          description: "Installments, profit and fees are stated on one page that you read before you sign.",
        },
        {
          icon: BellRingingIcon,
          title: "A reminder before each installment",
          description: "We remind you three days before the debit date, so your installment is never late.",
        },
      ],
    },
    app: {
      lang: "en",
      title: "Maysara in your pocket",
      description: "Apply for financing, follow your installments and repay early from the app.",
      appStore: { label: "App Store", href: "#app-store" },
      googlePlay: { label: "Google Play", href: "#google-play" },
      qrValue: "https://maysara.example/app",
      rating: { value: 4.7, count: 8600 },
      labels: appEn,
    },
    faq: {
      title: "Questions our customers ask",
      description: "Did not find your answer? Write to us on WhatsApp.",
      items: [
        {
          id: "sharia",
          question: "Is the financing Sharia compliant?",
          answer: "Yes. An independent Sharia board approves our contracts and products, and its approval appears on the contract page.",
        },
        {
          id: "time",
          question: "How long does a decision take?",
          answer: "A preliminary approval appears within five minutes, and the money arrives within a business day of your signature.",
        },
        {
          id: "early",
          question: "Can I repay early?",
          answer: "Yes, at any time from the app. You pay the remaining principal plus the profit for the period you used only.",
        },
        {
          id: "terms",
          question: "What are the requirements?",
          answer: "You are 21 or older, your salary is paid into a Saudi bank account, and you have a Nafath account.",
        },
        {
          id: "late",
          question: "What if I am late on an installment?",
          answer: "We contact you first and agree on a new date. We add no fees before we hear from you.",
        },
      ],
      whatsapp: { phone: whatsapp, message: "Hello, I have a question about financing with Maysara." },
      labels: faqEn,
    },
    footer: {
      brand: { name: "Maysara", description: "Digital personal financing in the Kingdom, with a stated profit and a fixed installment." },
      columns: [
        {
          title: "Product",
          links: [
            { label: "How it works", href: "#how" },
            { label: "Financing calculator", href: "#calculator" },
            { label: "The app", href: "#app" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About us", href: "#about" },
            { label: "Sharia board", href: "#sharia" },
            { label: "Careers", href: "#careers" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help center", href: "#help" },
            { label: "Complaints", href: "#complaints" },
            { label: "Fees and profit", href: "#fees" },
          ],
        },
      ],
      support: {
        phone: "920 004 200",
        hours: "Every day, 8 AM to midnight",
        whatsapp: { phone: whatsapp, message: "Hello, I need help with my Maysara account." },
      },
      apps: [
        { store: "App Store", href: "#app-store" },
        { store: "Google Play", href: "#google-play" },
      ],
      legal: {
        text: "© 2026 Maysara Finance Co. All rights reserved.",
        crNumber: "1010678901",
        vatNumber: "300067890100003",
        licence: { text: "A financing company licensed by the Saudi Central Bank, licence no.", number: "7/202601" },
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
          { label: "Security", href: "#security" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { FintechPage01, demo }
export type { FintechPage01Props }
export default FintechPage01
