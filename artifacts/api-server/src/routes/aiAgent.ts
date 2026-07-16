import { Router } from "express";

const router = Router();

// ─── Session Store ────────────────────────────────────────────────────────────
interface Session {
  answers: Record<number, string>;
  goal: string | null;
}
const sessions = new Map<string, Session>();

function getSession(id: string): Session {
  if (!sessions.has(id)) sessions.set(id, { answers: {}, goal: null });
  return sessions.get(id)!;
}

// ─── Label Maps (for profile sidebar) ────────────────────────────────────────
const GOAL_LABELS: Record<string, string> = {
  investment: "الاستثمار",
  "credit-card": "البطاقة الائتمانية",
  financing: "التمويل الشخصي",
  saving: "الادخار",
  banking: "الخدمات المصرفية",
};
const INCOME_LABELS: Record<string, string> = {
  income_low: "أقل من 5,000 ريال",
  income_mid: "5,000 – 15,000 ريال",
  income_high: "15,000 – 30,000 ريال",
  income_vhigh: "أكثر من 30,000 ريال",
};
const SPEND_LABELS: Record<string, string> = {
  spend_sm: "أقل من 3,000 ريال",
  spend_md: "3,000 – 8,000 ريال",
  spend_lg: "أكثر من 8,000 ريال",
};

function buildProfile(session: Session) {
  const goal = session.answers[1];
  const income = session.answers[2];
  const spend = session.answers[3];
  return [
    {
      label: "الهدف",
      value: goal ? (GOAL_LABELS[goal] ?? goal) : "قيد التحديد",
      resolved: !!goal,
    },
    {
      label: "الدخل الشهري",
      value: income ? (INCOME_LABELS[income] ?? income) : "قيد التحديد",
      resolved: !!income,
    },
    {
      label: "نمط الإنفاق",
      value: spend ? (SPEND_LABELS[spend] ?? spend) : "قيد التحليل",
      resolved: !!spend,
    },
    { label: "التوصية", value: "قيد الإعداد", resolved: false },
  ];
}

// ─── Step 1 — goal selection (shared, totalSteps assumed 6) ───────────────────
const STEP1 = {
  stepNumber: 1,
  totalSteps: 6,
  question: "ما هو هدفك المالي الآن؟",
  options: [
    { key: "investment",  label: "الاستثمار",           description: "نمّ ثروتك بخيارات استثمارية متوافقة مع أهدافك" },
    { key: "credit-card", label: "أفضل بطاقة ائتمانية", description: "اعثر على البطاقة التي تناسب إنفاقك وتمنحك أعلى مزايا" },
    { key: "financing",   label: "تمويل شخصي",           description: "احصل على تمويل بأفضل شروط تناسب دخلك والتزاماتك" },
    { key: "saving",      label: "الادخار",              description: "ضاعف مدخراتك بخطط مدروسة ومنتجات عالية العائد" },
    { key: "banking",     label: "خدمات مصرفية",         description: "اكتشف خدمات الإنماء التي تناسب احتياجاتك اليومية" },
  ],
  profileSoFar: [
    { label: "الهدف",         value: "قيد التحديد", resolved: false },
    { label: "الدخل الشهري", value: "قيد التحديد", resolved: false },
    { label: "نمط الإنفاق",  value: "قيد التحليل", resolved: false },
    { label: "التوصية",       value: "قيد الإعداد", resolved: false },
  ],
};

// ─── Step 2 — monthly income (UNIVERSAL) ─────────────────────────────────────
function makeStep2(session: Session) {
  return {
    stepNumber: 2,
    totalSteps: 6,
    question: "ما نطاق دخلك الشهري؟",
    options: [
      { key: "income_low",   label: "أقل من 5,000 ريال",    description: "في بداية المسيرة المهنية — نصمّم لك خطة تناسب مرحلتك" },
      { key: "income_mid",   label: "5,000 – 15,000 ريال",  description: "المستوى الأكثر شيوعاً — خيارات واسعة ومتوافقة" },
      { key: "income_high",  label: "15,000 – 30,000 ريال", description: "دخل جيد يتيح بناء محفظة قوية ومتنوعة" },
      { key: "income_vhigh", label: "أكثر من 30,000 ريال",  description: "يُفتح لك المستوى المتقدم من منتجات الإنماء" },
    ],
    profileSoFar: buildProfile(session),
  };
}

