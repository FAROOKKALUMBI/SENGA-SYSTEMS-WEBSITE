import React, { useState } from 'react';
import { Calendar, CreditCard, FileText, MessageSquare, Square, Star, Trash2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import ConfirmationModal from '../../components/ConfirmationModal';

function InboxSection({ title, subtitle, badge, children, empty, isEmpty, className = '' }) {
  return <section className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
      <div><h2 className="text-lg font-bold text-slate-900">{title}</h2><p className="text-xs text-slate-500">{subtitle}</p></div>
      <span className="shrink-0 text-xs font-bold text-[#2563EB]">{badge}</span>
    </div>
    {isEmpty ? <div className="px-5 py-8 text-center text-sm text-slate-500">{empty}</div> : children}
  </section>;
}

function InboxRow({ children, right }) {
  return <div className="group grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-start gap-3 border-b border-slate-200 px-5 py-4 last:border-b-0 hover:bg-blue-50/60">
    <Square className="mt-0.5 h-4 w-4 text-slate-400" /><Star className="mt-0.5 h-4 w-4 text-slate-400" />
    <div className="min-w-0">{children}</div><div className="flex items-center gap-2">{right}</div>
  </div>;
}

export default function AdminLeads() {
  const { quotes, consultations, contacts, payments, updateQuoteStatus, deleteQuote, user } = useCMS();
  const isSystemAdmin = user?.roleCode === 'SYSTEM_ADMIN';
  const [activeInbox, setActiveInbox] = useState('quotes');
  const [quoteToDelete, setQuoteToDelete] = useState(null);
  return <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
    <div className="bg-white border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-2">
      <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">Lead Management &amp; Sales</span>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5"><MessageSquare className="w-7 h-7 text-[#2563EB]" />Client Quote Inquiries, Contacts &amp; Consultations</h1>
      <p className="text-xs sm:text-sm text-slate-600 font-medium">View client quote submissions, project specifications, direct contact messages, payments and scheduled technical consultation sessions.</p>
    </div>

    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div role="tablist" aria-label="Lead inboxes" className="flex min-w-max border-b border-slate-200">
        {[['quotes', `Project Quote Submissions (${quotes.length})`], ['contacts', `Direct Contact Messages (${contacts.length})`], ['consultations', `Scheduled Consultation Sessions (${consultations.length})`], ...(isSystemAdmin ? [['payments', `Payment Gateway Transactions (${payments.length})`]] : [])].map(([id, label]) => <button key={id} role="tab" aria-selected={activeInbox === id} onClick={() => setActiveInbox(id)} className={`relative px-6 py-4 text-sm font-bold transition-colors ${activeInbox === id ? 'text-[#2563EB]' : 'text-slate-500 hover:bg-slate-50'}`}>{label}{activeInbox === id && <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#2563EB]" />}</button>)}
      </div>
    </div>

    <InboxSection className={activeInbox === 'quotes' ? '' : 'hidden'} title={`Project Quote Submissions (${quotes.length})`} subtitle="Manage inbound quotes and update sales pipeline statuses" badge="Active Sales Pipeline" isEmpty={!quotes.length} empty="No quote submissions recorded yet.">
      {quotes.map(q => <InboxRow key={q.id} right={<><select value={q.status || 'PENDING'} onChange={e => updateQuoteStatus(q.id, e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#2563EB]"><option>PENDING</option><option>CONTACTED</option><option>APPROVED</option><option>ARCHIVED</option></select>{isSystemAdmin && <button onClick={() => setQuoteToDelete(q)} className="p-1.5 text-slate-400 hover:text-red-600" title="Delete Quote"><Trash2 className="h-4 w-4" /></button>}</>}>
        <h3 className="truncate text-sm font-bold text-slate-900">{q.clientName}</h3><p className="mt-1 truncate text-xs text-slate-500">{q.email} • {q.company || 'Private Entity'} {q.phone ? `• ${q.phone}` : ''}</p><p className="mt-2 truncate text-sm text-slate-700"><span className="font-semibold text-[#2563EB]">Service Requested: {q.serviceRequested}</span> — {q.details}</p>{q.attachedFile && <p className="mt-2 flex items-center gap-2 truncate text-xs font-medium text-[#2563EB]"><FileText className="h-4 w-4 shrink-0" /><span className="truncate">Attached File: {q.attachedFile}</span></p>}
      </InboxRow>)}
    </InboxSection>

    <InboxSection className={activeInbox === 'contacts' ? '' : 'hidden'} title={`Direct Contact Messages (${contacts.length})`} subtitle="Inquiries submitted through the public Contact page form" badge="Inbound Messages" isEmpty={!contacts.length} empty="No direct contact messages received yet.">
      {contacts.map(cnt => <InboxRow key={cnt.id} right={<span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-[#2563EB]">{cnt.status || 'NEW'}</span>}>
        <h3 className="truncate text-sm font-bold text-slate-900">{cnt.fullName}</h3><p className="mt-1 truncate text-xs text-slate-500">{cnt.email} • {cnt.phone || cnt.companyName || 'General'}</p><p className="mt-2 truncate text-sm text-slate-700"><span className="font-semibold">{cnt.subject}</span> — {cnt.message}</p>
      </InboxRow>)}
    </InboxSection>

    <InboxSection className={activeInbox === 'consultations' ? '' : 'hidden'} title={`Scheduled Consultation Sessions (${consultations.length})`} subtitle="Direct bookings from the technical advisory calendar" badge="Calendar Sessions" isEmpty={!consultations.length} empty="No consultation sessions scheduled yet.">
      {consultations.map(c => <InboxRow key={c.id} right={<div className="text-right"><span className="block whitespace-nowrap text-xs font-semibold text-slate-800">{c.preferredDate} at {c.timeSlot}</span><span className="mt-1 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{c.status || 'CONFIRMED'}</span></div>}>
        <h3 className="truncate text-sm font-bold text-slate-900">{c.clientName}</h3><p className="mt-1 truncate text-xs text-slate-500">{c.email} • {c.phone}</p><p className="mt-2 truncate text-sm font-semibold text-[#2563EB]">{c.consultantNeeded}</p>
      </InboxRow>)}
    </InboxSection>

    {isSystemAdmin && <InboxSection className={activeInbox === 'payments' ? '' : 'hidden'} title={`Payment Gateway Transactions (${payments.length})`} subtitle="Inbound client invoice payments and transaction audit trail" badge="Verified Payments" isEmpty={!payments.length} empty="No payment transactions recorded yet.">
      {payments.map(p => <InboxRow key={p.id} right={<div className="text-right"><span className="block whitespace-nowrap text-sm font-bold text-emerald-700">{p.currency} {p.amount}</span><span className="text-[10px] font-bold text-emerald-700">{p.status || 'COMPLETED'}</span></div>}>
        <div className="flex items-center gap-2"><CreditCard className="h-4 w-4 shrink-0 text-[#2563EB]" /><h3 className="truncate text-sm font-bold text-slate-900">{p.customerName}</h3><span className="text-xs font-mono text-slate-500">({p.invoiceNo})</span></div><p className="mt-1 truncate text-xs text-slate-500">{p.email} • {p.description}</p>
      </InboxRow>)}
    </InboxSection>}
    <ConfirmationModal isOpen={Boolean(quoteToDelete)} onClose={() => setQuoteToDelete(null)} title="Delete this quote submission?" message={`This will permanently delete the submission from ${quoteToDelete?.clientName || 'this client'}. This action cannot be undone.`} confirmLabel="Delete submission" isDestructive successMessage="Quote submission deleted successfully." onConfirm={() => deleteQuote(quoteToDelete.id)} />
  </div>;
}
