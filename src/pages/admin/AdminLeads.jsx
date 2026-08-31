import React from 'react';
import { MessageSquare, Calendar, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLeads() {
  const { quotes, consultations } = useCMS();

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Banner Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">Lead Management & Sales</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <MessageSquare className="w-7 h-7 text-[#2563EB]" />
          <span>Client Quote Inquiries & Consultations</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          View client quote submissions, project specifications, and scheduled technical consultation sessions.
        </p>
      </div>

      {/* QUOTES TABLE */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-black text-slate-900">Project Quote Submissions ({quotes.length})</h2>
          <span className="text-xs font-bold text-[#2563EB]">Active Sales Pipeline</span>
        </div>

        <div className="space-y-4">
          {quotes.map((q) => (
            <div key={q.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">{q.clientName}</h3>
                  <span className="text-xs font-bold text-slate-600">{q.email} • {q.company || 'Private Entity'}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-[11px]">
                  {q.status || 'PENDING'}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-black text-[#2563EB] block">Service Requested: {q.serviceRequested}</span>
                <p className="text-slate-800 font-medium leading-relaxed">{q.details}</p>
              </div>

              {q.attachedFile && (
                <div className="pt-2 flex items-center gap-2 text-xs text-[#2563EB] font-bold">
                  <FileText className="w-4 h-4" />
                  <span>Attached File: {q.attachedFile}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOOKED CONSULTATIONS */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-black text-slate-900">Scheduled Consultation Sessions ({consultations.length})</h2>
          <span className="text-xs font-bold text-[#2563EB]">Calendar Sessions</span>
        </div>

        <div className="space-y-4">
          {consultations.map((c) => (
            <div key={c.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">{c.clientName}</h3>
                <p className="text-xs font-bold text-slate-600">{c.email} • {c.phone}</p>
                <span className="text-xs font-black text-[#2563EB] block">{c.consultantNeeded}</span>
              </div>
              <div className="text-left sm:text-right space-y-1">
                <span className="text-xs font-black text-slate-800 block">📅 {c.preferredDate} at {c.timeSlot}</span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black inline-block">
                  {c.status || 'CONFIRMED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
