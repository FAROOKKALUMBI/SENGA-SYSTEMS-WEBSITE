import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bot,
  BrainCircuit, 
  Sparkles, 
  Cpu, 
  Server, 
  Code2, 
  Globe, 
  Smartphone, 
  Layers, 
  Building2, 
  ShieldCheck, 
  Cloud, 
  CloudCog, 
  PieChart, 
  BarChart3, 
  Lightbulb, 
  Shield, 
  Lock, 
  RadioTower, 
  Palette, 
  Shapes, 
  ArrowRight, 
  CheckCircle2, 
  Database,
  Headphones,
  Activity,
  HardDrive,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import Reveal from '../components/Reveal';

export const serviceCategories = [
  {
    id: 'ai-automation',
    title: '1. AI & Automation',
    shortTitle: 'AI & Automation',
    description: 'We build practical AI and automation solutions that cut manual work, surface insights faster and let your team focus on higher-value tasks.',
    icon: Bot,
    badgeBg: 'bg-[#2563EB]',
    subServices: [
      { id: 'custom-ai-solutions', name: 'Custom AI Solutions' },
      { id: 'workflow-automation', name: 'Workflow Automation' },
      { id: 'predictive-analytics', name: 'Predictive Analytics' },
      { id: 'natural-language-processing', name: 'Natural Language Processing (NLP)' },
      { id: 'ai-integration-deployment', name: 'AI Integration & Deployment' },
      { id: 'machine-learning-deep-learning', name: 'Machine Learning & Deep Learning' },
      { id: 'intelligent-document-processing', name: 'Intelligent Document Processing (IDP)' }
    ]
  },
  {
    id: 'software-engineering',
    title: '2. Software Engineering',
    shortTitle: 'Software Engineering',
    description: 'Building robust, scalable and secure software applications from the ground up to power modern enterprises, modernize legacy applications and drive digital growth.',
    icon: Cloud,
    badgeBg: 'bg-[#0284C7]',
    subServices: [
      { id: 'custom-software-development', name: 'Custom Software Development' },
      { id: 'full-stack-web-development', name: 'Full-Stack Web Development' },
      { id: 'progressive-web-applications', name: 'Progressive Web Applications (PWAs)' },
      { id: 'e-commerce-solutions', name: 'E-Commerce Solutions' },
      { id: 'content-management-systems', name: 'Content Management Systems (CMS)' },
      { id: 'api-development-integration', name: 'API Development & Integration' },
      { id: 'enterprise-web-applications', name: 'Enterprise Web Applications' },
      { id: 'mobile-applications', name: 'Mobile Applications (Android, iOS, Flutter, React Native)' },
      { id: 'backend-systems', name: 'Backend Systems' },
      { id: 'source-code-quality-assurance', name: 'Source Code & Quality Assurance' },
      { id: 'system-integration', name: 'System Integration' },
      { id: 'devsecops-ci-cd', name: 'DevSecOps & CI/CD' },
      { id: 'legacy-system-modernization', name: 'Legacy System Modernization' },
      { id: 'cloud-native-solutions', name: 'Cloud-Native Solutions' },
      { id: 'offline-first-applications', name: 'Offline-First Applications' }
    ]
  },
  {
    id: 'data-analytics',
    title: '3. Data & Analytics',
    shortTitle: 'Data & Analytics',
    description: 'Transform raw data into actionable insights that drive informed decision-making across your business with interactive dashboards and predictive intelligence.',
    icon: PieChart,
    badgeBg: 'bg-[#D97706]',
    subServices: [
      { id: 'data-strategy-governance', name: 'Data Strategy & Governance' },
      { id: 'data-analysis', name: 'Data Analysis' },
      { id: 'interactive-dashboards', name: 'Interactive Dashboards' },
      { id: 'business-intelligence-reporting', name: 'Business Intelligence Reporting' },
      { id: 'predictive-modeling', name: 'Predictive Modeling' },
      { id: 'machine-learning-solutions', name: 'Machine Learning Solutions' },
      { id: 'analytics-insights', name: 'Analytics & Insights' },
      { id: 'data-engineering', name: 'Data Engineering' },
      { id: 'reporting-automation', name: 'Reporting Automation' }
    ]
  },
  {
    id: 'security-compliance',
    title: '4. Security & Compliance',
    shortTitle: 'Security & Compliance',
    description: 'Protect your systems, networks and digital assets with industry-standard security practices, continuous threat defense and regulatory compliance.',
    icon: ShieldCheck,
    badgeBg: 'bg-[#059669]',
    subServices: [
      { id: 'vulnerability-assessments', name: 'Vulnerability Assessments' },
      { id: 'penetration-testing', name: 'Penetration Testing' },
      { id: 'security-audits', name: 'Security Audits' },
      { id: 'network-security', name: 'Network Security' },
      { id: 'security-compliance', name: 'Security Compliance' },
      { id: 'cyber-defense', name: 'Cyber Defense' },
      { id: 'identity-access-management', name: 'Identity & Access Management (IAM)' },
      { id: 'data-security-encryption', name: 'Data Security (Encryption)' },
      { id: 'security-consulting', name: 'Security Consulting' },
      { id: 'data-encryption', name: 'Data Encryption' },
      { id: 'blockchain-development', name: 'Blockchain Development' },
      { id: 'smart-contract-development', name: 'Smart Contract Development' },
      { id: 'decentralized-applications', name: 'Decentralized Applications (dApps)' },
      { id: 'digital-identity-solutions', name: 'Digital Identity Solutions' }
    ]
  },
  {
    id: 'ict-infrastructure',
    title: '5. ICT & Infrastructure',
    shortTitle: 'ICT & Infrastructure',
    description: 'Reliable networking and IT solutions designed to support modern organizations with high-availability cloud hosting, server administration and 24/7 helpdesk.',
    icon: RadioTower,
    badgeBg: 'bg-[#7C3AED]',
    subServices: [
      { id: 'network-design-installation', name: 'Network Design & Installation' },
      { id: 'server-deployment', name: 'Server Deployment' },
      { id: 'systems-administration', name: 'Systems Administration' },
      { id: 'internet-infrastructure', name: 'Internet Infrastructure' },
      { id: 'cloud-hybrid-infrastructure', name: 'Cloud & Hybrid Infrastructure' },
      { id: 'cloud-hosting', name: 'Cloud Hosting' },
      { id: 'domain-registration-management', name: 'Domain Registration & Management' },
      { id: 'ssl-certificates', name: 'SSL Certificates' },
      { id: 'cloud-migration', name: 'Cloud Migration' },
      { id: 'infrastructure-management', name: 'Infrastructure Management' },
      { id: 'network-services', name: 'Network Services' },
      { id: 'cloud-datacenter-management', name: 'Cloud & Datacenter Management' },
      { id: 'support-helpdesk', name: 'Support & Helpdesk' }
    ]
  },
  {
    id: 'design-transformation',
    title: '6. Design & Transformation',
    shortTitle: 'Design & Transformation',
    description: 'Enabling meaningful change through human-centric design and strategy, intuitive UI/UX experiences, brand identity development and technology advisory.',
    icon: Shapes,
    badgeBg: 'bg-[#DB2777]',
    subServices: [
      { id: 'digital-transformation-strategy', name: 'Digital Transformation Strategy' },
      { id: 'service-design', name: 'Service Design' },
      { id: 'change-management-storytelling', name: 'Change Management & Storytelling' },
      { id: 'process-re-engineering', name: 'Process Re-engineering' },
      { id: 'ui-ux-design', name: 'UI/UX Design' },
      { id: 'brand-identity', name: 'Brand Identity' },
      { id: 'graphic-design', name: 'Graphic Design' },
      { id: 'wireframing-prototyping', name: 'Wireframing & Prototyping' },
      { id: 'product-design', name: 'Product Design' },
      { id: 'technology-strategy', name: 'Technology Strategy' },
      { id: 'digital-transformation-advisory', name: 'Digital Transformation Advisory' },
      { id: 'it-roadmap-planning', name: 'IT Roadmap Planning' },
      { id: 'architecture-review', name: 'Architecture Review' },
      { id: 'technology-selection-procurement', name: 'Technology Selection & Procurement' },
      { id: 'mobile-ui-ux-design', name: 'Mobile UI/UX Design' }
    ]
  }
];

