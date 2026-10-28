import React, { useEffect } from 'react';
import { X, ShieldCheck, Lock, Eye, Database } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      sound.playHudOpen();
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-obsidian-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div
        className="relative w-full max-w-2xl my-8 bg-graphite-900 border border-reactor-cyan/30 rounded-lg shadow-2xl overflow-hidden hud-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-graphite-800/90 border-b border-graphite-700">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-reactor-cyan" />
            <span className="text-xs font-mono uppercase tracking-widest text-reactor-cyan font-bold">
              SECURITY DIRECTIVE // DATA PRIVACY NOTICE
            </span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded text-silver-muted hover:text-white hover:bg-graphite-700 transition"
            aria-label="Close notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-silver-light font-sans text-sm leading-relaxed">
          <div>
            <h2 id="privacy-modal-title" className="text-xl font-display font-bold text-white uppercase tracking-wide">
              Avengers Initiative Recruitment Privacy Directive
            </h2>
            <p className="text-xs font-mono text-silver-muted mt-1">
              PROTOCOL REF: SEC-2025-PRIV • LAST UPDATED: FALL RECRUITMENT CYCLE
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-reactor-cyan flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              1. Information We Collect
            </h3>
            <p>
              When applying to the Avengers Initiative Student Division, we gather candidate contact information (name, college email), academic department, year of study, division preferences, portfolio links, and responses explaining interest in the organization.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-reactor-cyan flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              2. Use of Recruitment Data
            </h3>
            <p>
              Your data is strictly utilized to evaluate division fit, schedule conversational onboarding sessions, coordinate team placements, and send official club status updates. Data is never monetized, sold, or shared with commercial third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-reactor-cyan flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              3. Protection & Retention
            </h3>
            <p>
              All submissions are encrypted in transit. In demo mode, application files are saved only in your local browser sandbox (<code className="text-reactor-cyan bg-obsidian px-1.5 py-0.5 rounded text-xs">localStorage</code>). For live deployments, access is restricted solely to the club executive board and division leads.
            </p>
          </div>

          <div className="p-3.5 rounded bg-obsidian/80 border border-graphite-700 text-xs text-silver-muted">
            For questions or requests to inspect or delete your recruitment record, email the directorate at{' '}
            <span className="text-reactor-cyan font-mono">recruitment@initiative-campus.edu</span>.
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 bg-graphite-800/90 border-t border-graphite-700">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider text-white bg-stark hover:bg-stark-glow rounded transition"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
