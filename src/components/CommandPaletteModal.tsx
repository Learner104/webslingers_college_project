import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, ArrowRight, Shield, Layers, Users, FileText, Send, Sparkles } from 'lucide-react';
import { DIVISIONS_DATA } from '../data/divisionsData';
import { sound } from '../utils/soundEffects';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectDivision: (divisionId: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectDivision,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      sound.playHudOpen();
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const navItems = [
    { id: 'hero', label: 'Top Command // Hero Terminal', icon: Sparkles, section: 'hero' },
    { id: 'initiative', label: 'Mission & Strategic Pillars', icon: Shield, section: 'initiative' },
    { id: 'divisions', label: 'Divisions Classified Registry', icon: Layers, section: 'divisions' },
    { id: 'team', label: 'Meet the Leadership Team', icon: Users, section: 'team' },
    { id: 'activities', label: 'Field Reports & Operations', icon: FileText, section: 'activities' },
    { id: 'process', label: 'Recruitment Protocol Steps', icon: Terminal, section: 'process' },
    { id: 'apply', label: 'Initiate Recruitment Application', icon: Send, section: 'apply', highlight: true },
  ];

  const divisionItems = DIVISIONS_DATA.map((d) => ({
    id: `div-${d.id}`,
    label: `Division // ${d.name}`,
    subtext: d.tagline,
    divisionId: d.id,
    icon: Layers,
  }));

  const allItems = [
    ...navItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
    ...divisionItems.filter(
      (d) =>
        d.label.toLowerCase().includes(query.toLowerCase()) ||
        d.subtext.toLowerCase().includes(query.toLowerCase())
    ),
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          onClose(); // In parent, toggle will be handled
        }
        return;
      }

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, allItems.length));
        sound.playHover();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allItems.length) % Math.max(1, allItems.length));
        sound.playHover();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = allItems[selectedIndex];
        if (item) {
          executeItem(item);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allItems]);

  const executeItem = (item: (typeof allItems)[0]) => {
    sound.playClick();
    if ('divisionId' in item && item.divisionId) {
      onSelectDivision(item.divisionId);
    } else if ('section' in item && item.section) {
      onNavigate(item.section);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-obsidian-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-graphite-900 border border-reactor-cyan/30 rounded-lg shadow-2xl overflow-hidden hud-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-graphite-700 bg-graphite-800/80">
          <Search className="w-5 h-5 text-reactor-cyan mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a section or division (e.g., Tech, Team, Apply)..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-silver-muted focus:outline-none font-mono"
          />
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-obsidian text-silver-muted border border-graphite-700">
            ESC TO EXIT
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {allItems.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-silver-muted">
              NO MATCHING INITIATIVE RECORDS FOUND FOR "{query}"
            </div>
          ) : (
            allItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-left transition-all ${
                    isSelected
                      ? 'bg-reactor-cyan/15 text-white border border-reactor-cyan/40 glow-cyan'
                      : 'text-silver-light hover:bg-graphite-800 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-reactor-cyan' : 'text-silver-muted'}`} />
                    <div>
                      <div className="text-xs sm:text-sm font-mono font-medium">{item.label}</div>
                      {'subtext' in item && item.subtext && (
                        <div className="text-[11px] text-silver-muted font-sans line-clamp-1">{item.subtext}</div>
                      )}
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-reactor-cyan translate-x-0.5' : 'text-transparent'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 bg-obsidian/90 border-t border-graphite-800 text-[10px] font-mono text-silver-muted">
          <span>NAVIGATION // UP/DOWN KEYS</span>
          <span>SELECT // ENTER</span>
        </div>
      </div>
    </div>
  );
};
