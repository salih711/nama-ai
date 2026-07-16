import { motion } from "framer-motion";
import { Users, Plus, Search, CheckCircle2, Trash2 } from "lucide-react";
import { useState } from "react";

const MOCK_BENEFICIARIES = [
  { id: "b1", name: "أحمد محمد السعيد",      bank: "مصرف الإنماء",         iban: "SA44 2000 0001 2345 6789 1234", initials: "أح" },
  { id: "b2", name: "سارة عبدالله الحربي",   bank: "البنك الأهلي",          iban: "SA36 8000 0003 1111 2222 3333", initials: "سع" },
  { id: "b3", name: "شركة التقنية المتقدمة", bank: "بنك الراجحي",           iban: "SA04 6000 0002 9876 5432 1098", initials: "شت" },
  { id: "b4", name: "خالد عمر الزهراني",     bank: "بنك ساب",              iban: "SA70 0500 0007 4444 5555 6666", initials: "خع" },
  { id: "b5", name: "نورة فيصل العتيبي",     bank: "بنك الإمارات دبي",      iban: "SA02 0600 0008 7777 8888 9999", initials: "نف" },
];

export default function Beneficiaries() {
  const [query, setQuery] = useState("");
  const filtered = MOCK_BENEFICIARIES.filter(
    (b) => b.name.includes(query) || b.bank.includes(query) || b.iban.includes(query)
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-24 space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground">إدارة المستفيدين</h1>
            <p className="text-muted-foreground mt-1">أضف مستفيدين جدداً وأدِر قائمة حساباتك المحفوظة بسهولة.</p>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shrink-0">
            <Plus className="w-3.5 h-3.5" />
            إضافة مستفيد
          </button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.06 }}
        className="relative"
      >
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث باسم المستفيد أو رقم الآيبان…"
          className="w-full bg-card border border-card-border rounded-xl pr-10 pl-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/20 transition-all shadow-sm"
        />
      </motion.div>

      {/* Beneficiaries list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.1 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm divide-y divide-border overflow-hidden"
      >
        {filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-muted-foreground">
            <Users className="w-8 h-8 opacity-30" />
            <p className="text-sm">لا توجد نتائج مطابقة</p>
          </div>
        ) : (
          filtered.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="flex items-center justify-between px-5 py-4 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{b.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.bank}</p>
                  <p className="text-[11px] text-muted-foreground/70 font-mono mt-0.5 truncate" dir="ltr">{b.iban}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 mr-3">
                <button className="hidden group-hover:flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg transition-all">
                  <CheckCircle2 className="w-3 h-3" />
                  تحويل
                </button>
                <button className="hidden group-hover:flex items-center justify-center text-muted-foreground hover:text-destructive p-1.5 rounded-lg transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      <p className="text-center text-xs text-muted-foreground">
        {filtered.length} مستفيد من أصل {MOCK_BENEFICIARIES.length}
      </p>
    </div>
  );
}
