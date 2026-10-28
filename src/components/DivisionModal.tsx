import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { Division } from '../types/initiative';
import { sound } from '../utils/soundEffects';

interface DivisionModalProps {
  division: Division | null;
  onClose: () => void;
  onApplyDivision: (divisionId: Division['id']) => void;
}

export const DivisionModal: React.FC<DivisionModalProps> = ({
  division,
  onClose,
  onApplyDivision
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (division) {
      document.body.style.overflow = 'hidden';
      sound.playHudOpen();
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [division, onClose]);

  if (!division) return null;

  const handleApplyClick = () => {
    sound.playClick();
    onApplyDivision(division.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-obsidian-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="division-modal-title"
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-graphite-900 border border-reactor-cyan/30 rounded-lg shadow-2xl overflow-hidden hud-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top classified banner */}
        <div className="flex items-center justify-between px-6 py-3 bg-graphite-800/90 border-b border-reactor-cyan/20">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-reactor-cyan animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-reactor-cyan font-semibold">
              CLASSIFIED DOSSIER // {division.code}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] font-mono text-silver-muted/80">
              {division.clearanceLevel}
            </span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded text-silver-muted hover:text-white hover:bg-graphite-700 transition"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Header */}
          <div>
            <div className="inline-block px-2.5 py-0.5 mb-2 text-xs font-mono font-medium rounded border border-reactor-cyan/30 text-reactor-cyan bg-reactor-cyan/5">
              DIVISION PROFILE
            </div>
            <h2 id="division-modal-title" className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide text-white">
              {division.name}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-silver-light font-sans italic">
              "{division.tagline}"
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-obsidian/70 rounded border border-graphite-700 font-mono text-xs">
            {division.stats.map((st, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-silver-muted uppercase text-[10px] tracking-wider">{st.label}</span>
                <span className="text-reactor-cyan font-bold text-sm mt-0.5">{st.value}</span>
              </div>
            ))}
          </div>

          {/* Full Mission Statement */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted flex items-center gap-2">
              <Terminal className="w-4 h-4 text-reactor-cyan" />
              Operational Mission
            </h3>
            <p className="text-sm sm:text-base text-silver-light leading-relaxed font-sans">
              {division.fullMission}
            </p>
          </div>

          {/* Who We Look For Banner */}
          <div className="p-4 rounded border border-amber-500/30 bg-amber-500/5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Recruitment Philosophy
            </div>
            <p className="text-xs sm:text-sm text-silver-light">
              <strong className="text-white">Curiosity matters more than experience.</strong> {division.whoWeLookFor}
            </p>
          </div>

          {/* Sample Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted flex items-center gap-2">
              <Layers className="w-4 h-4 text-reactor-cyan" />
              Sample Divisional Projects
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {division.sampleProjects.map((proj, pIdx) => (
                <div key={pIdx} className="p-3.5 bg-graphite-800/60 rounded border border-graphite-700 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white font-sans">{proj.title}</h4>
                    <span className="text-[10px] font-mono text-silver-muted uppercase bg-obsidian px-2 py-0.5 rounded">
                      CASE STUDY
                    </span>
                  </div>
                  <p className="text-xs text-silver-light font-sans">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techOrTools.map((t, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-mono px-2 py-0.5 bg-obsidian/80 text-silver-muted rounded border border-graphite-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
              Relevant Skills & Curiosity Tracks
            </h3>
            <div className="flex flex-wrap gap-2">
              {division.keySkills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded bg-reactor-cyan/10 border border-reactor-cyan/30 text-reactor-cyan"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Apply CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-graphite-800/90 border-t border-graphite-700">
          <span className="text-xs font-mono text-silver-muted text-center sm:text-left">
            No prerequisites required for introductory cohorts.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-mono uppercase tracking-wider text-silver-muted hover:text-white border border-graphite-600 rounded transition"
            >
              Dismiss
            </button>
            <button
              onClick={handleApplyClick}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-mono uppercase font-bold tracking-wider text-white bg-stark hover:bg-stark-glow transition rounded shadow-lg shadow-stark/30 group"
            >
              <span>Apply for {division.name}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
