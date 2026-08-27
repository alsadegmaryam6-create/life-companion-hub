import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProviderCard } from "@/components/ProviderCard";
import { providers } from "@/lib/data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "مقدمو الخدمات — سندك في الحياة" },
      { name: "description", content: "كهربائيون وسباكون ونجارون وخدمات منزلية بأرقام تواصل." },
      { property: "og:title", content: "مقدمو الخدمات — سندك في الحياة" },
      { property: "og:description", content: "اطلب خدمة منزلية بسرعة وبدون تسجيل." },
    ],
  }),
  component: () => {
    const list = providers.filter((p) => p.category === "service");
    return (
      <AppShell title="الخدمات" subtitle="خدمات منزلية ومهنية">
        <div className="space-y-3">
          {list.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </AppShell>
    );
  },
});
