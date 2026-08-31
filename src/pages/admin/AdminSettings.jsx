import React, { useState, useEffect } from 'react';
import { Settings, Shield, Lock, Bell, Database, Save, CheckCircle2, Globe, Mail, Phone } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminSettings() {
  const { user, settings, updateSettings } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [formSettings, setFormSettings] = useState({
    siteName: 'Senga Systems',
    supportEmail: 'info@senga.systems',
    supportPhone: '(+265) 884 288 849',
    allowQuotes: true,
    notificationsEnabled: true,
    maintenanceMode: false
  });

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormSettings(prev => ({ ...prev, ...settings }));
    }
  }, [settings]);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateSettings(formSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Banner */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">System Configuration</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-[#2563EB]" />
          <span>System Settings & Configuration</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Configure security policies, contact information, website settings, and administrator account details.
        </p>
      </div>

      {/* Account Info */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <h2 className="text-xl font-black text-slate-900 border-b-2 border-slate-200 pb-3">Administrator Account Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase block">Name</span>
            <span className="text-[#2563EB] font-black text-sm block">{user?.name || 'Mr. Farook Kalumbi'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase block">Email Address</span>
            <span className="text-slate-900 font-black text-sm block">{user?.email || 'farook@sengasystems.com'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase block">Title</span>
            <span className="text-blue-800 font-black text-sm block">{user?.title || 'Chief Operating Officer'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase block">Access Role</span>
            <span className="text-purple-800 font-black text-sm block">{user?.role || 'System Administrator'}</span>
          </div>
        </div>
      </div>

      {/* Website & API Configuration Form */}
      <form onSubmit={handleSave} className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-black text-slate-900">Portal & Website Parameters</h2>
            <p className="text-xs text-slate-500 font-medium">Changes are persisted to the backend API</p>
          </div>
          {savedSuccess && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved Successfully</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="block text-slate-700 font-extrabold uppercase mb-1.5">Company / Website Title</label>
            <input
              type="text"
              value={formSettings.siteName}
              onChange={(e) => setFormSettings({ ...formSettings, siteName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-extrabold uppercase mb-1.5">Official Support Email</label>
            <input
              type="email"
              value={formSettings.supportEmail}
              onChange={(e) => setFormSettings({ ...formSettings, supportEmail: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-extrabold uppercase mb-1.5">Support Phone Line</label>
            <input
              type="text"
              value={formSettings.supportPhone}
              onChange={(e) => setFormSettings({ ...formSettings, supportPhone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="flex flex-col justify-end space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formSettings.allowQuotes}
                onChange={(e) => setFormSettings({ ...formSettings, allowQuotes: e.target.checked })}
                className="w-4 h-4 text-[#2563EB] rounded"
              />
              <span className="text-xs font-bold text-slate-800">Allow Online Quote Submissions</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formSettings.notificationsEnabled}
                onChange={(e) => setFormSettings({ ...formSettings, notificationsEnabled: e.target.checked })}
                className="w-4 h-4 text-[#2563EB] rounded"
              />
              <span className="text-xs font-bold text-slate-800">Enable Real-Time Lead Email Alerts</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-slate-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>

    </div>
  );
}
