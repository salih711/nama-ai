import { useGetDashboard } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowDownRight, ArrowUpRight, Activity,
  CreditCard, PiggyBank, TrendingUp, ChevronLeft,
  CheckCircle2, Star
} from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const oppIcons: Record<string, any> = {
  health: Activity,
  recommendations: Star,
  card: CreditCard,
  saving: PiggyBank,
  investment: TrendingUp,
};

const badgeStyles: Record<string, string> = {
  green: "bg-primary/10 text-primary",
  primary: "bg-primary/10 text-primary",
  amber: "bg-amber-50 text-amber-700",
};

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetDashboard();

  if (isLoading || !dashboard) {
    return (
      <div className="p-8 max-w-[1100px] mx-auto w-full space-y-5">
        <div className="h-14 w-52 bg-muted animate-pulse rounded-xl" />
        <div className="h-44 w-full bg-muted animate-pulse rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const { user, aiSummary, aiOpportunities, recentTransactions, spendingChart, healthScore } = dashboard;

  const today = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="p-8 max-w-[1100px] mx-auto w-full flex flex-col gap-6 pb-20">

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            صباح الخير، {user.name} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/8 border border-primary/15 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary">نماء يحلل بياناتك</span>
        </div>
      </motion.header>

      {/* ── HERO: AI Recommendation Center ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="bg-[#006C54] rounded-2xl overflow-hidden text-white relative"
        style={{ boxShadow: "0 6px 28px rgba(0,108,84,0.20), 0 2px 6px rgba(0,108,84,0.10)" }}
      >
        {/* subtle ambient blob */}
        <div className="absolute left-0 bottom-0 w-80 h-48 bg-[#0E8A6A]/35 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/4 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 p-7 sm:p-8">
          {/* Label row */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white/85 tracking-wide">✨ مركز توصيات نماء</span>
          </div>

          {/* Main message */}
          <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-2 max-w-xl">
            {aiSummary.analysisMessage}
          </h2>

          {/* Benefit pill + CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/15 border border-white/20 rounded-xl">
                <p className="text-[11px] text-white/70 font-medium mb-0.5">الفائدة السنوية المتوقعة</p>
                <p className="text-lg font-bold text-white" dir="ltr">
                  +{aiSummary.yearlyBenefit.toLocaleString("ar-SA")} ريال
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 bg-white/10 border border-white/15 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-[#7EEBC8]" />
                <span className="text-sm font-semibold text-white/90">
                  {aiSummary.opportunitiesFound} فرص مكتشفة
                </span>
              </div>
            </div>

            <div className="sm:mr-auto">
              <Link href="/recommendation/rec-001">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-bold rounded-xl shadow-sm hover:bg-gray-50 hover:scale-[1.01] transition-all cursor-pointer">
                  عرض التوصيات
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── AI OPPORTUNITY CARDS ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground">اكتشافات نماء اليوم</h2>
          <span className="text-xs text-muted-foreground">تحديث منذ لحظات</span>
        </div>

        {/* Row 1: health full-width + recs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {aiOpportunities.slice(0, 3).map((opp, i) => (
            <OpportunityCard key={opp.id} opp={opp} delay={0.15 + i * 0.07} />
          ))}
        </div>

        {/* Row 2: saving + investment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiOpportunities.slice(3).map((opp, i) => (
            <OpportunityCard key={opp.id} opp={opp} delay={0.36 + i * 0.07} wide />
          ))}
        </div>
      </div>

      {/* ── SUPPORTING: Spending trend + Transactions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Spending chart — supporting role, not hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
          className="lg:col-span-2 bg-card rounded-2xl border border-card-border p-6 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-bold text-card-foreground">اتجاه الإنفاق</h3>
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-md">آخر 6 أشهر</span>
          </div>
          <p className="text-xs text-muted-foreground mb-5">
            يستخدم نماء هذه البيانات لاكتشاف فرص الادخار وتحليل سلوكك الإنفاقي.
          </p>
          <div className="h-[180px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingChart} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} dy={8} />
                <RechartsTooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "var(--shadow-md)", fontFamily: "Tajawal" }}
                  formatter={(v: number) => [`${v.toLocaleString("ar-SA")} ريال`, "الإنفاق"]}
                  labelStyle={{ color: "hsl(var(--muted-foreground))", marginBottom: "4px" }}
                />
                <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.58 }}
          className="bg-card rounded-2xl border border-card-border p-6 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-bold text-card-foreground">آخر المعاملات</h3>
            <span className="text-xs font-medium text-primary hover:underline cursor-pointer">عرض الكل</span>
          </div>
          <div className="space-y-4 flex-1">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                    tx.type === "credit" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                  )}>
                    {tx.type === "credit"
                      ? <ArrowDownRight className="w-4 h-4" />
                      : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground leading-tight mb-0.5">{tx.merchant}</p>
                    <p className="text-xs text-muted-foreground">{tx.category}</p>
                  </div>
                </div>
                <div className={cn(
                  "text-sm font-bold tabular-nums",
                  tx.type === "credit" ? "text-primary" : "text-card-foreground"
                )} dir="ltr">
                  {tx.type === "credit" ? "+" : "-"}{tx.amount.toLocaleString("ar-SA")}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function OpportunityCard({ opp, delay, wide }: { opp: any; delay: number; wide?: boolean }) {
  const Icon = oppIcons[opp.type] || Activity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay }}
    >
      <Link href={opp.actionHref}>
        <div className={cn(
          "bg-card rounded-2xl border border-card-border p-5 shadow-sm cursor-pointer",
          "hover:border-primary/25 hover:shadow-md transition-all duration-200 group h-full flex flex-col"
        )}>
          {/* Top row */}
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
              <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full",
              badgeStyles[opp.badgeColor] || badgeStyles.primary
            )}>
              {opp.badge}
            </span>
          </div>

          {/* Title + value */}
          <h3 className="text-sm font-bold text-foreground mb-0.5 leading-snug">{opp.title}</h3>
          <p className="text-lg font-bold text-primary mb-2 leading-tight">{opp.value}</p>

          {/* WHY — the AI reasoning */}
          <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">{opp.reason}</p>

          {/* Benefit + action */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
            {opp.benefit ? (
              <span className="text-xs font-semibold text-primary">
                +{opp.benefit.toLocaleString("ar-SA")} ريال / سنة
              </span>
            ) : (
              <span />
            )}
            <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-1.5 transition-all">
              {opp.actionLabel}
              <ChevronLeft className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
