import React from "react";
import { AppLayout } from "./_shared/AppLayout";

export function Reports() {
  return (
    <AppLayout activePage="reports">
      <div className="max-w-[1200px] mx-auto px-10 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Financial Reports</h1>
            <p className="text-sm text-gray-500 mt-1">Analytics and insights for your accounts</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              July 2026
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export PDF
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          <StatCard 
            title="Total Income" 
            amount="SAR 18,500" 
            trend="+2.4%" 
            trendDirection="up"
            trendType="good"
          />
          <StatCard 
            title="Total Expenses" 
            amount="SAR 14,230" 
            trend="-1.2%" 
            trendDirection="down"
            trendType="good"
          />
          <StatCard 
            title="Net Savings" 
            amount="SAR 4,270" 
            trend="+14.5%" 
            trendDirection="up"
            trendType="good"
          />
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Chart Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-100" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-semibold text-gray-900">Monthly Spending Analysis</h2>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <div className="w-2.5 h-2.5 rounded-sm bg-gray-200"></div> Previous Month
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#00703C]"></div> Current Month
                  </div>
                </div>
              </div>
              
              <div className="h-[240px] w-full flex items-end justify-between pt-4 pb-2 border-b border-gray-100 relative">
                {/* Y-Axis Guidelines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2">
                  {[5000, 4000, 3000, 2000, 1000, 0].map((val, i) => (
                    <div key={i} className="flex items-center w-full">
                      <span className="text-[10px] text-gray-400 w-10 text-right pr-3">{val === 0 ? '0' : `${val / 1000}k`}</span>
                      <div className="flex-1 border-t border-gray-100 border-dashed"></div>
                    </div>
                  ))}
                </div>

                {/* Bars */}
                <div className="relative z-10 flex flex-1 justify-around items-end h-full px-8 pb-1">
                  <ChartGroup label="Housing" val1={100} val2={100} />
                  <ChartGroup label="Food" val1={60} val2={64} />
                  <ChartGroup label="Transport" val1={36} val2={30} />
                  <ChartGroup label="Shopping" val1={30} val2={42} />
                  <ChartGroup label="Utilities" val1={18} val2={16} />
                </div>
              </div>
            </div>

            {/* Spending Breakdown Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' }}>
              <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-gray-900">Spending Breakdown</h2>
                <button className="text-[13px] text-[#00703C] font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 w-2/5">Category</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500">Amount</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500">Budget</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <TableRow 
                      icon="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"
                      category="Housing & Rent" 
                      percentage="35%"
                      amount="SAR 5,000" 
                      budget="SAR 5,000"
                      trend="even" 
                      color="bg-blue-100 text-blue-600"
                    />
                    <TableRow 
                      icon="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z M8 7h6 M8 11h8"
                      category="Groceries & Dining" 
                      percentage="22%"
                      amount="SAR 3,200" 
                      budget="SAR 3,000"
                      trend="up" 
                      color="bg-orange-100 text-orange-600"
                    />
                    <TableRow 
                      icon="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19M23 13v-2M11 6l-4 6h6l-4 6"
                      category="Transportation" 
                      percentage="10%"
                      amount="SAR 1,500" 
                      budget="SAR 1,800"
                      trend="down" 
                      color="bg-teal-100 text-teal-600"
                    />
                    <TableRow 
                      icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      category="Shopping" 
                      percentage="15%"
                      amount="SAR 2,100" 
                      budget="SAR 1,500"
                      trend="up" 
                      color="bg-purple-100 text-purple-600"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* AI Suggestions */}
            <div className="bg-[#00703C] rounded-xl p-6 text-white relative overflow-hidden" style={{ boxShadow: '0 4px 12px rgba(0,112,60,0.15)' }}>
              {/* Decorative background shape */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"></div>
              
              <div className="flex items-center gap-2.5 mb-5 relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-200">
                  <path d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z" fill="currentColor" fillOpacity="0.4" />
                </svg>
                <h2 className="text-[15px] font-semibold">Namaa Insights</h2>
              </div>
              
              <div className="space-y-3 relative z-10">
                <SuggestionCard 
                  text="Reduce dining expenses by SAR 400 to stay on track for your Home Down Payment goal."
                />
                <SuggestionCard 
                  text="Your electricity bill is 40% above average for this season. Review energy usage."
                />
                <SuggestionCard 
                  text="You have SAR 1,200 idle cash. Automate investment to maximize returns."
                />
              </div>
            </div>

            {/* Financial Goals */}
            <div className="bg-white rounded-xl border border-gray-100 p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-semibold text-gray-900">Financial Goals</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <GoalProgress 
                  title="Emergency Fund" 
                  current="SAR 34,000" 
                  target="SAR 50,000" 
                  percentage={68} 
                  color="bg-[#00703C]"
                />
                <GoalProgress 
                  title="Home Down Payment" 
                  current="SAR 85,000" 
                  target="SAR 250,000" 
                  percentage={34} 
                  color="bg-[#00703C]"
                />
                <GoalProgress 
                  title="Vacation Fund" 
                  current="SAR 13,800" 
                  target="SAR 15,000" 
                  percentage={92} 
                  color="bg-amber-500"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Sub-components

function StatCard({ title, amount, trend, trendDirection, trendType }: { title: string, amount: string, trend: string, trendDirection: 'up' | 'down', trendType: 'good' | 'bad' }) {
  const isGood = trendType === 'good';
  const colorClass = isGood ? 'text-[#00703C] bg-green-50' : 'text-red-600 bg-red-50';
  
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col justify-between" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' }}>
      <div className="text-[13px] font-medium text-gray-500 mb-1">{title}</div>
      <div className="flex items-end justify-between mt-2">
        <div className="text-2xl font-bold text-gray-900 tracking-tight">{amount}</div>
        <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md ${colorClass}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={trendDirection === 'down' ? 'rotate-180' : ''}>
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
          {trend}
        </div>
      </div>
    </div>
  );
}

function ChartGroup({ label, val1, val2 }: { label: string, val1: number, val2: number }) {
  return (
    <div className="flex flex-col items-center h-full justify-end group">
      <div className="flex items-end gap-1.5 h-full pb-2">
        <div 
          className="w-5 bg-gray-200 rounded-t-sm transition-all duration-300"
          style={{ height: `${val1}%` }}
        ></div>
        <div 
          className="w-5 bg-[#00703C] rounded-t-sm transition-all duration-300 group-hover:bg-[#008A4A]"
          style={{ height: `${val2}%` }}
        ></div>
      </div>
      <span className="text-[11px] font-medium text-gray-500 mt-2">{label}</span>
    </div>
  );
}

function TableRow({ icon, category, percentage, amount, budget, trend, color }: any) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={icon} />
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-medium text-gray-900">{category}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{percentage} of spending</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-[13px] font-semibold text-gray-900">{amount}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-[13px] text-gray-500">{budget}</div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="inline-flex items-center justify-end w-full">
          {trend === 'up' && (
            <div className="flex items-center gap-1 text-red-600 text-[12px] font-medium bg-red-50 px-2 py-1 rounded">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
              Over
            </div>
          )}
          {trend === 'down' && (
            <div className="flex items-center gap-1 text-[#00703C] text-[12px] font-medium bg-green-50 px-2 py-1 rounded">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
              Under
            </div>
          )}
          {trend === 'even' && (
            <div className="flex items-center gap-1 text-gray-500 text-[12px] font-medium bg-gray-100 px-2 py-1 rounded">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              On track
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function SuggestionCard({ text }: { text: string }) {
  return (
    <div className="bg-white/10 hover:bg-white/15 transition-colors border border-white/10 rounded-lg p-3.5 backdrop-blur-sm cursor-pointer flex gap-3">
      <div className="mt-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-green-300"></div>
      </div>
      <p className="text-[13px] text-green-50 leading-relaxed font-medium">
        {text}
      </p>
    </div>
  );
}

function GoalProgress({ title, current, target, percentage, color }: any) {
  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <div>
          <div className="text-[13px] font-medium text-gray-900 mb-0.5">{title}</div>
          <div className="text-[11px] text-gray-500">{current} <span className="text-gray-300 mx-0.5">/</span> {target}</div>
        </div>
        <div className="text-[12px] font-bold text-gray-900">{percentage}%</div>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
