import React, { useState } from 'react';
import { Inbox, Calendar, Phone, Mail, CheckCircle2, Clock } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLeads() {
  const { quotes, consultations, updateQuoteStatus } = useCMS();
  const [tab, setTab] = useState('quotes');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Leads & Submissions Inbox</h1>
          <p className="text-xs text-slate-400">Review incoming quote requests and booked consultation sessions</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('quotes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab === 'quotes' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`}
          >
            Quote Requests ({quotes.length})
          </button>
          <button
            onClick={() => setTab('consultations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab === 'consultations' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`}
          >
            Booked Consultations ({consultations.length})
          </button>
        </div>
      </div>

      {tab === 'quotes' ? (
        <div className="space-y-4">
          {quotes.length === 0 ? (
            <div className="glass-card p-12 text-center text-slate-400 rounded-3xl">No quote submissions yet.</div>
          ) : (
            quotes.map((q) => (
              <div key={q.id} className="glass-card bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="font-bold text-white text-lg">{q.clientName}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-400" /> {q.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-blue-400" /> {q.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">{new Date(q.submittedAt).toLocaleDateString()}</span>
                    <select
                      value={q.status}
                      onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-blue-400"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase font-semibold">Service Requested:</span>
                    <p className="text-white font-bold mt-0.5">{q.serviceRequested}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-semibold">Budget Range:</span>
                    <p className="text-emerald-400 font-mono font-bold mt-0.5">{q.budget}</p>
                  </div>
                </div>

                {q.details && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Project Details:</span>
                    <p className="mt-1 leading-relaxed">{q.details}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.length === 0 ? (
            <div className="glass-card p-12 text-center text-slate-400 rounded-3xl">No consultation bookings yet.</div>
          ) : (
            consultations.map((c) => (
              <div key={c.id} className="glass-card bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-lg">{c.clientName}</h3>
                    <p className="text-xs text-slate-400">{c.email} • {c.phone}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                    {c.status || 'Confirmed'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-blue-400 font-bold">{c.consultantNeeded}</span>
                  <span className="text-white font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> {c.preferredDate} at {c.timeSlot}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
