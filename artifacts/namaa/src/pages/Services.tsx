import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  FileBarChart2,
  Sparkles,
  MessageSquare,
  PiggyBank,
  PieChart,
  TrendingUp,
  Landmark,
  CalendarDays,
  Activity,
  ChevronLeft,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Service definitions ──────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: FileBarChart2,
    title: "تقرير الصحة المالية",
    description:
      "تقرير مُولَّد بالذكاء الاصطناعي يُحلّل الدخل والإنفاق والمدخرات والالتزامات المالية.",
    href: "/financial-health",
  },
  {
    icon: Sparkles,
    title: "توصية المنتج الذكية",
    description:
      "نماء يقارن جميع المنتجات المالية ويوصي بالأفضل مع شرح مفصّل لكل سبب وكل رقم.",
    href: "/ai-agent",
  },
  {
    icon: MessageSquare,
    title: "المساعد المالي الذكي",
    description:
      "اطرح أي سؤال مالي بلغة طبيعية واحصل على إجابات شخصية ومخصصة لوضعك الفعلي.",
    href: "/ai-agent",
  },
  {
    icon: PiggyBank,
    title: "أهداف الادخار",
    description:
      "نماء يُنشئ خطط ادخار مخصصة بناءً على أهدافك وعادات إنفاقك والهامش الشهري المتاح.",
    href: "/financial-health",
  },
  {
    icon: PieChart,
    title: "تحليلات الإنفاق",
    description:
      "تصنيف تلقائي لجميع المصروفات مع رؤى ذكية وفرص محددة لتوفير المال كل شهر.",
    href: "/reports",
  },
  {
    icon: TrendingUp,
    title: "فرص الاستثمار",
    description:
      "نماء يقترح منتجات استثمارية مناسبة وفقاً لملف المخاطر والأهداف المالية قصيرة وطويلة المدى.",
    href: "/investments",
  },
  {
    icon: Landmark,
    title: "مستشار التمويل",
    description:
      "نماء يوصي بأنسب خيار تمويل بناءً على القدرة الائتمانية ومعايير الأهلية الحالية.",
    href: "/financing",
  },
  {
    icon: CalendarDays,
    title: "التقرير الأسبوعي الذكي",
    description:
      "احصل على ملخصات مالية أسبوعية مُولَّدة تلقائياً مع توصيات فورية وتنبيهات مخصصة.",
    href: "/reports",
  },
  {
    icon: Activity,
    title: "المؤشر المالي",
    description:
      "اطّلع على مؤشر صحتك المالية المُولَّد بالذكاء الاصطناعي مع شرح تفصيلي وخطوات تحسين عملية.",
    href: "/financial-health",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-10 pb-24 space-y-6">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-start justify-between flex-wrap gap-3"
      >
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-2xl font-bold text-foreground">خدمات نماء AI</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/8 border border-primary/15 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary">9 خدمات ذكية</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            جميع الخدمات مدعومة بالذكاء الاصطناعي وتعمل على بيانات ملفك المالي الفعلي.
          </p>
        </div>
      </motion.div>

      {/* ── Services Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.06 + i * 0.06 }}
          >
            <Link href={svc.href}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18 }}
                className={cn(
                  "bg-card rounded-2xl border border-card-border p-5 shadow-sm cursor-pointer",
                  "h-full flex flex-col",
                  "hover:border-primary/25 hover:shadow-md transition-all duration-200 group"
                )}
              >
                {/* Top row: icon + AI badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <svc.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15">
                    <Brain className="w-2.5 h-2.5 shrink-0" />
                    AI Powered
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-foreground mb-1.5 leading-snug">
                  {svc.title}
                </h3>

                {/* Description — flex-1 keeps all cards equal height */}
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {svc.description}
                </p>

                {/* Footer CTA */}
                <div className="flex items-center justify-end mt-4 pt-3 border-t border-border">
                  <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    ابدأ الآن
                    <ChevronLeft className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
