import * as React from "react"

import { Cta04, labelsAr as ctaAr, labelsEn as ctaEn } from "@/registry/blocks/cta/cta-04"
import { Cta06 } from "@/registry/blocks/cta/cta-06"
import { Editorial02 } from "@/registry/blocks/editorial/editorial-02"
import { Faq03, labelsAr as faqAr, labelsEn as faqEn } from "@/registry/blocks/faq/faq-03"
import { FeatureSwitcher01 } from "@/registry/blocks/feature-switcher/feature-switcher-01"
import { Footer05, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-05"
import { Hero09, labelsAr as heroAr, labelsEn as heroEn } from "@/registry/blocks/hero/hero-09"
import { HowItWorks01 } from "@/registry/blocks/how-it-works/how-it-works-01"
import { LogoCloud05 } from "@/registry/blocks/logo-cloud/logo-cloud-05"
import { Navbar03, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-03"
import { Pricing01, labelsAr as pricingAr, labelsEn as pricingEn } from "@/registry/blocks/pricing/pricing-01"
import type { Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Card, CardContent } from "@/registry/ui/card"
import { Price } from "@/registry/ui/price"
import { StatCard, statCardLabelsAr } from "@/registry/ui/stat-card"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"

type SaasPage01Props = {
  navbar: React.ComponentProps<typeof Navbar03>
  hero: React.ComponentProps<typeof Hero09>
  logos: React.ComponentProps<typeof LogoCloud05>
  problem: React.ComponentProps<typeof Cta06>
  steps: React.ComponentProps<typeof HowItWorks01>
  features: React.ComponentProps<typeof FeatureSwitcher01>
  pricing: React.ComponentProps<typeof Pricing01>
  faq: React.ComponentProps<typeof Faq03>
  news: React.ComponentProps<typeof Editorial02>
  cta: React.ComponentProps<typeof Cta04>
  footer: React.ComponentProps<typeof Footer05>
  className?: string
}

// Layout rhythm: split hero with the product, bordered brand strip, one sentence, numbered steps,
// tab switcher, plans, tabbed FAQ, changelog list, call card, footer.
// Section ids match the navbar links.
function SaasPage01(props: SaasPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar03 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero09 {...props.hero} />
        <LogoCloud05 {...props.logos} />
        <Cta06 {...props.problem} />
        <HowItWorks01 id="how" {...props.steps} />
        <FeatureSwitcher01 id="features" {...props.features} />
        <Pricing01 id="pricing" {...props.pricing} />
        <Faq03 id="faq" {...props.faq} />
        <Editorial02 id="news" {...props.news} />
        <Cta04 id="start" {...props.cta} />
      </main>
      <Footer05 {...props.footer} />
    </div>
  )
}

const panelCopy = {
  en: {
    orders: [
      { name: "Abdullah Al-Harbi", number: "360243", amount: 1240, status: "pending" },
      { name: "Noura Al-Qahtani", number: "360242", amount: 385, status: "shipped" },
      { name: "Sara Al-Otaibi", number: "360241", amount: 2150, status: "delivered" },
    ] satisfies { name: string; number: string; amount: number; status: OrderStatus }[],
    carriers: [
      { name: "Aramex", eta: "Tomorrow", amount: 22 },
      { name: "SMSA", eta: "2 days", amount: 18 },
      { name: "Your own couriers", eta: "Same day", amount: 12 },
    ],
    carrierTitle: "Pick a carrier for this order",
    sales: "Sales this week",
    orderCount: "Orders",
  },
  ar: {
    orders: [
      { name: "عبدالله الحربي", number: "360243", amount: 1240, status: "pending" },
      { name: "نورة القحطاني", number: "360242", amount: 385, status: "shipped" },
      { name: "سارة العتيبي", number: "360241", amount: 2150, status: "delivered" },
    ] satisfies { name: string; number: string; amount: number; status: OrderStatus }[],
    carriers: [
      { name: "أرامكس", eta: "غدًا", amount: 22 },
      { name: "سمسا", eta: "يومان", amount: 18 },
      { name: "مندوبوك", eta: "اليوم نفسه", amount: 12 },
    ],
    carrierTitle: "اختر شركة الشحن لهذا الطلب",
    sales: "مبيعات الأسبوع",
    orderCount: "الطلبات",
  },
}

function OrdersPanel({ lang }: { lang: Lang }) {
  const c = panelCopy[lang]
  return (
    <Card>
      <CardContent className="grid gap-1">
        {c.orders.map((o) => (
          <div key={o.number} className="flex items-center gap-3 border-b py-3 text-sm first:pt-0 last:border-b-0 last:pb-0">
            <div className="grid min-w-0 flex-1">
              <span className="truncate font-medium">{o.name}</span>
              <bdi dir="ltr" className="text-xs text-muted-foreground">{`#${o.number}`}</bdi>
            </div>
            <Price amount={o.amount} lang={lang} className="font-medium" />
            <StatusBadge status={o.status} labels={lang === "ar" ? statusBadgeLabelsAr : undefined} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ShippingPanel({ lang }: { lang: Lang }) {
  const c = panelCopy[lang]
  return (
    <Card>
      <CardContent className="grid gap-1">
        <p className="border-b pb-3 text-sm font-medium">{c.carrierTitle}</p>
        {c.carriers.map((carrier) => (
          <div key={carrier.name} className="flex items-center justify-between gap-3 border-b py-3 text-sm last:border-b-0 last:pb-0">
            <div className="grid">
              <span className="font-medium">{carrier.name}</span>
              <span className="text-xs text-muted-foreground">{carrier.eta}</span>
            </div>
            <Price amount={carrier.amount} lang={lang} className="font-medium" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ReportPanel({ lang }: { lang: Lang }) {
  const c = panelCopy[lang]
  const labels = lang === "ar" ? statCardLabelsAr : undefined
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <StatCard
        label={c.sales}
        value={<Price amount={61420} lang={lang} />}
        delta={12.4}
        spark={[4, 6, 5, 8, 7, 11, 12]}
        lang={lang}
        labels={labels}
      />
      <StatCard label={c.orderCount} value={174} delta={8.1} spark={[3, 4, 4, 6, 5, 7, 8]} lang={lang} labels={labels} />
    </div>
  )
}

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

const whatsapp = "+966 50 555 0173"

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: SaasPage01Props; ar: SaasPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "بسطة", href: "#" },
      links: [
        {
          label: "المنصة",
          href: "#features",
          children: [
            { label: "كيف تبدأ", href: "#how", description: "ثلاث خطوات إلى أول طلب." },
            { label: "الطلبات والشحن والتقارير", href: "#features", description: "كل ما يخص متجرك في لوحة واحدة." },
            { label: "المستجدات", href: "#news", description: "ما أضفناه خلال الأشهر الأخيرة." },
          ],
        },
        { label: "الأسعار", href: "#pricing" },
        { label: "الأسئلة الشائعة", href: "#faq" },
      ],
      cta: { label: "افتح متجرك مجانًا", href: "#start" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      lang: "ar",
      eyebrow: (
        <>
          <bdi>+3,800</bdi> متجر سعودي يبيع على بسطة
        </>
      ),
      title: "منصة واحدة، من أول منتج إلى آلاف الطلبات",
      description:
        "افتح متجرك بالعربية والإنجليزية، واربط مدى وأبل باي وشركات الشحن، وتابع طلباتك ومخزونك وفواتيرك من لوحة واحدة.",
      primaryCta: { label: "افتح متجرك مجانًا", href: "#start" },
      secondaryCta: { label: "قارن الباقات", href: "#pricing" },
      dashboard: {
        title: "ملخص مبيعات الأسبوع",
        sales: { amount: 61420, delta: 12.4, spark: [12, 18, 15, 24, 22, 31, 29, 38] },
        orders: { value: 174, delta: 8.1 },
        goal: { current: 61420, target: 80000 },
        recent: [
          { id: "360243", customer: "عبدالله الحربي", amount: 1240, status: "pending", when: "منذ 23 دقيقة" },
          { id: "360242", customer: "نورة القحطاني", amount: 385, status: "shipped", when: "منذ ساعة" },
          { id: "360241", customer: "سارة العتيبي", amount: 2150, status: "delivered", when: "منذ ساعتين" },
        ],
      },
      store: {
        name: "بن سدير",
        products: [
          { name: "بن يمني فاخر 250 جم", price: 68, compareAt: 80 },
          { name: "دلة قهوة نحاسية", price: 189 },
        ],
      },
      labels: { ...heroAr, preview: "معاينة للوحة تحكم بسطة ومتجر" },
    },
    logos: {
      title: "أكثر من 3,800 متجر يبيع على بسطة، من الخبر إلى جازان",
      brands: [
        { name: "بن سدير" },
        { name: "عطور الندى" },
        { name: "حلويات القصيم" },
        { name: "تمور العُلا" },
        { name: "مفروشات دار" },
        { name: "أزياء رِفعة" },
        { name: "مكتبة الجبل" },
        { name: "مسك وعنبر" },
      ],
    },
    problem: {
      title: "أغلب التجّار يدبّرون متاجرهم بين واتساب وإكسل وثلاثة مواقع للشحن. بسطة تجمعها في شاشة واحدة.",
      cta: { label: "جرّبها 14 يومًا مجانًا", href: "#start" },
    },
    steps: {
      lang: "ar",
      eyebrow: "كيف تبدأ",
      title: "ثلاث خطوات إلى أول طلب",
      steps: [
        {
          title: "أنشئ متجرك",
          description: "اختر قالبًا واكتب اسم متجرك، ونربط نطاقك ونجهّز صفحة الدفع نيابةً عنك.",
          duration: "10 دقائق",
        },
        {
          title: "اربط الدفع والشحن",
          description: "مدى وأبل باي وفيزا، مع أرامكس وسمسا ومندوبيك، دون عقود منفصلة مع كل جهة.",
          duration: "خلال يوم عمل",
        },
        {
          title: "استقبل أول طلب",
          description: "يصلك إشعار على جوالك، وتصدر الفاتورة الضريبية تلقائيًا وتصل عميلك على واتساب.",
          duration: "من أول يوم",
        },
      ],
    },
    features: {
      lang: "ar",
      eyebrow: "المنصة",
      title: "كل ما يخص المتجر في مكان واحد",
      description: "ثلاث شاشات تغنيك عن عشرة تطبيقات.",
      items: [
        {
          id: "orders",
          title: "الطلبات",
          description: "كل طلب بحالته، من الدفع حتى التسليم، وتغيّر الحالة بضغطة واحدة.",
          panel: <OrdersPanel lang="ar" />,
        },
        {
          id: "shipping",
          title: "الشحن",
          description: "قارن أسعار شركات الشحن قبل أن تؤكد الطلب، وأرسل رابط التتبع لعميلك تلقائيًا.",
          panel: <ShippingPanel lang="ar" />,
        },
        {
          id: "reports",
          title: "التقارير",
          description: "مبيعات اليوم والأسبوع بالريال، جاهزة قبل اجتماع الصباح.",
          panel: <ReportPanel lang="ar" />,
        },
      ],
    },
    pricing: {
      lang: "ar",
      eyebrow: "الأسعار",
      title: "ثلاث باقات، وتنمو معك",
      description: "ابدأ بالباقة الصغيرة، وانتقل إلى الأكبر متى احتجت. لا رسوم على المبيعات.",
      periods: [
        { id: "month", label: "شهري" },
        { id: "year", label: "سنوي", discountLabel: "وفّر 17%" },
      ],
      plans: [
        {
          id: "start",
          name: "الانطلاقة",
          description: "لمن يبيع أول منتجاته",
          price: { month: { amount: 99, currency: "SAR" }, year: { amount: 990, currency: "SAR" } },
          priceNote: "السعر لا يشمل ضريبة القيمة المضافة",
          features: ["حتى 100 منتج", "مدى وأبل باي وفيزا", "فاتورة ضريبية لكل طلب", "دعم عبر البريد"],
          cta: { label: "ابدأ مجانًا", href: "#start" },
        },
        {
          id: "growth",
          name: "النمو",
          description: "للمتاجر التي تبيع كل يوم",
          price: { month: { amount: 249, currency: "SAR" }, year: { amount: 2490, currency: "SAR" } },
          priceNote: "السعر لا يشمل ضريبة القيمة المضافة",
          features: ["منتجات غير محدودة", "ثلاث شركات شحن أو أكثر", "تقسيط عبر تابي وتمارا", "تقارير متقدمة", "دعم على واتساب"],
          cta: { label: "ابدأ مجانًا", href: "#start" },
          highlighted: true,
          badge: "الأكثر طلبًا",
        },
        {
          id: "business",
          name: "الشركات",
          description: "للمتاجر متعددة الفروع",
          price: null,
          priceNote: "سعر حسب حجمك",
          features: ["عدد مستخدمين غير محدود", "ربط مع نظامك المحاسبي", "مدير حساب مخصص", "اتفاقية مستوى الخدمة"],
          cta: { label: "تواصل مع المبيعات", href: "#start" },
        },
      ],
      labels: pricingAr,
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "أسئلة يسألها التجّار قبل أن يبدؤوا",
      description: "اختر موضوعًا لترى الإجابات.",
      categories: [
        {
          id: "payment",
          label: "الدفع والشحن",
          items: [
            {
              id: "fees",
              question: "هل تأخذون عمولة على المبيعات؟",
              answer: "لا. تدفع اشتراكك الشهري فقط، وتخصم بوابة الدفع رسومها المعلنة من كل عملية.",
            },
            {
              id: "carriers",
              question: "هل أستخدم مندوبيني الخاصين؟",
              answer: "نعم. أضفهم كشركة شحن، وحدّد أسعار التوصيل لكل مدينة.",
            },
          ],
        },
        {
          id: "setup",
          label: "الإعداد",
          items: [
            {
              id: "time",
              question: "كم يستغرق نقل منتجاتي من متجري الحالي؟",
              answer: "ارفع ملف إكسل بمنتجاتك، وينقلها فريقنا مع الصور خلال يوم عمل.",
            },
            {
              id: "domain",
              question: "هل أستخدم نطاقي الخاص؟",
              answer: "نعم. نربطه لك ونفعّل شهادة الأمان دون تكلفة إضافية.",
            },
          ],
        },
        {
          id: "support",
          label: "الدعم",
          items: [
            {
              id: "hours",
              question: "متى أصل إلى الدعم؟",
              answer: "على واتساب من الأحد إلى الخميس، من 9 صباحًا إلى 9 مساءً، وفي موسم الجمعة البيضاء على مدار الساعة.",
            },
          ],
        },
      ],
      contactText: "ما زال لديك سؤال؟",
      contactCta: { label: "تحدث مع فريقنا", href: "#start" },
      labels: faqAr,
    },
    news: {
      lang: "ar",
      eyebrow: "المستجدات",
      title: "ما الجديد في بسطة",
      items: [
        {
          title: "الفوترة الإلكترونية: المرحلة الثانية",
          summary: "ربط تلقائي مع منصة فاتورة، فلا تحتاج إلى أي خطوة من جانبك.",
          href: "#news",
        },
        {
          title: "ثلاث شركات شحن جديدة",
          summary: "قارن أسعارها وأوقات التسليم قبل أن تؤكد الطلب.",
          href: "#news",
        },
        {
          title: "تقسيط الطلبات عبر تابي وتمارا",
          summary: "يظهر الخيار في صفحة الدفع، وتصلك قيمة الطلب كاملة.",
          href: "#news",
        },
        {
          title: "تطبيق بسطة للتجّار",
          summary: "اعتمد الطلبات وراجع المبيعات من جوالك على آيفون وأندرويد.",
          href: "#news",
        },
      ],
    },
    cta: {
      title: "جرّب بسطة على متجرك هذا الأسبوع",
      description: "نرد على واتساب خلال ساعات العمل، ونساعدك في نقل منتجاتك وتجهيز أول طلب.",
      contact: {
        phone: whatsapp,
        message: "السلام عليكم، أرغب في تجربة بسطة لمتجري.",
        hours: "من الأحد إلى الخميس، من 9 صباحًا إلى 9 مساءً",
        responseTime: "نرد عادةً خلال دقائق",
      },
      labels: ctaAr,
    },
    footer: {
      brand: { name: "بسطة", description: "منصة المتاجر الإلكترونية للتجّار في المملكة، بالعربية أولًا." },
      columns: [
        {
          title: "المنصة",
          links: [
            { label: "كيف تبدأ", href: "#how" },
            { label: "الأسعار", href: "#pricing" },
            { label: "المستجدات", href: "#news" },
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
          title: "المطوّرون",
          links: [
            { label: "التوثيق", href: "#docs" },
            { label: "حالة الخدمة", href: "#status" },
          ],
        },
        {
          title: "الدعم",
          links: [
            { label: "مركز المساعدة", href: "#help" },
            { label: "الأسئلة الشائعة", href: "#faq" },
            { label: "تواصل معنا", href: "#start" },
          ],
        },
      ],
      support: {
        phone: "920 004 100",
        hours: "من الأحد إلى الخميس، من 9 صباحًا إلى 9 مساءً",
        whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن بسطة." },
      },
      legal: {
        text: "© 2026 شركة بسطة للتقنية. جميع الحقوق محفوظة.",
        crNumber: "1010456123",
        vatNumber: "300045612300003",
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
      brand: { name: "Basta", href: "#" },
      links: [
        {
          label: "Platform",
          href: "#features",
          children: [
            { label: "How it works", href: "#how", description: "Three steps to your first order." },
            { label: "Orders, shipping and reports", href: "#features", description: "Everything about your store in one dashboard." },
            { label: "What's new", href: "#news", description: "What we shipped in recent months." },
          ],
        },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: { label: "Open your store free", href: "#start" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      lang: "en",
      eyebrow: (
        <>
          <bdi>+3,800</bdi> Saudi stores sell on Basta
        </>
      ),
      title: "One platform, from your first product to thousands of orders",
      description:
        "Open your store in Arabic and English, connect mada, Apple Pay and shipping companies, and follow orders, stock and invoices from one dashboard.",
      primaryCta: { label: "Open your store free", href: "#start" },
      secondaryCta: { label: "Compare plans", href: "#pricing" },
      dashboard: {
        title: "This week's sales summary",
        sales: { amount: 61420, delta: 12.4, spark: [12, 18, 15, 24, 22, 31, 29, 38] },
        orders: { value: 174, delta: 8.1 },
        goal: { current: 61420, target: 80000 },
        recent: [
          { id: "360243", customer: "Abdullah Al-Harbi", amount: 1240, status: "pending", when: "23 minutes ago" },
          { id: "360242", customer: "Noura Al-Qahtani", amount: 385, status: "shipped", when: "1 hour ago" },
          { id: "360241", customer: "Sara Al-Otaibi", amount: 2150, status: "delivered", when: "2 hours ago" },
        ],
      },
      store: {
        name: "Sudair Coffee",
        products: [
          { name: "Premium Yemeni coffee 250 g", price: 68, compareAt: 80 },
          { name: "Copper coffee pot", price: 189 },
        ],
      },
      labels: { ...heroEn, preview: "Preview of the Basta dashboard and a store" },
    },
    logos: {
      title: "More than 3,800 stores sell on Basta, from Khobar to Jazan",
      brands: [
        { name: "Sudair Coffee" },
        { name: "Al-Nada Perfumes" },
        { name: "Qassim Sweets" },
        { name: "AlUla Dates" },
        { name: "Dar Furnishings" },
        { name: "Rifaa Fashion" },
        { name: "Al-Jabal Books" },
        { name: "Musk and Amber" },
      ],
    },
    problem: {
      title: "Most merchants run their store across WhatsApp, Excel and three shipping sites. Basta puts them on one screen.",
      cta: { label: "Try it free for 14 days", href: "#start" },
    },
    steps: {
      lang: "en",
      eyebrow: "How it works",
      title: "Three steps to your first order",
      steps: [
        {
          title: "Create your store",
          description: "Pick a template and enter your store name. We connect your domain and set up checkout for you.",
          duration: "10 minutes",
        },
        {
          title: "Connect payment and shipping",
          description: "mada, Apple Pay and Visa, with Aramex, SMSA and your own couriers, and no separate contract with each.",
          duration: "Within a business day",
        },
        {
          title: "Receive your first order",
          description: "You get a notification on your phone, and the tax invoice is issued and sent to your customer on WhatsApp.",
          duration: "From day one",
        },
      ],
    },
    features: {
      lang: "en",
      eyebrow: "Platform",
      title: "Everything about your store in one place",
      description: "Three screens that replace ten apps.",
      items: [
        {
          id: "orders",
          title: "Orders",
          description: "Every order with its status, from payment to delivery, and you change the status in one tap.",
          panel: <OrdersPanel lang="en" />,
        },
        {
          id: "shipping",
          title: "Shipping",
          description: "Compare carrier prices before you confirm an order, and send your customer the tracking link automatically.",
          panel: <ShippingPanel lang="en" />,
        },
        {
          id: "reports",
          title: "Reports",
          description: "Today's and this week's sales in riyals, ready before the morning meeting.",
          panel: <ReportPanel lang="en" />,
        },
      ],
    },
    pricing: {
      lang: "en",
      eyebrow: "Pricing",
      title: "Three plans that grow with you",
      description: "Start on the small plan and move up when you need to. No fee on your sales.",
      periods: [
        { id: "month", label: "Monthly" },
        { id: "year", label: "Yearly", discountLabel: "Save 17%" },
      ],
      plans: [
        {
          id: "start",
          name: "Start",
          description: "For selling your first products",
          price: { month: { amount: 99, currency: "SAR" }, year: { amount: 990, currency: "SAR" } },
          priceNote: "Price excludes VAT",
          features: ["Up to 100 products", "mada, Apple Pay and Visa", "A tax invoice for every order", "Email support"],
          cta: { label: "Start free", href: "#start" },
        },
        {
          id: "growth",
          name: "Growth",
          description: "For stores that sell every day",
          price: { month: { amount: 249, currency: "SAR" }, year: { amount: 2490, currency: "SAR" } },
          priceNote: "Price excludes VAT",
          features: ["Unlimited products", "Three or more shipping companies", "Installments with Tabby and Tamara", "Advanced reports", "WhatsApp support"],
          cta: { label: "Start free", href: "#start" },
          highlighted: true,
          badge: "Most popular",
        },
        {
          id: "business",
          name: "Business",
          description: "For multi-branch stores",
          price: null,
          priceNote: "Price based on your size",
          features: ["Unlimited users", "Connection to your accounting system", "A dedicated account manager", "Service level agreement"],
          cta: { label: "Talk to sales", href: "#start" },
        },
      ],
      labels: pricingEn,
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions merchants ask before they start",
      description: "Pick a topic to see the answers.",
      categories: [
        {
          id: "payment",
          label: "Payment and shipping",
          items: [
            {
              id: "fees",
              question: "Do you take a commission on sales?",
              answer: "No. You pay your monthly plan only, and the payment gateway deducts its published fee from each transaction.",
            },
            {
              id: "carriers",
              question: "Can I use my own couriers?",
              answer: "Yes. Add them as a shipping company and set the delivery price for each city.",
            },
          ],
        },
        {
          id: "setup",
          label: "Setup",
          items: [
            {
              id: "time",
              question: "How long does it take to move my products from my current store?",
              answer: "Upload an Excel file of your products, and our team moves them with their photos within a business day.",
            },
            {
              id: "domain",
              question: "Can I use my own domain?",
              answer: "Yes. We connect it and turn on the security certificate at no extra cost.",
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
              answer: "On WhatsApp, Sunday to Thursday, 9 AM to 9 PM, and around the clock during White Friday.",
            },
          ],
        },
      ],
      contactText: "Still have a question?",
      contactCta: { label: "Talk to our team", href: "#start" },
      labels: faqEn,
    },
    news: {
      lang: "en",
      eyebrow: "What's new",
      title: "What's new in Basta",
      items: [
        {
          title: "E-invoicing: phase two",
          summary: "A direct link to the Fatoora platform, so you take no step on your side.",
          href: "#news",
        },
        {
          title: "Three new shipping companies",
          summary: "Compare their prices and delivery times before you confirm an order.",
          href: "#news",
        },
        {
          title: "Installments with Tabby and Tamara",
          summary: "The option appears at checkout, and you receive the full order value.",
          href: "#news",
        },
        {
          title: "The Basta app for merchants",
          summary: "Approve orders and review sales from your phone on iPhone and Android.",
          href: "#news",
        },
      ],
    },
    cta: {
      title: "Try Basta on your store this week",
      description: "We reply on WhatsApp during business hours and help you move your products and prepare a first order.",
      contact: {
        phone: whatsapp,
        message: "Hello, I would like to try Basta for my store.",
        hours: "Sunday to Thursday, 9 AM to 9 PM",
        responseTime: "We usually reply within minutes",
      },
      labels: ctaEn,
    },
    footer: {
      brand: { name: "Basta", description: "The online store platform for merchants in the Kingdom, Arabic first." },
      columns: [
        {
          title: "Platform",
          links: [
            { label: "How it works", href: "#how" },
            { label: "Pricing", href: "#pricing" },
            { label: "What's new", href: "#news" },
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
          title: "Developers",
          links: [
            { label: "Docs", href: "#docs" },
            { label: "Service status", href: "#status" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help center", href: "#help" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact us", href: "#start" },
          ],
        },
      ],
      support: {
        phone: "920 004 100",
        hours: "Sunday to Thursday, 9 AM to 9 PM",
        whatsapp: { phone: whatsapp, message: "Hello, I have a question about Basta." },
      },
      legal: {
        text: "© 2026 Basta Technology Co. All rights reserved.",
        crNumber: "1010456123",
        vatNumber: "300045612300003",
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { SaasPage01, demo }
export type { SaasPage01Props }
export default SaasPage01
