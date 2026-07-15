import { useGetInvestments } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Sparkles, TrendingUp, TrendingDown, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Investments() {
  const { data, isLoading } = useGetInvestments();

  if (isLoading || !data) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const isPositive = data.dailyChange >= 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 pb-24 space-y-6">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">الاستثمار</h1>
          <p className="text-muted-foreground text-sm">أداء محفظتك الاستثمارية وتوزيع الأصول.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-colors">
          استثمار جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Portfolio Value */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-card border border-card-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col">
          <div className="mb-6">
            <div className="text-sm font-bold text-muted-foreground mb-2">إجمالي قيمة المحفظة</div>
            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold text-foreground tabular-nums tracking-tight">
                {data.totalValue.toLocaleString('ar-SA')} ريال
              </span>
              <div className={cn(
                "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg mb-1",
                isPositive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
              )} dir="ltr">
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isPositive ? '+' : ''}{data.dailyChange.toLocaleString('ar-SA')} ({data.dailyChangePercent}%)
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-1">تغير اليوم</div>
          </div>

          <div className="flex-1 min-h-[220px] w-full mt-4" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.performanceChart} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', fontFamily: 'Tajawal' }}
                  formatter={(val: number) => [`${val.toLocaleString('ar-SA')} ريال`, 'القيمة']}
                  labelStyle={{ display: 'none' }}
                />
                <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Allocation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-card-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center">
          <h3 className="text-base font-bold text-foreground w-full mb-4">توزيع الأصول</h3>
          <div className="w-48 h-48 relative mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.assetAllocation}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="percent"
                  stroke="none"
                >
                  {data.assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val}%`]} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-sm)', fontFamily: 'Tajawal' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Briefcase className="w-8 h-8 text-muted-foreground/30" />
            </div>
          </div>
          
          <div className="w-full space-y-3">
            {data.assetAllocation.map((asset, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                  <span className="font-medium text-foreground">{asset.label}</span>
                </div>
                <span className="font-bold text-muted-foreground" dir="ltr">{asset.percent}%</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="العائد الإجمالي" value={`${data.metrics.totalReturn}%`} positive={data.metrics.totalReturn >= 0} />
        <MetricCard label="العائد السنوي" value={`${data.metrics.annualizedReturn}%`} positive={data.metrics.annualizedReturn >= 0} />
        <MetricCard label="أرباح غير محققة" value={`${data.metrics.unrealizedGain.toLocaleString('ar-SA')} ريال`} positive={data.metrics.unrealizedGain >= 0} />
      </div>

      {/* Holdings Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-card-border rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-base font-bold text-foreground">ممتلكات المحفظة</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-secondary/50 text-muted-foreground font-bold">
              <tr>
                <th className="px-6 py-4 font-bold">الأصل</th>
                <th className="px-6 py-4 font-bold">القيمة الحالية</th>
                <th className="px-6 py-4 font-bold">الربح/الخسارة</th>
                <th className="px-6 py-4 font-bold">النسبة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.holdings.map((holding) => {
                const isGain = holding.gainLoss >= 0;
                return (
                  <tr key={holding.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">{holding.name}</td>
                    <td className="px-6 py-4 font-bold tabular-nums">{holding.currentValue.toLocaleString('ar-SA')}</td>
                    <td className={cn("px-6 py-4 font-bold tabular-nums", isGain ? "text-primary" : "text-destructive")} dir="ltr">
                      {isGain ? '+' : ''}{holding.gainLoss.toLocaleString('ar-SA')}
                    </td>
                    <td className={cn("px-6 py-4 font-bold tabular-nums", isGain ? "text-primary" : "text-destructive")} dir="ltr">
                      {isGain ? '+' : ''}{holding.gainLossPercent}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* AI Insight */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-primary mb-1">تحليل نماء للمحفظة</h3>
          <p className="text-sm font-medium text-foreground leading-relaxed">{data.aiInsight}</p>
        </div>
      </motion.div>

    </div>
  );
}

function MetricCard({ label, value, positive }: { label: string, value: string, positive: boolean }) {
  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
      <div className="text-sm font-bold text-muted-foreground mb-2">{label}</div>
      <div className={cn("text-2xl font-bold tabular-nums", positive ? "text-primary" : "text-destructive")} dir="ltr">
        {value}
      </div>
    </div>
  );
}
