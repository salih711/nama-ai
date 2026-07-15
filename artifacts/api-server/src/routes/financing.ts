import { Router } from "express";

const router = Router();

router.get("/financing", (req, res) => {
  res.json({
    activeLoans: [
      {
        id: "loan-001",
        type: "تمويل عقاري",
        originalAmount: 850000,
        remainingAmount: 620000,
        monthlyPayment: 4200,
        yearsRemaining: 7,
        paidPercent: 27,
        installmentBreakdown: { principal: 58, profit: 36, insurance: 6 },
      },
    ],
    availableProducts: [
      { id: "fp-001", name: "تمويل شخصي", maxAmount: 200000, profitRate: 5.99, estimatedMonthly: 3850 },
      { id: "fp-002", name: "تمويل سيارة", maxAmount: 150000, profitRate: 4.49, estimatedMonthly: 2900 },
      { id: "fp-003", name: "تمويل تعليمي", maxAmount: 80000, profitRate: 3.99, estimatedMonthly: 1650 },
    ],
    aiInsight: {
      text: "بناءً على دخلك الحالي ونسبة التزاماتك البالغة 35%، يمكنك الحصول على تمويل إضافي يصل إلى 150,000 ريال دون الإخلال بصحتك المالية.",
      additionalAmount: 150000,
    },
  });
});

export default router;
