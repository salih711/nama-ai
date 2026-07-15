import { Router } from "express";

const router = Router();

router.get("/reports", (req, res) => {
  const period = (req.query["period"] as string) || "2026-07";
  res.json({
    period,
    income: 18500,
    expenses: 14230,
    netSavings: 4270,
    incomeVsLastMonth: 0,
    expensesVsLastMonth: -3.8,
    spendingByCategory: [
      { category: "السكن", amount: 4554, percent: 32, budgetPercent: 95, trend: "stable" },
      { category: "الغذاء", amount: 2561, percent: 18, budgetPercent: 85, trend: "down" },
      { category: "المواصلات", amount: 1708, percent: 12, budgetPercent: 91, trend: "stable" },
      { category: "الترفيه", amount: 1138, percent: 8, budgetPercent: 114, trend: "up" },
      { category: "الرعاية الصحية", amount: 854, percent: 6, budgetPercent: 70, trend: "down" },
      { category: "أخرى", amount: 3415, percent: 24, budgetPercent: 88, trend: "stable" },
    ],
    monthlyComparison: [
      { month: "فبراير", current: 12400, previous: 13100 },
      { month: "مارس", current: 13100, previous: 12800 },
      { month: "أبريل", current: 11800, previous: 13100 },
      { month: "مايو", current: 14500, previous: 11800 },
      { month: "يونيو", current: 13700, previous: 14500 },
      { month: "يوليو", current: 14230, previous: 13700 },
    ],
    goals: [
      { id: "g1", name: "صندوق الطوارئ", progress: 68, target: 55000, current: 37400 },
      { id: "g2", name: "دفعة أولى للمنزل", progress: 34, target: 150000, current: 51000 },
      { id: "g3", name: "صندوق الإجازة السنوية", progress: 92, target: 15000, current: 13800 },
    ],
    aiSuggestions: [
      "تخفيض مصاريف الترفيه بـ 400 ريال شهرياً سيُمكّنك من تحقيق هدف الادخار قبل الموعد المحدد بـ 3 أشهر.",
      "أتمتة تحويل 500 ريال شهرياً لمحفظة الاستثمار ستضاعف ثروتك خلال 10 سنوات بمتوسط عائد 8%.",
      "فاتورة الكهرباء أعلى بـ 40% من متوسط المستخدمين بنفس حجم الأسرة — ننصح بمراجعة استهلاكك.",
    ],
  });
});

export default router;
