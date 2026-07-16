import { useGetRecommendation, getGetRecommendationQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, ShieldCheck, AlertTriangle,
  Check, BrainCircuit, TrendingUp, ChevronLeft,
  Star, Zap, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

// Yearly savings pulled from the recommendation id (matches backend config)
const yearlySavingsMap: Record<string, { amount: number; label: string }> = {
  "rec-001": { amount: 4200, label: "عائد استثماري سنوي متوقع" },
  "rec-002": { amount: 680,  label: "استرداد نقدي سنوي متوقع" },
};

export default function Recommendation() {
  const params = useParams();
  const id = params.id as string;
  const { data: rec, isLoading } = useGetRecommendation(id, {
    query: { enabled: !!id, queryKey: getGetRecommendationQueryKey(id) },
  });

  if (isLoading || !rec) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-medium animate-pulse">نماء يحضّر توصيتك…</p>
      </div>
    );
  }

  const savings = yearlySavingsMap[id] ?? { amount: 1850, label: "فائدة مالية سنوية متوقعة" };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24">

      {/* Back */}
      <Link href="/ai-agent">
        <div className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer">
          <ArrowRight className="w-4 h-4" />
          العودة للمستشار
        </div>
      </Link>

      {/* Savings Banner */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary text-primary-foreground rounded-2xl px-7 py-5 mb-8 flex items-center justify-between shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium opacity-85">{savings.label}</p>
            <p className="text-2xl font-bold tracking-tight">
              {savings.amount.toLocaleString("ar-SA")}+ ريال / سنة
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
          <Star className="w-4 h-4 fill-white" />
          <span className="text-sm font-bold">توافق {rec.compatibilityScore}%</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* ── Main Column ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-card-border rounded-3xl p-7 shadow-sm"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              {rec.productType} — موصى به من نماء
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
              {rec.productName}
            </h1>

            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              {rec.summary}
            </p>

            <div className="flex flex-wrap gap-3 pt-5 border-t border-border">
              <div className="flex items-center gap-2 bg-primary/8 text-primary rounded-xl px-4 py-2 text-sm font-bold">
                <Zap className="w-4 h-4" />
                درجة التوافق {rec.compatibilityScore}%
              </div>
              <div className="flex items-center gap-2 bg-secondary text-foreground rounded-xl px-4 py-2 text-sm font-bold">
                <ShieldCheck className="w-4 h-4 text-primary" />
                معتمد شرعياً
              </div>
              <div className="flex items-center gap-2 bg-secondary text-foreground rounded-xl px-4 py-2 text-sm font-bold">
                <Calendar className="w-4 h-4 text-primary" />
                تفعيل خلال 5 دقائق
              </div>
            </div>
          </motion.div>

          {/* Why */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              لماذا اختار نماء هذا المنتج لك؟
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {rec.reasons.map((reason, idx) => (
                <div key={idx} className="bg-secondary/40 border border-border rounded-2xl p-5">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5 text-sm">{reason.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pros / Risks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2 text-sm">
                <ShieldCheck className="w-4 h-4" />
                المزايا الرئيسية
              </h3>
              <ul className="space-y-3">
                {rec.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground font-medium">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5 stroke-[3]" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-6">
              <h3 className="font-bold text-amber-700 dark:text-amber-500 mb-4 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                مخاطر يجب مراعاتها
              </h3>
              <ul className="space-y-3">
                {rec.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-amber-900 dark:text-amber-200 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Next Best Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-bold text-foreground mb-4">أفضل خطوة تالية</h2>
            <div className="space-y-3">
              {[
                { step: 1, label: rec.nextStep.primary, desc: "الخطوة الأولى نحو تحقيق هدفك المالي — تستغرق أقل من 5 دقائق." },
                { step: 2, label: "احجز جلسة مع مستشار الإنماء", desc: "جلسة مجانية لمراجعة التفاصيل والإجابة على كل أسئلتك." },
                { step: 3, label: rec.nextStep.secondary, desc: "استكشف خيارات أخرى أو قارن المنتجات المتاحة." },
              ].map(({ step, label, desc }) => (
                <div key={step} className="flex items-start gap-4 bg-card border border-card-border rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    {step}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground mb-0.5">{label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Sidebar ── */}
        <div className="lg:col-span-1 space-y-5">

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-sm"
          >
            <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">اتخذ قراراً الآن</p>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              التطبيق يستغرق أقل من 5 دقائق ويمكنك إلغاؤه في أي وقت.
            </p>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                {rec.nextStep.primary}
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-full py-3.5 px-4 bg-transparent hover:bg-secondary text-foreground border border-border text-sm font-bold rounded-xl transition-colors">
                {rec.nextStep.secondary}
              </button>
            </div>
          </motion.div>

          {/* Explainable AI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
            className="bg-card border border-card-border rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-foreground mb-5 flex items-center gap-2 text-sm">
              <BrainCircuit className="w-4 h-4 text-primary" />
              كيف اتخذ نماء القرار؟
            </h3>

            <div className="space-y-3.5 mb-6 relative before:absolute before:inset-y-2 before:right-3 before:w-px before:bg-border">
              {rec.explainableAI.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3.5 relative z-10">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 bg-card",
                    step.done ? "bg-primary border-primary" : "border-muted"
                  )}>
                    {step.done && <Check className="w-3 h-3 text-primary-foreground stroke-[3]" />}
                  </div>
                  <span className={cn("text-xs font-medium leading-snug", step.done ? "text-foreground" : "text-muted-foreground")}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-muted-foreground">درجة التوافق</span>
                <span className="text-sm font-bold text-primary">{rec.compatibilityScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${rec.compatibilityScore}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
            className="bg-secondary/30 border border-border rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground mb-1">ضمان الشفافية من نماء</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  هذه التوصية مبنية حصراً على تحليل بياناتك المالية — لا عمولات، لا تحيّز لمنتج على آخر.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
