import { Router } from "express";

const router = Router();

// ─── Session Store ────────────────────────────────────────────────────────────
interface Session {
  answers: Record<number, string>;
  goal: string | null;
}
const sessions = new Map<string, Session>();

function getSession(sessionId: string): Session {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { answers: {}, goal: null });
  }
  return sessions.get(sessionId)!;
}

// ─── Step 1 (shared) ─────────────────────────────────────────────────────────
const step1 = {
  stepNumber: 1,
  totalSteps: 5,
  question: "ماذا تريد أن تحقق اليوم؟",
  options: [
    { key: "investment", label: "الاستثمار", description: "نمّ ثروتك بخيارات استثمارية متوافقة مع أهدافك" },
    { key: "credit-card", label: "أفضل بطاقة ائتمانية", description: "اعثر على البطاقة التي تناسب إنفاقك وتمنحك أعلى مزايا" },
    { key: "financing", label: "تمويل شخصي", description: "احصل على تمويل بأفضل شروط تناسب دخلك والتزاماتك" },
    { key: "saving", label: "الادخار", description: "ضاعف مدخراتك بخطط مدروسة ومنتجات عالية العائد" },
    { key: "banking", label: "خدمات مصرفية", description: "اكتشف خدمات الإنماء التي تناسب احتياجاتك اليومية" },
  ],
  profileSoFar: [
    { label: "الهدف", value: "قيد التحديد", resolved: false },
    { label: "الملف المالي", value: "قيد التحليل", resolved: false },
    { label: "التوصية", value: "قيد الإعداد", resolved: false },
  ],
};

// ─── Question Trees ───────────────────────────────────────────────────────────
type QuestionTree = Record<number, {
  stepNumber: number; totalSteps: number; question: string;
  options: { key: string; label: string; description: string }[];
  profileSoFar: { label: string; value: string; resolved: boolean }[];
}>;