export const technicalServices = [
  {
    id: 'ai-systems-support',
    title: 'AI Systems Support',
    icon: Bot,
    description: 'Dedicated technical administration, model maintenance and inference optimization for enterprise AI systems.',
    bullets: [
      'AI Model Monitoring & Maintenance',
      'RAG & Vector Database Tuning',
      'Inference API Rate & Speed Optimization',
      'LLM Security & Guardrail Protection'
    ]
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    icon: Cloud,
    description: 'End-to-end design, deployment and 24/7 administration of AWS, Azure and hybrid cloud environments.',
    bullets: [
      'Multi-Cloud & Hybrid Deployment',
      'Auto-Scaling & Load Balancing',
      'Cloud Storage & Cost Optimization',
      'Serverless Architecture Management'
    ]
  },
  {
    id: 'cybersecurity-operations',
    title: 'Cybersecurity Operations',
    icon: ShieldCheck,
    description: 'Proactive 24/7 security monitoring, threat containment, perimeter defense and vulnerability mitigation.',
    bullets: [
      'Perimeter Firewalls & IDS/IPS',
      'Vulnerability Assessment & Pen Testing',
      'Real-Time Threat Isolation',
      'Zero-Day Vulnerability Defense'
    ]
  },
  {
    id: 'database-management',
    title: 'Database Management',
    icon: Database,
    description: 'Comprehensive database administration, query optimization, high-availability clustering and secure data backups.',
    bullets: [
      'Database Architecture & Indexing',
      'Performance Tuning & Query Optimization',
      'Master-Slave Replication & Clustering',
      'Automated Backup & Encryption'
    ]
  },
  {
    id: 'network-connectivity',
    title: 'Network & Connectivity',
    icon: RadioTower,
    description: 'Enterprise networking setup, structured fiber cabling, secure VPN routing and high-speed Wi-Fi architecture.',
    bullets: [
      'Structured Fiber & Copper Cabling',
      'Enterprise Wi-Fi & Mesh Setup',
      'Core Router & Switch Configuration',
      'SD-WAN & Site-to-Site VPNs'
    ]
  },
  {
    id: 'devops-cicd',
    title: 'DevOps & CI/CD',
    icon: Cpu,
    description: 'Automated deployment pipelines, infrastructure as code, container orchestration and continuous integration.',
    bullets: [
      'Automated Build & Release Pipelines',
      'Docker & Kubernetes Orchestration',
      'Infrastructure as Code (Terraform)',
      'Automated Static Security Scanning'
    ]
  },
  {
    id: 'system-administration',
    title: 'System Administration',
    icon: Server,
    description: 'Expert administration of Windows, Linux, active directory, user permissions and server virtualization.',
    bullets: [
      'Linux & Windows Server Management',
      'OS Patching & Kernel Hardening',
      'Active Directory & User Provisioning',
      'Server Virtualization (VMware/Hyper-V)'
    ]
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    icon: Lightbulb,
    description: 'Strategic technical guidance for CTOs, IT procurement advisory, enterprise architecture audits and technology roadmaps.',
    bullets: [
      'Technology Roadmap & Architecture Audit',
      'IT Procurement & Vendor Benchmarking',
      'Digital Transformation Advisory',
      'Disaster Preparedness Strategy'
    ]
  },
  {
    id: 'backup-recovery',
    title: 'Backup & Recovery',
    icon: HardDrive,
    description: 'Robust data backup strategies, offsite replication, quick restore protocols and business continuity planning.',
    bullets: [
      'Automated Offsite Cloud Backups',
      'Encrypted Snapshot Vaults',
      'Rapid Recovery & Restoration Drills',
      'Business Continuity Frameworks'
    ]
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    icon: Activity,
    description: 'Continuous system health tracking, bottleneck resolution, bandwidth optimization and capacity planning.',
    bullets: [
      'Real-Time Health & Resource Tracking',
      'Application Bottleneck Profiling',
      'Traffic & Latency Optimization',
      'Capacity Forecasting & Scaling'
    ]
  }
];

