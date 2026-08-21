import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Briefcase, 
  Inbox, 
  Calendar, 
  PlusCircle, 
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminDashboard() {
  const { posts, vacancies, quotes, consultations, user } = useCMS();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card bg-[#0F172A] border border-slate-700 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-blue-400">Welcome Back</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Hello, {user?.name || 'Administrator'} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Role: <span className="text-blue-400 font-semibold">{user?.role}</span> • System Node: <span className="text-emerald-400 font-semibold">Active & Synced</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/posts"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Post</span>
          </Link>
          <Link
            to="/admin/vacancies"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span>Post Vacancy</span>
          </Link>
        </div>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Published Posts</span>
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-black text-white">{posts.length}</p>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" /> News, Insights & Announcements
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Active Vacancies</span>
            <Briefcase className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-3xl font-black text-white">{vacancies.length}</p>
          <p className="text-[11px] text-slate-400">Open career opportunities</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Quote Requests</span>
            <Inbox className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-black text-white">{quotes.length}</p>
          <p className="text-[11px] text-slate-400">Client project submissions</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Booked Sessions</span>
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white">{consultations.length}</p>
          <p className="text-[11px] text-slate-400">Technical consultations</p>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="glass-card bg-[#0F172A] border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Client Quote Inquiries</h2>
          <Link to="/admin/leads" className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1">
            View All Requests <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {quotes.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">No quote requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Client / Organization</th>
                  <th className="p-3">Requested Service</th>
                  <th className="p-3">Budget Range</th>
                  <th className="p-3">Submitted</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {quotes.slice(0, 5).map((q) => (
                  <tr key={q.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white">{q.clientName}</td>
                    <td className="p-3 text-blue-400">{q.serviceRequested}</td>
                    <td className="p-3 font-mono">{q.budget}</td>
                    <td className="p-3 text-slate-400">{new Date(q.submittedAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-300 font-mono text-[10px] font-bold">
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
