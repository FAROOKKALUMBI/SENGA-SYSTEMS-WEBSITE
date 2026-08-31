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
  Mail
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

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
      a: 'You can click "Get a Quote" on any page or schedule a direct consultation via our Contact hub or by emailing info@sengasystems.mw.'
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
                <span className="text-xs uppercase tracking-wider font-extrabold text-blue-300">ABOUT SENGA SYSTEMS</span>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  {subpath === 'profile' && 'Company Profile'}
                  {subpath === 'history' && 'Company History & Milestones'}
                  {subpath === 'leadership' && 'Executive Leadership Team'}
                  {subpath === 'partners' && 'Our Strategic Partners'}
                  {subpath === 'faqs' && 'Frequently Asked Questions'}
                  {!subpath && 'About Senga Systems'}
                </h1>
              </div>

              {/* Subpages Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <Link to="/about" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!subpath ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>Overview</Link>
                <Link to="/about/profile" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'}`}>Profile</Link>
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
        
        {/* 1. OVERVIEW & MAIN ABOUT */}
        {(!subpath || subpath === 'profile') && (
          <section className="max-w-7xl mx-auto space-y-16">
            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2563EB] border border-blue-200 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-[#0F172A]">Our Mission</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  To develop innovative, secure and intelligent digital solutions that empower businesses, organizations, government agencies and communities across Malawi and Africa through state-of-the-art software engineering, AI automation and unyielding cybersecurity defenses.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 border border-cyan-200 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-[#0F172A]">Our Vision</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  To become Africa's undisputed leader in intelligent innovation and secure digital infrastructure, recognized for delivering secure, AI-driven and impactful digital solutions that drive economic growth and technology self-reliance across the continent.
                </p>
              </div>
            </div>

            {/* Company Values */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-[#0F172A] text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base">1. 🔒 Uncompromised Security & Trust</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "Zero-trust engineering principles in every line of code. Security is integrated into every stage of our development lifecycle, ensuring resilient, reliable, and data-protected solutions."
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base">2. ⚡ Excellence, Precision & Innovation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "Delivering world-class code quality and system performance through agile methodologies, AI, and automation to keep our clients ahead in a rapidly evolving digital landscape."
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base">3. 👥 Human-Centered Client Partnership</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "Creating intuitive, accessible, and user-focused digital experiences with long-term dedicated technical support and advisory tailored to your business objectives."
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-base">4. 🌍 Local Innovation & African Impact</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "Building software solutions tailored for African business environments, driving economic growth and technology self-reliance across the continent."
                  </p>
                </div>
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
              <p className="text-sm text-slate-600 font-medium">From a pioneering cybersecurity team to Malawi's leading tech hub.</p>
            </div>

            <div className="space-y-8 relative border-l-2 border-blue-200 ml-4 pl-6 sm:pl-8 py-2">
              <div className="relative">
                <span className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-[#2563EB] border-4 border-white shadow-sm"></span>
                <span className="text-xs font-mono font-black text-[#2563EB] uppercase">2016</span>
                <h3 className="text-lg font-black text-[#0F172A]">Founding of Senga Systems</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Established in Lilongwe to provide specialized network security and software advisory.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-cyan-600 border-4 border-white shadow-sm"></span>
                <span className="text-xs font-mono font-black text-cyan-700 uppercase">2019</span>
                <h3 className="text-lg font-black text-[#0F172A]">Expansion into Enterprise Banking & Cloud</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Partnered with commercial banks across Malawi to deploy zero-trust backend systems.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white shadow-sm"></span>
                <span className="text-xs font-mono font-black text-indigo-700 uppercase">2023</span>
                <h3 className="text-lg font-black text-[#0F172A]">Launch of SengaShield AI Engine</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Introduced autonomous 24/7 threat protection powered by custom AI models.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white shadow-sm"></span>
                <span className="text-xs font-mono font-black text-emerald-700 uppercase">2026</span>
                <h3 className="text-lg font-black text-[#0F172A]">Nationwide Leadership & AI Transformation</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Operating full-scale AI labs, cybersecurity hubs and enterprise cloud data centers.</p>
              </div>
            </div>
          </section>
        )}

        {/* 3. EXECUTIVE LEADERSHIP */}
        {subpath === 'leadership' && (
          <section className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">Executive Leadership Team</h2>
              <p className="text-sm text-slate-600 font-medium">The visionary engineers and leaders behind Senga Systems.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadersList.map((leader, idx) => (
                <div key={idx} className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-center group hover:shadow-md transition-all">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-blue-400 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-black text-[#0F172A] text-base">{leader.name}</h3>
                    <p className="text-xs text-[#2563EB] font-bold mt-0.5">{leader.title}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. PARTNERS */}
        {subpath === 'partners' && (
          <section className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">Global Strategic Partners</h2>
              <p className="text-sm text-slate-600 font-medium">Collaborating with world leaders to power Malawi's digital ecosystem.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnersList.map((partner, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <span className="text-xs font-mono text-[#2563EB] uppercase tracking-wider font-bold">{partner.cat}</span>
                  <h3 className="font-black text-[#0F172A] text-xl">{partner.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{partner.desc}</p>
                </div>
              ))}
            </div>
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
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden cursor-pointer shadow-xs"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                >
                  <div className="p-5 flex items-center justify-between gap-4">
                    <h3 className="font-bold text-[#0F172A] text-base">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-[#2563EB] shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </div>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-200 leading-relaxed font-medium">
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