const trees: Record<string, QuestionTree> = {
  investment: {
    2: {
      stepNumber: 2, totalSteps: 5,
      question: "ما هدفك الأساسي من الاستثمار؟",
      options: [
        { key: "growth", label: "نمو رأس المال", description: "تعظيم قيمة محفظتك على المدى البعيد" },
        { key: "income", label: "دخل شهري منتظم", description: "توزيعات دورية تُدعم تدفقاتك النقدية" },
        { key: "preservation", label: "حفظ رأس المال", description: "حماية الأصول مع عوائد مستقرة وتقلب منخفض" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "الاستثمار", resolved: true },
        { label: "نوع الهدف", value: "قيد التحديد", resolved: false },
        { label: "مستوى المخاطرة", value: "قيد التحليل", resolved: false },
      ],
    },
    3: {
      stepNumber: 3, totalSteps: 5,
      question: "ما مستوى المخاطرة الذي تقبله؟",
      options: [
        { key: "low", label: "منخفض — أُفضّل الأمان", description: "عوائد أقل مقابل استقرار تام وحماية الرأسمال" },
        { key: "medium", label: "متوسط — توازن مدروس", description: "عوائد معقولة مع تقلب محسوب ومقبول" },
        { key: "high", label: "مرتفع — أتطلع للنمو", description: "أتقبل تذبذباً أعلى مقابل إمكانية عوائد استثنائية" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "الاستثمار", resolved: true },
        { label: "نوع الهدف", value: "نمو رأس المال", resolved: true },
        { label: "مستوى المخاطرة", value: "قيد التحديد", resolved: false },
      ],
    },
    4: {
      stepNumber: 4, totalSteps: 5,
      question: "ما المدة الزمنية المخطط للاستثمار؟",
      options: [
        { key: "short", label: "أقل من سنة", description: "أحتاج السيولة في القريب العاجل" },
        { key: "medium_term", label: "1 إلى 5 سنوات", description: "مدة متوسطة تتيح تنويعاً وعوائد جيدة" },
        { key: "long", label: "أكثر من 5 سنوات", description: "أستثمر للمدى البعيد وبناء ثروة مستدامة" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "الاستثمار", resolved: true },
        { label: "نوع الهدف", value: "نمو رأس المال", resolved: true },
        { label: "مستوى المخاطرة", value: "متوسطة", resolved: true },
      ],
    },
    5: {
      stepNumber: 5, totalSteps: 5,
      question: "كم تودّ أن تبدأ به شهرياً؟",
      options: [
        { key: "amount_low", label: "أقل من 500 ريال", description: "مبلغ تجريبي لبدء رحلتك الاستثمارية" },
        { key: "amount_medium", label: "500 – 2,000 ريال", description: "مستوى مناسب لبناء محفظة متنوعة" },
        { key: "amount_high", label: "أكثر من 2,000 ريال", description: "استثمار جاد يُعجّل في تحقيق أهدافك" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "الاستثمار", resolved: true },
        { label: "نوع الهدف", value: "نمو رأس المال", resolved: true },
        { label: "مستوى المخاطرة", value: "متوسطة", resolved: true },
        { label: "المدة الزمنية", value: "5+ سنوات", resolved: true },
      ],
    },
  },

  "credit-card": {
    2: {
      stepNumber: 2, totalSteps: 4,
      question: "أين يتركز معظم إنفاقك الشهري؟",
      options: [
        { key: "travel_dining", label: "سفر ومطاعم", description: "رحلات جوية ومطاعم وترفيه" },
        { key: "shopping", label: "تسوق ومشتريات", description: "محلات تجارية وتسوق إلكتروني" },
        { key: "fuel_bills", label: "وقود وفواتير", description: "مصاريف يومية وفواتير دورية" },
        { key: "mixed", label: "متنوع بين الفئات", description: "إنفاق متوازن بين جميع الفئات" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "بطاقة ائتمانية", resolved: true },
        { label: "نمط الإنفاق", value: "قيد التحليل", resolved: false },
        { label: "الميزة المفضلة", value: "قيد التحديد", resolved: false },
      ],
    },
    3: {
      stepNumber: 3, totalSteps: 4,
      question: "ما الميزة الأهم لك في البطاقة؟",
      options: [
        { key: "cashback", label: "استرداد نقدي", description: "نسبة مئوية من كل شراء تُرد إلى حسابك" },
        { key: "points", label: "نقاط ومكافآت", description: "نقاط تتراكم وتُستبدل بمكافآت وتذاكر طيران" },
        { key: "travel_perks", label: "مزايا السفر", description: "صالات مطارات ورحلات مجانية وتأمين سفر شامل" },
        { key: "low_fees", label: "رسوم منخفضة", description: "أقل رسوم سنوية مع مزايا مناسبة وكافية" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "بطاقة ائتمانية", resolved: true },
        { label: "نمط الإنفاق", value: "سفر ومطاعم", resolved: true },
        { label: "الميزة المفضلة", value: "قيد التحديد", resolved: false },
      ],
    },
    4: {
      stepNumber: 4, totalSteps: 4,
      question: "ما معدل إنفاقك الشهري بالبطاقة؟",
      options: [
        { key: "spend_low", label: "أقل من 1,000 ريال", description: "إنفاق خفيف ومحدود" },
        { key: "spend_medium", label: "1,000 – 3,000 ريال", description: "إنفاق متوسط منتظم" },
        { key: "spend_high", label: "أكثر من 3,000 ريال", description: "إنفاق مرتفع يستحق أعلى المزايا" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "بطاقة ائتمانية", resolved: true },
        { label: "نمط الإنفاق", value: "سفر ومطاعم", resolved: true },
        { label: "الميزة المفضلة", value: "استرداد نقدي", resolved: true },
      ],
    },
  },

  financing: {
    2: {
      stepNumber: 2, totalSteps: 4,
      question: "ما الغرض من التمويل؟",
      options: [
        { key: "personal_needs", label: "احتياجات شخصية", description: "مصاريف طارئة أو خطط حياتية" },
        { key: "home_reno", label: "تجديد أو توسعة المنزل", description: "تحسينات وتجديدات عقارية" },
        { key: "education", label: "تعليم أو تطوير ذاتي", description: "رسوم دراسية أو شهادات مهنية" },
        { key: "vehicle", label: "شراء سيارة", description: "تمويل مركبة جديدة أو مستعملة" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "تمويل شخصي", resolved: true },
        { label: "الغرض", value: "قيد التحديد", resolved: false },
        { label: "المبلغ المطلوب", value: "قيد التحليل", resolved: false },
      ],
    },
    3: {
      stepNumber: 3, totalSteps: 4,
      question: "ما المبلغ التقريبي الذي تحتاجه؟",
      options: [
        { key: "amount_sm", label: "أقل من 20,000 ريال", description: "تمويل خفيف للاحتياجات العاجلة" },
        { key: "amount_md", label: "20,000 – 80,000 ريال", description: "تمويل متوسط لمشاريع شخصية" },
        { key: "amount_lg", label: "أكثر من 80,000 ريال", description: "تمويل كبير لمشاريع طموحة" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "تمويل شخصي", resolved: true },
        { label: "الغرض", value: "تجديد المنزل", resolved: true },
        { label: "المبلغ المطلوب", value: "قيد التحديد", resolved: false },
      ],
    },
    4: {
      stepNumber: 4, totalSteps: 4,
      question: "خلال كم سنة تريد التسديد؟",
      options: [
        { key: "term_1", label: "سنة واحدة", description: "تسديد سريع بأقل كلفة إجمالية" },
        { key: "term_3", label: "3 سنوات", description: "توازن بين القسط الشهري والكلفة الكلية" },
        { key: "term_5plus", label: "5 سنوات أو أكثر", description: "قسط شهري أخف يناسب ميزانيتك" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "تمويل شخصي", resolved: true },
        { label: "الغرض", value: "تجديد المنزل", resolved: true },
        { label: "المبلغ المطلوب", value: "20–80 ألف ريال", resolved: true },
      ],
    },
  },

  saving: {
    2: {
      stepNumber: 2, totalSteps: 4,
      question: "ما هدف الادخار؟",
      options: [
        { key: "emergency_fund", label: "صندوق طوارئ", description: "شبكة أمان للظروف غير المتوقعة" },
        { key: "big_purchase", label: "مشتريات كبيرة", description: "سيارة، إجازة، أو مشتريات مهمة" },
        { key: "retirement", label: "التقاعد", description: "بناء وسادة مالية مستدامة للمستقبل" },
        { key: "children_edu", label: "تعليم الأبناء", description: "تأمين مصاريف الدراسة مستقبلاً" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "الادخار", resolved: true },
        { label: "هدف الادخار", value: "قيد التحديد", resolved: false },
        { label: "المبلغ الشهري", value: "قيد التحليل", resolved: false },
      ],
    },
    3: {
      stepNumber: 3, totalSteps: 4,
      question: "كم تستطيع أن تدخر شهرياً؟",
      options: [
        { key: "save_low", label: "أقل من 500 ريال", description: "بداية بسيطة لبناء عادة الادخار" },
        { key: "save_medium", label: "500 – 1,500 ريال", description: "مستوى جيد يحقق أهدافاً ملموسة" },
        { key: "save_high", label: "أكثر من 1,500 ريال", description: "ادخار مرتفع يُقرّبك من هدفك بسرعة" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "الادخار", resolved: true },
        { label: "هدف الادخار", value: "صندوق طوارئ", resolved: true },
        { label: "المبلغ الشهري", value: "قيد التحديد", resolved: false },
      ],
    },
    4: {
      stepNumber: 4, totalSteps: 4,
      question: "خلال كم شهر تريد الوصول لهدفك؟",
      options: [
        { key: "timeline_short", label: "أقل من 6 أشهر", description: "هدف قريب يحتاج التزاماً مرتفعاً" },
        { key: "timeline_mid", label: "6 أشهر حتى سنتين", description: "مدة معقولة مع مرونة في التوفير" },
        { key: "timeline_long", label: "أكثر من سنتين", description: "خطة طويلة الأمد للأهداف الكبيرة" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "الادخار", resolved: true },
        { label: "هدف الادخار", value: "صندوق طوارئ", resolved: true },
        { label: "المبلغ الشهري", value: "500–1,500 ريال", resolved: true },
      ],
    },
  },

  banking: {
    2: {
      stepNumber: 2, totalSteps: 3,
      question: "أي خدمة مصرفية تهمك أكثر؟",
      options: [
        { key: "transfers", label: "تحويلات فورية", description: "محلية ودولية بأسرع وقت وأقل تكلفة" },
        { key: "smart_accounts", label: "حسابات بعوائد ذكية", description: "حسابات ادخار تمنحك عائداً شهرياً" },
        { key: "digital_experience", label: "تجربة رقمية متكاملة", description: "تطبيق ذكي وخدمة لحظية بلا انتظار" },
        { key: "investment_access", label: "وصول للاستثمار", description: "أسواق مالية وصناديق من الشاشة مباشرة" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "خدمات مصرفية", resolved: true },
        { label: "الخدمة المطلوبة", value: "قيد التحديد", resolved: false },
        { label: "نوع التحسين", value: "قيد التحليل", resolved: false },
      ],
    },
    3: {
      stepNumber: 3, totalSteps: 3,
      question: "ما الذي يمنعك من الاستفادة الكاملة من مصرفك الآن؟",
      options: [
        { key: "high_fees", label: "الرسوم مرتفعة", description: "رسوم الخدمات والمعاملات تثقل كاهلك" },
        { key: "complexity", label: "التعقيد والبيروقراطية", description: "إجراءات طويلة وغير مريحة" },
        { key: "lack_awareness", label: "لا أعرف ما هو متاح", description: "أريد استكشاف خيارات لم أسمع عنها" },
        { key: "limited_digital", label: "الخدمات الرقمية محدودة", description: "أريد تجربة رقمية أفضل وأسرع" },
      ],
      profileSoFar: [
        { label: "الهدف", value: "خدمات مصرفية", resolved: true },
        { label: "الخدمة المطلوبة", value: "تحويلات فورية", resolved: true },
        { label: "نوع التحسين", value: "قيد التحديد", resolved: false },
      ],
    },
  },
};

