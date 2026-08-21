import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ChevronDown, 
  Phone, 
  Mail, 
  UserCheck, 
  Menu, 
  X, 
  ArrowRight,
  Moon,
  Sun,
  BrainCircuit,
  Code,
  ShieldCheck,
  Server,
  BarChart3,
  Palette,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const { openQuoteModal } = useCMS();

  const handleMouseEnter = (name) => setActiveDropdown(name);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <header className="sticky top-0 z-50 w-full font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. TOP BAR (Exact Figma Color: #23275c Deep Purple-Navy with Top Blue Accent) */}
      <div className="bg-[#23275c] border-t-2 border-[#2b66bf] text-white text-xs py-2.5 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Left Contact Info */}
          <div className="flex items-center gap-6 text-slate-200">
            <a href="tel:+2650884288849" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-300" />
              <span className="font-medium tracking-wide">+265 (0) 884 288 849</span>
            </a>
            <a href="mailto:info@senga.systems" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-300" />
              <span className="font-medium tracking-wide">info@senga.systems</span>
            </a>
          </div>

          {/* Right Languages & Login */}
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-500/80">|</span>

            {/* Language Switcher */}
            <div className="flex items-center gap-2.5 font-bold text-[11px] tracking-wider">
              <span className="px-2.5 py-1 rounded bg-[#2b66bf] text-white shadow-sm">EN</span>
              <span className="text-slate-300 hover:text-white cursor-pointer px-1">PT</span>
              <span className="text-slate-300 hover:text-white cursor-pointer px-1">FR</span>
            </div>

            <span className="text-slate-500/80">|</span>

            {/* Login Link */}
            <Link to="/admin/login" className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors text-xs font-semibold">
              <span>Login</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            </Link>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVBAR (Pure White Background & Tightly Cropped Transparent SENGA SYSTEMS Logo) */}
      <div className="bg-white text-slate-900 border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 flex items-center justify-between">
          
          {/* Left Branding Lockup (Tightly Cropped Logo Image) */}
          <Link to="/" className="flex items-center gap-6 group">
            <img 
              src="/assets/logo/senga-logo.png" 
              alt="SENGA SYSTEMS™ Logo" 
              className="h-[48px] sm:h-[52px] object-contain shrink-0 transition-transform group-hover:scale-[1.02]"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            
            {/* Fallback Text Monogram */}
            <div className="hidden flex-col justify-center leading-[15px]">
              <span className="text-[14px] font-bold text-[#1E2364] tracking-[0.5px]">SENGA<sup className="text-[9px] font-bold">TM</sup></span>
              <span className="text-[14px] font-bold text-[#1E2364] tracking-[0.5px]">SYSTEMS</span>
            </div>

            {/* Tagline */}
            <p className="hidden md:block text-xs font-bold text-[#1E2364] tracking-wide max-w-[220px]">
              Building Intelligent Digital Solutions
            </p>
          </Link>

          {/* Center Navigation Links (Single Column Dropdowns matching Updates menu) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {/* Home (Active Soft Light Gray Pill) */}
            <Link to="/" className="px-5 py-2.5 rounded-xl bg-[#f1f5f9] text-[#1E2364] font-bold shadow-xs transition-all">
              Home
            </Link>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/about" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-blue-600 transition-colors">
                <span>About</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-60 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xl">
                    <Link to="/about" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-900 hover:bg-blue-50 hover:text-blue-600 font-bold">About Senga Systems</Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <Link to="/about/profile" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Company Profile</Link>
                    <Link to="/about/history" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Company History</Link>
                    <Link to="/about/leadership" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Executive Leadership</Link>
                    <Link to="/about/faqs" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">FAQs</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown (Single-Column Vertical Menu matching Updates) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/services" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-blue-600 transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xl">
                    <Link to="/services" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-900 hover:bg-blue-50 hover:text-blue-600 font-bold">
                      Services Overview
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <Link to="/services/ai" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      AI & Automation
                    </Link>
                    <Link to="/services/fullstack" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Software Engineering
                    </Link>
                    <Link to="/services/analytics" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Data & Analytics
                    </Link>
                    <Link to="/services/cybersecurity" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Security & Compliance
                    </Link>
                    <Link to="/services/ict-infrastructure" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      ICT & Infrastructure
                    </Link>
                    <Link to="/services/sengashield" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Design & Transformation
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Updates Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('updates')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/updates" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-blue-600 transition-colors">
                <span>Updates</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>
              {activeDropdown === 'updates' && (
                <div className="absolute top-full left-0 w-60 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xl">
                    <Link to="/updates" className="block px-3 py-2 rounded-lg text-sm text-slate-900 hover:bg-blue-50 hover:text-blue-600 font-bold">Updates Overview</Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <Link to="/updates/news" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">News & Press</Link>
                    <Link to="/updates/events" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Training & Events</Link>
                    <Link to="/updates/insights" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Insights & AI Trends</Link>
                    <Link to="/updates/vacancies" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-between">
                      <span>Vacancies</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono font-bold">Hiring</span>
                    </Link>
                    <Link to="/updates/announcements" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Announcements</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('contact')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/contact" className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:text-blue-600 transition-colors">
                <span>Contact</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>
              {activeDropdown === 'contact' && (
                <div className="absolute top-full left-0 w-60 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xl">
                    <Link to="/contact" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Contact Us</Link>
                    <Link to="/contact/quote" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Get a Quote</Link>
                    <Link to="/contact/payment" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Make a Payment</Link>
                    <Link to="/contact/schedule" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Schedule Consultation</Link>
                    <Link to="/contact/support" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Support Centre</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Far Right Action Controls (Dark Mode Moon + Envelope Get a Quote Button) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => openQuoteModal()}
              className="px-6 py-3 rounded-xl bg-[#2b66bf] hover:bg-[#21519a] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Get a Quote</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-4 text-slate-900">
          <div className="space-y-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold hover:text-blue-600">Home</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold hover:text-blue-600">About</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold hover:text-blue-600">Services</Link>
            <Link to="/updates" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold hover:text-blue-600">Updates</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold hover:text-blue-600">Contact</Link>
            <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-blue-600">Staff Portal Login</Link>
          </div>
          <button
            onClick={() => { setMobileMenuOpen(false); openQuoteModal(); }}
            className="w-full py-3 rounded-xl bg-[#2b66bf] text-white font-bold text-center flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Get a Quote</span>
          </button>
        </div>
      )}

    </header>
  );
}
