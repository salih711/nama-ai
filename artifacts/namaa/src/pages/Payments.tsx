import { motion } from "framer-motion";
import { Receipt, Wifi, Zap, Phone, ShoppingBag, CheckCircle2, Clock } from "lucide-react";

const CATEGORIES = [
  { icon: Zap,        label: "الكهرباء",      amount: "320.00",   due: "30 يوليو" },
  { icon: Wifi,       label: "الاتصالات",     amount: "199.00",   due: "25 يوليو" },
  { icon: Phone,      label: "الجوال",        amount: "85.00",    due: "28 يوليو" },
  { icon: ShoppingBag, label: "المشتريات",   amount: "—",        due: "—" },
];

const RECENT_PAYMENTS = [
  { id: "p1", name: "شركة الكهرباء الوطنية",  amount: "340.00",  date: "12 يوليو",  status: "مدفوعة" },
  { id: "p2", name: "STC — اشتراك الجوال",    amount: "85.00",   date: "10 يوليو",  status: "مدفوعة" },
  { id: "p3", name: "زين — الإنترنت المنزلي", amount: "199.00",  date: "8 يوليو",   status: "مدفوعة" },
];

export default function Payments() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-24 space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-bold text-foreground">المدفوعات</h1>
        <p className="text-muted-foreground mt-1">سدّد فواتيرك ومدفوعاتك الشهرية من مكان واحد وبدون رسوم.</p>
      </motion.div>

      {/* Pending bills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.08 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-bold text-foreground">الفواتير القادمة</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              className="bg-card border border-card-border rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-primary/25 hover:shadow-md transition-all duration-200 text-right group"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <cat.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">{cat.label}</p>
                {cat.amount !== "—" ? (
                  <p className="text-xs text-muted-foreground">
                    {cat.amount} ر.س &nbsp;·&nbsp; الاستحقاق {cat.due}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">لا توجد فواتير مستحقة</p>
                )}
              </div>
              {cat.amount !== "—" && (
                <span className="text-xs font-bold text-primary shrink-0">سدّد</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Payment form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.14 }}
        className="bg-card border border-card-border rounded-2xl p-6 shadow-sm space-y-5"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Receipt className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-sm font-bold text-foreground">دفع فاتورة جديدة</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">الخدمة أو رقم الفاتورة</label>
            <input
              type="text"
              placeholder="أدخل رقم الفاتورة أو اسم الخدمة…"
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">المبلغ (ر.س)</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all"
            />
          </div>
        </div>

        <button className="w-full bg-primary text-white font-bold text-sm rounded-xl py-3 hover:bg-primary/90 transition-colors">
          سدّد الآن
        </button>
      </motion.div>

      {/* Recent payments */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.2 }}
        className="space-y-3"
      >
        <h2 className="text-sm font-bold text-foreground">آخر المدفوعات</h2>
        <div className="bg-card border border-card-border rounded-2xl shadow-sm divide-y divide-border">
          {RECENT_PAYMENTS.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">{p.amount} <span className="text-xs font-normal">ر.س</span></p>
                <p className="text-xs text-primary font-semibold">{p.status}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
