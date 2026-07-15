import React from 'react';
import { AppLayout } from "./_shared/AppLayout";
import { CheckCircle2, ChevronRight, Sparkles, Building2, Car, GraduationCap, Home } from 'lucide-react';

export function Financing() {
  return (
    <AppLayout activePage="financing">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">My Financing</h1>
            <p className="text-[14px] text-gray-500 mt-1.5">Manage your active financing and explore new opportunities.</p>
          </div>
          <button className="text-[13px] font-medium text-white bg-[#00703C] hover:bg-[#005e32] transition-colors px-4 py-2.5 rounded-lg shadow-sm">
            Make Early Payment
          </button>
        </header>

        {/* AI Insight Card */}
        <div className="bg-gradient-to-r from-[#00703C]/5 to-transparent border border-[#00703C]/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00703C]/[0.03] rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
          <div className="w-11 h-11 rounded-full bg-[#00703C]/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#00703C]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold text-gray-900">Additional Financing Available</h3>
            <p className="text-[13.5px] text-gray-600 mt-1 leading-relaxed">
              Based on your current income and excellent repayment history, you qualify for an additional <strong className="text-gray-900 font-semibold">SAR 150,000</strong> with preferential rates.
            </p>
          </div>
          <button className="shrink-0 text-[13px] font-medium text-[#00703C] bg-white border border-[#00703C]/20 hover:bg-gray-50 transition-colors px-4 py-2 rounded-lg shadow-sm">
            Explore Options
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Active Financing */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-gray-50/50 rounded-bl-[100px] -z-10"></div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                    <Home className="w-7 h-7 text-gray-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Home Financing</h2>
                    <div className="flex items-center gap-2.5 mt-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"></span> Active
                      </span>
                      <span className="text-[13px] text-gray-500 font-medium">Contract #492810482</span>
                    </div>
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-[12px] text-gray-500 font-medium tracking-wide uppercase mb-1">Monthly Installment</div>
                  <div className="text-2xl font-bold text-gray-900 tracking-tight">SAR 4,200</div>
                  <div className="text-[12px] text-gray-400 mt-1 font-medium">Next payment: <span className="text-gray-600">Oct 25, 2023</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-t border-gray-50">
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <div className="flex justify-between text-[13px] mb-2.5">
                      <span className="text-gray-500 font-medium">Repayment Progress</span>
                      <span className="font-bold text-gray-900">27% Paid</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00703C] rounded-full transition-all duration-1000 ease-out" style={{ width: '27%' }}></div>
                    </div>
                    <div className="flex justify-between text-[12px] text-gray-400 mt-2.5 font-medium">
                      <span>SAR 230,000 paid</span>
                      <span>SAR 620,000 remaining</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100/50">
                      <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1">Original Amount</div>
                      <div className="text-[14px] font-bold text-gray-900">SAR 850,000</div>
                    </div>
                    <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-100/50">
                      <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1">Time Remaining</div>
                      <div className="text-[14px] font-bold text-gray-900">7 Years</div>
                    </div>
                  </div>
                </div>

                {/* Breakdown SVG */}
                <div className="flex items-center justify-center sm:justify-end gap-6">
                  <div className="relative w-[120px] h-[120px] shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                      {/* Background Circle */}
                      <path
                        className="text-gray-50"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      {/* Insurance: 5% (5% of 100 = 5) */}
                      <path
                        className="text-gray-200 transition-all duration-1000"
                        strokeDasharray="100, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {/* Profit: 30% (so length is 95 to cover 5+30=35 but we draw backwards? 
                          Wait, simple way: stack them. 
                          1. 100% total (all colored)
                          2. Profit+Principal (95%)
                          3. Principal only (65%)
                      */}
                      <path
                        className="text-[#00703C]/20 transition-all duration-1000"
                        strokeDasharray="95, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        className="text-[#00703C] transition-all duration-1000"
                        strokeDasharray="65, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">Breakdown</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3.5 max-w-[140px]">
                    <div className="flex justify-between items-center text-[13px]">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00703C] shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Principal</span>
                      </div>
                      <span className="font-bold text-gray-900">SAR 2,730</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00703C]/20 shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Profit</span>
                      </div>
                      <span className="font-bold text-gray-900">SAR 1,260</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 shadow-sm"></div>
                        <span className="text-gray-600 font-medium">Insurance</span>
                      </div>
                      <span className="font-bold text-gray-900">SAR 210</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Payments Schedule */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[16px] font-semibold text-gray-900">Payment Schedule</h3>
                <button className="text-[13px] font-semibold text-[#00703C] hover:text-[#005e32] transition-colors">View Complete History</button>
              </div>

              <div className="relative">
                <div className="absolute top-4 left-[15px] bottom-4 w-px bg-gray-100"></div>
                <div className="space-y-1">
                  {[
                    { date: 'Oct 25, 2023', status: 'upcoming', amount: '4,200', active: true },
                    { date: 'Nov 25, 2023', status: 'upcoming', amount: '4,200' },
                    { date: 'Dec 25, 2023', status: 'upcoming', amount: '4,200' },
                    { date: 'Sep 25, 2023', status: 'paid', amount: '4,200' },
                  ].map((payment, i) => (
                    <div key={i} className="flex items-start gap-5 relative py-2.5 group">
                      <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 z-10 border-[3px] border-white shadow-sm ${
                        payment.status === 'paid' ? 'bg-[#00703C]/10' : 
                        payment.active ? 'bg-[#00703C]' : 'bg-gray-100'
                      }`}>
                        {payment.status === 'paid' ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00703C]" />
                        ) : (
                          <div className={`w-2 h-2 rounded-full ${payment.active ? 'bg-white' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                      <div className={`flex-1 flex justify-between items-center p-3.5 -mt-1.5 rounded-xl transition-all ${
                        payment.active 
                          ? 'bg-[#00703C]/[0.03] border border-[#00703C]/10 shadow-[0_1px_2px_rgba(0,112,60,0.03)]' 
                          : 'hover:bg-gray-50 border border-transparent cursor-pointer'
                      }`}>
                        <div>
                          <div className={`text-[14px] font-semibold ${
                            payment.active ? 'text-[#00703C]' : 
                            payment.status === 'paid' ? 'text-gray-500' : 'text-gray-900'
                          }`}>{payment.date}</div>
                          <div className={`text-[12.5px] mt-0.5 font-medium ${
                            payment.active ? 'text-[#00703C]/70' : 'text-gray-400'
                          }`}>
                            {payment.status === 'paid' ? 'Paid successfully' : 'Scheduled deduction'}
                          </div>
                        </div>
                        <div className={`text-[14px] font-bold ${
                          payment.status === 'paid' ? 'text-gray-400' : 'text-gray-900'
                        }`}>
                          SAR {payment.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Explore More */}
          <div className="space-y-5">
            <h3 className="text-[15px] font-semibold text-gray-900 flex items-center gap-2.5 ml-1">
              <div className="w-1.5 h-4 bg-[#00703C] rounded-full"></div>
              Explore More Financing
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  title: 'Personal Financing',
                  icon: <Building2 className="w-5 h-5" />,
                  rate: 'from 2.49%',
                  amount: 'Up to SAR 1.5M',
                  est: 'SAR 1,800/mo'
                },
                {
                  title: 'Car Financing',
                  icon: <Car className="w-5 h-5" />,
                  rate: 'from 3.10%',
                  amount: 'Up to SAR 500K',
                  est: 'SAR 1,200/mo'
                },
                {
                  title: 'Education Financing',
                  icon: <GraduationCap className="w-5 h-5" />,
                  rate: '0% Profit Margin',
                  amount: 'Up to SAR 200K',
                  est: 'SAR 800/mo'
                }
              ].map((prod, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-[#00703C]/30 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00703C]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  
                  <div className="flex items-start gap-4 mb-4 relative">
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#00703C]/10 group-hover:border-[#00703C]/10 transition-colors shadow-sm">
                      {React.cloneElement(prod.icon, { className: 'text-gray-600 group-hover:text-[#00703C] transition-colors' })}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h4 className="text-[14px] font-bold text-gray-900 group-hover:text-[#00703C] transition-colors">{prod.title}</h4>
                      <div className="inline-flex items-center text-[11px] text-[#00703C] font-semibold mt-1 bg-[#00703C]/5 px-2 py-0.5 rounded-md border border-[#00703C]/10">
                        {prod.rate}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#00703C] transition-colors mt-1" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50 relative">
                    <div>
                      <div className="text-[11px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Max Amount</div>
                      <div className="text-[13px] font-bold text-gray-900">{prod.amount}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Est. Payment</div>
                      <div className="text-[13px] font-bold text-gray-900">{prod.est}</div>
                    </div>
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
