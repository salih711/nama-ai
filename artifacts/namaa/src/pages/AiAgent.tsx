import { useGetAiAgentFlow, useSubmitAgentAnswer } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Sparkles, Check, ChevronLeft,
  Building, Target, PieChart, Shield, Home,
  Activity, TrendingUp, CreditCard, PiggyBank,
  Brain, Eye, Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  housing: Home,
  education: Building,
  retirement: Target,
  low: Shield,
  medium: PieChart,
  high: Activity,
  credit_card: CreditCard,
  financing: Building,
  investment: TrendingUp,
  saving: PiggyBank,
  banking: Brain,
  growth: TrendingUp,
  income: CreditCard,
  preservation: Shield,
  short: Activity,
  long: Target,
};

// What the AI says it has already done — shown on first load
const aiPreAnalysis = [
  { icon: Eye,        text: "حللت معاملاتك خلال آخر 90 يوماً" },
  { icon: Activity,   text: "لاحظت أن نسبة ادخارك دون الهدف الأمثل" },
  { icon: Lightbulb,  text: "وجدت خيار تمويل قد يكون أفضل لك" },
  { icon: TrendingUp, text: "رصدت فرصة لتحسين عوائد استثماراتك" },
];

export default function AiAgent() {
  const [, setLocation] = useLocation();
  const { data: flow, isLoading, error } = useGetAiAgentFlow();
  const submitAnswer = useSubmitAgentAnswer();

  const handleOptionSelect = (key: string) => {
    submitAnswer.mutate(
      { data: { stepNumber: flow!.stepNumber, selectedKey: key } },
      {
        onSuccess: (res) => {
          if (res.done && res.recommendationId) {
            setLocation(`/recommendation/${res.recommendationId}`);
          }
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <p className="text-muted-foreground font-medium animate-pulse">نماء يراجع ملفك المالي…</p>
      </div>
    );
  }

  if (error || !flow) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-destructive font-medium">تعذّر تحميل المستشار المالي. يرجى المحاولة مجدداً.</p>
      </div>
    );
  }

  const isFirstStep = flow.stepNumber === 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">نماء — مستشارك المالي الذكي</h1>
            <p className="text-xs text-muted-foreground">يعمل على تحليل بياناتك المالية في الوقت الفعلي</p>
          </div>
        </div>

        {/* AI Pre-analysis statements — shown on first step only */}
        {isFirstStep && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-card border border-card-border rounded-2xl p-5 shadow-sm mt-4"
          >
            <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">ما فعله نماء قبل قليل</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiPreAnalysis.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
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
                <span className="font-bold text-foreground">{flow.totalSteps} أسئلة سريعة.</span>
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Main Question Card ── */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={flow.stepNumber}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.28 }}
              className="bg-card border border-card-border rounded-2xl p-6 md:p-8 shadow-sm"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                  سؤال {flow.stepNumber} من {flow.totalSteps}
                </span>
                <div className="flex gap-1" dir="ltr">
                  {[...Array(flow.totalSteps)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i + 1 === flow.stepNumber ? "w-6 bg-primary" :
                        i + 1 < flow.stepNumber ? "w-2 bg-primary/40" : "w-2 bg-secondary"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* AI speaks in first person */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-xs text-primary font-semibold">نماء يسألك</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                  {flow.question}
                </h2>
              </div>

              {/* Option buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flow.options.map((opt) => {
                  const Icon = iconMap[opt.key] || Activity;
                  const isPending = submitAnswer.isPending &&
                    submitAnswer.variables?.data.selectedKey === opt.key;

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleOptionSelect(opt.key)}
                      disabled={submitAnswer.isPending}
                      className={cn(
                        "text-right p-5 rounded-xl border-2 transition-all duration-200 group",
                        "hover:border-primary/40 hover:bg-secondary/40",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "border-border bg-card"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors mt-0.5">
                          {isPending ? (
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
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

        {/* ── Financial Profile Sidebar ── */}
        <div className="lg:col-span-1">
          <div className="bg-secondary/30 border border-border rounded-2xl p-5 sticky top-6">
            <h3 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              ملفك يتشكل
            </h3>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              نماء يبني صورة كاملة عن وضعك المالي بناءً على إجاباتك.
            </p>

            <div className="space-y-3">
              {flow.profileSoFar.map((item, idx) => (
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
                      item.resolved ? "text-foreground" : "text-muted-foreground/40 italic"
                    )}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI promise */}
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  بعد انتهائك، سيقدم نماء توصية مخصصة بالكامل لوضعك المالي — مع شرح دقيق لكل خطوة.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
