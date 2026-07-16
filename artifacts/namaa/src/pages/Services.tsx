import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeftRight,
  Receipt,
  FileText,
  Users,
  CreditCard,
  Globe,
  FileBarChart2,
  Sparkles,
  PiggyBank,
  TrendingUp,
  Landmark,
  ChevronLeft,
  Brain,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BANKING_SERVICES: { icon: React.ElementType; title: string; description: string; href: string }[] = [
  {
    icon: ArrowLeftRight,
    title: "التحويل السريع",
    description: "حوّل الأموال إلى أي حساب داخلي فورياً دون أي خطوات إضافية.",
    href: "/transfer",
  },
  {
    icon: Receipt,
    title: "المدفوعات",
    description: "سدّد فواتيرك ومدفوعاتك الشهرية من مكان واحد وبدون رسوم.",
    href: "/payments",
  },
  {
    icon: FileText,
    title: "كشف الحساب",
    description: "اطّلع على كشف حسابك التفصيلي وحمّله بصيغة PDF في أي وقت.",
    href: "/reports",
  },
  {
    icon: Users,
    title: "إدارة المستفيدين",
    description: "أضف مستفيدين جدداً وأدِر قائمة حساباتك المحفوظة بسهولة.",
    href: "/beneficiaries",
  },
  {
    icon: CreditCard,
    title: "البطاقات",
    description: "أدِر بطاقاتك الائتمانية والمدينة، وتحكّم في الحدود والإيقاف الفوري.",
    href: "/cards",
  },
  {
    icon: Globe,
    title: "التحويل الدولي",
    description: "أرسل الأموال إلى الخارج بأسعار صرف تنافسية وتتبّع فوري للحوالة.",
    href: "/international-transfer",
  },
];

const AI_SERVICES: { icon: React.ElementType; title: string; description: string; href: string; cta: string }[] = [
  {
    icon: FileBarChart2,
    title: "تحليل الصحة المالية",
    description: "حلل وضعك المالي بالكامل واحصل على درجة مالية وتقرير ذكي مع نقاط القوة وفرص التحسين.",
    href: "/ai-agent?service=health-report",
    cta: "ابدأ التحليل",
  },
  {
    icon: Sparkles,
    title: "التوصية الذكية",
    description: "بعد تحليل بياناتك، يقترح نماء أفضل المنتجات المالية المناسبة مع شرح واضح لأسباب كل توصية.",
    href: "/ai-agent?service=smart-recommendation",
    cta: "اعرض التوصيات",
  },
  {
    icon: PiggyBank,
    title: "خطة الادخار",
    description: "أنشئ خطة ادخار شخصية بناءً على دخلك وهدفك المالي والمدة التي تحددها.",
    href: "/ai-agent?service=savings-planner",
    cta: "أنشئ الخطة",
  },
  {
    icon: TrendingUp,
    title: "المستشار الاستثماري",
    description: "حلل مستوى المخاطرة المناسب لك واحصل على اقتراحات استثمارية تتوافق مع أهدافك.",
    href: "/ai-agent?service=investment-advisor",
    cta: "ابدأ التقييم",
  },
  {
    icon: Landmark,
    title: "مستشار التمويل",
    description: "اعرف أفضل خيارات التمويل المناسبة لوضعك المالي مع تحليل القدرة على السداد.",
    href: "/ai-agent?service=financing-advisor",
    cta: "ابدأ التقييم",
  },
];

// ─── Section header component ─────────────────────────────────────────────────
function SectionHeader({
  title,
  ai,
  delay,
}: {
  title: string;
  ai?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay }}
      className="flex items-center gap-3"
    >
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      {ai && (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15">
          <Brain className="w-2.5 h-2.5 shrink-0" />
          AI Powered
        </span>
      )}
    </motion.div>
  );
}

// ─── Card component ───────────────────────────────────────────────────────────
function ServiceCard({
  svc,
  type,
  delay,
}: {
  svc: { icon: React.ElementType; title: string; description: string; href: string; cta?: string };
  type: "ai" | "traditional";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay }}
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
          {/* Top row: icon + badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
              <svc.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            {type === "ai" ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15">
                <Brain className="w-2.5 h-2.5 shrink-0" />
                AI Powered
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                <Zap className="w-2.5 h-2.5 shrink-0" />
                مباشر
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-foreground mb-1.5 leading-snug">
            {svc.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            {svc.description}
          </p>

          {/* Footer CTA */}
          <div className="flex items-center justify-end mt-4 pt-3 border-t border-border">
            <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-1.5 transition-all">
              {type === "ai" ? (svc.cta ?? "ابدأ التقييم") : "افتح الخدمة"}
              <ChevronLeft className="w-3 h-3" />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-10 pb-24 space-y-10">

      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">خدمات نماء</h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/8 border border-primary/15 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary">11 خدمة</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          الخدمات المصرفية تُفتح مباشرة — خدمات نماء الذكية تبدأ بتقييم مالي مخصص.
        </p>
      </motion.div>

      {/* ══ Section 1: Banking Services ══════════════════════════════════════ */}
      <section className="space-y-4">
        <SectionHeader title="الخدمات المصرفية" delay={0.08} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BANKING_SERVICES.map((svc, i) => (
            <ServiceCard
              key={svc.title}
              svc={svc}
              type="traditional"
              delay={0.12 + i * 0.06}
            />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-border" />

      {/* ══ Section 2: AI Services ════════════════════════════════════════════ */}
      <section className="space-y-4">
        <SectionHeader title="خدمات نماء الذكية" ai delay={0.1} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_SERVICES.map((svc, i) => (
            <ServiceCard
              key={svc.title}
              svc={svc}
              type="ai"
              delay={0.14 + i * 0.06}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
