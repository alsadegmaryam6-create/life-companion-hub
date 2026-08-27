import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProviderCard } from "@/components/ProviderCard";
import { providers } from "@/lib/data";

export const Route = createFileRoute("/hospitals")({
  head: () => ({
    meta: [
      { title: "المستشفيات — سندك في الحياة" },
      { name: "description", content: "قائمة المستشفيات وأقسام الطوارئ مع أرقام التواصل." },
      { property: "og:title", content: "المستشفيات — سندك في الحياة" },
      { property: "og:description", content: "أقرب مستشفى إليك بأرقام تواصل مباشرة." },
    ],
  }),
  component: () => {
    const list = providers.filter((p) => p.category === "hospital");
    return (
      <AppShell title="المستشفيات" subtitle="طوارئ وعمليات وتخصصات">
        <div className="space-y-3">
          {list.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </AppShell>
    );
  },
});
