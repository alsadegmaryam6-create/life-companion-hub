import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Phone, User } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Stars } from "@/components/Stars";
import { providers } from "@/lib/data";
import { computeRating, useReviews } from "@/lib/store";

export const Route = createFileRoute("/pharmacies")({
  head: () => ({
    meta: [
      { title: "الصيدليات — سندك في الحياة" },
      { name: "description", content: "الصيدليات مع اسم موظف الاستقبال ورقمه وأزرار اتصال وواتساب." },
      { property: "og:title", content: "الصيدليات — سندك في الحياة" },
      { property: "og:description", content: "تواصل مع الصيدلية مباشرة عبر الاتصال أو واتساب." },
    ],
  }),
  component: PharmaciesPage,
});

function PharmaciesPage() {
  const list = providers.filter((p) => p.category === "pharmacy");
  const [selected, setSelected] = useState<string | null>(null);
  const { reviews } = useReviews();
  const active = list.find((p) => p.id === selected);

  return (
    <AppShell title="الصيدليات" subtitle="اختر الصيدلية لعرض بيانات الاستقبال">
      <div className="space-y-3">
        {list.map((p) => {
          const { average, count } = computeRating(p.id, reviews);
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id === selected ? null : p.id)}
              className={`w-full rounded-2xl border bg-card p-4 text-right shadow-sm transition-colors ${
                selected === p.id ? "border-primary" : "border-border"
              }`}
            >
              <span className="block text-base font-bold text-card-foreground">{p.name}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{p.subtitle}</span>
              <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Stars value={average} />
                <span className="font-semibold text-card-foreground">{average.toFixed(1)}</span>
                <span>({count} تقييم)</span>
              </span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="mt-4 rounded-2xl border border-primary/30 bg-secondary p-4">
          <h2 className="text-base font-bold text-secondary-foreground">{active.name}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-secondary-foreground">
            <User size={15} /> موظف الاستقبال: {active.receptionName}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-secondary-foreground">
            <Phone size={15} /> {active.receptionPhone}
          </p>
          <div className="mt-3 flex gap-2">
            <a
              href={`tel:${active.receptionPhone ?? active.phone}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <Phone size={15} /> اتصال
            </a>
            {active.whatsapp ? (
              <a
                href={`https://wa.me/${active.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground"
              >
                <MessageCircle size={15} /> واتساب
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
