import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Flag, Heart, MapPin, MessageCircle, Phone, Star, User } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Stars } from "@/components/Stars";
import {
  CATEGORY_LABELS,
  DEAL_LABELS,
  PROPERTY_LABELS,
  VEHICLE_LABELS,
  getProvider,
} from "@/lib/data";
import { computeRating, useFavorites, useReviews } from "@/lib/store";

export const Route = createFileRoute("/provider/$id")({
  head: () => ({
    meta: [
      { title: "تفاصيل مقدم الخدمة — سندك في الحياة" },
      { name: "description", content: "بيانات مقدم الخدمة وأرقام التواصل والتقييمات وطلب الخدمة." },
      { property: "og:title", content: "تفاصيل مقدم الخدمة — سندك في الحياة" },
      { property: "og:description", content: "اتصل، راسل على واتساب، أو قيّم مقدم الخدمة." },
    ],
  }),
  component: ProviderPage,
});

function ProviderPage() {
  const { id } = useParams({ from: "/provider/$id" });
  const provider = getProvider(id);
  const { reviews } = useReviews();
  const { favorites, toggle } = useFavorites();

  if (!provider) {
    return (
      <AppShell title="غير موجود">
        <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          مقدم الخدمة غير متوفر.
        </p>
      </AppShell>
    );
  }

  const { average, count } = computeRating(provider.id, reviews);
  const providerReviews = reviews.filter((r) => r.providerId === provider.id).reverse();
  const isFav = favorites.includes(provider.id);

  return (
    <AppShell title={provider.name} subtitle={provider.subtitle}>
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
            {CATEGORY_LABELS[provider.category]}
          </span>
          {provider.deal ? (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
              {DEAL_LABELS[provider.deal]}
            </span>
          ) : null}
          {provider.propertyType ? (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
              {PROPERTY_LABELS[provider.propertyType]}
            </span>
          ) : null}
          {provider.vehicle ? (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
              {VEHICLE_LABELS[provider.vehicle]}
            </span>
          ) : null}
        </div>

        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={15} /> {provider.address} — {provider.city}
        </p>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Phone size={15} /> {provider.phone}
        </p>
        {provider.receptionName ? (
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <User size={15} /> موظف الاستقبال: {provider.receptionName} — {provider.receptionPhone}
          </p>
        ) : null}
        {provider.driverName ? (
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <User size={15} /> السائق: {provider.driverName}
          </p>
        ) : null}
        {provider.price ? (
          <p className="mt-1 text-sm text-muted-foreground">
            السعر: {provider.price}
            {provider.rooms ? ` — الغرف: ${provider.rooms}` : ""}
            {provider.area ? ` — المساحة: ${provider.area}` : ""}
          </p>
        ) : null}

        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Stars value={average} size={16} />
          <span className="font-bold text-card-foreground">{average.toFixed(1)}</span>
          <span className="text-xs">({count} تقييم)</span>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <a
          href={`tel:${provider.phone}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Phone size={16} /> اتصال
        </a>
        {provider.whatsapp ? (
          <a
            href={`https://wa.me/${provider.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-3 py-3 text-sm font-semibold text-accent-foreground"
          >
            <MessageCircle size={16} /> واتساب
          </a>
        ) : null}
        <button
          onClick={() => toast.success("تم إرسال طلب الخدمة، سيتم التواصل معك")}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-3 text-sm font-semibold text-card-foreground"
        >
          طلب الخدمة
        </button>
        <button
          onClick={() => toast.success("تم إرسال طلب الحجز")}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-3 text-sm font-semibold text-card-foreground"
        >
          حجز موعد
        </button>
        <button
          onClick={() => toggle(provider.id)}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-3 text-sm font-semibold text-card-foreground"
        >
          <Heart size={16} className={isFav ? "fill-destructive text-destructive" : ""} />
          {isFav ? "في المفضلة" : "أضف للمفضلة"}
        </button>
        <button
          onClick={() => toast.success("تم استلام بلاغك وسيتم مراجعته")}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-3 text-sm font-semibold text-destructive"
        >
          <Flag size={16} /> إبلاغ
        </button>
      </div>

      <Link
        to="/rate/$id"
        params={{ id: provider.id }}
        className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-secondary px-3 py-3 text-sm font-bold text-secondary-foreground"
      >
        <Star size={16} /> قيّم مقدم الخدمة
      </Link>

      <h2 className="mt-6 text-base font-bold text-foreground">التقييمات</h2>
      <div className="mt-2 space-y-2">
        {providerReviews.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
            لا توجد تعليقات بعد — كن أول من يقيّم.
          </p>
        ) : (
          providerReviews.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-4">
              <Stars value={r.stars} />
              {r.comment ? <p className="mt-1 text-sm text-card-foreground">{r.comment}</p> : null}
              <p className="mt-1 text-[11px] text-muted-foreground">
                {new Date(r.date).toLocaleDateString("ar-EG")}
              </p>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