export default function ServicesPages() {
  const location = useLocation();
  const [expandedTechId, setExpandedTechId] = useState('ai-systems-support');

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="space-y-0 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. HERO BANNER SECTION (Deep Navy Background #23275c, Left-Aligned with White Text) */}
      <section className="bg-[#23275c] text-white py-16 md:py-20 px-4 md:px-12 border-b border-indigo-900/40">
        <div className="max-w-7xl mx-auto space-y-4 text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold tracking-wide border border-white/15 uppercase">
            Comprehensive Digital Capabilities
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Our Services & Capabilities
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl pt-1">
            Discover our comprehensive technology solutions and managed IT support services engineered to drive business growth, security and digital transformation.
          </p>
        </div>
      </section>

      {/* 2. MAIN SERVICE CARDS GRID SECTION (Light Gray #D9D9D9 Background, Pure White #FFFFFF Cards) */}
      <section className="bg-[#D9D9D9] text-slate-900 py-20 px-4 md:px-12 border-t border-slate-300">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {serviceCategories.map((cat, index) => {
              const CatIcon = cat.icon;
              return (
                <Reveal
                  key={cat.id} 
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className="service-card"
                >
                <div 
                  id={cat.id} 
                  className="scroll-mt-28 relative overflow-hidden bg-[#FFFFFF] rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-7 space-y-5 text-slate-900 flex flex-col justify-between group"
                >
                  <div className="space-y-5">
                    {/* Left Edge Accent Bar */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#2563EB] rounded-l-2xl"></div>

                    {/* Icon Badge & Title */}
                    <div className="flex items-center gap-3.5 pl-2">
                      <div className={`w-14 h-14 rounded-2xl ${cat.badgeBg} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                        <CatIcon className="w-7 h-7 stroke-[2.2]" />
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        {cat.shortTitle}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-2">
                      {cat.description}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-slate-100 pt-1 ml-2"></div>

                    {/* Sub-Services Checklist */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 pl-2">
                      {cat.subServices.map((sub, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium leading-tight">
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                          <span className="truncate" title={sub.name}>{sub.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. TECHNICAL SERVICES ACCORDION SECTION */}
      <section id="technical-services" className="scroll-mt-28 bg-[#FFFFFF] py-16 sm:py-20 px-4 md:px-8 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Centered Header */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight">
              Technical Services
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-semibold">
              Our Expertise
            </p>
          </div>

          {/* Accordion Stack */}
          <div className="space-y-4 pt-4">
            {technicalServices.map((techSvc) => {
              const isOpen = expandedTechId === techSvc.id;
              const TechIcon = techSvc.icon || Server;
              return (
                <div
                  key={techSvc.id}
                  className="rounded-2xl transition-all duration-200 border border-slate-200/80 shadow-xs overflow-hidden"
                >
                  {/* Accordion Header Bar */}
                  <button
                    onClick={() => setExpandedTechId(isOpen ? null : techSvc.id)}
                    className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                      isOpen
                        ? 'bg-[#111335] text-white rounded-t-2xl'
                        : 'bg-white text-[#0F172A] hover:bg-slate-50 rounded-2xl'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Cream White Smaller Rectangle Container */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FDFBF7] border border-slate-200/80 shadow-xs flex items-center justify-center text-[#2563EB] shrink-0">
                        <TechIcon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                        {techSvc.title}
                      </h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-white shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {/* Accordion Expanded Content Panel */}
                  {isOpen && (
                    <div className="bg-white p-6 sm:p-8 rounded-b-2xl border-t border-slate-100 space-y-6 animate-in fade-in duration-200">
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {techSvc.description}
                      </p>

                      {/* 2-Column Grid of Bullet Points with Website Brand Blue Dots */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 pt-1">
                        {techSvc.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shrink-0 shadow-xs"></span>
                            <span className="text-sm sm:text-base font-semibold text-slate-700 leading-snug">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CTA BANNER SECTION (Matching uploaded mockup 1:1) */}
      <section className="bg-white py-12 md:py-16 px-4 md:px-8 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1b1f48] text-white rounded-[32px] p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden border border-indigo-900/50">
            
            {/* Top Pill Badge */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold tracking-wide border border-white/15">
                Lets Build Together
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
              Ready To Empower Your Business With Technology?
            </h2>

            {/* Subtitle Paragraph */}
            <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto font-normal leading-relaxed">
              Partner With Senga Systems For Intelligent, Secure and Scalable Digital Solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/quote"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get a Free Consultation</span>
              </Link>

              <a
                href="tel:+265884288849"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-white/40 text-white font-extrabold text-xs sm:text-sm hover:bg-white/10 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us Now</span>
              </a>
            </div>

            {/* Bottom Contact Details Bar */}
            <div className="border-t border-white/10 pt-6 mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-300 text-xs sm:text-sm font-semibold">
              <a
                href="tel:+265884288849"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>(+265) 884 288 849</span>
              </a>

              <a
                href="mailto:info@senga.systems"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>info@senga.systems</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
