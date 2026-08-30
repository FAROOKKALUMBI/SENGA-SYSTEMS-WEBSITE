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
    <div className="space-y-16 py-12">
      {/* Top Banner Navigation */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="glass-card bg-[#0F172A] border border-slate-700 rounded-3xl p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-blue-400">About Senga Systems</span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
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
              <Link to="/about" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!subpath ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Overview</Link>
              <Link to="/about/profile" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'profile' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Profile</Link>
              <Link to="/about/history" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'history' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>History</Link>
              <Link to="/about/leadership" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'leadership' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Leadership</Link>
              <Link to="/about/partners" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'partners' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>Partners</Link>
              <Link to="/about/faqs" className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${subpath === 'faqs' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>FAQs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RENDER DYNAMIC SUBPAGE CONTENT */}

      {/* 1. OVERVIEW & MAIN ABOUT */}
      {(!subpath || subpath === 'profile') && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                To empower businesses, government agencies and organizations across Malawi and Africa through secure, state-of-the-art software engineering, AI automation and unyielding cybersecurity defenses.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                To be the undisputed leader in intelligent innovation and secure digital infrastructure across Africa, driving economic growth and technology self-reliance.
              </p>
            </div>
          </div>

          {/* Company Values */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-white text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <Shield className="w-8 h-8 text-blue-400" />
                <h3 className="font-bold text-white text-base">Uncompromised Security</h3>
                <p className="text-xs text-slate-400">Zero-trust engineering principles in every line of code.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <Award className="w-8 h-8 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Excellence & Precision</h3>
                <p className="text-xs text-slate-400">Delivering world-class code quality and system performance.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <Globe className="w-8 h-8 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Local Innovation</h3>
                <p className="text-xs text-slate-400">Building software solutions tailored for African business environments.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <Users className="w-8 h-8 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Client Partnership</h3>
                <p className="text-xs text-slate-400">Long-term dedicated technical support and advisory.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. HISTORY */}
      {subpath === 'history' && (
        <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <History className="w-10 h-10 text-blue-400 mx-auto" />
            <h2 className="text-3xl font-extrabold text-white">Our Journey of Excellence</h2>
            <p className="text-sm text-slate-400">From a pioneering cybersecurity team to Malawi's leading tech hub.</p>
          </div>

          <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 pl-6">
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#0B132B]"></span>
              <span className="text-xs font-mono font-bold text-blue-400">2016</span>
              <h3 className="text-lg font-bold text-white">Founding of Senga Systems</h3>
              <p className="text-xs text-slate-300 mt-1">Established in Lilongwe to provide specialized network security and software advisory.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#0B132B]"></span>
              <span className="text-xs font-mono font-bold text-cyan-400">2019</span>
              <h3 className="text-lg font-bold text-white">Expansion into Enterprise Banking & Cloud</h3>
              <p className="text-xs text-slate-300 mt-1">Partnered with commercial banks across Malawi to deploy zero-trust backend systems.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0B132B]"></span>
              <span className="text-xs font-mono font-bold text-indigo-400">2023</span>
              <h3 className="text-lg font-bold text-white">Launch of SengaShield AI Engine</h3>
              <p className="text-xs text-slate-300 mt-1">Introduced autonomous 24/7 threat protection powered by custom AI models.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#0B132B]"></span>
              <span className="text-xs font-mono font-bold text-emerald-400">2026</span>
              <h3 className="text-lg font-bold text-white">Nationwide Leadership & AI Transformation</h3>
              <p className="text-xs text-slate-300 mt-1">Operating full-scale AI labs, cybersecurity hubs and enterprise cloud data centers.</p>
            </div>
          </div>
        </section>
      )}

      {/* 3. EXECUTIVE LEADERSHIP */}
      {subpath === 'leadership' && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Executive Leadership Team</h2>
            <p className="text-sm text-slate-400">The visionary engineers and leaders behind Senga Systems.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadersList.map((leader, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 text-center group">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-blue-500/40 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h3 className="font-bold text-white text-base">{leader.name}</h3>
                  <p className="text-xs text-blue-400 font-semibold mt-0.5">{leader.title}</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. PARTNERS */}
      {subpath === 'partners' && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Global Strategic Partners</h2>
            <p className="text-sm text-slate-400">Collaborating with world leaders to power Malawi's digital ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnersList.map((partner, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{partner.cat}</span>
                <h3 className="font-bold text-white text-xl">{partner.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{partner.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. FAQS */}
      {subpath === 'faqs' && (
        <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <HelpCircle className="w-10 h-10 text-blue-400 mx-auto" />
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400">Everything you need to know about partnering with Senga Systems.</p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card border border-slate-800 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <div className="p-5 flex items-center justify-between gap-4">
                  <h3 className="font-bold text-white text-base">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-blue-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
