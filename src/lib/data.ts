export type Category =
  | "doctor"
  | "pharmacy"
  | "hospital"
  | "realestate"
  | "delivery"
  | "service";

export type Provider = {
  id: string;
  name: string;
  category: Category;
  subtitle: string;
  city: string;
  address: string;
  phone: string;
  whatsapp?: string;
  keywords: string[];
  baseRating: number;
  baseCount: number;
  // pharmacy
  receptionName?: string;
  receptionPhone?: string;
  // real estate
  deal?: "sale" | "rent";
  propertyType?: "house" | "office";
  price?: string;
  rooms?: number;
  area?: string;
  // delivery
  vehicle?: "car" | "rickshaw" | "tuktuk";
  driverName?: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  doctor: "الأطباء",
  pharmacy: "الصيدليات",
  hospital: "المستشفيات",
  realestate: "السكن والعقارات",
  delivery: "التوصيل",
  service: "مقدمو الخدمات",
};

export const VEHICLE_LABELS: Record<string, string> = {
  car: "موتر",
  rickshaw: "ركشة",
  tuktuk: "توكتوك",
};

export const DEAL_LABELS: Record<string, string> = {
  sale: "بيع",
  rent: "إيجار",
};

export const PROPERTY_LABELS: Record<string, string> = {
  house: "منزل",
  office: "مكتب",
};

export const ADMIN_PHONE = "0913032542";

export const SUBSCRIPTION_PRICES: { key: string; label: string; price: number }[] = [
  { key: "doctor", label: "الأطباء", price: 20000 },
  { key: "pharmacy", label: "الصيدليات", price: 20000 },
  { key: "hospital", label: "المستشفيات", price: 20000 },
  { key: "sale", label: "البيع", price: 20000 },
  { key: "service", label: "مقدمو الخدمات", price: 20000 },
  { key: "delivery", label: "التوصيل (ركشة – موتر – توكتوك)", price: 10000 },
];

export const PAYMENT_METHODS = ["بنكك", "فوري", "أوكاش"];

