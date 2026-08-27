import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { getProvider } from "@/lib/data";
import { computeRating, useReviews } from "@/lib/store";

export const Route = createFileRoute("/rate/$id")({
  head: () => ({
    meta: [
      { title: "تقييم مقدم الخدمة — سندك في الحياة" },
      { name: "description", content: "قيّم مقدم الخدمة من 1 إلى 5 نجوم وأضف تعليقًا اختياريًا." },
      { property: "og:title", content: "تقييم مقدم الخدمة — سندك في الحياة" },
      { property: "og:description", content: "شاركنا تجربتك بعد التعامل مع مقدم الخدمة." },
    ],
  }),
  component: RatePage,
});

function RatePage() {
  const { id } = useParams({ from: "/rate/$id" });
  const provider = getProvider(id);
  const navigate = useNavigate();
  const { reviews, addReview } = useReviews();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

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

  const submit = () => {
    if (stars < 1) {
      toast.error("اختر عدد النجوم أولاً");
      return;
    }
    addReview(provider.id, stars, comment);
    toast.success("شكرًا لك، تم إضافة تقييمك");
    navigate({ to: "/provider/$id", params: { id: provider.id } });
  };

  return (
    <AppShell title="تقييم مقدم الخدمة" subtitle={provider.name}>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">
          المتوسط الحالي: <span className="font-bold text-card-foreground">{average.toFixed(1)}</span> من 5
          ({count} تقييم)
        </p>

        <div className="mt-4 flex justify-center gap-2" dir="ltr">
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} onClick={() => setStars(i)} aria-label={`${i} نجوم`}>
              <Star
                size={34}
                className={i <= stars ? "fill-accent text-accent" : "text-muted-foreground/40"}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="تعليق اختياري…"
          className="mt-4 w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />

        <button
          onClick={submit}
          className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
        >
          إرسال التقييم
        </button>
      </div>
    </AppShell>
  );
}
