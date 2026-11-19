import * as React from "react"

import { Calculator01, labelsAr as calculatorAr, labelsEn as calculatorEn } from "@/registry/blocks/calculator/calculator-01"
import { Contact01, labelsAr as contactAr, labelsEn as contactEn } from "@/registry/blocks/contact/contact-01"
import { Footer05, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-05"
import { Gallery01, labelsAr as galleryAr, labelsEn as galleryEn } from "@/registry/blocks/gallery/gallery-01"
import { Hero11 } from "@/registry/blocks/hero/hero-11"
import { Location01, labelsAr as locationAr, labelsEn as locationEn } from "@/registry/blocks/location/location-01"
import { Navbar01, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-01"
import { ProjectGrid01, labelsAr as projectsAr, labelsEn as projectsEn } from "@/registry/blocks/project-grid/project-grid-01"
import { Stats05 } from "@/registry/blocks/stats/stats-05"
import { cn } from "@/registry/lib/utils"

type RealEstatePage01Props = {
  navbar: React.ComponentProps<typeof Navbar01>
  hero: React.ComponentProps<typeof Hero11>
  projects: React.ComponentProps<typeof ProjectGrid01>
  stats: React.ComponentProps<typeof Stats05>
  calculator: React.ComponentProps<typeof Calculator01>
  gallery: React.ComponentProps<typeof Gallery01>
  location: React.ComponentProps<typeof Location01>
  contact: React.ComponentProps<typeof Contact01>
  footer: React.ComponentProps<typeof Footer05>
  className?: string
}

// Layout rhythm: image-first hero with a facts row, three project cards, a bordered number strip, an estimate tool,
// a photo mosaic, a map split, the lead form, footer. Section ids match the navbar links.
function RealEstatePage01(props: RealEstatePage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar01 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero11 {...props.hero} />
        <ProjectGrid01 id="projects" {...props.projects} />
        <Stats05 id="numbers" {...props.stats} />
        <Calculator01 id="calculator" {...props.calculator} />
        <Gallery01 id="gallery" {...props.gallery} />
        <Location01 id="location" {...props.location} />
        <Contact01 id="visit" {...props.contact} />
      </main>
      <Footer05 {...props.footer} />
    </div>
  )
}

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

const photo = (alt: string, width = 800, height = 600) => ({ alt, width, height })

// Sales office: Sunday to Thursday 9 AM to 6 PM, Friday closed, Saturday 10 AM to 2 PM. Index 0 is Sunday.
const weekday = [{ open: "09:00", close: "18:00" }]
const saturday = [{ open: "10:00", close: "14:00" }]
const officeHours = { week: [weekday, weekday, weekday, weekday, weekday, [], saturday] }

const phone = "+966 11 555 0231"
const whatsapp = "+966 50 555 0231"

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: RealEstatePage01Props; ar: RealEstatePage01Props } = {
  ar: {
    navbar: {
      brand: { name: "سدرة", href: "#" },
      links: [
        { label: "مشاريعنا", href: "#projects", current: true },
        { label: "التزاماتنا", href: "#numbers" },
        { label: "قدّر قسطك", href: "#calculator" },
        { label: "المعرض", href: "#gallery" },
        { label: "الموقع", href: "#location" },
      ],
      cta: { label: "احجز زيارة", href: "#visit" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "سدرة للتطوير العقاري · الرياض",
      title: "فلل الدرعية وشمال الرياض، وسعر المتر معلن",
      description:
        "قطع من 450 م² وفلل جاهزة بجدول دفعات مكتوب، وتاريخ تسليم في العقد وغرامة تأخير لصالحك.",
      primaryCta: { label: "احجز زيارة للموقع", href: "#visit" },
      secondaryCta: { label: "قدّر قسطك الشهري", href: "#calculator" },
      media: { alt: "فلل واحة الدرعية عند الغروب", width: 1600, height: 900 },
      facts: ["الدرعية وشمال الرياض", <><bdi>3</bdi> مشاريع قيد التنفيذ</>, <>تسليم من <bdi>2027</bdi></>],
    },
    projects: {
      lang: "ar",
      eyebrow: "مشاريعنا",
      title: "ثلاثة مشاريع، لكل منها جدول دفعات منشور",
      description: "افتح المشروع لترى المخططات وسعر المتر وتاريخ التسليم المكتوب في العقد.",
      action: { label: "كل المشاريع", href: "#projects" },
      projects: [
        { id: "diriyah-oasis", name: "واحة الدرعية", city: "الدرعية", type: "فلل سكنية", status: "قيد الإنشاء", units: 120, image: photo("فلل واحة الدرعية") },
        { id: "yasmin-hills", name: "تلال الياسمين", city: "حي الياسمين، الرياض", type: "تاون هاوس", status: "بيع على الخارطة", units: 86, image: photo("تاون هاوس تلال الياسمين") },
        { id: "aqiq-court", name: "رواق العقيق", city: "حي العقيق، الرياض", type: "شقق سكنية", status: "جاهز للتسليم", units: 48, image: photo("مبنى رواق العقيق") },
      ],
      labels: projectsAr,
    },
    stats: {
      lang: "ar",
      title: "أرقام نلتزم بها في العقد",
      items: [
        { value: "+1,850", label: "وحدة سكنية سُلّمت", context: "في الرياض والدرعية منذ 2016، من الفلل إلى الشقق." },
        { value: "98%", label: "سُلّمت في موعدها", context: "تاريخ التسليم مكتوب في العقد، وإن تأخرنا ندفع لك غرامة التأخير." },
        { value: "10 سنوات", label: "ضمان على الهيكل", context: "وسنتان على التشطيبات والتمديدات، بنص واضح في عقد البيع." },
        { value: "24 ساعة", label: "للرد على طلب الزيارة", context: "يتواصل معك مستشار المبيعات ويحدد موعدًا في الموقع نفسه." },
      ],
    },
    calculator: {
      lang: "ar",
      eyebrow: "التمويل العقاري",
      title: "اعرف قسطك قبل أن تزورنا",
      description: "اختر سعر الفيلا ومدة السداد لتقدير القسط الشهري. التقدير استرشادي، والعرض النهائي من البنك.",
      amount: { min: 800_000, max: 4_000_000, step: 10_000, default: 1_800_000 },
      terms: [10, 15, 20, 25],
      defaultTerm: 20,
      rate: 0.055,
      cta: { label: "اطلب عرض تمويل", href: "#visit" },
      labels: calculatorAr,
    },
    gallery: {
      lang: "ar",
      eyebrow: "من مواقعنا",
      title: "هكذا يبدو العمل على الأرض",
      description: "صور من مواقع حقيقية بتواريخها، نحدّثها كل أسبوع.",
      photos: [
        photo("يوم تسليم المفاتيح في رواق العقيق", 800, 800),
        photo("صب أسقف الدور الأول في واحة الدرعية", 800, 800),
        photo("مجلس مكتمل في فيلا بالدرعية", 800, 800),
        photo("مهندسون يراجعون المخططات في الموقع", 800, 800),
        photo("حديقة الحي المشتركة في تلال الياسمين", 800, 800),
        photo("واجهة فيلا بالحجر النجدي", 800, 800),
        photo("مطبخ جاهز في شقة نموذجية", 800, 800),
        photo("طريق الحي قبل التشجير", 800, 800),
      ],
      labels: galleryAr,
    },
    location: {
      lang: "ar",
      eyebrow: "زوروا الموقع",
      title: "مكتب المبيعات في الدرعية",
      description: "مواقف مجانية وقهوة بانتظارك، ونأخذك بالسيارة إلى الموقع نفسه.",
      name: "مكتب مبيعات واحة الدرعية",
      address: "الطريق الدائري الشمالي، بجوار بوابة الدرعية، الدرعية 13711",
      phone,
      whatsapp: { phone: whatsapp, message: "السلام عليكم، أرغب في زيارة موقع واحة الدرعية." },
      directions: { label: "احصل على الاتجاهات", href: "https://maps.google.com/?q=Diriyah+Riyadh", external: true },
      hours: officeHours,
      labels: locationAr,
    },
    contact: {
      eyebrow: "احجز زيارتك",
      title: "اترك رقمك وسنحدد لك موعدًا في الموقع",
      description: "يتواصل معك مستشار المبيعات خلال 24 ساعة، بلا التزام.",
      info: [
        { type: "phone", label: "الهاتف", value: phone },
        { type: "whatsapp", label: "واتساب", value: whatsapp },
        { type: "email", label: "البريد الإلكتروني", value: "sales@sidra.example" },
        { type: "address", label: "المقر الرئيسي", value: "طريق الملك فهد، حي العليا، الرياض 12611" },
        { type: "hours", label: "ساعات العمل", value: "من الأحد إلى الخميس، من 9 صباحًا إلى 6 مساءً" },
      ],
      topics: [
        { value: "visit", label: "زيارة الموقع" },
        { value: "prices", label: "الأسعار وجدول الدفعات" },
        { value: "finance", label: "التمويل العقاري" },
        { value: "investor", label: "الاستثمار وإعادة البيع" },
      ],
      labels: contactAr,
    },
    footer: {
      brand: { name: "سدرة", description: "تطوير عقاري سكني في الرياض والدرعية منذ 2016." },
      columns: [
        {
          title: "المشاريع",
          links: [
            { label: "واحة الدرعية", href: "#projects" },
            { label: "تلال الياسمين", href: "#projects" },
            { label: "رواق العقيق", href: "#projects" },
          ],
        },
        {
          title: "الشركة",
          links: [
            { label: "من نحن", href: "#about" },
            { label: "الوظائف", href: "#careers" },
            { label: "الأخبار", href: "#news" },
          ],
        },
        {
          title: "للمشتري",
          links: [
            { label: "حاسبة التمويل", href: "#calculator" },
            { label: "الأسئلة الشائعة", href: "#faq" },
            { label: "تواصل معنا", href: "#visit" },
          ],
        },
      ],
      support: {
        phone,
        hours: "من الأحد إلى الخميس، من 9 صباحًا إلى 6 مساءً",
        whatsapp: { phone: whatsapp, message: "السلام عليكم، لدي سؤال عن مشاريع سدرة." },
      },
      legal: {
        text: "© 2026 شركة سدرة للتطوير العقاري. جميع الحقوق محفوظة.",
        crNumber: "1010345678",
        vatNumber: "300034567800003",
        licence: { text: "مرخّصة من الهيئة العامة للعقار برقم", number: "1100045678" },
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
      brand: { name: "Sidra", href: "#" },
      links: [
        { label: "Projects", href: "#projects", current: true },
        { label: "Our commitments", href: "#numbers" },
        { label: "Estimate", href: "#calculator" },
        { label: "Gallery", href: "#gallery" },
        { label: "Location", href: "#location" },
      ],
      cta: { label: "Book a visit", href: "#visit" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "Sidra Real Estate Development · Riyadh",
      title: "Villas in Diriyah and north Riyadh, with the price per metre published",
      description:
        "Plots from 450 sqm and ready villas, a written payment schedule, a delivery date in the contract and a late-delivery penalty paid to you.",
      primaryCta: { label: "Book a site visit", href: "#visit" },
      secondaryCta: { label: "Estimate your installment", href: "#calculator" },
      media: { alt: "Diriyah Oasis villas at sunset", width: 1600, height: 900 },
      facts: ["Diriyah and north Riyadh", <><bdi>3</bdi> projects under way</>, <>Delivery from <bdi>2027</bdi></>],
    },
    projects: {
      lang: "en",
      eyebrow: "Our projects",
      title: "Three projects, each with a published payment schedule",
      description: "Open a project to see the plans, the price per metre and the delivery date written in the contract.",
      action: { label: "All projects", href: "#projects" },
      projects: [
        { id: "diriyah-oasis", name: "Diriyah Oasis", city: "Diriyah", type: "Villas", status: "Under construction", units: 120, image: photo("Diriyah Oasis villas") },
        { id: "yasmin-hills", name: "Yasmin Hills", city: "Al Yasmin, Riyadh", type: "Townhouses", status: "Off plan", units: 86, image: photo("Yasmin Hills townhouses") },
        { id: "aqiq-court", name: "Aqiq Court", city: "Al Aqiq, Riyadh", type: "Apartments", status: "Ready to hand over", units: 48, image: photo("Aqiq Court building") },
      ],
      labels: projectsEn,
    },
    stats: {
      lang: "en",
      title: "Numbers we put in the contract",
      items: [
        { value: "+1,850", label: "homes delivered", context: "In Riyadh and Diriyah since 2016, from villas to apartments." },
        { value: "98%", label: "delivered on time", context: "The delivery date is written in the contract, and if we are late we pay you a penalty." },
        { value: "10 years", label: "structural warranty", context: "Plus two years on finishes and installations, in plain words in the sale contract." },
        { value: "24 hours", label: "to answer a visit request", context: "A sales adviser calls you and sets a time at the site itself." },
      ],
    },
    calculator: {
      lang: "en",
      eyebrow: "Home financing",
      title: "Know your installment before you visit",
      description: "Pick the villa price and the repayment term to estimate the monthly installment. It is a guide, and the final offer comes from the bank.",
      amount: { min: 800_000, max: 4_000_000, step: 10_000, default: 1_800_000 },
      terms: [10, 15, 20, 25],
      defaultTerm: 20,
      rate: 0.055,
      cta: { label: "Request a financing offer", href: "#visit" },
      labels: calculatorEn,
    },
    gallery: {
      lang: "en",
      eyebrow: "From our sites",
      title: "What the work looks like on the ground",
      description: "Photos from real sites with their dates, updated every week.",
      photos: [
        photo("Key handover day at Aqiq Court", 800, 800),
        photo("Pouring the first-floor slab at Diriyah Oasis", 800, 800),
        photo("A finished majlis in a Diriyah villa", 800, 800),
        photo("Engineers checking plans on site", 800, 800),
        photo("The shared neighbourhood park at Yasmin Hills", 800, 800),
        photo("A villa front in Najdi stone", 800, 800),
        photo("A fitted kitchen in a show apartment", 800, 800),
        photo("The neighbourhood road before planting", 800, 800),
      ],
      labels: galleryEn,
    },
    location: {
      lang: "en",
      eyebrow: "Visit the site",
      title: "The sales office in Diriyah",
      description: "Free parking and coffee waiting, and we drive you to the site itself.",
      name: "Diriyah Oasis Sales Office",
      address: "Northern Ring Road, next to Diriyah Gate, Diriyah 13711",
      phone,
      whatsapp: { phone: whatsapp, message: "Hello, I would like to visit the Diriyah Oasis site." },
      directions: { label: "Get directions", href: "https://maps.google.com/?q=Diriyah+Riyadh", external: true },
      hours: officeHours,
      labels: locationEn,
    },
    contact: {
      eyebrow: "Book your visit",
      title: "Leave your number and we will set a time at the site",
      description: "A sales adviser contacts you within 24 hours, with no obligation.",
      info: [
        { type: "phone", label: "Phone", value: phone },
        { type: "whatsapp", label: "WhatsApp", value: whatsapp },
        { type: "email", label: "Email", value: "sales@sidra.example" },
        { type: "address", label: "Head office", value: "King Fahd Road, Al Olaya, Riyadh 12611" },
        { type: "hours", label: "Working hours", value: "Sunday to Thursday, 9 AM to 6 PM" },
      ],
      topics: [
        { value: "visit", label: "Site visit" },
        { value: "prices", label: "Prices and payment schedule" },
        { value: "finance", label: "Home financing" },
        { value: "investor", label: "Investment and resale" },
      ],
      labels: contactEn,
    },
    footer: {
      brand: { name: "Sidra", description: "Residential real estate development in Riyadh and Diriyah since 2016." },
      columns: [
        {
          title: "Projects",
          links: [
            { label: "Diriyah Oasis", href: "#projects" },
            { label: "Yasmin Hills", href: "#projects" },
            { label: "Aqiq Court", href: "#projects" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About us", href: "#about" },
            { label: "Careers", href: "#careers" },
            { label: "News", href: "#news" },
          ],
        },
        {
          title: "For buyers",
          links: [
            { label: "Financing calculator", href: "#calculator" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact us", href: "#visit" },
          ],
        },
      ],
      support: {
        phone,
        hours: "Sunday to Thursday, 9 AM to 6 PM",
        whatsapp: { phone: whatsapp, message: "Hello, I have a question about Sidra projects." },
      },
      legal: {
        text: "© 2026 Sidra Real Estate Development Co. All rights reserved.",
        crNumber: "1010345678",
        vatNumber: "300034567800003",
        licence: { text: "Licensed by the Real Estate General Authority, number", number: "1100045678" },
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { RealEstatePage01, demo }
export type { RealEstatePage01Props }
export default RealEstatePage01
