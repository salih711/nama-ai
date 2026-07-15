import { useGetFinancialHealth } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Info, BrainCircuit, Activity, HeartPulse, Shield, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

export default function FinancialHealth() {
  const { data, isLoading } = useGetFinancialHealth();

  if (isLoading || !data) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate SVG arc parameters for the big gauge
  const gaugeRadius = 90;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeOffset = gaugeCircumference - (data.score / 100) * (gaugeCircumference / 2);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 pb-24 space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-foreground">مؤشر الصحة المالية</h1>
        <p className="text-muted-foreground mt-1">تحليل شامل لوضعك المالي وعاداتك مدعوم بالذكاء الاصطناعي.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Hero Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 bg-card border border-card-border rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-sm"
        >
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">المؤشر العام</h2>
          
          <div className="relative w-[280px] h-[140px] flex items-end justify-center mb-6">
            <svg viewBox="0 0 200 110" className="absolute top-0 left-0 w-full h-full overflow-visible">
              <path 
                d="M 10 100 A 90 90 0 0 1 190 100" 
                fill="none" 
                stroke="currentColor" 
                className="text-secondary"
                strokeWidth="14" 
                strokeLinecap="round" 
              />
              <path 
                d="M 10 100 A 90 90 0 0 1 190 100" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="14" 
                strokeLinecap="round"
                strokeDasharray={gaugeCircumference}
                strokeDashoffset={gaugeOffset}
                className="transition-all duration-1000 ease-out drop-shadow-md"
              />
            </svg>
            <div className="text-center pb-2">
              <div className="text-6xl font-bold text-foreground tracking-tighter tabular-nums">{data.score}</div>
              <div className="text-sm text-muted-foreground font-medium mt-1">من 100</div>
            </div>
          </div>

          <div className="px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4">
            {data.label}
          </div>
          <p className="text-sm text-muted-foreground font-medium text-center">
            أنت في وضع مالي أفضل من <span className="font-bold text-foreground">{data.percentileBenchmark}%</span> من المستخدمين
          </p>
        </motion.div>

        {/* AI Insights list */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card border border-card-border rounded-3xl p-8 shadow-sm flex flex-col"
        >
          <h2 className="text-base font-bold text-foreground mb-6 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" />
            تحليلات نماء الذكية
          </h2>
          <div className="flex-1 flex flex-col justify-center space-y-4">
            {data.aiInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-foreground leading-relaxed font-medium pt-1.5">{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sub-scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.subScores.map((sub, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (idx * 0.05) }}
            className="bg-card border border-card-border rounded-2xl p-5 shadow-sm"
          >
            <div className="text-sm font-bold text-muted-foreground mb-4">{sub.label}</div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-3xl font-bold text-foreground leading-none tabular-nums">{sub.score}</span>
              <span className="text-xs text-muted-foreground font-medium">/{sub.maxScore}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full", 
                  sub.status === 'good' ? "bg-primary" : sub.status === 'warning' ? "bg-amber-500" : "bg-destructive"
                )}
                style={{ width: `${(sub.score / sub.maxScore) * 100}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Income/Expense/Savings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-card-border rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-8">التدفق النقدي الشهري</h2>
          <div className="space-y-6">
            <CashflowBar label="الدخل" amount={data.income} total={data.income} color="bg-primary" />
            <CashflowBar label="المصروفات" amount={data.expenses} total={data.income} color="bg-foreground" />
            <CashflowBar label="المدخرات" amount={data.savings} total={data.income} color="bg-primary/40" />
          </div>
        </motion.div>

        {/* Ratios */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 }} className="bg-card border border-card-border rounded-3xl p-6 shadow-sm flex flex-col justify-center text-center items-center">
            <HeartPulse className="w-8 h-8 text-primary mb-4" />
            <div className="text-sm font-bold text-muted-foreground mb-2">نسبة الادخار</div>
            <div className="text-3xl font-bold text-primary mb-2 tabular-nums" dir="ltr">{data.savingsRatio}%</div>
            <div className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">{data.savingsRatioLabel}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-card border border-card-border rounded-3xl p-6 shadow-sm flex flex-col justify-center text-center items-center">
            <Shield className="w-8 h-8 text-amber-500 mb-4" />
            <div className="text-sm font-bold text-muted-foreground mb-2">نسبة الدين</div>
            <div className="text-3xl font-bold text-amber-500 mb-2 tabular-nums" dir="ltr">{data.debtRatio}%</div>
            <div className="text-xs font-bold px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full">{data.debtRatioLabel}</div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-card border border-card-border rounded-3xl p-6 md:p-8 shadow-sm h-[400px] flex flex-col">
          <h2 className="text-base font-bold text-foreground mb-6">توزيع المصروفات</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.spendingCategories} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="label" type="category" axisLine={false} tickLine={false} width={100} tick={{ fontSize: 13, fontFamily: 'Tajawal', fill: 'hsl(var(--foreground))', fontWeight: 600 }} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', fontFamily: 'Tajawal' }}
                formatter={(val: number) => [`${val}%`, 'النسبة']}
              />
              <Bar dataKey="percent" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Trend Line Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-card border border-card-border rounded-3xl p-6 md:p-8 shadow-sm h-[400px] flex flex-col">
          <h2 className="text-base font-bold text-foreground mb-6">تطور الصحة المالية (6 أشهر)</h2>
          <div dir="ltr" className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} domain={['auto', 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', fontFamily: 'Tajawal' }}
                  formatter={(val: number) => [val, 'المؤشر']}
                />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

function CashflowBar({ label, amount, total, color }: { label: string, amount: number, total: number, color: string }) {
  const percent = Math.max(5, Math.round((amount / total) * 100));
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <div className="text-sm font-bold text-muted-foreground">{label}</div>
        <div className="text-base font-bold text-foreground">{amount.toLocaleString('ar-SA')} ريال</div>
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
