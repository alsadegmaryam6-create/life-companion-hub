import { Link } from "@tanstack/react-router";
import { Heart, MapPin, Phone } from "lucide-react";
import { Stars } from "./Stars";
import { computeRating, useFavorites, useReviews } from "@/lib/store";
import {
  CATEGORY_LABELS,
  DEAL_LABELS,
  PROPERTY_LABELS,
  VEHICLE_LABELS,
  type Provider,
} from "@/lib/data";

export function ProviderCard({ provider }: { provider: Provider }) {
  const { reviews } = useReviews();
  const { favorites, toggle } = useFavorites();
  const { average, count } = computeRating(provider.id, reviews);
  const isFav = favorites.includes(provider.id);

  const tags = [
    CATEGORY_LABELS[provider.category],
    provider.deal ? DEAL_LABELS[provider.deal] : null,
    provider.propertyType ? PROPERTY_LABELS[provider.propertyType] : null,
    provider.vehicle ? VEHICLE_LABELS[provider.vehicle] : null,
  ].filter(Boolean) as string[];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/provider/$id"
            params={{ id: provider.id }}
            className="block truncate text-base font-bold text-card-foreground"
          >
            {provider.name}
          </Link>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{provider.subtitle}</p>
        </div>
        <button
          aria-label="إضافة للمفضلة"
          onClick={() => toggle(provider.id)}
          className="rounded-full border border-border p-2 text-muted-foreground"
        >
          <Heart size={16} className={isFav ? "fill-destructive text-destructive" : ""} />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {tags.map((t) => (
          <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
            {t}
          </span>
        ))}
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} /> {provider.city}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Stars value={average} />
          <span className="font-semibold text-card-foreground">{average.toFixed(1)}</span>
          <span>({count} تقييم)</span>
        </span>
        <div className="flex gap-2">
          <a
            href={`tel:${provider.phone}`}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            <Phone size={13} /> اتصال
          </a>
          <Link
            to="/provider/$id"
            params={{ id: provider.id }}
            className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-card-foreground"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}
