import * as React from "react"
import {
  ChartLineUpIcon,
  CreditCardIcon,
  PackageIcon,
  ReceiptIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr"

import { Cta04, labelsAr as ctaAr, labelsEn as ctaEn } from "@/registry/blocks/cta/cta-04"
import { Faq02, labelsAr as faqAr, labelsEn as faqEn } from "@/registry/blocks/faq/faq-02"
import { Features03 } from "@/registry/blocks/features/features-03"
import { Features06 } from "@/registry/blocks/features/features-06"
import { Footer04, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-04"
import { Hero02 } from "@/registry/blocks/hero/hero-02"
import { Navbar04, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-04"
import { Pricing03 } from "@/registry/blocks/pricing/pricing-03"
import { Stats04 } from "@/registry/blocks/stats/stats-04"
import { Testimonials01 } from "@/registry/blocks/testimonials/testimonials-01"
import { cn } from "@/registry/lib/utils"
import { Card, CardContent } from "@/registry/ui/card"
import { Price } from "@/registry/ui/price"
import { Progress } from "@/registry/ui/progress"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"

type HomePage01Props = {
  navbar: React.ComponentProps<typeof Navbar04>
  hero: React.ComponentProps<typeof Hero02>
  stats: React.ComponentProps<typeof Stats04>
  features: React.ComponentProps<typeof Features03>
  steps: React.ComponentProps<typeof Features06>
  testimonial: React.ComponentProps<typeof Testimonials01>
  pricing: React.ComponentProps<typeof Pricing03>
  faq: React.ComponentProps<typeof Faq02>
  cta: React.ComponentProps<typeof Cta04>
  footer: React.ComponentProps<typeof Footer04>
  className?: string
}

// Layout rhythm: split hero, stat band, bento, numbered steps, one quote, one plan, split FAQ, call card, footer.
// Section ids match the navbar links.
function HomePage01(props: HomePage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar04 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero02 {...props.hero} />
        <Stats04 {...props.stats} />
        <Features03 id="features" {...props.features} />
        <Features06 id="how" {...props.steps} />
        <Testimonials01 {...props.testimonial} />
        <Pricing03 id="pricing" {...props.pricing} />
        <Faq02 id="faq" {...props.faq} />
        <Cta04 id="start" {...props.cta} />
      </main>
      <Footer04 {...props.footer} />
    </div>
  )
}

type Lang = "en" | "ar"

// The hero shows the product itself: today's sales, the monthly goal and the latest orders.
const snapshotCopy = {
  en: {
    title: "Today's sales",
    goal: "Monthly goal",
    goalValue: 200000,
    today: 12430,
    progress: 62,
    orders: [
      { name: "Fahad Al-Qahtani", number: "#10482", amount: 1250, status: "paid" },
      { name: "Noura Al-Otaibi", number: "#10481", amount: 385, status: "delivered" },
      { name: "Al-Rashed Trading", number: "#10480", amount: 4720, status: "pending" },
    ] satisfies { name: string; number: string; amount: number; status: OrderStatus }[],
  },
  ar: {
    title: "مبيعات اليوم",
    goal: "هدف الشهر",
    goalValue: 200000,
    today: 12430,
    progress: 62,
    orders: [
      { name: "فهد القحطاني", number: "#10482", amount: 1250, status: "paid" },
      { name: "نورة العتيبي", number: "#10481", amount: 385, status: "delivered" },
      { name: "مؤسسة الراشد للتجارة", number: "#10480", amount: 4720, status: "pending" },
    ] satisfies { name: string; number: string; amount: number; status: OrderStatus }[],
  },
}

function ShopSnapshot({ lang }: { lang: Lang }) {
  const c = snapshotCopy[lang]
  return (
    <div className="flex size-full flex-col gap-4 bg-muted p-4 sm:p-6">
      <Card>
        <CardContent className="grid gap-3">
          <p className="text-sm text-muted-foreground">{c.title}</p>
          <p className="text-3xl font-semibold">
            <Price amount={c.today} lang={lang} />
          </p>
          <Progress value={c.progress} aria-label={c.goal} className="gap-2" />
          <p className="flex justify-between text-sm text-muted-foreground">
            <span>{c.goal}</span>
            <span>
              <bdi>{c.progress}%</bdi> / <Price amount={c.goalValue} lang={lang} />
            </span>
          </p>
        </CardContent>
      </Card>
      <ul className="grid gap-2">
        {c.orders.map((o) => (
          <li key={o.number} className="flex items-center gap-3 rounded-lg border bg-card p-3 text-sm">
            <div className="grid min-w-0 flex-1">
              <span className="truncate font-medium">{o.name}</span>
              <bdi className="text-xs text-muted-foreground">{o.number}</bdi>
            </div>
            <Price amount={o.amount} lang={lang} className="font-medium" />
            <StatusBadge status={o.status} labels={lang === "ar" ? statusBadgeLabelsAr : undefined} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

const phone = "+966 11 555 0142"
const whatsapp = "+966 50 555 0142"

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: HomePage01Props; ar: HomePage01Props } = {
  ar: {
    navbar: {
      brand: { name: "حسبة", href: "#" },
      links: [
        { label: "المزايا", href: "#features", current: true },
        { label: "كيف تبدأ", href: "#how" },
        { label: "الأسعار", href: "#pricing" },
        { label: "الأسئلة الشائعة", href: "#faq" },
      ],
      utility: { phone, whatsapp: { phone: whatsapp, message: "السلام عليكم، أرغب في تجربة حسبة لمحلّي." } },
      cta: { label: "ابدأ مجانًا", href: "#start" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "فواتير ومخزون للمحلات والمتاجر",
      title: "فواتير محلّك ومخزونه، بلا دفاتر",
      description:
        "أصدر فاتورة ضريبية متوافقة مع هيئة الزكاة والضريبة والجمارك، وتابع مخزونك من جوالك، وأرسل الفاتورة لعميلك على واتساب.",
      primaryCta: { label: "ابدأ مجانًا", href: "#start" },
      secondaryCta: { label: "شاهد كيف تعمل", href: "#how" },
      media: <ShopSnapshot lang="ar" />,
    },
    stats: {
      lang: "ar",
      items: [
        { value: "+4,200", label: "محل ومتجر يصدرون فواتيرهم من حسبة" },
        { value: "1.2 مليون", label: "فاتورة صدرت هذا العام" },
        { value: 14, label: "مدينة في المملكة" },
        { value: "24/7", label: "دعم على واتساب" },
      ],
    },
    features: {
      eyebrow: "المزايا",
      title: "كل ما يحتاجه المحل، من الفاتورة إلى الجرد",
      description: "أدوات صغيرة وواضحة، تعمل من الجوال ومن الكمبيوتر.",
      items: [
        {
          icon: ReceiptIcon,
          span: 8,
          title: "فاتورة ضريبية في ثوانٍ",
          description:
            "رقم تسلسلي ورمز QR وفق متطلبات هيئة الزكاة والضريبة والجمارك. اطبعها أو أرسلها لعميلك برابط.",
        },
        {
          icon: PackageIcon,
          span: 4,
          title: "تنبيه قبل نفاد الصنف",
          description: "حدّد حدًا أدنى لكل صنف، ويصلك تنبيه عند الوصول إليه.",
        },
        {
          icon: ChartLineUpIcon,
          span: 4,
          title: "مبيعات اليوم في جوالك",
          description: "إجمالي اليوم ومقارنته بأمس، دون فتح الكمبيوتر.",
        },
        {
          icon: CreditCardIcon,
          span: 4,
          title: "مدى وأبل باي وفيزا",
          description: "تُسجَّل المدفوعات مع الفاتورة، ويطابق الصندوق حساب اليوم.",
        },
        {
          icon: UsersThreeIcon,
          span: 4,
          title: "صلاحية لكل موظف",
          description: "كاشير ومحاسب ومدير، وكلٌّ يرى ما يخصّه فقط.",
        },
      ],
    },
    steps: {
      lang: "ar",
      eyebrow: "كيف تبدأ",
      title: "ثلاث خطوات وتصدر أول فاتورة",
      steps: [
        { title: "سجّل محلّك", description: "أدخل اسم المنشأة والسجل التجاري والرقم الضريبي." },
        { title: "أضف أصنافك", description: "ارفع ملف إكسل بأصنافك وأسعارها، أو أضفها واحدًا واحدًا." },
        { title: "أصدر الفاتورة", description: "اختر الأصناف، واستلم الدفع، وأرسل الفاتورة لعميلك." },
      ],
    },
    testimonial: {
      title: "من يستخدم حسبة",
      item: {
        quote:
          "كنا نكتب الفواتير بخط اليد ونضيّع نصف ساعة آخر كل يوم. الآن نقفل الصندوق في خمس دقائق، والفاتورة تصل العميل على واتساب.",
        name: "منصور الدوسري",
        role: "صاحب مؤسسة لقطع الغيار، الدمام",
      },
    },
    pricing: {
      lang: "ar",
      eyebrow: "الأسعار",
      title: "باقة واحدة، بلا رسوم خفية",
      description: "جرّبها 14 يومًا مجانًا. لا نطلب بطاقة بنكية.",
      plan: {
        name: "حسبة للمحلات",
        description: "لمحل واحد أو أكثر، بعدد فواتير غير محدود.",
        price: { amount: 99, currency: "SAR" },
        priceNote: "في الشهر، شاملة ضريبة القيمة المضافة",
        features: [
          "فواتير ضريبية غير محدودة",
          "مخزون وتنبيهات نفاد الأصناف",
          "3 مستخدمين",
          "تقارير المبيعات اليومية والشهرية",
          "دعم على واتساب",
        ],
        cta: { label: "ابدأ تجربتك المجانية", href: "#start" },
      },
    },
    faq: {
      title: "أسئلة يسألها التجّار",
      description: "لم تجد إجابتك؟ اكتب لنا على واتساب.",
      items: [
        {
          id: "zatca",
          question: "هل الفواتير متوافقة مع هيئة الزكاة والضريبة والجمارك؟",
          answer: "نعم. تحمل كل فاتورة رقمًا تسلسليًا ورمز QR وفق متطلبات الهيئة.",
        },
        {
          id: "device",
          question: "هل أحتاج جهاز كاشير؟",
          answer: "لا. تعمل حسبة من الجوال أو الكمبيوتر، ويمكنك ربط طابعة حرارية إن رغبت.",
        },
        {
          id: "import",
          question: "هل أنقل أصنافي الحالية؟",
          answer: "نعم. ارفع ملف إكسل وسنرتّب الأعمدة معك.",
        },
        {
          id: "trial",
          question: "ماذا يحدث بعد انتهاء التجربة؟",
          answer: "تختار الاشتراك، أو تصدّر بياناتك وتغادر. لا نخصم منك شيئًا دون موافقتك.",
        },
        {
          id: "support",
          question: "كيف أتواصل مع الدعم؟",
          answer: "على واتساب من الأحد إلى الخميس، من 9 صباحًا إلى 6 مساءً.",
        },
      ],
      whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن حسبة." },
      labels: faqAr,
    },
    cta: {
      title: "جرّب حسبة على محلّك هذا الأسبوع",
      description: "نرد على واتساب خلال ساعات العمل، ونساعدك في نقل أصنافك وإصدار أول فاتورة.",
      contact: {
        phone: whatsapp,
        message: "السلام عليكم، أرغب في تجربة حسبة لمحلّي.",
        hours: "من الأحد إلى الخميس، من 9 صباحًا إلى 6 مساءً",
        responseTime: "نرد عادةً خلال دقائق",
      },
      labels: ctaAr,
    },
    footer: {
      brand: { name: "حسبة", description: "فواتير ومخزون للمحلات والمتاجر في المملكة." },
      columns: [
        {
          title: "المنتج",
          links: [
            { label: "المزايا", href: "#features" },
            { label: "الأسعار", href: "#pricing" },
            { label: "كيف تبدأ", href: "#how" },
          ],
        },
        {
          title: "الشركة",
          links: [
            { label: "من نحن", href: "#about" },
            { label: "الوظائف", href: "#careers" },
            { label: "المدونة", href: "#blog" },
          ],
        },
        {
          title: "المساعدة",
          links: [
            { label: "مركز المساعدة", href: "#help" },
            { label: "الأسئلة الشائعة", href: "#faq" },
            { label: "تواصل معنا", href: "#start" },
          ],
        },
      ],
      contact: {
        phone,
        email: "hello@hisba.example",
        whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن حسبة." },
      },
      legal: {
        text: "© 2026 مؤسسة حسبة للتقنية. جميع الحقوق محفوظة.",
        crNumber: "1010123456",
        vatNumber: "300012345600003",
        links: [
          { label: "الخصوصية", href: "#privacy" },
          { label: "الشروط والأحكام", href: "#terms" },
        ],
      },
      labels: footerAr,
    },
  },
  en: {
    navbar: {
      brand: { name: "Hisba", href: "#" },
      links: [
        { label: "Features", href: "#features", current: true },
        { label: "How it works", href: "#how" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
      utility: { phone, whatsapp: { phone: whatsapp, message: "Hello, I would like to try Hisba for my shop." } },
      cta: { label: "Start free", href: "#start" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "Invoicing and stock for shops and stores",
      title: "Your shop's invoices and stock, without the ledger",
      description:
        "Issue tax invoices that meet ZATCA rules, track stock from your phone, and send each invoice to your customer on WhatsApp.",
      primaryCta: { label: "Start free", href: "#start" },
      secondaryCta: { label: "See how it works", href: "#how" },
      media: <ShopSnapshot lang="en" />,
    },
    stats: {
      lang: "en",
      items: [
        { value: "+4,200", label: "shops and stores invoice with Hisba" },
        { value: "1.2M", label: "invoices issued this year" },
        { value: 14, label: "cities across the Kingdom" },
        { value: "24/7", label: "WhatsApp support" },
      ],
    },
    features: {
      eyebrow: "Features",
      title: "Everything a shop needs, from invoice to stock count",
      description: "Small, clear tools that work on your phone and your computer.",
      items: [
        {
          icon: ReceiptIcon,
          span: 8,
          title: "A tax invoice in seconds",
          description:
            "A sequential number and a QR code that meet ZATCA requirements. Print it or send your customer a link.",
        },
        {
          icon: PackageIcon,
          span: 4,
          title: "A warning before an item runs out",
          description: "Set a minimum for each item and get an alert when stock reaches it.",
        },
        {
          icon: ChartLineUpIcon,
          span: 4,
          title: "Today's sales on your phone",
          description: "Today's total next to yesterday's, without opening a computer.",
        },
        {
          icon: CreditCardIcon,
          span: 4,
          title: "mada, Apple Pay and Visa",
          description: "Payments are recorded with the invoice, so the till matches the day's books.",
        },
        {
          icon: UsersThreeIcon,
          span: 4,
          title: "Access for each employee",
          description: "Cashier, accountant and manager each see only their own part.",
        },
      ],
    },
    steps: {
      lang: "en",
      eyebrow: "How it works",
      title: "Three steps to your first invoice",
      steps: [
        { title: "Register your shop", description: "Enter the business name, commercial registration and VAT number." },
        { title: "Add your items", description: "Upload an Excel file of items and prices, or add them one by one." },
        { title: "Issue the invoice", description: "Pick the items, take payment and send the invoice to your customer." },
      ],
    },
    testimonial: {
      title: "Who uses Hisba",
      item: {
        quote:
          "We wrote invoices by hand and lost half an hour every evening. Now we close the till in five minutes, and the invoice reaches the customer on WhatsApp.",
        name: "Mansour Al-Dosari",
        role: "Owner of an auto parts shop, Dammam",
      },
    },
    pricing: {
      lang: "en",
      eyebrow: "Pricing",
      title: "One plan, no hidden fees",
      description: "Try it free for 14 days. We do not ask for a bank card.",
      plan: {
        name: "Hisba for shops",
        description: "For one shop or more, with unlimited invoices.",
        price: { amount: 99, currency: "SAR" },
        priceNote: "per month, VAT included",
        features: [
          "Unlimited tax invoices",
          "Stock and low-stock alerts",
          "3 users",
          "Daily and monthly sales reports",
          "WhatsApp support",
        ],
        cta: { label: "Start your free trial", href: "#start" },
      },
    },
    faq: {
      title: "Questions shop owners ask",
      description: "Did not find your answer? Write to us on WhatsApp.",
      items: [
        {
          id: "zatca",
          question: "Do the invoices meet ZATCA requirements?",
          answer: "Yes. Every invoice carries a sequential number and a QR code that meet the authority's requirements.",
        },
        {
          id: "device",
          question: "Do I need a till machine?",
          answer: "No. Hisba runs on your phone or computer, and you can connect a thermal printer if you like.",
        },
        {
          id: "import",
          question: "Can I move my current items over?",
          answer: "Yes. Upload an Excel file and we will line up the columns with you.",
        },
        {
          id: "trial",
          question: "What happens when the trial ends?",
          answer: "You pick a plan, or export your data and leave. We never charge you without your approval.",
        },
        {
          id: "support",
          question: "How do I reach support?",
          answer: "On WhatsApp, Sunday to Thursday, 9 AM to 6 PM.",
        },
      ],
      whatsapp: { phone: whatsapp, message: "Hello, I have a question about Hisba." },
      labels: faqEn,
    },
    cta: {
      title: "Try Hisba in your shop this week",
      description: "We reply on WhatsApp during business hours and help you move your items and issue a first invoice.",
      contact: {
        phone: whatsapp,
        message: "Hello, I would like to try Hisba for my shop.",
        hours: "Sunday to Thursday, 9 AM to 6 PM",
        responseTime: "We usually reply within minutes",
      },
      labels: ctaEn,
    },
    footer: {
      brand: { name: "Hisba", description: "Invoicing and stock for shops and stores in the Kingdom." },
      columns: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "How it works", href: "#how" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About us", href: "#about" },
            { label: "Careers", href: "#careers" },
            { label: "Blog", href: "#blog" },
          ],
        },
        {
          title: "Help",
          links: [
            { label: "Help center", href: "#help" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact us", href: "#start" },
          ],
        },
      ],
      contact: {
        phone,
        email: "hello@hisba.example",
        whatsapp: { phone: whatsapp, message: "Hello, I have a question about Hisba." },
      },
      legal: {
        text: "© 2026 Hisba Technology Est. All rights reserved.",
        crNumber: "1010123456",
        vatNumber: "300012345600003",
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { HomePage01, demo }
export type { HomePage01Props }
export default HomePage01
