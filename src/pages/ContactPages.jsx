import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  CreditCard, 
  Calendar, 
  HelpCircle, 
  CheckCircle2, 
  Smartphone,
  Building,
  User,
  Search,
  FileText
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function ContactPages() {
  const location = useLocation();
  const subpath = location.pathname.split('/contact/')[1] || '';
  const { submitQuote, submitConsultation } = useCMS();

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  // Payment Simulator State
  const [paymentMethod, setPaymentMethod] = useState('airtel');
  const [paymentDone, setPaymentDone] = useState(false);
  const [payAmount, setPayAmount] = useState('250,000');
  const [invoiceNo, setInvoiceNo] = useState('INV-2026-089');

  // Consultation State
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [consultData, setConsultData] = useState({
    clientName: '',
    email: '',
    phone: '',
    consultantNeeded: 'Cybersecurity & SengaShield Audit',
    preferredDate: '',
    timeSlot: '10:00 AM',
    notes: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    await submitConsultation(consultData);
    setConsultSubmitted(true);
  };

  return (
    <div className="space-y-12 py-12">
      {/* Header Banner & Subpage Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="glass-card bg-[#0F172A] border border-slate-700 rounded-3xl p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-blue-400">Connect With Senga Systems</span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                {subpath === 'quote' && 'Request a Custom Project Quote'}
                {subpath === 'payment' && 'Online Client Payment Portal'}
                {subpath === 'schedule' && 'Schedule a Technical Consultation'}
                {subpath === 'support' && 'Support Centre & Help Desk'}
                {!subpath && 'Contact Us'}
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/contact" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!subpath ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Contact Us</Link>
              <Link to="/contact/quote" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'quote' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Get a Quote</Link>
              <Link to="/contact/payment" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'payment' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Make Payment</Link>
              <Link to="/contact/schedule" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'schedule' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Schedule Consultation</Link>
              <Link to="/contact/support" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'support' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Support Centre</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. CONTACT US MAIN PAGE */}
      {!subpath && (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white">Direct Communication</h3>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">Telephone Support</h4>
                      <p className="text-xs text-slate-300 mt-0.5">+265 (0) 999 123 456 / +265 (0) 888 789 000</p>
                      <p className="text-[11px] text-slate-400 mt-1">Mon - Fri: 8:00 AM - 5:00 PM CAT</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">Email Inquiries</h4>
                      <p className="text-xs text-slate-300 mt-0.5">info@sengasystems.mw</p>
                      <p className="text-[11px] text-slate-400 mt-1">24/7 SengaShield Desk: security@sengasystems.mw</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">Malawi Office Locations</h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        <strong className="text-white">Lilongwe Head Office:</strong> Sector 19, City Centre<br />
                        <strong className="text-white">Blantyre Branch:</strong> Victoria Avenue Commercial Hub
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out to Senga Systems. One of our technology representatives will contact you shortly.
                  </p>
                  <button onClick={() => setContactSubmitted(false)} className="px-6 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Banda"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.mw"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI System Integration Inquiry"
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Message</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="How can Senga Systems assist your organization?"
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>
      )}

      {/* 2. MAKE A PAYMENT SIMULATOR */}
      {subpath === 'payment' && (
        <section className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Client Payment Portal</h2>
                <p className="text-xs text-slate-400">Secure digital payment gateway for Senga Systems invoices</p>
              </div>
            </div>

            {paymentDone ? (
              <div className="p-8 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Payment Successfully Processed!</h3>
                <p className="text-xs text-slate-300 font-mono">Receipt Reference: TXN-SNG-99812739</p>
                <p className="text-sm text-slate-300">Invoice {invoiceNo} paid in full (MWK {payAmount}). Receipt sent to email.</p>
                <button onClick={() => setPaymentDone(false)} className="px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">Make Another Payment</button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Invoice Reference No.</label>
                    <input
                      type="text"
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Amount (MWK)</label>
                    <input
                      type="text"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('airtel')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${paymentMethod === 'airtel' ? 'bg-red-600/20 border-red-500 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-red-500" />
                      <span className="text-xs">Airtel Money</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('tnm')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${paymentMethod === 'tnm' ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                      <span className="text-xs">TNM Mpamba</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${paymentMethod === 'card' ? 'bg-blue-600/20 border-blue-500 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                      <span className="text-xs">Visa / Mastercard</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${paymentMethod === 'bank' ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      <Building className="w-5 h-5 mx-auto mb-1 text-indigo-400" />
                      <span className="text-xs">Bank Transfer</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setPaymentDone(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Complete MWK {payAmount} Payment</span>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. SCHEDULE CONSULTATION */}
      {subpath === 'schedule' && (
        <section className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Schedule Technical Consultation</h2>
                <p className="text-xs text-slate-400">Book a 45-minute strategic session with our lead system architects</p>
              </div>
            </div>

            {consultSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-blue-600/10 border border-blue-500/30 rounded-2xl">
                <CheckCircle2 className="w-14 h-14 text-blue-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Consultation Booked!</h3>
                <p className="text-sm text-slate-300">
                  Session scheduled for <strong className="text-white">{consultData.preferredDate} at {consultData.timeSlot}</strong> with our technical advisory team. Calendar invitation sent to {consultData.email}.
                </p>
                <button onClick={() => setConsultSubmitted(false)} className="px-6 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">Book Another Session</button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Banda"
                      value={consultData.clientName}
                      onChange={(e) => setConsultData({ ...consultData, clientName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@organization.mw"
                      value={consultData.email}
                      onChange={(e) => setConsultData({ ...consultData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={consultData.preferredDate}
                      onChange={(e) => setConsultData({ ...consultData, preferredDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Preferred Time Slot</label>
                    <select
                      value={consultData.timeSlot}
                      onChange={(e) => setConsultData({ ...consultData, timeSlot: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                    >
                      <option value="09:00 AM">09:00 AM CAT</option>
                      <option value="10:30 AM">10:30 AM CAT</option>
                      <option value="02:00 PM">02:00 PM CAT</option>
                      <option value="03:30 PM">03:30 PM CAT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Consultation Topic</label>
                  <select
                    value={consultData.consultantNeeded}
                    onChange={(e) => setConsultData({ ...consultData, consultantNeeded: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  >
                    <option value="Cybersecurity & SengaShield Audit">Cybersecurity & SengaShield Audit</option>
                    <option value="Custom AI Model Strategy">Custom AI Model Strategy</option>
                    <option value="Enterprise Cloud Infrastructure">Enterprise Cloud Infrastructure</option>
                    <option value="Full-Stack Software Architecture">Full-Stack Software Architecture</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Consultation Booking</span>
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* 4. SUPPORT CENTRE */}
      {subpath === 'support' && (
        <section className="max-w-5xl mx-auto px-4 md:px-8 space-y-10">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-blue-400 mx-auto" />
            <h2 className="text-3xl font-bold text-white">Senga Systems Support Centre</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Welcome to client help desk. Search knowledgebase topics or submit a priority support ticket.
            </p>

            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search support articles, SSL setups, SengaShield docs..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <FileText className="w-8 h-8 text-blue-400" />
              <h3 className="font-bold text-white text-base">Knowledgebase Docs</h3>
              <p className="text-xs text-slate-400">Step-by-step guides for domain routing, API keys, and dashboard setups.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
              <h3 className="font-bold text-white text-base">SengaShield SLA Support</h3>
              <p className="text-xs text-slate-400">24/7 emergency hotline for active cyber incident response.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <Mail className="w-8 h-8 text-indigo-400" />
              <h3 className="font-bold text-white text-base">Email Support Desk</h3>
              <p className="text-xs text-slate-400">Direct response within 2 hours: support@sengasystems.mw</p>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
