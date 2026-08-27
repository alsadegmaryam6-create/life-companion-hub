import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProviderCard } from "@/components/ProviderCard";
import { providers } from "@/lib/data";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "الأطباء — سندك في الحياة" },
      { name: "description", content: "قائمة الأطباء والتخصصات مع أرقام التواصل والتقييمات." },
      { property: "og:title", content: "الأطباء — سندك في الحياة" },
      { property: "og:description", content: "اعثر على طبيبك واتصل به مباشرة." },
    ],
  }),
  component: () => {
    const list = providers.filter((p) => p.category === "doctor");
    return (
      <AppShell title="الأطباء" subtitle="اتصل بطبيبك مباشرة">
        <div className="space-y-3">
          {list.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </AppShell>
    );
  },
});
