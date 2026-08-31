import React from 'react';
import { BarChart3, TrendingUp, Users, Eye, Clock, ShieldCheck } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400">Telemetry & Reporting</span>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-[#2563EB]" />
          <span>Website & CMS Analytics</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Real-time visitor metrics, lead conversion statistics, and system traffic telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Monthly Page Views</span>
          <span className="text-3xl font-black text-white block">48,290</span>
          <span className="text-xs font-extrabold text-emerald-400">↑ 14.2% this month</span>
        </div>
        <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Unique Visitors</span>
          <span className="text-3xl font-black text-white block">12,450</span>
          <span className="text-xs font-extrabold text-emerald-400">↑ 9.8% this month</span>
        </div>
        <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Quote Conversion</span>
          <span className="text-3xl font-black text-white block">8.4%</span>
          <span className="text-xs font-extrabold text-emerald-400">↑ 3.1% higher</span>
        </div>
        <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Avg Session Time</span>
          <span className="text-3xl font-black text-white block">4m 12s</span>
          <span className="text-xs font-extrabold text-emerald-400">↑ 18s longer</span>
        </div>
      </div>
    </div>
  );
}

