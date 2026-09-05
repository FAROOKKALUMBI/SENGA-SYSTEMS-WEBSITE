import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  Users, 
  Lock, 
  Sparkles, 
  Server, 
  Code2, 
  BrainCircuit, 
  Mail, 
  Phone,
  Calendar,
  Layers,
  Lightbulb,
  Bot,
  Cloud,
  PieChart,
  ShieldCheck,
  RadioTower,
  Shapes,
  Send,
  MessageSquare,
  Newspaper,
  Briefcase
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { api } from '../services/api';
import Reveal from '../components/Reveal';
import { FieldError, useFormValidation } from '../hooks/useFormValidation.jsx';

export default function HomePage() {
  const { openQuoteModal, posts, vacancies } = useCMS();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const newsletterValidation = useFormValidation({ email: { type: 'email', required: true } });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (newsletterValidation.validateAll({ email })) {
      try {
        await api.subscribeNewsletter(email);
        setNewsletterSubscribed(true);
        setNewsletterEmail('');
      } catch (error) {
        console.warn('Newsletter subscription failed:', error);
      }
    }
  };

  const serviceCards = [
    {
      title: 'AI & Automation',
      path: '/services#ai-automation',
      icon: Bot,
    },
    {
      title: 'Software Engineering',
      path: '/services#software-engineering',
      icon: Cloud,
    },
    {
      title: 'Data & Analytics',
      path: '/services#data-analytics',
      icon: PieChart,
    },
    {
      title: 'Security & Compliance',
      path: '/services#security-compliance',
      icon: ShieldCheck,
    },
    {
      title: 'ICT & Infrastructure',
      path: '/services#ict-infrastructure',
      icon: RadioTower,
    },
    {
      title: 'Design & Transformation',
      path: '/services#design-transformation',
      icon: Shapes,
    }
  ];

  return (
    <div className="space-y-0 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. HERO SECTION (Figma Blue Gradient & Monitor Blur) */}
      <section className="relative min-h-[520px] lg:min-h-[580px] pt-14 pb-20 md:pt-20 md:pb-28 bg-[#17386d] md:bg-gradient-to-r md:from-[#17386d] md:via-[#122e5a] md:to-[#0c1f3f] text-white overflow-hidden flex flex-col items-stretch lg:flex-row lg:items-center">
        
        {/* Right Monitor Code Blur Overlay */}
        <div 
          className="hero-visual hidden md:block absolute inset-y-0 right-0 w-full lg:w-3/5 bg-cover bg-right bg-no-repeat opacity-40 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/hero-bg.jpg'), url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80')" }}
        ></div>
        
        {/* Radial Gradient */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#17386d] via-[#17386d]/90 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 w-full text-left">
          <div className="max-w-2xl space-y-6">
            
            <div className="space-y-3">
              <h1 className="hero-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
                Senga Systems.
              </h1>

              <h2 className="hero-tagline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Experience the Power of Secure Technology
              </h2>

              <p className="hero-description text-lg sm:text-xl text-slate-200 leading-relaxed font-normal pt-2 max-w-xl">
                Empower your business with secure and scalable solutions.
              </p>
            </div>

            {/* Buttons (Figma Screenshot: White "Explore Services" & Outline "Get Started →") */}
            <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/services"
                className="primary-button px-8 py-3.5 rounded-xl bg-white text-[#0f264d] font-extrabold text-sm hover:bg-slate-100 transition-all shadow-xl cursor-pointer"
              >
                Explore Services
              </Link>

              <Link
                to="/quote"
                className="secondary-button px-8 py-3.5 rounded-xl border-2 border-white/90 text-white font-extrabold text-sm hover:bg-white/10 flex items-center gap-2.5 cursor-pointer transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="arrow-motion w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

        <div
          aria-hidden="true"
          className="md:hidden mt-10 w-full aspect-[16/9] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/images/hero-bg.jpg'), url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80')" }}
        ></div>
      </section>

      {/* 2. THREE OVERLAY FEATURE CARDS (Medium Proportional Icons matching media_1787271420931.png 1:1) */}
      <section className="relative bg-gradient-to-b from-[#122e5a] to-[#1d2252] text-white pt-4 pb-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#252a6a]/60 backdrop-blur-md p-6 rounded-2xl border border-indigo-500/30 shadow-2xl">
            
            {/* Card 1: Technical Experts */}
            <div className="flex items-start gap-4 p-2 border-r border-indigo-800/60 last:border-r-0">
              <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center shrink-0 bg-blue-600/20 p-2.5 shadow-sm">
                <img 
                  src="/assets/icons/technical-experts.png" 
                  alt="Technical Experts Icon" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">Technical Experts</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our Team is composed of certified professionals with combined expertise in AI, full-stack development and cybersecurity delivering secure, intelligent and scalable solutions.
                </p>
              </div>
            </div>

            {/* Card 2: Security-First Approach */}
            <div className="flex items-start gap-4 p-2 border-r border-indigo-800/60 last:border-r-0">
              <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center shrink-0 bg-blue-600/20 p-2.5 shadow-sm">
                <img 
                  src="/assets/icons/security-first.png" 
                  alt="Security First Icon" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">Security-First Approach</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We build security in at every layer from design to deployment—because protection should never be an afterthought
                </p>
              </div>
            </div>

            {/* Card 3: Innovation & Quality */}
            <div className="flex items-start gap-4 p-2">
              <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center shrink-0 bg-blue-600/20 p-2.5 shadow-sm">
                <img 
                  src="/assets/icons/innovation-quality.png" 
                  alt="Innovation Quality Icon" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">Innovation & Quality</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Continuous R&D in AI, blockchain and emerging technologies enterprise-grade solutions with rigorous testing and security audits.
                </p>
              </div>
            </div>

          </Reveal>
        </div>

      </section>

      {/* 3. ABOUT SENGA SYSTEMS SECTION */}
      <section className="bg-white text-slate-900 py-28 md:py-32 px-4 md:px-12 overflow-visible relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal className="about-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image Column with Plain Light Gray Rotated Rectangle */}
            <div className="about-image lg:col-span-6 relative max-w-[460px] w-full">
              
              {/* Plain Light Gray (#F1F2F4), Solid, Subtly Rotated Rectangle */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-[#F1F2F4] rounded-[24px] transform rotate-2 pointer-events-none shadow-sm"></div>

              {/* Main Image Container */}
              <div className="relative rounded-[20px] overflow-hidden bg-white z-10 w-full shadow-lg">
                <img
                  src="/assets/images/about-image.jpg"
                  alt="Senga Systems AI Engineer & Technology Partner"
                  className="w-full h-[380px] sm:h-[400px] object-cover contrast-[1.15] brightness-[1.03]"
                />
              </div>

              {/* Stat Card */}
              <div className="stat-card absolute -bottom-6 right-2 sm:right-6 bg-[#334155] text-white p-4 sm:p-5 rounded-2xl border border-slate-600/50 w-[250px] sm:w-[270px] shadow-2xl z-20">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 shrink-0">
                      <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-[#334155]"></div>
                      <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-[#334155]"></div>
                      <div className="w-7 h-7 rounded-full bg-slate-400 border-2 border-[#334155]"></div>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base leading-none">15+</h4>
                      <p className="text-[10px] text-slate-300 font-semibold mt-0.5">Certified Engineers</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-200 leading-snug font-normal">
                    Dedicated team of experts ready to support and secure your infrastructure 24/7.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Text Column Content & Tight Button */}
            <div className="about-copy lg:col-span-6 space-y-5 pt-8 lg:pt-0">
              <span className="text-blue-600 font-extrabold text-sm sm:text-base tracking-wider uppercase inline-block">
                About Senga Systems
              </span>

              <h2 className="text-4xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
                Malawi's AI-Powered Technology Partner
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
                With deep expertise in AI, software engineering and cybersecurity Senga Systems delivers intelligent, scalable solutions that empower businesses, organizations and communities.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2b66bf] hover:bg-[#21519a] text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="arrow-motion w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </Reveal>
        </div>
      </section>

      {/* 4. OUR SERVICES SECTION */}
      <section className="bg-[#D9D9D9] text-slate-900 py-20 px-4 md:px-12 border-t border-slate-300">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header Row: Top-Left Badge + Title, Top-Right Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFFFFF] text-slate-800 text-xs font-bold shadow-xs">
                What We Do
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2563EB] tracking-tight">
                Our Services
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#2563EB] text-[#2563EB] bg-[#FFFFFF] font-bold text-xs hover:bg-blue-50 transition-all shadow-xs shrink-0"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-[#2563EB]" />
            </Link>
          </div>

          {/* 6 Service Cards Row (Single Horizontal Row, Card BG #FFFFFF, Left Accent Bar, Tile #D9D9D9) */}
          <div className="staggered-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {serviceCards.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <Reveal key={idx} style={{ transitionDelay: `${idx * 100}ms` }}>
                <Link
                  key={idx}
                  to={service.path}
                  className="homepage-service-card relative overflow-hidden p-6 rounded-[16px] bg-[#FFFFFF] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center justify-between group min-h-[190px]"
                >
                  {/* Left Edge Accent Bar (~4px wide, full height) */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2563EB] rounded-l-[16px]"></div>

                  {/* Centered Icon Tile (Tile Fill #D9D9D9, ~64x64px, rounded corners) */}
                  <div className="w-16 h-16 rounded-2xl bg-[#D9D9D9] text-slate-900 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform mb-4">
                    <IconComp className="w-8 h-8 text-slate-900 stroke-[2.2]" />
                  </div>

                  {/* Bold Black Label Text */}
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    {service.title}
                  </h3>
                </Link>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* NEWS AND EVENTS DISPLAY SECTION */}
      <section className="bg-white py-16 px-4 md:px-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                News and Events
              </h2>
            </div>
            <Link
              to="/updates"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#2563EB] hover:underline"
            >
              <span>View All Updates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts && posts.length > 0 ? (
              posts.slice(0, 4).map((post) => (
                <div key={post.id} className="p-6 rounded-2xl bg-[#D9D9D9]/50 border border-slate-300/60 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {post.image && (
                      <img src={post.image} alt={post.title} className="w-full h-44 rounded-xl object-cover" />
                    )}
                    <div className="flex items-center justify-between text-xs font-bold text-[#2563EB]">
                      <span className="uppercase font-extrabold">{post.type}</span>
                      <span className="text-slate-500">{post.date}</span>
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-900 leading-snug">{post.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{post.excerpt || post.content}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-300/60 flex items-center justify-between text-xs font-bold text-[#2563EB]">
                    <span>By {post.author || 'Senga Team'}</span>
                    <Link to="/updates" className="hover:underline flex items-center gap-1">
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 rounded-2xl bg-[#D9D9D9]/40 text-center text-xs text-slate-500 col-span-2">
                No news articles or events published yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. GET THE LATEST TECH UPDATES */}
      <section className="bg-[#23275c] text-white py-20 px-4 md:px-12 border-t border-indigo-900/40">
        <Reveal className="newsletter-reveal max-w-4xl mx-auto text-center space-y-7">
          
          {/* Top Cyan Envelope Tile */}
          <div className="subscribe-icon w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
            <Mail className="w-7 h-7 text-cyan-300 stroke-[2.2]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Get The Latest Tech Updates
          </h2>

          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
            Sign Up For Our Newsletter And Get The Latest News Updates And Exclusive Offers.Delivered Straight To Your Inbox
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold text-sm max-w-md mx-auto">
              🎉 Thank you for subscribing!
            </div>
          ) : (
            <>
            <form noValidate onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-lg mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                {...newsletterValidation.fieldProps('email', newsletterEmail)}
                aria-label="Email address"
                className="flex-1 w-full px-5 py-3.5 rounded-xl bg-[#2858a3] text-white placeholder-blue-200/80 text-sm focus:outline-none border border-blue-400/40 shadow-inner"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#d9d9d9] hover:bg-white text-slate-900 font-extrabold text-sm shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 text-slate-900 stroke-[2.5]" />
              </button>
            </form>
            <FieldError name="email" error={newsletterValidation.errors.email} />
            </>
          )}

          <p className="text-xs sm:text-sm text-slate-300 font-medium pt-1">
            Join 100+ IT professionals. No spam, unsubscribe anytime.
          </p>
        </Reveal>
      </section>

      {/* 6. READY TO EMPOWER YOUR BUSINESS */}
      <section className="bg-white py-24 px-4 md:px-12">
        <Reveal className="cta-reveal max-w-5xl mx-auto bg-[#23275c] text-white rounded-[44px] p-10 md:p-16 text-center space-y-7 shadow-2xl relative overflow-hidden">
          
          {/* Top Pill Badge "Lets Build Together" */}
          <div className="cta-pill inline-block px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 border border-white/15 text-xs font-semibold tracking-wide">
            Lets Build Together
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Ready To Empower Your Business With Technology?
          </h2>

          {/* Paragraph */}
          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto font-normal leading-relaxed">
            Partner With Senga Systems For Intelligent, Secure and Scalable Digital Solutions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/quote"
              className="px-7 py-3.5 rounded-xl bg-[#2b66bf] hover:bg-[#21519a] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get a Free Consultation</span>
            </Link>

            <a
              href="tel:+2650884288849"
              className="px-7 py-3.5 rounded-xl border border-white/60 text-white font-bold text-xs sm:text-sm hover:bg-white/10 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us Now</span>
            </a>
          </div>

          {/* Bottom Contact Details */}
          <div className="pt-6 border-t border-indigo-900/60 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>(+265) 884 288 849</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>info@senga.systems</span>
            </div>
          </div>

        </Reveal>
      </section>

    </div>
  );
}
