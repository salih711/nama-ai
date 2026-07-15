import { useGetFinancing } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Sparkles, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Financing() {
  const { data, isLoading } = useGetFinancing();

  if (isLoading || !data) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted-foreground))', 'hsl(var(--border))'];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-24 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">التمويل</h1>
        <p className="text-muted-foreground mt-1">إدارة تمويلاتك الحالية واكتشاف فرص جديدة.</p>
      </div>

      {/* AI Insight */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-primary mb-1">فرصة تمويلية متاحة</h3>
            <p className="text-sm font-medium text-foreground">{data.aiInsight.text}</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors">
          تقديم طلب
        </button>
      </motion.div>

      {/* Active Loans */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">التمويلات القائمة</h2>
        {data.activeLoans.map((loan, idx) => {
          const pieData = [
            { name: 'الأصل', value: loan.installmentBreakdown.principal },
            { name: 'الربح', value: loan.installmentBreakdown.profit },
            { name: 'التأمين', value: loan.installmentBreakdown.insurance },
          ];

          return (
            <motion.div 
              key={loan.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="bg-card border border-card-border rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-2 space-y-6">
                <div>
                  <div className="inline-flex px-2 py-1 bg-secondary rounded text-xs font-bold text-muted-foreground mb-3">
                    {loan.type}
                  </div>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <div className="text-sm font-bold text-muted-foreground mb-1">المتبقي سداده</div>
                      <div className="text-3xl font-bold text-foreground">{loan.remainingAmount.toLocaleString('ar-SA')} ريال</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-muted-foreground mb-1">القسط الشهري</div>
                      <div className="text-xl font-bold text-primary">{loan.monthlyPayment.toLocaleString('ar-SA')} ريال</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-foreground">نسبة السداد</span>
                    <span className="text-primary" dir="ltr">{loan.paidPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${loan.paidPercent}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground font-medium mt-2">
                    <span>المدة المتبقية: {loan.yearsRemaining} سنوات</span>
                    <span>الأصل: {loan.originalAmount.toLocaleString('ar-SA')} ريال</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-r border-border pt-6 md:pt-0 md:pr-8">
                <div className="text-sm font-bold text-muted-foreground mb-4">تفصيل القسط</div>
                <div className="w-32 h-32 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={35}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(val: number) => [`${val} ريال`]}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-sm)', fontFamily: 'Tajawal' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-3 text-[10px] font-bold mt-2">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> الأصل</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-muted-foreground" /> الربح</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Available Products */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">منتجات قد تناسبك</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.availableProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-card border border-card-border rounded-2xl p-5 shadow-sm hover:border-primary/30 transition-colors group cursor-pointer"
            >
              <h3 className="font-bold text-foreground mb-4">{product.name}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">الحد الأقصى</span>
                  <span className="font-bold text-foreground">{product.maxAmount.toLocaleString('ar-SA')} ريال</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">هامش الربح</span>
                  <span className="font-bold text-primary" dir="ltr">{product.profitRate}%</span>
                </div>
              </div>
              <button className="w-full py-2 bg-secondary text-foreground font-bold text-sm rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                احسب تمويلك
              </button>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
