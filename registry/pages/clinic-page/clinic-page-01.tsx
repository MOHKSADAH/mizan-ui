import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import { Booking01, demo as bookingDemo, labelsAr as bookingAr, labelsEn as bookingEn } from "@/registry/blocks/booking/booking-01"
import { Faq03, labelsAr as faqAr, labelsEn as faqEn } from "@/registry/blocks/faq/faq-03"
import { Footer05, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-05"
import { Hero02 } from "@/registry/blocks/hero/hero-02"
import { Location01, labelsAr as locationAr, labelsEn as locationEn } from "@/registry/blocks/location/location-01"
import { Navbar04, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-04"
import { Services02 } from "@/registry/blocks/services/services-02"
import { Stats05 } from "@/registry/blocks/stats/stats-05"
import { Team01, labelsAr as teamAr, labelsEn as teamEn } from "@/registry/blocks/team/team-01"
import { Testimonials05, labelsAr as testimonialAr, labelsEn as testimonialEn } from "@/registry/blocks/testimonials/testimonials-05"
import { cn } from "@/registry/lib/utils"

type ClinicPage01Props = {
  navbar: React.ComponentProps<typeof Navbar04>
  hero: React.ComponentProps<typeof Hero02>
  stats: React.ComponentProps<typeof Stats05>
  services: React.ComponentProps<typeof Services02>
  team: React.ComponentProps<typeof Team01>
  booking: React.ComponentProps<typeof Booking01>
  testimonial: React.ComponentProps<typeof Testimonials05>
  faq: React.ComponentProps<typeof Faq03>
  location: React.ComponentProps<typeof Location01>
  footer: React.ComponentProps<typeof Footer05>
  className?: string
}

// Layout rhythm: split hero, number strip, numbered specialties with a sticky heading, doctors,
// the booking card, one family quote, tabbed FAQ, map card, footer. Section ids match the navbar links.
function ClinicPage01(props: ClinicPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar04 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero02 {...props.hero} />
        <Stats05 {...props.stats} />
        <Services02 id="services" {...props.services} />
        <Team01 id="doctors" {...props.team} />
        <Booking01 id="booking" {...props.booking} />
        <Testimonials05 id="reviews" {...props.testimonial} />
        <Faq03 id="faq" {...props.faq} />
        <Location01 id="visit" {...props.location} />
      </main>
      <Footer05 {...props.footer} />
    </div>
  )
}

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

const phone = "+966 12 555 0148"
const whatsapp = "+966 50 555 0148"
const mapsHref = "https://maps.google.com/?q=Al+Rawdah+Jeddah"

// Sunday to Thursday and Saturday have two shifts. Friday opens in the evening.
const shifts = [
  { open: "09:00", close: "13:00" },
  { open: "16:00", close: "22:00" },
]
const hours = { week: [shifts, shifts, shifts, shifts, shifts, [{ open: "16:00", close: "22:00" }], shifts] }

// The booking block carries a fixed week of slots, so the page reuses it.
const { slots, startDate } = bookingDemo.en

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: ClinicPage01Props; ar: ClinicPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "عيادات سلامة", href: "#" },
      links: [
        { label: "التخصصات", href: "#services", current: true },
        { label: "أطباؤنا", href: "#doctors" },
        { label: "الحجز", href: "#booking" },
        { label: "الأسئلة الشائعة", href: "#faq" },
        { label: "الموقع", href: "#visit" },
      ],
      utility: { phone, whatsapp: { phone: whatsapp, message: "السلام عليكم، أرغب في حجز موعد في عيادات سلامة." } },
      cta: { label: "احجز موعدك", href: "#booking" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "عيادات عائلية في جدة",
      title: "طبيب يعرف عائلتك، ويعطيك وقته",
      description:
        "كشف مدته 30 دقيقة لا 10، وملف واحد لكل أفراد العائلة، وأقرب موعد خلال 24 ساعة. من طب الأطفال إلى الأسنان تحت سقف واحد في حي الروضة.",
      primaryCta: { label: "احجز موعدك", href: "#booking" },
      secondaryCta: { label: "تعرّف على أطبائنا", href: "#doctors" },
      media: placeholder,
    },
    stats: {
      lang: "ar",
      title: "عيادة تعرف مرضاها بأسمائهم",
      items: [
        { value: "+18,000", label: "مريض مسجّل", context: "من 6,200 عائلة في جدة، وينضم إلينا نحو 70 مريضًا جديدًا كل أسبوع." },
        { value: "30 دقيقة", label: "مدة الكشف", context: "وقت كامل مع الطبيب، لا كشف سريع في عشر دقائق." },
        { value: "24 ساعة", label: "أقرب موعد", context: "نحجز لك خلال يوم من طلبك في أغلب التخصصات." },
        { value: "4.8 من 5", label: "تقييم المرضى", context: "من 2,900 تقييم على خرائط جوجل." },
      ],
    },
    services: {
      lang: "ar",
      eyebrow: "التخصصات",
      title: "ست تخصصات لكل أفراد العائلة",
      description: "نبدأ بطبيب الأسرة، ونحوّلك إلى الأخصائي المناسب داخل العيادات نفسها، وملفك معك.",
      action: { label: "احجز موعدًا", href: "#booking" },
      services: [
        { title: "طب الأسرة والباطنة", description: "فحص دوري ومتابعة السكري والضغط، ومرجعك إلى بقية التخصصات.", href: "#booking" },
        { title: "طب الأطفال", description: "تطعيمات ومتابعة نمو وتغذية، في عيادة لا تنتظر فيها طويلًا.", href: "#booking" },
        { title: "النساء والولادة", description: "متابعة الحمل وفحوصات ما قبل الزواج وصحة المرأة.", href: "#booking" },
        { title: "الأسنان", description: "تنظيف وحشوات وتقويم وتبييض، وجلسات للأطفال بأسلوب هادئ.", href: "#booking" },
        { title: "الجلدية", description: "حب الشباب وتساقط الشعر والحساسية وأمراض الجلد عند الأطفال.", href: "#booking" },
        { title: "العظام والعلاج الطبيعي", description: "إصابات الملاعب وآلام الظهر وتأهيل ما بعد الكسور.", href: "#booking" },
      ],
    },
    team: {
      eyebrow: "أطباؤنا",
      title: "أطباء تتعرّف عليهم قبل أن تحجز",
      description: "كل طبيب يخبرك هنا بتخصصه وخبرته، ويظهر لك جدوله في صفحة الحجز.",
      people: [
        {
          id: "hind",
          name: "د. هند الغامدي",
          role: "استشارية طب الأسرة",
          bio: "عشر سنوات في مستشفيات جدة، وتتابع مرضى السكري والضغط.",
          photo: { alt: "د. هند الغامدي" },
        },
        {
          id: "majed",
          name: "د. ماجد باسليم",
          role: "استشاري طب الأطفال",
          bio: "زمالة في طب الأطفال، ومهتم بتغذية الرضّع ونموهم.",
          photo: { alt: "د. ماجد باسليم" },
        },
        {
          id: "reem",
          name: "د. ريم الشهري",
          role: "أخصائية النساء والولادة",
          bio: "تتابع الحمل من أول زيارة حتى ما بعد الولادة.",
          photo: { alt: "د. ريم الشهري" },
        },
        {
          id: "faisal",
          name: "د. فيصل العمودي",
          role: "أخصائي طب الأسنان",
          bio: "يعالج الأسنان بجلسات قصيرة، ويحرص على راحة الأطفال.",
          photo: { alt: "د. فيصل العمودي" },
        },
      ],
      labels: teamAr,
    },
    booking: {
      lang: "ar",
      eyebrow: "الحجز",
      title: "احجز موعدك في دقيقة",
      description: "اختر الخدمة واليوم والوقت. تصلك رسالة تأكيد، ويصلك تذكير قبل الموعد.",
      services: [
        { id: "family", name: "كشف طب الأسرة", minutes: 30, price: 250 },
        { id: "pediatrics", name: "كشف أطفال", minutes: 30, price: 220 },
        { id: "pregnancy", name: "متابعة حمل", minutes: 30, price: 300 },
        { id: "dental", name: "فحص وتنظيف الأسنان", minutes: 45, price: 250 },
        { id: "derma", name: "استشارة جلدية", minutes: 20, price: 300 },
      ],
      slots,
      startDate,
      note: "الدفع في العيادة بمدى أو أبل باي. الأسعار تشمل ضريبة القيمة المضافة.",
      labels: bookingAr,
    },
    testimonial: {
      eyebrow: "المرضى",
      title: "عائلات تراجعنا منذ سنوات",
      item: {
        quote:
          "ثلاثة أطفال وثلاثة مواعيد في ساعة واحدة، وكان الطبيب يعرف تاريخ كل واحد منهم دون أن أشرح. هذا ما كنت أبحث عنه.",
        name: "نورة السلمي",
        role: "أم لثلاثة أطفال",
        company: "تراجعنا منذ 2021",
        city: "حي الصفا، جدة",
      },
      others: [
        { name: "محمد باوزير", company: "طب الأسنان", city: "حي الروضة" },
        { name: "ريم القرشي", company: "النساء والولادة", city: "حي الشاطئ" },
        { name: "خالد الزهراني", company: "طب الأسرة", city: "حي السلامة" },
        { name: "هدى باخشوين", company: "الجلدية", city: "حي النعيم" },
      ],
      labels: { ...testimonialAr, others: "عائلات أخرى تراجعنا" },
    },
    faq: {
      eyebrow: "أسئلة المرضى",
      title: "قبل أن تزورنا",
      description: "اختر موضوعًا لتجد ما يسأله مرضانا عادةً.",
      categories: [
        {
          id: "booking",
          label: "الحجز",
          items: [
            { id: "advance", question: "هل أحتاج إلى حجز مسبق؟", answer: "نفضّل ذلك حتى لا تنتظر. ونستقبل الحالات العاجلة دون موعد ما أمكن." },
            { id: "change", question: "كيف أغيّر موعدي أو ألغيه؟", answer: "من رابط الرسالة النصية، أو على واتساب قبل الموعد بساعتين." },
            { id: "wait", question: "كم أنتظر عادةً؟", answer: "أقل من 10 دقائق لمن حضر في موعده." },
          ],
        },
        {
          id: "visit",
          label: "الزيارة",
          items: [
            { id: "bring", question: "ماذا أحضر معي؟", answer: "الهوية الوطنية أو الإقامة، وبطاقة التأمين، وأي تقارير أو تحاليل سابقة." },
            { id: "parking", question: "هل توجد مواقف؟", answer: "نعم، مواقف مجانية أمام المبنى، ومدخل للكراسي المتحركة في الدور الأرضي." },
            { id: "newborn", question: "هل تستقبلون حديثي الولادة؟", answer: "نعم، لدينا عيادة أطفال وغرفة تطعيم منفصلة عن غرفة انتظار البالغين." },
          ],
        },
        {
          id: "payment",
          label: "الدفع والتأمين",
          items: [
            { id: "insurance", question: "ما شركات التأمين التي تتعاملون معها؟", answer: "نتعامل مع أغلب شركات التأمين الطبي في المملكة، ويظهر لك التأمين المقبول عند الحجز." },
            { id: "vat", question: "هل الأسعار شاملة الضريبة؟", answer: "نعم، الأسعار المعروضة تشمل ضريبة القيمة المضافة 15%." },
            { id: "methods", question: "ما طرق الدفع؟", answer: "ندفع بمدى وفيزا وماستركارد وأبل باي، وبالنقد في العيادة." },
          ],
        },
      ],
      contactText: "لم تجد إجابتك؟",
      contactCta: { label: "اتصل بنا", href: `tel:${phone.replace(/\s/g, "")}` },
      labels: faqAr,
    },
    location: {
      lang: "ar",
      eyebrow: "زورونا",
      title: "نحن في حي الروضة بجدة",
      description: "مواقف مجانية أمام المبنى، ومدخل للكراسي المتحركة في الدور الأرضي.",
      name: "عيادات سلامة، فرع الروضة",
      address: "طريق الأمير سلطان، حي الروضة، جدة 23433",
      phone,
      whatsapp: { phone: whatsapp, message: "السلام عليكم، أرغب في حجز موعد في عيادات سلامة." },
      directions: { label: "الاتجاهات في خرائط جوجل", href: mapsHref, external: true },
      hours,
      labels: locationAr,
    },
    footer: {
      brand: { name: "عيادات سلامة", description: "عيادات عائلية في جدة: طبيب يعرف عائلتك، ووقت كافٍ لكل مريض." },
      columns: [
        {
          title: "التخصصات",
          links: [
            { label: "التخصصات", href: "#services" },
            { label: "أطباؤنا", href: "#doctors" },
            { label: "احجز موعدًا", href: "#booking" },
          ],
        },
        {
          title: "للمرضى",
          links: [
            { label: "آراء المرضى", href: "#reviews" },
            { label: "الأسئلة الشائعة", href: "#faq" },
            { label: "الموقع وساعات العمل", href: "#visit" },
          ],
        },
        {
          title: "العيادات",
          links: [
            { label: "من نحن", href: "#about" },
            { label: "الوظائف", href: "#careers" },
            { label: "تواصل معنا", href: "#visit" },
          ],
        },
      ],
      support: {
        phone,
        hours: "كل يوم من 9 صباحًا إلى 10 مساءً",
        whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن عيادات سلامة." },
      },
      legal: {
        text: "© 2026 شركة سلامة للخدمات الطبية. جميع الحقوق محفوظة.",
        crNumber: "4030567890",
        vatNumber: "300056789000003",
        licence: { text: "منشأة صحية مرخّصة من وزارة الصحة برقم", number: "1-4021587" },
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
      brand: { name: "Salama Clinics", href: "#" },
      links: [
        { label: "Specialties", href: "#services", current: true },
        { label: "Our doctors", href: "#doctors" },
        { label: "Booking", href: "#booking" },
        { label: "FAQ", href: "#faq" },
        { label: "Visit", href: "#visit" },
      ],
      utility: { phone, whatsapp: { phone: whatsapp, message: "Hello, I would like to book an appointment at Salama Clinics." } },
      cta: { label: "Book an appointment", href: "#booking" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "Family clinics in Jeddah",
      title: "A doctor who knows your family, and gives you their time",
      description:
        "A 30-minute consultation, not 10. One file for the whole family, and the first appointment within 24 hours. From pediatrics to dentistry under one roof in Al Rawdah.",
      primaryCta: { label: "Book an appointment", href: "#booking" },
      secondaryCta: { label: "Meet our doctors", href: "#doctors" },
      media: placeholder,
    },
    stats: {
      lang: "en",
      title: "A clinic that knows its patients by name",
      items: [
        { value: "+18,000", label: "Registered patients", context: "From 6,200 families in Jeddah, and about 70 new patients join every week." },
        { value: "30 min", label: "Consultation time", context: "Full time with the doctor, not a ten-minute check." },
        { value: "24 hours", label: "First available slot", context: "We book you within a day of your request in most specialties." },
        { value: "4.8 of 5", label: "Patient rating", context: "From 2,900 reviews on Google Maps." },
      ],
    },
    services: {
      lang: "en",
      eyebrow: "Specialties",
      title: "Six specialties for every member of the family",
      description: "You start with a family doctor, and we refer you to the right specialist inside the same clinics, with your file.",
      action: { label: "Book an appointment", href: "#booking" },
      services: [
        { title: "Family medicine and internal medicine", description: "Check-ups, diabetes and blood pressure follow-up, and your route to every other specialty.", href: "#booking" },
        { title: "Pediatrics", description: "Vaccinations, growth checks and nutrition, in a clinic where you do not wait long.", href: "#booking" },
        { title: "Obstetrics and gynecology", description: "Pregnancy follow-up, premarital tests and women's health.", href: "#booking" },
        { title: "Dentistry", description: "Cleaning, fillings, braces and whitening, with calm sessions for children.", href: "#booking" },
        { title: "Dermatology", description: "Acne, hair loss, allergies and children's skin conditions.", href: "#booking" },
        { title: "Orthopedics and physiotherapy", description: "Sports injuries, back pain and rehabilitation after fractures.", href: "#booking" },
      ],
    },
    team: {
      eyebrow: "Our doctors",
      title: "Doctors you meet before you book",
      description: "Each doctor tells you their specialty and experience here, and you see their schedule on the booking form.",
      people: [
        {
          id: "hind",
          name: "Dr. Hind Al-Ghamdi",
          role: "Family medicine consultant",
          bio: "Ten years in Jeddah hospitals, following patients with diabetes and high blood pressure.",
          photo: { alt: "Dr. Hind Al-Ghamdi" },
        },
        {
          id: "majed",
          name: "Dr. Majed Basalim",
          role: "Pediatrics consultant",
          bio: "Pediatrics fellowship, with a focus on infant nutrition and growth.",
          photo: { alt: "Dr. Majed Basalim" },
        },
        {
          id: "reem",
          name: "Dr. Reem Al-Shehri",
          role: "Obstetrics and gynecology specialist",
          bio: "Follows each pregnancy from the first visit to after the birth.",
          photo: { alt: "Dr. Reem Al-Shehri" },
        },
        {
          id: "faisal",
          name: "Dr. Faisal Al-Amoudi",
          role: "Dentistry specialist",
          bio: "Treats teeth in short sessions, and puts children at ease.",
          photo: { alt: "Dr. Faisal Al-Amoudi" },
        },
      ],
      labels: teamEn,
    },
    booking: {
      lang: "en",
      eyebrow: "Booking",
      title: "Book your appointment in a minute",
      description: "Choose a service, a day and a time. You get a confirmation message, and a reminder before the visit.",
      services: [
        { id: "family", name: "Family medicine consultation", minutes: 30, price: 250 },
        { id: "pediatrics", name: "Pediatric consultation", minutes: 30, price: 220 },
        { id: "pregnancy", name: "Pregnancy follow-up", minutes: 30, price: 300 },
        { id: "dental", name: "Dental check-up and cleaning", minutes: 45, price: 250 },
        { id: "derma", name: "Dermatology consultation", minutes: 20, price: 300 },
      ],
      slots,
      startDate,
      note: "Pay at the clinic with mada or Apple Pay. Prices include VAT.",
      labels: bookingEn,
    },
    testimonial: {
      eyebrow: "Patients",
      title: "Families who have visited us for years",
      item: {
        quote:
          "Three children and three appointments in one hour, and the doctor knew each child's history without me explaining. This is what I was looking for.",
        name: "Noura Al-Salmi",
        role: "Mother of three",
        company: "Visiting since 2021",
        city: "Al Safa, Jeddah",
      },
      others: [
        { name: "Mohammed Bawazeer", company: "Dentistry", city: "Al Rawdah" },
        { name: "Reem Al-Qurashi", company: "Obstetrics and gynecology", city: "Al Shati" },
        { name: "Khalid Al-Zahrani", company: "Family medicine", city: "Al Salamah" },
        { name: "Huda Bakhsh", company: "Dermatology", city: "Al Naeem" },
      ],
      labels: { ...testimonialEn, others: "Other families who visit us" },
    },
    faq: {
      eyebrow: "Patient questions",
      title: "Before you visit",
      description: "Choose a topic to see what our patients usually ask.",
      categories: [
        {
          id: "booking",
          label: "Booking",
          items: [
            { id: "advance", question: "Do I need to book ahead?", answer: "We prefer it, so you do not wait. We see urgent cases without an appointment whenever we can." },
            { id: "change", question: "How do I change or cancel my appointment?", answer: "From the link in the text message, or on WhatsApp up to two hours before the visit." },
            { id: "wait", question: "How long do I usually wait?", answer: "Under 10 minutes if you arrive on time." },
          ],
        },
        {
          id: "visit",
          label: "Your visit",
          items: [
            { id: "bring", question: "What should I bring?", answer: "Your national ID or iqama, your insurance card, and any earlier reports or lab results." },
            { id: "parking", question: "Is there parking?", answer: "Yes, free parking in front of the building, and a wheelchair entrance on the ground floor." },
            { id: "newborn", question: "Do you see newborns?", answer: "Yes. We have a pediatric clinic and a vaccination room, separate from the adult waiting room." },
          ],
        },
        {
          id: "payment",
          label: "Payment and insurance",
          items: [
            { id: "insurance", question: "Which insurance companies do you work with?", answer: "We work with most medical insurers in the Kingdom, and the booking form shows which plan we accept." },
            { id: "vat", question: "Do the prices include VAT?", answer: "Yes, the prices shown include 15% VAT." },
            { id: "methods", question: "How can I pay?", answer: "By mada, Visa, Mastercard or Apple Pay, or in cash at the clinic." },
          ],
        },
      ],
      contactText: "Did not find your answer?",
      contactCta: { label: "Call us", href: `tel:${phone.replace(/\s/g, "")}` },
      labels: faqEn,
    },
    location: {
      lang: "en",
      eyebrow: "Visit us",
      title: "Find us in Al Rawdah, Jeddah",
      description: "Free parking in front of the building, and a wheelchair entrance on the ground floor.",
      name: "Salama Clinics, Al Rawdah branch",
      address: "Prince Sultan Road, Al Rawdah District, Jeddah 23433",
      phone,
      whatsapp: { phone: whatsapp, message: "Hello, I would like to book an appointment at Salama Clinics." },
      directions: { label: "Directions on Google Maps", href: mapsHref, external: true },
      hours,
      labels: locationEn,
    },
    footer: {
      brand: { name: "Salama Clinics", description: "Family clinics in Jeddah: a doctor who knows your family, and enough time for every patient." },
      columns: [
        {
          title: "Specialties",
          links: [
            { label: "Specialties", href: "#services" },
            { label: "Our doctors", href: "#doctors" },
            { label: "Book an appointment", href: "#booking" },
          ],
        },
        {
          title: "For patients",
          links: [
            { label: "Patient reviews", href: "#reviews" },
            { label: "FAQ", href: "#faq" },
            { label: "Location and hours", href: "#visit" },
          ],
        },
        {
          title: "The clinics",
          links: [
            { label: "About us", href: "#about" },
            { label: "Careers", href: "#careers" },
            { label: "Contact us", href: "#visit" },
          ],
        },
      ],
      support: {
        phone,
        hours: "Every day, 9 AM to 10 PM",
        whatsapp: { phone: whatsapp, message: "Hello, I have a question about Salama Clinics." },
      },
      legal: {
        text: "© 2026 Salama Medical Services Co. All rights reserved.",
        crNumber: "4030567890",
        vatNumber: "300056789000003",
        licence: { text: "A health facility licensed by the Ministry of Health, number", number: "1-4021587" },
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { ClinicPage01, demo }
export type { ClinicPage01Props }
export default ClinicPage01
