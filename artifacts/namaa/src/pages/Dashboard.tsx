import { useGetDashboard } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowDownRight, ArrowUpRight, Activity,
  CreditCard, PiggyBank, TrendingUp, ChevronLeft,
  Star, Brain, ArrowLeftRight, Receipt, FileText,
  Users, Globe, Wallet, TrendingDown, Bot,
  CircleDot, ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// ─── icon maps ────────────────────────────────────────────────────────────────
const oppIcons: Record<string, React.ElementType> = {
  health:          Activity,
  recommendations: Star,
  card:            CreditCard,
  saving:          PiggyBank,
  investment:      TrendingUp,
};

const heroIcons: Record<string, React.ElementType> = {
  saving:     PiggyBank,
  investment: TrendingUp,
  card:       CreditCard,
  health:     Activity,
};

const QUICK_SERVICES = [
  { icon: ArrowLeftRight, label: "تحويل سريع",    href: "/transfer" },
  { icon: Receipt,        label: "المدفوعات",     href: "/payments" },
  { icon: FileText,       label: "كشف الحساب",   href: "/reports" },
  { icon: Users,          label: "المستفيدين",    href: "/beneficiaries" },
  { icon: CreditCard,     label: "البطاقات",      href: "/cards" },
  { icon: Globe,          label: "تحويل دولي",   href: "/international-transfer" },
];

// ─── helpers ──────────────────────────────────────────────────────────────────
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.38, delay },
  };
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "صباح الخير";
  if (h < 17) return "مساء الخير";
  return "مساء النور";
}

