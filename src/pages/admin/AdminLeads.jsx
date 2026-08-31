import React from 'react';
import { MessageSquare, Calendar, Mail, FileText, CheckCircle2, Trash2, Check, Clock, DollarSign, CreditCard } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLeads() {
  const { quotes, consultations, contacts, payments, updateQuoteStatus, deleteQuote } = useCMS();

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Banner Header */}
      <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">Lead Management & Sales</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <MessageSquare className="w-7 h-7 text-[#2563EB]" />
          <span>Client Quote Inquiries, Contacts & Consultations</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          View client quote submissions, project specifications, direct contact messages, payments and scheduled technical consultation sessions.
        </p>
      </div>

      {/* 1. QUOTES PIPELINE */}
      <section className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Project Quote Submissions ({quotes.length})</h2>
            <p className="text-xs text-slate-500 font-medium">Manage inbound quotes and update sales pipeline statuses</p>
          </div>
          <span className="text-xs font-bold text-[#2563EB]">Active Sales Pipeline</span>
        </div>

        {quotes.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm font-medium bg-slate-50 rounded-2xl border border-slate-200">
            No quote submissions recorded yet.
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((q) => (
              <div key={q.id} className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">{q.clientName}</h3>
                    <span className="text-xs font-bold text-slate-600">{q.email} • {q.company || 'Private Entity'} {q.phone ? `• ${q.phone}` : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={q.status || 'PENDING'}
                      onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-extrabold text-slate-800 shadow-xs focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                    <button
                      onClick={() => deleteQuote(q.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Quote"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
        )}
      </section>

      {/* 2. DIRECT CONTACT INQUIRIES */}
      <section className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Direct Contact Messages ({contacts.length})</h2>
            <p className="text-xs text-slate-500 font-medium">Inquiries submitted through the public Contact page form</p>
          </div>
          <span className="text-xs font-bold text-emerald-600">Inbound Messages</span>
        </div>

        {contacts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm font-medium bg-slate-50 rounded-2xl border border-slate-200">
            No direct contact messages received yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((cnt) => (
              <div key={cnt.id} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-900 text-sm">{cnt.fullName}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#2563EB] text-[10px] font-bold">
                    {cnt.status || 'NEW'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{cnt.email} • {cnt.phone || cnt.companyName || 'General'}</p>
                <div className="pt-1 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block">{cnt.subject}</span>
                  <p className="text-xs text-slate-700 font-normal leading-relaxed mt-1">{cnt.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. BOOKED CONSULTATIONS */}
      <section className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Scheduled Consultation Sessions ({consultations.length})</h2>
            <p className="text-xs text-slate-500 font-medium">Direct bookings from the technical advisory calendar</p>
          </div>
          <span className="text-xs font-bold text-[#2563EB]">Calendar Sessions</span>
        </div>

        {consultations.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm font-medium bg-slate-50 rounded-2xl border border-slate-200">
            No consultation sessions scheduled yet.
          </div>
        ) : (
          <div className="space-y-4">
            {consultations.map((c) => (
              <div key={c.id} className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
        )}
      </section>

      {/* 4. PAYMENT GATEWAY TRANSACTIONS */}
      <section className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Payment Gateway Transactions ({payments.length})</h2>
            <p className="text-xs text-slate-500 font-medium">Inbound client invoice payments and transaction audit trail</p>
          </div>
          <span className="text-xs font-bold text-emerald-600">Verified Payments</span>
        </div>

        {payments.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm font-medium bg-slate-50 rounded-2xl border border-slate-200">
            No payment transactions recorded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#2563EB]" />
                    <h3 className="font-black text-slate-900 text-sm">{p.customerName}</h3>
                    <span className="text-xs font-mono text-slate-500">({p.invoiceNo})</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{p.email} • {p.description}</p>
                </div>
                <div className="text-left sm:text-right space-y-0.5">
                  <span className="text-base font-black text-emerald-700 block">{p.currency} {p.amount}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                    {p.status || 'COMPLETED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
