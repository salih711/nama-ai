import { useGetCards } from "@workspace/api-client-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Snowflake, Eye, RefreshCw, TrendingUp, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Cards() {
  const { data: cards, isLoading } = useGetCards();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  if (isLoading || !cards) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const activeCard = cards.find(c => c.id === activeCardId) || cards[0];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-24 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">البطاقات</h1>
        <p className="text-muted-foreground mt-1">إدارة بطاقاتك الائتمانية وبطاقات الصراف الآلي.</p>
      </div>

      {/* Cards Carousel/List */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setActiveCardId(card.id)}
            className={cn(
              "shrink-0 w-[300px] h-[190px] rounded-3xl p-6 text-white text-right relative overflow-hidden transition-all snap-center",
              activeCard.id === card.id ? "ring-2 ring-primary ring-offset-4 ring-offset-background scale-[1.02]" : "opacity-80 hover:opacity-100",
              card.type === "credit" ? "bg-gradient-to-br from-foreground to-foreground/80" : "bg-gradient-to-br from-primary to-[#004d28]"
            )}
          >
            {/* Visual pattern */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2" />
            <div className="absolute left-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="font-bold tracking-wider">{card.name}</div>
                <CreditCard className="w-6 h-6 text-white/50" />
              </div>
              
              <div>
                <div className="font-mono text-xl tracking-[0.2em] mb-1 opacity-90" dir="ltr">
                  **** **** **** {card.lastFour}
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-sm font-medium opacity-80">{card.expiryDate}</div>
                  {card.status === "frozen" && (
                    <div className="px-2 py-0.5 bg-blue-500/20 text-blue-100 text-xs rounded-full border border-blue-400/20 flex items-center gap-1 backdrop-blur-sm">
                      <Snowflake className="w-3 h-3" /> مجمدة
                    </div>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCard.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Card Details & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-card-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-muted-foreground mb-5">تفاصيل الرصيد</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground font-medium">الحد الائتماني</span>
                    <span className="font-bold text-foreground">{activeCard.creditLimit.toLocaleString('ar-SA')} ريال</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground font-medium">المستخدم</span>
                    <span className="font-bold text-foreground">{activeCard.outstanding.toLocaleString('ar-SA')} ريال</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${activeCard.utilizationPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm font-bold text-foreground">المتاح</span>
                  <span className="text-xl font-bold text-primary">{activeCard.availableBalance.toLocaleString('ar-SA')} ريال</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-card-border rounded-3xl p-4 shadow-sm grid grid-cols-2 gap-2">
              <ActionBtn icon={Snowflake} label="تجميد البطاقة" active={activeCard.status === 'frozen'} />
              <ActionBtn icon={Eye} label="عرض الرقم السري" />
              <ActionBtn icon={RefreshCw} label="استبدال" />
              <ActionBtn icon={TrendingUp} label="رفع الحد" />
            </div>

            <div className="bg-card border border-card-border rounded-3xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-muted-foreground mb-1">النقاط المكتسبة</div>
                <div className="text-2xl font-bold text-foreground tabular-nums">{activeCard.pointsEarned.toLocaleString('ar-SA')}</div>
              </div>
              <button className="px-4 py-2 bg-primary/10 text-primary font-bold text-sm rounded-xl hover:bg-primary/20 transition-colors">
                استبدال
              </button>
            </div>
          </div>

          {/* Transactions */}
          <div className="lg:col-span-2 bg-card border border-card-border rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-foreground mb-6">العمليات الأخيرة</h3>
            <div className="space-y-4 flex-1">
              {activeCard.transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                      tx.type === "credit" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
                    )}>
                      {tx.type === "credit" ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground mb-1">{tx.merchant}</p>
                      <p className="text-xs text-muted-foreground font-medium">{tx.date} • {tx.category}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "text-base font-bold tabular-nums",
                    tx.type === "credit" ? "text-primary" : "text-foreground"
                  )} dir="ltr">
                    {tx.type === "credit" ? "+" : "-"}{tx.amount.toLocaleString('ar-SA')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, active }: any) {
  return (
    <button className={cn(
      "flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all",
      active 
        ? "bg-blue-50 text-blue-600 border border-blue-200" 
        : "bg-secondary hover:bg-secondary/80 text-foreground border border-transparent"
    )}>
      <Icon className="w-5 h-5" />
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
}
