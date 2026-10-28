import React, { useState } from 'react';
import { Cpu, Palette, Compass, ShieldAlert, Radio, ArrowRight, CheckCircle2, FileSearch, Sparkles } from 'lucide-react';
import { DIVISIONS_DATA } from '../data/divisionsData';
import { Division, DivisionId } from '../types/initiative';
import { sound } from '../utils/soundEffects';

interface DivisionsSectionProps {
  onOpenDivisionModal: (division: Division) => void;
  onApplyForDivision: (divisionId: DivisionId) => void;
}

export const DivisionsSection: React.FC<DivisionsSectionProps> = ({
  onOpenDivisionModal,
  onApplyForDivision,
}) => {
  const [selectedDivisionId, setSelectedDivisionId] = useState<DivisionId>('tech');

  const selectedDivision = DIVISIONS_DATA.find((d) => d.id === selectedDivisionId) || DIVISIONS_DATA[0];

  const getDivisionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return Cpu;
      case 'Palette':
        return Palette;
      case 'Compass':
        return Compass;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'Radio':
        return Radio;
      default:
        return Cpu;
    }
  };

  return (
    <section id="divisions" className="relative py-24 bg-obsidian">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-reactor-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-graphite-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded border border-reactor-cyan/30 bg-reactor-cyan/5 text-reactor-cyan text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLASSIFIED ORGANIZATIONAL REGISTRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
              CHOOSE YOUR <span className="text-reactor-cyan">DIVISION.</span>
            </h2>
            <p className="text-base text-silver-light max-w-2xl font-sans">
              Every recruit brings unique aptitudes to the table. Select your operational sector below
              to inspect mission briefs, sample builds, and onboarding expectations.
            </p>
          </div>

          {/* Philosophy Highlight Banner */}
          <div className="p-4 rounded border border-amber-500/40 bg-amber-500/10 max-w-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
              RECRUITMENT DIRECTIVE
            </span>
            <p className="text-xs text-silver-light mt-1 font-sans">
              <strong>Curiosity matters more than experience.</strong> Beginners and novices are paired with experienced leads. No superpowers required.
            </p>
          </div>
        </div>

        {/* Division Selector Tabs (Tactical HUD Selector) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {DIVISIONS_DATA.map((division) => {
            const Icon = getDivisionIcon(division.iconName);
            const isSelected = division.id === selectedDivisionId;
            return (
              <button
                key={division.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedDivisionId(division.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex flex-col items-start p-4 rounded-lg text-left transition-all duration-200 border relative ${
                  isSelected
                    ? 'bg-graphite-800 border-reactor-cyan shadow-lg shadow-reactor-cyan/15 glow-cyan'
                    : 'bg-graphite-900/60 border-graphite-800 hover:border-graphite-700 hover:bg-graphite-800/60'
                }`}
              >
                {/* Active indicator pip */}
                {isSelected && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-reactor-cyan animate-pulse" />
                )}

                <div
                  className="p-2 rounded border mb-3 transition-colors"
                  style={{
                    color: division.accentColor,
                    borderColor: isSelected ? division.accentColor : 'transparent',
                    backgroundColor: division.accentBg,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-mono uppercase text-silver-muted tracking-wider">
                  {division.code}
                </span>

                <span className="text-sm font-display font-bold uppercase text-white mt-0.5 line-clamp-1">
                  {division.name}
                </span>

                <span className="text-[11px] text-silver-muted font-sans mt-1 line-clamp-2">
                  {division.shortDescription}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Division Classified Dossier Interactive Deck */}
        <div className="mt-8 bg-graphite-900/90 border border-reactor-cyan/30 rounded-lg p-6 sm:p-8 hud-border">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-graphite-800">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="px-2.5 py-0.5 text-xs font-mono font-bold rounded uppercase tracking-wider"
                  style={{
                    backgroundColor: selectedDivision.accentBg,
                    color: selectedDivision.accentColor,
                    border: `1px solid ${selectedDivision.accentBorder}`,
                  }}
                >
                  {selectedDivision.code}
                </span>
                <span className="text-xs font-mono text-silver-muted uppercase">
                  {selectedDivision.clearanceLevel}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-wide text-white mt-2">
                {selectedDivision.name}
              </h3>
              <p className="text-sm sm:text-base text-silver-light font-sans italic mt-1">
                "{selectedDivision.tagline}"
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenDivisionModal(selectedDivision);
                }}
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-silver-light hover:text-white bg-graphite-800 hover:bg-graphite-700 border border-graphite-600 rounded transition"
              >
                <FileSearch className="w-4 h-4 text-reactor-cyan" />
                <span>EXPAND FULL CLASSIFIED DOSSIER</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onApplyForDivision(selectedDivision.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase font-bold tracking-wider text-white bg-stark hover:bg-stark-glow rounded shadow-lg shadow-stark/30 transition group"
              >
                <span>APPLY TO THIS DIVISION</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Division Details Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Mission & Traits */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
                // Divisional Mission Brief
              </h4>
              <p className="text-sm text-silver-light font-sans leading-relaxed">
                {selectedDivision.fullMission}
              </p>
              <div className="p-3.5 rounded bg-obsidian/70 border border-graphite-700 text-xs font-sans text-silver-light">
                <span className="font-semibold text-white block mb-1">Target Profile:</span>
                {selectedDivision.whoWeLookFor}
              </div>
            </div>

            {/* Column 2: Sample Projects */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
                // Active Projects & Operations
              </h4>
              <div className="space-y-3">
                {selectedDivision.sampleProjects.map((proj, idx) => (
                  <div key={idx} className="p-3 rounded bg-obsidian/60 border border-graphite-800 space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-white">
                      <span>{proj.title}</span>
                      <span className="text-[10px] font-mono text-silver-muted uppercase">ACTIVE</span>
                    </div>
                    <p className="text-xs text-silver-muted font-sans line-clamp-2">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.techOrTools.slice(0, 3).map((tool, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-reactor-cyan bg-reactor-cyan/5 px-1.5 py-0.5 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Skills & Division Stats */}
            <div className="space-y-5">
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
                  // Core Focus Areas
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDivision.keySkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded bg-graphite-800 border border-graphite-700 text-silver-light"
                    >
                      <CheckCircle2 className="w-3 h-3 text-reactor-cyan" />
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded bg-obsidian/90 border border-graphite-700 space-y-2">
                <span className="text-[10px] font-mono uppercase text-silver-muted tracking-wider block">
                  DIVISION TELEMETRY
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  {selectedDivision.stats.map((st, sIdx) => (
                    <div key={sIdx}>
                      <span className="text-silver-muted uppercase text-[9px] block">{st.label}</span>
                      <span className="text-white font-bold">{st.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
