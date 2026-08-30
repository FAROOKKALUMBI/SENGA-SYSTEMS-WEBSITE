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
  FileText,
  Paperclip,
  UploadCloud
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function ContactPages({ forceSubpath }) {
  const location = useLocation();
  const subpath = forceSubpath || (location.pathname.split('/contact/')[1] || (location.pathname === '/quote' ? 'quote' : ''));
  const { submitQuote, submitConsultation } = useCMS();

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    companyName: '',
    subject: '', 
    message: '' 
  });

  // Quote Form State
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteData, setQuoteData] = useState({
    firstName: '',
    surname: '',
    email: '',
    companyName: '',
    jobTitle: '',
    inquiryType: '',
    projectDescription: '',
    fileName: ''
  });

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

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    await submitQuote({
      clientName: `${quoteData.firstName} ${quoteData.surname}`,
      email: quoteData.email,
      company: quoteData.companyName,
      jobTitle: quoteData.jobTitle,
      serviceRequested: quoteData.inquiryType || 'General Project Inquiry',
      details: quoteData.projectDescription,
      attachedFile: quoteData.fileName
    });
    setQuoteSubmitted(true);
  };

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    await submitConsultation(consultData);
    setConsultSubmitted(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setQuoteData(prev => ({ ...prev, fileName: e.target.files[0].name }));
    }
  };

  return (
    <div className="space-y-12 pb-16 font-['Plus_Jakarta_Sans',sans-serif] bg-[#FFFFFF]">
      
      {/* 1. GET A QUOTE DEDICATED SUBPAGE (Matching media_1788130529353.png with #ffffff bg & #d9d9d9 card) */}
      {subpath === 'quote' ? (
        <div className="space-y-12">
          
          {/* Hero Banner Header */}
          <section className="bg-[#23275c] text-white py-16 md:py-20 px-4 md:px-12 text-left border-b border-indigo-900/40">
            <div className="max-w-7xl mx-auto space-y-3">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold tracking-wide border border-white/15">
                Quote
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Get a Quote
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl pt-1">
                Tell us about your project and we'll provide you with a customized quote.
              </p>
            </div>
          </section>

          {/* White Page Section containing #D9D9D9 Card */}
          <section className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="bg-[#D9D9D9] rounded-3xl border border-slate-300/80 p-8 sm:p-12 shadow-lg space-y-8 text-slate-900">
              
              <div className="space-y-1 border-b border-slate-400/30 pb-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  Request a Quote
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  Fill in your details below and our technical experts will prepare a proposal.
                </p>
              </div>

              {quoteSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-[#2563EB] mx-auto" />
                  <h3 className="text-2xl font-black text-slate-900">Quote Request Submitted!</h3>
                  <p className="text-sm text-slate-700 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-slate-900">{quoteData.firstName} {quoteData.surname}</span>. Our technical advisory team will review your project requirements and respond within 24 hours.
                  </p>
                  <button 
                    onClick={() => setQuoteSubmitted(false)} 
                    className="px-7 py-3 rounded-xl bg-[#2563EB] text-white text-xs font-extrabold shadow-md hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    Submit Another Quote Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  
                  {/* Row 1: First Name & Surname */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your first name"
                        value={quoteData.firstName}
                        onChange={(e) => setQuoteData({ ...quoteData, firstName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] text-sm transition-all shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Surname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your surname"
                        value={quoteData.surname}
                        onChange={(e) => setQuoteData({ ...quoteData, surname: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] text-sm transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={quoteData.email}
                        onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] text-sm transition-all shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your company name"
                        value={quoteData.companyName}
                        onChange={(e) => setQuoteData({ ...quoteData, companyName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] text-sm transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Row 3: Job Title & Inquiry Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your job title"
                        value={quoteData.jobTitle}
                        onChange={(e) => setQuoteData({ ...quoteData, jobTitle: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] text-sm transition-all shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Inquiry Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={quoteData.inquiryType}
                        onChange={(e) => setQuoteData({ ...quoteData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 focus:outline-none focus:border-[#2563EB] text-sm transition-all shadow-xs cursor-pointer"
                      >
                        <option value="">Select an inquiry type</option>
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Data & Analytics">Data & Analytics</option>
                        <option value="Security & Compliance">Security & Compliance</option>
                        <option value="ICT & Infrastructure">ICT & Infrastructure</option>
                        <option value="Design & Transformation">Design & Transformation</option>
                        <option value="Technical Support Services">Technical Support Services</option>
                        <option value="General Project Inquiry">General Project Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Briefly describe your objectives, timelines or technical requirements..."
                      value={quoteData.projectDescription}
                      onChange={(e) => setQuoteData({ ...quoteData, projectDescription: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] text-sm resize-none transition-all shadow-xs"
                    ></textarea>
                  </div>

                  {/* Row 5: Attach Supporting Document */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Paperclip className="w-4 h-4 text-[#2563EB]" />
                      <span>Attach Supporting Document</span>
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-xl bg-[#FFFFFF] border border-dashed border-slate-400 hover:border-[#2563EB] hover:bg-blue-50/50 cursor-pointer transition-all">
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <UploadCloud className="w-5 h-5 text-[#2563EB]" />
                        <span className="font-medium truncate max-w-xs sm:max-w-md">
                          {quoteData.fileName || 'Upload PDF, DOCX, ZIP or image files (Max 10MB)'}
                        </span>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold shrink-0">Browse</span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                    >
                      <span>Submit Quote Request</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </section>

        </div>
      ) : (

        /* 2. STANDARD CONTACT & OTHER SUBPAGES */
        <div className="space-y-12">
          
          {/* Header Banner & Subpage Navigation Tabs */}
          <section className="bg-[#23275c] text-white py-14 px-4 md:px-8 border-b border-indigo-900/40">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-cyan-300">Connect With Senga Systems</span>
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                    {subpath === 'payment' && 'Online Client Payment Portal'}
                    {subpath === 'schedule' && 'Schedule a Technical Consultation'}
                    {subpath === 'support' && 'Support Centre & Help Desk'}
                    {!subpath && 'Contact Us'}
                  </h1>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  <Link to="/contact" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!subpath ? 'bg-[#2563EB] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Contact Us</Link>
                  <Link to="/contact/quote" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'quote' ? 'bg-[#2563EB] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Get a Quote</Link>
                  <Link to="/contact/payment" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'payment' ? 'bg-[#2563EB] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Make Payment</Link>
                  <Link to="/contact/schedule" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'schedule' ? 'bg-[#2563EB] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Schedule Consultation</Link>
                  <Link to="/contact/support" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'support' ? 'bg-[#2563EB] text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Support Centre</Link>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT US MAIN PAGE CONTENT (#ffffff background, #d9d9d9 cards) */}
          {!subpath && (
            <section className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Card: Contact Details (bg-[#d9d9d9]) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-[#D9D9D9] p-6 sm:p-8 rounded-3xl border border-slate-300/80 shadow-md space-y-6 text-slate-900">
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contact Information</h3>

                    <div className="space-y-4 pt-1">
                      
                      {/* Phone Number */}
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFFFF] border border-slate-200">
                        <Phone className="w-5 h-5 text-[#2563EB] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">Phone Number</h4>
                          <a href="tel:+265884288849" className="text-sm font-semibold text-[#2563EB] hover:underline block mt-0.5">
                            (+265) 884 288 849
                          </a>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFFFF] border border-slate-200">
                        <Mail className="w-5 h-5 text-[#2563EB] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
                          <a href="mailto:info@senga.systems" className="text-sm font-semibold text-[#2563EB] hover:underline block mt-0.5">
                            info@senga.systems
                          </a>
                        </div>
                      </div>

                      {/* Physical Location */}
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFFFF] border border-slate-200">
                        <MapPin className="w-5 h-5 text-[#2563EB] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">Physical Location</h4>
                          <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-relaxed">
                            Malawi, Mzuzu, Luwinga
                          </p>
                        </div>
                      </div>

                      {/* Operating Hours */}
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFFFF] border border-slate-200">
                        <Clock className="w-5 h-5 text-[#2563EB] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">Operating Hours</h4>
                          <p className="text-xs font-semibold text-slate-800 mt-0.5">
                            Monday to Friday: 8:00 AM – 4:00 PM
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">Closed Saturday & Sunday</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Right Card: Send us a Message (bg-[#d9d9d9]) */}
                <div className="lg:col-span-7 bg-[#D9D9D9] p-6 sm:p-8 rounded-3xl border border-slate-300/80 shadow-md space-y-6 text-slate-900">
                  {contactSubmitted ? (
                    <div className="text-center py-12 space-y-4">
                      <CheckCircle2 className="w-16 h-16 text-[#2563EB] mx-auto" />
                      <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h3>
                      <p className="text-sm text-slate-700 max-w-md mx-auto">
                        Thank you for reaching out to Senga Systems. One of our technology representatives will contact you shortly.
                      </p>
                      <button onClick={() => setContactSubmitted(false)} className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold cursor-pointer">
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Send us a Message</h3>

                      {/* Row 1: Full Name & Email Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your full name"
                            value={contactData.fullName}
                            onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] shadow-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            value={contactData.email}
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone Number & Company Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={contactData.phone}
                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] shadow-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                            Company Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your company name"
                            value={contactData.companyName}
                            onChange={(e) => setContactData({ ...contactData, companyName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Row 3: Subject Dropdown (Matching media_1788131853490.png) */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={contactData.subject}
                          onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-[#2563EB] shadow-xs cursor-pointer"
                        >
                          <option value="">Select a subject</option>
                          <option value="Request a Quote">Request a Quote</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Sales Inquiry">Sales Inquiry</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Row 4: Message Textarea */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows="4"
                          required
                          placeholder="Enter your message here"
                          value={contactData.message}
                          onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-slate-300 text-slate-900 placeholder-slate-400 text-sm resize-none focus:outline-none focus:border-[#2563EB] shadow-xs"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
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

          {/* PAYMENT SIMULATOR */}
          {subpath === 'payment' && (
            <section className="max-w-3xl mx-auto px-4 md:px-8">
              <div className="bg-[#D9D9D9] p-8 rounded-3xl border border-slate-300 shadow-md space-y-6 text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#2563EB]">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Client Payment Gateway</h3>
                    <p className="text-xs text-slate-600">Pay invoices via Airtel Money, TNM Mpamba or Bank Transfer</p>
                  </div>
                </div>

                {paymentDone ? (
                  <div className="text-center py-10 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                    <h3 className="text-2xl font-bold text-slate-900">Payment Processed!</h3>
                    <p className="text-sm text-slate-700">Receipt generated for Invoice #{invoiceNo}.</p>
                    <button onClick={() => setPaymentDone(false)} className="px-6 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold">
                      Process Another Payment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setPaymentDone(true); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Invoice Number</label>
                      <input
                        type="text"
                        value={invoiceNo}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Amount (MWK)</label>
                      <input
                        type="text"
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      />
                    </div>
                    <button type="submit" className="w-full py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm shadow-md">
                      Confirm Payment
                    </button>
                  </form>
                )}
              </div>
            </section>
          )}

          {/* SCHEDULE CONSULTATION */}
          {subpath === 'schedule' && (
            <section className="max-w-3xl mx-auto px-4 md:px-8">
              <div className="bg-[#D9D9D9] p-8 rounded-3xl border border-slate-300 shadow-md space-y-6 text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#2563EB]">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Schedule Technical Advisory</h3>
                    <p className="text-xs text-slate-600">Book 45-min session with senior AI & infrastructure architects</p>
                  </div>
                </div>

                {consultSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-[#2563EB] mx-auto" />
                    <h3 className="text-2xl font-bold text-slate-900">Consultation Booked!</h3>
                    <p className="text-sm text-slate-700">Confirmation invite sent to {consultData.email}.</p>
                    <button onClick={() => setConsultSubmitted(false)} className="px-6 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold">
                      Book Another Session
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConsultSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={consultData.clientName}
                        onChange={(e) => setConsultData({ ...consultData, clientName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={consultData.email}
                        onChange={(e) => setConsultData({ ...consultData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      />
                    </div>
                    <button type="submit" className="w-full py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm shadow-md">
                      Confirm Consultation Booking
                    </button>
                  </form>
                )}
              </div>
            </section>
          )}

          {/* SUPPORT CENTRE */}
          {subpath === 'support' && (
            <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
              <div className="bg-[#D9D9D9] p-8 rounded-3xl border border-slate-300 shadow-md space-y-6 text-slate-900">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-8 h-8 text-[#2563EB]" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Help Desk & Knowledgebase</h3>
                    <p className="text-xs text-slate-600">24/7 Emergency Support Hotline & SLAs</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <p className="text-sm font-bold text-[#2563EB]">Emergency Support Hotline:</p>
                  <p className="text-xs text-slate-700 font-semibold">+265 (0) 884 288 849 / info@senga.systems</p>
                </div>
              </div>
            </section>
          )}

        </div>
      )}

    </div>
  );
}
