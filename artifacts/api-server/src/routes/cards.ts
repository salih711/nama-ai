import { Router } from "express";

const router = Router();

router.get("/cards", (req, res) => {
  res.json([
    {
      id: "card-001",
      name: "بطاقة أهلي البلاتينية",
      type: "بلاتينية",
      lastFour: "4821",
      expiryDate: "12/28",
      creditLimit: 25000,
      availableBalance: 18450,
      outstanding: 6550,
      utilizationPercent: 26,
      status: "active",
      pointsEarned: 2340,
      transactions: [
        { id: "ct1", merchant: "هايبر بنده", amount: 523, date: "2026-07-13", category: "تسوق", type: "debit" },
        { id: "ct2", merchant: "مطعم البيك", amount: 87, date: "2026-07-12", category: "مطاعم", type: "debit" },
        { id: "ct3", merchant: "أمازون السعودية", amount: 340, date: "2026-07-11", category: "تسوق", type: "debit" },
        { id: "ct4", merchant: "نمشي", amount: 620, date: "2026-07-10", category: "ملابس", type: "debit" },
        { id: "ct5", merchant: "شركة STC", amount: 245, date: "2026-07-09", category: "فواتير", type: "debit" },
      ],
    },
    {
      id: "card-002",
      name: "بطاقة أهلي الماسية",
      type: "ماسية",
      lastFour: "9034",
      expiryDate: "08/27",
      creditLimit: 50000,
      availableBalance: 42100,
      outstanding: 7900,
      utilizationPercent: 16,
      status: "active",
      pointsEarned: 5870,
      transactions: [
        { id: "ct6", merchant: "فندق الريتز كارلتون", amount: 3200, date: "2026-07-08", category: "سفر", type: "debit" },
        { id: "ct7", merchant: "طيران السعودية", amount: 1850, date: "2026-07-05", category: "سفر", type: "debit" },
      ],
    },
    {
      id: "card-003",
      name: "البطاقة المدنية الإضافية",
      type: "مدنية",
      lastFour: "7712",
      expiryDate: "03/26",
      creditLimit: 8000,
      availableBalance: 8000,
      outstanding: 0,
      utilizationPercent: 0,
      status: "frozen",
      pointsEarned: 120,
      transactions: [],
    },
  ]);
});

export default router;
