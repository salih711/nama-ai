import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  Sparkles, 
  LayoutGrid,
  CreditCard, 
  Landmark, 
  LineChart, 
  Activity, 
  FileText, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "الرئيسية", icon: Home, href: "/" },
  { label: "نماء AI", icon: Sparkles, href: "/ai" },
  { label: "خدمات نماء", icon: LayoutGrid, href: "/services" },
  { label: "البطاقات", icon: CreditCard, href: "/cards" },
  { label: "التمويل", icon: Landmark, href: "/financing" },
  { label: "الاستثمار", icon: LineChart, href: "/investments" },
  { label: "مؤشر الصحة المالية", icon: Activity, href: "/financial-health" },
  { label: "التقارير", icon: FileText, href: "/reports" },
  { label: "الإعدادات", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-56 bg-sidebar border-l border-sidebar-border flex flex-col h-full shrink-0 relative z-20">
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3L17 7.5V12.5L10 17L3 12.5V7.5L10 3Z" fill="white" fillOpacity="0.25" />
              <path d="M10 5.5L15 8.75V11.25L10 14.5L5 11.25V8.75L10 5.5Z" fill="white" fillOpacity="0.5" />
              <path d="M10 8L13 9.75V10.25L10 12L7 10.25V9.75L10 8Z" fill="white" />
            </svg>
          </div>
          <div>
            <div className="text-[17px] font-bold text-foreground leading-tight">
              نماء
            </div>
            <div className="text-[10px] text-primary font-medium tracking-wide leading-tight">
              مصرف الإنماء
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-[18px] h-[18px]", isActive ? "text-primary" : "text-sidebar-foreground/70")} />
                <span className={cn("text-[13px] font-medium leading-snug", isActive && "font-bold")}>
                  {item.label}
                </span>
                {item.href === "/ai-agent" && (
                  <span className="mr-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer User */}
      <div className="px-4 py-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="3" fill="currentColor" className="text-primary" />
            </svg>
          </div>
          <span className="text-[10px] text-primary font-semibold tracking-wide">
            منتج مصرف الإنماء
          </span>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-secondary cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">ص</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-foreground leading-tight truncate">
              صالح
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">حساب مميز</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
