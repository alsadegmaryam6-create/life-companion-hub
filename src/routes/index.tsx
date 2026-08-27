import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Bike,
  Cross,
  Home as HomeIcon,
  Search,
  Stethoscope,
  Wrench,
  CreditCard,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProviderCard } from "@/components/ProviderCard";
import { providers } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "سندك في الحياة — دليل الخدمات والأطباء في السودان" },
      {
        name: "description",
        content:
          "ابحث عن طبيب أو صيدلية أو مستشفى أو عقار أو خدمة توصيل، واتصل مباشرة بدون تسجيل حساب.",
      },
      { property: "og:title", content: "سندك في الحياة" },
      {
        property: "og:description",
        content: "دليل الأطباء والصيدليات والمستشفيات والعقارات والتوصيل في السودان.",
      },
    ],
  }),
  component: Index,
});

const sections = [
  { to: "/doctors", label: "الأطباء", icon: Stethoscope },
  { to: "/pharmacies", label: "الصيدليات", icon: Cross },
  { to: "/hospitals", label: "المستشفيات", icon: Building2 },
  { to: "/realestate", label: "السكن والعقارات", icon: HomeIcon },
  { to: "/delivery", label: "التوصيل", icon: Bike },
  { to: "/services", label: "مقدمو الخدمات", icon: Wrench },
] as const;

function Index() {
  const featured = providers.slice(0, 4);

  return (
    <AppShell title="سندك في الحياة" subtitle="خدماتك كلها في مكان واحد — بدون تسجيل">
      <Link
        to="/search"
        className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm"
      >
        <Search size={18} />
        ابحث عن طبيب، صيدلية، مستشفى، عقار أو توصيل…
      </Link>

      <h2 className="mt-6 text-base font-bold text-foreground">الأقسام</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {sections.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-2 py-4 text-center shadow-sm"
          >
            <span className="rounded-full bg-secondary p-2.5 text-primary">
              <Icon size={20} />
            </span>
            <span className="text-xs font-semibold text-card-foreground">{label}</span>
          </Link>
        ))}
      </div>

      <Link
        to="/subscribe"
        className="mt-5 flex items-center justify-between rounded-2xl bg-primary px-4 py-4 text-primary-foreground shadow-sm"
      >
        <span>
          <span className="block text-sm font-bold">هل أنت مقدم خدمة؟</span>
          <span className="block text-xs opacity-85">اشترك الآن — الشهر الأول مجانًا</span>
        </span>
        <CreditCard size={22} />
      </Link>

      <h2 className="mt-6 text-base font-bold text-foreground">مقترحون لك</h2>
      <div className="mt-3 space-y-3">
        {featured.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </AppShell>
  );
}