// ─── Step 3 — monthly spending (UNIVERSAL) ───────────────────────────────────
function makeStep3(session: Session) {
  return {
    stepNumber: 3,
    totalSteps: 6,
    question: "ما معدل إنفاقك الشهري في المتوسط؟",
    options: [
      { key: "spend_sm", label: "أقل من 3,000 ريال",   description: "إنفاق محدود مع فرصة ادخار مرتفعة" },
      { key: "spend_md", label: "3,000 – 8,000 ريال",  description: "إنفاق معتدل يعكس نمط حياة متوازن" },
      { key: "spend_lg", label: "أكثر من 8,000 ريال",  description: "إنفاق مرتفع — سنجد لك فرصاً للتوفير" },
    ],
    profileSoFar: buildProfile(session),
  };
}

// ─── Goal-specific steps (4 → 6) ─────────────────────────────────────────────
type QStep = {
  stepNumber: number;
  totalSteps: number;
  question: string;
  options: { key: string; label: string; description: string }[];
};

const GOAL_STEPS: Record<string, QStep[]> = {
  investment: [
    {
      stepNumber: 4, totalSteps: 6,
      question: "ما هدفك الأساسي من الاستثمار؟",
      options: [
        { key: "growth",       label: "نمو رأس المال",     description: "تعظيم قيمة محفظتك على المدى البعيد" },
        { key: "income",       label: "دخل شهري منتظم",   description: "توزيعات دورية تدعم تدفقاتك النقدية" },
        { key: "preservation", label: "حفظ رأس المال",     description: "حماية الأصول مع عوائد مستقرة" },
      ],
    },
    {
      stepNumber: 5, totalSteps: 6,
      question: "ما مستوى المخاطرة الذي تقبله؟",
      options: [
        { key: "low",    label: "منخفض — أُفضّل الأمان",   description: "عوائد أقل مقابل استقرار تام" },
        { key: "medium", label: "متوسط — توازن مدروس",      description: "عوائد معقولة مع تقلب محسوب" },
        { key: "high",   label: "مرتفع — أتطلع للنمو",     description: "أتقبل تذبذباً أعلى مقابل عوائد استثنائية" },
      ],
    },
    {
      stepNumber: 6, totalSteps: 6,
      question: "كم تودّ أن تستثمر شهرياً؟",
      options: [
        { key: "amount_low",    label: "أقل من 500 ريال",    description: "مبلغ تجريبي لبدء رحلتك الاستثمارية" },
        { key: "amount_medium", label: "500 – 2,000 ريال",   description: "مستوى مناسب لبناء محفظة متنوعة" },
        { key: "amount_high",   label: "أكثر من 2,000 ريال", description: "استثمار جاد يُعجّل في تحقيق أهدافك" },
      ],
    },
  ],

  "credit-card": [
    {
      stepNumber: 4, totalSteps: 6,
      question: "هل تسافر بشكل منتظم؟",
      options: [
        { key: "travel_frequent", label: "نعم — أسافر كثيراً",    description: "رحلات متعددة سنوياً داخلياً وخارجياً" },
        { key: "travel_rare",     label: "أحياناً — سفر نادر",    description: "رحلة أو رحلتان في السنة كحدٍّ أقصى" },
        { key: "no_travel",       label: "لا أسافر تقريباً",       description: "أفضّل قضاء الوقت والمال داخل المملكة" },
      ],
    },
    {
      stepNumber: 5, totalSteps: 6,
      question: "أين يتركز معظم إنفاقك الشهري؟",
      options: [
        { key: "travel_dining", label: "سفر ومطاعم",        description: "رحلات جوية ومطاعم وترفيه" },
        { key: "shopping",      label: "تسوق ومشتريات",     description: "محلات تجارية وتسوق إلكتروني" },
        { key: "fuel_bills",    label: "وقود وفواتير",      description: "مصاريف يومية وفواتير دورية" },
        { key: "mixed",         label: "متنوع",              description: "إنفاق متوازن بين جميع الفئات" },
      ],
    },
    {
      stepNumber: 6, totalSteps: 6,
      question: "ما الميزة الأهم لك في بطاقة الائتمان؟",
      options: [
        { key: "cashback",     label: "استرداد نقدي",   description: "نسبة من كل شراء تُرد إلى حسابك فوراً" },
        { key: "points",       label: "نقاط ومكافآت",  description: "نقاط تتراكم وتُستبدل بمكافآت وتذاكر طيران" },
        { key: "travel_perks", label: "مزايا السفر",    description: "صالات مطارات ورحلات مجانية وتأمين سفر" },
        { key: "low_fees",     label: "رسوم منخفضة",   description: "أقل رسوم سنوية مع مزايا مناسبة" },
      ],
    },
  ],

  financing: [
    {
      stepNumber: 4, totalSteps: 6,
      question: "ما الغرض من التمويل؟",
      options: [
        { key: "personal_needs", label: "احتياجات شخصية",       description: "مصاريف طارئة أو خطط حياتية عاجلة" },
        { key: "home_reno",      label: "تجديد أو توسعة المنزل", description: "تحسينات وتجديدات عقارية" },
        { key: "education",      label: "تعليم أو تطوير ذاتي",  description: "رسوم دراسية أو شهادات مهنية" },
        { key: "vehicle",        label: "شراء سيارة",            description: "تمويل مركبة جديدة أو مستعملة" },
      ],
    },
    {
      stepNumber: 5, totalSteps: 6,
      question: "ما المبلغ التقريبي الذي تحتاجه؟",
      options: [
        { key: "amount_sm", label: "أقل من 20,000 ريال",    description: "تمويل خفيف للاحتياجات العاجلة" },
        { key: "amount_md", label: "20,000 – 80,000 ريال",  description: "تمويل متوسط لمشاريع شخصية" },
        { key: "amount_lg", label: "أكثر من 80,000 ريال",   description: "تمويل كبير لمشاريع طموحة" },
      ],
    },
    {
      stepNumber: 6, totalSteps: 6,
      question: "خلال كم سنة تريد التسديد؟",
      options: [
        { key: "term_1",    label: "سنة واحدة",          description: "تسديد سريع بأقل كلفة إجمالية" },
        { key: "term_3",    label: "3 سنوات",             description: "توازن بين القسط الشهري والكلفة الكلية" },
        { key: "term_5plus", label: "5 سنوات أو أكثر",   description: "قسط شهري أخف يناسب ميزانيتك" },
      ],
    },
  ],

  saving: [
    {
      stepNumber: 4, totalSteps: 6,
      question: "ما هدف الادخار؟",
      options: [
        { key: "emergency_fund", label: "صندوق طوارئ",    description: "شبكة أمان للظروف غير المتوقعة" },
        { key: "big_purchase",   label: "مشتريات كبيرة",  description: "سيارة، إجازة، أو مشتريات مهمة" },
        { key: "retirement",     label: "التقاعد",         description: "بناء وسادة مالية مستدامة للمستقبل" },
        { key: "children_edu",   label: "تعليم الأبناء",  description: "تأمين مصاريف الدراسة مستقبلاً" },
      ],
    },
    {
      stepNumber: 5, totalSteps: 6,
      question: "كم تستطيع أن تدخر شهرياً؟",
      options: [
        { key: "save_low",    label: "أقل من 500 ريال",    description: "بداية بسيطة لبناء عادة الادخار" },
        { key: "save_medium", label: "500 – 1,500 ريال",   description: "مستوى جيد يحقق أهدافاً ملموسة" },
        { key: "save_high",   label: "أكثر من 1,500 ريال", description: "ادخار مرتفع يُقرّبك من هدفك بسرعة" },
      ],
    },
    {
      stepNumber: 6, totalSteps: 6,
      question: "خلال كم شهر تريد الوصول لهدفك؟",
      options: [
        { key: "timeline_short", label: "أقل من 6 أشهر",      description: "هدف قريب يحتاج التزاماً مرتفعاً" },
        { key: "timeline_mid",   label: "6 أشهر حتى سنتين",   description: "مدة معقولة مع مرونة في التوفير" },
        { key: "timeline_long",  label: "أكثر من سنتين",       description: "خطة طويلة الأمد للأهداف الكبيرة" },
      ],
    },
  ],

  banking: [
    {
      stepNumber: 4, totalSteps: 6,
      question: "أي خدمة مصرفية تهمك أكثر؟",
      options: [
        { key: "transfers",         label: "تحويلات فورية",          description: "محلية ودولية بأسرع وقت وأقل تكلفة" },
        { key: "smart_accounts",    label: "حسابات بعوائد ذكية",     description: "حسابات ادخار تمنحك عائداً شهرياً" },
        { key: "digital_experience", label: "تجربة رقمية متكاملة",  description: "تطبيق ذكي وخدمة لحظية بلا انتظار" },
        { key: "investment_access", label: "وصول للاستثمار",          description: "أسواق مالية وصناديق من الشاشة مباشرة" },
      ],
    },
    {
      stepNumber: 5, totalSteps: 6,
      question: "ما الذي يمنعك من الاستفادة الكاملة من مصرفك الآن؟",
      options: [
        { key: "high_fees",        label: "الرسوم مرتفعة",          description: "رسوم الخدمات والمعاملات تثقل كاهلك" },
        { key: "complexity",       label: "التعقيد والبيروقراطية",  description: "إجراءات طويلة وغير مريحة" },
        { key: "lack_awareness",   label: "لا أعرف ما هو متاح",    description: "أريد استكشاف خيارات لم أسمع عنها" },
        { key: "limited_digital",  label: "الخدمات الرقمية محدودة", description: "أريد تجربة رقمية أفضل وأسرع" },
      ],
    },
    {
      stepNumber: 6, totalSteps: 6,
      question: "كم مرة تستخدم تطبيق الإنماء المصرفي أسبوعياً؟",
      options: [
        { key: "daily",       label: "يومياً تقريباً",      description: "مستخدم نشط يحتاج تجربة سلسة وسريعة" },
        { key: "few_weekly",  label: "2-3 مرات في الأسبوع", description: "استخدام منتظم للمهام الأساسية" },
        { key: "rarely",      label: "نادراً",               description: "أودّ تحسين تجربتي وزيادة استخدامي" },
      ],
    },
  ],
};

