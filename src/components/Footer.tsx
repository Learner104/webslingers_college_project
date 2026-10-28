import React from 'react';
import { Terminal, Shield, Mail, ArrowUp, ExternalLink } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface FooterProps {
  onOpenPrivacyNotice: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyNotice,
  onNavigateToSection,
}) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Initiative', id: 'initiative' },
    { label: 'Divisions', id: 'divisions' },
    { label: 'Team', id: 'team' },
    { label: 'Activities', id: 'activities' },
    { label: 'Recruitment', id: 'process' },
    { label: 'Apply', id: 'apply' },
  ];

  return (
    <footer className="relative bg-obsidian-950 border-t border-graphite-800 text-silver-muted font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-graphite-800/80">
          {/* Col 1: Brand & Status */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              {/* Emblem */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#56D8FF" strokeWidth="2.5" strokeDasharray="12 6" fill="#080A0F" />
                  <polygon points="50,20 70,68 57,68 50,48 43,68 30,68" fill="#F4F6FA" />
                  <polygon points="32,56 68,56 64,62 36,62" fill="#E62429" />
                  <circle cx="50" cy="50" r="4" fill="#56D8FF" />
                </svg>
              </div>

              <div>
                <span className="font-display font-bold text-lg text-white uppercase tracking-wider block">
                  AVENGERS INITIATIVE
                </span>
                <span className="text-[10px] font-mono text-reactor-cyan uppercase tracking-widest block">
                  CAMPUS RECRUITMENT DIVISION
                </span>
              </div>
            </div>

            <p className="text-xs text-silver-light leading-relaxed max-w-md font-sans">
              An elite, multidisciplinary student organization bridging technical engineering,
              cinematic creative media, strategic intelligence, and campus-wide event operations.
            </p>

            {/* Terminal Live Status Label Required by Spec */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-graphite-900 border border-reactor-cyan/30 text-[11px] font-mono text-reactor-cyan">
              <Terminal className="w-3.5 h-3.5 text-reactor-cyan" />
              <span>INITIATIVE ONLINE // PROTOCOL ACTIVE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Quick Directory
            </span>
            <ul className="space-y-2 font-mono text-xs">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onNavigateToSection(item.id);
                    }}
                    className="hover:text-reactor-cyan transition-colors"
                  >
                    // {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Communications Relay
            </span>
            <div className="space-y-2">
              <a
                href="mailto:recruitment@initiative-campus.edu"
                className="flex items-center gap-2 text-silver-light hover:text-reactor-cyan transition-colors"
              >
                <Mail className="w-4 h-4 text-reactor-cyan" />
                <span>recruitment@initiative-campus.edu</span>
              </a>
              <div className="text-[11px] text-silver-muted space-y-1 pt-1">
                <span className="block">Campus Innovation Center, Room 402</span>
                <span className="block">Office Hours: Tue & Thu 18:00 - 21:00</span>
              </div>

              {/* Social placeholders clearly marked */}
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-graphite-900 border border-graphite-800 text-silver-muted">
                  Discord [Placeholder]
                </span>
                <span className="px-2 py-0.5 rounded bg-graphite-900 border border-graphite-800 text-silver-muted">
                  GitHub [Placeholder]
                </span>
                <span className="px-2 py-0.5 rounded bg-graphite-900 border border-graphite-800 text-silver-muted">
                  Instagram [Placeholder]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Mandatory Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-sans">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-silver-muted">
              © {new Date().getFullYear()} Avengers Initiative (Fictional College Club Organization). All rights reserved.
            </p>
            <p className="text-silver-muted/70 text-[10px]">
              <strong>Disclaimer:</strong> This website is an independent fictional student club recruitment concept. It is not affiliated with, endorsed by, or sponsored by Marvel, Disney, or any related rights holders. No copyrighted assets or trademarks are used for commercial purposes.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
            <button
              onClick={() => {
                sound.playClick();
                onOpenPrivacyNotice();
              }}
              className="hover:text-white underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-graphite-900 hover:bg-graphite-800 border border-graphite-700 text-white flex items-center gap-1 transition"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
