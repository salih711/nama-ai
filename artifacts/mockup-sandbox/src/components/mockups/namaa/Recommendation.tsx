import React from "react";
import { AppLayout } from "./_shared/AppLayout";

export function Recommendation() {
  return (
    <AppLayout activePage="ai-agent">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00703C]/10 text-[#00703C] text-[11px] font-semibold tracking-wide uppercase mb-4">
            <SparklesIcon className="w-3.5 h-3.5" />
            Analysis Complete
          </div>
          <h1 className="text-[32px] font-semibold text-gray-900 tracking-tight leading-tight mb-2">
            Namaa's Recommendation
          </h1>
          <p className="text-[15px] text-gray-500">
            Based on your financial profile, risk tolerance, and 5-year growth objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Recommended Product Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#00703C] flex items-center justify-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3L21 9V15L12 21L3 15V9L12 3Z"
                        fill="white"
                        fillOpacity="0.9"
                      />
                      <path d="M12 7L16.5 10V14L12 17L7.5 14V10L12 7Z" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <div className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600 mb-1.5">
                      Mutual Fund
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                      Alinma Investment Portfolio — Growth Fund
                    </h2>
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-gray-500 leading-relaxed max-w-lg mb-8">
                A Sharia-compliant investment fund aiming for long-term capital appreciation by investing in a diversified portfolio of local and global equities.
              </p>
            </div>
            
            <div className="flex items-center gap-8 border-t border-gray-50 pt-6 mt-2">
              <div>
                <div className="text-[12px] text-gray-400 font-medium mb-1">Expected Return</div>
                <div className="text-lg font-semibold text-gray-900">8.5% - 12.0%</div>
              </div>
              <div className="w-px h-10 bg-gray-100"></div>
              <div>
                <div className="text-[12px] text-gray-400 font-medium mb-1">Risk Level</div>
                <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  Moderate-High
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-3 bg-gray-200 rounded-full"></div>
                    <div className="w-1.5 h-4 bg-gray-200 rounded-full"></div>
                    <div className="w-1.5 h-5 bg-[#00703C] rounded-full"></div>
                    <div className="w-1.5 h-6 bg-[#00703C] rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-100"></div>
              <div>
                <div className="text-[12px] text-gray-400 font-medium mb-1">Min. Investment</div>
                <div className="text-lg font-semibold text-gray-900">5,000 SAR</div>
              </div>
            </div>
          </div>

          {/* Compatibility Score */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#00703C"
                  strokeWidth="8"
                  strokeDasharray="276.46"
                  strokeDashoffset="22.11"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">92%</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Excellent Match</h3>
            <p className="text-[13px] text-gray-500 max-w-[200px]">
              Highly aligned with your financial goals and risk capacity.
            </p>
          </div>
        </div>

        {/* Why Namaa Selected This */}
        <div className="mb-10">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-5">Why Namaa selected this</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ReasonCard
              icon={<TargetIcon className="w-5 h-5 text-[#00703C]" />}
              title="Aligns with 5-year goal"
              description="Your objective to purchase real estate requires growth that outpaces inflation. This fund targets the exact growth bracket needed."
            />
            <ReasonCard
              icon={<ActivityIcon className="w-5 h-5 text-[#00703C]" />}
              title="Matches risk appetite"
              description="Your responses to market volatility scenarios indicated comfort with moderate-to-high fluctuations for long-term gains."
            />
            <ReasonCard
              icon={<ShieldCheckIcon className="w-5 h-5 text-[#00703C]" />}
              title="Diversification benefit"
              description="You currently hold primarily cash and low-risk deposits. Adding equity exposure balances your overall portfolio."
            />
          </div>
        </div>

        {/* Advantages and Risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Advantages</h3>
            <div className="space-y-3">
              <ChecklistItem text="Expected annual return 8-12% based on historicals" />
              <ChecklistItem text="100% Sharia-compliant investments" />
              <ChecklistItem text="Low management fees (0.75% annually)" />
              <ChecklistItem text="Flexible contribution amounts with auto-invest" />
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Possible Risks</h3>
            <div className="space-y-3">
              <RiskItem text="Market fluctuations may affect short-term returns" />
              <RiskItem text="Minimum 12-month recommended holding period" />
              <RiskItem text="Equities carry higher intrinsic volatility than Sukuk" />
            </div>
          </div>
        </div>

        {/* Next Step / CTA */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#00703C]/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Ready to proceed?</h3>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00703C]"></div>
                <span className="text-[11px] font-medium text-gray-600">Namaa Confidence: 94%</span>
              </div>
            </div>
            <p className="text-[14px] text-gray-500 max-w-lg mb-5">
              You can start investing directly online, or schedule a quick 15-minute consultation with a dedicated wealth advisor to discuss this recommendation.
            </p>
            <div className="w-full max-w-xs h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#00703C] rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
            <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white border border-gray-200 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
              Schedule Advisor
            </button>
            <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#00703C] text-[14px] font-medium text-white hover:bg-[#005e32] transition-colors shadow-sm">
              Apply Online
            </button>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

// Subcomponents

function ReasonCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="w-10 h-10 rounded-lg bg-[#00703C]/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-[14px] font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-[13px] text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="mt-0.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="8" fill="#00703C" fillOpacity="0.1" />
          <path d="M5 8.5L7 10.5L11 5.5" stroke="#00703C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-[14px] text-gray-700">{text}</span>
    </div>
  );
}

function RiskItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FFFBEB]/50 border border-[#FEF3C7]">
      <div className="mt-0.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 5V8.5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 11.5H8.01" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-[14px] text-gray-700">{text}</span>
    </div>
  );
}

// Icons
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
