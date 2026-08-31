import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Eye, 
  Award, 
  Users, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Globe, 
  History, 
  Building2, 
  HelpCircle,
  Linkedin,
  Mail,
  Phone,
  Download,
  FileText,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import Reveal from '../components/Reveal';

export default function AboutPages() {
  const location = useLocation();
  const subpath = location.pathname.split('/about/')[1] || '';
  const { openQuoteModal } = useCMS();

  // FAQs state
  const [openFaq, setOpenFaq] = useState(0);

  const faqsList = [
    {
      q: 'What technology services does Senga Systems specialize in?',
      a: 'Senga Systems provides full-stack software development, custom artificial intelligence (AI) solutions, SengaShield cybersecurity threat defense, ICT infrastructure design, cloud hosting and technology consulting.'
    },
    {
      q: 'Where are Senga Systems headquarters located?',
      a: 'Our primary headquarters are located in Lilongwe (City Centre, Sector 19), with regional offices in Blantyre, Malawi.'
    },
    {
      q: 'How does SengaShield protect enterprise banking and telecommunications?',
      a: 'SengaShield is our proprietary autonomous security platform that operates 24/7 zero-trust network analysis, automated threat isolation and cryptographic data protection.'
    },
    {
      q: 'Can Senga Systems build custom software tailored for our specific industry?',
      a: 'Yes! We specialize in custom web applications, native mobile apps (iOS & Android), financial technology integration and enterprise resource planning systems tailored for Malawian and international compliance.'
    },
    {
      q: 'How do I request a consultation or quote?',
      a: 'You can click "Get a Quote" on any page or schedule a direct consultation via our Contact hub or by emailing info@senga.systems.'
    }
  ];

  const leadersList = [
    {
      name: 'Dr. Senga CEO',
      title: 'Founder & Chief Executive Officer',
      bio: 'Pioneer in artificial intelligence and enterprise software architecture with over 15 years leading technology initiatives across East Africa.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Chimwemwe Banda',
      title: 'Head of Software Engineering & AI',
      bio: 'Specialist in distributed cloud platforms, machine learning pipelines and high-concurrency database engineering.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Tiwonge Phiri',
      title: 'Director of SengaShield Cybersecurity',
      bio: 'Certified ethical hacker and zero-trust auditor protecting critical financial infrastructure across Malawi.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Kondwani Mwale',
      title: 'Head of ICT Infrastructure & Operations',
      bio: 'Expert in enterprise datacenters, fiber optic network routing and hybrid cloud migrations.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const partnersList = [
    { name: 'Microsoft Enterprise', cat: 'Cloud & Software', desc: 'Gold Certified Partner delivering Azure and Office 365 solutions.' },
    { name: 'VMware Cloud Solutions', cat: 'Virtualization', desc: 'Enterprise data center virtualization & hybrid cloud infrastructure.' },
    { name: 'Cisco Systems', cat: 'Cybersecurity & Networking', desc: 'High-availability hardware routing and zero-trust firewall systems.' },
    { name: 'Dell Technologies', cat: 'Data Storage & Servers', desc: 'Next-gen enterprise blade servers and storage arrays.' },
    { name: 'AWS Cloud Services', cat: 'Cloud Computing', desc: 'Scalable cloud database and serverless computing deployments.' },
    { name: 'RedHat Linux Enterprise', cat: 'Open Source Systems', desc: 'Secure containerized applications and Linux system support.' }
  ];

  return (
    <div className="space-y-0 bg-[#ffffff] font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. TOP BANNER (Deep Navy #23275c, NO outline/border) */}
      <section className="bg-[#23275c] text-white py-12 md:py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#23275c] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-blue-300">HOME / ABOUT US</span>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1 leading-tight">
                  {subpath === 'history' && 'Company History & Milestones'}
                  {subpath === 'leadership' && 'Executive Leadership Team'}
                  {subpath === 'partners' && 'Our Strategic Partners'}
                  {subpath === 'faqs' && 'Frequently Asked Questions'}
                  {(!subpath || subpath === 'profile') && (
                    <>
                      Building Intelligent Digital <br className="hidden sm:inline" /> Solutions That Matter
                    </>
                  )}
                </h1>
              </div>

              {/* Subpages Tabs (Combined Overview & Profile) */}
              <div className="flex flex-wrap items-center gap-2">
                <Link to="/about" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!subpath || subpath === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>Overview</Link>
                <Link to="/about/history" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'history' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>History</Link>
                <Link to="/about/leadership" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'leadership' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>Leadership</Link>
                <Link to="/about/partners" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'partners' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>Partners</Link>
                <Link to="/about/faqs" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'faqs' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>FAQs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC SUBPAGE CONTENT ON WHITE BACKGROUND (#ffffff) */}
      <div className="bg-[#ffffff] py-16 px-4 md:px-12">
        
        {/* 1. COMBINED OVERVIEW & PROFILE SECTION */}
        {(!subpath || subpath === 'profile') && (
          <section className="max-w-7xl mx-auto space-y-16">
            
            {/* Top Company Overview with a full-width #d9d9d9 background */}
            <div className="relative left-1/2 -translate-x-1/2 w-screen -mt-16 bg-[#d9d9d9] px-4 md:px-12 py-16">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                
                {/* Left Column: ABOUT OUR COMPANY / Company Overview Text */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-extrabold text-[#2563EB] block">
                      ABOUT OUR COMPANY
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#23275c] tracking-tight mt-1">
                      Company Overview
                    </h2>
                  </div>

                  <div className="space-y-4 text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                    <p>
                      At Senga Systems, we transform ideas into innovative digital solutions by combining artificial intelligence, modern software engineering, and human-centered design. We build secure, scalable, and high-performance technologies that help businesses, organizations, and communities improve efficiency, embrace digital transformation, and create lasting impact.
                    </p>
                    <p>
                      Our customer base spans multiple sectors, including financial institutions, telecommunications companies, government agencies, educational institutions, and private enterprises. We deliver enterprise-grade technology solutions tailored to meet the evolving needs of modern organizations, ranging from AI-driven automation and cloud infrastructure to cybersecurity, data analytics, and systems integration.
                    </p>
                    <p>
                      Through a strong combination of technical expertise, strategic partnerships, and deep industry knowledge, Senga Systems has built a reputation for reliability, innovation, and high-quality service delivery across Malawi and Africa.
                    </p>
                  </div>
                </div>

                {/* Right Column: YouTube Video Player & Download Company Profile Button */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white/80 p-4 rounded-3xl border border-slate-300 shadow-sm space-y-4">
                    
                    {/* YouTube video placeholder until the official video is ready */}
                    <div className="relative flex aspect-video items-center justify-center rounded-2xl border border-slate-300 bg-slate-900 px-6 text-center shadow-md">
                      <div className="space-y-2">
                        <h3 className="text-lg font-extrabold text-white">Company video coming soon</h3>
                        <p className="text-xs leading-relaxed text-slate-300">
                          Our official YouTube video has not been implemented yet. Please check back soon.
                        </p>
                      </div>
                    </div>

                    {/* Video Label & Download Button Below */}
                    <div className="space-y-3 pt-1">
                      <a
                        href="/assets/documents/Senga_Systems_Company_Profile.pdf"
                        download="Senga_Systems_Company_Profile.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3.5 px-4 rounded-2xl bg-[#23275c] hover:bg-[#1d2252] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer border border-blue-900"
                      >
                        <Download className="w-4 h-4 text-blue-300" />
                        <span>Download Company Profile (PDF)</span>
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Mission & Vision Cards with #d9d9d9 Background */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#d9d9d9] p-8 rounded-3xl border border-slate-300 shadow-md space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-[#0F172A]">Our Mission</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  To develop innovative, secure and intelligent digital solutions that empower businesses, organizations, government agencies and communities across Malawi and Africa through state-of-the-art software engineering, AI automation and unyielding cybersecurity defenses.
                </p>
              </div>

              <div className="bg-[#d9d9d9] p-8 rounded-3xl border border-slate-300 shadow-md space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-[#0F172A]">Our Vision</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  To become Africa's undisputed leader in intelligent innovation and secure digital infrastructure, recognized for delivering secure, AI-driven and impactful digital solutions that drive economic growth and technology self-reliance across the continent.
                </p>
              </div>
            </div>

            {/* Company Values with #23275c Heading, No Numbering/Emojis & #d9d9d9 Cards */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-[#23275c] text-center">
                Our Core Values
              </h2>
              
              <Reveal className="staggered-grid">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="p-6 rounded-2xl bg-[#d9d9d9] border border-slate-300 shadow-md space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base">Uncompromised Security & Trust</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    "Zero-trust engineering principles in every line of code. Security is integrated into every stage of our development lifecycle, ensuring resilient, reliable, and data-protected solutions."
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#d9d9d9] border border-slate-300 shadow-md space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base">Excellence, Precision & Innovation</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    "Delivering world-class code quality and system performance through agile methodologies, AI, and automation to keep our clients ahead in a rapidly evolving digital landscape."
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#d9d9d9] border border-slate-300 shadow-md space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base">Human-Centered Client Partnership</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    "Creating intuitive, accessible, and user-focused digital experiences with long-term dedicated technical support and advisory tailored to your business objectives."
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#d9d9d9] border border-slate-300 shadow-md space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base">Local Innovation & African Impact</h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    "Building software solutions tailored for African business environments, driving economic growth and technology self-reliance across the continent."
                  </p>
                </div>

              </div>
              </Reveal>
            </div>

            {/* CALL TO ACTION BANNER (media_1788204814083.png) */}
            <div className="bg-[#23275c] rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden border border-indigo-900">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold tracking-wide border border-white/15">
                Lets Build Together
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
                Ready To Empower Your Business With Technology?
              </h2>

              <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Partner With Senga Systems For Intelligent, Secure and Scalable Digital Solutions.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={openQuoteModal}
                  className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Get a Free Consultation</span>
                </button>

                <a
                  href="tel:+265884288849"
                  className="px-8 py-3.5 rounded-xl border border-white/40 hover:bg-white/10 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us Now</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs sm:text-sm font-semibold text-slate-200">
                <a href="tel:+265884288849" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>(+265) 884 288 849</span>
                </a>
                <a href="mailto:info@senga.systems" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>info@senga.systems</span>
                </a>
              </div>
            </div>

          </section>
        )}

        {/* 2. HISTORY */}
        {subpath === 'history' && (
          <section className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#2563EB] mx-auto flex items-center justify-center shadow-xs">
                <History className="w-7 h-7" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">Our Journey of Excellence</h2>
              <p className="text-sm text-slate-600 font-medium">Senga Systems is beginning its journey to deliver secure, AI-driven digital solutions.</p>
            </div>

            <div className="space-y-8 relative border-l-2 border-blue-200 ml-4 pl-6 sm:pl-8 py-2">
              <div className="relative">
                <span className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></span>
                <span className="text-xs font-mono font-black text-emerald-700 uppercase">2026</span>
                <h3 className="text-lg font-black text-[#0F172A]">Registration of Senga Systems</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Officially registered in 2026, Senga Systems turns a student dream into a formal technology startup. With a passionate team from Mzuzu University, we are ready to deliver secure, AI-driven digital solutions across Malawi and Africa. The journey has just begun.</p>
              </div>
            </div>
          </section>
        )}

        {/* 3. EXECUTIVE LEADERSHIP */}
        {subpath === 'leadership' && (
          <section className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">Executive Leadership Team</h2>
              <p className="text-sm text-slate-600 font-medium">Our executive leadership information is currently under development.</p>
            </div>

            <Reveal className="max-w-3xl mx-auto" style={{ transitionDelay: '80ms' }}>
            <div className="relative overflow-hidden min-h-[220px] bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 flex items-center justify-center text-center group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2563EB] rounded-l-2xl"></div>
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#D9D9D9] text-slate-900 flex items-center justify-center shadow-inner">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Executive members coming soon</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Executive member information will be updated as this section is developed.</p>
              </div>
            </div>
            </Reveal>
          </section>
        )}

        {/* 4. PARTNERS */}
        {subpath === 'partners' && (
          <section className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">Global Strategic Partners</h2>
              <p className="text-sm text-slate-600 font-medium">Our strategic partnerships will be announced as Senga Systems grows.</p>
            </div>

            <Reveal className="max-w-3xl mx-auto" style={{ transitionDelay: '80ms' }}>
            <div className="relative overflow-hidden min-h-[220px] bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 flex items-center justify-center text-center group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2563EB] rounded-l-2xl"></div>
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#D9D9D9] text-slate-900 flex items-center justify-center shadow-inner">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Partnerships coming soon</h3>
                <p className="text-sm text-slate-600 leading-relaxed">We currently do not have strategic partners. This information will be updated as the company grows.</p>
              </div>
            </div>
            </Reveal>
          </section>
        )}

        {/* 5. FAQS */}
        {subpath === 'faqs' && (
          <section className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#2563EB] mx-auto flex items-center justify-center shadow-xs">
                <HelpCircle className="w-7 h-7" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">Frequently Asked Questions</h2>
              <p className="text-sm text-slate-600 font-medium">Everything you need to know about partnering with Senga Systems.</p>
            </div>

            <div className="space-y-4">
              {faqsList.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#d9d9d9] border border-slate-300 rounded-2xl overflow-hidden cursor-pointer shadow-md"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <div className="p-5 flex items-center justify-between gap-4">
                    <h3 className="font-bold text-[#0F172A] text-base">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-[#2563EB] shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </div>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-700 border-t border-slate-300 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
}