// ─── Report Generator ─────────────────────────────────────────────────────────
function generateReport(session: Session) {
  const goal = session.answers[1] || "investment";
  const income = session.answers[2];
  const spend = session.answers[3];

  // Dynamic score influenced by income/spend answers
  let baseScore = 72;
  if (income === "income_high" || income === "income_vhigh") baseScore += 6;
  if (spend === "spend_sm") baseScore += 4;
  else if (spend === "spend_lg") baseScore -= 3;

  const incomeLabel = income ? (INCOME_LABELS[income] ?? income) : "متوسط";
  const spendLabel  = spend  ? (SPEND_LABELS[spend]  ?? spend)  : "معتدل";

  const configs: Record<string, {
    goalLabel: string;
    recommendationId: string;
    productName: string;
    compatibilityScore: number;
    yearlySavings: number;
    executiveSummary: string;
    scoreExplanation: string;
    selectionReason: string;
    financialImpact: { label: string; value: string; description: string }[];
    improvementOpportunities: { title: string; description: string }[];
    insights: { type: "strength" | "gap" | "opportunity"; title: string; text: string }[];
  }> = {
    investment: {
      goalLabel: "الاستثمار",
      recommendationId: "rec-001",
      productName: "محفظة الإنماء للنمو — صندوق الاستثمار",
      compatibilityScore: 92,
      yearlySavings: 4200,
      executiveSummary: `بناءً على دخلك الشهري (${incomeLabel}) ونمط إنفاقك (${spendLabel})، رصد نماء AI فرصاً واعدة لتنمية ثروتك. ملفك المالي يُظهر قدرة ادخارية فوق المتوسط وسيولة غير مُستثمرة يمكن تحويلها إلى عائد فعلي. التوصية المقدمة مُصمَّمة خصيصاً لتناسب مرحلتك المالية الحالية وتُعظّم من نمو ثروتك على المدى البعيد.`,
      scoreExplanation: "بُنيت درجتك على ثلاثة محاور: قوة الدخل، انضباط الإنفاق، وجاهزية الاستثمار. نقطة القوة الأبرز هي انتظام الادخار، وأكبر فرصة للتحسين تكمن في تفعيل السيولة المعطّلة وتوجيهها نحو أدوات ذات عائد.",
      selectionReason: `اختار نماء AI هذا المنتج تحديداً لأن ملفك يجمع بين دخل (${incomeLabel}) وإنفاق منضبط (${spendLabel})، ما يُتيح لك هامشاً شهرياً كافياً للاستثمار المنتظم. الصندوق المقترح يتوافق مع شهيتك للمخاطرة ويُقدّم عائداً سنوياً أعلى من بدائله بنسبة تصل إلى 2.3% — مع شفافية كاملة في الرسوم والأداء.`,
      financialImpact: [
        { label: "العائد الاستثماري السنوي المتوقع", value: "+4,200 ريال", description: "بناءً على متوسط أداء الصندوق خلال 3 سنوات" },
        { label: "نمو قيمة المحفظة المتوقع",          value: "+18%",        description: "خلال 5 سنوات بافتراض أداء معتدل للسوق" },
        { label: "وفورات رسوم الإدارة",               value: "340 ريال",   description: "مقارنةً بالصناديق المنافسة بنفس مستوى العائد" },
      ],
      improvementOpportunities: [
        { title: "فعّل الاستثمار الشهري التلقائي",    description: "خصص 10% من دخلك للاستثمار التلقائي — الانضباط يصنع الثروة، ليس المبلغ الأولي." },
        { title: "أعِد توجيه السيولة المعطّلة",       description: "15,200 ريال موقوفة في حساب جارٍ يمكن تحويلها لصندوق بعائد يومي فوري." },
        { title: "راجع توزيع محفظتك كل 6 أشهر",      description: "إعادة التوازن الدورية ترفع العائد السنوي بمتوسط 0.8% بدون مخاطر إضافية." },
      ],
      insights: [
        { type: "strength",    title: "نسبة ادخار ممتازة",    text: "نسبة ادخارك 23% تفوق المتوسط الإقليمي بـ 8 نقاط — هذا يمنحك قدرة استثمارية حقيقية." },
        { type: "gap",         title: "سيولة معطّلة",          text: "رصدنا 15,200 ريال في حسابات جارية لا تعطيك أي عائد — يمكن تشغيلها فوراً." },
        { type: "opportunity", title: "فرصة تحسين العائد",    text: "بإعادة توزيع المحفظة يمكن رفع العائد السنوي بمقدار 2.3% دون زيادة في المخاطرة." },
      ],
    },
    "credit-card": {
      goalLabel: "البطاقة الائتمانية",
      recommendationId: "rec-002",
      productName: "بطاقة الإنماء الماسية بلاس",
      compatibilityScore: 87,
      yearlySavings: 850,
      executiveSummary: `بناءً على دخلك الشهري (${incomeLabel}) وأنماط إنفاقك (${spendLabel})، رصد نماء AI أنك تستحق بطاقة ائتمانية أفضل بكثير مما تستخدمه حالياً. سجلك الائتماني الممتاز وطبيعة إنفاقك تُرشّحك لبطاقة من الفئة الماسية — مع مزايا سفر ومطاعم وكاش باك لا تحصل عليها الآن.`,
      scoreExplanation: "درجتك مبنية على سلامة سجلك الائتماني، وحجم إنفاقك الشهري، ومدى توافق إنفاقك الحالي مع أعلى مستويات الاسترداد. الفجوة الوحيدة هي أن بطاقتك الحالية لا تكافئك بما تستحقه على إنفاقك.",
      selectionReason: `بناءً على إنفاقك (${spendLabel}) ودخلك (${incomeLabel})، محرك التوصية لدى نماء AI فحص 47 بطاقة ائتمانية وخلص إلى أن الإنماء الماسية بلاس تُقدّم أعلى معدل استرداد على إنفاق السفر والمطاعم — وهما الفئتان الأعلى في سلوكك الإنفاقي.`,
      financialImpact: [
        { label: "توفير الكاش باك السنوي المتوقع", value: "+850 ريال",   description: "بناءً على نمط إنفاقك على السفر والمطاعم" },
        { label: "قيمة نقاط المكافآت سنوياً",      value: "1,200 ريال", description: "قابلة للاسترداد عبر تطبيق الإنماء مباشرةً" },
        { label: "توفير على رسوم التحويل الدولي",   value: "320 ريال",   description: "بطاقات بلا رسوم تحويل للعملات الأجنبية" },
      ],
      improvementOpportunities: [
        { title: "وحّد إنفاقك في بطاقة واحدة",       description: "تفرقة الإنفاق على بطاقات متعددة يُقلّل من نقاط المكافآت التي تجمعها." },
        { title: "فعّل تنبيهات الإنفاق الذكية",      description: "تتبع كل معاملة لحظياً يمنعك من تجاوز الحد ويحمي سجلك الائتماني." },
        { title: "استبدل النقاط قبل انتهاء صلاحيتها", description: "كثير من العملاء يخسرون 15-20% من نقاطهم السنوية بسبب انتهاء الصلاحية." },
      ],
      insights: [
        { type: "strength",    title: "سجل ائتماني ممتاز",    text: "تاريخك الائتماني النظيف يؤهلك لأفضل العروض بأعلى حد ائتماني." },
        { type: "gap",         title: "استرداد منخفض جداً",   text: "بطاقتك الحالية تمنحك 1% استرداداً — أي 5× أقل مما يجب أن تحصل عليه." },
        { type: "opportunity", title: "توفير سنوي فوري",      text: "بناءً على إنفاقك على السفر والمطاعم، هذه البطاقة ستوفّر لك أكثر من 850 ريالاً سنوياً." },
      ],
    },
    financing: {
      goalLabel: "التمويل الشخصي",
      recommendationId: "rec-001",
      productName: "تمويل الإنماء الشخصي — عروض يوليو",
      compatibilityScore: 83,
      yearlySavings: 1800,
      executiveSummary: `بتحليل دخلك (${incomeLabel}) ومستوى إنفاقك (${spendLabel})، تبيّن لنماء AI أن نسبة التزاماتك المالية تتيح لك الوصول لتمويل بشروط تفضيلية. إعادة هيكلة ديونك الحالية ستُقلّل من القسط الشهري وتوفّر لك سيولة تشغيلية حقيقية كل شهر.`,
      scoreExplanation: "درجتك تعكس صحة نسبة الدين للدخل لديك وانتظام سداداتك السابقة. الفرصة الكبرى هي إعادة التمويل بمعدل أقل من معدلك الحالي الذي يفوق المتوسط السوقي بنسبة ملحوظة.",
      selectionReason: `ملفك المالي (دخل ${incomeLabel}، إنفاق ${spendLabel}) يجعلك مؤهلاً لعروض التمويل التفضيلية في الإنماء التي تُقدّم معدل أقل بـ 1.2% من المتوسط السوقي. هذا يعني قسطاً شهرياً أخف وتوفيراً فعلياً يتراكم كل شهر.`,
      financialImpact: [
        { label: "التوفير السنوي على الأقساط", value: "+1,800 ريال", description: "بإعادة هيكلة التمويل بمعدل فائدة أقل" },
        { label: "تخفيض القسط الشهري",          value: "150 ريال",   description: "قسط شهري أخف يمنحك مرونة مالية أكبر" },
        { label: "مدة سداد أقصر",               value: "8 أشهر",    description: "بنفس القسط الحالي يمكنك الانتهاء مبكراً" },
      ],
      improvementOpportunities: [
        { title: "أعِد تمويلك بمعدل فائدة أقل",       description: "الفرق 1.2% يبدو صغيراً لكنه يوفر آلاف الريالات على مدة التمويل كاملة." },
        { title: "حافظ على نسبة دين لدخل دون 30%",    description: "هذه النسبة تبقيك في المنطقة الخضراء وتُتيح لك الحصول على تمويل مستقبلي أسهل." },
        { title: "دمّج التزاماتك في تمويل واحد",       description: "التزام واحد بمعدل موحّد أفضل من عدة التزامات بمعدلات مختلفة." },
      ],
      insights: [
        { type: "strength",    title: "نسبة ديون صحية",       text: "نسبة الدين للدخل لديك أقل من 30% — هذا يمنحك قوة تفاوضية مميزة." },
        { type: "gap",         title: "معدل فائدة فوق السوق", text: "معدل الفائدة الذي تدفعه حالياً أعلى من متوسط السوق بنسبة 1.2%." },
        { type: "opportunity", title: "توفير على الأقساط",    text: "إعادة الهيكلة ستوفر 1,800 ريالاً سنوياً على الأقل مع قسط شهري أخف." },
      ],
    },
    saving: {
      goalLabel: "الادخار",
      recommendationId: "rec-001",
      productName: "حساب الإنماء للادخار المنتظم",
      compatibilityScore: 89,
      yearlySavings: 2400,
      executiveSummary: `بناءً على دخلك (${incomeLabel}) ومستوى إنفاقك (${spendLabel})، يرى نماء AI أنك تمتلك عادة ادخارية إيجابية — لكن مدخراتك تنام في حساب لا يُنتج شيئاً. تحويلها لمنتج ادخار مُدار سيمنحك عائداً حقيقياً دون أي جهد إضافي.`,
      scoreExplanation: "درجتك مبنية على انضباطك في الادخار وانخفاض نسبة إنفاقك من الدخل. الفجوة الوحيدة هي أن أموالك المدخرة غير مُوظَّفة في أدوات تُنمّيها — وهذا ما يُعالجه المنتج المقترح مباشرةً.",
      selectionReason: `نماء AI اختار حساب الادخار المنتظم لأن ملفك (دخل ${incomeLabel}، إنفاق ${spendLabel}) يُظهر هامشاً شهرياً صافياً كافياً لبناء ادخار منتظم. الحساب المقترح يُوفّر عائداً يومياً مُتراكماً دون قيود على السحب — المرونة والعائد معاً.`,
      financialImpact: [
        { label: "العائد السنوي على المدخرات",   value: "+2,400 ريال", description: "بافتراض إيداع شهري منتظم وعائد حالي للحساب" },
        { label: "مضاعفة المدخرات في 5 سنوات",  value: "×1.4",        description: "بفضل الفائدة المُركّبة والإيداع المنتظم" },
        { label: "توفير على رسوم الإدارة",       value: "0 ريال",      description: "حساب الادخار بدون رسوم إدارة شهرية" },
      ],
      improvementOpportunities: [
        { title: "أتمت الادخار بتحويل شهري ثابت", description: "الادخار التلقائي يُزيل العائق النفسي ويضمن الانتظام بدون قرار شهري." },
        { title: "ضع هدفاً مالياً واضحاً للادخار", description: "الادخار نحو هدف محدد يُسرّع وتيرته بمتوسط 35% مقارنةً بالادخار العشوائي." },
        { title: "راجع معدل الادخار مع كل زيادة دخل", description: "رفع نسبة الادخار 5% فقط عند كل زيادة راتب يُضاعف الثروة المتراكمة." },
      ],
      insights: [
        { type: "strength",    title: "عادة ادخار منتظمة",   text: "انتظامك في الادخار هو أكثر ما يميزك مالياً — هذا أهم من المبلغ نفسه." },
        { type: "gap",         title: "مدخرات بلا عائد",     text: "مدخراتك في حساب جارٍ لا يُنتج أي فائدة — أموالك لا تعمل لصالحك." },
        { type: "opportunity", title: "عائد سنوي مضمون",     text: "بنقل المدخرات لحساب ادخار مناسب ستكسب 2,400 ريالاً إضافياً سنوياً بلا مجهود." },
      ],
    },
    banking: {
      goalLabel: "الخدمات المصرفية",
      recommendationId: "rec-002",
      productName: "الباقة المصرفية المتكاملة — الإنماء",
      compatibilityScore: 85,
      yearlySavings: 960,
      executiveSummary: `بتحليل نشاطك المصرفي ودخلك (${incomeLabel}) وإنفاقك (${spendLabel})، وجد نماء AI أنك تدفع مقابل خدمات لا تستخدمها بينما تفتقد خدمات تحتاجها فعلاً. الباقة المقترحة تُعيد ترتيب أولوياتك المصرفية وتُوفّر لك أكثر من 960 ريالاً سنوياً على الرسوم.`,
      scoreExplanation: "درجتك تعكس نشاطك الرقمي المرتفع وكفاءتك في استخدام القنوات الإلكترونية. الفجوة تكمن في أن الباقة الحالية غير مُحسَّنة لنمط استخدامك — وأنت تدفع رسوماً لا تحصل منها على القيمة المناسبة.",
      selectionReason: `الباقة المتكاملة تناسب ملفك (دخل ${incomeLabel}، إنفاق ${spendLabel}) لأنها تُقدّم تحويلات مجانية غير محدودة، وإعفاء من رسوم الاستفسار، ومكافآت على الإنفاق اليومي — وهي بالضبط الخدمات التي تستخدمها أكثر وتدفع عليها رسوماً مرتفعة حالياً.`,
      financialImpact: [
        { label: "وفورات الرسوم السنوية",          value: "+960 ريال",   description: "إعفاء من رسوم التحويلات والخدمات المتكررة" },
        { label: "قيمة المزايا الإضافية للباقة",   value: "1,440 ريال", description: "تأمين سفر، كاش باك، خدمات VIP" },
        { label: "توفير وقت المعاملات",            value: "4 ساعات",    description: "خدمات رقمية متكاملة تُلغي الحاجة للفروع" },
      ],
      improvementOpportunities: [
        { title: "فعّل كل مزايا الباقة الجديدة",    description: "60% من عملاء الباقات المتكاملة لا يُفعّلون أكثر من نصف مزاياها — لا تكن منهم." },
        { title: "حوّل راتبك لحساب الإنماء الرئيسي", description: "تحويل الراتب يُطلق مزايا إضافية ويرفع حدود بعض الخدمات تلقائياً." },
        { title: "استخدم التطبيق بدل الفروع دائماً", description: "90% من المعاملات اليومية أسرع وأوفر عبر التطبيق — ووقتك له قيمة." },
      ],
      insights: [
        { type: "strength",    title: "نشاط رقمي مرتفع",          text: "تفاعلك الرقمي العالي يجعلك من أفضل المرشحين للاستفادة من الباقات الذكية." },
        { type: "gap",         title: "60% من المزايا غير مُستخدمة", text: "أنت لا تستفيد من أكثر من نصف المزايا المتاحة لك في حسابك الحالي." },
        { type: "opportunity", title: "توفير على الرسوم",          text: "بتفعيل الباقة المناسبة ستوفر 960 ريالاً سنوياً على رسوم الخدمات والمعاملات." },
      ],
    },
  };

  const cfg = configs[goal] ?? configs.investment;

  return {
    goalLabel: cfg.goalLabel,
    financialScore: Math.min(baseScore, 95),
    financialScoreLabel: baseScore >= 80 ? "ممتاز" : baseScore >= 70 ? "جيد" : "يحتاج تحسيناً",
    financialScorePercentile: baseScore >= 80 ? 82 : 68,
    yearlySavings: cfg.yearlySavings,
    executiveSummary: cfg.executiveSummary,
    scoreExplanation: cfg.scoreExplanation,
    selectionReason: cfg.selectionReason,
    financialImpact: cfg.financialImpact,
    improvementOpportunities: cfg.improvementOpportunities,
    insights: cfg.insights,
    recommendation: {
      productName: cfg.productName,
      compatibilityScore: cfg.compatibilityScore,
      recommendationId: cfg.recommendationId,
    },
    nextBestActions: [
      { step: 1, label: "اطّلع على التوصية المخصصة",   description: "راجع التوصية الكاملة مع أسباب الاختيار ومزاياها المالية الدقيقة." },
      { step: 2, label: "تحدث مع مستشار الإنماء (اختياري)", description: "احجز جلسة مجانية لمناقشة الخطوات العملية وتفاصيل التنفيذ." },
      { step: 3, label: "ابدأ خطوتك الأولى",            description: "التفعيل يستغرق أقل من 5 دقائق عبر تطبيق الإنماء مباشرةً." },
    ],
  };
}

