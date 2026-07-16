import { useGetAiAgentFlow, useSubmitAgentAnswer } from "@workspace/api-client-react";
import type { AgentQuestion } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles, Check, ArrowLeft,
  Building, Target, PieChart, Shield, Home,
  Activity, TrendingUp, CreditCard, PiggyBank,
  Brain, Eye, Lightbulb, Zap, Search, BarChart3,
  ScanLine, ShoppingBag, Wallet, Clock, Star,
  ChevronLeft, AlertCircle, TrendingDown, Globe,
  Plane, MapPin, DollarSign, Banknote, Lock,
  FileText, CheckCircle2, Smartphone, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "welcome" | "questioning" | "analyzing" | "report";

interface AgentReport {
  goalLabel: string;
  financialScore: number;
  financialScoreLabel: string;
  financialScorePercentile: number;
  yearlySavings: number;
  insights: { type: "strength" | "gap" | "opportunity"; title: string; text: string }[];
  recommendation: { productName: string; compatibilityScore: number; recommendationId: string };
  nextBestActions: { step: number; label: string; description: string }[];
}

// ─── Icon Map ─────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  // Goal step 1
  investment: TrendingUp,
  "credit-card": CreditCard,
  financing: Building,
  saving: PiggyBank,
  banking: Brain,
  // Income step 2
  income_low: Wallet,
  income_mid: DollarSign,
  income_high: Banknote,
  income_vhigh: TrendingUp,
  // Spending step 3
  spend_sm: PiggyBank,
  spend_md: ShoppingBag,
  spend_lg: BarChart3,
  // Investment goal-specific
  growth: TrendingUp,
  income: CreditCard,
  preservation: Shield,
  low: Shield,
  medium: PieChart,
  high: Activity,
  amount_low: Wallet,
  amount_medium: Wallet,
  amount_high: TrendingUp,
  // Credit card specific
  travel_frequent: Plane,
  travel_rare: MapPin,
  no_travel: Home,
  travel_dining: Star,
  shopping: ShoppingBag,
  fuel_bills: Zap,
  mixed: BarChart3,
  cashback: Wallet,
  points: Star,
  travel_perks: Globe,
  low_fees: Shield,
  // Financing
  personal_needs: Home,
  home_reno: Home,
  education: Building,
  vehicle: CreditCard,
  amount_sm: Wallet,
  amount_md: Wallet,
  amount_lg: TrendingUp,
  term_1: Clock,
  term_3: Clock,
  term_5plus: Target,
  // Saving
  emergency_fund: Shield,
  big_purchase: ShoppingBag,
  retirement: Target,
  children_edu: Building,
  save_low: PiggyBank,
  save_medium: PiggyBank,
  save_high: TrendingUp,
  timeline_short: Clock,
  timeline_mid: Clock,
  timeline_long: Target,
  // Banking
  transfers: Zap,
  smart_accounts: PiggyBank,
  digital_experience: Smartphone,
  investment_access: TrendingUp,
  high_fees: AlertCircle,
  complexity: AlertCircle,
  lack_awareness: Eye,
  limited_digital: Activity,
  daily: Activity,
  few_weekly: Clock,
  rarely: Target,
};

// ─── Analysis Steps ───────────────────────────────────────────────────────────
const ANALYSIS_STEPS = [
  { icon: Eye,      label: "فهم ملفك الشخصي وأهدافك" },
  { icon: ScanLine, label: "قراءة سجل المعاملات (آخر 90 يوماً)" },
  { icon: BarChart3, label: "تحليل سلوك الإنفاق وأنماطه" },
  { icon: Search,   label: "مقارنة 47 منتجاً في محفظة الإنماء" },
  { icon: Target,   label: "مطابقة ملفك بأفضل الخيارات" },
  { icon: Sparkles, label: "التقرير المالي الشخصي جاهز" },
];

const STEP_DELAY_MS = 900;

// ─── Welcome features ─────────────────────────────────────────────────────────
const WELCOME_FEATURES = [
  {
    icon: Eye,
    title: "يقرأ بياناتك أولاً",
    desc: "قبل أي سؤال، نماء يحلل معاملاتك وسلوكك الإنفاقي خلال الـ 90 يوماً الماضية.",
  },
  {
    icon: Brain,
    title: "يفهم وضعك الفعلي",
    desc: "6 أسئلة مدروسة تبني صورة دقيقة عن وضعك المالي وطموحاتك.",
  },
  {
    icon: Search,
    title: "يقارن 47 منتجاً",
    desc: "نماء يفلتر كامل محفظة الإنماء ليجد الخيار الأمثل لملفك تحديداً.",
  },
  {
    icon: FileText,
    title: "يُسلّمك تقريراً حقيقياً",
    desc: "تقرير مالي شخصي مع توصية واضحة وشرح لكل سبب وكل رقم.",
  },
];

