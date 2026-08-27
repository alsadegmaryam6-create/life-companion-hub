import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ProviderCard } from "@/components/ProviderCard";
import { providers } from "@/lib/data";

export const Route = createFileRoute("/realestate")({
  head: () => ({
    meta: [
      { title: "السكن والعقارات — سندك في الحياة" },
      { name: "description", content: "عقارات للبيع أو الإيجار: منازل ومكاتب مع تفاصيل واضحة." },
      { property: "og:title", content: "السكن والعقارات — سندك في الحياة" },
      { property: "og:description", content: "اختر بيع أو إيجار ثم نوع العقار: منزل أو مكتب." },
    ],
  }),
  component: RealEstatePage,
});

function RealEstatePage() {
  const [deal, setDeal] = useState<"sale" | "rent" | null>(null);
  const [type, setType] = useState<"house" | "office" | null>(null);

  const list = providers.filter(
    (p) => p.category === "realestate" && (!deal || p.deal === deal) && (!type || p.propertyType === type),
  );

  return (
    <AppShell title="السكن والعقارات" subtitle="اختر بيع أو إيجار ثم نوع العقار">
      <div className="grid grid-cols-2 gap-3">
        {(["sale", "rent"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDeal(deal === d ? null : d)}
            className={`rounded-2xl border px-3 py-4 text-sm font-bold shadow-sm transition-colors ${
              deal === d
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-card-foreground"
            }`}
          >
            {d === "sale" ? "بيع" : "إيجار"}
          </button>
        ))}
      </div>

      {deal ? (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(["house", "office"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(type === t ? null : t)}
              className={`rounded-2xl border px-3 py-3 text-sm font-semibold shadow-sm transition-colors ${
                type === t
                  ? "border-primary bg-secondary text-secondary-foreground"
                  : "border-border bg-card text-card-foreground"
              }`}
            >
              {t === "house" ? "منزل" : "مكتب"}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-5 space-y-3">
        {list.map((p) => (
          <div key={p.id} className="space-y-2">
            <ProviderCard provider={p} />
            <div className="rounded-xl border border-border bg-secondary/60 px-4 py-2 text-xs text-secondary-foreground">
              <span className="font-semibold">السعر:</span> {p.price}
              {p.rooms ? <span> — الغرف: {p.rooms}</span> : null}
              {p.area ? <span> — المساحة: {p.area}</span> : null}
              <span> — الموقع: {p.address}</span>
            </div>
          </div>
        ))}
        {list.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            لا توجد عقارات مطابقة لاختيارك.
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}
