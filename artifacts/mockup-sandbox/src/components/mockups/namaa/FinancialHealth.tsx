import { AppLayout } from "./_shared/AppLayout";

export function FinancialHealth() {
  return (
    <AppLayout activePage="financial-health">
      <div className="max-w-6xl mx-auto px-8 py-10 space-y-8 pb-20">
        
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-[#111827] tracking-tight">Financial Health</h1>
          <p className="text-[14px] text-[#6B7280]">Comprehensive analysis of your financial standing and habits.</p>
        </div>

        {/* Top Section: Main Score & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Score Card */}
          <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center justify-center relative lg:col-span-1">
            <h2 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider mb-6">Overall Score</h2>
            
            <div className="relative w-[200px] h-[110px] flex items-end justify-center mb-2">
              <svg width="200" height="110" viewBox="0 0 200 110" className="absolute top-0 left-0">
                {/* Background Arc */}
                <path 
                  d="M 10 100 A 90 90 0 0 1 190 100" 
                  fill="none" 
                  stroke="#F0F0F0" 
                  strokeWidth="14" 
                  strokeLinecap="round" 
                />
                {/* Foreground Arc - 78% of 282.74 (PI * 90) = 220.5, dashoffset = 282.74 - 220.5 = 62.24 */}
                <path 
                  d="M 10 100 A 90 90 0 0 1 190 100" 
                  fill="none" 
                  stroke="#00703C" 
                  strokeWidth="14" 
                  strokeLinecap="round"
                  strokeDasharray="282.74"
                  strokeDashoffset="62.24"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="text-center pb-1">
                <div className="text-5xl font-semibold text-[#111827] tracking-tighter">78</div>
                <div className="text-[12px] text-[#9CA3AF] font-medium mt-1">out of 100</div>
              </div>
            </div>

            <div className="mt-4 px-4 py-1.5 bg-[#00703C]/[0.08] text-[#00703C] rounded-full text-[13px] font-semibold">
              Good Standing
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-8 lg:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[15px] font-semibold text-[#111827] flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#00703C]">
                  <path d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z" fill="currentColor"/>
                </svg>
                Namaa Insights
              </h2>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-[12px] bg-[#F8F9FA] border border-[#F0F0F0]/50 transition-colors hover:bg-white hover:border-[#E5E7EB]">
                <div className="w-8 h-8 rounded-full bg-[#00703C]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#00703C]">
                    <path d="M7 11V3M7 3L3.5 6.5M7 3L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#111827]">Savings rate improved</h3>
                  <p className="text-[13px] text-[#6B7280] mt-0.5 leading-relaxed">Your savings rate increased by 3% compared to last month. You're successfully keeping your discretionary spending low.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-[12px] bg-[#F8F9FA] border border-[#F0F0F0]/50 transition-colors hover:bg-white hover:border-[#E5E7EB]">
                <div className="w-8 h-8 rounded-full bg-[#00703C]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#00703C]">
                    <path d="M1.5 7L5 10.5L12.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#111827]">Housing expenses healthy</h3>
                  <p className="text-[13px] text-[#6B7280] mt-0.5 leading-relaxed">Housing makes up 32% of your income, which aligns perfectly with the recommended 30-35% threshold.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-[12px] bg-amber-50/50 border border-amber-100/50 transition-colors hover:bg-white hover:border-amber-200">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-amber-600">
                    <path d="M7 3.5V7M7 9.5H7.005M12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#111827]">Emergency fund target</h3>
                  <p className="text-[13px] text-[#6B7280] mt-0.5 leading-relaxed">Consider building your emergency fund to cover 6 months of expenses (SAR 85,380). You are currently at 2.5 months.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-scores Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Income Stability", score: 85, icon: "M12 4v16m8-8H4" }, // Simplified paths for icons later
            { label: "Debt Management", score: 72 },
            { label: "Savings Habit", score: 74 },
            { label: "Expense Control", score: 80 }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="text-[13px] font-medium text-[#6B7280]">{item.label}</div>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-semibold text-[#111827] leading-none">{item.score}</span>
                <span className="text-[12px] text-[#9CA3AF] mb-1">/100</span>
              </div>
              <div className="w-full bg-[#F0F0F0] rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.score >= 80 ? 'bg-[#00703C]' : item.score >= 70 ? 'bg-amber-400' : 'bg-red-500'}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Income vs Expenses */}
          <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-6 lg:p-8">
            <h2 className="text-[15px] font-semibold text-[#111827] mb-6">Monthly Cash Flow</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[13px] font-medium text-[#6B7280]">Income</div>
                  <div className="text-[15px] font-semibold text-[#111827]">SAR 18,500</div>
                </div>
                <div className="w-full bg-[#F0F0F0] rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#00703C] h-full rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[13px] font-medium text-[#6B7280]">Expenses</div>
                  <div className="text-[15px] font-semibold text-[#111827]">SAR 14,230</div>
                </div>
                <div className="w-full bg-[#F0F0F0] rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-gray-800 h-full w-[76%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[13px] font-medium text-[#6B7280]">Savings</div>
                  <div className="text-[15px] font-semibold text-[#00703C]">SAR 4,270</div>
                </div>
                <div className="w-full bg-[#F0F0F0] rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#00703C]/30 h-full rounded-full w-[24%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Ratios & Trend */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Savings Ratio */}
              <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-6 flex flex-col">
                <div className="text-[13px] font-medium text-[#6B7280] mb-4">Savings Ratio</div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-3xl font-semibold text-[#00703C] mb-1">23%</div>
                  <div className="text-[12px] text-[#6B7280] mb-4">of monthly income</div>
                  <div className="w-full bg-[#F0F0F0] rounded-full h-1.5 overflow-hidden mb-2">
                    <div className="bg-[#00703C] h-full rounded-full w-[23%]" />
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="#00703C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Above 20% target
                  </div>
                </div>
              </div>

              {/* Debt Ratio */}
              <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-6 flex flex-col">
                <div className="text-[13px] font-medium text-[#6B7280] mb-4">Debt-to-Income</div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-3xl font-semibold text-amber-500 mb-1">35%</div>
                  <div className="text-[12px] text-[#6B7280] mb-4">of monthly income</div>
                  <div className="w-full bg-[#F0F0F0] rounded-full h-1.5 overflow-hidden mb-2">
                    <div className="bg-amber-400 h-full rounded-full w-[35%]" />
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="4" stroke="#D97706" strokeWidth="1.5"/>
                      <path d="M5 3V5.5M5 7H5.01" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    At maximum threshold
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Spending Categories */}
          <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-6 lg:p-8">
            <h2 className="text-[15px] font-semibold text-[#111827] mb-6">Spending Distribution</h2>
            
            <div className="space-y-4">
              {[
                { name: "Housing", value: 32, color: "bg-gray-800" },
                { name: "Food & Dining", value: 18, color: "bg-[#00703C]" },
                { name: "Transport", value: 12, color: "bg-gray-400" },
                { name: "Entertainment", value: 8, color: "bg-gray-300" },
                { name: "Healthcare", value: 6, color: "bg-gray-200" },
                { name: "Other", value: 24, color: "bg-gray-100" }
              ].map((cat, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-28 text-[13px] font-medium text-[#6B7280] shrink-0">{cat.name}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 bg-[#F0F0F0] rounded-full h-1.5 overflow-hidden">
                      <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.value}%` }} />
                    </div>
                    <div className="w-8 text-right text-[13px] font-medium text-[#111827]">{cat.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-6 lg:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[15px] font-semibold text-[#111827]">Health Score Trend</h2>
              <div className="text-[12px] font-medium text-[#00703C] bg-[#00703C]/10 px-2.5 py-1 rounded-md">
                +13 Points (6 Mo)
              </div>
            </div>

            <div className="flex-1 relative w-full min-h-[160px] flex items-end pt-4">
              {/* Chart SVG */}
              <div className="absolute inset-0">
                <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible preserve-aspect-ratio-none">
                  {/* Grid Lines */}
                  <line x1="0" y1="0" x2="400" y2="0" stroke="#F0F0F0" strokeWidth="1" />
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#F0F0F0" strokeWidth="1" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#F0F0F0" strokeWidth="1" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#F0F0F0" strokeWidth="1" />
                  
                  {/* Y-axis Labels */}
                  <text x="-10" y="5" className="text-[10px] fill-[#9CA3AF] text-right" textAnchor="end">100</text>
                  <text x="-10" y="45" className="text-[10px] fill-[#9CA3AF] text-right" textAnchor="end">80</text>
                  <text x="-10" y="85" className="text-[10px] fill-[#9CA3AF] text-right" textAnchor="end">60</text>
                  
                  {/* 
                    Data points mapping:
                    Y scale: 60-100 mapped to 120-0
                    y = 120 - ((score - 60) / 40) * 120 
                    Scores: 65, 68, 70, 72, 75, 78
                    y(65) = 120 - 15 = 105
                    y(68) = 120 - 24 = 96
                    y(70) = 120 - 30 = 90
                    y(72) = 120 - 36 = 84
                    y(75) = 120 - 45 = 75
                    y(78) = 120 - 54 = 66
                    X coords: 0, 80, 160, 240, 320, 400
                  */}
                  
                  {/* Area fill */}
                  <path 
                    d="M 0 105 L 80 96 L 160 90 L 240 84 L 320 75 L 400 66 L 400 120 L 0 120 Z" 
                    fill="url(#gradient)" 
                    opacity="0.5"
                  />
                  
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00703C" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#00703C" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Line */}
                  <path 
                    d="M 0 105 C 40 105, 40 96, 80 96 C 120 96, 120 90, 160 90 C 200 90, 200 84, 240 84 C 280 84, 280 75, 320 75 C 360 75, 360 66, 400 66" 
                    fill="none" 
                    stroke="#00703C" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Points */}
                  <circle cx="0" cy="105" r="4" fill="white" stroke="#00703C" strokeWidth="2" />
                  <circle cx="80" cy="96" r="4" fill="white" stroke="#00703C" strokeWidth="2" />
                  <circle cx="160" cy="90" r="4" fill="white" stroke="#00703C" strokeWidth="2" />
                  <circle cx="240" cy="84" r="4" fill="white" stroke="#00703C" strokeWidth="2" />
                  <circle cx="320" cy="75" r="4" fill="white" stroke="#00703C" strokeWidth="2" />
                  <circle cx="400" cy="66" r="4" fill="white" stroke="#00703C" strokeWidth="2" />
                </svg>
              </div>

              {/* X-axis Labels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[11px] font-medium text-[#9CA3AF]">
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>Jan</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>Feb</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>Mar</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>Apr</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>May</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(50%)' }}>Jun</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
