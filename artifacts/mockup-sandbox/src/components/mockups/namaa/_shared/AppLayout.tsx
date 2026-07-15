import { ReactNode } from "react";

const navItems = [
  { label: "Dashboard", icon: "⬛", key: "dashboard" },
  { label: "AI Agent", icon: "✦", key: "ai-agent" },
  { label: "Cards", icon: "▭", key: "cards" },
  { label: "Financing", icon: "◈", key: "financing" },
  { label: "Investments", icon: "◬", key: "investments" },
  { label: "Financial Health", icon: "◎", key: "financial-health" },
  { label: "Reports", icon: "▤", key: "reports" },
  { label: "Settings", icon: "◌", key: "settings" },
];

interface AppLayoutProps {
  children: ReactNode;
  activePage?: string;
}

export function AppLayout({ children, activePage }: AppLayoutProps) {
  return (
    <div
      style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
      className="flex h-screen bg-[#F8F9FA] overflow-hidden"
    >
      {/* Sidebar */}
      <aside className="w-[220px] min-w-[220px] bg-white border-r border-gray-100 flex flex-col h-full shadow-[1px_0_0_0_#F0F0F0]">
        {/* Brand */}
        <div className="px-6 pt-7 pb-6 border-b border-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00703C] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 6V10L8 14L2 10V6L8 2Z" fill="white" fillOpacity="0.9" />
                <path d="M8 5L11 7V9L8 11L5 9V7L8 5Z" fill="white" />
              </svg>
            </div>
            <div>
              <div className="text-[15px] font-semibold text-gray-900 leading-tight tracking-tight">نماء</div>
              <div className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Namaa · Alinma</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePage === item.key;
            return (
              <div
                key={item.key}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? "bg-[#00703C]/8 text-[#00703C]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <span
                  className={`text-base leading-none ${isActive ? "text-[#00703C]" : "text-gray-400"}`}
                  style={{ fontFamily: "monospace" }}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-[13px] font-medium leading-none ${
                    isActive ? "text-[#00703C] font-semibold" : ""
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00703C]" />
                )}
              </div>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="px-3 pb-5 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#00703C]/15 flex items-center justify-center">
              <span className="text-[11px] font-bold text-[#00703C]">SA</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-gray-800 leading-tight truncate">Saleh Alharbi</div>
              <div className="text-[10px] text-gray-400 leading-tight">Premium Account</div>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-300">
              <path d="M4 5L6 7L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
