import React, { useEffect } from 'react';
import { X, Shield, Award, Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import { TeamMember } from '../types/initiative';
import { sound } from '../utils/soundEffects';

interface PersonnelModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export const PersonnelModal: React.FC<PersonnelModalProps> = ({ member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (member) {
      document.body.style.overflow = 'hidden';
      sound.playHudOpen();
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-obsidian-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="personnel-modal-title"
    >
      <div
        className="relative w-full max-w-2xl my-8 bg-graphite-900 border border-reactor-cyan/30 rounded-lg shadow-2xl overflow-hidden hud-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-graphite-800/90 border-b border-graphite-700">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-reactor-cyan" />
            <span className="text-xs font-mono uppercase tracking-widest text-reactor-cyan font-bold">
              PERSONNEL RECORD // CALLSIGN: {member.callsign}
            </span>
          </div>
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

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top Info Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-4 border-b border-graphite-700">
            {/* Visual Avatar Emblem */}
            <div
              className="relative w-24 h-24 rounded-lg flex items-center justify-center border-2 shadow-inner"
              style={{
                borderColor: member.avatarStyle.primaryColor,
                backgroundColor: member.avatarStyle.secondaryColor,
              }}
            >
              <span className="font-display text-4xl font-extrabold" style={{ color: member.avatarStyle.primaryColor }}>
                {member.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <span
                className="absolute -bottom-2 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded border bg-obsidian font-bold"
                style={{ borderColor: member.avatarStyle.primaryColor, color: member.avatarStyle.primaryColor }}
              >
                {member.callsign}
              </span>
            </div>

            {/* Profile Meta */}
            <div className="text-center sm:text-left flex-1 space-y-1">
              <div className="text-xs font-mono text-stark font-semibold uppercase tracking-wider">
                {member.clearance}
              </div>
              <h2 id="personnel-modal-title" className="text-2xl font-display font-bold text-white uppercase tracking-wide">
                {member.name}
              </h2>
              <p className="text-sm font-sans font-medium text-reactor-cyan">
                {member.role} • {member.divisionName}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-mono text-silver-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-silver-dark" />
                  {member.stats.term}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-silver-dark" />
                  {member.stats.projectsLed} Projects Led
                </span>
              </div>
            </div>
          </div>

          {/* Personality / Specialty Statement */}
          <div className="p-4 rounded bg-obsidian/70 border border-graphite-700 italic text-sm text-silver-light font-sans">
            "{member.personality}"
          </div>

          {/* Full Bio */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
              Service Record & Background
            </h3>
            <p className="text-sm text-silver-light leading-relaxed font-sans">
              {member.bio}
            </p>
          </div>

          {/* Focus Area */}
          <div className="space-y-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
              Primary Divisional Focus
            </h3>
            <p className="text-sm text-white font-sans font-medium">
              {member.focusArea}
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((sk, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded bg-graphite-800 border border-graphite-700 text-silver-light"
                >
                  <CheckCircle className="w-3 h-3 text-reactor-cyan" />
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Links (Clearly Marked Placeholders) */}
          {member.socialLinks && member.socialLinks.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-graphite-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-silver-muted">
                Affiliated Archives (Fictional Club Demonstration)
              </h3>
              <div className="flex flex-wrap gap-2">
                {member.socialLinks.map((link, lIdx) => (
                  <span
                    key={lIdx}
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded bg-obsidian border border-graphite-700 text-silver-muted"
                  >
                    <ExternalLink className="w-3 h-3 text-silver-dark" />
                    {link.label}
                  </span>
                ))}
              </div>
            </div>
          )}
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
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