// ─── Report Generator ─────────────────────────────────────────────────────────
function generateReport(session: Session) {
  const goal = session.answers[1] || "investment";

  const configs: Record<string, {
    goalLabel: string;
    recommendationId: string;
    productName: string;
    compatibilityScore: number;
    yearlySavings: number;
    insights: { type: "strength" | "gap" | "opportunity"; title: string; text: string }[];
  }> = {
    investment: {
      goalLabel: "الاستثمار",
      recommendationId: "rec-001",
      productName: "محفظة الإنماء للنمو — صندوق الاستثمار",
      compatibilityScore: 92,
      yearlySavings: 4200,
      insights: [
        { type: "strength", title: "نسبة ادخار ممتازة", text: "نسبة ادخارك 23% تفوق المتوسط الإقليمي بـ 8 نقاط — هذا يمنحك قدرة استثمارية حقيقية." },
        { type: "gap", title: "سيولة معطّلة", text: "رصدنا 15,200 ريال في حسابات جارية لا تعطيك أي عائد — يمكن تشغيلها فوراً." },
        { type: "opportunity", title: "فرصة تحسين العائد", text: "بإعادة توزيع المحفظة يمكن رفع العائد السنوي بمقدار 2.3% دون زيادة في المخاطرة." },
      ],
    },
    "credit-card": {
      goalLabel: "البطاقة الائتمانية",
      recommendationId: "rec-002",
      productName: "بطاقة الإنماء الماسية بلاس",
      compatibilityScore: 87,
      yearlySavings: 680,
      insights: [
        { type: "strength", title: "سجل ائتماني ممتاز", text: "تاريخك الائتماني النظيف يؤهلك لأفضل العروض بأعلى حد ائتماني." },
        { type: "gap", title: "استرداد منخفض جداً", text: "بطاقتك الحالية تمنحك 1% استرداداً — أي 5× أقل مما يجب أن تحصل عليه." },
        { type: "opportunity", title: "توفير سنوي فوري", text: "بالبطاقة المناسبة ستوفر أكثر من 680 ريالاً سنوياً بناءً على نمط إنفاقك الحالي." },
      ],
    },
    financing: {
      goalLabel: "التمويل الشخصي",
      recommendationId: "rec-001",
      productName: "تمويل الإنماء الشخصي",
      compatibilityScore: 83,
      yearlySavings: 1800,
      insights: [
        { type: "strength", title: "نسبة ديون صحية", text: "نسبة الدين للدخل لديك أقل من 30% — هذا يمنحك قوة تفاوضية مميزة." },
        { type: "gap", title: "معدل فائدة فوق السوق", text: "معدل الفائدة الذي تدفعه حالياً أعلى من متوسط السوق بنسبة 1.2%." },
        { type: "opportunity", title: "توفير على الأقساط", text: "إعادة الهيكلة ستوفر 1,800 ريالاً سنوياً على الأقل مع قسط شهري أخف." },
      ],
    },
    saving: {
      goalLabel: "الادخار",
      recommendationId: "rec-001",
      productName: "حساب الإنماء للادخار المنتظم",
      compatibilityScore: 89,
      yearlySavings: 2400,
      insights: [
        { type: "strength", title: "عادة ادخار منتظمة", text: "انتظامك في الادخار هو أكثر ما يميزك مالياً — هذا أهم من المبلغ نفسه." },
        { type: "gap", title: "مدخرات بلا عائد", text: "مدخراتك في حساب جارٍ لا يُنتج أي فائدة — أموالك لا تعمل لصالحك." },
        { type: "opportunity", title: "عائد سنوي مضمون", text: "بنقل المدخرات لحساب ادخار مناسب ستكسب 2,400 ريالاً إضافياً سنوياً بلا مجهود." },
      ],
    },
    banking: {
      goalLabel: "الخدمات المصرفية",
      recommendationId: "rec-002",
      productName: "الباقة المصرفية المتكاملة — الإنماء",
      compatibilityScore: 85,
      yearlySavings: 960,
      insights: [
        { type: "strength", title: "نشاط رقمي مرتفع", text: "تفاعلك الرقمي العالي يجعلك من أفضل المرشحين للاستفادة من الباقات الذكية." },
        { type: "gap", title: "60% من المزايا غير مُستخدمة", text: "أنت لا تستفيد من أكثر من نصف المزايا المتاحة لك في حسابك الحالي." },
        { type: "opportunity", title: "توفير على الرسوم", text: "بتفعيل الباقة المناسبة ستوفر 960 ريالاً سنوياً على رسوم الخدمات والمعاملات." },
      ],
    },
  };

  const cfg = configs[goal] || configs.investment;

  return {
    goalLabel: cfg.goalLabel,
    financialScore: 74,
    financialScoreLabel: "جيد",
    financialScorePercentile: 68,
    yearlySavings: cfg.yearlySavings,
    insights: cfg.insights,
    recommendation: {
      productName: cfg.productName,
      compatibilityScore: cfg.compatibilityScore,
      recommendationId: cfg.recommendationId,
    },
    nextBestActions: [
      {
        step: 1,
        label: "اطّلع على التوصية المخصصة",
        description: "راجع التوصية الكاملة مع أسباب الاختيار ومزاياها المالية الدقيقة.",
      },
      {
        step: 2,
        label: "تحدث مع مستشار الإنماء",
        description: "احجز جلسة مجانية لمناقشة الخطوات العملية وتفاصيل التنفيذ.",
      },
      {
        step: 3,
        label: "ابدأ خطوتك الأولى",
        description: "التفعيل يستغرق أقل من 5 دقائق عبر تطبيق الإنماء مباشرةً.",
      },
    ],
  };
}

