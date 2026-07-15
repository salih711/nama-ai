import { motion } from "framer-motion";
import { User, Shield, Bell, Lock, Smartphone, Fingerprint, LogOut, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-24 space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground mt-1">إدارة حسابك وتفضيلات المستشار المالي.</p>
      </div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-card-border rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-4 border-background shadow-sm">
          <span className="text-2xl font-bold text-primary">ص</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground mb-1">صالح الحربي</h2>
          <p className="text-sm text-muted-foreground font-medium mb-3">saleh@example.com • 050 XXX XXXX</p>
          <div className="inline-flex px-3 py-1 bg-secondary rounded-lg text-xs font-bold text-foreground">
            حساب مميز
          </div>
        </div>
        <button className="px-5 py-2.5 bg-secondary text-foreground text-sm font-bold rounded-xl hover:bg-secondary/80 transition-colors self-start sm:self-center">
          تعديل الملف
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <SettingsGroup title="تفضيلات نماء (AI)" icon={BrainIcon}>
          <ToggleRow label="تحليل تلقائي للمصروفات" description="السماح لنماء بتصنيف وتحليل مصروفاتك يومياً" checked={true} />
          <ToggleRow label="توصيات استباقية" description="تلقي إشعارات بالفرص الاستثمارية والتمويلية" checked={true} />
          <ToggleRow label="مشاركة بياناتي المجهولة" description="المساهمة في تحسين نماذج الذكاء الاصطناعي" checked={false} />
        </SettingsGroup>

        <SettingsGroup title="الحساب والأمان" icon={Shield}>
          <ToggleRow label="تسجيل الدخول بالبصمة" icon={Fingerprint} checked={true} />
          <ToggleRow label="المصادقة الثنائية (2FA)" icon={Smartphone} checked={true} />
          <ActionRow label="تغيير كلمة المرور" icon={Lock} />
        </SettingsGroup>

        <SettingsGroup title="الإشعارات" icon={Bell}>
          <ToggleRow label="تنبيهات العمليات" checked={true} />
          <ToggleRow label="تحديثات مؤشر الصحة" checked={true} />
          <ToggleRow label="العروض التسويقية" checked={false} />
        </SettingsGroup>

        <SettingsGroup title="المنطقة الخطرة" icon={LogOut} destructive>
          <ActionRow label="تسجيل الخروج من جميع الأجهزة" destructive />
          <ActionRow label="حذف الحساب" destructive />
        </SettingsGroup>

      </div>

      <div className="text-center pt-8 text-xs font-bold text-muted-foreground">
        نماء — مقدم من مصرف الإنماء • الإصدار 1.0.0
      </div>

    </div>
  );
}

function SettingsGroup({ title, icon: Icon, children, destructive }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn(
      "bg-card border rounded-3xl p-6 shadow-sm",
      destructive ? "border-destructive/20 bg-destructive/5" : "border-card-border"
    )}>
      <h3 className={cn("text-sm font-bold mb-5 flex items-center gap-2", destructive ? "text-destructive" : "text-muted-foreground")}>
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

function ToggleRow({ label, description, checked: initialChecked, icon: Icon }: any) {
  const [checked, setChecked] = useState(initialChecked);
  
  return (
    <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setChecked(!checked)}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
        <div>
          <div className="text-sm font-bold text-foreground">{label}</div>
          {description && <div className="text-xs text-muted-foreground mt-0.5">{description}</div>}
        </div>
      </div>
      <div className={cn(
        "w-11 h-6 rounded-full p-1 transition-colors duration-200 shrink-0",
        checked ? "bg-primary" : "bg-secondary"
      )}>
        <div className={cn(
          "w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
          checked ? "-translate-x-5" : "translate-x-0"
        )} />
      </div>
    </div>
  );
}

function ActionRow({ label, icon: Icon, destructive }: any) {
  return (
    <div className="flex items-center justify-between gap-4 cursor-pointer group hover:bg-secondary/50 p-2 -mx-2 rounded-xl transition-colors">
      <div className="flex items-center gap-3">
        {Icon && <Icon className={cn("w-4 h-4", destructive ? "text-destructive" : "text-muted-foreground")} />}
        <div className={cn("text-sm font-bold", destructive ? "text-destructive" : "text-foreground")}>{label}</div>
      </div>
      <ChevronLeft className={cn("w-4 h-4 transition-transform group-hover:-translate-x-1", destructive ? "text-destructive" : "text-muted-foreground")} />
    </div>
  );
}

function BrainIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  );
}

// Needed imports block for Settings
import { useState } from "react";
