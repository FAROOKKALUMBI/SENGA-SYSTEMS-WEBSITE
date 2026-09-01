import React from 'react';
import { ChevronDown, Clock, Eye, Info, Target, TrendingUp, Users } from 'lucide-react';
import { api } from '../../services/api';

const formatSession = (seconds = 0) => `${Math.floor(seconds / 60)}m ${seconds % 60}s`;

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = React.useState(null);

  React.useEffect(() => {
    api.getAnalytics().then(setAnalytics).catch(() => setAnalytics({}));
  }, []);

  const metrics = [
    { label: 'Monthly page views', value: (analytics?.monthlyPageViews || 0).toLocaleString(), trend: analytics?.changes?.pageViews || '', icon: Eye },
    { label: 'Unique visitors', value: (analytics?.uniqueVisitors || 0).toLocaleString(), trend: analytics?.changes?.visitors || '', icon: Users },
    { label: 'Quote conversion', value: `${analytics?.quoteConversion || 0}%`, trend: analytics?.changes?.conversion || '', icon: Target },
    { label: 'Avg session time', value: formatSession(analytics?.averageSessionSeconds), trend: analytics?.changes?.session || '', icon: Clock }
  ];
  const trends = analytics?.trends?.length ? analytics.trends : [0];
  const xFor = (index) => 28 + (index * 830) / Math.max(trends.length - 1, 1);
  const yFor = (value) => 135 - value * 50;
  const linePath = trends.map((value, index) => `${index ? 'L' : 'M'}${xFor(index)} ${yFor(value)}`).join(' ');
  const areaPath = `${linePath} L${xFor(trends.length - 1)} 135 L28 135 Z`;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950">Website &amp; CMS Analytics</h1>
          <p className="mt-1 text-sm text-slate-600">Real-time visitor metrics, lead conversion statistics, and system traffic telemetry.</p>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-bold text-slate-950">
            {analytics?.periodLabel || 'Loading period…'}
            <ChevronDown className="h-4 w-4" />
          </button>
          <button type="button" className="text-sm font-semibold text-[#2563EB] transition-colors hover:text-blue-800">See all</button>
        </div>
      </div>

      <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-1">
        {metrics.map(({ label, value, trend, icon: Icon }) => (
          <article key={label} className="min-w-[205px] flex-1 snap-start rounded-xl border border-slate-200 p-5">
            <Icon className="h-6 w-6 text-slate-950" strokeWidth={2} />
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-950">{value}</span>
              <span className="inline-flex items-center text-sm font-semibold text-emerald-700"><TrendingUp className="mr-0.5 h-3.5 w-3.5" />{trend}</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-800">
              {label}
              <Info className="h-4 w-4 fill-slate-500 text-white" />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 h-56 w-full overflow-hidden" role="img" aria-label="Website analytics trend chart for the last 28 days">
        <svg viewBox="0 0 900 250" className="h-full w-full" preserveAspectRatio="none">
          {[35, 85, 135, 185, 235].map((y) => <line key={y} x1="28" x2="875" y1={y} y2={y} stroke="#cbd5e1" strokeWidth="1" />)}
          <path d={areaPath} fill="#dbeafe" opacity="0.75" />
          <path d={linePath} fill="none" stroke="#1677ff" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          {['Aug 4', 'Aug 9', 'Aug 14', 'Aug 19', 'Aug 24', 'Aug 29'].map((label, i) => <text key={label} x={28 + i * 150} y="235" fill="#475569" fontSize="14">{label}</text>)}
        </svg>
      </div>
    </section>
  );
}
