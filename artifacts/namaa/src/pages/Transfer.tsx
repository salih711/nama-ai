import { motion } from "framer-motion";
import { ArrowLeftRight, Building2, Clock, CheckCircle2 } from "lucide-react";

const MOCK_RECENT = [
  { id: "t1", name: "أحمد محمد السعيد", iban: "SA44 2000 0001 2345 6789 1234", amount: "1,500.00", date: "اليوم، 10:23 ص", status: "completed" },
  { id: "t2", name: "شركة التقنية المتقدمة", iban: "SA04 6000 0002 9876 5432 1098", amount: "8,250.00", date: "أمس، 3:45 م", status: "completed" },
  { id: "t3", name: "سارة عبدالله الحربي", iban: "SA36 8000 0003 1111 2222 3333", amount: "500.00", date: "14 يوليو، 9:00 ص", status: "completed" },
];

export default function Transfer() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-24 space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-bold text-foreground">التحويل السريع</h1>
        <p className="text-muted-foreground mt-1">حوّل الأموال إلى أي حساب داخلي فورياً دون أي خطوات إضافية.</p>
      </motion.div>

      {/* Transfer form card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.08 }}
        className="bg-card border border-card-border rounded-2xl p-6 shadow-sm space-y-5"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-sm font-bold text-foreground">تفاصيل التحويل</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">من الحساب</label>
            <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
              <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">الحساب الجاري الرئيسي</p>
                <p className="text-xs text-muted-foreground">SA44 •••• •••• 1234 &nbsp;|&nbsp; الرصيد: 24,350.75 ر.س</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">رقم الآيبان أو اسم المستفيد</label>
            <input
              type="text"
              placeholder="SA00 0000 0000 0000 0000 0000"
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all text-left dir-ltr"
              dir="ltr"
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">ملاحظة (اختياري)</label>
            <input
              type="text"
              placeholder="أضف وصفاً للتحويل…"
              className="w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all"
            />
          </div>
        </div>

        <button className="w-full bg-primary text-white font-bold text-sm rounded-xl py-3 hover:bg-primary/90 transition-colors">
          تأكيد التحويل
        </button>
      </motion.div>

      {/* Recent transfers */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.14 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-bold text-foreground">آخر التحويلات</h2>
        </div>
        <div className="bg-card border border-card-border rounded-2xl shadow-sm divide-y divide-border">
          {MOCK_RECENT.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{t.iban.replace(/(.{4})/g, "$1 ").trim()}</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">{t.amount} <span className="text-xs font-normal">ر.س</span></p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
