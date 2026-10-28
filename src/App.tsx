import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MissionSection } from './components/MissionSection';
import { DivisionsSection } from './components/DivisionsSection';
import { TeamSection } from './components/TeamSection';
import { FieldReportsSection } from './components/FieldReportsSection';
import { ProcessSection } from './components/ProcessSection';
import { ApplicationSection } from './components/ApplicationSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

// Modals
import { DivisionModal } from './components/DivisionModal';
import { PersonnelModal } from './components/PersonnelModal';
import { ActivityModal } from './components/ActivityModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';

// Types
import { Division, DivisionId, TeamMember, FieldReport } from './types/initiative';

export function App() {
  // Modal states
  const [selectedDivisionModal, setSelectedDivisionModal] = useState<Division | null>(null);
  const [selectedPersonnelModal, setSelectedPersonnelModal] = useState<TeamMember | null>(null);
  const [selectedActivityModal, setSelectedActivityModal] = useState<FieldReport | null>(null);
  const [isPrivacyNoticeOpen, setIsPrivacyNoticeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Application division prefill
  const [targetDivisionForApply, setTargetDivisionForApply] = useState<DivisionId | ''>('tech');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyDivision = (divId: DivisionId) => {
    setTargetDivisionForApply(divId);
    scrollToSection('apply');
  };

  return (
    <div className="min-h-screen bg-obsidian text-pure-white selection:bg-stark selection:text-white relative">
      {/* Tactical Sci-Fi Custom Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onNavigateToApply={() => scrollToSection('apply')}
      />

      <main>
        {/* SECTION A — Hero */}
        <HeroSection
          onInitiateClick={() => scrollToSection('apply')}
          onExploreClick={() => scrollToSection('initiative')}
        />

        {/* SECTION B — The Initiative (Mission & Pillars) */}
        <MissionSection />

        {/* SECTION C — Choose Your Division */}
        <DivisionsSection
          onOpenDivisionModal={(div) => setSelectedDivisionModal(div)}
          onApplyForDivision={handleApplyDivision}
        />

        {/* SECTION D — Meet the Team */}
        <TeamSection
          onSelectMember={(member) => setSelectedPersonnelModal(member)}
        />

        {/* SECTION E — Field Reports / Activities */}
        <FieldReportsSection
          onSelectReport={(report) => setSelectedActivityModal(report)}
        />

        {/* SECTION F — Recruitment Process */}
        <ProcessSection
          onScrollToApply={() => scrollToSection('apply')}
        />

        {/* SECTION G — Recruitment Application */}
        <ApplicationSection
          selectedDivisionId={targetDivisionForApply}
          onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
        />

        {/* SECTION H — Final Call to Action */}
        <FinalCtaSection
          onJoinClick={() => scrollToSection('apply')}
          onExploreActivitiesClick={() => scrollToSection('activities')}
        />
      </main>

      {/* SECTION I — Footer */}
      <Footer
        onOpenPrivacyNotice={() => setIsPrivacyNoticeOpen(true)}
        onNavigateToSection={scrollToSection}
      />

      {/* Modals & Overlays */}
      <DivisionModal
        division={selectedDivisionModal}
        onClose={() => setSelectedDivisionModal(null)}
        onApplyDivision={handleApplyDivision}
      />

      <PersonnelModal
        member={selectedPersonnelModal}
        onClose={() => setSelectedPersonnelModal(null)}
      />

      <ActivityModal
        report={selectedActivityModal}
        onClose={() => setSelectedActivityModal(null)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyNoticeOpen}
        onClose={() => setIsPrivacyNoticeOpen(false)}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={scrollToSection}
        onSelectDivision={(divId) => handleApplyDivision(divId as DivisionId)}
      />
    </div>
  );
}

export default App;
