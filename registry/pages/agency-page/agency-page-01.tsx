import * as React from "react"

import { CaseStudy01 } from "@/registry/blocks/case-study/case-study-01"
import { Contact01, labelsAr as contactAr, labelsEn as contactEn } from "@/registry/blocks/contact/contact-01"
import { Footer06, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-06"
import { Hero12 } from "@/registry/blocks/hero/hero-12"
import { HowItWorks02 } from "@/registry/blocks/how-it-works/how-it-works-02"
import { LogoCloud01 } from "@/registry/blocks/logo-cloud/logo-cloud-01"
import { Navbar02, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-02"
import { Services01 } from "@/registry/blocks/services/services-01"
import { Stats05 } from "@/registry/blocks/stats/stats-05"
import { Testimonials05, labelsAr as quoteAr, labelsEn as quoteEn } from "@/registry/blocks/testimonials/testimonials-05"
import { cn } from "@/registry/lib/utils"

type AgencyPage01Props = {
  navbar: React.ComponentProps<typeof Navbar02>
  hero: React.ComponentProps<typeof Hero12>
  clients: React.ComponentProps<typeof LogoCloud01>
  services: React.ComponentProps<typeof Services01>
  work: React.ComponentProps<typeof CaseStudy01>
  process: React.ComponentProps<typeof HowItWorks02>
  stats: React.ComponentProps<typeof Stats05>
  testimonial: React.ComponentProps<typeof Testimonials05>
  contact: React.ComponentProps<typeof Contact01>
  footer: React.ComponentProps<typeof Footer06>
  className?: string
}

// Layout rhythm: centered concept hero, quiet client line, numbered service list, one wide case study,
// sticky-heading process, stat strip, one quote, brief form, wordmark footer.
// Section ids match the navbar links.
function AgencyPage01(props: AgencyPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar02 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero12 {...props.hero} />
        <LogoCloud01 {...props.clients} />
        <Services01 id="services" {...props.services} />
        <CaseStudy01 id="work" {...props.work} />
        <HowItWorks02 id="process" {...props.process} />
        <Stats05 {...props.stats} />
        <Testimonials05 {...props.testimonial} />
        <Contact01 id="contact" {...props.contact} />
      </main>
      <Footer06 {...props.footer} />
    </div>
  )
}

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: AgencyPage01Props; ar: AgencyPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "نبض", href: "#" },
      links: [
        { label: "خدماتنا", href: "#services", current: true },
        { label: "أعمالنا", href: "#work" },
        { label: "طريقتنا", href: "#process" },
        { label: "تواصل", href: "#contact" },
      ],
      cta: { label: "ابدأ مشروعك", href: "#contact" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      title: "نبض",
      description:
        "استوديو منتجات رقمية في الرياض. من الفكرة إلى الشاشة: نصمم ونبني تطبيقات ومتاجر ومنصات يستخدمها الناس كل يوم.",
      primaryCta: { label: "ابدأ مشروعك", href: "#contact" },
      secondaryCta: { label: "شاهد أعمالنا", href: "#work" },
      cards: [
        { mark: "01", title: "فريق واحد", description: "المصمم والمهندس ومدير المشروع على طاولة واحدة من اليوم الأول." },
        { mark: "02", title: "عرض كل خميس", description: "ترى ما بُني خلال الأسبوع وتعدّل مساره قبل أن يكلّفك." },
        { mark: "03", title: "سعر ثابت", description: "نحدد النطاق والسعر قبل البدء، ولا نضيف شيئًا دون موافقتك." },
        { mark: "04", title: "ملكية كاملة", description: "تتسلم الكود والتصاميم والحسابات كلها عند التسليم." },
      ],
    },
    clients: {
      title: "نبني مع فرق مثل",
      logos: [
        { name: "مسار للتمويل" },
        { name: "قهوة الجبل" },
        { name: "عيادات سدير" },
        { name: "وادي للخدمات" },
        { name: "رحلات نجد" },
        { name: "منصة بيان" },
      ],
    },
    services: {
      lang: "ar",
      eyebrow: "خدماتنا",
      title: "أربع خدمات، وفريق واحد مسؤول عن النتيجة",
      description: "تتعامل مع جهة واحدة من أول ورشة تعريف حتى أول مستخدم.",
      services: [
        {
          title: "تطبيقات الجوال",
          description: "تطبيقات آيفون وأندرويد بتجربة عربية أولًا، من النموذج الأولي حتى النشر على المتجرين.",
          href: "#contact",
        },
        {
          title: "المتاجر الإلكترونية",
          description: "متاجر مربوطة بمدى وأبل باي والشحن والفوترة، وجاهزة لموسم الجمعة البيضاء.",
          href: "#contact",
        },
        {
          title: "المنصات والأنظمة",
          description: "لوحات تحكم وأنظمة داخلية تحل محل جداول إكسل وسلاسل واتساب.",
          href: "#contact",
        },
        {
          title: "الهوية والمواقع",
          description: "هوية بصرية وموقع تعريفي يتحمل زيارات الحملات الإعلانية دون أن يتباطأ.",
          href: "#contact",
        },
      ],
    },
    work: {
      eyebrow: "أعمال مختارة",
      title: "مشروع نفخر به",
      image: { alt: "شاشات تطبيق مسار", width: 1600, height: 686 },
      client: "مسار للتمويل، الرياض",
      caseTitle: (
        <>
          تطبيق مسار: من طلب التمويل إلى التحويل في <bdi>6</bdi> دقائق
        </>
      ),
      summary:
        "أعدنا تصميم رحلة الطلب من 14 شاشة إلى 5، وبنينا التطبيق وربطناه بخدمة التحقق الوطنية خلال 11 أسبوعًا.",
      results: [
        { value: "11", label: "أسبوعًا من الورشة إلى النشر" },
        { value: "4.8", label: "تقييم المتجرين" },
        { value: "+38%", label: "في الطلبات المكتملة" },
      ],
      link: { label: "اقرأ دراسة الحالة", href: "#work" },
    },
    process: {
      lang: "ar",
      eyebrow: "طريقتنا",
      title: "من الفكرة إلى أول مستخدم في أربع مراحل",
      description: "لكل مرحلة موعد ومخرجات واضحة، فتعرف أين وصلنا في أي يوم.",
      action: { label: "ابدأ مشروعك", href: "#contact" },
      steps: [
        {
          title: "ورشة التعريف",
          description: "نجلس مع فريقك ومستخدميك، ونخرج بنطاق مكتوب وسعر ثابت وجدول زمني.",
          meta: "يومان، مجانًا",
        },
        {
          title: "التصميم",
          description: "نسلّمك نموذجًا تجرّبه من جوالك قبل كتابة أي سطر برمجي.",
          meta: (
            <>
              <bdi>3</bdi> أسابيع
            </>
          ),
        },
        {
          title: "البناء",
          description: "ننشر نسخة جديدة كل أسبوع، وتراها في عرض الخميس وتقرر ما يأتي بعدها.",
          meta: (
            <>
              من <bdi>6</bdi> إلى <bdi>10</bdi> أسابيع
            </>
          ),
        },
        {
          title: "الإطلاق والتشغيل",
          description: "نطلق ونراقب الأرقام، ونبقى معك شهرين لإصلاح أي ملاحظة دون تكلفة.",
          meta: "دعم شهرين",
        },
      ],
    },
    stats: {
      lang: "ar",
      title: "نبض بالأرقام",
      items: [
        { value: "+60", label: "منتج رقمي", context: "أطلقناها منذ 2019 لعملاء في الرياض وجدة والدمام وأبها." },
        { value: "94%", label: "من العملاء يعودون", context: "بمشروع ثانٍ خلال سنة من التسليم الأول." },
        { value: "11 أسبوعًا", label: "متوسط المشروع", context: "من ورشة التعريف حتى الإطلاق." },
        { value: "24", label: "مصممًا ومهندسًا", context: "في فريق واحد داخل مكتبنا في الرياض." },
      ],
    },
    testimonial: {
      eyebrow: "عملاؤنا",
      title: "ما يقوله من عمل معنا",
      item: {
        quote:
          "سلّمونا النسخة الأولى بعد أربعة أسابيع، وكل خميس كنا نرى التطبيق يكبر. لم نفاجأ بسعر ولا بموعد.",
        name: "فيصل المطيري",
        role: "الرئيس التنفيذي",
        company: "مسار للتمويل",
        city: "الرياض",
      },
      others: [
        { name: "هند الشمري", company: "قهوة الجبل", city: "أبها" },
        { name: "ماجد الغامدي", company: "عيادات سدير", city: "جدة" },
        { name: "ريم الدوسري", company: "وادي للخدمات", city: "الدمام" },
        { name: "سلطان العنزي", company: "رحلات نجد", city: "بريدة" },
      ],
      labels: quoteAr,
    },
    contact: {
      eyebrow: "ابدأ مشروعك",
      title: "احكِ لنا فكرتك",
      description: "اكتب نبذة قصيرة، ونرد عليك خلال يوم عمل لنحدد موعد ورشة التعريف المجانية.",
      info: [
        { type: "phone", label: "الهاتف", value: "+966 11 555 0166" },
        { type: "whatsapp", label: "واتساب", value: "+966 50 555 0166" },
        { type: "email", label: "البريد الإلكتروني", value: "hello@nabd.example" },
        { type: "address", label: "العنوان", value: "حي الملقا، طريق أنس بن مالك، الرياض" },
        { type: "hours", label: "ساعات العمل", value: "من الأحد إلى الخميس، من 9 صباحًا إلى 6 مساءً" },
      ],
      topics: [
        { value: "app", label: "تطبيق جوال" },
        { value: "store", label: "متجر إلكتروني" },
        { value: "platform", label: "منصة أو نظام" },
        { value: "brand", label: "هوية وموقع" },
      ],
      labels: contactAr,
    },
    footer: {
      wordmark: "نبض",
      links: [
        { label: "خدماتنا", href: "#services" },
        { label: "أعمالنا", href: "#work" },
        { label: "طريقتنا", href: "#process" },
        { label: "الوظائف", href: "#careers" },
        { label: "تواصل", href: "#contact" },
        { label: "الخصوصية", href: "#privacy" },
      ],
      legal: "© 2026 استوديو نبض. الرياض، المملكة العربية السعودية.",
      labels: footerAr,
    },
  },
  en: {
    navbar: {
      brand: { name: "Nabd", href: "#" },
      links: [
        { label: "Services", href: "#services", current: true },
        { label: "Work", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Contact", href: "#contact" },
      ],
      cta: { label: "Start a project", href: "#contact" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      title: "Nabd",
      description:
        "A digital product studio in Riyadh. From the idea to the screen: we design and build the apps, stores and platforms people use every day.",
      primaryCta: { label: "Start a project", href: "#contact" },
      secondaryCta: { label: "See our work", href: "#work" },
      cards: [
        { mark: "01", title: "One team", description: "The designer, the engineer and the project lead at one table from day one." },
        { mark: "02", title: "A demo every Thursday", description: "You see what was built this week and steer it before it costs you." },
        { mark: "03", title: "A fixed price", description: "We set the scope and the price before we start, and add nothing without your approval." },
        { mark: "04", title: "Full ownership", description: "You receive the code, the designs and every account at handover." },
      ],
    },
    clients: {
      title: "We build with teams like",
      logos: [
        { name: "Masar Finance" },
        { name: "Jabal Coffee" },
        { name: "Sudair Clinics" },
        { name: "Wadi Services" },
        { name: "Najd Trips" },
        { name: "Bayan Platform" },
      ],
    },
    services: {
      lang: "en",
      eyebrow: "Services",
      title: "Four services, and one team accountable for the result",
      description: "You deal with one party from the first discovery workshop to the first user.",
      services: [
        {
          title: "Mobile apps",
          description: "iPhone and Android apps with an Arabic-first experience, from prototype to release on both stores.",
          href: "#contact",
        },
        {
          title: "Online stores",
          description: "Stores connected to mada, Apple Pay, shipping and invoicing, and ready for White Friday.",
          href: "#contact",
        },
        {
          title: "Platforms and systems",
          description: "Dashboards and internal systems that replace Excel sheets and WhatsApp threads.",
          href: "#contact",
        },
        {
          title: "Brand and websites",
          description: "A visual identity and a marketing site that holds up under campaign traffic without slowing down.",
          href: "#contact",
        },
      ],
    },
    work: {
      eyebrow: "Selected work",
      title: "A project we are proud of",
      image: { alt: "Screens of the Masar app", width: 1600, height: 686 },
      client: "Masar Finance, Riyadh",
      caseTitle: (
        <>
          The Masar app: from a financing request to the transfer in <bdi>6</bdi> minutes
        </>
      ),
      summary:
        "We cut the request journey from 14 screens to 5, then built the app and connected it to the national identity check in 11 weeks.",
      results: [
        { value: "11", label: "weeks from workshop to release" },
        { value: "4.8", label: "rating on both stores" },
        { value: "+38%", label: "in completed requests" },
      ],
      link: { label: "Read the case study", href: "#work" },
    },
    process: {
      lang: "en",
      eyebrow: "Process",
      title: "From the idea to the first user in four stages",
      description: "Each stage has a date and a clear deliverable, so you know where we are on any day.",
      action: { label: "Start a project", href: "#contact" },
      steps: [
        {
          title: "Discovery workshop",
          description: "We sit with your team and your users, and leave with a written scope, a fixed price and a timeline.",
          meta: "Two days, free",
        },
        {
          title: "Design",
          description: "We hand you a prototype you can try on your phone before anyone writes a line of code.",
          meta: (
            <>
              <bdi>3</bdi> weeks
            </>
          ),
        },
        {
          title: "Build",
          description: "We ship a new version every week. You see it at the Thursday demo and decide what comes next.",
          meta: (
            <>
              <bdi>6</bdi> to <bdi>10</bdi> weeks
            </>
          ),
        },
        {
          title: "Launch and run",
          description: "We launch and watch the numbers, and stay with you for two months to fix any issue at no cost.",
          meta: "Two months of support",
        },
      ],
    },
    stats: {
      lang: "en",
      title: "Nabd in numbers",
      items: [
        { value: "+60", label: "digital products", context: "Launched since 2019 for clients in Riyadh, Jeddah, Dammam and Abha." },
        { value: "94%", label: "of clients come back", context: "With a second project within a year of the first handover." },
        { value: "11 weeks", label: "average project", context: "From the discovery workshop to launch." },
        { value: "24", label: "designers and engineers", context: "In one team, in our Riyadh office." },
      ],
    },
    testimonial: {
      eyebrow: "Clients",
      title: "What people who worked with us say",
      item: {
        quote:
          "They handed us the first version after four weeks, and every Thursday we watched the app grow. No surprise in price, no surprise in dates.",
        name: "Faisal Al-Mutairi",
        role: "Chief Executive Officer",
        company: "Masar Finance",
        city: "Riyadh",
      },
      others: [
        { name: "Hind Al-Shammari", company: "Jabal Coffee", city: "Abha" },
        { name: "Majed Al-Ghamdi", company: "Sudair Clinics", city: "Jeddah" },
        { name: "Reem Al-Dosari", company: "Wadi Services", city: "Dammam" },
        { name: "Sultan Al-Anazi", company: "Najd Trips", city: "Buraydah" },
      ],
      labels: quoteEn,
    },
    contact: {
      eyebrow: "Start a project",
      title: "Tell us your idea",
      description: "Write a short note, and we reply within a business day to set the date of your free discovery workshop.",
      info: [
        { type: "phone", label: "Phone", value: "+966 11 555 0166" },
        { type: "whatsapp", label: "WhatsApp", value: "+966 50 555 0166" },
        { type: "email", label: "Email", value: "hello@nabd.example" },
        { type: "address", label: "Address", value: "Al-Malqa, Anas Ibn Malik Road, Riyadh" },
        { type: "hours", label: "Working hours", value: "Sunday to Thursday, 9 AM to 6 PM" },
      ],
      topics: [
        { value: "app", label: "Mobile app" },
        { value: "store", label: "Online store" },
        { value: "platform", label: "Platform or system" },
        { value: "brand", label: "Brand and website" },
      ],
      labels: contactEn,
    },
    footer: {
      wordmark: "Nabd",
      links: [
        { label: "Services", href: "#services" },
        { label: "Work", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" },
        { label: "Privacy", href: "#privacy" },
      ],
      legal: "© 2026 Nabd Studio. Riyadh, Saudi Arabia.",
      labels: footerEn,
    },
  },
}

export { AgencyPage01, demo }
export type { AgencyPage01Props }
export default AgencyPage01
