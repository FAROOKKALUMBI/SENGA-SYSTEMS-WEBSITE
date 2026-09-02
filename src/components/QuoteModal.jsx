import React, { useState, useEffect } from 'react';
import { X, Shield, Send, CheckCircle2, Paperclip, UploadCloud } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { FieldError, useFormValidation } from '../hooks/useFormValidation.jsx';

export default function QuoteModal() {
  const { isQuoteOpen, setIsQuoteOpen, quoteServicePrefill, submitQuote } = useCMS();
  
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    companyName: '',
    jobTitle: '',
    inquiryType: quoteServicePrefill || '',
    projectDescription: '',
    fileName: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const validation = useFormValidation({
    firstName: { type: 'name', required: true }, surname: { type: 'name', required: true },
    email: { type: 'email', required: true }, inquiryType: { type: 'required', required: true },
    projectDescription: { type: 'message', required: true },
  });

  useEffect(() => {
    if (quoteServicePrefill) {
      setFormData(prev => ({ ...prev, inquiryType: quoteServicePrefill }));
    }
  }, [quoteServicePrefill]);

  if (!isQuoteOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleaned = Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    if (!validation.validateAll(cleaned)) return;
    setLoading(true);
    await submitQuote({
      clientName: `${cleaned.firstName} ${cleaned.surname}`, email: cleaned.email, company: cleaned.companyName,
      jobTitle: cleaned.jobTitle, serviceRequested: cleaned.inquiryType || 'General Project Inquiry',
      details: cleaned.projectDescription, attachedFile: cleaned.fileName
    });
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsQuoteOpen(false);
    setSubmitted(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, fileName: e.target.files[0].name }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8 text-slate-900 border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto border border-blue-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Quote Request Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <span className="font-bold text-slate-900">{formData.firstName} {formData.surname}</span>. Our technical advisory team will review your project details and respond within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-7 py-3 rounded-xl bg-[#2563EB] text-white font-extrabold text-sm hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Form Header matching mockup */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Request a Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Fill in your details below and our team will prepare a custom proposal.
              </p>
            </div>

            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: First Name & Surname */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    {...validation.fieldProps('firstName', formData.firstName)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white text-sm transition-all"
                  />
                  <FieldError name="firstName" error={validation.errors.firstName} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Surname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your surname"
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    {...validation.fieldProps('surname', formData.surname)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white text-sm transition-all"
                  />
                  <FieldError name="surname" error={validation.errors.surname} />
                </div>
              </div>

              {/* Row 2: Email Address & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    {...validation.fieldProps('email', formData.email)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white text-sm transition-all"
                  />
                  <FieldError name="email" error={validation.errors.email} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white text-sm transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Job Title & Inquiry Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your job title"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    {...validation.fieldProps('inquiryType', formData.inquiryType)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#2563EB] focus:bg-white text-sm transition-all"
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
                  <FieldError name="inquiryType" error={validation.errors.inquiryType} />
                </div>
              </div>

              {/* Row 4: Project Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Briefly describe your objectives, timelines or technical requirements..."
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  maxLength="2000"
                  {...validation.fieldProps('projectDescription', formData.projectDescription)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white text-sm resize-none transition-all"
                ></textarea>
                <div className="flex justify-between"><FieldError name="projectDescription" error={validation.errors.projectDescription} /><span className="text-xs text-slate-500 mt-1">{formData.projectDescription.length}/2000</span></div>
              </div>

              {/* Row 5: Supporting Document Upload Icon */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Attach Supporting Document</span>
                </label>
                <label className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:border-[#2563EB] hover:bg-blue-50/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <UploadCloud className="w-4 h-4 text-[#2563EB]" />
                    <span className="font-medium truncate max-w-[280px]">
                      {formData.fileName || 'Upload PDF, DOCX, ZIP or image (Max 10MB)'}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#2563EB] shrink-0 ml-2">Browse</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>{loading ? 'Submitting...' : 'Submit Quote Request'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}