function fmt(n: number) {
  return n.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetDashboard();

  if (isLoading || !dashboard) {
    return (
      <div className="p-8 max-w-[1100px] mx-auto w-full space-y-5">
        <div className="h-14 w-52 bg-muted animate-pulse rounded-xl" />
        <div className="h-36 w-full bg-muted animate-pulse rounded-2xl" />
        <div className="h-56 w-full bg-muted animate-pulse rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-20 bg-muted animate-pulse rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const {
    user, accountBalance, heroRecommendation,
    aiOpportunities, recentTransactions, healthScore,
  } = dashboard as any;

  const today = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  }).format(new Date());

  // Insights = opportunities that are NOT the hero and NOT the health score meta-card
  const insights = (aiOpportunities as any[]).filter(
    (o: any) => o.id !== "opp-health" && o.id !== `hero-${heroRecommendation?.id?.replace("hero-", "")}` && o.type !== "recommendations"
  );

  return (
    <div className="p-8 max-w-[1100px] mx-auto w-full flex flex-col gap-6 pb-20">

      {/* ── 1. Welcome header ─────────────────────────────────────────────── */}
      <motion.header {...fadeUp(0)} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {greeting()}، {user.name} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{today}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/8 border border-primary/15 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary">نماء يحلل بياناتك</span>
        </div>
      </motion.header>

      {/* ── 2. Account Balance Card ────────────────────────────────────────── */}
      <motion.div {...fadeUp(0.06)} className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Main account */}
          <div className="flex-1 p-6 border-b sm:border-b-0 sm:border-l border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">الحساب الجاري</p>
                  <p className="text-[11px] text-muted-foreground/60 font-mono">{accountBalance.accountNumber}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15">
                {user.accountType}
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground tracking-tight" dir="ltr">
              {fmt(accountBalance.current)}
              <span className="text-base font-semibold text-muted-foreground mr-1.5">ر.س</span>
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-semibold">+{accountBalance.trend}% مقارنة بالشهر الماضي</span>
            </div>
          </div>

          {/* Savings account */}
          <div className="sm:w-56 p-6 bg-secondary/40">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
                <PiggyBank className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground">حساب التوفير</p>
            </div>
            <p className="text-xl font-bold text-foreground" dir="ltr">
              {fmt(accountBalance.savings)}
              <span className="text-sm font-semibold text-muted-foreground mr-1">ر.س</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">عائد ربع سنوي: 3.7%</p>
          </div>
        </div>
      </motion.div>

      {/* ── 3. AI Hero Card ───────────────────────────────────────────────── */}
      <AiHeroCard hero={heroRecommendation} />

      {/* ── 4. Quick Banking Services ─────────────────────────────────────── */}
      <motion.section {...fadeUp(0.22)}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">الخدمات المصرفية</h2>
          <Link href="/services">
            <span className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-1.5 transition-all cursor-pointer">
              كل الخدمات <ChevronLeft className="w-3 h-3" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_SERVICES.map((svc, i) => (
            <motion.div key={svc.label} {...fadeUp(0.24 + i * 0.04)}>
              <Link href={svc.href}>
                <div className="bg-card border border-card-border rounded-2xl p-4 flex flex-col items-center gap-2.5 cursor-pointer hover:border-primary/25 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group">
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <svc.icon className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                    {svc.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 5. Recent Transactions ────────────────────────────────────────── */}
      <motion.div {...fadeUp(0.46)} className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-bold text-foreground">آخر المعاملات</h2>
          <Link href="/reports">
            <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">عرض الكل</span>
          </Link>
        </div>
        <div className="divide-y divide-border">
          {(recentTransactions as any[]).map((tx: any) => (
            <div key={tx.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
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
                  <p className="text-sm font-semibold text-foreground leading-tight">{tx.merchant}</p>
                  <p className="text-xs text-muted-foreground">{tx.category}</p>
                </div>
              </div>
              <p className={cn(
                "text-sm font-bold tabular-nums",
                tx.type === "credit" ? "text-primary" : "text-foreground"
              )} dir="ltr">
                {tx.type === "credit" ? "+" : "−"}{tx.amount.toLocaleString("ar-SA")}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── 6. Namaa Insights ────────────────────────────────────────────── */}
      {insights.length > 0 && (
        <motion.section {...fadeUp(0.54)}>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-bold text-foreground">اكتشافات نماء</h2>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15">
              <Brain className="w-2.5 h-2.5" />
              {insights.length} فرص
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((opp: any, i: number) => (
              <InsightCard key={opp.id} opp={opp} delay={0.56 + i * 0.07} />
            ))}
          </div>
        </motion.section>
      )}

    </div>
  );
}

// ─── AI Hero Card ─────────────────────────────────────────────────────────────
function AiHeroCard({ hero }: { hero: any }) {
  if (!hero) return null;
  const HeroIcon = heroIcons[hero.type] ?? Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.13 }}
      className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden relative"
      style={{ borderRightWidth: "4px", borderRightColor: "hsl(var(--primary))" }}
    >
      {/* Subtle ambient glow behind the right accent strip */}
      <div className="absolute right-0 top-0 w-40 h-full bg-primary/[0.03] pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-7">

        {/* ── Label row ── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">نماء اكتشف</p>
              <p className="text-sm font-bold text-foreground">فرصة مناسبة لك</p>
            </div>
          </div>

          {/* Match score */}
          <div className="flex flex-col items-center gap-0.5 bg-primary/8 border border-primary/15 rounded-xl px-3 py-2 shrink-0">
            <p className="text-xl font-black text-primary leading-none">{hero.matchScore}%</p>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">تطابق</p>
          </div>
        </div>

        {/* ── Trigger chip ── */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary border border-border rounded-full mb-4">
          <CircleDot className="w-2.5 h-2.5 text-primary" />
          <span className="text-[11px] font-semibold text-muted-foreground">
            بناءً على: {hero.triggerLabel}
          </span>
        </div>

        {/* ── Main content ── */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">

          {/* Left: icon + title + explanation */}
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <HeroIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground leading-snug">{hero.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {hero.explanation}
            </p>

            {/* Data breakdown chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(hero.reasonBreakdown as any[]).map((item: any) => (
                <div key={item.label} className="flex items-center gap-1.5 bg-secondary border border-border rounded-xl px-3 py-1.5">
                  <ShieldCheck className="w-3 h-3 text-primary shrink-0" />
                  <span className="text-[11px] text-muted-foreground">{item.label}:</span>
                  <span className="text-[11px] font-bold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link href={`/ai-agent?mode=review`}>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm font-semibold text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  اعرف السبب
                </button>
              </Link>
              <Link href={hero.actionHref}>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
                  {hero.productLabel}
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right: benefit callout */}
          <div className="sm:w-44 shrink-0 bg-primary/5 border border-primary/15 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1.5 self-start">
            <TrendingUp className="w-5 h-5 text-primary" />
            <p className="text-[11px] font-semibold text-muted-foreground">الفائدة السنوية المتوقعة</p>
            <p className="text-2xl font-black text-primary leading-none" dir="ltr">
              +{hero.benefit.toLocaleString("ar-SA")}
            </p>
            <p className="text-xs font-semibold text-muted-foreground">ريال سنوياً</p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// ─── Insight Card (compact) ───────────────────────────────────────────────────
function InsightCard({ opp, delay }: { opp: any; delay: number }) {
  const Icon = oppIcons[opp.type] ?? Activity;

  const badgeCls: Record<string, string> = {
    green:   "bg-primary/10 text-primary",
    primary: "bg-primary/10 text-primary",
    amber:   "bg-amber-50 text-amber-700",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay }}>
      <Link href={opp.actionHref}>
        <div className="bg-card rounded-2xl border border-card-border p-5 shadow-sm cursor-pointer hover:border-primary/25 hover:shadow-md transition-all duration-200 group h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
              <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", badgeCls[opp.badgeColor] ?? badgeCls.primary)}>
              {opp.badge}
            </span>
          </div>
          <h3 className="text-sm font-bold text-foreground mb-0.5 leading-snug">{opp.title}</h3>
          <p className="text-base font-bold text-primary mb-2 leading-tight">{opp.value}</p>
          <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">{opp.reason}</p>
          <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
            {opp.benefit ? (
              <span className="text-xs font-semibold text-primary">+{opp.benefit.toLocaleString("ar-SA")} ريال / سنة</span>
            ) : <span />}
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