// ─── Routes ───────────────────────────────────────────────────────────────────
router.get("/ai-agent/flow", (_req, res) => {
  res.json(step1);
});

router.post("/ai-agent/answer", (req, res) => {
  const { stepNumber, selectedKey, sessionId } = req.body as {
    stepNumber: number;
    selectedKey: string;
    sessionId?: string;
  };

  const sid = sessionId || "default";
  const session = getSession(sid);

  // Persist this answer
  session.answers[stepNumber] = selectedKey;

  // Step 1 sets the goal
  if (stepNumber === 1) {
    session.goal = selectedKey;
  }

  const goal = session.goal || "investment";
  const tree = trees[goal] || trees.investment;
  const stepNums = Object.keys(tree).map(Number).sort((a, b) => a - b);
  const lastStep = stepNums[stepNums.length - 1];
  const nextStepNum = stepNumber + 1;

  // Decide recommendation by goal
  const recId = goal === "credit-card" ? "rec-002" : "rec-001";

  if (nextStepNum > lastStep) {
    return res.json({ done: true, recommendationId: recId, nextQuestion: null });
  }

  const nextQ = tree[nextStepNum];
  if (!nextQ) {
    return res.json({ done: true, recommendationId: recId, nextQuestion: null });
  }

  res.json({ done: false, nextQuestion: { ...nextQ, totalSteps: lastStep }, recommendationId: null });
});

router.get("/ai-agent/report", (req, res) => {
  const sid = (req.query.sessionId as string) || "default";
  const session = sessions.get(sid) || { answers: {}, goal: null };
  res.json(generateReport(session));
});

export default router;
