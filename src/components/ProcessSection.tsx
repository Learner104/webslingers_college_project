import React, { useState } from 'react';
import { Send, Search, Users, Shield, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ProcessSectionProps {
  onScrollToApply: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onScrollToApply }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'TRANSMIT',
      subtitle: 'Submit Application File',
      description: 'Fill out our secure recruitment form with your background, college email, chosen division, and what excites you about building things.',
      details: 'Takes ~4 minutes. We evaluate potential, curiosity, and eagerness to collaborate rather than a polished resume.',
      icon: Send,
      color: '#56D8FF',
    },
    {
      number: '02',
      title: 'DISCOVER',
      subtitle: 'Identify Strengths & Tracks',
      description: 'Tell us what interests you and what skills you want to learn during your time in the Initiative.',
      details: 'Whether you want to write code, direct short films, lead events, or conduct campus research, we align your onboarding path.',
      icon: Search,
      color: '#FF6B8B',
    },
    {
      number: '03',
      title: 'CONNECT',
      subtitle: 'Team Conversation & Mixer',
      description: 'Meet the team and participate in an informal, relaxed conversation or interactive workshop activity.',
      details: 'No high-pressure stress interviews. It is a two-way dialogue to see if our team culture feels like home for you.',
      icon: Users,
      color: '#F59E0B',
    },
    {
      number: '04',
      title: 'ASSEMBLE',
      subtitle: 'Cadet Onboarding & Deployment',
      description: 'Join your designated division squad, receive your briefing kit, and begin contributing to active projects.',
      details: 'Paired with a peer mentor from day one. You will begin working on your first sprint within your first two weeks.',
      icon: Shield,
      color: '#10B981',
    },
  ];

  return (
    <section id="process" className="relative py-24 bg-graphite-900 border-t border-b border-graphite-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded border border-reactor-cyan/30 bg-reactor-cyan/5 text-reactor-cyan text-xs font-mono uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5 text-reactor-cyan" />
            <span>DIRECTIVE 03 // ADMISSIONS SEQUENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
            YOUR NEXT CHAPTER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-reactor-cyan via-white to-stark">
              STARTS HERE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-silver-light font-sans leading-relaxed">
            Our 4-step recruitment protocol is designed to be transparent, welcoming, and accessible to
            every student on campus.
          </p>
        </div>

        {/* Desktop Connected Step Sequence */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-reactor-cyan/40 via-white/20 to-stark/40 -translate-y-12 z-0" />

          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isHovered = activeStep === idx;
            return (
              <div
                key={st.number}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveStep(idx);
                }}
                className={`group relative z-10 p-6 rounded-lg bg-obsidian border transition-all duration-300 hud-border flex flex-col justify-between ${
                  isHovered
                    ? 'border-reactor-cyan shadow-xl shadow-reactor-cyan/15 -translate-y-1.5'
                    : 'border-graphite-700 hover:border-graphite-500'
                }`}
              >
                <div>
                  {/* Top Step Badge with Number and Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-graphite-800">
                    <span
                      className="font-mono text-2xl font-bold transition-colors"
                      style={{ color: isHovered ? st.color : '#A9B2C0' }}
                    >
                      {st.number}
                    </span>
                    <div
                      className="p-2 rounded border border-graphite-700 bg-graphite-800/80 group-hover:scale-110 transition-transform"
                      style={{ color: st.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4">
                    <h3 className="text-xl font-display font-bold uppercase tracking-wide text-white group-hover:text-reactor-cyan transition-colors">
                      {st.title}
                    </h3>
                    <p className="text-xs font-mono text-silver-muted mt-0.5 uppercase tracking-wider">
                      {st.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-silver-light font-sans leading-relaxed">
                    {st.description}
                  </p>
                </div>

                {/* Additional Detail Box */}
                <div className="mt-4 pt-3 border-t border-graphite-800/80 text-[11px] font-sans text-silver-muted">
                  {st.details}
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic Recruitment Notice */}
        <div className="mt-12 p-4 rounded-lg bg-graphite-800/60 border border-graphite-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-reactor-cyan shrink-0" />
            <span className="text-xs font-sans text-silver-light">
              <strong>Admissions Note:</strong> Applications are reviewed on a rolling basis per semester. No automatic acceptance is guaranteed, but all applicants receive a personalized response and invite to open workshops.
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onScrollToApply();
            }}
            className="whitespace-nowrap px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider text-white bg-stark hover:bg-stark-glow rounded transition"
          >
            Step 01: Transmit Now
          </button>
        </div>
      </div>
    </section>
  );
};
