import { Router } from "express";

const router = Router();

const questions: Record<number, object> = {
  1: {
    stepNumber: 1,
    totalSteps: 5,
    question: "ماذا تريد أن تحقق اليوم؟",
    options: [
      { key: "credit-card", label: "أفضل بطاقة ائتمانية", description: "اعثر على البطاقة التي تناسب إنفاقك وتمنحك أعلى مزايا" },
      { key: "financing", label: "تمويل شخصي", description: "احصل على تمويل بأفضل شروط تناسب دخلك والتزاماتك" },
      { key: "investment", label: "الاستثمار", description: "نمّ ثروتك بخيارات استثمارية متوافقة مع أهدافك" },
      { key: "saving", label: "الادخار", description: "ضاعف مدخراتك بخطط مدروسة ومنتجات عالية العائد" },
      { key: "banking", label: "خدمات مصرفية", description: "اكتشف خدمات الأهلي التي تناسب احتياجاتك اليومية" },
    ],
    profileSoFar: [
      { label: "الهدف", value: "قيد التحديد", resolved: false },
      { label: "المخاطرة", value: "قيد التحليل", resolved: false },
      { label: "المدة الزمنية", value: "قيد التحليل", resolved: false },
    ],
  },
  2: {
    stepNumber: 2,
    totalSteps: 5,
    question: "ما هدفك من الاستثمار؟",
    options: [
      { key: "growth", label: "نمو رأس المال", description: "تعظيم قيمة محفظتك على المدى البعيد مع قبول تذبذب معقول" },
      { key: "income", label: "دخل منتظم", description: "الحصول على توزيعات دورية ثابتة تدعم تدفقاتك النقدية" },
      { key: "preservation", label: "حفظ رأس المال", description: "حماية قيمة أصولك مع عوائد مستقرة وتقلب منخفض" },
    ],
    profileSoFar: [
      { label: "الهدف", value: "الاستثمار", resolved: true },
      { label: "نوع الهدف", value: "قيد التحديد", resolved: false },
      { label: "المخاطرة", value: "قيد التحليل", resolved: false },
    ],
  },
  3: {
    stepNumber: 3,
    totalSteps: 5,
    question: "ما مستوى المخاطرة المقبول لديك؟",
    options: [
      { key: "low", label: "منخفض", description: "أفضّل الأمان وقبول عوائد أقل مقابل استقرار أعلى" },
      { key: "medium", label: "متوسط", description: "توازن بين العوائد المعقولة والمخاطر المحسوبة" },
      { key: "high", label: "مرتفع", description: "أتقبل تذبذباً أعلى مقابل إمكانية عوائد استثنائية" },
    ],
    profileSoFar: [
      { label: "الهدف", value: "الاستثمار", resolved: true },
      { label: "نوع الهدف", value: "نمو رأس المال", resolved: true },
      { label: "المخاطرة", value: "قيد التحديد", resolved: false },
    ],
  },
  4: {
    stepNumber: 4,
    totalSteps: 5,
    question: "ما المدة الزمنية المخطط لها للاستثمار؟",
    options: [
      { key: "short", label: "أقل من سنة", description: "أحتاج السيولة في القريب العاجل" },
      { key: "medium", label: "من 1 إلى 5 سنوات", description: "مدة متوسطة تتيح تنويعاً مناسباً" },
      { key: "long", label: "أكثر من 5 سنوات", description: "أستثمر للمدى البعيد وبناء ثروة مستدامة" },
    ],
    profileSoFar: [
      { label: "الهدف", value: "الاستثمار", resolved: true },
      { label: "نوع الهدف", value: "نمو رأس المال", resolved: true },
      { label: "المخاطرة", value: "متوسطة", resolved: true },
    ],
  },
  5: {
    stepNumber: 5,
    totalSteps: 5,
    question: "كم تودّ أن تبدأ به شهرياً؟",
    options: [
      { key: "low", label: "أقل من 500 ريال", description: "مبلغ تجريبي لبدء رحلتك الاستثمارية" },
      { key: "medium", label: "500 – 2000 ريال", description: "مستوى مناسب لبناء محفظة متنوعة" },
      { key: "high", label: "أكثر من 2000 ريال", description: "استثمار جاد يُعجّل في تحقيق أهدافك" },
    ],
    profileSoFar: [
      { label: "الهدف", value: "الاستثمار", resolved: true },
      { label: "نوع الهدف", value: "نمو رأس المال", resolved: true },
      { label: "المخاطرة", value: "متوسطة", resolved: true },
      { label: "المدة الزمنية", value: "5+ سنوات", resolved: true },
    ],
  },
};

router.get("/ai-agent/flow", (req, res) => {
  res.json(questions[1]);
});

router.post("/ai-agent/answer", (req, res) => {
  const { stepNumber } = req.body as { stepNumber: number; selectedKey: string };
  const nextStep = stepNumber + 1;

  if (nextStep > 5) {
    return res.json({ done: true, recommendationId: "rec-001", nextQuestion: null });
  }

  const next = questions[nextStep];
  if (!next) {
    return res.json({ done: true, recommendationId: "rec-001", nextQuestion: null });
  }

  res.json({ done: false, nextQuestion: next, recommendationId: null });
});

export default router;
