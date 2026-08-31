import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, Clock, ShieldCheck } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB]">Telemetry & Reporting</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-[#2563EB]" />
          <span>Website & CMS Analytics</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Real-time visitor metrics, lead conversion statistics, and system traffic telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Monthly Page Views</span>
          <span className="text-3xl font-black text-slate-900 block">48,290</span>
          <span className="text-xs font-extrabold text-emerald-700">↑ 14.2% this month</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Unique Visitors</span>
          <span className="text-3xl font-black text-slate-900 block">12,450</span>
          <span className="text-xs font-extrabold text-emerald-700">↑ 9.8% this month</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Quote Conversion</span>
          <span className="text-3xl font-black text-slate-900 block">8.4%</span>
          <span className="text-xs font-extrabold text-emerald-700">↑ 3.1% higher</span>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Avg Session Time</span>
          <span className="text-3xl font-black text-slate-900 block">4m 12s</span>
          <span className="text-xs font-extrabold text-emerald-700">↑ 18s longer</span>
        </div>
      </div>
    </div>
  );
}
