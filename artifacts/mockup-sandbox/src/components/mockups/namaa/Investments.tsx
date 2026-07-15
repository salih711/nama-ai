import React from "react";
import { AppLayout } from "./_shared/AppLayout";
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  RefreshCw,
  ArrowDownToLine,
  Sparkles,
  MoreHorizontal,
  Building2,
  Landmark,
  Coins,
  Cpu,
  BarChart3
} from "lucide-react";

export function Investments() {
  return (
    <AppLayout activePage="investments">
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8 animate-in fade-in duration-500" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
        
        {/* Header & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">محفظتي الاستثمارية</h1>
            <p className="text-sm text-gray-500 mt-1">إدارة ثروتك ومتابعة أدائها.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
              <ArrowDownToLine className="w-4 h-4" />
              سحب
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
              <RefreshCw className="w-4 h-4" />
              إعادة التوازن
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-[#00703C] hover:bg-[#005e32] transition-colors shadow-sm shadow-[#00703C]/20">
              <Plus className="w-4 h-4" />
              إضافة أموال
            </button>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-[#00703C]/[0.04] border border-[#00703C]/10 rounded-xl p-4 flex gap-4 items-start shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#00703C]/10 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#00703C]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#00703C]">رؤية نماء</h3>
            <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">
              محفظتك تزيد في الأسهم بنسبة 12% عن الحد الموصى به — قد يكون من المفيد إعادة التوازن.
            </p>
          </div>
          <button className="text-sm font-medium text-[#00703C] hover:text-[#005e32] px-3 py-1.5 rounded-md bg-white border border-[#00703C]/20 hover:bg-[#00703C]/5 transition-colors shadow-sm whitespace-nowrap">
            مراجعة الهدف
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Portfolio Performance (Span 2) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
            <div className="p-6 pb-2">
              <div className="text-sm font-medium text-gray-500 mb-1">أداء المحفظة — 6 أشهر</div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
                  <span className="text-gray-400 text-xl font-medium mr-1 ml-1">ريال</span>
                  48,320.00
                </h2>
                <div className="flex items-center gap-1 text-sm font-medium text-[#00703C] bg-[#00703C]/10 px-2 py-0.5 rounded" dir="ltr">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+340.00 (+0.71%)</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1">اليوم</div>
            </div>

            {/* Chart Area */}
            <div className="h-[200px] w-full mt-4 relative px-6">
              <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00703C" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#00703C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,200 L0,168 C 40,168 60,152 100,152 C 140,152 160,133.9 200,133.9 C 240,133.9 260,109.4 300,109.4 C 340,109.4 360,92.3 400,92.3 C 440,92.3 460,57.9 500,57.9 L500,200 Z" 
                  fill="url(#gradientArea)" 
                />
                <path 
                  d="M0,168 C 40,168 60,152 100,152 C 140,152 160,133.9 200,133.9 C 240,133.9 260,109.4 300,109.4 C 340,109.4 360,92.3 400,92.3 C 440,92.3 460,57.9 500,57.9" 
                  fill="none" 
                  stroke="#00703C" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                
                {/* Dotted horizontal lines for grid */}
                <line x1="0" y1="160" x2="500" y2="160" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* X axis labels (approximate positions) */}
                <text x="0" y="190" fill="#9CA3AF" fontSize="10" fontFamily="sans-serif">يناير</text>
                <text x="100" y="190" fill="#9CA3AF" fontSize="10" fontFamily="sans-serif">فبراير</text>
                <text x="200" y="190" fill="#9CA3AF" fontSize="10" fontFamily="sans-serif">مارس</text>
                <text x="300" y="190" fill="#9CA3AF" fontSize="10" fontFamily="sans-serif">أبريل</text>
                <text x="400" y="190" fill="#9CA3AF" fontSize="10" fontFamily="sans-serif">مايو</text>
                <text x="480" y="190" fill="#9CA3AF" fontSize="10" fontFamily="sans-serif">يونيو</text>

                {/* Latest data point dot */}
                <circle cx="500" cy="57.9" r="4" fill="#00703C" stroke="white" strokeWidth="2" />
              </svg>
            </div>

            {/* Performance Metrics Row */}
            <div className="grid grid-cols-3 divide-x divide-x-reverse divide-gray-100 border-t border-gray-100 mt-auto bg-gray-50/50">
              <div className="px-6 py-4">
                <div className="text-xs text-gray-500 mb-1">إجمالي العائد</div>
                <div className="text-sm font-semibold text-[#00703C]" dir="ltr">+12.4%</div>
              </div>
              <div className="px-6 py-4">
                <div className="text-xs text-gray-500 mb-1">العائد السنوي</div>
                <div className="text-sm font-semibold text-[#00703C]" dir="ltr">+8.2%</div>
              </div>
              <div className="px-6 py-4">
                <div className="text-xs text-gray-500 mb-1">الربح غير المحقق</div>
                <div className="text-sm font-semibold text-[#00703C]">5,230 ريال</div>
              </div>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-6 flex flex-col">
            <h3 className="text-base font-semibold text-gray-900 mb-6">توزيع الأصول</h3>
            
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg viewBox="0 0 40 40" className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#F3F4F6" strokeWidth="6" />
                
                {/* Cash: 10% (Starts at -65 offset) */}
                <circle 
                  cx="20" cy="20" r="15.9155" fill="none" 
                  stroke="#E5E7EB" strokeWidth="6" 
                  strokeDasharray="10 90" strokeDashoffset="-65"
                  className="transition-all duration-1000 ease-out" 
                />
                
                {/* Real Estate: 15% (Starts at -50 offset) */}
                <circle 
                  cx="20" cy="20" r="15.9155" fill="none" 
                  stroke="#85C7A5" strokeWidth="6" 
                  strokeDasharray="15 85" strokeDashoffset="-50" 
                  className="transition-all duration-1000 ease-out"
                />

                {/* Sukuk: 30% (Starts at -20 offset) */}
                <circle 
                  cx="20" cy="20" r="15.9155" fill="none" 
                  stroke="#2E9E66" strokeWidth="6" 
                  strokeDasharray="30 70" strokeDashoffset="-20" 
                  className="transition-all duration-1000 ease-out"
                />

                {/* Stocks: 45% (Starts at 25 offset = 0 in transformed coords) */}
                <circle 
                  cx="20" cy="20" r="15.9155" fill="none" 
                  stroke="#00703C" strokeWidth="6" 
                  strokeDasharray="45 55" strokeDashoffset="25" 
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-gray-400 font-medium">أصول</span>
                <span className="text-lg font-bold text-gray-900 mt-0.5">4</span>
              </div>
            </div>

            <div className="space-y-3 mt-auto">
              <AllocationRow color="#00703C" label="أسهم" percentage="45%" value="21,744 ريال" />
              <AllocationRow color="#2E9E66" label="صكوك" percentage="30%" value="14,496 ريال" />
              <AllocationRow color="#85C7A5" label="صندوق عقاري" percentage="15%" value="7,248 ريال" />
              <AllocationRow color="#E5E7EB" label="نقد" percentage="10%" value="4,832 ريال" />
            </div>
          </div>
        </div>

        {/* Holdings List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">المراكز الاستثمارية</h3>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              عرض الكل
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-5"></th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">الأصل</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">التوزيع</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">القيمة (ريال)</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">العائد</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <HoldingRow 
                  icon={<BarChart3 className="w-4 h-4 text-[#00703C]" />}
                  iconBg="bg-[#00703C]/10"
                  name="صندوق أهلي للمؤشرات"
                  ticker="ALINMAETF"
                  allocation="35%"
                  value="16,912.00"
                  returnValue="+14.2%"
                  returnPositive={true}
                />
                <HoldingRow 
                  icon={<Landmark className="w-4 h-4 text-[#2E9E66]" />}
                  iconBg="bg-[#2E9E66]/10"
                  name="صندوق صكوك سعودية"
                  ticker="KSA-SUKUK"
                  allocation="30%"
                  value="14,496.00"
                  returnValue="+4.1%"
                  returnPositive={true}
                />
                <HoldingRow 
                  icon={<Building2 className="w-4 h-4 text-[#85C7A5]" />}
                  iconBg="bg-[#85C7A5]/10"
                  name="ريت الراجحي"
                  ticker="RAJHIREIT"
                  allocation="15%"
                  value="7,248.00"
                  returnValue="+6.5%"
                  returnPositive={true}
                />
                <HoldingRow 
                  icon={<Cpu className="w-4 h-4 text-[#00703C]" />}
                  iconBg="bg-[#00703C]/10"
                  name="صندوق قطاع التقنية"
                  ticker="GLB-TECH"
                  allocation="10%"
                  value="4,832.00"
                  returnValue="+21.4%"
                  returnPositive={true}
                />
                <HoldingRow 
                  icon={<Coins className="w-4 h-4 text-gray-500" />}
                  iconBg="bg-gray-100"
                  name="نقد"
                  ticker="CASH"
                  allocation="10%"
                  value="4,832.00"
                  returnValue="0.00%"
                  returnPositive={null}
                />
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

function AllocationRow({ color, label, percentage, value }: { color: string, label: string, percentage: string, value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-gray-900 font-semibold">{percentage}</span>
        <span className="text-gray-400 text-xs">{value}</span>
      </div>
    </div>
  );
}

function HoldingRow({ 
  icon, 
  iconBg,
  name, 
  ticker, 
  allocation, 
  value, 
  returnValue, 
  returnPositive 
}: { 
  icon: React.ReactNode, 
  iconBg: string,
  name: string, 
  ticker: string, 
  allocation: string, 
  value: string, 
  returnValue: string, 
  returnPositive: boolean | null 
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors group cursor-pointer">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">{name}</div>
        <div className="text-xs text-gray-400 mt-0.5">{ticker}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className="text-sm font-medium text-gray-900">{allocation}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className="text-sm font-semibold text-gray-900">{value}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className={`text-sm font-medium flex items-center justify-end gap-1 ${
          returnPositive === true ? "text-[#00703C]" : 
          returnPositive === false ? "text-red-600" : "text-gray-500"
        }`} dir="ltr">
          {returnValue}
          {returnPositive === true && <ArrowUpRight className="w-3.5 h-3.5" />}
          {returnPositive === false && <ArrowDownRight className="w-3.5 h-3.5" />}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <button className="text-gray-400 hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}
