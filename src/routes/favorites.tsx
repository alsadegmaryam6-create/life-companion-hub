import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProviderCard } from "@/components/ProviderCard";
import { providers } from "@/lib/data";
import { useFavorites } from "@/lib/store";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "المفضلة — سندك في الحياة" },
      { name: "description", content: "مقدمو الخدمات الذين أضفتهم إلى قائمتك المفضلة." },
      { property: "og:title", content: "المفضلة — سندك في الحياة" },
      { property: "og:description", content: "قائمتك المحفوظة من مقدمي الخدمات." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useFavorites();
  const list = providers.filter((p) => favorites.includes(p.id));

  return (
    <AppShell title="المفضلة" subtitle="قائمتك المحفوظة">
      {list.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">لا توجد عناصر في المفضلة بعد.</p>
          <Link
            to="/search"
            className="mt-3 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            ابدأ البحث
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
