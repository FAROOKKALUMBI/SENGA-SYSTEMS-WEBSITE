import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Mail, MessageSquare } from 'lucide-react';
import Reveal from '../components/Reveal';

const steps = [
  {
    number: '01',
    title: 'Connect',
    description: "Reach out and share your vision. We're ready to listen and understand your business needs.",
    icon: Mail
  },
  {
    number: '02',
    title: 'Discover',
    description: 'We analyze your business challenges and technical requirements to identify the right solution.',
    icon: MessageSquare
  },
  {
    number: '03',
    title: 'Plan',
    description: 'We design a secure, scalable, and intelligent solution tailored to your goals and budget.',
    icon: FileText
  },
  {
    number: '04',
    title: 'Build',
    description: 'We deploy, integrate, and provide ongoing support to ensure your success.',
    icon: CheckCircle2
  }
];

export default function SengaWayPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      <section className="bg-[#23275c] text-white py-16 md:py-24 px-4 md:px-12">
        <div className="max-w-6xl mx-auto text-left space-y-5">
          <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] text-blue-200">
            Our approach
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            The Senga Way
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
            The path to business transformation.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black text-[#23275c] tracking-tight">
              The Senga Way
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Follow these simple steps to get started with your IT solution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <Reveal key={step.number} style={{ transitionDelay: `${index * 100}ms` }}>
                  <article className="senga-way-card h-full bg-[#d9d9d9] border border-slate-300 rounded-2xl p-7 sm:p-8 shadow-md">
                    <div className="space-y-6">
                      <span className="block text-7xl font-black leading-none text-[#2563EB]/50">{step.number}</span>
                      <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">
                        <StepIcon className="w-9 h-9 stroke-[1.8]" />
                      </div>
                    </div>
                    <h2 className="mt-7 text-2xl font-black text-[#0F172A]">{step.title}</h2>
                    <p className="mt-4 text-base text-slate-600 leading-relaxed">{step.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12" style={{ transitionDelay: '400ms' }}>
            <div className="bg-[#23275c] rounded-2xl p-8 sm:p-10 text-center text-white shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-black">Ready to take the next step?</h2>
              <p className="mt-3 text-sm text-slate-200">Tell us what you need and our team will help shape the right solution.</p>
              <Link to="/contact" className="primary-button mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] text-white font-extrabold text-sm">
                <span>Contact Our Team</span>
                <ArrowRight className="arrow-motion w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
