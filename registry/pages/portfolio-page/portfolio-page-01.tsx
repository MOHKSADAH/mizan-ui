import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import { CaseStudy01 } from "@/registry/blocks/case-study/case-study-01"
import { Contact01, labelsAr as contactAr, labelsEn as contactEn } from "@/registry/blocks/contact/contact-01"
import { Editorial01 } from "@/registry/blocks/editorial/editorial-01"
import { Faq03, labelsAr as faqAr, labelsEn as faqEn } from "@/registry/blocks/faq/faq-03"
import { Footer06, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-06"
import { Hero02 } from "@/registry/blocks/hero/hero-02"
import { Navbar02, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-02"
import { ProjectGrid01, labelsAr as worksAr, labelsEn as worksEn } from "@/registry/blocks/project-grid/project-grid-01"
import { Services01 } from "@/registry/blocks/services/services-01"
import { Stats04 } from "@/registry/blocks/stats/stats-04"
import { Testimonials05, labelsAr as clientsAr, labelsEn as clientsEn } from "@/registry/blocks/testimonials/testimonials-05"
import { cn } from "@/registry/lib/utils"
import { whatsappUrl } from "@/registry/lib/whatsapp"

type PortfolioPage01Props = {
  navbar: React.ComponentProps<typeof Navbar02>
  hero: React.ComponentProps<typeof Hero02>
  stats: React.ComponentProps<typeof Stats04>
  caseStudy: React.ComponentProps<typeof CaseStudy01>
  works: React.ComponentProps<typeof ProjectGrid01>
  services: React.ComponentProps<typeof Services01>
  clients: React.ComponentProps<typeof Testimonials05>
  journal: React.ComponentProps<typeof Editorial01>
  faq: React.ComponentProps<typeof Faq03>
  contact: React.ComponentProps<typeof Contact01>
  footer: React.ComponentProps<typeof Footer06>
  className?: string
}

// Layout rhythm: split hero, number strip, one full case study, three work cards, a numbered package list,
// one client quote, an article list, tabbed answers, the brief form, wordmark footer. Section ids match the navbar links.
function PortfolioPage01(props: PortfolioPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar02 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero02 {...props.hero} />
        <Stats04 {...props.stats} />
        <CaseStudy01 id="work" {...props.caseStudy} />
        <ProjectGrid01 id="more-work" {...props.works} />
        <Services01 id="services" {...props.services} />
        <Testimonials05 id="clients" {...props.clients} />
        <Editorial01 id="journal" {...props.journal} />
        <Faq03 id="faq" {...props.faq} />
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

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const photo = (alt: string, width = 800, height = 600) => ({ alt, width, height })

const phone = "+966 12 555 0476"
const whatsapp = "+966 50 555 0476"

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: PortfolioPage01Props; ar: PortfolioPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "سلمى باعشن", href: "#" },
      links: [
        { label: "الأعمال", href: "#work", current: true },
        { label: "الباقات", href: "#services" },
        { label: "المدونة", href: "#journal" },
        { label: "الأسئلة", href: "#faq" },
      ],
      cta: { label: "ابدأ مشروعك", href: "#contact" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "مصممة هويات بصرية · جدة",
      title: "هوية علامتك تُسلَّم في ستة أسابيع، لا في ستة أشهر",
      description:
        "أعمل مع أصحاب المطاعم والمتاجر والمكاتب في جدة: اسم وشعار ودليل استخدام وملفات جاهزة للطباعة، بجدول أسبوعي مكتوب قبل أن نبدأ.",
      primaryCta: { label: "ابدأ مشروعك", href: "#contact" },
      secondaryCta: { label: "شاهد الأعمال", href: "#work" },
      media: placeholder,
    },
    stats: {
      lang: "ar",
      items: [
        { value: "+60", label: "علامة أطلقتها في جدة والحجاز" },
        { value: "6 أسابيع", label: "متوسط تسليم الهوية الكاملة" },
        { value: "92%", label: "من العملاء يطلبون مشروعًا ثانيًا" },
        { value: "9 سنوات", label: "في تصميم العلامات التجارية" },
      ],
    },
    caseStudy: {
      eyebrow: "عمل مختار",
      title: "أحدث ما سلّمته",
      image: photo("أكواب وقوائم قهوة المعبر على طاولة", 1200, 900),
      client: "قهوة المعبر، جدة",
      caseTitle: <>قهوة المعبر: ثلاثة فروع بهوية واحدة في <bdi>4</bdi> أسابيع</>,
      summary:
        "ثلاثة فروع في جدة بثلاثة شعارات مختلفة. وحّدنا الاسم والألوان والخط العربي، وصممنا الأكواب والقوائم وواجهة الفرع، وسلّمنا الملفات للمطبعة في الأسبوع الرابع.",
      results: [
        { value: "4", label: "أسابيع من الاجتماع الأول إلى التسليم" },
        { value: "3", label: "فروع بهوية واحدة" },
        { value: "+35%", label: "متابعون جدد على إنستغرام في شهرين" },
      ],
      link: { label: "اقرأ دراسة الحالة", href: "#case" },
    },
    works: {
      lang: "ar",
      eyebrow: "المزيد من الأعمال",
      title: "من الهوية إلى اللوحة على الباب",
      projects: [
        { id: "salla-restaurants", name: "مطاعم السلة", city: "جدة", type: "هوية مطعم", status: "2026", image: photo("قائمة طعام مطاعم السلة") },
        { id: "rashed-law", name: "مكتب الراشد للمحاماة", city: "مكة المكرمة", type: "هوية ولوحات إرشادية", status: "2026", image: photo("لوحة مدخل مكتب الراشد") },
        { id: "abeer-perfumes", name: "عطور عبير", city: "الطائف", type: "تغليف", status: "2025", image: photo("علب عطور عبير") },
      ],
      labels: worksAr,
    },
    services: {
      lang: "ar",
      eyebrow: "الباقات",
      title: "ثلاث باقات بسعر ثابت",
      description: "الأسعار شاملة ضريبة القيمة المضافة. تدفع 50% عند البدء والباقي عند التسليم.",
      services: [
        { title: "هوية سريعة · 9,500 ريال", description: "اسم الشعار ولوحة ألوان وخطوط وقوالب للتواصل الاجتماعي، في ثلاثة أسابيع مع جولة تعديل واحدة.", href: "#contact" },
        { title: "هوية كاملة · 22,000 ريال", description: "الشعار ودليل الاستخدام والمطبوعات والتغليف، في ستة أسابيع مع جولتي تعديل.", href: "#contact" },
        { title: "شريكة العلامة · 4,500 ريال شهريًا", description: "تصاميم شهرية، ومتابعة الطباعة، وحماية هوية فروعك من التشتت. بعقد لثلاثة أشهر.", href: "#contact" },
      ],
    },
    clients: {
      eyebrow: "العملاء",
      title: "ماذا قالوا عند التسليم",
      item: {
        quote: "سلّمتنا الهوية في الموعد الذي كتبته في العقد، وما رجعنا لها إلا لنطلب مشروعًا ثانيًا.",
        name: "يوسف الجفري",
        role: "المؤسس",
        company: "قهوة المعبر",
        city: "جدة",
      },
      others: [
        { name: "هيفاء الصبحي", company: "مطاعم السلة", city: "جدة" },
        { name: "ماجد الراشد", company: "مكتب الراشد للمحاماة", city: "مكة المكرمة" },
        { name: "عبير القرشي", company: "عطور عبير", city: "الطائف" },
        { name: "طلال بحر", company: "أكاديمية بحر", city: "جدة" },
      ],
      labels: clientsAr,
    },
    journal: {
      lang: "ar",
      eyebrow: "المدونة",
      title: "ملاحظات من الاستوديو",
      action: { label: "كل المقالات", href: "#journal" },
      lead: {
        id: "logo-cost",
        title: "كم يجب أن يكلّف الشعار؟ أرقام من ستين مشروعًا في جدة",
        image: photo("مخططات شعار على مكتب", 1200, 800),
        author: "سلمى باعشن",
        program: "الأسعار",
        date: "2026-11-14",
      },
      items: [
        { id: "menu-mistakes", title: "خمسة أخطاء في تصميم قائمة المطعم", image: photo(""), author: "سلمى باعشن", program: "الطباعة", date: "2026-11-02" },
        { id: "design-brief", title: "كيف تكتب طلب تصميم لا يحتاج ثلاث جولات تعديل", image: photo(""), author: "سلمى باعشن", program: "العمل مع مصمم", date: "2026-10-20" },
        { id: "arabic-type", title: "الخط العربي على الشاشة: ما الذي نجح في 2026", image: photo(""), author: "سلمى باعشن", program: "الخطوط", date: "2026-10-08" },
      ],
    },
    faq: {
      eyebrow: "أسئلة",
      title: "قبل أن تبدأ",
      description: "اختر موضوعًا لتقرأ ما يسألني عنه العملاء قبل التعاقد.",
      categories: [
        {
          id: "price",
          label: "السعر والدفع",
          items: [
            { id: "vat", question: "هل الأسعار شاملة الضريبة؟", answer: "نعم. 9,500 ريال تعني 9,500 ريال بعد ضريبة القيمة المضافة، وتصلك فاتورة ضريبية مع كل دفعة." },
            { id: "pay", question: "كيف يتم الدفع؟", answer: "50% عند البدء و50% عند التسليم، بتحويل بنكي أو بمدى." },
          ],
        },
        {
          id: "schedule",
          label: "الجدول والتعديلات",
          items: [
            { id: "late", question: "هل ألتزم بالموعد؟", answer: "نعم، التاريخ مكتوب في العقد، وإن تأخرتُ أخصم 5% من السعر عن كل أسبوع تأخير." },
            { id: "rounds", question: "كم جولة تعديل تشمل الباقة؟", answer: "جولة واحدة في الهوية السريعة وجولتان في الكاملة. الجولة الإضافية بـ 800 ريال." },
          ],
        },
        {
          id: "files",
          label: "الملفات والحقوق",
          items: [
            { id: "deliver", question: "ماذا أستلم في النهاية؟", answer: "ملفات الشعار بكل الصيغ (SVG وPDF وPNG)، ودليل استخدام، وخطوط مرخّصة لاستخدامك التجاري." },
            { id: "rights", question: "هل أملك حقوق التصميم؟", answer: "نعم، تنتقل الملكية الكاملة إليك عند سداد الدفعة الأخيرة." },
          ],
        },
      ],
      contactText: "ما زال لديك سؤال؟",
      contactCta: { label: "راسلني على واتساب", href: whatsappUrl(whatsapp, "السلام عليكم، أرغب في الاستفسار عن باقات الهوية."), external: true },
      labels: faqAr,
    },
    contact: {
      eyebrow: "ابدأ مشروعك",
      title: "أخبرني عن علامتك",
      description: "أرد خلال يوم عمل، ونحدد اجتماعًا مدته 30 دقيقة عبر زوم أو في مكتبي بحي الروضة.",
      info: [
        { type: "phone", label: "الهاتف", value: phone },
        { type: "whatsapp", label: "واتساب", value: whatsapp },
        { type: "email", label: "البريد الإلكتروني", value: "hello@salmabaashen.example" },
        { type: "address", label: "الاستوديو", value: "حي الروضة، جدة 23433" },
        { type: "hours", label: "ساعات العمل", value: "من الأحد إلى الخميس، من 10 صباحًا إلى 6 مساءً" },
      ],
      topics: [
        { value: "identity", label: "هوية بصرية" },
        { value: "packaging", label: "تغليف" },
        { value: "signage", label: "لوحات إرشادية" },
        { value: "retainer", label: "شراكة شهرية" },
      ],
      labels: contactAr,
    },
    footer: {
      wordmark: "سلمى باعشن",
      links: [
        { label: "الأعمال", href: "#work" },
        { label: "الباقات", href: "#services" },
        { label: "المدونة", href: "#journal" },
        { label: "الأسئلة", href: "#faq" },
        { label: "تواصل", href: "#contact" },
        { label: "الخصوصية", href: "#privacy" },
      ],
      legal: "© 2026 سلمى باعشن للتصميم. جدة، المملكة العربية السعودية.",
      labels: footerAr,
    },
  },
  en: {
    navbar: {
      brand: { name: "Salma Baashen", href: "#" },
      links: [
        { label: "Work", href: "#work", current: true },
        { label: "Packages", href: "#services" },
        { label: "Journal", href: "#journal" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: { label: "Start your project", href: "#contact" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "Brand identity designer · Jeddah",
      title: "Your brand identity in six weeks, not six months",
      description:
        "I work with restaurant, shop and office owners in Jeddah: a name, a logo, a usage guide and print-ready files, on a weekly schedule written down before we start.",
      primaryCta: { label: "Start your project", href: "#contact" },
      secondaryCta: { label: "See the work", href: "#work" },
      media: placeholder,
    },
    stats: {
      lang: "en",
      items: [
        { value: "+60", label: "brands launched in Jeddah and the Hejaz" },
        { value: "6 weeks", label: "average delivery of a full identity" },
        { value: "92%", label: "of clients ask for a second project" },
        { value: "9 years", label: "designing brands" },
      ],
    },
    caseStudy: {
      eyebrow: "Selected work",
      title: "The latest I delivered",
      image: photo("Al Maabar Coffee cups and menus on a table", 1200, 900),
      client: "Al Maabar Coffee, Jeddah",
      caseTitle: <>Al Maabar Coffee: three branches, one identity in <bdi>4</bdi> weeks</>,
      summary:
        "Three branches in Jeddah with three different logos. We unified the name, the colours and the Arabic typeface, designed the cups, the menus and the shopfront, and handed the files to the printer in week four.",
      results: [
        { value: "4", label: "weeks from first meeting to handover" },
        { value: "3", label: "branches with one identity" },
        { value: "+35%", label: "new Instagram followers in two months" },
      ],
      link: { label: "Read the case study", href: "#case" },
    },
    works: {
      lang: "en",
      eyebrow: "More work",
      title: "From the identity to the sign on the door",
      projects: [
        { id: "salla-restaurants", name: "Al Salla Restaurants", city: "Jeddah", type: "Restaurant identity", status: "2026", image: photo("Al Salla Restaurants menu") },
        { id: "rashed-law", name: "Al Rashed Law Office", city: "Makkah", type: "Identity and signage", status: "2026", image: photo("Al Rashed office entrance sign") },
        { id: "abeer-perfumes", name: "Abeer Perfumes", city: "Taif", type: "Packaging", status: "2025", image: photo("Abeer Perfumes boxes") },
      ],
      labels: worksEn,
    },
    services: {
      lang: "en",
      eyebrow: "Packages",
      title: "Three packages at a fixed price",
      description: "Prices include VAT. You pay 50% to start and the rest on delivery.",
      services: [
        { title: "Quick identity · 9,500 SAR", description: "A logo, a colour palette, typefaces and social media templates, in three weeks with one round of changes.", href: "#contact" },
        { title: "Full identity · 22,000 SAR", description: "The logo, a usage guide, print items and packaging, in six weeks with two rounds of changes.", href: "#contact" },
        { title: "Brand partner · 4,500 SAR a month", description: "Monthly designs, print follow-up, and a guard against your branches drifting apart. On a three-month contract.", href: "#contact" },
      ],
    },
    clients: {
      eyebrow: "Clients",
      title: "What they said at handover",
      item: {
        quote: "She delivered the identity on the date she wrote in the contract, and we only went back to ask for a second project.",
        name: "Yousef Al-Jifri",
        role: "Founder",
        company: "Al Maabar Coffee",
        city: "Jeddah",
      },
      others: [
        { name: "Haifa Al-Subhi", company: "Al Salla Restaurants", city: "Jeddah" },
        { name: "Majed Al-Rashed", company: "Al Rashed Law Office", city: "Makkah" },
        { name: "Abeer Al-Qurashi", company: "Abeer Perfumes", city: "Taif" },
        { name: "Talal Bahr", company: "Bahr Academy", city: "Jeddah" },
      ],
      labels: clientsEn,
    },
    journal: {
      lang: "en",
      eyebrow: "Journal",
      title: "Notes from the studio",
      action: { label: "All articles", href: "#journal" },
      lead: {
        id: "logo-cost",
        title: "What should a logo cost? Numbers from sixty projects in Jeddah",
        image: photo("Logo sketches on a desk", 1200, 800),
        author: "Salma Baashen",
        program: "Pricing",
        date: "2026-11-14",
      },
      items: [
        { id: "menu-mistakes", title: "Five mistakes in restaurant menu design", image: photo(""), author: "Salma Baashen", program: "Print", date: "2026-11-02" },
        { id: "design-brief", title: "How to write a design brief that does not need three rounds of changes", image: photo(""), author: "Salma Baashen", program: "Working with a designer", date: "2026-10-20" },
        { id: "arabic-type", title: "Arabic type on screen: what worked in 2026", image: photo(""), author: "Salma Baashen", program: "Typefaces", date: "2026-10-08" },
      ],
    },
    faq: {
      eyebrow: "Questions",
      title: "Before you start",
      description: "Pick a topic to read what clients ask me before they sign.",
      categories: [
        {
          id: "price",
          label: "Price and payment",
          items: [
            { id: "vat", question: "Do the prices include VAT?", answer: "Yes. 9,500 SAR means 9,500 SAR after VAT, and you get a tax invoice with each payment." },
            { id: "pay", question: "How do I pay?", answer: "50% to start and 50% on delivery, by bank transfer or mada." },
          ],
        },
        {
          id: "schedule",
          label: "Schedule and changes",
          items: [
            { id: "late", question: "Will you keep to the date?", answer: "Yes. The date is in the contract, and if I am late I take 5% off the price for every week of delay." },
            { id: "rounds", question: "How many rounds of changes does a package include?", answer: "One round in the quick identity and two in the full one. An extra round costs 800 SAR." },
          ],
        },
        {
          id: "files",
          label: "Files and rights",
          items: [
            { id: "deliver", question: "What do I receive at the end?", answer: "Logo files in every format (SVG, PDF and PNG), a usage guide, and typefaces licensed for your commercial use." },
            { id: "rights", question: "Do I own the design?", answer: "Yes. Full ownership passes to you when you pay the final instalment." },
          ],
        },
      ],
      contactText: "Still have a question?",
      contactCta: { label: "Message me on WhatsApp", href: whatsappUrl(whatsapp, "Hello, I would like to ask about the identity packages."), external: true },
      labels: faqEn,
    },
    contact: {
      eyebrow: "Start your project",
      title: "Tell me about your brand",
      description: "I reply within one working day, and we set a 30-minute meeting on Zoom or at my studio in Al Rawdah.",
      info: [
        { type: "phone", label: "Phone", value: phone },
        { type: "whatsapp", label: "WhatsApp", value: whatsapp },
        { type: "email", label: "Email", value: "hello@salmabaashen.example" },
        { type: "address", label: "Studio", value: "Al Rawdah District, Jeddah 23433" },
        { type: "hours", label: "Working hours", value: "Sunday to Thursday, 10 AM to 6 PM" },
      ],
      topics: [
        { value: "identity", label: "Brand identity" },
        { value: "packaging", label: "Packaging" },
        { value: "signage", label: "Signage" },
        { value: "retainer", label: "Monthly partnership" },
      ],
      labels: contactEn,
    },
    footer: {
      wordmark: "Salma Baashen",
      links: [
        { label: "Work", href: "#work" },
        { label: "Packages", href: "#services" },
        { label: "Journal", href: "#journal" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
        { label: "Privacy", href: "#privacy" },
      ],
      legal: "© 2026 Salma Baashen Design. Jeddah, Saudi Arabia.",
      labels: footerEn,
    },
  },
}

export { PortfolioPage01, demo }
export type { PortfolioPage01Props }
export default PortfolioPage01