// ─── Routes ───────────────────────────────────────────────────────────────────
router.get("/ai-agent/flow", (_req, res) => {
  res.json(STEP1);
});

router.post("/ai-agent/answer", (req, res) => {
  const { stepNumber, selectedKey, sessionId } = req.body as {
    stepNumber: number;
    selectedKey: string;
    sessionId?: string;
  };

  const sid = sessionId || "default";
  const session = getSession(sid);

  // Persist answer
  session.answers[stepNumber] = selectedKey;
  if (stepNumber === 1) session.goal = selectedKey;

  const nextStep = stepNumber + 1;
  const goal = session.goal ?? "investment";
  const recId = goal === "credit-card" ? "rec-002" : "rec-001";

  // Universal step 2 (salary)
  if (nextStep === 2) {
    return res.json({ done: false, nextQuestion: makeStep2(session), recommendationId: null });
  }

  // Universal step 3 (spending)
  if (nextStep === 3) {
    return res.json({ done: false, nextQuestion: makeStep3(session), recommendationId: null });
  }

  // Goal-specific steps (4+)
  const goalSteps = GOAL_STEPS[goal] ?? GOAL_STEPS.investment;
  const nextGoalStep = goalSteps.find((s) => s.stepNumber === nextStep);

  if (!nextGoalStep) {
    // All done
    return res.json({ done: true, recommendationId: recId, nextQuestion: null });
  }

  // Attach live profile sidebar
  const withProfile = {
    ...nextGoalStep,
    profileSoFar: buildProfile(session),
  };

  return res.json({ done: false, nextQuestion: withProfile, recommendationId: null });
});

router.get("/ai-agent/report", (req, res) => {
  const sid = (req.query.sessionId as string) || "default";
  const session = sessions.get(sid) ?? { answers: {}, goal: null };
  res.json(generateReport(session));
});

export default router;
