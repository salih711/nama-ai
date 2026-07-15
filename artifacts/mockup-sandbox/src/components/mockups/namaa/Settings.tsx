import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";

function Toggle({ checked, onChange }: { checked?: boolean; onChange?: (checked: boolean) => void }) {
  const [isOn, setIsOn] = useState(checked || false);

  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onChange?.(newState);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={toggle}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00703C] focus:ring-offset-2 ${
        isOn ? "bg-[#00703C]" : "bg-gray-200"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          isOn ? "-translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SettingsRow({
  title,
  description,
  control,
  isLast,
  danger,
}: {
  title: string;
  description?: string;
  control?: React.ReactNode;
  isLast?: boolean;
  danger?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-4 ${isLast ? "" : "border-b border-gray-100"}`}>
      <div className="flex flex-col gap-0.5">
        <span className={`text-[14px] font-medium ${danger ? "text-red-600" : "text-[#111827]"}`}>{title}</span>
        {description && <span className="text-[13px] text-[#6B7280]">{description}</span>}
      </div>
      {control ? (
        <div className="mr-4">{control}</div>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400 rotate-180">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3 px-1">{title}</h2>
      <div className="bg-white rounded-2xl border border-[#F0F0F0] px-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        {children}
      </div>
    </div>
  );
}

export function Settings() {
  return (
    <AppLayout activePage="settings">
      <div className="max-w-3xl mx-auto py-12 px-8" style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}>
        <h1 className="text-2xl font-semibold text-[#111827] mb-8">الإعدادات</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6 mb-10 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#00703C]/10 flex items-center justify-center text-[#00703C] text-xl font-semibold">
              ص
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[#111827] mb-1">صالح الحربي</h2>
              <div className="text-[14px] text-[#6B7280] flex flex-col sm:flex-row sm:gap-4 gap-1">
                <span className="flex items-center gap-1.5" dir="ltr">
                  saleh.alharbi@example.com
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="flex items-center gap-1.5" dir="ltr">
                  +966 50 123 4567
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#F8F9FA] hover:bg-[#F0F0F0] text-[#111827] text-[13px] font-medium rounded-lg transition-colors border border-gray-200">
            تعديل
          </button>
        </div>

        {/* Account & Security */}
        <SettingsSection title="الحساب والأمان">
          <SettingsRow title="تغيير كلمة المرور" description="تحديث كلمة مرور حسابك" />
          <SettingsRow
            title="المصادقة الثنائية"
            description="إضافة طبقة أمان إضافية لحسابك"
            control={<Toggle checked={true} />}
          />
          <SettingsRow
            title="بصمة الإصبع"
            description="استخدام بصمة الوجه أو الإصبع لتسجيل الدخول السريع"
            control={<Toggle checked={true} />}
          />
          <SettingsRow title="الأجهزة المرتبطة" description="عرض وإدارة الجلسات النشطة" isLast={true} />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="الإشعارات">
          <SettingsRow title="إشعارات البريد الإلكتروني" description="تلقي التحديثات والتقارير عبر البريد" control={<Toggle checked={true} />} />
          <SettingsRow title="إشعارات التطبيق" description="تنبيهات فورية على جهازك المحمول" control={<Toggle checked={true} />} />
          <SettingsRow title="رسائل SMS" description="تنبيهات أمنية ومعاملات هامة" control={<Toggle checked={false} />} />
          <SettingsRow
            title="تنبيهات الإنفاق"
            description="إشعاري عندما تتجاوز المعاملة مبلغًا معينًا"
            control={
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500">أعلى من</span>
                <select className="bg-[#F8F9FA] border border-gray-200 text-[#111827] text-[13px] rounded-md px-3 py-1.5 outline-none focus:border-[#00703C] text-left" dir="ltr">
                  <option>1,000 ريال</option>
                  <option>5,000 ريال</option>
                  <option>10,000 ريال</option>
                </select>
              </div>
            }
            isLast={true}
          />
        </SettingsSection>

        {/* Namaa Preferences */}
        <SettingsSection title="تفضيلات نماء">
          <SettingsRow
            title="توصيات الذكاء الاصطناعي"
            description="السماح لنماء بتحليل نفقاتك واقتراح مدخرات"
            control={<Toggle checked={true} />}
          />
          <SettingsRow
            title="تقارير الصحة المالية"
            description="كم مرة يجب أن يُصدر نماء تقريرك الشامل"
            control={
              <select className="bg-[#F8F9FA] border border-gray-200 text-[#111827] text-[13px] rounded-md px-3 py-1.5 outline-none focus:border-[#00703C]">
                <option>أسبوعياً</option>
                <option>شهرياً</option>
                <option>ربع سنوياً</option>
              </select>
            }
          />
          <SettingsRow
            title="اللغة"
            description="تعيين لغتك المفضلة للواجهة وردود الذكاء الاصطناعي"
            control={
              <div className="flex bg-[#F8F9FA] p-0.5 rounded-lg border border-gray-200">
                <button className="px-3 py-1 bg-white shadow-sm rounded-md text-[13px] font-medium text-[#111827]">العربية</button>
                <button className="px-3 py-1 text-gray-500 rounded-md text-[13px] font-medium hover:text-[#111827]">English</button>
              </div>
            }
            isLast={true}
          />
        </SettingsSection>

        {/* Privacy & Data */}
        <SettingsSection title="الخصوصية والبيانات">
          <SettingsRow title="تفضيلات مشاركة البيانات" description="إدارة كيفية استخدام بياناتك لخدمات الجهات الخارجية" />
          <SettingsRow title="تنزيل بياناتي" description="تصدير نسخة من جميع معاملاتك وسجل تفاعلاتك" />
          <SettingsRow title="الحسابات المرتبطة" description="إدارة الحسابات المصرفية والمؤسسات المالية المرتبطة" isLast={true} />
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection title="منطقة الخطر">
          <SettingsRow title="تعطيل الحساب" description="تعطيل حسابك مؤقتًا وإيقاف مراقبة الذكاء الاصطناعي" danger={true} />
          <SettingsRow title="حذف الحساب" description="حذف حسابك نهائيًا وجميع البيانات المرتبطة به" danger={true} isLast={true} />
        </SettingsSection>

        {/* Footer */}
        <div className="mt-12 text-center flex flex-col items-center justify-center text-[#6B7280] gap-2 pb-8">
          <div className="flex justify-center items-center gap-1.5">
            <span className="text-[12px] font-medium tracking-wide text-[#6B7280]">
              نماء — مقدم من مصرف الإنماء
            </span>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
