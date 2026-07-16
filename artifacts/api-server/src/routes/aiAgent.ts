import { Router } from "express";

const router = Router();

// ─── Session Store ────────────────────────────────────────────────────────────
interface Session {
  answers: Record<number, string>;
  service: string;
}

const sessions = new Map<string, Session>();

function getSession(id: string): Session {
  if (!sessions.has(id)) sessions.set(id, { answers: {}, service: "smart-recommendation" });
  return sessions.get(id)!;
}

// ─── Label Maps ───────────────────────────────────────────────────────────────
const INCOME_LABELS: Record<string, string> = {
  income_low:   "أقل من 5,000 ريال",
  income_mid:   "5,000 – 15,000 ريال",
  income_high:  "15,000 – 30,000 ريال",
  income_vhigh: "أكثر من 30,000 ريال",
};
const SPEND_LABELS: Record<string, string> = {
  spend_sm: "أقل من 3,000 ريال",
  spend_md: "3,000 – 8,000 ريال",
  spend_lg: "أكثر من 8,000 ريال",
};
const OBLIG_LABELS: Record<string, string> = {
  oblig_none:   "لا توجد التزامات",
  oblig_light:  "أقل من 2,000 ريال",
  oblig_medium: "2,000 – 5,000 ريال",
  oblig_heavy:  "أكثر من 5,000 ريال",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Option   = { key: string; label: string; description: string };
type FlowStep = { question: string; options: Option[] };

// ─── Service Flow Definitions (6 steps each, income never first) ──────────────
const SERVICE_FLOWS: Record<string, FlowStep[]> = {

  // ── 1. AI Financial Health Report ─────────────────────────────────────────
  "health-report": [
    {
      question: "ما هو هدفك المالي الرئيسي الآن؟",
      options: [
        { key: "wealth_growth",  label: "بناء الثروة",          description: "تنمية الأصول وزيادة قيمتي الصافية على المدى البعيد" },
        { key: "retirement",     label: "التقاعد المريح",        description: "بناء وسادة مالية مستدامة لمرحلة ما بعد العمل" },
        { key: "emergency_fund", label: "صندوق الطوارئ",        description: "شبكة أمان للمصاريف غير المتوقعة والأزمات المفاجئة" },
        { key: "home_purchase",  label: "شراء أو تطوير منزل",   description: "الاستعداد لامتلاك عقار أو تحسين مسكني الحالي" },
      ],
    },
    {
      question: "كيف تصف نمط إنفاقك الشهري في المتوسط؟",
      options: [
        { key: "spend_sm", label: "أقل من 3,000 ريال",  description: "إنفاق محدود مع هامش ادخار مرتفع" },
        { key: "spend_md", label: "3,000 – 8,000 ريال", description: "إنفاق معتدل يعكس نمط حياة متوازن" },
        { key: "spend_lg", label: "أكثر من 8,000 ريال", description: "إنفاق مرتفع — سنجد لك فرصاً للتوفير" },
      ],
    },
    {
      question: "ما نطاق دخلك الشهري؟",
      options: [
        { key: "income_low",   label: "أقل من 5,000 ريال",    description: "في بداية المسيرة المهنية — نصمّم لك خطة تناسب مرحلتك" },
        { key: "income_mid",   label: "5,000 – 15,000 ريال",  description: "المستوى الأكثر شيوعاً — خيارات واسعة ومتوافقة" },
        { key: "income_high",  label: "15,000 – 30,000 ريال", description: "دخل جيد يتيح بناء محفظة قوية ومتنوعة" },
        { key: "income_vhigh", label: "أكثر من 30,000 ريال",  description: "يُفتح لك المستوى المتقدم من منتجات الإنماء" },
      ],
    },
    {
      question: "ما إجمالي التزاماتك المالية الشهرية؟",
      options: [
        { key: "oblig_none",   label: "لا توجد التزامات",    description: "بدون قروض أو أقساط شهرية حالياً" },
        { key: "oblig_light",  label: "أقل من 2,000 ريال",   description: "التزامات خفيفة تمنحك مرونة مالية واسعة" },
        { key: "oblig_medium", label: "2,000 – 5,000 ريال",  description: "التزامات معتدلة ضمن المعدل الطبيعي" },
        { key: "oblig_heavy",  label: "أكثر من 5,000 ريال",  description: "التزامات مرتفعة — سنساعدك في إعادة الهيكلة" },
      ],
    },
    {
      question: "كيف تصف سلوكك في الادخار؟",
      options: [
        { key: "save_disciplined", label: "أدخر بانتظام كل شهر",  description: "لديّ خطة واضحة وأنفّذها بانتظام ثابت" },
        { key: "save_occasional",  label: "أدخر أحياناً",          description: "أدخر عندما تسمح الظروف لكن بدون انتظام" },
        { key: "save_rarely",      label: "نادراً ما أدخر",        description: "أريد البدء لكنني أحتاج خطة عملية واضحة" },
      ],
    },
    {
      question: "ما مستوى تقبّلك للمخاطرة المالية؟",
      options: [
        { key: "low",    label: "منخفض — أُفضّل الأمان",   description: "عوائد أقل مقابل استقرار تام وطمأنينة" },
        { key: "medium", label: "متوسط — توازن مدروس",     description: "عوائد معقولة مع تقلب محسوب ومُدار" },
        { key: "high",   label: "مرتفع — أتطلع للنمو",     description: "أتقبل تذبذباً أعلى مقابل عوائد استثنائية" },
      ],
    },
  ],

  // ── 2. Smart Product Recommendation ───────────────────────────────────────
  "smart-recommendation": [
    {
      question: "ما الذي تبحث عنه؟",
      options: [
        { key: "investment",  label: "منتج استثماري",      description: "نمّ ثروتك بخيارات استثمارية متوافقة مع أهدافك" },
        { key: "credit-card", label: "بطاقة ائتمانية",     description: "اعثر على البطاقة التي تناسب إنفاقك وتمنحك أعلى مزايا" },
        { key: "financing",   label: "تمويل شخصي",          description: "احصل على تمويل بأفضل شروط تناسب دخلك والتزاماتك" },
        { key: "saving",      label: "خطة ادخار",           description: "ضاعف مدخراتك بخطط مدروسة ومنتجات عالية العائد" },
        { key: "banking",     label: "خدمات مصرفية",        description: "اكتشف خدمات الإنماء التي تناسب احتياجاتك اليومية" },
      ],
    },
    {
      question: "ما أولويتك المالية الآن؟",
      options: [
        { key: "grow_wealth",    label: "تنمية الثروة",           description: "زيادة قيمة أصولي وبناء مستقبل مالي متين" },
        { key: "reduce_debt",    label: "تخفيض الديون",           description: "التخلص من القروض والالتزامات تدريجياً" },
        { key: "save_more",      label: "الادخار أكثر",            description: "بناء وسادة مالية ومدخرات شهرية منتظمة" },
        { key: "improve_credit", label: "تحسين السجل الائتماني",  description: "تحسين تصنيفي الائتماني للحصول على أفضل العروض" },
      ],
    },
    {
      question: "ما نطاق دخلك الشهري؟",
      options: [
        { key: "income_low",   label: "أقل من 5,000 ريال",    description: "في بداية المسيرة المهنية — نصمّم لك خطة تناسب مرحلتك" },
        { key: "income_mid",   label: "5,000 – 15,000 ريال",  description: "المستوى الأكثر شيوعاً — خيارات واسعة ومتوافقة" },
        { key: "income_high",  label: "15,000 – 30,000 ريال", description: "دخل جيد يتيح بناء محفظة قوية ومتنوعة" },
        { key: "income_vhigh", label: "أكثر من 30,000 ريال",  description: "يُفتح لك المستوى المتقدم من منتجات الإنماء" },
      ],
    },
    {
      question: "ما إجمالي التزاماتك الشهرية؟",
      options: [
        { key: "oblig_none",   label: "لا توجد التزامات",    description: "بدون قروض أو أقساط شهرية حالياً" },
        { key: "oblig_light",  label: "أقل من 2,000 ريال",   description: "التزامات خفيفة تمنحك مرونة مالية واسعة" },
        { key: "oblig_medium", label: "2,000 – 5,000 ريال",  description: "التزامات معتدلة ضمن المعدل الطبيعي" },
        { key: "oblig_heavy",  label: "أكثر من 5,000 ريال",  description: "التزامات مرتفعة — سنساعدك في إعادة الهيكلة" },
      ],
    },
    {
      question: "هل لديك منتجات مالية حالية مع الإنماء؟",
      options: [
        { key: "products_none", label: "لا، أبدأ من الصفر",        description: "ليس لديّ منتجات مالية فعلية حالياً" },
        { key: "products_some", label: "نعم، بعض المنتجات",         description: "لديّ حساب أو بطاقة وأريد تحسين استفادتي" },
        { key: "products_many", label: "نعم، محفظة منتجات كاملة",  description: "لديّ منتجات متعددة وأريد تحسين تركيبتها" },
      ],
    },
    {
      question: "ما مستوى تقبّلك للمخاطرة المالية؟",
      options: [
        { key: "low",    label: "منخفض — أُفضّل الأمان",   description: "عوائد أقل مقابل استقرار تام وطمأنينة" },
        { key: "medium", label: "متوسط — توازن مدروس",     description: "عوائد معقولة مع تقلب محسوب ومُدار" },
        { key: "high",   label: "مرتفع — أتطلع للنمو",     description: "أتقبل تذبذباً أعلى مقابل عوائد استثنائية" },
      ],
    },
  ],

  // ── 3. Smart Savings Planner ───────────────────────────────────────────────
  "savings-planner": [
    {
      question: "ما هدف الادخار؟",
      options: [
        { key: "emergency_fund", label: "صندوق الطوارئ",    description: "شبكة أمان للمصاريف غير المتوقعة والأزمات" },
        { key: "big_purchase",   label: "مشتريات كبيرة",    description: "سيارة أو إجازة أو حدث مهم في حياتك" },
        { key: "retirement",     label: "التقاعد",           description: "بناء وسادة مالية مستدامة للمستقبل" },
        { key: "children_edu",   label: "تعليم الأبناء",    description: "تأمين مصاريف الدراسة والتطوير مستقبلاً" },
      ],
    },
    {
      question: "كم تستهدف توفيره إجمالاً؟",
      options: [
        { key: "target_low",    label: "أقل من 20,000 ريال",    description: "هدف قريب المنال يمكن تحقيقه خلال أشهر قليلة" },
        { key: "target_medium", label: "20,000 – 80,000 ريال",  description: "هدف متوسط يحتاج تخطيطاً منتظماً وصبراً" },
        { key: "target_high",   label: "أكثر من 80,000 ريال",   description: "هدف طموح يتطلب استراتيجية ادخار متكاملة" },
      ],
    },
    {
      question: "خلال كم شهر تريد الوصول لهدفك؟",
      options: [
        { key: "timeline_short", label: "أقل من 6 أشهر",       description: "هدف قريب يحتاج التزاماً مرتفعاً كل شهر" },
        { key: "timeline_mid",   label: "6 أشهر حتى سنتين",    description: "مدة معقولة مع مرونة في مقدار التوفير" },
        { key: "timeline_long",  label: "أكثر من سنتين",        description: "خطة طويلة الأمد للأهداف الكبيرة والطموحة" },
      ],
    },
    {
      question: "ما نطاق دخلك الشهري؟",
      options: [
        { key: "income_low",   label: "أقل من 5,000 ريال",    description: "في بداية المسيرة المهنية — نصمّم لك خطة تناسب مرحلتك" },
        { key: "income_mid",   label: "5,000 – 15,000 ريال",  description: "المستوى الأكثر شيوعاً — خيارات واسعة ومتوافقة" },
        { key: "income_high",  label: "15,000 – 30,000 ريال", description: "دخل جيد يتيح بناء محفظة قوية ومتنوعة" },
        { key: "income_vhigh", label: "أكثر من 30,000 ريال",  description: "يُفتح لك المستوى المتقدم من منتجات الإنماء" },
      ],
    },
    {
      question: "كم تستطيع أن تدخر شهرياً؟",
      options: [
        { key: "save_low",    label: "أقل من 500 ريال",    description: "بداية بسيطة لبناء عادة الادخار الصحيحة" },
        { key: "save_medium", label: "500 – 1,500 ريال",   description: "مستوى جيد يحقق أهدافاً ملموسة على مدى السنة" },
        { key: "save_high",   label: "أكثر من 1,500 ريال", description: "ادخار مرتفع يُقرّبك من هدفك بشكل ملحوظ" },
      ],
    },
    {
      question: "كيف تصف نمط إنفاقك الشهري؟",
      options: [
        { key: "spend_sm", label: "أقل من 3,000 ريال",  description: "إنفاق محدود مع هامش ادخار مرتفع" },
        { key: "spend_md", label: "3,000 – 8,000 ريال", description: "إنفاق معتدل يعكس نمط حياة متوازن" },
        { key: "spend_lg", label: "أكثر من 8,000 ريال", description: "إنفاق مرتفع — سنجد لك فرصاً للتوفير" },
      ],
    },
  ],

  // ── 4. Investment Advisor ──────────────────────────────────────────────────
  "investment-advisor": [
    {
      question: "ما هدفك الأساسي من الاستثمار؟",
      options: [
        { key: "growth",       label: "نمو رأس المال",    description: "تعظيم قيمة محفظتي على المدى البعيد" },
        { key: "income",       label: "دخل شهري منتظم",  description: "توزيعات دورية تدعم تدفقاتي النقدية" },
        { key: "preservation", label: "حفظ رأس المال",    description: "حماية الأصول مع عوائد مستقرة وآمنة" },
      ],
    },
    {
      question: "ما مستوى المخاطرة الذي تقبله؟",
      options: [
        { key: "low",    label: "منخفض — أُفضّل الأمان",   description: "عوائد أقل مقابل استقرار تام وطمأنينة" },
        { key: "medium", label: "متوسط — توازن مدروس",     description: "عوائد معقولة مع تقلب محسوب ومُدار" },
        { key: "high",   label: "مرتفع — أتطلع للنمو",     description: "أتقبل تذبذباً أعلى مقابل عوائد استثنائية" },
      ],
    },
    {
      question: "ما نطاق دخلك الشهري؟",
      options: [
        { key: "income_low",   label: "أقل من 5,000 ريال",    description: "في بداية المسيرة المهنية — نصمّم لك خطة تناسب مرحلتك" },
        { key: "income_mid",   label: "5,000 – 15,000 ريال",  description: "المستوى الأكثر شيوعاً — خيارات واسعة ومتوافقة" },
        { key: "income_high",  label: "15,000 – 30,000 ريال", description: "دخل جيد يتيح بناء محفظة قوية ومتنوعة" },
        { key: "income_vhigh", label: "أكثر من 30,000 ريال",  description: "يُفتح لك المستوى المتقدم من منتجات الإنماء" },
      ],
    },
    {
      question: "خلال كم سنة تريد تحقيق هدفك الاستثماري؟",
      options: [
        { key: "horizon_short", label: "أقل من 3 سنوات",    description: "هدف قريب يحتاج خيارات استثمارية أكثر سيولة" },
        { key: "horizon_mid",   label: "3 – 7 سنوات",        description: "مدة مناسبة لبناء محفظة متوازنة ومتنوعة" },
        { key: "horizon_long",  label: "أكثر من 7 سنوات",   description: "أفق يمنحني قدرة أعلى على تحمّل المخاطر" },
      ],
    },
    {
      question: "هل لديك مدخرات حالية تريد استثمارها؟",
      options: [
        { key: "savings_none", label: "لا، سأبدأ من الصفر",     description: "سأبني محفظتي تدريجياً من الاشتراك الشهري" },
        { key: "savings_low",  label: "أقل من 20,000 ريال",     description: "مبلغ تجريبي جيد لبدء رحلتي الاستثمارية" },
        { key: "savings_high", label: "أكثر من 20,000 ريال",    description: "مبلغ يُتيح الدخول في أدوات استثمارية متقدمة" },
      ],
    },
    {
      question: "كم تودّ أن تستثمر شهرياً؟",
      options: [
        { key: "amount_low",    label: "أقل من 500 ريال",    description: "مبلغ تجريبي لبدء رحلتك الاستثمارية بثقة" },
        { key: "amount_medium", label: "500 – 2,000 ريال",   description: "مستوى مناسب لبناء محفظة متنوعة بشكل جيد" },
        { key: "amount_high",   label: "أكثر من 2,000 ريال", description: "استثمار جاد يُعجّل في تحقيق أهدافي الثروية" },
      ],
    },
  ],

  // ── 5. Financing Advisor ───────────────────────────────────────────────────
  "financing-advisor": [
    {
      question: "ما الغرض من التمويل؟",
      options: [
        { key: "personal_needs", label: "احتياجات شخصية",        description: "مصاريف طارئة أو خطط حياتية عاجلة ومهمة" },
        { key: "home_reno",      label: "تجديد أو توسعة المنزل", description: "تحسينات وتجديدات عقارية تزيد قيمة المنزل" },
        { key: "education",      label: "تعليم أو تطوير ذاتي",  description: "رسوم دراسية أو شهادات مهنية وتطوير مهاري" },
        { key: "vehicle",        label: "شراء سيارة",             description: "تمويل مركبة جديدة أو مستعملة بأفضل شروط" },
      ],
    },
    {
      question: "ما نطاق دخلك الشهري؟",
      options: [
        { key: "income_low",   label: "أقل من 5,000 ريال",    description: "في بداية المسيرة المهنية — نصمّم لك خطة تناسب مرحلتك" },
        { key: "income_mid",   label: "5,000 – 15,000 ريال",  description: "المستوى الأكثر شيوعاً — خيارات واسعة ومتوافقة" },
        { key: "income_high",  label: "15,000 – 30,000 ريال", description: "دخل جيد يتيح بناء محفظة قوية ومتنوعة" },
        { key: "income_vhigh", label: "أكثر من 30,000 ريال",  description: "يُفتح لك المستوى المتقدم من منتجات الإنماء" },
      ],
    },
    {
      question: "ما إجمالي التزاماتك المالية الحالية؟",
      options: [
        { key: "oblig_none",   label: "لا توجد التزامات",    description: "بدون قروض أو أقساط شهرية حالياً — وضع مثالي" },
        { key: "oblig_light",  label: "أقل من 2,000 ريال",   description: "التزامات خفيفة تمنحك مرونة ائتمانية جيدة" },
        { key: "oblig_medium", label: "2,000 – 5,000 ريال",  description: "التزامات معتدلة ضمن نطاق الأهلية المقبولة" },
        { key: "oblig_heavy",  label: "أكثر من 5,000 ريال",  description: "التزامات مرتفعة — سنختار أفضل خيار يناسبك" },
      ],
    },
    {
      question: "ما وضعك الوظيفي؟",
      options: [
        { key: "employed",       label: "موظف حكومي أو خاص",      description: "راتب ثابت ومنتظم يمنحك أعلى قدرة ائتمانية" },
        { key: "self_employed",  label: "عمل حر أو مهني مستقل",   description: "دخل متغير مع إمكانية الحصول على تمويل مرن" },
        { key: "business_owner", label: "صاحب عمل أو شركة",       description: "حلول تمويلية خاصة بأصحاب الأعمال والمنشآت" },
        { key: "other",          label: "وضع آخر",                  description: "سنقيّم وضعك الفردي ونجد الخيار الأنسب لك" },
      ],
    },
    {
      question: "ما فترة السداد المفضلة لديك؟",
      options: [
        { key: "term_1",     label: "سنة واحدة",          description: "تسديد سريع بأقل كلفة إجمالية ممكنة" },
        { key: "term_3",     label: "3 سنوات",             description: "توازن جيد بين القسط الشهري والكلفة الكلية" },
        { key: "term_5plus", label: "5 سنوات أو أكثر",    description: "قسط شهري أخف يناسب ميزانيتي الشهرية" },
      ],
    },
    {
      question: "ما مستوى تقبّلك للمخاطرة المالية؟",
      options: [
        { key: "low",    label: "منخفض — أُفضّل الأمان",    description: "أختار خيارات التمويل الأكثر أماناً واستقراراً" },
        { key: "medium", label: "متوسط — توازن مدروس",      description: "أقبل شروطاً متوسطة مقابل مرونة أكبر" },
        { key: "high",   label: "مرتفع — أتطلع للأفضل",     description: "أتقبل شروطاً أكثر مرونة مقابل حصولي على مبلغ أكبر" },
      ],
    },
  ],
};

// ─── Profile Sidebar Schema ───────────────────────────────────────────────────
interface ProfileSchemaItem {
  label: string;
  questionStep: number;
  valueMap?: Record<string, string>;
}

const SERVICE_PROFILE_SCHEMAS: Record<string, ProfileSchemaItem[]> = {
  "health-report": [
    { label: "الهدف المالي",   questionStep: 1, valueMap: { wealth_growth: "بناء الثروة", retirement: "التقاعد", emergency_fund: "صندوق الطوارئ", home_purchase: "شراء منزل" } },
    { label: "نمط الإنفاق",   questionStep: 2, valueMap: SPEND_LABELS },
    { label: "الدخل الشهري",  questionStep: 3, valueMap: INCOME_LABELS },
  ],
  "smart-recommendation": [
    { label: "ما تبحث عنه",      questionStep: 1, valueMap: { investment: "استثمار", "credit-card": "بطاقة ائتمانية", financing: "تمويل", saving: "ادخار", banking: "خدمات مصرفية" } },
    { label: "الأولوية المالية", questionStep: 2, valueMap: { grow_wealth: "تنمية الثروة", reduce_debt: "تخفيض الديون", save_more: "الادخار", improve_credit: "السجل الائتماني" } },
    { label: "الدخل الشهري",     questionStep: 3, valueMap: INCOME_LABELS },
  ],
  "savings-planner": [
    { label: "هدف الادخار",      questionStep: 1, valueMap: { emergency_fund: "صندوق الطوارئ", big_purchase: "مشتريات كبيرة", retirement: "التقاعد", children_edu: "تعليم الأبناء" } },
    { label: "المبلغ المستهدف",  questionStep: 2, valueMap: { target_low: "أقل من 20,000 ريال", target_medium: "20–80 ألف ريال", target_high: "أكثر من 80,000 ريال" } },
    { label: "الدخل الشهري",     questionStep: 4, valueMap: INCOME_LABELS },
  ],
  "investment-advisor": [
    { label: "هدف الاستثمار",    questionStep: 1, valueMap: { growth: "نمو رأس المال", income: "دخل منتظم", preservation: "حفظ رأس المال" } },
    { label: "تفضيل المخاطرة",  questionStep: 2, valueMap: { low: "منخفض", medium: "متوسط", high: "مرتفع" } },
    { label: "الدخل الشهري",     questionStep: 3, valueMap: INCOME_LABELS },
  ],
  "financing-advisor": [
    { label: "غرض التمويل",    questionStep: 1, valueMap: { personal_needs: "احتياجات شخصية", home_reno: "تجديد المنزل", education: "تعليم", vehicle: "شراء سيارة" } },
    { label: "الدخل الشهري",   questionStep: 2, valueMap: INCOME_LABELS },
    { label: "الالتزامات",     questionStep: 3, valueMap: OBLIG_LABELS },
  ],
};

function buildProfileForService(session: Session) {
  const service = session.service || "smart-recommendation";
  const schema  = SERVICE_PROFILE_SCHEMAS[service] ?? SERVICE_PROFILE_SCHEMAS["smart-recommendation"];

  const items = schema.map(({ label, questionStep, valueMap }) => {
    const answer = session.answers[questionStep];
    const value  = answer
      ? (valueMap ? (valueMap[answer] ?? answer) : answer)
      : "قيد التحديد";
    return { label, value, resolved: !!answer };
  });

  items.push({ label: "التوصية", value: "قيد الإعداد", resolved: false });
  return items;
}

// ─── Report input helpers ─────────────────────────────────────────────────────
function getReportInputs(session: Session) {
  const service = session.service || "smart-recommendation";
  switch (service) {
    case "health-report":
      return { goal: "saving",      income: session.answers[3], spend: session.answers[2] };
    case "smart-recommendation":
      return { goal: session.answers[1] || "investment", income: session.answers[3], spend: undefined };
    case "savings-planner":
      return { goal: "saving",      income: session.answers[4], spend: session.answers[6] };
    case "investment-advisor":
      return { goal: "investment",  income: session.answers[3], spend: undefined };
    case "financing-advisor":
      return { goal: "financing",   income: session.answers[2], spend: undefined };
    default:
      return { goal: session.answers[1] || "investment", income: session.answers[2], spend: session.answers[3] };
  }
}

function getRecId(session: Session): string {
  const service = session.service || "smart-recommendation";
  if (service === "smart-recommendation") {
    return session.answers[1] === "credit-card" ? "rec-002" : "rec-001";
  }
  return "rec-001";
}

// ─── Report Generator ─────────────────────────────────────────────────────────
function generateReport(session: Session) {
  const { goal, income, spend } = getReportInputs(session);

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
      selectionReason: `اختار نماء AI هذا المنتج تحديداً لأن ملفك يجمع بين دخل (${incomeLabel}) وإنفاق منضبط (${spendLabel})، ما يُتيح لك هامشاً شهرياً كافياً للاستثمار المنتظم. الصندوق المقترح يتوافق مع شهيتك للمخاطرة ويُقدّم عائداً سنوياً أعلى من بدائله بنسبة تصل إلى 2.3%.`,
      financialImpact: [
        { label: "العائد الاستثماري السنوي المتوقع", value: "+4,200 ريال", description: "بناءً على متوسط أداء الصندوق خلال 3 سنوات" },
        { label: "نمو قيمة المحفظة المتوقع",          value: "+18%",        description: "خلال 5 سنوات بافتراض أداء معتدل للسوق" },
        { label: "وفورات رسوم الإدارة",               value: "340 ريال",   description: "مقارنةً بالصناديق المنافسة بنفس مستوى العائد" },
      ],
      improvementOpportunities: [
        { title: "فعّل الاستثمار الشهري التلقائي",   description: "خصص 10% من دخلك للاستثمار التلقائي — الانضباط يصنع الثروة." },
        { title: "أعِد توجيه السيولة المعطّلة",      description: "15,200 ريال موقوفة في حساب جارٍ يمكن تحويلها لصندوق بعائد يومي." },
        { title: "راجع توزيع محفظتك كل 6 أشهر",     description: "إعادة التوازن الدورية ترفع العائد السنوي بمتوسط 0.8% بدون مخاطر إضافية." },
      ],
      insights: [
        { type: "strength",    title: "نسبة ادخار ممتازة",  text: "نسبة ادخارك 23% تفوق المتوسط الإقليمي بـ 8 نقاط — هذا يمنحك قدرة استثمارية حقيقية." },
        { type: "gap",         title: "سيولة معطّلة",        text: "رصدنا 15,200 ريال في حسابات جارية لا تعطيك أي عائد — يمكن تشغيلها فوراً." },
        { type: "opportunity", title: "فرصة تحسين العائد",  text: "بإعادة توزيع المحفظة يمكن رفع العائد السنوي بمقدار 2.3% دون زيادة في المخاطرة." },
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
      selectionReason: `بناءً على إنفاقك (${spendLabel}) ودخلك (${incomeLabel})، فحص محرك التوصية 47 بطاقة ائتمانية وخلص إلى أن الإنماء الماسية بلاس تُقدّم أعلى معدل استرداد على إنفاق السفر والمطاعم — وهما الفئتان الأعلى في سلوكك الإنفاقي.`,
      financialImpact: [
        { label: "توفير الكاش باك السنوي المتوقع", value: "+850 ريال",   description: "بناءً على نمط إنفاقك على السفر والمطاعم" },
        { label: "قيمة نقاط المكافآت سنوياً",      value: "1,200 ريال", description: "قابلة للاسترداد عبر تطبيق الإنماء مباشرةً" },
        { label: "توفير على رسوم التحويل الدولي",   value: "320 ريال",   description: "بطاقات بلا رسوم تحويل للعملات الأجنبية" },
      ],
      improvementOpportunities: [
        { title: "وحّد إنفاقك في بطاقة واحدة",        description: "تفرقة الإنفاق على بطاقات متعددة يُقلّل من نقاط المكافآت التي تجمعها." },
        { title: "فعّل تنبيهات الإنفاق الذكية",       description: "تتبع كل معاملة لحظياً يمنعك من تجاوز الحد ويحمي سجلك الائتماني." },
        { title: "استبدل النقاط قبل انتهاء صلاحيتها", description: "كثير من العملاء يخسرون 15-20% من نقاطهم السنوية بسبب انتهاء الصلاحية." },
      ],
      insights: [
        { type: "strength",    title: "سجل ائتماني ممتاز",   text: "تاريخك الائتماني النظيف يؤهلك لأفضل العروض بأعلى حد ائتماني." },
        { type: "gap",         title: "استرداد منخفض جداً",   text: "بطاقتك الحالية تمنحك 1% استرداداً — أي 5× أقل مما يجب أن تحصل عليه." },
        { type: "opportunity", title: "توفير سنوي فوري",      text: "بناءً على إنفاقك هذه البطاقة ستوفّر لك أكثر من 850 ريالاً سنوياً." },
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
      selectionReason: `ملفك المالي (دخل ${incomeLabel}، إنفاق ${spendLabel}) يجعلك مؤهلاً لعروض التمويل التفضيلية التي تُقدّم معدلاً أقل بـ 1.2% من المتوسط السوقي. هذا يعني قسطاً شهرياً أخف وتوفيراً فعلياً يتراكم كل شهر.`,
      financialImpact: [
        { label: "التوفير السنوي على الأقساط", value: "+1,800 ريال", description: "بإعادة هيكلة التمويل بمعدل فائدة أقل" },
        { label: "تخفيض القسط الشهري",          value: "150 ريال",   description: "قسط شهري أخف يمنحك مرونة مالية أكبر" },
        { label: "مدة سداد أقصر",               value: "8 أشهر",    description: "بنفس القسط الحالي يمكنك الانتهاء مبكراً" },
      ],
      improvementOpportunities: [
        { title: "أعِد تمويلك بمعدل فائدة أقل",     description: "الفرق 1.2% يبدو صغيراً لكنه يوفر آلاف الريالات على مدة التمويل." },
        { title: "حافظ على نسبة دين لدخل دون 30%",  description: "هذه النسبة تبقيك في المنطقة الخضراء وتُتيح تمويلاً مستقبلياً أسهل." },
        { title: "دمّج التزاماتك في تمويل واحد",     description: "التزام واحد بمعدل موحّد أفضل من عدة التزامات بمعدلات مختلفة." },
      ],
      insights: [
        { type: "strength",    title: "نسبة ديون صحية",        text: "نسبة الدين للدخل لديك أقل من 30% — هذا يمنحك قوة تفاوضية مميزة." },
        { type: "gap",         title: "معدل فائدة فوق السوق",  text: "معدل الفائدة الذي تدفعه حالياً أعلى من متوسط السوق بنسبة 1.2%." },
        { type: "opportunity", title: "توفير على الأقساط",      text: "إعادة الهيكلة ستوفر 1,800 ريالاً سنوياً مع قسط شهري أخف." },
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
      selectionReason: `نماء AI اختار حساب الادخار المنتظم لأن ملفك (دخل ${incomeLabel}، إنفاق ${spendLabel}) يُظهر هامشاً شهرياً صافياً كافياً لبناء ادخار منتظم. الحساب يُوفّر عائداً يومياً مُتراكماً دون قيود على السحب.`,
      financialImpact: [
        { label: "العائد السنوي على المدخرات",   value: "+2,400 ريال", description: "بافتراض إيداع شهري منتظم وعائد حالي للحساب" },
        { label: "مضاعفة المدخرات في 5 سنوات",  value: "×1.4",        description: "بفضل الفائدة المُركّبة والإيداع المنتظم" },
        { label: "توفير على رسوم الإدارة",       value: "0 ريال",      description: "حساب الادخار بدون رسوم إدارة شهرية" },
      ],
      improvementOpportunities: [
        { title: "أتمت الادخار بتحويل شهري ثابت",    description: "الادخار التلقائي يُزيل العائق النفسي ويضمن الانتظام بدون قرار شهري." },
        { title: "ضع هدفاً مالياً واضحاً للادخار",   description: "الادخار نحو هدف محدد يُسرّع وتيرته بمتوسط 35% مقارنةً بالادخار العشوائي." },
        { title: "راجع معدل الادخار مع كل زيادة دخل", description: "رفع نسبة الادخار 5% فقط عند كل زيادة راتب يُضاعف الثروة المتراكمة." },
      ],
      insights: [
        { type: "strength",    title: "عادة ادخار منتظمة",  text: "انتظامك في الادخار هو أكثر ما يميزك مالياً — هذا أهم من المبلغ نفسه." },
        { type: "gap",         title: "مدخرات بلا عائد",    text: "مدخراتك في حساب جارٍ لا يُنتج أي فائدة — أموالك لا تعمل لصالحك." },
        { type: "opportunity", title: "عائد سنوي مضمون",   text: "بنقل المدخرات لحساب ادخار مناسب ستكسب 2,400 ريالاً إضافياً سنوياً." },
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
      selectionReason: `الباقة المتكاملة تناسب ملفك (دخل ${incomeLabel}، إنفاق ${spendLabel}) لأنها تُقدّم تحويلات مجانية غير محدودة، وإعفاء من رسوم الاستفسار، ومكافآت على الإنفاق اليومي.`,
      financialImpact: [
        { label: "وفورات الرسوم السنوية",         value: "+960 ريال",   description: "إعفاء من رسوم التحويلات والخدمات المتكررة" },
        { label: "قيمة المزايا الإضافية للباقة",  value: "1,440 ريال", description: "تأمين سفر، كاش باك، خدمات VIP" },
        { label: "توفير وقت المعاملات",            value: "4 ساعات",    description: "خدمات رقمية متكاملة تُلغي الحاجة للفروع" },
      ],
      improvementOpportunities: [
        { title: "فعّل كل مزايا الباقة الجديدة",     description: "60% من عملاء الباقات المتكاملة لا يُفعّلون أكثر من نصف مزاياها." },
        { title: "حوّل راتبك لحساب الإنماء الرئيسي", description: "تحويل الراتب يُطلق مزايا إضافية ويرفع حدود بعض الخدمات تلقائياً." },
        { title: "استخدم التطبيق بدل الفروع دائماً", description: "90% من المعاملات اليومية أسرع وأوفر عبر التطبيق." },
      ],
      insights: [
        { type: "strength",    title: "نشاط رقمي مرتفع",          text: "تفاعلك الرقمي العالي يجعلك من أفضل المرشحين للاستفادة من الباقات الذكية." },
        { type: "gap",         title: "60% من المزايا غير مُستخدمة", text: "أنت لا تستفيد من أكثر من نصف المزايا المتاحة لك في حسابك الحالي." },
        { type: "opportunity", title: "توفير على الرسوم",          text: "بتفعيل الباقة المناسبة ستوفر 960 ريالاً سنوياً على رسوم الخدمات." },
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
      { step: 1, label: "اطّلع على التوصية المخصصة",        description: "راجع التوصية الكاملة مع أسباب الاختيار ومزاياها المالية الدقيقة." },
      { step: 2, label: "تحدث مع مستشار الإنماء (اختياري)", description: "احجز جلسة مجانية لمناقشة الخطوات العملية وتفاصيل التنفيذ." },
      { step: 3, label: "ابدأ خطوتك الأولى",                 description: "التفعيل يستغرق أقل من 5 دقائق عبر تطبيق الإنماء مباشرةً." },
    ],
  };
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /ai-agent/flow?service=<type>&sessionId=<id>
// Initialises (or resets) a session and returns the first contextual question.
router.get("/ai-agent/flow", (req, res) => {
  const service   = ((req.query.service  as string) || "smart-recommendation").trim();
  const sid       = ((req.query.sessionId as string) || "default").trim();
  const flow      = SERVICE_FLOWS[service] ?? SERVICE_FLOWS["smart-recommendation"];
  const session   = getSession(sid);

  // (Re-)attach the service so subsequent POST calls can route correctly
  session.service = service;

  const firstStep = flow[0];
  res.json({
    stepNumber:   1,
    totalSteps:   flow.length,
    question:     firstStep.question,
    options:      firstStep.options,
    profileSoFar: buildProfileForService(session),
  });
});

// POST /ai-agent/answer  {stepNumber, selectedKey, sessionId}
router.post("/ai-agent/answer", (req, res) => {
  const { stepNumber, selectedKey, sessionId } = req.body as {
    stepNumber: number;
    selectedKey: string;
    sessionId?: string;
  };

  const sid     = sessionId || "default";
  const session = getSession(sid);

  // Persist this answer
  session.answers[stepNumber] = selectedKey;

  const service  = session.service || "smart-recommendation";
  const flow     = SERVICE_FLOWS[service] ?? SERVICE_FLOWS["smart-recommendation"];
  const nextStep = stepNumber + 1;

  // All steps answered → done
  if (nextStep > flow.length) {
    return res.json({ done: true, recommendationId: getRecId(session), nextQuestion: null });
  }

  // Return next question with live profile sidebar
  const nextFlowStep = flow[nextStep - 1]; // array is 0-indexed, steps are 1-indexed
  return res.json({
    done: false,
    recommendationId: null,
    nextQuestion: {
      stepNumber:   nextStep,
      totalSteps:   flow.length,
      question:     nextFlowStep.question,
      options:      nextFlowStep.options,
      profileSoFar: buildProfileForService(session),
    },
  });
});

// GET /ai-agent/report?sessionId=<id>
router.get("/ai-agent/report", (req, res) => {
  const sid     = (req.query.sessionId as string) || "default";
  const session = sessions.get(sid) ?? { answers: {}, service: "smart-recommendation" };
  res.json(generateReport(session));
});

// ═════════════════════════════════════════════════════════════════════════════
// SECURE AI ARCHITECTURE — 3-LAYER MODEL
// ─────────────────────────────────────────────────────────────────────────────
// Layer 1: Bank Analysis Engine — owns raw data (salary, IBAN, transactions,
//          account numbers, identity). NEVER leaves this secure environment.
//
// Layer 2: Financial Insight Object — computed summary only. No raw values.
//          This is ALL the AI ever receives.
//
// Layer 3: Namaa AI — receives Layer 2 object only, answers from insights.
// ═════════════════════════════════════════════════════════════════════════════

interface FinancialInsight {
  monthlySurplus: number;
  financialHealth: string;
  savingsScore: number;
  investmentReadiness: string;
  financingEligibility: string;
  recommendedProduct: string;
  confidence: number;
  recommendationReason: string;
  analysisWindowDays: number;
  annualReturnPct: number;
  projectedAnnualGainSAR: number;
}

// Layer 2 object — the only data the AI touches
const FINANCIAL_INSIGHT: FinancialInsight = {
  monthlySurplus:         420,
  financialHealth:        "جيد",
  savingsScore:           82,
  investmentReadiness:    "متوسطة",
  financingEligibility:   "مرتفعة",
  recommendedProduct:     "خطة الادخار الذكية",
  confidence:             94,
  recommendationReason:   "دخل ثابت مع فائض شهري متكرر",
  analysisWindowDays:     90,
  annualReturnPct:        3.7,
  projectedAnnualGainSAR: 187,
};

// ─── Review Chat Session Store ─────────────────────────────────────────────────
interface ReviewChatSession {
  history: { role: "user" | "ai"; text: string }[];
  topicDepth: Record<string, number>;  // how many times each topic was addressed
  lastTopic:  string;                  // most recent substantive topic
}

const reviewChatSessions = new Map<string, ReviewChatSession>();

function getReviewSession(id: string): ReviewChatSession {
  if (!reviewChatSessions.has(id)) {
    reviewChatSessions.set(id, { history: [], topicDepth: {}, lastTopic: "none" });
  }
  return reviewChatSessions.get(id)!;
}

// ─── Intent Detection ──────────────────────────────────────────────────────────
function detectIntent(msg: string): string {
  const m = msg.trim();
  const lo = m.toLowerCase();

  // Specific amount detection — must run before generic WHAT_IF
  if (/\d/.test(m) && (m.includes("ريال") || m.includes("ر.س") || lo.includes("ادخرت") || lo.includes("وفرت") || lo.includes("حولت"))) return "WHAT_IF_AMOUNT";
  if (lo.includes("لو ادخرت") || lo.includes("ماذا لو") || lo.includes("لو وفرت") || lo.includes("لو حولت") || lo.includes("ماذا يحدث لو")) return "WHAT_IF";

  // Why recommended
  if (lo.includes("لماذا") || lo.includes("ليش") || lo.includes("سبب") || lo.includes("لماذا رشحت") || lo.includes("لماذا اخترت") || lo.includes("لماذا هذا")) return "WHY";

  // How calculated
  if (lo.includes("كيف حسبت") || lo.includes("كيف احتسب") || lo.includes("الحساب") || lo.includes("كيف عرفت") || lo.includes("الطريقة") || lo.includes("منهجية") || lo.includes("كيف حسب") || lo.includes("حسبت ذلك") || lo.includes("كيف جاء")) return "HOW_CALCULATED";

  // Better option
  if ((lo.includes("يوجد") || lo.includes("في") || lo.includes("هل")) && lo.includes("أفضل")) return "BETTER_OPTION";
  if (lo.includes("بديل") || lo.includes("خيار آخر") || lo.includes("منتج آخر")) return "BETTER_OPTION";

  // Affirmation — continue last topic deeper
  if (m === "نعم" || m === "صح" || m === "تمام" || m === "أيوه" || m === "أكمل" || m === "كمّل" || m === "أكيد" || lo.includes("موافق") || lo.includes("طبعا") || lo.includes("طبعاً") || lo.includes("استمر")) return "AFFIRM";

  // Explain more / don't understand — both continue last topic
  if (lo.includes("اشرح") || (lo.includes("أكثر") && lo.length < 20) || lo.includes("توضيح") || lo.includes("وضح") || lo.includes("تفصيل") || lo.includes("مزيد")) return "MORE";
  if (lo.includes("لم أفهم") || lo.includes("ما فهمت") || lo.includes("غير واضح") || lo.includes("ما واضح") || lo.includes("مو واضح") || lo.includes("لا أفهم")) return "DONT_UNDERSTAND";

  // Example
  if (lo.includes("مثال") || lo.includes("مثلاً") || lo.includes("مثلا") || lo.includes("أعطني مثال")) return "EXAMPLE";

  // How long / timeline
  if (lo.includes("كم وقت") || lo.includes("متى") || lo.includes("كم شهر") || lo.includes("كم سنة") || lo.includes("المدة") || lo.includes("الوقت")) return "HOW_LONG";

  // Risk / safety
  if (lo.includes("مخاطر") || lo.includes("مخاطرة") || lo.includes("آمن") || lo.includes("ضمان") || lo.includes("مضمون") || lo.includes("خسارة")) return "RISK";

  // Comparison
  if (lo.includes("مقارنة") || lo.includes("قارن") || lo.includes("الفرق") || lo.includes("مقابل") || lo.includes("مقارنةً")) return "COMPARE";

  // Next steps
  if (lo.includes("ماذا أفعل") || lo.includes("الخطوات") || lo.includes("كيف أبدأ") || lo.includes("كيف أفعّل") || lo.includes("كيف أنضم")) return "NEXT_STEPS";

  return "GENERAL";
}

// ─── Amount Parser ─────────────────────────────────────────────────────────────
function parseAmount(msg: string): number | null {
  const match = msg.match(/(\d[\d,،\.]*)/);
  if (!match) return null;
  const num = parseInt(match[1].replace(/[,،\.]/g, ""), 10);
  return isNaN(num) || num > 1_000_000 ? null : num;
}

// ─── Context-Aware Response Generator ─────────────────────────────────────────
function generateReply(
  intent: string,
  session: ReviewChatSession,
  userMsg: string,
): string {
  const ins = FINANCIAL_INSIGHT;

  // Continuation intents → go deeper into the last topic without repeating
  if (intent === "AFFIRM" || intent === "MORE" || intent === "DONT_UNDERSTAND") {
    const continueTopic = session.lastTopic && session.lastTopic !== "none"
      ? session.lastTopic
      : "WHY";
    const continueDepth = session.topicDepth[continueTopic] ?? 0;
    const reply = buildReply(continueTopic, continueDepth, userMsg, ins, session);
    session.topicDepth[continueTopic] = continueDepth + 1;
    session.lastTopic = continueTopic;
    return reply;
  }

  const depth = session.topicDepth[intent] ?? 0;
  const reply = buildReply(intent, depth, userMsg, ins, session);
  session.topicDepth[intent] = depth + 1;
  session.lastTopic = intent;
  return reply;
}

function buildReply(
  topic: string,
  depth: number,
  userMsg: string,
  ins: FinancialInsight,
  session: ReviewChatSession,
): string {
  const { monthlySurplus, savingsScore, confidence, annualReturnPct,
          projectedAnnualGainSAR, analysisWindowDays,
          recommendedProduct, investmentReadiness } = ins;

  switch (topic) {

    // ── WHY recommended ────────────────────────────────────────────────────
    case "WHY": {
      const angles = [
        `رصد نماء فائضاً شهرياً ثابتاً قدره ${monthlySurplus} ريال على مدى ${analysisWindowDays} يوماً — مبلغ يتراكم دون أن يُنتج أي عائد.\n\n${recommendedProduct} تُحوّل هذا الفائض تلقائياً بعائد ${annualReturnPct}% سنوياً — الأعلى في فئة المنتجات المضمونة تماماً.`,

        `درجة صحتك المالية ${savingsScore}/100 تؤكد أن دخلك مستقر وإنفاقك منتظم. هذا بالضبط ما يجعل خطة الادخار أكثر فاعلية لك.\n\nالجاهزية الاستثمارية "${investmentReadiness}" تعني أن المنتجات الاستثمارية الأكثر مخاطرة لا تُناسب مرحلتك الآن — الادخار المضمون هو الخطوة الصحيحة التي تبني عليها لاحقاً.`,

        `قبل اختيار ${recommendedProduct}، قارن نماء 6 منتجات في نفس الفئة. التطابق ${confidence}% كان الأعلى بفارق واضح عن المنتج الثاني (76%).\n\nالميزة الحاسمة: عائد يومي مُتراكم + سحب مجاني في أي وقت + بدون حد أدنى للرصيد. لا يوجد منتج آخر يجمع الثلاثة معاً في نفس مستوى الأمان.`,

        `لو انتظرت سنة كاملة بدون تفعيل، خسرت ${projectedAnnualGainSAR} ريالاً على الأقل من عائد ضائع.\n\nالفائدة المركّبة تعمل بشكل أفضل كلما بدأت مبكراً — كل شهر تأخير يُكلّفك ما يقارب ${Math.round(projectedAnnualGainSAR / 12)} ريالاً لا تعود إليك.`,
      ];
      return angles[Math.min(depth, angles.length - 1)];
    }

    // ── HOW calculated ────────────────────────────────────────────────────
    case "HOW_CALCULATED": {
      const angles = [
        `التحليل يعمل على مدى ${analysisWindowDays} يوماً ويقيس الفرق بين التدفق الداخل والصادر من الحساب.\n\nالنتيجة: ${monthlySurplus} ريالاً تبقى غير مُستخدمة في المتوسط نهاية كل شهر. الرقم تكرّر بانتظام على مدى ثلاثة أشهر متتالية — وهذا ما يجعله أساساً موثوقاً للتوصية.`,

        `درجة التطابق ${confidence}% محسوبة من 12 معياراً:\n• استقرار الدخل ✓\n• انتظام الفائض الشهري ✓\n• درجة الصحة المالية ${savingsScore}/100 ✓\n• مستوى الالتزامات الحالية ✓\n• الجاهزية الاستثمارية (${investmentReadiness}) ✓\n\nالمنتج حقق 11 من 12 معياراً — المعيار الجزئي الوحيد هو الأفق الزمني طويل المدى.`,

        `درجة الصحة المالية ${savingsScore}/100 جاءت من ثلاثة محاور مرجّحة:\n• استقرار الدخل: 30% من الدرجة\n• انضباط الإنفاق: 35% — أقوى جانب في ملفك\n• الجاهزية الاستثمارية: 35%\n\nمجموع هذه المحاور أعطى ${savingsScore} — مستوى "جيد" يفتح منتجات الادخار المضمونة بشروط مميزة.`,

        `الـ ${monthlySurplus} ريال ليست رقماً ثابتاً — نماء يحسبها كمتوسط متحرك لثلاثة أشهر.\n\nمثال على الأشهر الثلاثة: شهر بـ 380 ريال، وآخر بـ 450، وثالث بـ 430. المتوسط ${monthlySurplus} ريال. هذا الأسلوب يحمي التوصية من التأثر بشهر غير اعتيادي كشهر إجازة أو نفقة طارئة.`,
      ];
      return angles[Math.min(depth, angles.length - 1)];
    }

    // ── WHAT IF (with amount) ─────────────────────────────────────────────
    case "WHAT_IF_AMOUNT":
    case "WHAT_IF": {
      const amount = topic === "WHAT_IF_AMOUNT" ? parseAmount(userMsg) : null;

      // Monthly-contribution compound interest: FV = PMT * ((1+r)^n − 1) / r
      const monthlyRate = annualReturnPct / 100 / 12;
      function fvMonthly(pmt: number, n: number) {
        return Math.round(pmt * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate));
      }

      if (!amount) {
        const fv12_420  = fvMonthly(monthlySurplus, 12);
        const int12_420 = fv12_420 - monthlySurplus * 12;
        const fv12_1000 = fvMonthly(1000, 12);
        const int12_1k  = fv12_1000 - 1000 * 12;
        return `بالفائض الحالي ${monthlySurplus} ريالاً شهرياً:\n• بعد 12 شهراً: ${fv12_420.toLocaleString("ar-SA")} ريال (${(monthlySurplus * 12).toLocaleString("ar-SA")} ادخار + ${int12_420} عائد)\n• بعد 5 سنوات: ~${fvMonthly(monthlySurplus, 60).toLocaleString("ar-SA")} ريال مع الفائدة المركّبة\n\nمثلاً: 1,000 ريال/شهر يُعطي عائداً سنوياً يقارب ${int12_1k} ريالاً وإجمالي ${fv12_1000.toLocaleString("ar-SA")} ريال بعد سنة.`;
      }

      const fv12      = fvMonthly(amount, 12);
      const annualReturn  = fv12 - amount * 12;
      const after12m  = fv12;
      const after5yr  = fvMonthly(amount, 60);
      const vsNow         = amount > monthlySurplus
        ? `هذا ${amount - monthlySurplus} ريالاً فوق فائضك الحالي — يمكن تحقيقه بمراجعة بعض بنود الإنفاق غير الأساسي.`
        : `هذا أقل من فائضك الحالي ${monthlySurplus} ريالاً — الفائض موجود بالفعل ويمكن توجيهه مباشرةً.`;

      return `لو ادخرت ${amount.toLocaleString("ar-SA")} ريالاً شهرياً بعائد ${annualReturnPct}%:\n• العائد السنوي: ~${annualReturn.toLocaleString("ar-SA")} ريال\n• بعد 12 شهراً: ${after12m.toLocaleString("ar-SA")} ريال\n• بعد 5 سنوات (فائدة مركّبة): ~${after5yr.toLocaleString("ar-SA")} ريال\n\n${vsNow}`;
    }

    // ── BETTER OPTION ──────────────────────────────────────────────────────
    case "BETTER_OPTION": {
      const angles = [
        `بملفك الحالي — صحة مالية ${savingsScore}/100 وجاهزية استثمارية ${investmentReadiness} — ${recommendedProduct} هي الأنسب الآن.\n\nالبديل الوحيد المعقول إذا قبلت مخاطرة أعلى هو صناديق الاستثمار، لكنها تحتاج أفقاً زمنياً أطول وتقبّلاً للتذبذب.`,

        `صناديق الاستثمار يمكن أن تُعطي 6-12% سنوياً — لكنها تتذبذب مع السوق ولا تضمن الأصل.\n\nالاستراتيجية التي يتبعها كثير من العملاء في ملفك: ابدأ بالادخار المضمون لبناء وسادة مالية خلال 6-12 شهراً، ثم خصص جزءاً للاستثمار. الأمان أولاً، النمو لاحقاً.`,

        `الخيار الأمثل للملفات المشابهة لك:\n• 70% في ${recommendedProduct} — مضمون، عائد ${annualReturnPct}%\n• 30% في صندوق نمو معتدل — 6-8% متوقع مع تذبذب مقبول\n\nهذا المزج يمنحك استقراراً مع فرصة نمو أعلى. هل تريد حساب العائد المجمّع لهذا التوزيع؟`,
      ];
      return angles[Math.min(depth, angles.length - 1)];
    }

    // ── EXAMPLE ───────────────────────────────────────────────────────────
    case "EXAMPLE": {
      if (depth === 0) {
        const yr1 = monthlySurplus * 12 + projectedAnnualGainSAR;
        const yr5 = Math.round(monthlySurplus * 60 * 1.19);
        return `مثال عملي — ادخار ${monthlySurplus} ريالاً كل شهر بعائد ${annualReturnPct}%:\n\nبعد 12 شهراً:\nالادخار: ${(monthlySurplus * 12).toLocaleString("ar-SA")} ريال + العائد: ${projectedAnnualGainSAR} ريال = ${yr1.toLocaleString("ar-SA")} ريال\n\nبعد 5 سنوات:\n~${yr5.toLocaleString("ar-SA")} ريال (مع الفائدة المركّبة)\n\nفي الحساب الجاري العادي: ${(monthlySurplus * 60).toLocaleString("ar-SA")} ريال بلا عائد.\nالفرق: ~${(yr5 - monthlySurplus * 60).toLocaleString("ar-SA")} ريال — لمجرد تحويل تلقائي شهري.`;
      }
      return `مثال مقارنة بين مسارين:\n\nمسار أ — لا تفعل شيئاً:\nالفائض ${monthlySurplus} ريال/شهر يبقى في الجاري → بعد 5 سنوات: ${(monthlySurplus * 60).toLocaleString("ar-SA")} ريال فقط\n\nمسار ب — تُفعّل ${recommendedProduct}:\nنفس المبلغ بعائد ${annualReturnPct}% → بعد 5 سنوات: ~${Math.round(monthlySurplus * 60 * 1.19).toLocaleString("ar-SA")} ريال\n\nالقرار لا يكلّفك شيئاً إضافياً — فقط توجيه ما هو موجود بالفعل.`;
    }

    // ── HOW LONG ──────────────────────────────────────────────────────────
    case "HOW_LONG": {
      return `${recommendedProduct} ليس لها مدة إلزامية — أموالك متاحة للسحب في أي وقت دون غرامات.\n\nلكن للاستفادة الكاملة من الفائدة المركّبة:\n• 3 أشهر: تبدأ ترى الفرق الفعلي عن الحساب الجاري\n• 12 شهراً: عائد ${projectedAnnualGainSAR} ريالاً مُتراكماً\n• 5 سنوات: الفائدة المركّبة تصبح ملموسة جداً\n\nكلما استمررت أطول، كلما تضاعف الأثر.`;
    }

    // ── RISK ──────────────────────────────────────────────────────────────
    case "RISK": {
      return `${recommendedProduct} منتج مضمون بالكامل:\n• العائد ${annualReturnPct}% سنوياً ثابت ومحدد مسبقاً\n• لا يتأثر بتذبذبات الأسواق المالية\n• أصلك محفوظ بالكامل في أي وقت\n• سحب مجاني دون غرامات أو شروط\n\nالمخاطرة الوحيدة النظرية هي تغيير السياسة النقدية مستقبلاً — وهو أمر نادر، تُعلمك به الخطة مسبقاً.`;
    }

    // ── COMPARE ───────────────────────────────────────────────────────────
    case "COMPARE": {
      return `مقارنة الخيارات المتاحة:\n\n• حساب جارٍ عادي: 0% عائد\n• ${recommendedProduct}: ${annualReturnPct}% سنوياً ✓ مضمون\n• حسابات ادخار منافسة: 2.8–3.2% (أقل بـ 0.5–0.9%)\n• صناديق استثمار: 6–12% لكن مع مخاطرة على الأصل\n\nبملفك (صحة مالية ${savingsScore}، جاهزية ${investmentReadiness})، الادخار المضمون هو الأساس الصحيح. الاستثمار خطوة لاحقة بعد بناء الوسادة.`;
    }

    // ── NEXT STEPS ────────────────────────────────────────────────────────
    case "NEXT_STEPS": {
      return `خطواتك العملية:\n\n1. افتح تطبيق الإنماء → قسم "الادخار"\n2. حدد مبلغ التحويل الشهري (${monthlySurplus} ريال كحد أدنى موصى به)\n3. فعّل التحويل التلقائي في أول كل شهر\n4. راجع رصيدك وعائدك كل 3 أشهر\n\nالإعداد كله يأخذ أقل من 5 دقائق. العائد يبدأ من اليوم الأول للتفعيل.`;
    }

    // ── GENERAL (fallback) ────────────────────────────────────────────────
    default: {
      const covered = Object.keys(session.topicDepth);
      if (!covered.includes("WHY")) {
        session.topicDepth["WHY"] = 1;
        session.lastTopic = "WHY";
        return `الفائض الشهري البالغ ${monthlySurplus} ريالاً هو قلب هذه التوصية. نماء رصده على مدى ${analysisWindowDays} يوماً ووجد أنه متكرر وثابت — وهذا بالضبط ما يجعل ${recommendedProduct} الخيار الأمثل لتحويله من أموال نائمة إلى عائد فعلي بنسبة ${annualReturnPct}% سنوياً.`;
      }
      if (!covered.includes("HOW_CALCULATED")) {
        session.topicDepth["HOW_CALCULATED"] = 1;
        session.lastTopic = "HOW_CALCULATED";
        return `درجة التطابق ${confidence}% جاءت من تحليل 12 معياراً مالياً في ملفك. درجة الصحة المالية ${savingsScore}/100 كانت من أبرز العوامل — تعني أن دخلك مستقر وإنفاقك متوازن، وهذا يجعلك من أكثر الملفات ملاءمةً لهذا المنتج تحديداً.`;
      }
      return `أي جانب يستحق مزيداً من التوضيح؟ يمكنني شرح طريقة الحساب، مقارنة البدائل، أو حساب العائد لمبلغ ادخار محدد تختاره أنت.`;
    }
  }
}

// POST /ai-agent/review-chat  { sessionId, message }
// Layer 3: Namaa AI receives ONLY the Financial Insight Object. No raw banking data.
router.post("/ai-agent/review-chat", (req, res) => {
  const { sessionId, message } = req.body as { sessionId: string; message: string };

  if (!message?.trim()) {
    return res.status(400).json({ error: "message required" });
  }

  const sid     = (sessionId || "default").trim();
  const session = getReviewSession(sid);

  session.history.push({ role: "user", text: message });

  const intent = detectIntent(message);
  const reply  = generateReply(intent, session, message);

  session.history.push({ role: "ai", text: reply });

  return res.json({ reply });
});

export default router;
