import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, LoaderCircle } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', isDestructive = false, requireText, successMessage }) {
  const dialogRef = useRef(null);
  const cancelRef = useRef(null);
  const triggerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [typed, setTyped] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement;
    cancelRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const controls = [...dialogRef.current.querySelectorAll('button:not([disabled]), input:not([disabled])')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); triggerRef.current?.focus?.(); };
  }, [isOpen, onClose]);

  useEffect(() => { if (!isOpen) { setLoading(false); setError(''); setTyped(''); setNotice(''); } }, [isOpen]);
  if (!isOpen) return null;
  const confirm = async () => {
    setLoading(true); setError('');
    try { await onConfirm(); setNotice(successMessage || 'Action completed successfully.'); setTimeout(onClose, 900); }
    catch (err) { setError(err?.message || 'The action could not be completed. Please try again.'); setLoading(false); }
  };
  const allowed = !requireText || typed === requireText;
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget && !loading) onClose(); }}>
    <div ref={dialogRef} role="alertdialog" aria-modal="true" aria-labelledby="confirmation-title" aria-describedby="confirmation-message" className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900">
      <div className="flex gap-4"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${isDestructive ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-[#2563EB]'}`}><AlertTriangle className="h-5 w-5" /></div><div><h2 id="confirmation-title" className="text-lg font-black">{title}</h2><p id="confirmation-message" className="mt-1 text-sm leading-relaxed text-slate-600">{message}</p></div></div>
      {requireText && <label className="mt-5 block text-sm font-bold text-slate-700">Type <span className="font-mono">{requireText}</span> to continue<input value={typed} onChange={(event) => setTyped(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5" /></label>}
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
      {notice && <p role="status" className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{notice}</p>}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button ref={cancelRef} type="button" disabled={loading} onClick={onClose} className="min-h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold">Cancel</button><button type="button" disabled={loading || !allowed} onClick={confirm} className={`min-h-11 rounded-xl px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 ${isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-[#2563EB] hover:bg-blue-700'}`}>{loading ? <span className="flex items-center gap-2"><LoaderCircle className="h-4 w-4 animate-spin" />Processing…</span> : confirmLabel}</button></div>
    </div>
  </div>;
}
