import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Phone, User } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Stars } from "@/components/Stars";
import { providers, VEHICLE_LABELS } from "@/lib/data";
import { computeRating, useReviews } from "@/lib/store";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "التوصيل — سندك في الحياة" },
      { name: "description", content: "خدمات التوصيل بالموتر والركشة والتوكتوك مع أرقام السائقين." },
      { property: "og:title", content: "التوصيل — سندك في الحياة" },
      { property: "og:description", content: "اتصل بالسائق مباشرة أو راسله على واتساب." },
    ],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  const [vehicle, setVehicle] = useState<string | null>(null);
  const { reviews } = useReviews();
  const list = providers.filter((p) => p.category === "delivery" && (!vehicle || p.vehicle === vehicle));

  return (
    <AppShell title="التوصيل" subtitle="اختر نوع التوصيل">
      <div className="grid grid-cols-3 gap-2">
        {(["car", "rickshaw", "tuktuk"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVehicle(vehicle === v ? null : v)}
            className={`rounded-2xl border px-2 py-3 text-sm font-bold shadow-sm transition-colors ${
              vehicle === v
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-card-foreground"
            }`}
          >
            {VEHICLE_LABELS[v]}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {list.map((p) => {
          const { average, count } = computeRating(p.id, reviews);
          return (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <h2 className="text-base font-bold text-card-foreground">{p.name}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <User size={14} /> السائق: {p.driverName}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} /> {p.phone}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Stars value={average} />
                <span className="font-semibold text-card-foreground">{average.toFixed(1)}</span>
                <span>({count} تقييم)</span>
              </p>
              <div className="mt-3 flex gap-2">
                <a
                  href={`tel:${p.phone}`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <Phone size={15} /> اتصال
                </a>
                {p.whatsapp ? (
                  <a
                    href={`https://wa.me/${p.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground"
                  >
                    <MessageCircle size={15} /> واتساب
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
