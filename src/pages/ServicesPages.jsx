import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BrainCircuit, 
  Globe, 
  Smartphone, 
  Code, 
  Lock, 
  Shield, 
  Server, 
  Layers, 
  Cloud, 
  BarChart3, 
  Palette, 
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Cpu,
  CloudCog,
  PieChart,
  ShieldCheck,
  Building2,
  Shapes
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function ServicesPages() {
  const location = useLocation();
  const serviceKey = location.pathname.split('/services/')[1] || '';
  const { openQuoteModal } = useCMS();

  const servicesMap = {
    'ai': {
      title: 'Artificial Intelligence (AI)',
      icon: BrainCircuit,
      color: 'text-blue-400',
      badge: 'Machine Learning & NLP',
      summary: 'Empower your enterprise with custom AI agents, machine learning algorithms, and intelligent automation built specifically for Malawian and African business data.',
      features: [
        'Custom Large Language Models (LLMs) & RAG Chatbots',
        'Predictive Analytics for Financial Risk & Fraud Detection',
        'Computer Vision & Document Intelligence Parsing',
        'Automated Customer Service & Workflow Automation'
      ],
      benefits: 'Reduces operational overhead by up to 60% while accelerating decision-making speed.'
    },
    'web-development': {
      title: 'Web Development',
      icon: Globe,
      color: 'text-cyan-400',
      badge: 'High-Performance Web Platforms',
      summary: 'Scalable, modern web application development using React, Next.js, and Node.js built to handle heavy user concurrency with lightning speed.',
      features: [
        'Custom Enterprise Portals & SaaS Applications',
        'Responsive Mobile-Optimized User Interfaces',
        'E-Commerce & Digital Payment Portal Integrations',
        'High-Security API Architecture'
      ],
      benefits: 'Flawless digital presence with 99.9% uptime and instant load times.'
    },
    'mobile-apps': {
      title: 'Mobile Application Development',
      icon: Smartphone,
      color: 'text-indigo-400',
      badge: 'iOS & Android Native Solutions',
      summary: 'Intuitive, secure native and cross-platform mobile apps for smartphones and tablets across Android and iOS.',
      features: [
        'Native React Native & Flutter App Engineering',
        'Biometric Mobile Banking & Wallet Integrations',
        'Offline Synchronization for Low-Bandwidth Areas',
        'Push Notifications & Real-Time Data Streaming'
      ],
      benefits: 'Direct engagement with millions of mobile users across Malawi.'
    },
    'fullstack': {
      title: 'Full-Stack Software Development',
      icon: Code,
      color: 'text-emerald-400',
      badge: 'End-to-End Enterprise Systems',
      summary: 'Custom ERPs, CRMs, and core enterprise backends engineered with clean architecture, microservices, and high-availability database engines.',
      features: [
        'Microservices Architecture & REST/GraphQL APIs',
        'PostgreSQL, MongoDB, and Redis Data Pipelines',
        'Continuous Integration & Automated Testing (CI/CD)',
        'Legacy Codebase Refactoring & Migration'
      ],
      benefits: 'Robust core software built to support decades of business expansion.'
    },
    'cybersecurity': {
      title: 'Cybersecurity & Auditing',
      icon: Lock,
      color: 'text-red-400',
      badge: 'Zero-Trust Defense',
      summary: 'Comprehensive cyber risk assessments, penetration testing, compliance auditing, and active vulnerability management for banks and corporates.',
      features: [
        'Penetration Testing & Red Teaming Simulations',
        'ISO 27001 & Data Protection Regulatory Compliance',
        '24/7 Security Operations Center (SOC) Oversight',
        'Incident Response & Forensic Malware Analysis'
      ],
      benefits: 'Guaranteed protection against data leaks, ransomware, and regulatory fines.'
    },
    'sengashield': {
      title: 'SengaShield Threat Protection',
      icon: Shield,
      color: 'text-blue-500',
      badge: 'Proprietary AI Defense System',
      summary: 'Senga Systems flagship autonomous cyber defense platform engineered for 24/7 threat monitoring, active containment, and zero-day protection.',
      features: [
        'Autonomous AI Threat Detection & Isolation',
        'Zero-Trust Network Access (ZTNA) Control',
        'Real-time Cryptographic Data Vaulting',
        'Malawi National Banking Standard Compliance'
      ],
      benefits: 'Continuous, self-healing cyber defense without human delay.'
    },
    'ict-infrastructure': {
      title: 'ICT Infrastructure',
      icon: Server,
      color: 'text-amber-400',
      badge: 'Hardware & Datacenters',
      summary: 'Enterprise network cabling, server room design, datacenter deployment, fiber routing, and Cisco hardware integration.',
      features: [
        'Datacenter Design & Virtualization (VMware/Hyper-V)',
        'Enterprise Fiber & Wireless Mesh Network Setup',
        'Uninterruptible Power Supply (UPS) & Solar Backup',
        'Hardware Procurement & Maintenance Contracts'
      ],
      benefits: 'Unbroken hardware reliability and rock-solid network speeds.'
    },
    'blockchain': {
      title: 'Encryption & Blockchain',
      icon: Layers,
      color: 'text-purple-400',
      badge: 'Cryptographic Ledger Systems',
      summary: 'Immutable smart contracts, tamper-proof record-keeping, and advanced cryptographic key management for supply chains and finance.',
      features: [
        'Private & Hybrid Hyperledger Blockchain Networks',
        'Smart Contract Development & Auditing',
        'End-to-End Cryptographic Ledger Verification',
        'Digital Document & Identity Authentication'
      ],
      benefits: 'Total transparency, tamper-proofing, and auditable data integrity.'
    },
    'cloud-hosting': {
      title: 'Cloud Hosting & Infrastructure',
      icon: Cloud,
      color: 'text-cyan-300',
      badge: 'Hybrid Cloud Datacenters',
      summary: 'Seamless cloud migration, container management (Docker/Kubernetes), and high-availability hosting managed in Malawian and global datacenters.',
      features: [
        'AWS, Azure & Local Hybrid Cloud Migration',
        'Kubernetes Container Orchestration',
        'Automated Daily Backups & Disaster Recovery',
        'Elastic Load Balancing & Auto-Scaling'
      ],
      benefits: 'Pay-as-you-grow cloud scalability with zero downtime.'
    },
    'data-analytics': {
      title: 'Data Analytics & Business Intelligence',
      icon: BarChart3,
      color: 'text-yellow-400',
      badge: 'Actionable Insights',
      summary: 'Transform raw corporate data into interactive PowerBI dashboards, executive reports, and automated forecasting engines.',
      features: [
        'Data Warehousing & ETL Pipeline Engineering',
        'Interactive Executive Dashboards (PowerBI / Tableau)',
        'Real-time Financial & Operational KPI Tracking',
        'Customer Churn & Market Demand Predictive Modeling'
      ],
      benefits: 'Clear data-driven decision making at all management levels.'
    },
    'creative-design': {
      title: 'Creative Design & UX',
      icon: Palette,
      color: 'text-pink-400',
      badge: 'User Experience & Branding',
      summary: 'Modern UI/UX design, brand identity systems, interactive prototypes, and design systems built to captivate users.',
      features: [
        'User Research & Wireframe Prototyping in Figma',
        'Enterprise Design System & UI Components',
        'Brand Identity, Logos & Graphic Assets',
        'Accessibility & Usability Optimization'
      ],
      benefits: 'Increased user engagement and elevated brand prestige.'
    },
    'tech-consulting': {
      title: 'Technology Consulting',
      icon: Lightbulb,
      color: 'text-orange-400',
      badge: 'Strategic Advisory',
      summary: 'Expert technical advisory for CTOs, CEOs, and government bodies navigating digital transformation, software procurement, and AI strategy.',
      features: [
        'Digital Transformation Roadmaps',
        'IT Procurement & Vendor Evaluation',
        'AI Strategy & Ethics Policy Design',
        'Enterprise Architecture Health Audits'
      ],
      benefits: 'Clear strategic roadmap aligned with business ROI.'
    }
  };

  const categorySections = [
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      icon: Cpu,
      badge: 'Machine Learning & LLMs',
      description: 'Custom AI models, natural language processing, automated workflow bots, and autonomous threat containment.',
      serviceKeys: ['ai', 'sengashield']
    },
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      icon: CloudCog,
      badge: 'Custom Enterprise Software',
      description: 'End-to-end full-stack software architecture, high-speed web platforms, and mobile apps for Android and iOS.',
      serviceKeys: ['fullstack', 'web-development', 'mobile-apps']
    },
    {
      id: 'data-analytics',
      title: 'Data & Analytics',
      icon: PieChart,
      badge: 'Business Intelligence & Ledger Systems',
      description: 'Transforming corporate datasets into PowerBI executive dashboards, predictive analytics, and cryptographic blockchain ledgers.',
      serviceKeys: ['data-analytics', 'blockchain']
    },
    {
      id: 'security-compliance',
      title: 'Security & Compliance',
      icon: ShieldCheck,
      badge: 'Zero-Trust Cyber Defense',
      description: 'Comprehensive risk assessments, penetration testing, compliance auditing, and SengaShield real-time threat protection.',
      serviceKeys: ['cybersecurity', 'sengashield']
    },
    {
      id: 'ict-infrastructure',
      title: 'ICT & Infrastructure',
      icon: Building2,
      badge: 'Datacenters & Hybrid Cloud',
      description: 'Hardware deployment, fiber network installation, server virtualization, and managed cloud infrastructure.',
      serviceKeys: ['ict-infrastructure', 'cloud-hosting']
    },
    {
      id: 'design-transformation',
      title: 'Design & Transformation',
      icon: Shapes,
      badge: 'UI/UX & Strategic IT Advisory',
      description: 'User experience research, Figma design systems, corporate brand identity, and executive digital strategy consulting.',
      serviceKeys: ['creative-design', 'tech-consulting']
    }
  ];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  const currentService = servicesMap[serviceKey];

  return (
    <div className="space-y-16 py-12">
      {/* 1. ALL SERVICES CATALOG OVERVIEW BY 6 CATEGORIES */}
      {!currentService && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-600/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
              Comprehensive Technology Solutions
            </span>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Our Technology & Engineering Services
            </h1>
            <p className="text-base text-slate-300">
              Select any category below to explore our full suite of enterprise digital solutions, SengaShield cybersecurity, custom AI engines, and software engineering.
            </p>

            {/* Quick Navigation Category Pills */}
            <div className="flex flex-wrap justify-center gap-2.5 pt-4">
              {categorySections.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700/60 shadow-sm"
                  >
                    <CatIcon className="w-3.5 h-3.5 text-blue-400 hover:text-white" />
                    <span>{cat.title}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* 6 Category Sections */}
          <div className="space-y-16">
            {categorySections.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <div 
                  key={cat.id} 
                  id={cat.id} 
                  className="scroll-mt-28 space-y-6 pt-4 border-t border-slate-800/80 first:border-t-0 first:pt-0"
                >
                  {/* Category Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#111e38] via-[#0f172a] to-[#0f172a] border border-blue-900/40">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                        <CatIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider">{cat.badge}</span>
                        <h2 className="text-2xl font-black text-white tracking-tight">{cat.title}</h2>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Sub-Services Grid inside this Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.serviceKeys.map((sKey) => {
                      const svc = servicesMap[sKey];
                      if (!svc) return null;
                      const IconComp = svc.icon;

                      return (
                        <Link
                          key={sKey}
                          to={`/services/${sKey}`}
                          className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between group"
                        >
                          <div className="space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <IconComp className={`w-6 h-6 ${svc.color}`} />
                            </div>
                            <span className="text-[11px] font-mono text-blue-400 font-semibold uppercase tracking-wider">{svc.badge}</span>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{svc.title}</h3>
                            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{svc.summary}</p>
                          </div>

                          <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-blue-400">
                            <span>Explore Detailed Specs</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. DEDICATED SERVICE SUBPAGE DETAIL VIEW */}
      {currentService && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to="/services" className="hover:text-blue-400">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{currentService.title}</span>
          </div>

          {/* Subpage Banner */}
          <div className="glass-card bg-[#0F172A] border border-slate-700 rounded-3xl p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <currentService.icon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">{currentService.badge}</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{currentService.title}</h1>
              </div>
            </div>

            <p className="text-base text-slate-200 leading-relaxed max-w-3xl">
              {currentService.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => openQuoteModal(currentService.title)}
                className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Request Quote for {currentService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Detailed Features & Business Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Key Service Capabilities
              </h2>
              <div className="space-y-4">
                {currentService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-slate-800 space-y-6 bg-gradient-to-b from-blue-950/30 to-[#0F172A]">
              <h2 className="text-2xl font-bold text-white">Business Impact</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentService.benefits}
              </p>

              <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 space-y-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Enterprise SLA</span>
                <p className="text-xs text-slate-300">
                  Includes 24/7 technical monitoring, dedicated engineering support, and guaranteed uptime response times.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
