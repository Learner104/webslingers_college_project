import React from 'react';
import { Users, Shield, ArrowUpRight, Award, Compass, Cpu, Palette, Radio, Sparkles, Terminal } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/teamData';
import { TeamMember } from '../types/initiative';
import { sound } from '../utils/soundEffects';

interface TeamSectionProps {
  onSelectMember: (member: TeamMember) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onSelectMember }) => {
  const getIconForSymbol = (symbol: string) => {
    switch (symbol) {
      case 'Cpu':
        return Cpu;
      case 'Palette':
        return Palette;
      case 'Compass':
        return Compass;
      case 'Radio':
        return Radio;
      default:
        return Shield;
    }
  };

  return (
    <section id="team" className="relative py-28 bg-graphite-900 border-t border-b border-graphite-800 overflow-hidden">
      {/* Dynamic Animated Ambient Light Spheres */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-reactor-cyan/5 rounded-full blur-[140px] pointer-events-none animate-float" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-stark/5 rounded-full blur-[140px] pointer-events-none animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-reactor-cyan/35 bg-reactor-cyan/5 text-reactor-cyan text-xs font-mono uppercase tracking-widest shadow-lg shadow-reactor-cyan/5">
            <Sparkles className="w-3.5 h-3.5 text-reactor-cyan animate-spin-slow" />
            <span>EXECUTIVE CADRE // CLASSIFIED PERSONNEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white">
            THE PEOPLE BEHIND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-reactor-cyan via-white to-stark">
              THE INITIATIVE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-silver-light font-sans leading-relaxed">
            Led by student directors, engineers, and visionaries who turn audacious ideas into reality.
            Hover over any cadre file to inspect active clearance, specialized focus, and service logs.
          </p>
        </div>

        {/* 3-Member Grid with Artistic Holographic Depth */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => {
            const Icon = getIconForSymbol(member.avatarStyle.symbol);
            return (
              <div
                key={member.id}
                onClick={() => {
                  sound.playClick();
                  onSelectMember(member);
                }}
                onMouseEnter={() => sound.playHover()}
                className="group relative bg-obsidian-950/90 border border-graphite-700/80 hover:border-reactor-cyan rounded-xl p-7 transition-all duration-300 hud-border cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(86,216,255,0.25)] relative overflow-hidden"
              >
                {/* Background artistic mesh accent */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: member.avatarStyle.primaryColor }}
                />

                <div>
                  {/* Top Callsign & Clearance Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-graphite-800 text-[10px] font-mono">
                    <span className="text-stark font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stark animate-pulse" />
                      {member.clearance}
                    </span>
                    <span className="text-silver-muted uppercase bg-graphite-800/80 px-2.5 py-0.5 rounded border border-graphite-700">
                      CALLSIGN: {member.callsign}
                    </span>
                  </div>

                  {/* Avatar & Role Header with Artistic Glow */}
                  <div className="mt-6 flex items-start gap-4">
                    {/* Visual Avatar Monogram with Pulse Aura */}
                    <div
                      className="relative w-16 h-16 rounded-xl flex items-center justify-center border-2 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                      style={{
                        borderColor: member.avatarStyle.primaryColor,
                        backgroundColor: member.avatarStyle.secondaryColor,
                        boxShadow: `0 0 20px -3px ${member.avatarStyle.primaryColor}55`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: member.avatarStyle.primaryColor }} />
                      <span
                        className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-obsidian"
                        style={{ backgroundColor: member.avatarStyle.primaryColor }}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold uppercase text-white group-hover:text-reactor-cyan transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono font-medium text-reactor-cyan mt-0.5">
                        {member.role}
                      </p>
                      <span className="text-[11px] text-silver-muted font-sans block mt-0.5">
                        {member.divisionName}
                      </span>
                    </div>
                  </div>

                  {/* Personality / Specialty Statement */}
                  <div className="mt-5 p-3.5 rounded-lg bg-graphite-900/90 border border-graphite-800 text-xs font-sans text-silver-light italic leading-relaxed">
                    "{member.personality}"
                  </div>

                  {/* Hover Classified File Teaser */}
                  <div className="mt-5 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-silver-muted tracking-wider block flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-reactor-cyan" />
                      OPERATIONAL FOCUS:
                    </span>
                    <p className="text-xs text-silver-light font-sans line-clamp-2 leading-relaxed">
                      {member.focusArea}
                    </p>
                  </div>
                </div>

                {/* Bottom Footer with stats & expand trigger */}
                <div className="mt-7 pt-4 border-t border-graphite-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-silver-muted flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-silver-dark" />
                    <span>{member.stats.projectsLed} Initiatives Led</span>
                  </span>
                  <span className="text-reactor-cyan font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>INSPECT FILE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fictional Disclaimer Note */}
        <div className="mt-12 text-center text-xs font-mono text-silver-muted/80 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-reactor-cyan" />
          <span>PERSONNEL RECORDS REPRESENT FICTIONAL STUDENT CLUB ROLES FOR UNIVERSITY COMMUNITY DEMONSTRATION.</span>
        </div>
      </div>
    </section>
  );
};
