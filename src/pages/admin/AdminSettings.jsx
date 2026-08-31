import React from 'react';
import { Settings, Shield, Lock, Bell, Database } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminSettings() {
  const { user } = useCMS();

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB]">System Configuration</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-[#2563EB]" />
          <span>System Settings & Profile</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Configure security policies, API integrations, database backups and administrator account settings.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">Administrator Account Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase block">Name</span>
            <span className="text-[#2563EB] font-extrabold text-sm block">{user?.name || 'Mr. Farook Kalumbi'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase block">Email Address</span>
            <span className="text-slate-900 font-extrabold text-sm block">{user?.email || 'farook@sengasystems.com'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase block">Title</span>
            <span className="text-blue-700 font-extrabold text-sm block">{user?.title || 'Chief Operating Officer'}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase block">Access Role</span>
            <span className="text-purple-700 font-extrabold text-sm block">{user?.role || 'System Administrator'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
