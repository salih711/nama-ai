import { useGetDashboard } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDownRight, ArrowUpRight, Plus, Activity, Wallet, CreditCard, Send, CheckCircle2, Landmark } from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetDashboard();

  if (isLoading || !dashboard) {
    return (
      <div className="p-8 max-w-[1100px] mx-auto w-full space-y-6">
        <div className="h-20 w-48 bg-muted animate-pulse rounded-lg" />
        <div className="h-32 w-full bg-muted animate-pulse rounded-2xl" />
        <div className="grid grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const { user, healthScore, metrics, aiRecommendation, recentTransactions, spendingChart } = dashboard;

  const today = new Intl.DateTimeFormat("ar-SA", { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  }).format(new Date());

  return (
    <div className="p-8 max-w-[1100px] mx-auto w-full flex flex-col gap-6 pb-20">
      
      {/* Header */}
      <header className="flex justify-between items-start">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            مرحباً، {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {today}
          </p>
        </motion.div>
      </header>

      {/* AI Recommendation Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-gradient-to-r from-[#00703C] to-[#004d28] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm text-white overflow-hidden relative"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        
        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-white/90">✨ توصية نماء اليوم</h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-[10px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                ثقة نماء {aiRecommendation.confidenceScore}%
              </div>
            </div>
            <p className="text-lg font-bold mb-1">{aiRecommendation.summary}</p>
            <p className="text-sm text-white/80 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-300" />
              وفر {aiRecommendation.savingsAmount.toLocaleString('ar-SA')} ريال
              <span className="text-white/50 text-xs mr-2 border-r border-white/20 pr-2">بناءً على تحليل معاملاتك الأخيرة</span>
            </p>
          </div>
        </div>
        
        <div className="mt-5 sm:mt-0 relative z-10 shrink-0">
          <Link href={`/recommendation/${aiRecommendation.id}`}>
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-bold rounded-xl shadow-sm hover:bg-gray-50 hover:scale-[1.02] transition-all cursor-pointer">
              عرض التفاصيل
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard 
          delay={0.2}
          title="مؤشر الصحة المالية" 
          value={healthScore.score.toString()}
          label={healthScore.label}
          trend={healthScore.trend}
          icon={Activity}
          valueColor="text-primary"
        />
        <MetricCard 
          delay={0.25}
          title="الإنفاق الشهري" 
          value={`${metrics.monthlySpending.toLocaleString('ar-SA')}`}
          suffix="ريال"
          icon={Wallet}
        />
        <MetricCard 
          delay={0.3}
          title="المدخرات" 
          value={`${metrics.savings.toLocaleString('ar-SA')}`}
          suffix="ريال"
          icon={Landmark}
        />
        <MetricCard 
          delay={0.35}
          title="المدفوعات القادمة" 
          value={metrics.upcomingPaymentsCount.toString()}
          subValue={`${metrics.upcomingPaymentsAmount.toLocaleString('ar-SA')} ريال`}
          icon={CreditCard}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Spending Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2 bg-card rounded-2xl border border-card-border p-6 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-card-foreground">تحليل الإنفاق</h3>
          </div>
          <div className="h-[240px] w-full mt-auto" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingChart} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
                  dy={10}
                />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', fontFamily: 'Tajawal' }}
                  itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                  formatter={(value: number) => [`${value.toLocaleString('ar-SA')} ريال`, 'الإنفاق']}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-card rounded-2xl border border-card-border p-6 shadow-sm flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-card-foreground">آخر المعاملات</h3>
            <span className="text-xs font-medium text-primary hover:underline cursor-pointer">عرض الكل</span>
          </div>
          <div className="space-y-5 flex-1">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    tx.type === "credit" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
                  )}>
                    {tx.type === "credit" ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-card-foreground leading-tight mb-0.5">{tx.merchant}</p>
                    <p className="text-xs text-muted-foreground">{tx.date} • {tx.category}</p>
                  </div>
                </div>
                <div className={cn(
                  "text-sm font-bold",
                  tx.type === "credit" ? "text-primary" : "text-card-foreground"
                )} dir="ltr">
                  {tx.type === "credit" ? "+" : "-"}{tx.amount.toLocaleString('ar-SA')}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}

function MetricCard({ title, value, suffix, label, trend, subValue, icon: Icon, delay, valueColor }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}
      className="bg-card rounded-2xl border border-card-border p-5 shadow-sm flex flex-col group hover:border-primary/20 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <div className="mt-auto">
        <div className="flex items-end gap-1.5 mb-1">
          <span className={cn("text-2xl font-bold tracking-tight", valueColor || "text-card-foreground")}>{value}</span>
          {suffix && <span className="text-sm text-muted-foreground font-medium mb-1">{suffix}</span>}
        </div>
        {(label || trend || subValue) && (
          <div className="flex items-center gap-2 mt-2">
            {label && (
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                {label}
              </span>
            )}
            {subValue && <span className="text-xs text-muted-foreground">{subValue}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
