import React from 'react';
import { Shield, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface FinalCtaSectionProps {
  onJoinClick: () => void;
  onExploreActivitiesClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onJoinClick,
  onExploreActivitiesClick,
}) => {
  return (
    <section className="relative py-28 bg-graphite-900 border-t border-graphite-800 overflow-hidden">
      {/* Central Cinematic Glowing Reactor Graphic Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-40">
        <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow">
          <circle cx="200" cy="200" r="180" stroke="#56D8FF" strokeWidth="1" strokeDasharray="16 32 8 32" fill="none" opacity="0.3" />
          <circle cx="200" cy="200" r="140" stroke="#E62429" strokeWidth="1.5" strokeDasharray="24 16" fill="none" opacity="0.4" />
          <circle cx="200" cy="200" r="100" stroke="#56D8FF" strokeWidth="2" strokeDasharray="8 8" fill="none" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-reactor-cyan/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Subtle emblem */}
        <div className="inline-flex p-3 rounded-full bg-obsidian border border-reactor-cyan/30 text-reactor-cyan shadow-xl shadow-reactor-cyan/20">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
          THE WORLD DOESN'T <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-stark via-white to-reactor-cyan">
            CHANGE ITSELF.
          </span>
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-xl text-silver-light font-sans max-w-2xl mx-auto leading-relaxed">
          Your ideas. Your people. Your initiative. <br className="hidden sm:inline" />
          Let's build something worth remembering.
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playClick();
              onJoinClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white bg-stark hover:bg-stark-glow transition-all duration-200 rounded shadow-2xl shadow-stark/40 clip-chamfer group hover:scale-105 active:scale-95"
          >
            <Shield className="w-4 h-4" />
            <span>JOIN THE INITIATIVE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onExploreActivitiesClick();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-mono uppercase tracking-wider text-silver-light hover:text-white bg-graphite-800/80 hover:bg-graphite-700 border border-graphite-600 rounded transition"
          >
            <Compass className="w-4 h-4 text-reactor-cyan" />
            <span>FOLLOW OUR ACTIVITIES</span>
          </button>
        </div>
      </div>
    </section>
  );
};
