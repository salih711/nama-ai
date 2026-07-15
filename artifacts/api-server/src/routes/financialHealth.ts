import { Router } from "express";

const router = Router();

router.get("/financial-health", (req, res) => {
  res.json({
    score: 78,
    label: "وضع جيد",
    percentileBenchmark: 68,
    subScores: [
      { label: "استقرار الدخل", score: 85, maxScore: 100, status: "good" },
      { label: "إدارة الديون", score: 72, maxScore: 100, status: "good" },
      { label: "عادة الادخار", score: 74, maxScore: 100, status: "good" },
      { label: "التحكم في الإنفاق", score: 80, maxScore: 100, status: "good" },
    ],
    income: 18500,
    expenses: 14230,
    savings: 4270,
    savingsRatio: 23.1,
    savingsRatioLabel: "أعلى من الموصى به (20%)",
    debtRatio: 35,
    debtRatioLabel: "ضمن النطاق المقبول",
    spendingCategories: [
      { label: "السكن", percent: 32, amount: 4554 },
      { label: "الغذاء", percent: 18, amount: 2561 },
      { label: "المواصلات", percent: 12, amount: 1708 },
      { label: "الترفيه", percent: 8, amount: 1138 },
      { label: "الرعاية الصحية", percent: 6, amount: 854 },
      { label: "أخرى", percent: 24, amount: 3415 },
    ],
    monthlyTrend: [
      { month: "يناير", score: 71 },
      { month: "فبراير", score: 73 },
      { month: "مارس", score: 70 },
      { month: "أبريل", score: 74 },
      { month: "مايو", score: 76 },
      { month: "يونيو", score: 75 },
      { month: "يوليو", score: 78 },
    ],
    aiInsights: [
      "تحسنت نسبة ادخارك 3% مقارنة بالشهر الماضي — استمر في هذا الاتجاه الإيجابي.",
      "مصاريف السكن ضمن النطاق الصحي لدخلك ولا تتجاوز الحد الأمثل.",
      "ننصح ببناء صندوق طوارئ يغطي 6 أشهر من المصاريف؛ رصيدك الحالي يغطي 3.5 أشهر فقط.",
    ],
    explainableAI: {
      factors: [
        "الدخل الشهري الثابت والمصادر المتعددة",
        "نسبة الديون إلى الدخل وانتظام السداد",
        "معدل الادخار الشهري ونموه عبر الزمن",
        "التنويع في المصاريف وضبط الإنفاق الاستهلاكي",
        "قيمة الأصول المحتفظ بها مقابل الالتزامات",
      ],
    },
  });
});

export default router;
