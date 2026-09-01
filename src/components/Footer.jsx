import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import useReveal from '../hooks/useReveal';

export default function Footer() {
  const [footerRef, footerInView] = useReveal();

  return (
    <footer ref={footerRef} className={`footer-reveal ${footerInView ? 'in-view' : ''} bg-[#23275c] border-t-2 border-[#2b66bf] text-slate-300 font-['Plus_Jakarta_Sans',sans-serif] pt-16 pb-10`}>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16">
          
          {/* Column 1: White Logo & Your Trusted Partner Tagline & Social Icons */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <img 
                src="/assets/logo/senga-logo-white.png" 
                alt="SENGA SYSTEMS™ White Logo" 
                className="h-[48px] sm:h-[52px] object-contain shrink-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-white font-extrabold text-xl">
                SENGA SYSTEMS™
              </div>
            </Link>

            <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-sm">
              Your Trusted Partner for<br />Intelligent, Secure Digital Solutions
            </p>

            {/* Social Media Rounded Square Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.facebook.com/share/1Ec8SBEDiM/" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon w-9 h-9 rounded-lg bg-white/10 text-white hover:bg-[#2b66bf] transition-colors flex items-center justify-center shadow-sm"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#"
                onClick={(event) => event.preventDefault()}
                className="social-icon w-9 h-9 rounded-lg bg-white/10 text-white/50 cursor-not-allowed transition-colors flex items-center justify-center shadow-sm"
                title="Twitter / X coming soon"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/senga-systems/" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon w-9 h-9 rounded-lg bg-white/10 text-white hover:bg-[#2b66bf] transition-colors flex items-center justify-center shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#"
                onClick={(event) => event.preventDefault()}
                className="social-icon w-9 h-9 rounded-lg bg-white/10 text-white/50 cursor-not-allowed transition-colors flex items-center justify-center shadow-sm"
                title="YouTube coming soon"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Company Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Company</h4>
            <ul className="footer-links space-y-2.5 text-sm font-normal text-slate-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about/team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/about/partners" className="hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/updates/news" className="hover:text-white transition-colors">News & Updates</Link></li>
              <li><Link to="/updates/vacancies" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Our Services</h4>
            <ul className="footer-links space-y-2.5 text-sm font-normal text-slate-300">
              <li><Link to="/services#ai-automation" className="hover:text-white transition-colors">AI & Automation</Link></li>
              <li><Link to="/services#software-engineering" className="hover:text-white transition-colors">Software Engineering</Link></li>
              <li><Link to="/services#data-analytics" className="hover:text-white transition-colors">Data & Analytics</Link></li>
              <li><Link to="/services#security-compliance" className="hover:text-white transition-colors">Security & Compliance</Link></li>
              <li><Link to="/services#ict-infrastructure" className="hover:text-white transition-colors">ICT & Infrastructure</Link></li>
              <li><Link to="/services#design-transformation" className="hover:text-white transition-colors">Design & Transformation</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us Information & Malawi Locations */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-sm font-normal text-slate-300">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-300 shrink-0" />
                <span>(+265) 884 288 849</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-300 shrink-0" />
                <span>info@senga.systems</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p>Mzuzu, Malawi <span className="text-cyan-400 text-xs font-semibold">(HQ)</span></p>
                  <p>Blantyre, Malawi</p>
                  <p>Lilongwe, Malawi</p>
                  <p>Mangochi, Malawi</p>
                  <p>Salima, Malawi</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="pt-8 border-t border-indigo-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-300 font-medium">
          <p>© {new Date().getFullYear()} Senga Systems Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
