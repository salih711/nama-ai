import { useGetReports } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Download, ChevronRight, ChevronLeft, Sparkles, Target, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Reports() {
  const [period, setPeriod] = useState("2023-10");
  const { data, isLoading } = useGetReports({ period });

  if (isLoading || !data) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 pb-24 space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">التقارير</h1>
          <p className="text-muted-foreground text-sm mt-1">ملخص أدائك المالي للشهر الحالي.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-card border border-card-border rounded-xl p-1 shadow-sm">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold px-4 min-w-[120px] text-center">{data.period}</span>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground text-sm font-bold rounded-xl hover:bg-secondary/80 transition-colors">
            <Download className="w-4 h-4" />
            تصدير PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard 
          title="الدخل" 
          amount={data.income} 
          trend={data.incomeVsLastMonth} 
          trendIsGood={data.incomeVsLastMonth >= 0} 
        />
        <KpiCard 
          title="المصروفات" 
          amount={data.expenses} 
          trend={data.expensesVsLastMonth} 
          trendIsGood={data.expensesVsLastMonth <= 0} 
        />
        <KpiCard 
          title="صافي الادخار" 
          amount={data.netSavings} 
          trend={data.incomeVsLastMonth - data.expensesVsLastMonth} 
          trendIsGood={(data.incomeVsLastMonth - data.expensesVsLastMonth) >= 0} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-card border border-card-border rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-6">مقارنة المصروفات (الشهر الحالي vs السابق)</h2>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyComparison} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                <RechartsTooltip 
                  cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.4 }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', fontFamily: 'Tajawal', direction: 'rtl' }}
                  formatter={(val: number, name: string) => [
                    `${val.toLocaleString('ar-SA')} ريال`, 
                    name === 'current' ? 'الشهر الحالي' : 'الشهر السابق'
                  ]}
                />
                <Bar dataKey="current" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="previous" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-primary/5 border border-primary/20 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col">
          <h2 className="text-base font-bold text-primary mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            توصيات نماء للشهر القادم
          </h2>
          <div className="space-y-4 flex-1">
            {data.aiSuggestions.map((sug, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm font-medium text-foreground leading-relaxed">{sug}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-card-border rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-base font-bold text-foreground">تفصيل المصروفات حسب الفئة</h2>
          </div>
          <table className="w-full text-right text-sm">
            <thead className="bg-secondary/30 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">الفئة</th>
                <th className="px-6 py-4 font-bold">المبلغ</th>
                <th className="px-6 py-4 font-bold hidden sm:table-cell">الميزانية</th>
                <th className="px-6 py-4 font-bold">الاتجاه</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.spendingByCategory.map((cat, idx) => (
                <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">{cat.category}</td>
                  <td className="px-6 py-4 font-bold tabular-nums">{cat.amount.toLocaleString('ar-SA')} ريال</td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className={cn(
                        "h-full rounded-full",
                        cat.budgetPercent > 100 ? "bg-destructive" : "bg-primary"
                      )} style={{ width: `${Math.min(cat.budgetPercent, 100)}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {cat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-destructive" /> : 
                     cat.trend === 'down' ? <ArrowDownRight className="w-4 h-4 text-primary" /> : 
                     <Minus className="w-4 h-4 text-muted-foreground" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Goals Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-card-border rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-muted-foreground" />
              الأهداف المالية
            </h2>
          </div>
          <div className="space-y-6">
            {data.goals.map((goal) => (
              <div key={goal.id}>
                <div className="flex justify-between items-end mb-2">
                  <div className="font-bold text-sm text-foreground">{goal.name}</div>
                  <div className="text-xs font-bold text-primary" dir="ltr">{goal.progress}%</div>
                </div>
                <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${goal.progress}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>تم جمع: {goal.current.toLocaleString('ar-SA')}</span>
                  <span>الهدف: {goal.target.toLocaleString('ar-SA')}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function KpiCard({ title, amount, trend, trendIsGood }: { title: string, amount: number, trend: number, trendIsGood: boolean }) {
  const trendPercent = trend > 0 ? `+${trend}%` : `${trend}%`;
  
  return (
    <div className="bg-card border border-card-border rounded-2xl p-5 shadow-sm">
      <div className="text-sm font-bold text-muted-foreground mb-2">{title}</div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold tabular-nums text-foreground">{amount.toLocaleString('ar-SA')}</div>
        <div className={cn(
          "text-xs font-bold px-2 py-1 rounded-md mb-1",
          trendIsGood ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
        )} dir="ltr">
          {trendPercent} عن الشهر السابق
        </div>
      </div>
    </div>
  );
}
