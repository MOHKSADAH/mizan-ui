import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import { AppDownload01, labelsAr as appAr, labelsEn as appEn } from "@/registry/blocks/app-download/app-download-01"
import { Features02 } from "@/registry/blocks/features/features-02"
import { Footer04, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-04"
import { Gallery01, labelsAr as galleryAr, labelsEn as galleryEn } from "@/registry/blocks/gallery/gallery-01"
import { Hero11 } from "@/registry/blocks/hero/hero-11"
import { Location01, labelsAr as locationAr, labelsEn as locationEn } from "@/registry/blocks/location/location-01"
import { Menu01, labelsAr as menuAr, labelsEn as menuEn } from "@/registry/blocks/menu/menu-01"
import { Navbar02, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-02"
import { Testimonials01 } from "@/registry/blocks/testimonials/testimonials-01"
import { cn } from "@/registry/lib/utils"

type RestaurantPage01Props = {
  navbar: React.ComponentProps<typeof Navbar02>
  hero: React.ComponentProps<typeof Hero11>
  menu: React.ComponentProps<typeof Menu01>
  about: React.ComponentProps<typeof Features02>
  gallery: React.ComponentProps<typeof Gallery01>
  location: React.ComponentProps<typeof Location01>
  testimonial: React.ComponentProps<typeof Testimonials01>
  app: React.ComponentProps<typeof AppDownload01>
  footer: React.ComponentProps<typeof Footer04>
  className?: string
}

// Layout rhythm: image-first hero, a typographic menu, two alternating story rows, a photo grid,
// a card with the map, one quote, one app card, footer. Section ids match the navbar links.
function RestaurantPage01(props: RestaurantPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar02 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero11 {...props.hero} />
        <Menu01 id="menu" {...props.menu} />
        <Features02 id="about" {...props.about} />
        <Gallery01 id="gallery" {...props.gallery} />
        <Location01 id="visit" {...props.location} />
        <Testimonials01 {...props.testimonial} />
        <AppDownload01 id="app" {...props.app} />
      </main>
      <Footer04 {...props.footer} />
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

const phone = "+966 11 555 0163"
const whatsapp = "+966 50 555 0163"
const mapsHref = "https://maps.google.com/?q=Al+Malqa+Riyadh"

// Sunday to Thursday and Saturday are one shift. Friday has a gap for the prayer.
const day: { open: string; close: string }[] = [{ open: "07:00", close: "24:00" }]
const friday = [
  { open: "07:00", close: "11:30" },
  { open: "13:30", close: "24:00" },
]
const hours = { week: [day, day, day, day, day, friday, day] }

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: RestaurantPage01Props; ar: RestaurantPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "ركوة", href: "#" },
      links: [
        { label: "القائمة", href: "#menu", current: true },
        { label: "قصتنا", href: "#about" },
        { label: "المعرض", href: "#gallery" },
        { label: "زورونا", href: "#visit" },
      ],
      cta: { label: "اطلب من التطبيق", href: "#app" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "محمصة ومقهى مختص في الرياض",
      title: "قهوة على ذوق الرياض، محمّصة هنا مرتين كل أسبوع",
      description:
        "نحمّص حبوبنا في محمصتنا بحي الملقا كل أحد وأربعاء، ولا نبيع حبة مضى على تحميصها أكثر من عشرة أيام. من الفلتر الخفيف إلى القهوة السعودية بالهيل والزعفران.",
      primaryCta: { label: "شاهد القائمة", href: "#menu" },
      secondaryCta: { label: "كيف تصل إلينا", href: "#visit" },
      media: { alt: "الباريستا يسكب فنجان V60 في ركوة", width: 1600, height: 900 },
      facts: ["حي الملقا، الرياض", "مفتوح حتى منتصف الليل", "تحميص كل أحد وأربعاء"],
    },
    menu: {
      lang: "ar",
      eyebrow: "القائمة",
      title: "قائمة ركوة",
      description: "الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة.",
      categories: [
        {
          id: "coffee",
          label: "القهوة المختصة",
          items: [
            { id: "v60", name: "V60 إثيوبيا يرقاشيف", description: "توت أزرق وياسمين، تُحضَّر أمامك على الطاولة.", price: 24, tags: ["new"] },
            { id: "chemex", name: "كيمكس كولومبيا هويلا", description: "كراميل وتفاح أحمر، تكفي كوبين.", price: 38 },
            { id: "espresso", name: "إسبريسو مزدوج", description: "من خلطة ركوة: شوكولاتة داكنة وتمر.", price: 14 },
            { id: "flat-white", name: "فلات وايت", description: "إسبريسو مزدوج مع حليب مخملي.", price: 19 },
            { id: "spanish", name: "سبانش لاتيه", description: "بحليب مكثف حلو، ساخن أو بارد.", price: 22 },
            { id: "cold-brew", name: "كولد برو", description: "نقيعه ثماني عشرة ساعة، بلا سكر.", price: 21, tags: ["vegan"] },
          ],
        },
        {
          id: "saudi",
          label: "القهوة السعودية",
          items: [
            { id: "khawlani", name: "قهوة خولانية بالهيل والزعفران", description: "من مزارع جازان، تُقدَّم في دلة صغيرة بثلاثة فناجين.", price: 28 },
            { id: "karak", name: "شاي كرك", description: "شاي أحمر بالحليب والهيل.", price: 12 },
            { id: "mint", name: "شاي أخضر بالنعناع", description: "نعناع طازج وسكر خفيف.", price: 18 },
            { id: "dates", name: "طبق تمر سكري", description: "من مزارع القصيم، يُقدَّم مع القهوة.", price: 15, tags: ["vegan"] },
          ],
        },
        {
          id: "sweets",
          label: "الحلويات",
          items: [
            { id: "date-cake", name: "كيكة التمر الدافئة", description: "بصلصة التوفي وكرة آيس كريم فانيلا.", price: 26, tags: ["new"] },
            { id: "saffron-cheesecake", name: "تشيز كيك الزعفران", description: "قاعدة بسكويت اللوتس.", price: 28 },
            { id: "almond-croissant", name: "كرواسون اللوز", description: "يُخبز كل صباح.", price: 18 },
            { id: "cookie", name: "كوكيز الشوكولاتة الداكنة", description: "بملح البحر.", price: 14 },
            { id: "basbousa", name: "بسبوسة بالقشطة", description: "قطعة كبيرة تكفي شخصين.", price: 16 },
            { id: "brownie", name: "براونيز بالفستق", description: "ساخنة مع صلصة الشوكولاتة.", price: 20 },
          ],
        },
      ],
      labels: menuAr,
    },
    about: {
      eyebrow: "قصتنا",
      title: "محمصة صغيرة تعرف مزارعها",
      description: "بدأنا عام 2021 بمحمصة صغيرة في الملقا. اليوم نشتري من أربع مزارع نعرف أصحابها بالاسم.",
      items: [
        {
          title: "نحمّص بأيدينا، مرتين في الأسبوع",
          description:
            "كل دفعة لا تتجاوز 12 كيلوجرامًا، وتاريخ التحميص مكتوب على كل كيس. ما لم يُبع خلال عشرة أيام لا يصل إلى الرف.",
          media: placeholder,
        },
        {
          title: "من أربع مزارع، واسم كل مزرعة على الكيس",
          description:
            "يرقاشيف من إثيوبيا، وهويلا من كولومبيا، وحرازي من اليمن، وخولاني من جازان. نزور مزارعنا كل موسم، ونكتب لك من أين جاءت حبّتك.",
          media: placeholder,
        },
      ],
    },
    gallery: {
      lang: "ar",
      eyebrow: "من داخل ركوة",
      title: "ركن في الملقا يستحق أن تجلس فيه",
      description: "مقاعد على النافذة، وطاولة طويلة للعمل، وركن للعائلات في الدور العلوي.",
      photos: [
        { alt: "الباريستا خلف البار" },
        { alt: "حبوب محمّصة حديثًا في المحمصة" },
        { alt: "مقاعد النافذة في الصباح" },
        { alt: "الطاولة الطويلة للعمل" },
        { alt: "فنجان V60 على الطاولة" },
        { alt: "آلة التحميص أثناء الدفعة" },
        { alt: "ركن العائلات في الدور العلوي" },
        { alt: "كيكة التمر الدافئة" },
      ],
      labels: galleryAr,
    },
    location: {
      lang: "ar",
      eyebrow: "زورونا",
      title: "تجدنا في الملقا",
      description: "مواقف أمام المحل، وركن للعائلات في الدور العلوي. نغلق ساعتين وقت صلاة الجمعة.",
      name: "ركوة، فرع الملقا",
      address: "طريق أنس بن مالك، حي الملقا، الرياض 13521",
      phone,
      whatsapp: { phone: whatsapp, message: "السلام عليكم، أرغب في حجز طاولة في ركوة." },
      directions: { label: "الاتجاهات في خرائط جوجل", href: mapsHref, external: true },
      hours,
      labels: locationAr,
    },
    testimonial: {
      title: "ما يقوله ضيوفنا",
      item: {
        quote:
          "جئت أول مرة من أجل القهوة السعودية، والآن لا يبدأ يومي إلا بكوب V60 عندهم. الباريستا يعرف طلبي قبل أن أقوله.",
        name: "عبدالعزيز المطيري",
        role: "مهندس برمجيات، ضيف دائم",
      },
    },
    app: {
      lang: "ar",
      title: "اطلب قبل أن تصل",
      description: "اطلب من التطبيق واستلم من البار دون طابور. مع كل فنجان نقطة، والفنجان العاشر علينا.",
      appStore: { label: "App Store", href: "#app-store" },
      googlePlay: { label: "Google Play", href: "#google-play" },
      qrValue: "https://rakwa.example/app",
      rating: { value: 4.9, count: 3200 },
      labels: appAr,
    },
    footer: {
      brand: { name: "ركوة", description: "محمصة ومقهى مختص في الرياض، نحمّص كل أحد وأربعاء." },
      columns: [
        {
          title: "القائمة",
          links: [
            { label: "القهوة والحلويات", href: "#menu" },
            { label: "اطلب من التطبيق", href: "#app" },
            { label: "طلبات الجملة", href: "#wholesale" },
          ],
        },
        {
          title: "زورونا",
          links: [
            { label: "الموقع وساعات العمل", href: "#visit" },
            { label: "المعرض", href: "#gallery" },
          ],
        },
        {
          title: "عن ركوة",
          links: [
            { label: "قصتنا", href: "#about" },
            { label: "الوظائف", href: "#careers" },
          ],
        },
      ],
      contact: {
        phone,
        email: "hello@rakwa.example",
        whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن ركوة." },
      },
      legal: {
        text: "© 2026 مؤسسة ركوة للقهوة. جميع الحقوق محفوظة.",
        crNumber: "1010456789",
        vatNumber: "300045678900003",
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
      brand: { name: "Rakwa", href: "#" },
      links: [
        { label: "Menu", href: "#menu", current: true },
        { label: "Our story", href: "#about" },
        { label: "Gallery", href: "#gallery" },
        { label: "Visit", href: "#visit" },
      ],
      cta: { label: "Order on the app", href: "#app" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "Roastery and specialty cafe in Riyadh",
      title: "Coffee the way Riyadh likes it, roasted here twice a week",
      description:
        "We roast in our Al Malqa roastery every Sunday and Wednesday, and we never sell a bean more than ten days off the roaster. From light filter coffee to Saudi coffee with cardamom and saffron.",
      primaryCta: { label: "See the menu", href: "#menu" },
      secondaryCta: { label: "How to find us", href: "#visit" },
      media: { alt: "A barista pouring a V60 at Rakwa", width: 1600, height: 900 },
      facts: ["Al Malqa, Riyadh", "Open until midnight", "Roasting every Sunday and Wednesday"],
    },
    menu: {
      lang: "en",
      eyebrow: "Menu",
      title: "The Rakwa menu",
      description: "Prices are in Saudi riyals and include VAT.",
      categories: [
        {
          id: "coffee",
          label: "Specialty coffee",
          items: [
            { id: "v60", name: "V60, Ethiopia Yirgacheffe", description: "Blueberry and jasmine, brewed at your table.", price: 24, tags: ["new"] },
            { id: "chemex", name: "Chemex, Colombia Huila", description: "Caramel and red apple, enough for two cups.", price: 38 },
            { id: "espresso", name: "Double espresso", description: "From the Rakwa blend: dark chocolate and dates.", price: 14 },
            { id: "flat-white", name: "Flat white", description: "A double espresso with velvet milk.", price: 19 },
            { id: "spanish", name: "Spanish latte", description: "With sweet condensed milk, hot or iced.", price: 22 },
            { id: "cold-brew", name: "Cold brew", description: "Steeped for eighteen hours, no sugar.", price: 21, tags: ["vegan"] },
          ],
        },
        {
          id: "saudi",
          label: "Saudi coffee",
          items: [
            { id: "khawlani", name: "Khawlani coffee with cardamom and saffron", description: "From Jazan farms, served in a small dallah with three cups.", price: 28 },
            { id: "karak", name: "Karak tea", description: "Black tea with milk and cardamom.", price: 12 },
            { id: "mint", name: "Green tea with mint", description: "Fresh mint and a little sugar.", price: 18 },
            { id: "dates", name: "Sukkari dates", description: "From Qassim farms, served with your coffee.", price: 15, tags: ["vegan"] },
          ],
        },
        {
          id: "sweets",
          label: "Sweets",
          items: [
            { id: "date-cake", name: "Warm date cake", description: "With toffee sauce and a scoop of vanilla ice cream.", price: 26, tags: ["new"] },
            { id: "saffron-cheesecake", name: "Saffron cheesecake", description: "On a Lotus biscuit base.", price: 28 },
            { id: "almond-croissant", name: "Almond croissant", description: "Baked every morning.", price: 18 },
            { id: "cookie", name: "Dark chocolate cookie", description: "With sea salt.", price: 14 },
            { id: "basbousa", name: "Basbousa with qishta", description: "A big piece, enough for two.", price: 16 },
            { id: "brownie", name: "Pistachio brownie", description: "Warm, with chocolate sauce.", price: 20 },
          ],
        },
      ],
      labels: menuEn,
    },
    about: {
      eyebrow: "Our story",
      title: "A small roastery that knows its farms",
      description: "We started in 2021 with a small roaster in Al Malqa. Today we buy from four farms whose owners we know by name.",
      items: [
        {
          title: "We roast by hand, twice a week",
          description:
            "Every batch is 12 kilograms at most, and the roast date is written on every bag. Whatever does not sell within ten days never reaches the shelf.",
          media: placeholder,
        },
        {
          title: "Four farms, and the farm name on every bag",
          description:
            "Yirgacheffe from Ethiopia, Huila from Colombia, Haraz from Yemen and Khawlani from Jazan. We visit our farms every season, and we tell you where your beans came from.",
          media: placeholder,
        },
      ],
    },
    gallery: {
      lang: "en",
      eyebrow: "Inside Rakwa",
      title: "A corner of Al Malqa worth sitting in",
      description: "Window seats, a long work table, and a family area upstairs.",
      photos: [
        { alt: "The barista behind the bar" },
        { alt: "Freshly roasted beans in the roastery" },
        { alt: "Window seats in the morning" },
        { alt: "The long work table" },
        { alt: "A V60 on the table" },
        { alt: "The roaster during a batch" },
        { alt: "The family area upstairs" },
        { alt: "The warm date cake" },
      ],
      labels: galleryEn,
    },
    location: {
      lang: "en",
      eyebrow: "Visit us",
      title: "Find us in Al Malqa",
      description: "Parking in front of the cafe, and a family area upstairs. We close for two hours at Friday prayer.",
      name: "Rakwa, Al Malqa branch",
      address: "Anas Ibn Malik Road, Al Malqa District, Riyadh 13521",
      phone,
      whatsapp: { phone: whatsapp, message: "Hello, I would like to book a table at Rakwa." },
      directions: { label: "Directions on Google Maps", href: mapsHref, external: true },
      hours,
      labels: locationEn,
    },
    testimonial: {
      title: "What our guests say",
      item: {
        quote:
          "I first came for the Saudi coffee, and now my day only starts with their V60. The barista knows my order before I say it.",
        name: "Abdulaziz Al-Mutairi",
        role: "Software engineer, regular guest",
      },
    },
    app: {
      lang: "en",
      title: "Order before you arrive",
      description: "Order on the app and pick up at the bar with no queue. Every cup earns a point, and the tenth cup is on us.",
      appStore: { label: "App Store", href: "#app-store" },
      googlePlay: { label: "Google Play", href: "#google-play" },
      qrValue: "https://rakwa.example/app",
      rating: { value: 4.9, count: 3200 },
      labels: appEn,
    },
    footer: {
      brand: { name: "Rakwa", description: "A roastery and specialty cafe in Riyadh, roasting every Sunday and Wednesday." },
      columns: [
        {
          title: "Menu",
          links: [
            { label: "Coffee and sweets", href: "#menu" },
            { label: "Order on the app", href: "#app" },
            { label: "Wholesale", href: "#wholesale" },
          ],
        },
        {
          title: "Visit",
          links: [
            { label: "Location and hours", href: "#visit" },
            { label: "Gallery", href: "#gallery" },
          ],
        },
        {
          title: "About Rakwa",
          links: [
            { label: "Our story", href: "#about" },
            { label: "Careers", href: "#careers" },
          ],
        },
      ],
      contact: {
        phone,
        email: "hello@rakwa.example",
        whatsapp: { phone: whatsapp, message: "Hello, I have a question about Rakwa." },
      },
      legal: {
        text: "© 2026 Rakwa Coffee Est. All rights reserved.",
        crNumber: "1010456789",
        vatNumber: "300045678900003",
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { RestaurantPage01, demo }
export type { RestaurantPage01Props }
export default RestaurantPage01
