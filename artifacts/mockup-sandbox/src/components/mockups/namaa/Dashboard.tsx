import React from "react";
import { AppLayout } from "./_shared/AppLayout";

export function Dashboard() {
  return (
    <AppLayout activePage="dashboard">
      <div className="p-8 max-w-[1100px] mx-auto w-full flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-[24px] font-semibold text-[#111827] tracking-tight">
              Welcome back, Saleh
            </h1>
            <p className="text-[14px] text-[#6B7280] mt-1">October 24, 2023</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center text-[#4B5563] hover:text-[#111827] relative transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#00703C] border-2 border-white"></span>
          </button>
        </header>

        {/* AI Recommendation */}
        <div className="bg-[#00703C]/[0.03] border border-[#00703C]/10 rounded-[16px] p-5 flex items-center justify-between mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#00703C]/10 flex items-center justify-center text-[#00703C]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#111827]">
                AI Financial Insight
              </h3>
              <p className="text-[14px] text-[#4B5563] mt-0.5">
                Namaa analyzed your financial profile and found a better banking option for you yielding 4.5%.
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[13px] font-medium text-[#111827] shadow-sm hover:bg-gray-50 transition-colors">
            View Recommendation
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          {/* Health Score */}
          <div className="bg-white border border-[#F0F0F0] rounded-[16px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden">
            <div className="text-[14px] font-medium text-[#6B7280] mb-3">
              Financial Health
            </div>
            <div className="flex-1 flex flex-col items-center justify-center pt-2">
              <div className="relative w-32 h-16">
                <svg
                  viewBox="0 0 100 50"
                  className="w-full h-full overflow-visible"
                >
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#00703C"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="125.66"
                    strokeDashoffset="27.66"
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end translate-y-1">
                  <span className="text-[28px] font-bold text-[#111827] leading-none tracking-tight">
                    78
                  </span>
                </div>
              </div>
              <span className="text-[12px] font-medium text-[#00703C] mt-4 bg-[#00703C]/10 px-2.5 py-1 rounded-full">
                Good Standing
              </span>
            </div>
          </div>

          {/* Monthly Spending */}
          <div className="bg-white border border-[#F0F0F0] rounded-[16px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <div className="text-[14px] font-medium text-[#6B7280]">
                Monthly Spending
              </div>
            </div>
            <div className="text-[26px] font-bold text-[#111827] mb-2 tracking-tight">
              SAR 4,230
            </div>
            <div className="flex items-center gap-2 text-[13px] mt-auto">
              <span className="text-[#00703C] font-medium bg-[#00703C]/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
                12.5%
              </span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>

          {/* Savings */}
          <div className="bg-white border border-[#F0F0F0] rounded-[16px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
                  <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                  <path d="M16 11h.01" />
                </svg>
              </div>
              <div className="text-[14px] font-medium text-[#6B7280]">
                Total Savings
              </div>
            </div>
            <div className="text-[26px] font-bold text-[#111827] mb-2 tracking-tight">
              SAR 12,800
            </div>
            <div className="flex items-center gap-2 text-[13px] mt-auto">
              <span className="text-[#00703C] font-medium bg-[#00703C]/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                4.2%
              </span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </div>

          {/* Upcoming Payments */}
          <div className="bg-white border border-[#F0F0F0] rounded-[16px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="text-[14px] font-medium text-[#6B7280]">
                Upcoming
              </div>
            </div>
            <div className="text-[26px] font-bold text-[#111827] mb-2 tracking-tight">
              3
            </div>
            <div className="flex items-center gap-2 text-[13px] mt-auto">
              <span className="text-gray-500">Payments due this week</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-5 mb-6">
          {[
            {
              label: "Transfer",
              icon: (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3l4 4-4 4" />
                  <path d="M3 7h18" />
                  <path d="M7 21l-4-4 4-4" />
                  <path d="M21 17H3" />
                </svg>
              ),
            },
            {
              label: "Pay Bills",
              icon: (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              ),
            },
            {
              label: "Invest",
              icon: (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-4-4-5 5" />
                </svg>
              ),
            },
            {
              label: "Financing",
              icon: (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              ),
            },
            {
              label: "Cards",
              icon: (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              ),
            },
          ].map((action, i) => (
            <button
              key={i}
              className="flex-1 bg-white border border-[#F0F0F0] rounded-[16px] p-4 flex flex-col items-center justify-center gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:border-[#E5E7EB] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#F8F9FA] group-hover:bg-[#00703C]/5 flex items-center justify-center text-[#4B5563] group-hover:text-[#00703C] transition-colors">
                {action.icon}
              </div>
              <span className="text-[13px] font-medium text-[#111827]">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Chart & Recent Activity */}
        <div className="grid grid-cols-12 gap-5 mb-8">
          {/* Snapshot Chart */}
          <div className="col-span-7 bg-white border border-[#F0F0F0] rounded-[16px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[16px] font-semibold text-[#111827]">
                Financial Snapshot
              </h3>
              <div className="flex items-center gap-1 text-[13px] font-medium bg-gray-50 p-1 rounded-lg">
                <button className="px-3 py-1 bg-white text-[#00703C] rounded-md shadow-sm">
                  Spending
                </button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">
                  Income
                </button>
              </div>
            </div>

            <div className="flex-1 w-full relative mt-2 flex flex-col">
              <svg
                className="w-full h-[180px] overflow-visible"
                viewBox="0 0 600 200"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                <line x1="0" y1="0" x2="600" y2="0" stroke="#F3F4F6" strokeWidth="1" />
                <line
                  x1="0"
                  y1="50"
                  x2="600"
                  y2="50"
                  stroke="#F3F4F6"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="100"
                  x2="600"
                  y2="100"
                  stroke="#F3F4F6"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="150"
                  x2="600"
                  y2="150"
                  stroke="#F3F4F6"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="200"
                  x2="600"
                  y2="200"
                  stroke="#F3F4F6"
                  strokeWidth="1"
                />

                {/* Area Gradient */}
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00703C" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#00703C" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,130 C40,130 80,150 120,150 C160,150 200,90 240,90 C280,90 320,110 360,110 C400,110 440,60 480,60 C520,60 560,85 600,85 L600,200 L0,200 Z"
                  fill="url(#chart-gradient)"
                />
                <path
                  d="M0,130 C40,130 80,150 120,150 C160,150 200,90 240,90 C280,90 320,110 360,110 C400,110 440,60 480,60 C520,60 560,85 600,85"
                  fill="none"
                  stroke="#00703C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data points */}
                <circle cx="120" cy="150" r="4.5" fill="white" stroke="#00703C" strokeWidth="2.5" />
                <circle cx="240" cy="90" r="4.5" fill="white" stroke="#00703C" strokeWidth="2.5" />
                <circle cx="360" cy="110" r="4.5" fill="white" stroke="#00703C" strokeWidth="2.5" />
                <circle cx="480" cy="60" r="4.5" fill="white" stroke="#00703C" strokeWidth="2.5" />
                <circle cx="600" cy="85" r="4.5" fill="white" stroke="#00703C" strokeWidth="2.5" />
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between text-[12px] text-[#9CA3AF] font-medium mt-4">
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-5 bg-white border border-[#F0F0F0] rounded-[16px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[16px] font-semibold text-[#111827]">
                Recent Activity
              </h3>
              <button className="text-[13px] font-medium text-[#00703C] hover:underline">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {[
                {
                  title: "Panda Supermarket",
                  category: "Groceries",
                  date: "Today, 14:30",
                  amount: "- SAR 450.00",
                  iconBg: "bg-orange-50",
                  iconColor: "text-orange-500",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  ),
                },
                {
                  title: "Alinma Salary Deposit",
                  category: "Income",
                  date: "Yesterday",
                  amount: "+ SAR 18,500.00",
                  iconBg: "bg-[#00703C]/10",
                  iconColor: "text-[#00703C]",
                  positive: true,
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <circle cx="12" cy="12" r="2" />
                      <path d="M6 12h.01M18 12h.01" />
                    </svg>
                  ),
                },
                {
                  title: "STC Mobile Bill",
                  category: "Utilities",
                  date: "Oct 22",
                  amount: "- SAR 230.50",
                  iconBg: "bg-purple-50",
                  iconColor: "text-purple-500",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  ),
                },
                {
                  title: "Transfer to Khalid",
                  category: "Transfer",
                  date: "Oct 20",
                  amount: "- SAR 1,200.00",
                  iconBg: "bg-blue-50",
                  iconColor: "text-blue-500",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  title: "Uber Rides",
                  category: "Transport",
                  date: "Oct 19",
                  amount: "- SAR 85.00",
                  iconBg: "bg-gray-100",
                  iconColor: "text-gray-600",
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H5.3a2 2 0 0 0-1.6.8L1 11l-1 4v3h3m10 0v-2h-5v2m11-2h-3" />
                      <circle cx="6.5" cy="16.5" r="2.5" />
                      <circle cx="16.5" cy="16.5" r="2.5" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#111827] leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[12px] text-[#6B7280] mt-1">
                        {item.date} • {item.category}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-[14px] font-semibold ${
                      item.positive ? "text-[#00703C]" : "text-[#111827]"
                    }`}
                  >
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
