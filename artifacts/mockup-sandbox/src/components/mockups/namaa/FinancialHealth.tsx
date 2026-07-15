import { AppLayout } from "./_shared/AppLayout";

export function FinancialHealth() {
  return (
    <AppLayout activePage="financial-health">
      <div 
        className="max-w-6xl mx-auto px-8 py-10 space-y-8 pb-20"
        style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
      >
        
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-[#111827] tracking-tight">مؤشر الصحة المالية</h1>
          <p className="text-[14px] text-[#6B7280]">تحليل شامل لوضعك المالي وعاداتك.</p>
        </div>

        {/* Top Section: Main Score & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Score Card */}
          <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-8 flex flex-col items-center justify-center relative lg:col-span-1 text-center">
            <h2 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider mb-8">المؤشر العام</h2>
            
            <div className="relative w-[280px] h-[150px] flex items-end justify-center mb-4">
              <svg viewBox="0 0 200 110" className="absolute top-0 left-0 w-full h-full">
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
              <div className="text-center pb-2">
                <div className="text-6xl font-semibold text-[#111827] tracking-tighter">78</div>
                <div className="text-[13px] text-[#9CA3AF] font-medium mt-1">من 100</div>
              </div>
            </div>

            <div className="mt-2 px-5 py-2 bg-[#00703C]/[0.08] text-[#00703C] rounded-full text-[14px] font-bold">
              وضع جيد
            </div>
            <p className="mt-5 text-[14px] text-[#6B7280] font-medium text-center">
              أنت في وضع مالي أفضل من <span className="font-bold text-[#111827]">68%</span> من المستخدمين
            </p>
          </div>

          {/* AI Insights Card */}
          <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-8 lg:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[15px] font-semibold text-[#111827] flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#00703C]">
                  <path d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z" fill="currentColor"/>
                </svg>
                توصيات نماء
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
                  <p className="text-[14px] text-[#111827] leading-relaxed font-medium">تحسنت نسبة ادخارك 3% مقارنة بالشهر الماضي — استمر في هذا الاتجاه.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-[12px] bg-[#F8F9FA] border border-[#F0F0F0]/50 transition-colors hover:bg-white hover:border-[#E5E7EB]">
                <div className="w-8 h-8 rounded-full bg-[#00703C]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#00703C]">
                    <path d="M1.5 7L5 10.5L12.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] leading-relaxed font-medium">مصاريف السكن ضمن النطاق الصحي لدخلك.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-[12px] bg-amber-50/50 border border-amber-100/50 transition-colors hover:bg-white hover:border-amber-200">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-amber-600">
                    <path d="M7 3.5V7M7 9.5H7.005M12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] leading-relaxed font-medium">ننصح ببناء صندوق الطوارئ ليغطي 6 أشهر من المصاريف.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-scores Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "استقرار الدخل", score: 85 },
            { label: "إدارة الديون", score: 72 },
            { label: "عادة الادخار", score: 74 },
            { label: "التحكم في الإنفاق", score: 80 }
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
            <h2 className="text-[15px] font-semibold text-[#111827] mb-6">التدفق النقدي الشهري</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[13px] font-medium text-[#6B7280]">الدخل</div>
                  <div className="text-[15px] font-semibold text-[#111827]">18,500 ريال</div>
                </div>
                <div className="w-full bg-[#F0F0F0] rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#00703C] h-full rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[13px] font-medium text-[#6B7280]">المصروفات</div>
                  <div className="text-[15px] font-semibold text-[#111827]">14,230 ريال</div>
                </div>
                <div className="w-full bg-[#F0F0F0] rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-gray-800 h-full w-[76%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[13px] font-medium text-[#6B7280]">المدخرات</div>
                  <div className="text-[15px] font-semibold text-[#00703C]">4,270 ريال</div>
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
                <div className="text-[13px] font-medium text-[#6B7280] mb-4">نسبة الادخار</div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-3xl font-semibold text-[#00703C] mb-1" dir="ltr" style={{textAlign: 'right'}}>23%</div>
                  <div className="text-[12px] text-[#6B7280] mb-4">من الدخل الشهري</div>
                  <div className="w-full bg-[#F0F0F0] rounded-full h-1.5 overflow-hidden mb-2">
                    <div className="bg-[#00703C] h-full rounded-full w-[23%]" />
                  </div>
                  <div className="text-[12px] text-[#00703C] font-medium flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    فوق الموصى به (20%)
                  </div>
                </div>
              </div>

              {/* Debt Ratio */}
              <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-6 flex flex-col">
                <div className="text-[13px] font-medium text-[#6B7280] mb-4">نسبة الدين</div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-3xl font-semibold text-amber-500 mb-1" dir="ltr" style={{textAlign: 'right'}}>35%</div>
                  <div className="text-[12px] text-[#6B7280] mb-4">من الدخل الشهري</div>
                  <div className="w-full bg-[#F0F0F0] rounded-full h-1.5 overflow-hidden mb-2">
                    <div className="bg-amber-400 h-full rounded-full w-[35%]" />
                  </div>
                  <div className="text-[12px] text-amber-600 font-medium flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 3V5.5M5 7H5.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    ضمن النطاق المقبول
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
            <h2 className="text-[15px] font-semibold text-[#111827] mb-6">توزيع المصروفات</h2>
            
            <div className="space-y-5">
              {[
                { name: "السكن", value: 32, color: "bg-gray-800" },
                { name: "الغذاء", value: 18, color: "bg-[#00703C]" },
                { name: "المواصلات", value: 12, color: "bg-gray-400" },
                { name: "الترفيه", value: 8, color: "bg-gray-300" },
                { name: "الرعاية الصحية", value: 6, color: "bg-gray-200" },
                { name: "أخرى", value: 24, color: "bg-gray-100" }
              ].map((cat, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-28 text-[14px] font-medium text-[#6B7280] shrink-0">{cat.name}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 bg-[#F0F0F0] rounded-full h-2 overflow-hidden">
                      <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.value}%` }} />
                    </div>
                    <div className="w-10 text-right text-[14px] font-medium text-[#111827]" dir="ltr">{cat.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white rounded-[16px] border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] p-6 lg:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[15px] font-semibold text-[#111827]">التغير الشهري في مؤشر الصحة</h2>
              <div className="text-[13px] font-medium text-[#00703C] bg-[#00703C]/10 px-3 py-1.5 rounded-md" dir="ltr">
                +13 نقطة (6 أشهر)
              </div>
            </div>

            <div className="flex-1 relative w-full min-h-[160px] flex items-end pt-4" dir="ltr">
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
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>يناير</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>فبراير</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>مارس</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>أبريل</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(-50%)' }}>مايو</span>
                <span className="w-8 text-center" style={{ transform: 'translateX(50%)' }}>يونيو</span>
              </div>
            </div>

          </div>
        </div>

        {/* Explainable AI Card */}
        <div className="bg-white rounded-[16px] border border-[#00703C]/30 shadow-[0_4px_12px_rgba(0,112,60,0.04)] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-[#00703C]"></div>
          <h2 className="text-[16px] font-semibold text-[#111827] mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#00703C]">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            كيف يحسب نماء مؤشر صحتك المالية؟
          </h2>
          <p className="text-[14px] text-[#6B7280] mb-6 leading-relaxed">
            يعتمد مؤشر الصحة المالية على تحليل متقدم لمعاملاتك المالية لتحديد مدى استقرارك المالي وقدرتك على مواجهة الطوارئ. نأخذ في الاعتبار العوامل التالية:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "استقرار التدفقات النقدية", icon: "M13 10V3L4 14H7V21L16 10H13Z" },
              { title: "نسبة الادخار إلى الدخل", icon: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.43 4 16.05 4 12C4 7.95 7.05 4.57 11 4.07V19.93ZM13 4.07C16.95 4.57 20 7.95 20 12C20 16.05 16.95 19.43 13 19.93V4.07Z" },
              { title: "الالتزامات المالية والديون", icon: "M4 6H20M4 12H20M4 18H20" },
              { title: "تنوع المصروفات", icon: "M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-[12px] bg-[#F8F9FA] border border-[#F0F0F0]/50 transition-colors hover:bg-white hover:border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#00703C]">
                    <path d={feature.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[13.5px] font-semibold text-[#111827]">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
