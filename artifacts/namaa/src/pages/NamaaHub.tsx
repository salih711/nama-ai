import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Brain, Send, Activity, PiggyBank, TrendingUp,
  CreditCard, Building, BarChart3, Star, ArrowLeft, ChevronLeft,
  Eye, Target, Lightbulb, Zap, RotateCcw, CheckCircle2,
  MessageSquare, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Suggestion {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  action: string;
  chatPrompt?: string;
  href?: string;
}

interface AiService {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  badge?: string;
  href: string;
}

interface ExplainabilityBlock {
  reason: string;
  data: string[];
  score: number;
  action: string;
  actionHref?: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  explainability?: ExplainabilityBlock;
  timestamp: Date;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const SUGGESTIONS: Suggestion[] = [
  {
    id: "s1",
    icon: TrendingUp,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    tag: "فرصة مكتشفة",
    tagColor: "text-emerald-700 bg-emerald-50",
    title: "لديك فائض شهري 420 ريال غير مستثمر",
    subtitle: "نقله لحساب التوفير يمنحك 5,040 ريال سنوياً بدون تغيير عاداتك",
    action: "كيف أستثمر الفائض؟",
    chatPrompt: "كيف حسبت الفائض؟",
  },
  {
    id: "s2",
    icon: CreditCard,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    tag: "توصية جديدة",
    tagColor: "text-amber-700 bg-amber-50",
    title: "بطاقة تناسب نمط إنفاقك تماماً",
    subtitle: "بناءً على إنفاقك على السفر والمطاعم — ستوفر 850 ريال سنوياً",
    action: "أعرفني بها",
    chatPrompt: "ما أفضل بطاقة لي؟",
  },
  {
    id: "s3",
    icon: Activity,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    tag: "صحة مالية",
    tagColor: "text-primary bg-primary/10",
    title: "مؤشر صحتك المالية 78 / 100",
    subtitle: "ارتفع 3 نقاط هذا الشهر — اكتشف مجالات التحسين المتبقية",
    action: "عرض التقرير الكامل",
    href: "/ai-agent?service=health-report",
  },
  {
    id: "s4",
    icon: PiggyBank,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tag: "خطة مقترحة",
    tagColor: "text-blue-700 bg-blue-50",
    title: "أنشئ خطة ادخار ذكية",
    subtitle: "نماء يصمم لك خطة مخصصة بناءً على دخلك وأهدافك في 3 دقائق",
    action: "ابدأ الخطة",
    href: "/ai-agent?service=savings-planner",
  },
  {
    id: "s5",
    icon: Building,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    tag: "تمويل",
    tagColor: "text-violet-700 bg-violet-50",
    title: "تحقق من أهليتك للتمويل",
    subtitle: "التزاماتك الحالية تضعك ضمن نطاق الأهلية — اعرف المبلغ الذي تستحق",
    action: "تحقق الآن",
    chatPrompt: "هل يناسبني التمويل؟",
  },
  {
    id: "s6",
    icon: BarChart3,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    tag: "استثمار",
    tagColor: "text-rose-700 bg-rose-50",
    title: "محفظتك تحتاج تنويعاً",
    subtitle: "74% من أصولك نقد — توجيه جزء منها للاستثمار يرفع عائدك المحتمل",
    action: "استكشف الفرص",
    chatPrompt: "ما أفضل استثمار لحالتي؟",
  },
];

const AI_SERVICES: AiService[] = [
  {
    id: "health-report",
    icon: Activity,
    title: "تحليل الصحة المالية",
    desc: "تقرير شامل لوضعك المالي مع نقاط القوة والفجوات",
    badge: "شامل",
    href: "/ai-agent?service=health-report",
  },
  {
    id: "smart-recommendation",
    icon: Sparkles,
    title: "التوصية الذكية",
    desc: "اكتشف المنتج الأنسب من 47 منتجاً بناءً على ملفك",
    badge: "الأشهر",
    href: "/ai-agent?service=smart-recommendation",
  },
  {
    id: "savings-planner",
    icon: PiggyBank,
    title: "مخطط الادخار",
    desc: "خطة ادخار مخصصة بأهداف واضحة وخطوات عملية",
    href: "/ai-agent?service=savings-planner",
  },
  {
    id: "investment-advisor",
    icon: TrendingUp,
    title: "مستشار الاستثمار",
    desc: "توصيات استثمارية تتوافق مع مستوى مخاطرتك وأفقك الزمني",
    href: "/ai-agent?service=investment-advisor",
  },
  {
    id: "financing-advisor",
    icon: Building,
    title: "مستشار التمويل",
    desc: "قيّم أهليتك واحصل على أفضل شروط تمويل تناسبك",
    href: "/ai-agent?service=financing-advisor",
  },
  {
    id: "compare",
    icon: BarChart3,
    title: "مقارنة المنتجات",
    desc: "قارن المنتجات المصرفية جنباً إلى جنب واختر الأنسب",
    href: "/ai-agent?service=smart-recommendation",
  },
];

const QUICK_QUESTIONS = [
  "كيف حسبت الفائض؟",
  "لماذا رشحت هذا المنتج؟",
  "ما أفضل بطاقة لي؟",
  "كيف أزيد ادخاري؟",
  "هل يناسبني التمويل؟",
  "ما أفضل استثمار لحالتي؟",
];

// ─── Mock AI Responses ────────────────────────────────────────────────────────
interface MockResponse {
  text: string;
  explainability: ExplainabilityBlock;
}

function getMockResponse(question: string): MockResponse {
  const q = question.toLowerCase();

  if (q.includes("فائض") || q.includes("حسبت")) {
    return {
      text: "لاحظ نماء أن رصيدك الجاري يتجاوز إنفاقك الشهري المعتاد بمعدل 420 ريال لم تُستخدم خلال الأشهر الثلاثة الماضية. هذا المبلغ يظل راكداً دون أن يعمل لصالحك. تحويله تلقائياً إلى حساب التوفير يُنمّي ثروتك بـ 5,040 ريال سنوياً دون أي تغيير في عاداتك المالية.",
      explainability: {
        reason: "رصيدك الجاري يتجاوز احتياجاتك الشهرية الفعلية بشكل منتظم، مما يعني سيولة معطّلة يمكن تحويلها إلى عائد.",
        data: ["معاملاتك خلال آخر 90 يوماً", "متوسط الإنفاق الشهري: 14,230 ريال", "الرصيد الجاري المتوسط: 24,350 ريال", "الفائض المرصود: 420 ريال / شهر"],
        score: 94,
        action: "تفعيل خطة الادخار الذكية",
        actionHref: "/ai-agent?service=savings-planner",
      },
    };
  }

  if (q.includes("بطاقة")) {
    return {
      text: "بناءً على تحليل معاملاتك، أنفقت في المتوسط 1,420 ريال شهرياً على السفر والمطاعم. بطاقة الإنماء الماسية بلاس تمنحك نقاطاً مضاعفة على هذه الفئات بقيمة استردادية 850 ريال سنوياً — أي 3× أكثر من بطاقتك الحالية — مع تغطية سفر شاملة وصالات المطارات.",
      explainability: {
        reason: "نمط إنفاقك يتمحور حول السفر والمطاعم، وهي الفئات التي تمنح أعلى عائد في البطاقة المقترحة.",
        data: ["إنفاق السفر والمطاعم: 1,420 ريال / شهر", "تحليل 8 بطاقات من محفظة الإنماء", "العائد المحتمل: 850 ريال / سنة"],
        score: 91,
        action: "عرض تفاصيل البطاقة",
        actionHref: "/cards",
      },
    };
  }

  if (q.includes("ادخار") || q.includes("أزيد") || q.includes("توفير")) {
    return {
      text: "لزيادة ادخارك يمكنك تفعيل التحويل التلقائي: في كل مطلع شهر ينقل نماء 420 ريال من رصيدك الجاري إلى حساب التوفير تلقائياً. عائد 3.7% سنوياً يجعل هذا المبلغ يُحقق 5,040 ريال خلال سنة واحدة دون أن تشعر بالفرق في ميزانيتك اليومية.",
      explainability: {
        reason: "الفائض المرصود في حسابك الجاري يُتيح ادخاراً آلياً دون الحاجة لتغيير سلوكك الإنفاقي.",
        data: ["الفائض الشهري القابل للادخار: 420 ريال", "نسبة عائد حساب التوفير: 3.7%", "العائد السنوي المتوقع: 5,040 ريال"],
        score: 94,
        action: "إنشاء خطة ادخار مخصصة",
        actionHref: "/ai-agent?service=savings-planner",
      },
    };
  }

  if (q.includes("تمويل") || q.includes("أهلية") || q.includes("قرض")) {
    return {
      text: "بناءً على دخلك الشهري وإجمالي التزاماتك الحالية، نسبة التزاماتك لدخلك تبلغ حوالي 27% — وهي ضمن نطاق الأهلية المقبولة بموجب أنظمة مؤسسة النقد. هذا يؤهلك للحصول على تمويل شخصي بمبلغ يصل إلى 85,000 ريال بأقساط مناسبة لميزانيتك.",
      explainability: {
        reason: "نسبة الالتزامات إلى الدخل (نمو) أقل من 33%، وهو الحد الذي تُطبّقه معظم البنوك لقبول طلبات التمويل.",
        data: ["الدخل الشهري المرصود: 18,500 ريال", "إجمالي الالتزامات الحالية: ~5,000 ريال", "نسبة الالتزامات للدخل: 27%", "الحد المسموح: 33%"],
        score: 88,
        action: "استكشاف خيارات التمويل",
        actionHref: "/ai-agent?service=financing-advisor",
      },
    };
  }

  if (q.includes("استثمار") || q.includes("حالتي") || q.includes("محفظة")) {
    return {
      text: "محفظتك الحالية تتمركز في النقد بنسبة 74%، وهو أعلى بكثير من المعدل المثالي (20–30%). بناءً على أفقك الزمني المتوسط ومستوى مخاطرتك، صندوق الإنماء للمؤشرات يُعدّ الخيار الأنسب — عائد تاريخي 10.2% سنوياً مع متطلب ادخار شهري بسيط يبدأ من 500 ريال.",
      explainability: {
        reason: "التركيز العالي في النقد يعني ضياع فرصة عائد تراكمي على المدى البعيد مع تآكل القيمة بفعل التضخم.",
        data: ["توزيع المحفظة الحالية: 74% نقد", "تحليل 12 صندوق استثماري في الإنماء", "العائد التاريخي للصندوق المقترح: 10.2%", "المدة المقترحة: 5 سنوات فأكثر"],
        score: 87,
        action: "فتح حساب استثماري",
        actionHref: "/ai-agent?service=investment-advisor",
      },
    };
  }

  if (q.includes("رشحت") || q.includes("منتج") || q.includes("لماذا")) {
    return {
      text: "التوصيات التي يقدمها نماء مبنية بالكامل على بياناتك الشخصية — وليست عروضاً تسويقية عامة. نماء يحلل دخلك، نمط إنفاقك، التزاماتك، ومستوى تقبلك للمخاطرة، ثم يقارن 47 منتجاً من محفظة الإنماء قبل أن يُوصي بالأنسب لملفك تحديداً.",
      explainability: {
        reason: "كل توصية تنبع من تحليل شخصي دقيق — لا من خوارزميات تسويقية أو أهداف مبيعات.",
        data: ["معاملاتك خلال آخر 90 يوماً", "47 منتجاً مُقارَناً في محفظة الإنماء", "6 محاور تحليل: الدخل، الإنفاق، الالتزامات، المخاطرة، الهدف، الأفق الزمني"],
        score: 94,
        action: "ابدأ تحليلك المخصص",
        actionHref: "/ai-agent?service=smart-recommendation",
      },
    };
  }

  // Default
  return {
    text: "شكراً على سؤالك. بناءً على بياناتك المالية الحالية، يمكنني مساعدتك في تحليل وضعك المالي، مقارنة المنتجات، أو وضع خطة لأهدافك. للحصول على إجابة دقيقة تماماً، يمكنك بدء جلسة تحليل كاملة مع نماء.",
    explainability: {
      reason: "إجابة نماء مبنية دائماً على بياناتك الشخصية وليس على معلومات عامة.",
      data: ["ملفك المالي في الإنماء", "معاملاتك الأخيرة", "محفظة منتجات الإنماء الكاملة"],
      score: 85,
      action: "ابدأ تحليلاً مخصصاً",
      actionHref: "/ai-agent?service=smart-recommendation",
    },
  };
}

// ─── Chat bubble ──────────────────────────────────────────────────────────────
function ExplainCard({ block }: { block: ExplainabilityBlock }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 rounded-xl border border-primary/20 bg-primary/4 overflow-hidden text-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-primary/8 transition-colors"
      >
        <span className="font-semibold text-primary flex items-center gap-2 text-xs">
          <Eye className="w-3.5 h-3.5" />
          كيف توصّل نماء لهذه الإجابة؟
        </span>
        <ChevronLeft
          className={cn("w-4 h-4 text-primary transition-transform duration-200", open && "-rotate-90")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-primary/10">

              {/* Reason */}
              <div className="pt-3">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">سبب التوصية</p>
                <p className="text-xs text-foreground/80 leading-relaxed">{block.reason}</p>
              </div>

              {/* Data */}
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">البيانات المستخدمة</p>
                <div className="space-y-1">
                  {block.data.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-xs text-foreground/75">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score + Action */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">درجة التوافق</p>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${block.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-primary">{block.score}%</span>
                  </div>
                </div>
                {block.actionHref && (
                  <Link href={block.actionHref}>
                    <button className="text-[11px] font-bold text-primary border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary hover:text-white transition-all">
                      {block.action}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      )}
      <div className={cn("max-w-[82%] flex flex-col", isUser && "items-end")}>
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tl-sm"
            : "bg-card border border-card-border text-foreground rounded-tr-sm shadow-sm"
        )}>
          {msg.text}
        </div>
        {msg.explainability && <ExplainCard block={msg.explainability} />}
        <span className="text-[10px] text-muted-foreground mt-1 px-1">
          {msg.timestamp.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Chat Section ─────────────────────────────────────────────────────────────
function ChatSection({
  messages,
  input,
  setInput,
  onSend,
  isTyping,
  messagesEndRef,
}: {
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  onSend: (text?: string) => void;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {isEmpty ? (
          /* Empty state */
          <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">اسأل نماء</h3>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed max-w-52">
              اسأل أي سؤال عن حساباتك أو منتجاتك المالية وسيُجيبك بناءً على بياناتك
            </p>

            {/* Quick question chips */}
            <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => onSend(q)}
                  className={cn(
                    "text-right text-xs font-medium px-4 py-2.5 rounded-xl border",
                    "bg-card border-card-border text-foreground",
                    "hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
                    "transition-all duration-150",
                  )}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-card border border-card-border rounded-2xl rounded-tr-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-border shrink-0">
        {!isEmpty && messages.length < 8 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {QUICK_QUESTIONS.slice(0, 3).map((q) => (
              <button
                key={q}
                onClick={() => onSend(q)}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-card-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder="اسأل نماء أي سؤال عن حساباتك أو منتجاتك المالية..."
              rows={1}
              className={cn(
                "w-full resize-none rounded-xl border border-card-border bg-card",
                "px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                "transition-all leading-relaxed",
              )}
              style={{ maxHeight: "100px" }}
            />
          </div>
          <button
            onClick={() => onSend()}
            disabled={!input.trim() || isTyping}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0",
              input.trim() && !isTyping
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                : "bg-secondary text-muted-foreground cursor-not-allowed",
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NamaaHub() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend(text?: string) {
    const msgText = (text ?? input).trim();
    if (!msgText || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: msgText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const mock = getMockResponse(msgText);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: mock.text,
        explainability: mock.explainability,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400 + Math.random() * 600);
  }

  function handleSuggestion(s: Suggestion) {
    if (s.href) {
      window.location.href = s.href;
    } else if (s.chatPrompt) {
      handleSend(s.chatPrompt);
      // scroll to chat
      document.getElementById("namaa-chat")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── Left column: hero + suggestions + services ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-5"
          >
            <div className="relative w-14 h-14 shrink-0">
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/25 animate-ping opacity-40" />
              <div className="relative w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Brain className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[11px] font-bold text-primary uppercase tracking-widest">مساعد نماء</p>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-emerald-600 font-semibold">متصل</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-1">
                مرحباً صالح 👋
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                يمكنني مساعدتك في تحليل وضعك المالي، شرح المنتجات، واقتراح أفضل القرارات بناءً على بياناتك.
              </p>
            </div>
          </motion.div>

          {/* Smart Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                اقتراحات نماء لك
              </h2>
              <span className="text-[11px] text-muted-foreground">بناءً على بياناتك المالية</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTIONS.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className={cn(
                    "bg-card border border-card-border rounded-2xl p-4 cursor-pointer group",
                    "hover:border-primary/30 hover:shadow-md transition-all duration-200",
                  )}
                  onClick={() => handleSuggestion(s)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5", s.iconBg)}>
                      <s.icon className={cn("w-5 h-5", s.iconColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", s.tagColor)}>
                          {s.tag}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground leading-snug mb-1 group-hover:text-primary transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{s.subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary">
                    <Star className="w-3 h-3" />
                    {s.action}
                    <ArrowLeft className="w-3 h-3 mr-auto transition-transform group-hover:-translate-x-0.5" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Services */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                خدمات نماء الذكية
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AI_SERVICES.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Link href={svc.href}>
                    <div className={cn(
                      "bg-card border border-card-border rounded-2xl p-4 h-full cursor-pointer group",
                      "hover:border-primary/30 hover:shadow-md transition-all duration-200",
                    )}>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                        <svc.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h3 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {svc.title}
                        </h3>
                        {svc.badge && (
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full shrink-0">
                            {svc.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{svc.desc}</p>
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        ابدأ
                        <ArrowLeft className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile chat hint */}
          <div className="lg:hidden">
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-bold text-foreground">تحدث مع نماء</p>
                <p className="text-xs text-muted-foreground">اسأل عن أي شيء في بياناتك المالية</p>
              </div>
              <button
                onClick={() => document.getElementById("namaa-chat")?.scrollIntoView({ behavior: "smooth" })}
                className="mr-auto text-[11px] font-bold text-primary border border-primary/30 rounded-lg px-3 py-1.5"
              >
                اسأل الآن
              </button>
            </div>
          </div>

          {/* Mobile chat area */}
          <div id="namaa-chat" className="lg:hidden">
            <div className="bg-card border border-card-border rounded-2xl overflow-hidden" style={{ height: "520px" }}>
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm font-bold text-foreground">نماء</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                {messages.length > 0 && (
                  <button
                    onClick={() => setMessages([])}
                    className="mr-auto text-muted-foreground hover:text-foreground transition-colors"
                    title="محادثة جديدة"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="h-[calc(100%-52px)]">
                <ChatSection
                  messages={messages}
                  input={input}
                  setInput={setInput}
                  onSend={handleSend}
                  isTyping={isTyping}
                  messagesEndRef={messagesEndRef}
                />
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-3 pb-4"
          >
            {[
              { icon: Clock, label: "آخر تحليل", value: "منذ ٣ دقائق" },
              { icon: Target, label: "فرص مكتشفة", value: "٣ فرص" },
              { icon: Lightbulb, label: "عائد سنوي محتمل", value: "٦,٧٤٠ ريال" },
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-card-border rounded-2xl p-3 text-center">
                <stat.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                <p className="text-xs font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Right column: sticky chat (desktop only) ── */}
      <div className="hidden lg:flex w-80 xl:w-96 border-r border-sidebar-border flex-col bg-sidebar shrink-0">
        <div className="px-4 py-3.5 border-b border-sidebar-border flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground leading-tight">نماء</p>
            <p className="text-[10px] text-muted-foreground">مساعدك المالي الذكي</p>
          </div>
          <div className="flex items-center gap-1 mr-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-600 font-semibold">متصل</span>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-muted-foreground hover:text-foreground transition-colors mr-1"
              title="محادثة جديدة"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex-1 min-h-0">
          <ChatSection
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </div>
    </div>
  );
}