export const providers: Provider[] = [
  {
    id: "d1",
    name: "د. أحمد عبد الرحمن",
    category: "doctor",
    subtitle: "أخصائي باطنية",
    city: "الخرطوم",
    address: "شارع الستين – عمارة النيل",
    phone: "0912000001",
    whatsapp: "249912000001",
    keywords: ["باطنية", "طبيب", "عيادة"],
    baseRating: 4.6,
    baseCount: 24,
  },
  {
    id: "d2",
    name: "د. سارة الطيب",
    category: "doctor",
    subtitle: "طب الأطفال",
    city: "أم درمان",
    address: "الثورة الحارة 12",
    phone: "0912000002",
    whatsapp: "249912000002",
    keywords: ["أطفال", "طبيبة"],
    baseRating: 4.8,
    baseCount: 41,
  },
  {
    id: "d3",
    name: "د. مصطفى إدريس",
    category: "doctor",
    subtitle: "جراحة عظام",
    city: "بحري",
    address: "شمبات – مجمع الشفاء",
    phone: "0912000003",
    whatsapp: "249912000003",
    keywords: ["عظام", "جراحة"],
    baseRating: 4.3,
    baseCount: 17,
  },
  {
    id: "p1",
    name: "صيدلية النور",
    category: "pharmacy",
    subtitle: "مفتوحة 24 ساعة",
    city: "الخرطوم",
    address: "العمارات شارع 15",
    phone: "0913000001",
    whatsapp: "249913000001",
    receptionName: "أستاذ عمر بابكر",
    receptionPhone: "0913000011",
    keywords: ["دواء", "صيدلية", "أدوية"],
    baseRating: 4.5,
    baseCount: 30,
  },
  {
    id: "p2",
    name: "صيدلية الشفاء",
    category: "pharmacy",
    subtitle: "توصيل أدوية داخل المدينة",
    city: "أم درمان",
    address: "الموردة – السوق الكبير",
    phone: "0913000002",
    receptionName: "أستاذة هدى محمد",
    receptionPhone: "0913000022",
    keywords: ["دواء", "صيدلية"],
    baseRating: 4.1,
    baseCount: 12,
  },
  {
    id: "h1",
    name: "مستشفى السلام التخصصي",
    category: "hospital",
    subtitle: "طوارئ – عمليات – معمل",
    city: "الخرطوم",
    address: "شارع المعونة",
    phone: "0914000001",
    whatsapp: "249914000001",
    keywords: ["مستشفى", "طوارئ", "عمليات"],
    baseRating: 4.4,
    baseCount: 52,
  },
  {
    id: "h2",
    name: "مستشفى النيل الأزرق",
    category: "hospital",
    subtitle: "باطنية وأطفال وحضانة",
    city: "بحري",
    address: "الصافية",
    phone: "0914000002",
    keywords: ["مستشفى", "حضانة"],
    baseRating: 4.0,
    baseCount: 19,
  },
  {
    id: "r1",
    name: "منزل للبيع – الرياض",
    category: "realestate",
    subtitle: "منزل مساحة 400م مربع",
    city: "الخرطوم",
    address: "حي الرياض مربع 4",
    phone: "0915000001",
    whatsapp: "249915000001",
    deal: "sale",
    propertyType: "house",
    price: "مليار و 200 مليون جنيه",
    rooms: 5,
    area: "400م²",
    keywords: ["بيع", "منزل", "عقار", "سكن"],
    baseRating: 4.2,
    baseCount: 8,
  },
  {
    id: "r2",
    name: "منزل للإيجار – الطائف",
    category: "realestate",
    subtitle: "منزل مؤثث 3 غرف",
    city: "الخرطوم",
    address: "الطائف مربع 2",
    phone: "0915000002",
    whatsapp: "249915000002",
    deal: "rent",
    propertyType: "house",
    price: "250,000 جنيه شهريًا",
    rooms: 3,
    area: "250م²",
    keywords: ["إيجار", "منزل", "سكن"],
    baseRating: 4.0,
    baseCount: 6,
  },
  {
    id: "r3",
    name: "مكتب للإيجار – العمارات",
    category: "realestate",
    subtitle: "مكتب إداري بالطابق الثاني",
    city: "الخرطوم",
    address: "العمارات شارع 41",
    phone: "0915000003",
    deal: "rent",
    propertyType: "office",
    price: "400,000 جنيه شهريًا",
    area: "120م²",
    keywords: ["إيجار", "مكتب", "عقار"],
    baseRating: 3.9,
    baseCount: 4,
  },
  {
    id: "r4",
    name: "مكتب للبيع – السوق العربي",
    category: "realestate",
    subtitle: "مكتب تجاري جاهز",
    city: "الخرطوم",
    address: "السوق العربي",
    phone: "0915000004",
    whatsapp: "249915000004",
    deal: "sale",
    propertyType: "office",
    price: "600 مليون جنيه",
    area: "90م²",
    keywords: ["بيع", "مكتب", "عقار"],
    baseRating: 4.1,
    baseCount: 5,
  },
  {
    id: "v1",
    name: "توصيل موتر – الأمين",
    category: "delivery",
    subtitle: "توصيل داخل وخارج المدينة",
    city: "الخرطوم",
    address: "الخرطوم وضواحيها",
    phone: "0916000001",
    whatsapp: "249916000001",
    vehicle: "car",
    driverName: "الأمين حسن",
    keywords: ["توصيل", "موتر", "عربية"],
    baseRating: 4.7,
    baseCount: 33,
  },
  {
    id: "v2",
    name: "ركشة – ود الياس",
    category: "delivery",
    subtitle: "توصيل سريع داخل الحي",
    city: "أم درمان",
    address: "أم درمان",
    phone: "0916000002",
    whatsapp: "249916000002",
    vehicle: "rickshaw",
    driverName: "محمد ود الياس",
    keywords: ["ركشة", "توصيل"],
    baseRating: 4.2,
    baseCount: 21,
  },
  {
    id: "v3",
    name: "توكتوك – عثمان",
    category: "delivery",
    subtitle: "خدمة 24 ساعة",
    city: "بحري",
    address: "بحري",
    phone: "0916000003",
    vehicle: "tuktuk",
    driverName: "عثمان آدم",
    keywords: ["توكتوك", "توصيل"],
    baseRating: 4.0,
    baseCount: 15,
  },
  {
    id: "s1",
    name: "الأسطى كهربائي – طارق",
    category: "service",
    subtitle: "صيانة كهرباء منازل",
    city: "الخرطوم",
    address: "خدمة منزلية",
    phone: "0917000001",
    whatsapp: "249917000001",
    keywords: ["كهربائي", "صيانة", "خدمات"],
    baseRating: 4.5,
    baseCount: 14,
  },
  {
    id: "s2",
    name: "سباك – ود الفادني",
    category: "service",
    subtitle: "سباكة وتمديدات مياه",
    city: "أم درمان",
    address: "خدمة منزلية",
    phone: "0917000002",
    keywords: ["سباك", "مياه", "خدمات"],
    baseRating: 4.3,
    baseCount: 9,
  },
  {
    id: "s3",
    name: "نجار – الصادق",
    category: "service",
    subtitle: "أثاث وصيانة أبواب",
    city: "بحري",
    address: "ورشة شمبات",
    phone: "0917000003",
    whatsapp: "249917000003",
    keywords: ["نجار", "أثاث", "خدمات"],
    baseRating: 4.4,
    baseCount: 11,
  },
];

export function getProvider(id: string) {
  return providers.find((p) => p.id === id);
}

export function searchProviders(query: string, category?: Category | "all") {
  const q = query.trim().toLowerCase();
  return providers.filter((p) => {
    const catOk = !category || category === "all" || p.category === category;
    if (!catOk) return false;
    if (!q) return true;
    return [p.name, p.subtitle, p.city, p.address, p.driverName ?? "", p.receptionName ?? "", ...p.keywords]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}
