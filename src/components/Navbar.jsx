import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  ChevronDown, 
  Phone, 
  Mail, 
  UserCheck, 
  Menu, 
  X, 
  ArrowRight,
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
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openQuoteModal } = useCMS();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name) => setActiveDropdown(name);
  const handleMouseLeave = () => setActiveDropdown(null);
  const isSectionActive = (section) => location.pathname === section || location.pathname.startsWith(`${section}/`);
  const navLinkClass = (section) => `nav-link-motion flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${isSectionActive(section) ? 'bg-[#f1f5f9] text-[#1E2364] font-bold' : 'hover:text-blue-600'}`;

  return (
    <header className={`sticky top-0 z-50 w-full font-['Plus_Jakarta_Sans',sans-serif] navbar-shell ${isScrolled ? 'is-scrolled' : ''}`}>
      
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

          {/* Right Senga Way & Login */}
          <div className="flex items-center gap-4 text-xs">
            <Link to="/senga-way" className="px-3 py-1.5 rounded-lg bg-[#53eafd] text-[#0f264d] font-extrabold hover:bg-[#2fd3e8] transition-colors">
              The Senga Way
            </Link>

            {/* Login Link */}
            <Link to="/admin/login" className="px-3 py-1.5 rounded-lg border border-white/60 text-white font-extrabold hover:bg-white/10 transition-colors text-xs">
              Login
            </Link>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVBAR (Pure White Background & Tightly Cropped Transparent SENGA SYSTEMS Logo) */}
      <div className="bg-white text-slate-900 border-b border-slate-200/80 shadow-sm">
        <div className={`max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between transition-[padding] duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
          
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
            <Link to="/" className={`px-5 py-2.5 rounded-xl transition-all ${location.pathname === '/' ? 'bg-[#f1f5f9] text-[#1E2364] font-bold shadow-xs' : 'hover:text-blue-600'}`}>
              Home
            </Link>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/about" className={navLinkClass('/about')}>
                <span>About</span>
                <ChevronDown className={`chevron-motion w-4 h-4 text-slate-400 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </Link>
              {activeDropdown === 'about' && (
                <div className="dropdown-panel absolute top-full left-0 w-60 pt-2">
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
              <Link to="/services" className={navLinkClass('/services')}>
                <span>Services</span>
                <ChevronDown className={`chevron-motion w-4 h-4 text-slate-400 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </Link>
              {activeDropdown === 'services' && (
                <div className="dropdown-panel absolute top-full left-0 w-64 pt-2">
                  <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xl">
                    <Link to="/services#ai-automation" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      AI & Automation
                    </Link>
                    <Link to="/services#software-engineering" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Software Engineering
                    </Link>
                    <Link to="/services#data-analytics" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Data & Analytics
                    </Link>
                    <Link to="/services#security-compliance" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      Security & Compliance
                    </Link>
                    <Link to="/services#ict-infrastructure" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                      ICT & Infrastructure
                    </Link>
                    <Link to="/services#design-transformation" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
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
              <Link to="/updates" className={navLinkClass('/updates')}>
                <span>Updates</span>
                <ChevronDown className={`chevron-motion w-4 h-4 text-slate-400 ${activeDropdown === 'updates' ? 'rotate-180' : ''}`} />
              </Link>
              {activeDropdown === 'updates' && (
                <div className="dropdown-panel absolute top-full left-0 w-60 pt-2">
                  <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xl">
                    <Link to="/updates/news" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">News</Link>
                    <Link to="/updates/events" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Events</Link>
                    <Link to="/updates/vacancies" onClick={() => setActiveDropdown(null)} className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-between">
                      <span>Vacancies</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono font-bold">Hiring</span>
                    </Link>
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
              <Link to="/contact" className={navLinkClass('/contact')}>
                <span>Contact</span>
                <ChevronDown className={`chevron-motion w-4 h-4 text-slate-400 ${activeDropdown === 'contact' ? 'rotate-180' : ''}`} />
              </Link>
              {activeDropdown === 'contact' && (
                <div className="dropdown-panel absolute top-full left-0 w-60 pt-2">
                  <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xl">
                    <Link to="/contact" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Contact Us</Link>
                    <Link to="/contact/quote" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Get a Quote</Link>
                    <Link to="/contact/payment" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Make a Payment</Link>
                    <Link to="/contact/schedule" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Schedule Consultation</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Far Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/quote"
              className="px-6 py-3 rounded-xl bg-[#2b66bf] hover:bg-[#21519a] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Get a Quote</span>
            </Link>
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
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block rounded-lg px-3 py-2 font-bold ${location.pathname === '/' ? 'bg-[#f1f5f9] text-[#1E2364]' : 'hover:text-blue-600'}`}>Home</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`block rounded-lg px-3 py-2 font-bold ${isSectionActive('/about') ? 'bg-[#f1f5f9] text-[#1E2364]' : 'hover:text-blue-600'}`}>About</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className={`block rounded-lg px-3 py-2 font-bold ${isSectionActive('/services') ? 'bg-[#f1f5f9] text-[#1E2364]' : 'hover:text-blue-600'}`}>Services</Link>
            <Link to="/updates" onClick={() => setMobileMenuOpen(false)} className={`block rounded-lg px-3 py-2 font-bold ${isSectionActive('/updates') ? 'bg-[#f1f5f9] text-[#1E2364]' : 'hover:text-blue-600'}`}>Updates</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`block rounded-lg px-3 py-2 font-bold ${isSectionActive('/contact') ? 'bg-[#f1f5f9] text-[#1E2364]' : 'hover:text-blue-600'}`}>Contact</Link>
            <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-blue-600">Staff Portal Login</Link>
          </div>
          <Link
            to="/quote"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 rounded-xl bg-[#2b66bf] text-white font-bold text-center flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Get a Quote</span>
          </Link>
        </div>
      )}

    </header>
  );
}
