import { Router } from "express";

const router = Router();

router.get("/investments", (req, res) => {
  res.json({
    totalValue: 48320,
    dailyChange: 340,
    dailyChangePercent: 0.71,
    performanceChart: [
      { month: "يناير", amount: 41200 },
      { month: "فبراير", amount: 42800 },
      { month: "مارس", amount: 41900 },
      { month: "أبريل", amount: 44300 },
      { month: "مايو", amount: 46100 },
      { month: "يونيو", amount: 47980 },
      { month: "يوليو", amount: 48320 },
    ],
    assetAllocation: [
      { label: "أسهم", percent: 45, color: "#00703C" },
      { label: "صكوك", percent: 30, color: "#0ea5e9" },
      { label: "صندوق عقاري", percent: 15, color: "#f59e0b" },
      { label: "نقد", percent: 10, color: "#a78bfa" },
    ],
    holdings: [
      { id: "h1", name: "صندوق أهلي للمؤشرات", currentValue: 21740, gainLoss: 2740, gainLossPercent: 14.4 },
      { id: "h2", name: "ريت الراجحي العقاري", currentValue: 9650, gainLoss: 420, gainLossPercent: 4.5 },
      { id: "h3", name: "صندوق صكوك سعودية", currentValue: 11200, gainLoss: 800, gainLossPercent: 7.7 },
      { id: "h4", name: "صندوق قطاع التقنية", currentValue: 5730, gainLoss: 1270, gainLossPercent: 28.5 },
    ],
    metrics: {
      totalReturn: 12.4,
      annualizedReturn: 8.2,
      unrealizedGain: 5230,
    },
    aiInsight: "محفظتك تزيد في الأسهم بنسبة 12% عن الحد الموصى به لمستوى مخاطرتك المتوسط. قد يكون من المفيد إعادة التوازن لتقليل التذبذب.",
  });
});

export default router;
