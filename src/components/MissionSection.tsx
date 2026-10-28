import React from 'react';
import { Lightbulb, Users2, Target, ShieldCheck, Zap, Crosshair, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const MissionSection: React.FC = () => {
  const pillars = [
    {
      code: 'PILLAR-01',
      title: 'INNOVATE',
      tagline: 'Break convention. Engineer the unforeseen.',
      description: 'Experiment, build, create, and explore new ideas. We do not wait for permission or ready-made playbooks—we invent solutions from first principles.',
      icon: Lightbulb,
      accent: '#56D8FF',
      stats: '8 Active Prototypes / Term',
      action: 'Build with Modern Stacks',
    },
    {
      code: 'PILLAR-02',
      title: 'COLLABORATE',
      tagline: 'Multi-disciplinary squads outmatch lone geniuses.',
      description: 'Learn from different perspectives and accomplish more together. Engineers, designers, writers, and strategists work in tandem to execute unified missions.',
      icon: Users2,
      accent: '#E62429',
      stats: '100% Multidisciplinary Teams',
      action: 'Cross-functional Squads',
    },
    {
      code: 'PILLAR-03',
      title: 'MAKE AN IMPACT',
      tagline: 'Leave tangible footprints across the campus ecosystem.',
      description: 'Organize meaningful events, solve real problems, and leave a legacy on campus. What we build reaches thousands of students and shapes university culture.',
      icon: Target,
      accent: '#F59E0B',
      stats: '3,200+ Students Impacted',
      action: 'Real World Deployments',
    },
  ];

  return (
    <section id="initiative" className="relative py-28 bg-graphite-900 border-t border-b border-graphite-800 overflow-hidden">
      {/* Background Animated Dots & Glow Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-reactor-cyan/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-reactor-cyan/35 bg-reactor-cyan/5 text-reactor-cyan text-xs font-mono uppercase tracking-widest shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-reactor-cyan animate-pulse" />
            <span>DIRECTIVE 01 // CORE PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
            WE DON'T WAIT FOR HEROES. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stark via-reactor-cyan to-white drop-shadow-[0_0_25px_rgba(86,216,255,0.35)]">
              WE BUILD TEAMS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-silver-light font-sans leading-relaxed pt-1">
            We are a community of builders, strategists, creators, and problem-solvers. From ambitious
            projects to unforgettable campus experiences, we bring people together to turn ideas into action.
          </p>
        </div>

        {/* 3 Pillars Grid with Kinetic Elevation */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.code}
                onMouseEnter={() => sound.playHover()}
                className="group relative bg-obsidian-950/90 p-8 rounded-xl border border-graphite-700 hover:border-reactor-cyan/70 transition-all duration-300 hud-border flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_15px_35px_-10px_rgba(86,216,255,0.2)]"
              >
                {/* Accent ambient corner glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-15 pointer-events-none group-hover:opacity-35 transition-opacity"
                  style={{ backgroundColor: pillar.accent }}
                />

                <div>
                  {/* Top Bar with Code & Icon */}
                  <div className="flex items-center justify-between pb-6 border-b border-graphite-800">
                    <span className="text-[11px] font-mono text-silver-muted uppercase tracking-wider font-semibold">
                      {pillar.code}
                    </span>
                    <div
                      className="p-3 rounded-lg border border-graphite-700 bg-graphite-800/80 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg"
                      style={{ color: pillar.accent, borderColor: `${pillar.accent}55` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-6">
                    <h3 className="text-2xl font-display font-bold uppercase tracking-wide text-white group-hover:text-reactor-cyan transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-silver-muted mt-1 uppercase tracking-wider">
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm sm:text-base text-silver-light font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Metric & Tactical Action */}
                <div className="mt-8 pt-4 border-t border-graphite-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" style={{ color: pillar.accent }} />
                    {pillar.stats}
                  </span>
                  <span className="text-silver-muted group-hover:text-reactor-cyan transition-colors flex items-center gap-1">
                    <Crosshair className="w-3 h-3" />
                    {pillar.action}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical Banner Quote with Glow Border */}
        <div className="mt-14 p-6 sm:p-7 rounded-xl bg-obsidian-950 border border-reactor-cyan/30 shadow-[0_0_30px_rgba(86,216,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-reactor-cyan/10 border border-reactor-cyan/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(86,216,255,0.25)]">
              <Sparkles className="w-6 h-6 text-reactor-cyan animate-pulse" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-sans font-medium text-white">
                "No solo heroism. Everything great that leaves a mark is built by a coherent team."
              </div>
              <div className="text-xs font-mono text-silver-muted mt-0.5 tracking-wider">
                EXECUTIVE CHARTER // COLLEGIATE INITIATIVE BYLAWS
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-reactor-cyan whitespace-nowrap px-4 py-1.5 bg-reactor-cyan/10 border border-reactor-cyan/40 rounded-full font-bold shadow-inner">
            ALL MAJORS WELCOME
          </span>
        </div>
      </div>
    </section>
  );
};