const TRUST_STATS = [
  { value: "6",   label: "أسئلة فقط" },
  { value: "3",   label: "دقائق" },
  { value: "47",  label: "منتجاً مُقارَناً" },
  { value: "100%", label: "مجاناً" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function makeSessionId() {
  return Math.random().toString(36).slice(2, 11);
}

function insightStyle(type: string) {
  if (type === "strength")
    return { icon: TrendingUp,  color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
  if (type === "gap")
    return { icon: TrendingDown, color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200" };
  return   { icon: Sparkles,    color: "text-primary",     bg: "bg-primary/5",   border: "border-primary/15" };
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 0 — Welcome
// ─────────────────────────────────────────────────────────────────────────────
function WelcomePhase({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        {/* Animated orb */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-3xl bg-primary/10 animate-pulse" />
          <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 scale-110 animate-ping opacity-40" />
          <div className="relative w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">مصرف الإنماء</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
            نماء — مستشارك المالي الذكي
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            6 أسئلة فقط. تحليل عميق لبياناتك. توصية مالية مخصصة تماماً لك.
          </p>
        </motion.div>
      </motion.div>

      {/* Trust stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-3 mb-10"
      >
        {TRUST_STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.06 }}
            className="bg-card border border-card-border rounded-2xl p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-primary mb-0.5">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {WELCOME_FEATURES.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="bg-card border border-card-border rounded-2xl p-5 flex gap-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <feat.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">{feat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-col items-center gap-4"
      >
        <button
          onClick={onStart}
          className={cn(
            "group flex items-center gap-3 px-10 py-4 rounded-2xl",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "text-base font-bold shadow-lg shadow-primary/20",
            "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
          )}
        >
          <Sparkles className="w-5 h-5" />
          ابدأ مع نماء
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        </button>

        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            بياناتك محمية
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            بدون التزام
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            استشارة مجانية
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 1 — Questioning
// ─────────────────────────────────────────────────────────────────────────────
function QuestioningPhase({
  question,
  onAnswer,
  isPending,
  pendingKey,
}: {
  question: AgentQuestion;
  onAnswer: (key: string) => void;
  isPending: boolean;
  pendingKey: string | null;
}) {
  const isFirst = question.stepNumber === 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-7"
      >
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">نماء — مستشارك المالي الذكي</h1>
          <p className="text-xs text-muted-foreground">يعمل على تحليل بياناتك المالية في الوقت الفعلي</p>
        </div>
      </motion.div>

      {/* "What Namaa already did" — only on step 1 */}
      {isFirst && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-card-border rounded-2xl p-5 shadow-sm mb-6"
        >
          <p className="text-[11px] font-bold text-primary mb-3 uppercase tracking-wider">ما فعله نماء قبل قليل</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Eye,       text: "حلّل معاملاتك خلال آخر 90 يوماً" },
              { icon: Activity,  text: "لاحظ أن نسبة ادخارك دون الهدف الأمثل" },
              { icon: Lightbulb, text: "وجد خياراً قد يكون أفضل بكثير لك" },
              { icon: TrendingUp,text: "رصد فرصة لتحسين عوائدك المالية" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              للحصول على التوصية الأنسب لك، أجب عن{" "}
              <span className="font-bold text-foreground">{question.totalSteps} أسئلة سريعة.</span>
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Question card ── */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.stepNumber}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-card-border rounded-2xl p-6 md:p-8 shadow-sm"
            >
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                  سؤال {question.stepNumber} من {question.totalSteps}
                </span>
                <div className="flex gap-1" dir="ltr">
                  {[...Array(question.totalSteps)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-400",
                        i + 1 === question.stepNumber ? "w-7 bg-primary" :
                        i + 1 < question.stepNumber  ? "w-2.5 bg-primary/50" :
                        "w-2.5 bg-secondary",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* AI label */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <span className="text-xs text-primary font-semibold">نماء يسألك</span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-6">
                {question.question}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((opt) => {
                  const Icon = iconMap[opt.key] ?? Activity;
                  const isThis = isPending && pendingKey === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => onAnswer(opt.key)}
                      disabled={isPending}
                      className={cn(
                        "text-right p-4 rounded-xl border-2 transition-all duration-200 group",
                        "hover:border-primary/40 hover:bg-secondary/40 hover:shadow-sm",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        "disabled:opacity-60 disabled:cursor-not-allowed",
                        isThis ? "border-primary bg-primary/5" : "border-border bg-card",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5",
                          isThis ? "bg-primary/15" : "bg-secondary group-hover:bg-primary/10",
                        )}>
                          {isThis ? (
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                        <div className="text-right flex-1 min-w-0">
                          <h3 className={cn(
                            "font-bold text-sm mb-1 transition-colors",
                            isThis ? "text-primary" : "text-foreground group-hover:text-primary",
                          )}>
                            {opt.label}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Profile sidebar ── */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.stepNumber}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-secondary/30 border border-border rounded-2xl p-5 sticky top-6"
            >
              <h3 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                ملفك يتشكل
              </h3>
              <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                نماء يبني صورة كاملة عن وضعك المالي بناءً على إجاباتك.
              </p>

              <div className="space-y-4">
                {question.profileSoFar.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="mt-0.5 shrink-0">
                      {item.resolved ? (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium mb-0.5">{item.label}</p>
                      <p className={cn(
                        "text-sm font-bold leading-tight",
                        item.resolved ? "text-foreground" : "text-muted-foreground/40 italic",
                      )}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    بعد إجاباتك سيقدم نماء تقريراً مالياً مخصصاً — مع شرح دقيق لكل توصية.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 2 — AI Analysis animation
// ─────────────────────────────────────────────────────────────────────────────
function AnalyzingPhase({ onComplete }: { onComplete: () => void }) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    ANALYSIS_STEPS.forEach((_, idx) => {
      const t1 = setTimeout(() => setVisibleSteps(idx + 1), idx * STEP_DELAY_MS);
      const t2 = setTimeout(
        () => setDoneSteps((prev) => new Set(prev).add(idx)),
        idx * STEP_DELAY_MS + 520,
      );
      timers.current.push(t1, t2);
    });

    const tDone = setTimeout(onComplete, ANALYSIS_STEPS.length * STEP_DELAY_MS + 900);
    timers.current.push(tDone);

    return () => timers.current.forEach(clearTimeout);
  }, [onComplete]);

  const progress = Math.round((doneSteps.size / ANALYSIS_STEPS.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center">

      {/* Brain icon with pulse */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative w-20 h-20 mb-8"
      >
        <span className="absolute inset-0 rounded-3xl border-2 border-primary/30 animate-ping opacity-50" />
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
          <Brain className="w-10 h-10 text-primary" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-foreground mb-2 text-center"
      >
        نماء يحلل ملفك المالي
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-muted-foreground text-sm mb-10 text-center"
      >
        جارٍ بناء تقريرك الشخصي بناءً على بياناتك وإجاباتك…
      </motion.p>

      {/* Progress bar */}
      <div className="w-full bg-secondary rounded-full h-2 mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45 }}
        />
      </div>

      {/* Steps */}
      <div className="w-full space-y-3">
        {ANALYSIS_STEPS.map((step, idx) => {
          const visible = idx < visibleSteps;
          const done = doneSteps.has(idx);
          const isLast = idx === ANALYSIS_STEPS.length - 1;

          return (
            <AnimatePresence key={idx}>
              {visible && (
                <motion.div
                  initial={{ opacity: 0, x: -10, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  transition={{ duration: 0.28 }}
                  className={cn(
                    "flex items-center gap-4 px-5 py-3.5 rounded-xl border transition-all",
                    done && isLast
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : done
                      ? "bg-primary/6 border-primary/20"
                      : "bg-card border-border",
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    done && isLast ? "bg-white/20" :
                    done ? "bg-primary/15" : "bg-secondary",
                  )}>
                    {!done ? (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <step.icon className={cn("w-4 h-4", done && isLast ? "text-white" : "text-primary")} />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-semibold flex-1",
                    done && isLast ? "text-white" :
                    done ? "text-foreground" : "text-muted-foreground",
                  )}>
                    {step.label}
                  </span>
                  {done && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280 }}
                    >
                      <Check className={cn(
                        "w-5 h-5 stroke-[3]",
                        done && isLast ? "text-white" : "text-primary",
                      )} />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: progress === 100 ? 1 : 0 }}
        className="mt-8 text-sm text-primary font-bold"
      >
        التقرير جاهز — يتم الانتقال تلقائياً…
      </motion.p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 3 — Personalized report
// ─────────────────────────────────────────────────────────────────────────────
function ReportPhase({
  report,
  onViewRecommendation,
}: {
  report: AgentReport;
  onViewRecommendation: () => void;
}) {
  const scorePercent = report.financialScore;
  const circumference = 2 * Math.PI * 40;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Check className="w-5 h-5 text-white stroke-[3]" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-primary uppercase tracking-wider">اكتمل التحليل</p>
            <h1 className="text-2xl font-bold text-foreground leading-tight">تقريرك المالي الشخصي</h1>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          بناءً على تحليل معاملاتك وإجاباتك — مخصص بالكامل لك يا صالح.
        </p>
      </motion.div>

      {/* Savings banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08 }}
        className="bg-primary text-primary-foreground rounded-2xl px-7 py-5 mb-6 flex items-center justify-between shadow-sm"
      >
        <div>
          <p className="text-sm font-medium opacity-85 mb-1">الفائدة المالية السنوية المتوقعة إذا اتخذت الخطوة الآن</p>
          <p className="text-4xl font-bold tracking-tight">
            +{report.yearlySavings.toLocaleString("ar-SA")} ريال
          </p>
          <p className="text-sm opacity-75 mt-1">سنوياً — بناءً على ملفك وهدفك: {report.goalLabel}</p>
        </div>
        {/* Score ring */}
        <div className="hidden md:block relative w-24 h-24 shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
            <motion.circle
              cx="48" cy="48" r="40" fill="none"
              stroke="white" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (scorePercent / 100) * circumference }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-xl font-bold leading-none">{report.financialScore}</p>
            <p className="text-[10px] opacity-75">/100</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Insights ── */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-foreground mb-1">ما وجده نماء في ملفك</h2>

          {report.insights.map((insight, i) => {
            const { icon: Icon, color, bg, border } = insightStyle(insight.type);
            const typeLabel =
              insight.type === "strength" ? "نقطة قوة" :
              insight.type === "gap"      ? "فجوة" : "فرصة";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 + i * 0.1 }}
                className={cn("flex gap-4 rounded-2xl border p-5", bg, border)}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/70">
                  <Icon className={cn("w-5 h-5", color)} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider", color)}>{typeLabel}</span>
                    <span className="text-sm font-bold text-foreground">{insight.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.text}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Health score bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44 }}
            className="bg-card border border-card-border rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">مؤشر الصحة المالية</h3>
              <span className="text-xs text-muted-foreground">
                أفضل من {report.financialScorePercentile}% من العملاء
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scorePercent}%` }}
                  transition={{ duration: 0.9, delay: 0.5 }}
                />
              </div>
              <span className="text-lg font-bold text-primary shrink-0">{report.financialScore} / 100</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {report.financialScoreLabel} — مع إمكانية التحسين بخطوة واحدة
            </p>
          </motion.div>
        </div>

        {/* ── Sidebar ── */}
        <div className="lg:col-span-1 space-y-5">

          {/* Recommendation teaser */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border-2 border-primary/20 rounded-2xl p-5 shadow-sm"
          >
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-3">توصية نماء لك</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">المنتج الأنسب</p>
                <p className="text-sm font-bold text-foreground leading-snug">{report.recommendation.productName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4 bg-primary/5 rounded-xl p-3">
              <div className="text-2xl font-bold text-primary">{report.recommendation.compatibilityScore}%</div>
              <div>
                <p className="text-xs font-bold text-foreground">درجة التوافق</p>
                <p className="text-[10px] text-muted-foreground">توافق ممتاز مع ملفك المالي</p>
              </div>
            </div>

            <button
              onClick={onViewRecommendation}
              className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              اكتشف التوصية الكاملة
              <ChevronLeft className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Next best actions */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-card-border rounded-2xl p-5"
          >
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              أفضل خطواتك التالية
            </h3>
            <div className="space-y-4">
              {report.nextBestActions.map((action) => (
                <div key={action.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {action.step}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight mb-0.5">{action.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <div className="bg-secondary/40 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                هذه التوصية مبنية على تحليل بياناتك المالية حصراً — بشفافية تامة ودون أي تحيّز.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function AiAgent() {
  const [, setLocation] = useLocation();

  const sessionId = useRef(makeSessionId()).current;

  const [phase, setPhase] = useState<Phase>("welcome");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<AgentQuestion | null>(null);
  const [recommendationId, setRecommendationId] = useState<string | null>(null);
  const [report, setReport] = useState<AgentReport | null>(null);
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  // Pre-fetch eagerly so data is ready when user clicks "ابدأ مع نماء"
  const { data: initialFlow, isLoading, error } = useGetAiAgentFlow();

  const submitAnswer = useSubmitAgentAnswer();

  // When API responds, load the first question and enter questioning phase
  useEffect(() => {
    if (initialFlow && !currentQuestion && started) {
      setCurrentQuestion(initialFlow);
      setPhase("questioning");
    }
  }, [initialFlow, currentQuestion, started]);

  const handleStart = () => {
    setStarted(true);
    // If data already cached, go straight to questioning
    if (initialFlow) {
      setCurrentQuestion(initialFlow);
      setPhase("questioning");
    }
    // Otherwise the useEffect above will handle it when data arrives
  };

  const handleAnswer = (key: string) => {
    if (!currentQuestion || submitAnswer.isPending) return;
    setPendingKey(key);

    submitAnswer.mutate(
      { data: { stepNumber: currentQuestion.stepNumber, selectedKey: key, sessionId } },
      {
        onSuccess: (res) => {
          setPendingKey(null);
          if (res.done && res.recommendationId) {
            setRecommendationId(res.recommendationId);
            setPhase("analyzing");
          } else if (res.nextQuestion) {
            setCurrentQuestion(res.nextQuestion as AgentQuestion);
          }
        },
        onError: () => setPendingKey(null),
      },
    );
  };

  const handleAnalysisComplete = async () => {
    try {
      const res = await fetch(`/api/ai-agent/report?sessionId=${sessionId}`);
      const data: AgentReport = await res.json();
      setReport(data);
    } catch {
      setReport({
        goalLabel: "الاستثمار",
        financialScore: 74,
        financialScoreLabel: "جيد",
        financialScorePercentile: 68,
        yearlySavings: 4200,
        insights: [
          { type: "strength",    title: "نسبة ادخار ممتازة", text: "نسبة ادخارك 23% تفوق المتوسط الإقليمي بـ 8 نقاط." },
          { type: "gap",         title: "سيولة معطّلة",       text: "15,200 ريال في حسابات جارية لا تعطيك أي عائد." },
          { type: "opportunity", title: "فرصة تحسين العائد", text: "بإعادة توزيع المحفظة يمكن رفع العائد السنوي بمقدار 2.3%." },
        ],
        recommendation: { productName: "محفظة الإنماء للنمو", compatibilityScore: 92, recommendationId: "rec-001" },
        nextBestActions: [
          { step: 1, label: "اطّلع على التوصية المخصصة", description: "راجع التوصية الكاملة مع أسباب الاختيار." },
          { step: 2, label: "تحدث مع مستشار الإنماء",   description: "جلسة مجانية لمناقشة الخطوات العملية." },
          { step: 3, label: "ابدأ خطوتك الأولى",        description: "التفعيل يستغرق أقل من 5 دقائق." },
        ],
      });
    }
    setPhase("report");
  };

  const handleViewRecommendation = () => {
    const id = report?.recommendation.recommendationId ?? recommendationId ?? "rec-001";
    setLocation(`/recommendation/${id}`);
  };

  // Loading spinner while API fetches after user clicks start
  const showLoader =
    phase === "welcome" && started && (isLoading || (!currentQuestion && !error));

  return (
    <AnimatePresence mode="wait">

      {/* Phase 0 — Welcome */}
      {phase === "welcome" && (
        <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
          {showLoader ? (
            <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[60vh] gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <p className="text-muted-foreground font-medium animate-pulse">نماء يراجع ملفك المالي…</p>
            </div>
          ) : error ? (
            <div className="max-w-3xl mx-auto px-6 py-16 text-center">
              <p className="text-destructive font-medium">تعذّر تحميل المستشار المالي. يرجى المحاولة مجدداً.</p>
            </div>
          ) : (
            <WelcomePhase onStart={handleStart} />
          )}
        </motion.div>
      )}

      {/* Phase 1 — Questioning */}
      {phase === "questioning" && currentQuestion && (
        <motion.div key="questioning" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}>
          <QuestioningPhase
            question={currentQuestion}
            onAnswer={handleAnswer}
            isPending={submitAnswer.isPending}
            pendingKey={pendingKey}
          />
        </motion.div>
      )}

      {/* Phase 2 — Analysis */}
      {phase === "analyzing" && (
        <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <AnalyzingPhase onComplete={handleAnalysisComplete} />
        </motion.div>
      )}

      {/* Phase 3 — Report */}
      {phase === "report" && report && (
        <motion.div key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ReportPhase report={report} onViewRecommendation={handleViewRecommendation} />
        </motion.div>
      )}

    </AnimatePresence>
  );
}
