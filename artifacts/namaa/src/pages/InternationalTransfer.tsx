import { motion } from "framer-motion";
import { Globe, ArrowLeftRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

const CURRENCIES = [
  { code: "USD", label: "دولار أمريكي",   flag: "🇺🇸", rate: "3.7502" },
  { code: "EUR", label: "يورو",            flag: "🇪🇺", rate: "4.0851" },
  { code: "GBP", label: "جنيه إسترليني",  flag: "🇬🇧", rate: "4.7623" },
  { code: "AED", label: "درهم إماراتي",   flag: "🇦🇪", rate: "1.0214" },
  { code: "EGP", label: "جنيه مصري",      flag: "🇪🇬", rate: "0.0766" },
  { code: "INR", label: "روبية هندية",    flag: "🇮🇳", rate: "0.0449" },
];

const RECENT = [
  { id: "i1", name: "John Smith",      country: "المملكة المتحدة", amount: "500 GBP",  sar: "2,381.15", date: "12 يوليو",  status: "مكتمل" },
  { id: "i2", name: "Priya Sharma",    country: "الهند",           amount: "10,000 INR", sar: "449.00", date: "5 يوليو",   status: "مكتمل" },
  { id: "i3", name: "محمد العمري",    country: "الإمارات",        amount: "2,000 AED", sar: "2,042.80", date: "1 يوليو",   status: "مكتمل" },
];

export default function InternationalTransfer() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const selected = CURRENCIES.find((c) => c.code === selectedCurrency) ?? CURRENCIES[0];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-24 space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-bold text-foreground">التحويل الدولي</h1>
        <p className="text-muted-foreground mt-1">أرسل الأموال إلى الخارج بأسعار صرف تنافسية وتتبّع فوري للحوالة.</p>
      </motion.div>

      {/* Exchange rates strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.06 }}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      >
        {CURRENCIES.map((c) => (
          <button
            key={c.code}
            onClick={() => setSelectedCurrency(c.code)}
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              selectedCurrency === c.code
                ? "bg-primary text-white border-primary"
                : "bg-card border-card-border text-foreground hover:border-primary/30"
            }`}
          >
            <span>{c.flag}</span>
            <span>{c.code}</span>
            <span className={selectedCurrency === c.code ? "text-white/70" : "text-muted-foreground"}>
              {c.rate} ر.س
            </span>
          </button>
        ))}
      </motion.div>

      {/* Transfer form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.1 }}
        className="bg-card border border-card-border rounded-2xl p-6 shadow-sm space-y-5"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">تفاصيل الحوالة</h2>
            <p className="text-xs text-muted-foreground">
              سعر الصرف الحالي: 1 {selected.code} = {selected.rate} ر.س
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">الدولة والعملة</label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.label} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">اسم المستفيد</label>
            <input
              type="text"
              placeholder="الاسم الكامل كما في الحساب البنكي"
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">رقم الحساب / IBAN</label>
            <input
              type="text"
              placeholder="GBXX XXXX XXXX XXXX XXXX XX"
              dir="ltr"
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all text-left"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">المبلغ بالريال (ر.س)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">يستلم ({selected.code})</label>
              <div className="flex items-center gap-2 bg-secondary/60 rounded-xl px-4 py-3">
                <ArrowLeftRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">—</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-primary/5 border border-primary/15 rounded-xl px-4 py-3">
          <AlertCircle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            التحويلات الدولية تستغرق 1–3 أيام عمل. لا توجد رسوم إضافية على التحويلات أقل من 50,000 ر.س.
          </p>
        </div>

        <button className="w-full bg-primary text-white font-bold text-sm rounded-xl py-3 hover:bg-primary/90 transition-colors">
          إرسال الحوالة
        </button>
      </motion.div>

      {/* Recent international transfers */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.18 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-bold text-foreground">آخر الحوالات الدولية</h2>
        </div>
        <div className="bg-card border border-card-border rounded-2xl shadow-sm divide-y divide-border">
          {RECENT.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.country} &nbsp;·&nbsp; {r.amount}</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">{r.sar} <span className="text-xs font-normal">ر.س</span></p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
