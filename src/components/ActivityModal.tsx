import React, { useEffect } from 'react';
import { X, FileText, CheckCircle2, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { FieldReport } from '../types/initiative';
import { sound } from '../utils/soundEffects';

interface ActivityModalProps {
  report: FieldReport | null;
  onClose: () => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({ report, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (report) {
      document.body.style.overflow = 'hidden';
      sound.playHudOpen();
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [report, onClose]);

  if (!report) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-obsidian-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-modal-title"
    >
      <div
        className="relative w-full max-w-2xl my-8 bg-graphite-900 border border-reactor-cyan/30 rounded-lg shadow-2xl overflow-hidden hud-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-graphite-800/90 border-b border-graphite-700">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-reactor-cyan" />
            <span className="text-xs font-mono uppercase tracking-widest text-reactor-cyan font-bold">
              FIELD REPORT ARCHIVE // {report.code}
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded text-silver-muted hover:text-white hover:bg-graphite-700 transition"
            aria-label="Close field report"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded bg-reactor-cyan/10 text-reactor-cyan border border-reactor-cyan/30">
                {report.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-silver-muted">
                <Calendar className="w-3.5 h-3.5 text-silver-dark" />
                {report.date} • {report.quarter}
              </span>
            </div>
            <h2 id="activity-modal-title" className="text-2xl font-display font-bold text-white uppercase tracking-wide">
              {report.title}
            </h2>
            <p className="mt-2 text-sm text-silver-light font-sans">
              {report.summary}
            </p>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-obsidian rounded border border-graphite-700">
            {report.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-mono text-silver-muted uppercase tracking-wider">{m.label}</span>
                <span className="text-lg font-mono font-bold text-reactor-cyan mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-reactor-cyan/70" />
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Full Mission Debrief */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
              Operational Mission Debrief
            </h3>
            <p className="text-sm text-silver-light leading-relaxed font-sans">
              {report.fullDebrief}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
              Key Strategic Milestones
            </h3>
            <div className="space-y-1.5">
              {report.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-silver-light font-sans">
                  <CheckCircle2 className="w-4 h-4 text-reactor-cyan shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Content Disclosure */}
          <div className="flex items-start gap-2.5 p-3 rounded bg-graphite-800/60 border border-graphite-700 text-xs font-sans text-silver-muted">
            <AlertCircle className="w-4 h-4 text-silver-muted shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> This field report demonstrates the scope and rigor of club activities. Content is sample simulation material for club recruitment and onboarding.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 bg-graphite-800/90 border-t border-graphite-700">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider text-white bg-graphite-700 hover:bg-graphite-600 rounded transition"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
