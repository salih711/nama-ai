import { useGetAiAgentFlow, useSubmitAgentAnswer } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Sparkles, Check, ChevronLeft, Building, Target, PieChart, Shield, Home, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

// Map keys to icons for a richer UI
const iconMap: Record<string, any> = {
  "housing": Home,
  "education": Building,
  "retirement": Target,
  "low": Shield,
  "medium": PieChart,
  "high": Activity,
};

export default function AiAgent() {
  const [, setLocation] = useLocation();
  const { data: flow, isLoading, error } = useGetAiAgentFlow();
  const submitAnswer = useSubmitAgentAnswer();

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground font-medium animate-pulse">نماء يقوم بتحليل بياناتك...</p>
      </div>
    );
  }

  if (error || !flow) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-destructive font-medium">حدث خطأ أثناء تحميل المستشار المالي.</p>
      </div>
    );
  }

  const handleOptionSelect = (key: string) => {
    submitAnswer.mutate({ data: { stepNumber: flow.stepNumber, selectedKey: key } }, {
      onSuccess: (res) => {
        if (res.done && res.recommendationId) {
          setLocation(`/recommendation/${res.recommendationId}`);
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">نماء — مستشارك المالي الذكي</h1>
        <p className="text-muted-foreground">أجب عن بعض الأسئلة لنتمكن من تقديم التوصية الأنسب لك</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Question Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={flow.stepNumber}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-card-border rounded-3xl p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
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

              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 leading-tight">
                {flow.question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {flow.options.map((opt) => {
                  const Icon = iconMap[opt.key] || Activity;
                  const isPending = submitAnswer.isPending && submitAnswer.variables?.data.selectedKey === opt.key;
                  
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleOptionSelect(opt.key)}
                      disabled={submitAnswer.isPending}
                      className={cn(
                        "text-right p-5 rounded-2xl border-2 transition-all duration-200 group relative overflow-hidden",
                        "hover:border-primary/40 hover:bg-secondary/50",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "border-border bg-card"
                      )}
                    >
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-primary transition-colors">
                          {isPending ? (
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{opt.label}</h3>
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

        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-secondary/30 border border-border rounded-3xl p-6 sticky top-6">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <UserCircleIcon className="w-4 h-4 text-primary" />
              ملفك المالي يتشكل
            </h3>
            
            <div className="space-y-4">
              {flow.profileSoFar.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-0.5">
                    {item.resolved ? (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium mb-0.5">{item.label}</div>
                    <div className={cn(
                      "text-sm font-bold",
                      item.resolved ? "text-foreground" : "text-muted-foreground/50 italic"
                    )}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function UserCircleIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
