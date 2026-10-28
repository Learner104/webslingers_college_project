import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Shield, ChevronRight } from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { sound } from '../utils/soundEffects';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onNavigateToApply: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onNavigateToApply,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section tracking
      const sections = ['hero', 'initiative', 'divisions', 'team', 'activities', 'process', 'apply'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Initiative', href: '#initiative', sectionId: 'initiative' },
    { label: 'Divisions', href: '#divisions', sectionId: 'divisions' },
    { label: 'Team', href: '#team', sectionId: 'team' },
    { label: 'Activities', href: '#activities', sectionId: 'activities' },
    { label: 'Recruitment', href: '#process', sectionId: 'process' },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinClick = () => {
    sound.playClick();
    setMobileMenuOpen(false);
    onNavigateToApply();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian-950/90 backdrop-blur-md border-b border-reactor-cyan/20 py-2.5 shadow-xl shadow-obsidian/80'
            : 'bg-transparent py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Initiative Brand Emblem */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="flex items-center gap-3 group focus:outline-none"
            >
              {/* Reactor Logo SVG */}
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="w-9 h-9 transition-transform group-hover:scale-105" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#56D8FF" strokeWidth="2.5" strokeDasharray="12 6" fill="#080A0F" opacity="0.8" />
                  <circle cx="50" cy="50" r="32" stroke="#E62429" strokeWidth="1.5" strokeDasharray="6 18" opacity="0.9" />
                  <polygon points="50,20 70,68 57,68 50,48 43,68 30,68" fill="#F4F6FA" />
                  <polygon points="32,56 68,56 64,62 36,62" fill="#E62429" />
                  <circle cx="50" cy="50" r="3.5" fill="#56D8FF" className="animate-ping" style={{ transformOrigin: 'center' }} />
                </svg>
              </div>

              {/* Title & Status */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-base sm:text-lg uppercase tracking-wider text-white group-hover:text-reactor-cyan transition-colors">
                    AVENGERS INITIATIVE
                  </span>
                  <span className="hidden lg:inline-flex items-center px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-widest text-reactor-cyan bg-reactor-cyan/10 border border-reactor-cyan/30 rounded">
                    CAMPUS CORPS
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-silver-muted">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>INITIATIVE: ACTIVE</span>
                  <span className="hidden sm:inline text-silver-dark">•</span>
                  <span className="hidden sm:inline text-silver-muted/70">RECRUITMENT WINDOW: OPEN</span>
                </div>
              </div>
            </a>

            {/* Middle: Desktop Navigation links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    onMouseEnter={() => sound.playHover()}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-all duration-150 ${
                      isActive
                        ? 'text-reactor-cyan bg-reactor-cyan/10 border border-reactor-cyan/40 glow-cyan'
                        : 'text-silver-muted hover:text-white hover:bg-graphite-800'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions (Terminal, Audio, Join Button) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search / Command Terminal */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenCommandPalette();
                }}
                onMouseEnter={() => sound.playHover()}
                title="Search / Command Palette (Ctrl+K or Cmd+K)"
                aria-label="Open Command Palette"
                className="p-2 text-silver-muted hover:text-reactor-cyan hover:bg-graphite-800 rounded border border-graphite-700 transition"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Audio feedback switch */}
              <div className="hidden sm:block">
                <AudioToggle />
              </div>

              {/* Join CTA */}
              <button
                onClick={handleJoinClick}
                onMouseEnter={() => sound.playHover()}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-white bg-stark hover:bg-stark-glow transition rounded shadow-lg shadow-stark/30 clip-chamfer-sm active:scale-95"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>JOIN THE TEAM</span>
              </button>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Toggle mobile menu"
                className="md:hidden p-2 text-silver-light hover:text-white hover:bg-graphite-800 rounded border border-graphite-700"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-obsidian-950/95 backdrop-blur-lg pt-20 px-6 pb-8 flex flex-col justify-between border-b border-reactor-cyan/30 animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-silver-muted pb-2 border-b border-graphite-800">
              TACTICAL DIRECTORY // SELECT PROTOCOL
            </div>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavClick(link.href);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded text-left font-display text-lg font-bold uppercase tracking-wider text-white hover:bg-graphite-800 hover:text-reactor-cyan border border-transparent hover:border-reactor-cyan/30"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-silver-muted" />
                </button>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-graphite-800">
              <span className="text-xs font-mono text-silver-muted uppercase">Tactical Audio</span>
              <div onClick={(e) => e.stopPropagation()}>
                <AudioToggle />
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleJoinClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-mono font-bold uppercase tracking-wider text-white bg-stark hover:bg-stark-glow rounded shadow-xl shadow-stark/40"
            >
              <Shield className="w-4 h-4" />
              <span>INITIATE RECRUITMENT</span>
            </button>
            <div className="text-center text-[10px] font-mono text-silver-muted">
              SECURE ENCRYPTED CHANNEL ESTABLISHED
            </div>
          </div>
        </div>
      )}
    </>
  );
};
