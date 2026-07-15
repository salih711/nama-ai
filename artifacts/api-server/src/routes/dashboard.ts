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
    aiSummary: {
      opportunitiesFound: 3,
      yearlyBenefit: 1850,
      analysisMessage: "بعد تحليل معاملاتك وسلوكك الإنفاقي خلال الـ 90 يوماً الماضية، وجدت 3 فرص لتحسين صحتك المالية.",
    },
    aiOpportunities: [
      {
        id: "opp-health",
        type: "health",
        title: "مؤشر صحتك المالية",
        value: "78 / 100",
        badge: "وضع جيد",
        badgeColor: "green",
        reason: "نسبة ادخارك تبلغ 23% وهي أعلى من المستهدف. الديون ضمن النطاق الآمن. ارتفع المؤشر 3 نقاط هذا الشهر.",
        actionLabel: "عرض التفاصيل",
        actionHref: "/financial-health",
        benefit: null,
      },
      {
        id: "opp-recs",
        type: "recommendations",
        title: "توصيات نماء اليوم",
        value: "3 توصيات",
        badge: "جديد",
        badgeColor: "primary",
        reason: "اكتشف نماء فرصتَي ادخار وواحدة استثمارية بناءً على تحليل إنفاقك الشهري ومستوى التزاماتك الحالي.",
        actionLabel: "عرض التوصيات",
        actionHref: "/recommendation/rec-001",
        benefit: 1850,
      },
      {
        id: "opp-card",
        type: "card",
        title: "أفضل بطاقة لك",
        value: "بطاقة الإنماء الماسية بلاس",
        badge: "توصية",
        badgeColor: "amber",
        reason: "بناءً على إنفاقك الشهري على السفر والمطاعم البالغ 1,420 ريال، هذه البطاقة ستمنحك استرداداً نقدياً يقدر بـ 850 ريال سنوياً — أي 3× أكثر من بطاقتك الحالية.",
        actionLabel: "اعرف التفاصيل",
        actionHref: "/cards",
        benefit: 850,
      },
      {
        id: "opp-saving",
        type: "saving",
        title: "فرصة ادخار",
        value: "420 ريال / شهرياً",
        badge: "وفّر الآن",
        badgeColor: "green",
        reason: "لاحظ نماء أن رصيدك الجاري يتجاوز احتياجاتك الشهرية بـ 420 ريال في المتوسط. نقلها لحساب التوفير يضاعف عائدك الشهري.",
        actionLabel: "تفعيل الادخار",
        actionHref: "/recommendation/rec-001",
        benefit: 5040,
      },
      {
        id: "opp-invest",
        type: "investment",
        title: "فرصة استثمارية",
        value: "عائد متوقع 10.2%",
        badge: "استثمر",
        badgeColor: "primary",
        reason: "محفظتك الحالية تتمركز في النقد بنسبة أعلى من اللازم. توجيه 2,000 ريال شهرياً لصندوق الإنماء للمؤشرات قد يُنمّي ثروتك بـ 28,000 ريال خلال 10 سنوات.",
        actionLabel: "استكشف الاستثمار",
        actionHref: "/investments",
        benefit: 28000,
      },
    ],
    recentTransactions: [
      { id: "t1", merchant: "راتب شهر يوليو", amount: 18500, date: "2026-07-01", category: "دخل", type: "credit" },
      { id: "t2", merchant: "سوبرماركت الدانوب", amount: 342, date: "2026-07-13", category: "تسوق", type: "debit" },
      { id: "t3", merchant: "تحويل لمحفظة الاستثمار", amount: 2000, date: "2026-07-12", category: "استثمار", type: "debit" },
      { id: "t4", merchant: "مطعم كيد زين", amount: 185, date: "2026-07-11", category: "مطاعم", type: "debit" },
      { id: "t5", merchant: "شركة STC", amount: 245, date: "2026-07-10", category: "فواتير", type: "debit" },
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
