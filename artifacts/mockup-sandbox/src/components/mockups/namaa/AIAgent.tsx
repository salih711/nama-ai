import React from "react";
import { AppLayout } from "./_shared/AppLayout";

const CreditCardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
);

const BanknoteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
);

const TrendingUpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);

const WalletIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
);

const BuildingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
);

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.485-6.485l-2.121 2.121M7.636 16.364l-2.121 2.121M16.364 16.364l2.121 2.121M7.636 7.636L5.515 5.515"/>
  </svg>
);

export function AIAgent() {
  return (
    <AppLayout activePage="ai-agent">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      <div className="flex h-full w-full bg-[#F8F9FA]" dir="rtl" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
        {/* Main Wizard Area */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto px-8 py-16">
          <div className="w-full max-w-2xl space-y-12 pb-24">
            
            {/* Header */}
            <div className="text-center space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#00703C]/10 mb-2 text-[#00703C]">
                <SparklesIcon />
              </div>
              <h1 className="text-3xl font-semibold text-[#111827] tracking-tight">نماء — مستشارك المالي الذكي</h1>
              <p className="text-[#6B7280] text-base">نساعدك في اتخاذ قرارات مالية أفضل، خطوة بخطوة.</p>
            </div>

            {/* Progress */}
            <div className="w-full space-y-2.5 animate-fade-in-up delay-100">
              <div className="flex justify-between text-[13px] font-medium text-[#9CA3AF]">
                <span>الخطوة 2 من 5</span>
                <span className="text-[#00703C]">40%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#00703C] w-[40%] rounded-full transition-all duration-700 ease-out"></div>
              </div>
            </div>

            {/* Question 1 (Answered / Active) */}
            <div className="space-y-5 animate-fade-in-up delay-200">
              <h2 className="text-[22px] font-medium text-[#111827] tracking-tight">ماذا تريد أن تحقق اليوم؟</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <OptionCard icon={<CreditCardIcon />} title="أفضل بطاقة ائتمانية" desc="اكتشف البطاقة الأنسب لمصروفاتك" />
                <OptionCard icon={<BanknoteIcon />} title="تمويل شخصي" desc="احسب قدرتك التمويلية" />
                <OptionCard icon={<TrendingUpIcon />} title="الاستثمار" desc="نمي ثروتك بذكاء" selected />
                <OptionCard icon={<WalletIcon />} title="الادخار" desc="ابنِ صندوق طوارئ" />
                <OptionCard icon={<BuildingIcon />} title="خدمات مصرفية" desc="حسابات وخدمات بنكية يومية" />
              </div>
            </div>

            {/* Question 2 (Revealed) */}
            <div className="space-y-5 animate-fade-in-up delay-400">
              <h2 className="text-[22px] font-medium text-[#111827] tracking-tight">ما هدفك من الاستثمار؟</h2>
              
              <div className="flex flex-col gap-3">
                <RowOptionCard title="نمو رأس المال" desc="تحقيق أقصى عوائد على المدى الطويل مع تحمل مخاطر أعلى" selected />
                <RowOptionCard title="دخل منتظم" desc="توزيعات أرباح مستقرة مع مخاطر معتدلة" />
                <RowOptionCard title="حفظ رأس المال" desc="حماية رأس المال مع عوائد أقل" />
              </div>
            </div>

            <div className="pt-8 flex justify-end animate-fade-in-up delay-500">
               <button className="bg-[#00703C] hover:bg-[#005a30] text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:scale-[0.98]">
                 متابعة
               </button>
            </div>

          </div>
        </div>

        {/* Sidebar Panel - Profile Being Built */}
        <div className="w-[340px] bg-white border-r border-[#F0F0F0] p-8 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.01)] z-10">
          <div className="space-y-1.5 mb-10">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-widest">ملفك المالي يتشكل</h3>
            <p className="text-[13px] text-[#6B7280]">يتعلم نماء المزيد عن احتياجاتك لتقديم توصيات مناسبة.</p>
          </div>

          <div className="space-y-6 flex-1">
            <ProfileItem label="الهدف" value="الاستثمار" active />
            <ProfileItem label="المخاطرة" value="قيد التحليل" />
            <ProfileItem label="المدة" value="قيد التحليل" />
          </div>

          <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#F0F0F0] mt-auto">
             <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00703C] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  نماء يحلل بياناتك لتقديم توصية مخصصة لك — وليس توصية عامة.
                </p>
             </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Subcomponents:
function OptionCard({ icon, title, desc, selected = false }: { icon: React.ReactNode; title: string; desc: string; selected?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3.5 ${
      selected 
        ? "border-[#00703C] bg-[#00703C]/[0.03] shadow-[0_0_0_1px_#00703C]" 
        : "border-[#E5E7EB] bg-white hover:border-[#00703C]/30 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
    }`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${selected ? "bg-[#00703C] text-white" : "bg-[#F8F9FA] text-[#6B7280]"}`}>
        {icon}
      </div>
      <div>
        <div className={`font-medium mb-1 tracking-tight ${selected ? "text-[#00703C]" : "text-[#111827]"}`}>{title}</div>
        <div className={`text-[13px] leading-relaxed ${selected ? "text-[#00703C]/80" : "text-[#6B7280]"}`}>{desc}</div>
      </div>
    </div>
  )
}

function RowOptionCard({ title, desc, selected = false }: { title: string; desc: string; selected?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
      selected 
        ? "border-[#00703C] bg-[#00703C]/[0.03] shadow-[0_0_0_1px_#00703C]" 
        : "border-[#E5E7EB] bg-white hover:border-[#00703C]/30 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
    }`}>
       <div className={`w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
         selected ? "border-[#00703C] bg-[#00703C]" : "border-[#D1D5DB] bg-white"
       }`}>
         {selected && <div className="w-[8px] h-[8px] rounded-full bg-white" />}
       </div>
       <div>
         <div className={`font-medium tracking-tight mb-0.5 ${selected ? "text-[#00703C]" : "text-[#111827]"}`}>{title}</div>
         <div className={`text-[13px] ${selected ? "text-[#00703C]/80" : "text-[#6B7280]"}`}>{desc}</div>
       </div>
    </div>
  )
}

function ProfileItem({ label, value, active = false }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
       <div className="text-[11px] text-[#9CA3AF] font-semibold uppercase tracking-widest">{label}</div>
       <div className={`text-[14px] font-medium flex items-center gap-2 ${active ? "text-[#111827]" : "text-[#9CA3AF]"}`}>
         {value}
         {active && (
           <div className="w-4 h-4 rounded-full bg-[#00703C]/10 flex items-center justify-center mr-1">
             <svg className="w-2.5 h-2.5 text-[#00703C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
             </svg>
           </div>
         )}
       </div>
    </div>
  )
}
