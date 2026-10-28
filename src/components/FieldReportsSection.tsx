import React, { useState } from 'react';
import { FileText, Calendar, ArrowUpRight, TrendingUp, Filter, Sparkles } from 'lucide-react';
import { FIELD_REPORTS } from '../data/fieldReportsData';
import { FieldReport, DivisionId } from '../types/initiative';
import { sound } from '../utils/soundEffects';

interface FieldReportsSectionProps {
  onSelectReport: (report: FieldReport) => void;
}

export const FieldReportsSection: React.FC<FieldReportsSectionProps> = ({ onSelectReport }) => {
  const [filterDivision, setFilterDivision] = useState<DivisionId | 'all'>('all');

  const filteredReports =
    filterDivision === 'all'
      ? FIELD_REPORTS
      : FIELD_REPORTS.filter((r) => r.divisionId === filterDivision);

  const filterOptions: { label: string; value: DivisionId | 'all' }[] = [
    { label: 'All Operations', value: 'all' },
    { label: 'Tech & R&D', value: 'tech' },
    { label: 'Field Ops', value: 'events' },
    { label: 'Creative', value: 'creative' },
    { label: 'Strategy', value: 'strategy' },
    { label: 'Media', value: 'media' },
  ];

  return (
    <section id="activities" className="relative py-24 bg-obsidian">
      {/* Glow Ambience */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-reactor-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-graphite-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded border border-reactor-cyan/30 bg-reactor-cyan/5 text-reactor-cyan text-xs font-mono uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" />
              <span>ARCHIVED DEPLOYMENTS // FIELD REPORTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
              PROOF OF WHAT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stark via-white to-reactor-cyan">
                WE CAN DO.
              </span>
            </h2>
            <p className="text-base text-silver-light max-w-2xl font-sans">
              From overnight autonomous robotics sprints to campus-wide conventions, explore our
              operational history and student-led milestones.
            </p>
          </div>

          {/* Division Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-silver-muted mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">FILTER:</span>
            </div>
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  sound.playClick();
                  setFilterDivision(opt.value);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-all ${
                  filterDivision === opt.value
                    ? 'bg-reactor-cyan/20 border border-reactor-cyan text-white glow-cyan'
                    : 'bg-graphite-900 border border-graphite-700 text-silver-muted hover:text-white hover:border-graphite-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => {
                sound.playClick();
                onSelectReport(report);
              }}
              onMouseEnter={() => sound.playHover()}
              className="group relative bg-graphite-900/90 border border-graphite-700 hover:border-reactor-cyan/50 rounded-lg p-6 transition-all duration-300 hud-border cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-reactor-cyan/10"
            >
              <div>
                {/* Tactical Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-graphite-800 text-[10px] font-mono">
                  <span className="text-reactor-cyan font-bold tracking-wider">{report.code}</span>
                  <span className="text-silver-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-silver-dark" />
                    {report.date}
                  </span>
                </div>

                {/* Category Pill */}
                <div className="mt-4">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase font-semibold text-white bg-graphite-800 rounded border border-graphite-700">
                    {report.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-xl font-display font-bold uppercase text-white group-hover:text-reactor-cyan transition-colors leading-snug">
                  {report.title}
                </h3>

                {/* Summary */}
                <p className="mt-2.5 text-xs sm:text-sm text-silver-light font-sans line-clamp-3 leading-relaxed">
                  {report.summary}
                </p>
              </div>

              {/* Metrics & Debrief Link */}
              <div className="mt-6 pt-4 border-t border-graphite-800 space-y-3">
                {/* Metric pill */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-silver-muted uppercase text-[10px]">{report.metrics[0].label}</span>
                  <span className="text-reactor-cyan font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {report.metrics[0].value}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-silver-muted text-[11px]">{report.quarter}</span>
                  <span className="text-white group-hover:text-reactor-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>READ DEBRIEF</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Content Disclosure Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-silver-muted">
            ALL LISTED MISSIONS DEMONSTRATE ARCHIVAL PROJECT PATTERNS • NEW SEMESTER PROPOSALS CURRENTLY ACCEPTED
          </p>
        </div>
      </div>
    </section>
  );
};
