import { useSubmitAgentAnswer } from "@workspace/api-client-react";
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
  FileText, CheckCircle2, Smartphone, Users, Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = "welcome" | "questioning" | "analyzing" | "report" | "review";

interface ReviewChatMessage {
  role: "ai" | "user";
  text: string;
}

interface AgentReport {
  goalLabel: string;
  financialScore: number;
  financialScoreLabel: string;
  financialScorePercentile: number;
  yearlySavings: number;
  executiveSummary: string;
  scoreExplanation: string;
  selectionReason: string;
  financialImpact: { label: string; value: string; description: string }[];
  improvementOpportunities: { title: string; description: string }[];
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
  // Banking (legacy)
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
  // health-report flow
  wealth_growth: TrendingUp,
  home_purchase: Home,
  oblig_none: CheckCircle2,
  oblig_light: Wallet,
  oblig_medium: BarChart3,
  oblig_heavy: AlertCircle,
  save_disciplined: PiggyBank,
  save_occasional: ShoppingBag,
  save_rarely: TrendingDown,
  // smart-recommendation flow
  grow_wealth: TrendingUp,
  reduce_debt: TrendingDown,
  save_more: PiggyBank,
  improve_credit: Star,
  products_none: Wallet,
  products_some: CreditCard,
  products_many: Banknote,
  // savings-planner flow
  target_low: Wallet,
  target_medium: Banknote,
  target_high: TrendingUp,
  // investment-advisor flow
  horizon_short: Clock,
  horizon_mid: Target,
  horizon_long: Globe,
  savings_none: Wallet,
  savings_low: PiggyBank,
  savings_high: TrendingUp,
  // financing-advisor flow
  employed: Building,
  self_employed: Users,
  business_owner: Landmark,
  other: Activity,
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
  const score = report.financialScore;
  const circumference = 2 * Math.PI * 60; // r=60 → ≈376.99

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, delay },
  });

  return (
    <div className="max-w-[760px] mx-auto px-4 py-10 space-y-6">

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-white border border-border rounded-2xl px-7 py-6 shadow-sm"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">نماء AI — تقرير مالي شخصي</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground leading-tight mb-1">
              تقريرك المالي الشخصي، يا صالح
            </h1>
            <p className="text-sm text-muted-foreground">
              صدر الآن بناءً على ملفك المالي وإجاباتك — مُخصَّص 100% لك.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/8 border border-primary/20 rounded-full text-[11px] font-bold text-primary">
              <Check className="w-3 h-3 stroke-[3]" />
              تحليل مكتمل
            </span>
            <span className="text-[11px] text-muted-foreground">الهدف: {report.goalLabel}</span>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION 1 — Executive Summary ──────────────────────────────── */}
      <motion.div {...fadeUp(0.08)} className="bg-white border border-border rounded-2xl p-7 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-1 rounded-r-2xl bg-primary" />
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">الملخص التنفيذي — نماء AI</span>
        </div>
        <p className="text-[15px] text-foreground leading-loose font-medium">
          {report.executiveSummary}
        </p>
      </motion.div>

      {/* ── SECTION 2 — Financial Health Score ─────────────────────────── */}
      <motion.div {...fadeUp(0.1)} className="bg-white border border-border rounded-2xl p-7 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">مؤشر الصحة المالية</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Circular gauge */}
          <div className="relative shrink-0" style={{ width: 160, height: 160 }}>
            <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#e8f4f0" strokeWidth="14" />
              <motion.circle
                cx="80" cy="80" r="60" fill="none"
                stroke="#006C54" strokeWidth="14" strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: circumference - (score / 100) * circumference }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <motion.p
                className="text-4xl font-bold text-primary leading-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {score}
              </motion.p>
              <p className="text-xs text-muted-foreground mt-1">من 100</p>
              <p className="text-[11px] font-bold text-primary mt-1">{report.financialScoreLabel}</p>
            </div>
          </div>

          {/* Score details */}
          <div className="flex-1 space-y-4 text-right">
            <div>
              <p className="text-xs text-muted-foreground mb-1">تصنيفك مقارنةً بعملاء الإنماء</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#e8f4f0] rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${report.financialScorePercentile}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
                <span className="text-sm font-bold text-primary shrink-0">أفضل من {report.financialScorePercentile}%</span>
              </div>
            </div>
            <div className="bg-[#f0f8f5] border border-primary/15 rounded-xl p-4">
              <p className="text-[11px] font-bold text-primary mb-1.5">كيف حُسبت درجتك؟</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{report.scoreExplanation}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION 3 — Key Financial Insights ─────────────────────────── */}
      <motion.div {...fadeUp(0.1)} className="bg-white border border-border rounded-2xl p-7 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Search className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">ما وجده نماء في ملفك</span>
        </div>

        <div className="space-y-3">
          {report.insights.map((insight, i) => {
            const { icon: Icon, color, bg, border } = insightStyle(insight.type);
            const typeLabel = insight.type === "strength" ? "نقطة قوة" : insight.type === "gap" ? "فجوة" : "فرصة";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn("flex gap-4 rounded-xl border p-4", bg, border)}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/80 shadow-sm">
                  <Icon className={cn("w-4.5 h-4.5", color)} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70", color)}>
                      {typeLabel}
                    </span>
                    <span className="text-sm font-bold text-foreground">{insight.title}</span>
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{insight.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── SECTION 4 — AI Recommendation ──────────────────────────────── */}
      <motion.div {...fadeUp(0.1)} className="bg-primary rounded-2xl p-7 shadow-lg text-primary-foreground">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest opacity-90">توصية نماء AI</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm opacity-80 mb-1.5">المنتج الأنسب لك من بين 47 خياراً</p>
            <h2 className="text-xl font-bold leading-snug mb-4">
              {report.recommendation.productName}
            </h2>
            <button
              onClick={onViewRecommendation}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-bold rounded-xl hover:bg-white/90 transition-colors shadow-sm"
            >
              اكتشف التوصية الكاملة
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          {/* Confidence badge */}
          <div className="bg-white/15 border border-white/25 rounded-2xl p-5 text-center shrink-0 min-w-[120px]">
            <p className="text-5xl font-bold leading-none mb-1">{report.recommendation.compatibilityScore}%</p>
            <p className="text-xs opacity-80 font-medium">درجة التوافق</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3 h-3", i < Math.round(report.recommendation.compatibilityScore / 20) ? "fill-white text-white" : "text-white/30")} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SECTION 5 — Why Namaa selected this ────────────────────────── */}
      <motion.div {...fadeUp(0.1)} className="bg-white border border-border rounded-2xl p-7 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">لماذا اختار نماء AI هذا المنتج؟</span>
        </div>
        <p className="text-[15px] text-foreground/85 leading-loose">
          {report.selectionReason}
        </p>
      </motion.div>

      {/* ── SECTION 6 — Financial Impact ────────────────────────────────── */}
      <motion.div {...fadeUp(0.1)} className="bg-white border border-border rounded-2xl p-7 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">الأثر المالي المتوقع</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {report.financialImpact.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#f0f8f5] border border-primary/15 rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-primary mb-1 leading-tight">{item.value}</p>
              <p className="text-[13px] font-bold text-foreground mb-1">{item.label}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── SECTION 7 — Improvement Opportunities ─────────────────────── */}
      <motion.div {...fadeUp(0.1)} className="bg-white border border-border rounded-2xl p-7 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">فرص التحسين المالي</span>
        </div>

        <div className="space-y-4">
          {report.improvementOpportunities.map((opp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary text-[13px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground mb-1">{opp.title}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{opp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── SECTION 8 — Next Best Actions (vertical timeline) ──────────── */}
      <motion.div {...fadeUp(0.1)} className="bg-white border border-border rounded-2xl p-7 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-widest">خطواتك التالية الأفضل</span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — positioned at the center of the 28px dot */}
          <div className="absolute top-4 bottom-4 right-[13px] w-0.5 bg-primary/15 rounded-full" />

          <div className="space-y-0">
            {report.nextBestActions.map((action, i) => (
              <motion.div
                key={action.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative flex items-start gap-4 pb-7 last:pb-0"
              >
                {/* Dot */}
                <div className="relative z-10 w-7 h-7 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-sm shadow-primary/30">
                  {action.step}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-sm font-bold text-foreground mb-1">{action.label}</p>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{action.description}</p>
                  {i === 0 && (
                    <button
                      onClick={onViewRecommendation}
                      className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-primary hover:underline"
                    >
                      عرض التوصية الكاملة <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── SECTION 9 — AI Footer ───────────────────────────────────────── */}
      <motion.div {...fadeUp(0.1)} className="bg-[#f4f7f6] border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">صدر عن نماء AI — مصرف الإنماء</p>
            <p className="text-[11px] text-muted-foreground">هذا التقرير مولَّد ديناميكياً بالذكاء الاصطناعي بناءً على ملفك المالي الشخصي.</p>
          </div>
        </div>
        <div className="flex items-start gap-2 pt-3 border-t border-border/60">
          <Lock className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            التوصيات المقدمة مبنية حصرياً على تحليل بيانات ملفك — دون أي تحيّز تجاري أو أولوية لمنتج على آخر. جميع الأرقام تقديرية وتستند لمتوسطات أداء تاريخية.
          </p>
        </div>
      </motion.div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Review Mode — constants
// ─────────────────────────────────────────────────────────────────────────────
const REVIEW_HERO = {
  productName:  "خطة الادخار الذكية",
  matchScore:   94,
  reasonLines: [
    "تم تحليل آخر 90 يوماً من معاملاتك.",
    "لاحظ نماء وجود فائض شهري قدره 420 ريال.",
    "بناءً على ذلك تم ترشيح خطة الادخار الذكية.",
  ],
  recHref: "/recommendation/rec-001",
};

const INITIAL_AI_MESSAGE =
  "مرحباً صالح 👋\n\nلقد راجعت بياناتك المالية.\n\nيسعدني أن أشرح لك سبب هذه التوصية أو أجيب عن أي سؤال يتعلق بها.";

const SUGGESTED_QUESTIONS = [
  "لماذا اخترت هذا المنتج؟",
  "كيف حسبت الفائض؟",
  "ماذا لو ادخرت 1000 ريال؟",
  "هل يوجد منتج أفضل لي؟",
];

// Answers are now generated server-side via POST /api/ai-agent/review-chat
// using the Financial Insight Object (Layer 2 — no raw banking data).

// ─────────────────────────────────────────────────────────────────────────────
// Phase 4 — Recommendation Review Mode
// ─────────────────────────────────────────────────────────────────────────────
function ReviewPhase({ onViewProduct }: { onViewProduct: () => void }) {
  const [, setLocation] = useLocation();

  // Stable session ID for this review conversation (server maintains history)
  const reviewSessionId = useRef(makeSessionId()).current;

  const [messages, setMessages] = useState<ReviewChatMessage[]>([
    { role: "ai", text: INITIAL_AI_MESSAGE },
  ]);
  const [inputText, setInputText]   = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInputText("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/ai-agent/review-chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ sessionId: reviewSessionId, message: trimmed }),
      });
      const data = await res.json() as { reply: string };
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "تعذّر الاتصال بالمستشار. يرجى المحاولة مجدداً." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(inputText);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">

      {/* ── Recommendation Summary Card ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden"
        style={{ borderRightWidth: "4px", borderRightColor: "hsl(var(--primary))" }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">نماء AI</p>
              <p className="text-sm font-bold text-foreground">التوصية الحالية</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Left: product + reason */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <PiggyBank className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{REVIEW_HERO.productName}</h2>
              </div>

              {/* Reason lines */}
              <div className="space-y-1.5 mb-5">
                {REVIEW_HERO.reasonLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                  </motion.div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm font-semibold text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  تحدث مع نماء
                </button>
                <button
                  onClick={onViewProduct}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm"
                >
                  عرض المنتج
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: match score */}
            <div className="sm:w-36 shrink-0 bg-primary/5 border border-primary/15 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">نسبة التطابق</p>
              <p className="text-4xl font-black text-primary leading-none">{REVIEW_HERO.matchScore}%</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3",
                      i < Math.round(REVIEW_HERO.matchScore / 20)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/30",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Security Trust Badge ──────────────────────────────────── */}
          <div className="mt-5 pt-4 border-t border-border/60">
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {[
                "اكتمل التحليل داخل البيئة الآمنة للإنماء",
                "نماء AI يستقبل رؤى مالية فقط",
                "بيانات الحساب الحساسة لا تغادر النظام المصرفي",
              ].map((label) => (
                <div key={label} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── AI Conversation ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.15 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-secondary/30">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">نماء — مستشارك المالي</p>
            <p className="text-xs text-muted-foreground">يمكنك سؤاله عن أي تفصيل في هذه التوصية</p>
          </div>
          <div className="mr-auto flex items-center gap-1.5 px-2.5 py-1 bg-primary/8 border border-primary/15 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary">متاح الآن</span>
          </div>
        </div>

        {/* Messages */}
        <div className="p-5 space-y-4 min-h-[220px]">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
              >
                {/* Avatar */}
                {msg.role === "ai" ? (
                  <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold text-muted-foreground">
                    ص
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line",
                    msg.role === "ai"
                      ? "bg-secondary/60 border border-border text-foreground"
                      : "bg-primary text-white",
                  )}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Thinking indicator */}
            {isThinking && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="bg-secondary/60 border border-border rounded-2xl px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Suggested questions */}
        {messages.length <= 2 && !isThinking && (
          <div className="px-5 pb-4">
            <p className="text-[11px] font-bold text-muted-foreground mb-2.5">أسئلة مقترحة</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs font-semibold px-3 py-1.5 bg-secondary border border-border rounded-xl text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-5 pb-5 pt-1 border-t border-border">
          <div className="flex items-center gap-3 bg-secondary/50 border border-border rounded-xl px-4 py-2.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب سؤالك هنا…"
              disabled={isThinking}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0 text-right"
              dir="rtl"
            />
            <button
              onClick={() => sendMessage(inputText)}
              disabled={!inputText.trim() || isThinking}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all",
                inputText.trim() && !isThinking
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-secondary text-muted-foreground/40",
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function AiAgent() {
  const [, setLocation] = useLocation();

  const sessionId = useRef(makeSessionId()).current;
  // Read ?service= once at mount; fall back to the generic recommendation flow
  const serviceParam = useRef(
    new URLSearchParams(window.location.search).get("service") ?? "smart-recommendation"
  ).current;

  // Detect review mode (coming from Dashboard "اعرف السبب")
  const modeParam = useRef(
    new URLSearchParams(window.location.search).get("mode") ?? null
  ).current;

  const [phase, setPhase] = useState<Phase>(modeParam === "review" ? "review" : "welcome");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<AgentQuestion | null>(null);
  const [recommendationId, setRecommendationId] = useState<string | null>(null);
  const [report, setReport] = useState<AgentReport | null>(null);
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  // Eagerly fetch the first question (service-specific) so it is ready when
  // the user clicks "ابدأ مع نماء" on the welcome screen.
  const [initialFlow, setInitialFlow] = useState<AgentQuestion | null>(null);
  const [isLoading, setIsLoading]     = useState(true);
  const [flowError, setFlowError]     = useState(false);

  useEffect(() => {
    fetch(`/api/ai-agent/flow?service=${serviceParam}&sessionId=${sessionId}`)
      .then((r) => { if (!r.ok) throw new Error("flow-fetch-failed"); return r.json(); })
      .then((data: AgentQuestion) => { setInitialFlow(data); setIsLoading(false); })
      .catch(() => { setFlowError(true); setIsLoading(false); });
  }, []); // run once on mount; serviceParam and sessionId are stable refs

  const submitAnswer = useSubmitAgentAnswer();

  // When the API responds and the user has already clicked start, transition
  useEffect(() => {
    if (initialFlow && !currentQuestion && started) {
      setCurrentQuestion(initialFlow);
      setPhase("questioning");
    }
  }, [initialFlow, currentQuestion, started]);

  const handleStart = () => {
    setStarted(true);
    if (initialFlow) {
      setCurrentQuestion(initialFlow);
      setPhase("questioning");
    }
    // Otherwise the useEffect above handles it when the fetch resolves
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
        executiveSummary: "بناءً على دخلك وأنماط إنفاقك، رصد نماء AI فرصاً واعدة لتنمية ثروتك. ملفك يُظهر قدرة ادخارية فوق المتوسط وسيولة غير مُستثمرة يمكن تحويلها إلى عائد فعلي.",
        scoreExplanation: "بُنيت درجتك على ثلاثة محاور: قوة الدخل، انضباط الإنفاق، وجاهزية الاستثمار. نقطة القوة الأبرز هي انتظام الادخار، وأكبر فرصة للتحسين تكمن في تفعيل السيولة المعطّلة.",
        selectionReason: "اختار نماء هذا المنتج لأن ملفك يجمع بين دخل جيد وإنفاق منضبط، ما يُتيح هامشاً شهرياً كافياً للاستثمار المنتظم بعائد أعلى من البدائل.",
        financialImpact: [
          { label: "العائد الاستثماري السنوي", value: "+4,200 ريال", description: "بناءً على متوسط أداء الصندوق" },
          { label: "نمو المحفظة المتوقع",       value: "+18%",        description: "خلال 5 سنوات بأداء معتدل" },
          { label: "وفورات رسوم الإدارة",       value: "340 ريال",   description: "مقارنةً بالصناديق المنافسة" },
        ],
        improvementOpportunities: [
          { title: "فعّل الاستثمار الشهري التلقائي",  description: "خصص 10% من دخلك للاستثمار التلقائي كل شهر." },
          { title: "أعِد توجيه السيولة المعطّلة",     description: "15,200 ريال موقوفة يمكن تحويلها لصندوق بعائد يومي." },
          { title: "راجع محفظتك كل 6 أشهر",          description: "إعادة التوازن ترفع العائد بمتوسط 0.8% سنوياً." },
        ],
        insights: [
          { type: "strength",    title: "نسبة ادخار ممتازة", text: "نسبة ادخارك 23% تفوق المتوسط الإقليمي بـ 8 نقاط." },
          { type: "gap",         title: "سيولة معطّلة",       text: "15,200 ريال في حسابات جارية لا تعطيك أي عائد." },
          { type: "opportunity", title: "فرصة تحسين العائد", text: "بإعادة توزيع المحفظة يمكن رفع العائد السنوي بمقدار 2.3%." },
        ],
        recommendation: { productName: "محفظة الإنماء للنمو", compatibilityScore: 92, recommendationId: "rec-001" },
        nextBestActions: [
          { step: 1, label: "اطّلع على التوصية المخصصة",       description: "راجع التوصية الكاملة مع أسباب الاختيار." },
          { step: 2, label: "تحدث مع مستشار الإنماء (اختياري)", description: "جلسة مجانية لمناقشة الخطوات العملية." },
          { step: 3, label: "ابدأ خطوتك الأولى",               description: "التفعيل يستغرق أقل من 5 دقائق." },
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
    phase === "welcome" && started && (isLoading || (!currentQuestion && !flowError));

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
          ) : flowError ? (
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

      {/* Phase 4 — Review (coming from Dashboard "اعرف السبب") */}
      {phase === "review" && (
        <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ReviewPhase
            onViewProduct={() => setLocation(REVIEW_HERO.recHref)}
          />
        </motion.div>
      )}

    </AnimatePresence>
  );
}
