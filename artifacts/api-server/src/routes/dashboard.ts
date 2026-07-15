import { Router } from "express";

const router = Router();

router.get("/dashboard", (req, res) => {
  res.json({
    user: {
      name: "صالح",
      accountType: "حساب مميز",
    },
    healthScore: {
      score: 78,
      label: "وضع جيد",
      trend: 3.2,
    },
    metrics: {
      monthlySpending: 14230,
      savings: 12800,
      upcomingPaymentsCount: 3,
      upcomingPaymentsAmount: 6400,
    },
    aiRecommendation: {
      id: "rec-001",
      title: "توصية ادخار ذكية",
      summary: "وجد نماء فرصة لتوفير 420 ريال هذا الشهر بتحويل رصيدك إلى حساب التوفير المميز من مصرف الإنماء.",
      savingsAmount: 420,
      type: "savings",
      confidenceScore: 94,
    },
    recentTransactions: [
      { id: "t1", merchant: "راتب شهر يوليو", amount: 18500, date: "2026-07-01", category: "دخل", type: "credit" },
      { id: "t2", merchant: "سوبرماركت الدانوب", amount: 342, date: "2026-07-13", category: "تسوق", type: "debit" },
      { id: "t3", merchant: "تحويل لمحفظة الاستثمار", amount: 2000, date: "2026-07-12", category: "استثمار", type: "debit" },
      { id: "t4", merchant: "مطعم كيد زين", amount: 185, date: "2026-07-11", category: "مطاعم", type: "debit" },
      { id: "t5", merchant: "شركة STC", amount: 245, date: "2026-07-10", category: "فواتير", type: "debit" },
      { id: "t6", merchant: "محطة وقود أرامكو", amount: 210, date: "2026-07-09", category: "مواصلات", type: "debit" },
    ],
    spendingChart: [
      { month: "فبراير", amount: 12400 },
      { month: "مارس", amount: 13100 },
      { month: "أبريل", amount: 11800 },
      { month: "مايو", amount: 14500 },
      { month: "يونيو", amount: 13700 },
      { month: "يوليو", amount: 14230 },
    ],
  });
});

export default router;
