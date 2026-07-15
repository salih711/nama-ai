import { useGetRecommendation, getGetRecommendationQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Target, TrendingUp, AlertTriangle, Check, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Recommendation() {
  const params = useParams();
  const id = params.id as string;
  const { data: rec, isLoading } = useGetRecommendation(id, { query: { enabled: !!id, queryKey: getGetRecommendationQueryKey(id) } });

  if (isLoading || !rec) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 pb-24">
      
      {/* Back Button */}
      <Link href="/">
        <div className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer">
          <ArrowRight className="w-4 h-4" />
          العودة للرئيسية
        </div>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hero Recommendation Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-card-border rounded-3xl p-8 shadow-sm"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {rec.productType} موصى به
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
              {rec.productName}
            </h1>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {rec.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <div className="text-primary font-bold text-xl">{rec.compatibilityScore}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">درجة التوافق</div>
                  <div className="text-sm font-bold text-foreground">توافق ممتاز</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reasons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              لماذا اختار نماء هذا؟
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {rec.reasons.map((reason, idx) => (
                <div key={idx} className="bg-secondary/40 border border-border rounded-2xl p-5">
                  <h3 className="font-bold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pros / Cons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid sm:grid-cols-2 gap-6">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                المزايا الرئيسية
              </h3>
              <ul className="space-y-3">
                {rec.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5 stroke-[3]" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-6">
              <h3 className="font-bold text-amber-700 dark:text-amber-500 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                مخاطر يجب مراعاتها
              </h3>
              <ul className="space-y-3">
                {rec.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-amber-900 dark:text-amber-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Explainable AI Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="bg-card border-2 border-r-primary border-t-border border-b-border border-l-border rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-bold text-foreground mb-5 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              كيف اتخذ نماء القرار؟
            </h3>
            
            <div className="space-y-4 mb-6 relative before:absolute before:inset-y-2 before:right-3.5 before:w-px before:bg-border">
              {rec.explainableAI.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4 relative z-10">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2",
                    step.done ? "bg-primary border-primary" : "bg-card border-muted"
                  )}>
                    {step.done && <Check className="w-3.5 h-3.5 text-primary-foreground stroke-[3]" />}
                  </div>
                  <span className={cn("text-sm font-medium", step.done ? "text-foreground" : "text-muted-foreground")}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-muted-foreground">درجة الثقة</span>
                <span className="text-sm font-bold text-primary">{rec.explainableAI.confidenceScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${rec.explainableAI.confidenceScore}%` }} />
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="bg-card border border-card-border rounded-2xl p-6 shadow-sm flex flex-col gap-3"
          >
            <button className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              {rec.nextStep.primary}
            </button>
            <button className="w-full py-3.5 px-4 bg-transparent hover:bg-secondary text-foreground border border-border text-sm font-bold rounded-xl transition-colors">
              {rec.nextStep.secondary}
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
