import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MessageCircle, Phone, Upload } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { ADMIN_PHONE, PAYMENT_METHODS, SUBSCRIPTION_PRICES } from "@/lib/data";

export const Route = createFileRoute("/subscribe")({
  head: () => ({
    meta: [
      { title: "الاشتراك والدفع — سندك في الحياة" },
      {
        name: "description",
        content: "أسعار الاشتراك الشهري لمقدمي الخدمات، الشهر الأول مجانًا، والدفع عبر بنكك وفوري وأوكاش.",
      },
      { property: "og:title", content: "الاشتراك والدفع — سندك في الحياة" },
      { property: "og:description", content: "اشترك كمقدم خدمة وأرسل إشعار الدفع للإدارة." },
    ],
  }),
  component: SubscribePage,
});

function SubscribePage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<string | null>(null);

  const selectedPlan = SUBSCRIPTION_PRICES.find((p) => p.key === plan);

  const sendToAdmin = () => {
    if (!plan || !method) {
      toast.error("اختر نوع الاشتراك وطريقة الدفع أولاً");
      return;
    }
    if (!receipt) {
      toast.error("ارفع صورة إشعار الدفع أولاً");
      return;
    }
    const text = `إشعار دفع جديد%0Aنوع الاشتراك: ${selectedPlan?.label}%0Aالمبلغ: ${selectedPlan?.price.toLocaleString("en-US")} جنيه%0Aطريقة الدفع: ${method}`;
    window.open(`https://wa.me/249${ADMIN_PHONE.slice(1)}?text=${text}`, "_blank");
    toast.success("تم فتح واتساب الإدارة لإرسال الإشعار");
  };

  return (
    <AppShell title="الاشتراك والدفع" subtitle="لمقدمي الخدمات — الشهر الأول مجانًا">
      <div className="rounded-2xl border border-primary/30 bg-secondary p-4 text-sm text-secondary-foreground">
        <p className="flex items-center gap-2 font-bold">
          <CheckCircle2 size={16} /> الشهر الأول مجاني بالكامل
        </p>
        <p className="mt-1 text-xs">بعد انتهاء الفترة المجانية يبدأ الاشتراك الشهري حسب القسم.</p>
      </div>

      <h2 className="mt-5 text-base font-bold text-foreground">الأسعار الشهرية</h2>
      <div className="mt-2 space-y-2">
        {SUBSCRIPTION_PRICES.map((p) => (
          <button
            key={p.key}
            onClick={() => setPlan(p.key)}
            className={`flex w-full items-center justify-between rounded-2xl border bg-card px-4 py-3 text-right shadow-sm transition-colors ${
              plan === p.key ? "border-primary" : "border-border"
            }`}
          >
            <span className="text-sm font-semibold text-card-foreground">{p.label}</span>
            <span className="text-sm font-bold text-primary">
              {p.price.toLocaleString("en-US")} جنيه / شهر
            </span>
          </button>
        ))}
      </div>

      <h2 className="mt-5 text-base font-bold text-foreground">طريقة الدفع</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {PAYMENT_METHODS.map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`rounded-2xl border px-2 py-3 text-sm font-bold shadow-sm transition-colors ${
              method === m
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-card-foreground"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        بعد التحويل عبر الطريقة المختارة، ارفع صورة الإشعار وأرسلها للإدارة على الرقم {ADMIN_PHONE}.
      </p>

      <h2 className="mt-5 text-base font-bold text-foreground">إشعار الدفع</h2>
      <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-4 py-6 text-sm font-semibold text-muted-foreground">
        <Upload size={18} />
        {receipt ? "تم اختيار صورة الإشعار" : "رفع صورة إشعار الدفع"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setReceipt(URL.createObjectURL(file));
          }}
        />
      </label>
      {receipt ? (
        <img src={receipt} alt="إشعار الدفع" className="mt-3 w-full rounded-2xl border border-border" />
      ) : null}

      <button
        onClick={sendToAdmin}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
      >
        <MessageCircle size={16} /> إرسال إشعار الدفع للإدارة
      </button>
      <a
        href={`tel:${ADMIN_PHONE}`}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-card-foreground"
      >
        <Phone size={16} /> الاتصال بالإدارة {ADMIN_PHONE}
      </a>
    </AppShell>
  );
}
