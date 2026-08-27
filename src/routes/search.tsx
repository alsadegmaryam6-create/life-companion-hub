import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProviderCard } from "@/components/ProviderCard";
import { CATEGORY_LABELS, searchProviders, type Category } from "@/lib/data";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "البحث — سندك في الحياة" },
      {
        name: "description",
        content: "ابحث عن مقدم خدمة أو طبيب أو صيدلية أو مستشفى أو عقار أو خدمة توصيل.",
      },
      { property: "og:title", content: "البحث — سندك في الحياة" },
      { property: "og:description", content: "ابحث عن أي خدمة تحتاجها بسهولة." },
    ],
  }),
  component: SearchPage,
});

const filters: ("all" | Category)[] = [
  "all",
  "doctor",
  "pharmacy",
  "hospital",
  "realestate",
  "delivery",
  "service",
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const results = searchProviders(query, category);

  return (
    <AppShell title="البحث" subtitle="ابحث عن طبيب، صيدلية، مستشفى، عقار أو توصيل">
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-sm">
        <SearchIcon size={18} className="text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="اكتب اسم الخدمة أو مقدم الخدمة…"
          className="w-full bg-transparent text-sm text-card-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setCategory(f)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              category === f
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground"
            }`}
          >
            {f === "all" ? "الكل" : CATEGORY_LABELS[f]}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{results.length} نتيجة</p>
      <div className="mt-2 space-y-3">
        {results.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
        {results.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            لا توجد نتائج مطابقة لبحثك.
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}
