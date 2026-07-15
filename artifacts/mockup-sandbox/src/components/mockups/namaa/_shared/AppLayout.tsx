import { ReactNode } from "react";

const navItems = [
  { label: "الرئيسية", icon: "⬛", key: "dashboard" },
  { label: "نماء AI", icon: "✦", key: "ai-agent" },
  { label: "البطاقات", icon: "▭", key: "cards" },
  { label: "التمويل", icon: "◈", key: "financing" },
  { label: "الاستثمار", icon: "◬", key: "investments" },
  { label: "مؤشر الصحة المالية", icon: "◎", key: "financial-health" },
  { label: "التقارير", icon: "▤", key: "reports" },
  { label: "الإعدادات", icon: "◌", key: "settings" },
];

interface AppLayoutProps {
  children: ReactNode;
  activePage?: string;
}

export function AppLayout({ children, activePage }: AppLayoutProps) {
  return (
    <div
      dir="rtl"
      lang="ar"
      style={{ fontFamily: "'Tajawal', 'Cairo', -apple-system, sans-serif" }}
      className="flex h-screen bg-[#F7F8FA] overflow-hidden"
    >
      {/* Sidebar — appears on RIGHT in RTL */}
      <aside className="w-[200px] min-w-[200px] bg-white border-l border-[#EBEBEB] flex flex-col h-full">
        {/* Brand */}
        <div className="px-5 pt-6 pb-5 border-b border-[#F2F2F2]">
          <div className="flex items-center gap-3">
            {/* Alinma-style logo mark */}
            <div className="w-9 h-9 rounded-xl bg-[#00703C] flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3L17 7.5V12.5L10 17L3 12.5V7.5L10 3Z" fill="white" fillOpacity="0.25" />
                <path d="M10 5.5L15 8.75V11.25L10 14.5L5 11.25V8.75L10 5.5Z" fill="white" fillOpacity="0.5" />
                <path d="M10 8L13 9.75V10.25L10 12L7 10.25V9.75L10 8Z" fill="white" />
              </svg>
            </div>
            <div>
              <div
                style={{ fontFamily: "'Tajawal', sans-serif" }}
                className="text-[17px] font-bold text-[#111827] leading-tight"
              >
                نماء
              </div>
              <div className="text-[10px] text-[#00703C] font-medium tracking-wide leading-tight">
                البنك الأهلي
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePage === item.key;
            return (
              <div
                key={item.key}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  isActive
                    ? "bg-[#00703C]/[0.07] text-[#00703C]"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#374151]"
                }`}
              >
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-[#00703C] mr-0.5" />
                )}
                <span
                  className={`text-[13px] font-medium leading-snug ${
                    isActive ? "text-[#00703C] font-semibold" : ""
                  }`}
                  style={{ fontFamily: "'Tajawal', sans-serif" }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Divider + Alinma badge */}
        <div className="px-4 py-3 border-t border-[#F2F2F2]">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-4 h-4 rounded bg-[#00703C]/10 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" fill="#00703C" />
              </svg>
            </div>
            <span className="text-[10px] text-[#00703C] font-semibold tracking-wide">
              منتج البنك الأهلي
            </span>
          </div>

          {/* User row */}
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#00703C]/15 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-[#00703C]">ص</span>
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[12px] font-semibold text-[#111827] leading-tight truncate"
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                صالح الحربي
              </div>
              <div className="text-[10px] text-[#9CA3AF] leading-tight">حساب مميز</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
