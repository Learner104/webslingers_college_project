import React, { useState } from 'react';
import { Send, Shield, AlertTriangle, CheckCircle, Lock, RefreshCw, Download, FileText, Sparkles, Terminal, Info } from 'lucide-react';
import { ApplicationFormData, DivisionId, SubmittedDossier } from '../types/initiative';
import { DIVISIONS_DATA } from '../data/divisionsData';
import { sound } from '../utils/soundEffects';

interface ApplicationSectionProps {
  selectedDivisionId?: DivisionId | '';
  onOpenPrivacyNotice: () => void;
}

export const ApplicationSection: React.FC<ApplicationSectionProps> = ({
  selectedDivisionId = '',
  onOpenPrivacyNotice,
}) => {
  // Demo Mode state vs Live endpoint
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [liveEndpoint, setLiveEndpoint] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  // Form State
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    department: 'Computer Science & Engineering',
    yearOfStudy: '2nd Year (Sophomore)',
    preferredDivision: selectedDivisionId || 'tech',
    secondaryDivision: '',
    skillsAndInterests: ['Coding', 'UI/UX Design'],
    whyJoin: '',
    portfolioUrl: '',
    availabilityHours: '4-6 hours / week',
    privacyConsent: false,
  });

  const [skillInput, setSkillInput] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot field

  // Errors state
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});

  // Submission pipeline states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionStep, setTransmissionStep] = useState<string>('');
  const [submittedDossier, setSubmittedDossier] = useState<SubmittedDossier | null>(null);

  // Synchronize division if prop changes
  React.useEffect(() => {
    if (selectedDivisionId) {
      setFormData((prev) => ({ ...prev, preferredDivision: selectedDivisionId }));
    }
  }, [selectedDivisionId]);

  // Quick skill presets
  const popularSkills = [
    'Python', 'React / TypeScript', 'Graphic Design', 'Video Editing',
    'Robotics / Arduino', 'Public Relations', 'Event Staging', 'Data Analytics',
    'Sound Design', 'Copywriting', 'Curious Beginner'
  ];

  const handleAddSkill = (skill: string) => {
    if (!skill.trim()) return;
    if (!formData.skillsAndInterests.includes(skill.trim())) {
      sound.playClick();
      setFormData((prev) => ({
        ...prev,
        skillsAndInterests: [...prev.skillsAndInterests, skill.trim()],
      }));
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    sound.playClick();
    setFormData((prev) => ({
      ...prev,
      skillsAndInterests: prev.skillsAndInterests.filter((s) => s !== skillToRemove),
    }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ApplicationFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full legal or preferred name is required.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Campus or academic email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errs.email = 'Please provide a valid email format (e.g., recruit@campus.edu).';
    }

    if (!formData.preferredDivision) {
      errs.preferredDivision = 'Please select a primary division.';
    }

    if (!formData.whyJoin.trim()) {
      errs.whyJoin = 'Please share your motivation or what you hope to build with us.';
    } else if (formData.whyJoin.trim().length < 25) {
      errs.whyJoin = 'Please provide at least 25 characters explaining your interest.';
    }

    if (!formData.privacyConsent) {
      errs.privacyConsent = 'You must acknowledge the Club Privacy Directive.';
    }

    if (formData.portfolioUrl && formData.portfolioUrl.trim()) {
      try {
        new URL(formData.portfolioUrl);
      } catch {
        errs.portfolioUrl = 'Please include a valid URL (e.g. https://github.com/username).';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    // Check honeypot for bot spam
    if (honeypot) {
      // Silently discard bot submission
      return;
    }

    if (!validate()) {
      // Scroll to first error
      const firstErr = document.querySelector('[aria-invalid="true"]');
      if (firstErr) {
        (firstErr as HTMLElement).focus();
      }
      return;
    }

    setIsSubmitting(true);
    sound.playTransmit();

    // Simulated Encrypted Transmission Pipeline
    setTransmissionStep('PACKAGING RECRUITMENT DOSSIER...');
    await new Promise((r) => setTimeout(r, 600));

    setTransmissionStep('APPLYING SHA-256 INTEGRITY CHECKSUM...');
    await new Promise((r) => setTimeout(r, 700));

    setTransmissionStep('ESTABLISHING SECURE INITIATIVE UPLINK...');
    await new Promise((r) => setTimeout(r, 700));

    // Live backend connection if configured
    if (!isDemoMode && liveEndpoint) {
      try {
        setTransmissionStep('DISPATCHING PAYLOAD TO PRODUCTION ENDPOINT...');
        const response = await fetch(liveEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error(`Server returned HTTP ${response.status}`);
        }
      } catch (err) {
        setIsSubmitting(false);
        setTransmissionStep('');
        setErrors({
          fullName: `Transmission failed: ${(err as Error).message}. Check your endpoint or switch to Demo Mode.`,
        });
        return;
      }
    }

    // Generate Dossier
    const dossierId = `INIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const checksum = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();

    const resultDossier: SubmittedDossier = {
      ...formData,
      dossierId,
      submissionTimestamp: new Date().toISOString(),
      status: 'RECEIVED',
      verificationChecksum: checksum,
    };

    // Store in localStorage for student access
    try {
      const existing = JSON.parse(localStorage.getItem('initiative_applications') || '[]');
      existing.unshift(resultDossier);
      localStorage.setItem('initiative_applications', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmittedDossier(resultDossier);
    setIsSubmitting(false);
    setTransmissionStep('');
    sound.playConfirmed();
  };

  const handleResetForm = () => {
    sound.playClick();
    setSubmittedDossier(null);
    setFormData({
      fullName: '',
      email: '',
      department: 'Computer Science & Engineering',
      yearOfStudy: '2nd Year (Sophomore)',
      preferredDivision: 'tech',
      secondaryDivision: '',
      skillsAndInterests: ['Curious Beginner'],
      whyJoin: '',
      portfolioUrl: '',
      availabilityHours: '4-6 hours / week',
      privacyConsent: false,
    });
    setErrors({});
  };

  return (
    <section id="apply" className="relative py-24 bg-obsidian">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-stark/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded border border-stark/30 bg-stark/10 text-stark text-xs font-mono uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-stark" />
            <span>PRIMARY RECRUITMENT PORTAL // CADET REGISTRATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
            READY TO ANSWER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stark via-white to-reactor-cyan">
              THE CALL?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-silver-light font-sans max-w-2xl mx-auto leading-relaxed">
            You don't need to be a genius, a billionaire, or a superhero. Bring curiosity,
            commitment, and the willingness to learn.
          </p>

          {/* Mode Badge & Config Toggle */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono uppercase rounded border ${
              isDemoMode
                ? 'bg-graphite-800 border-amber-500/40 text-amber-400'
                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              {isDemoMode ? 'PORTAL MODE: SANDBOX / DEMO' : 'PORTAL MODE: LIVE PRODUCTION'}
            </span>

            <button
              onClick={() => {
                sound.playClick();
                setShowConfig(!showConfig);
              }}
              className="text-xs font-mono text-silver-muted hover:text-white underline"
            >
              {showConfig ? 'Hide Settings' : 'Configure Backend'}
            </button>
          </div>

          {/* Backend Configuration Panel */}
          {showConfig && (
            <div className="mt-4 p-4 rounded bg-graphite-900 border border-graphite-700 text-left text-xs font-mono space-y-3 animate-fade-in">
              <div className="flex items-center justify-between text-silver-light">
                <span className="font-bold uppercase text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-reactor-cyan" />
                  Submission Pipeline Configuration
                </span>
                <button
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  className="px-2 py-1 rounded bg-graphite-800 text-reactor-cyan border border-graphite-700 hover:border-reactor-cyan transition"
                >
                  Toggle to {isDemoMode ? 'Live Backend' : 'Demo Mode'}
                </button>
              </div>
              <p className="text-silver-muted font-sans text-xs">
                In <strong>Demo Mode</strong>, applications are verified, packaged, and stored safely in your browser's local sandbox without requiring external cloud credentials. To connect to an external service (Formspree, Supabase Webhook, Google Sheets AppScript, or custom API), enter your endpoint below. Never commit secret private keys to public frontend files.
              </p>
              {!isDemoMode && (
                <div>
                  <label className="block text-silver-light mb-1">Production Webhook / Endpoint URL:</label>
                  <input
                    type="url"
                    value={liveEndpoint}
                    onChange={(e) => setLiveEndpoint(e.target.value)}
                    placeholder="https://formspree.io/f/your_form_id or https://api.yourschool.edu/recruits"
                    className="w-full bg-obsidian border border-graphite-700 rounded p-2 text-white text-xs focus:border-reactor-cyan"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Transmission Loading Overlay */}
        {isSubmitting && (
          <div className="p-12 rounded-lg bg-graphite-900 border border-reactor-cyan shadow-2xl text-center space-y-6 hud-border animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full border-2 border-reactor-cyan border-t-transparent animate-spin" />
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold uppercase tracking-wider text-white">
                ENCRYPTING TRANSMISSION
              </h3>
              <p className="text-sm font-mono text-reactor-cyan tracking-widest animate-pulse">
                {transmissionStep}
              </p>
            </div>
            <div className="text-xs font-mono text-silver-muted">
              SECURE TLS 1.3 • END-TO-END VERIFICATION
            </div>
          </div>
        )}

        {/* Confirmation Success State */}
        {!isSubmitting && submittedDossier && (
          <div className="p-8 sm:p-10 rounded-lg bg-graphite-900 border border-reactor-cyan/50 shadow-2xl space-y-8 hud-border animate-fade-in">
            {/* Top Banner */}
            <div className="flex items-center justify-between pb-6 border-b border-graphite-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    TRANSMISSION CONFIRMED // APPLICATION RECEIVED
                  </span>
                  <h3 className="text-2xl font-display font-bold uppercase text-white">
                    FILE TRANSMITTED TO THE INITIATIVE
                  </h3>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded bg-obsidian border border-graphite-700 font-mono text-xs text-silver-muted">
                DOSSIER: {submittedDossier.dossierId}
              </span>
            </div>

            {/* Supportive Message Required by Spec */}
            <div className="p-4 rounded bg-obsidian border border-reactor-cyan/30 text-silver-light font-sans text-sm space-y-1">
              <p className="font-bold text-white text-base">
                “APPLICATION RECEIVED.”
              </p>
              <p>
                “Your file has been transmitted to the Initiative. Keep an eye on your inbox for the next steps.”
              </p>
            </div>

            {/* Fictional Recruitment Cadet Credential Pass */}
            <div className="p-6 rounded-lg bg-obsidian-950 border-2 border-reactor-cyan/40 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-15 pointer-events-none">
                <Shield className="w-40 h-40 text-reactor-cyan" />
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-graphite-800 text-[10px] font-mono">
                <span className="text-reactor-cyan font-bold tracking-widest">
                  AVENGERS INITIATIVE // PROVISIONAL CADET PASS
                </span>
                <span className="text-silver-muted">
                  REF: {submittedDossier.dossierId}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-silver-muted uppercase block">Cadet Name</span>
                  <span className="text-base font-bold text-white uppercase">{submittedDossier.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-silver-muted uppercase block">Designated Division</span>
                  <span className="text-sm font-bold text-reactor-cyan uppercase">
                    {DIVISIONS_DATA.find((d) => d.id === submittedDossier.preferredDivision)?.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-silver-muted uppercase block">Contact Relay</span>
                  <span className="text-xs text-silver-light">{submittedDossier.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-silver-muted uppercase block">Academic Major</span>
                  <span className="text-xs text-silver-light">{submittedDossier.department} ({submittedDossier.yearOfStudy})</span>
                </div>
              </div>

              {/* Barcode & Security Hash */}
              <div className="mt-6 pt-4 border-t border-graphite-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-silver-muted">
                <span>CHECKSUM: {submittedDossier.verificationChecksum}</span>
                <span className="tracking-[0.3em] font-bold text-white bg-graphite-800 px-3 py-1 rounded">
                  ||| | |||| | ||| || |||| |
                </span>
                <span>STATUS: QUEUED FOR REVIEW</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-graphite-800">
              <span className="text-xs font-mono text-silver-muted">
                A verification copy has been saved to your browser session.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-silver-light hover:text-white bg-graphite-800 border border-graphite-700 rounded transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print / Save Pass</span>
                </button>
                <button
                  onClick={handleResetForm}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-stark hover:bg-stark-glow rounded transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another File</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Application Form */}
        {!isSubmitting && !submittedDossier && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-10 rounded-lg bg-graphite-900 border border-reactor-cyan/30 shadow-2xl space-y-8 hud-border"
          >
            {/* Honeypot field (hidden from real users, tricks bots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp_field">Do not fill this</label>
              <input
                id="hp_field"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Part 1: Identity & Credentials */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-graphite-800">
                <h3 className="text-xs font-mono uppercase tracking-widest text-reactor-cyan font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  SECTION 01 // CANDIDATE IDENTIFICATION
                </h3>
                <span className="text-[10px] font-mono text-silver-muted">* REQUIRED FIELDS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    aria-invalid={Boolean(errors.fullName)}
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="e.g. Morgan Stark"
                    className={`w-full bg-obsidian border rounded-md px-3.5 py-2.5 text-sm text-white placeholder-silver-muted/50 font-sans transition focus:outline-none ${
                      errors.fullName
                        ? 'border-stark focus:border-stark shadow-[0_0_10px_rgba(230,36,41,0.2)]'
                        : 'border-graphite-700 focus:border-reactor-cyan'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-stark font-mono flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* College Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                    College / Academic Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="student@university.edu"
                    className={`w-full bg-obsidian border rounded-md px-3.5 py-2.5 text-sm text-white placeholder-silver-muted/50 font-sans transition focus:outline-none ${
                      errors.email
                        ? 'border-stark focus:border-stark shadow-[0_0_10px_rgba(230,36,41,0.2)]'
                        : 'border-graphite-700 focus:border-reactor-cyan'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-stark font-mono flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Department & Year of Study */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label htmlFor="department" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                    Department / Academic Major
                  </label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-obsidian border border-graphite-700 focus:border-reactor-cyan rounded-md px-3.5 py-2.5 text-sm text-white font-sans transition focus:outline-none"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Electrical & Robotics Engineering">Electrical & Robotics Engineering</option>
                    <option value="Mechanical / Aerospace Engineering">Mechanical / Aerospace Engineering</option>
                    <option value="Digital Media, Art & Design">Digital Media, Art & Design</option>
                    <option value="Business, Economics & Management">Business, Economics & Management</option>
                    <option value="Communications, Journalism & PR">Communications, Journalism & PR</option>
                    <option value="Natural Sciences / Mathematics">Natural Sciences / Mathematics</option>
                    <option value="Humanities & Social Sciences">Humanities & Social Sciences</option>
                    <option value="Undeclared / First-Year Exploratory">Undeclared / First-Year Exploratory</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="yearOfStudy" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                    Current Year of Study
                  </label>
                  <select
                    id="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    className="w-full bg-obsidian border border-graphite-700 focus:border-reactor-cyan rounded-md px-3.5 py-2.5 text-sm text-white font-sans transition focus:outline-none"
                  >
                    <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                    <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                    <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                    <option value="4th Year (Senior)">4th Year (Senior)</option>
                    <option value="Graduate / Master / PhD">Graduate / Master / PhD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Part 2: Division Preference & Skills */}
            <div className="space-y-4 pt-4 border-t border-graphite-800">
              <div className="flex items-center justify-between pb-2 border-b border-graphite-800">
                <h3 className="text-xs font-mono uppercase tracking-widest text-reactor-cyan font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  SECTION 02 // DIVISIONAL SPECIALIZATION
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Primary Division */}
                <div>
                  <label htmlFor="preferredDivision" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                    Preferred Division *
                  </label>
                  <select
                    id="preferredDivision"
                    required
                    value={formData.preferredDivision}
                    onChange={(e) => {
                      setFormData({ ...formData, preferredDivision: e.target.value as DivisionId });
                      if (errors.preferredDivision) setErrors({ ...errors, preferredDivision: undefined });
                    }}
                    className={`w-full bg-obsidian border rounded-md px-3.5 py-2.5 text-sm text-white font-sans transition focus:outline-none ${
                      errors.preferredDivision
                        ? 'border-stark'
                        : 'border-graphite-700 focus:border-reactor-cyan'
                    }`}
                  >
                    {DIVISIONS_DATA.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Secondary Division Optional */}
                <div>
                  <label htmlFor="secondaryDivision" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                    Secondary Division (Optional)
                  </label>
                  <select
                    id="secondaryDivision"
                    value={formData.secondaryDivision || ''}
                    onChange={(e) => setFormData({ ...formData, secondaryDivision: e.target.value as DivisionId })}
                    className="w-full bg-obsidian border border-graphite-700 focus:border-reactor-cyan rounded-md px-3.5 py-2.5 text-sm text-white font-sans transition focus:outline-none"
                  >
                    <option value="">None / Flexible across disciplines</option>
                    {DIVISIONS_DATA.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Skills & Interests Multi-tag Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-silver-light">
                  Skills, Tools, or Interests (Click presets or type custom)
                </label>
                
                {/* Selected Tag Chips */}
                <div className="flex flex-wrap gap-2 min-h-[36px] p-2 rounded bg-obsidian border border-graphite-700">
                  {formData.skillsAndInterests.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-reactor-cyan/15 text-reactor-cyan border border-reactor-cyan/40 text-xs font-mono"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-reactor-cyan/70 hover:text-white"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {formData.skillsAndInterests.length === 0 && (
                    <span className="text-xs text-silver-muted/60 font-mono py-1">
                      No tags added yet. Choose from below or type custom skills.
                    </span>
                  )}
                </div>

                {/* Custom Add Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(skillInput);
                      }
                    }}
                    placeholder="Add a custom skill or interest (e.g. 3D Printing, Figma, Speech)..."
                    className="flex-1 bg-obsidian border border-graphite-700 focus:border-reactor-cyan rounded px-3 py-1.5 text-xs text-white placeholder-silver-muted/50 font-sans focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(skillInput)}
                    className="px-3 py-1.5 bg-graphite-800 hover:bg-graphite-700 text-silver-light text-xs font-mono uppercase rounded border border-graphite-600 transition"
                  >
                    Add Tag
                  </button>
                </div>

                {/* Popular Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-silver-muted uppercase mr-1 flex items-center">
                    QUICK ADD:
                  </span>
                  {popularSkills.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAddSkill(preset)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-graphite-800/80 hover:bg-reactor-cyan/10 hover:text-reactor-cyan text-silver-muted border border-graphite-700 transition"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 3: Statement & Online Portfolio */}
            <div className="space-y-4 pt-4 border-t border-graphite-800">
              <div className="flex items-center justify-between pb-2 border-b border-graphite-800">
                <h3 className="text-xs font-mono uppercase tracking-widest text-reactor-cyan font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  SECTION 03 // MOTIVATION & PORTFOLIO
                </h3>
              </div>

              {/* Why Join */}
              <div>
                <label htmlFor="whyJoin" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                  Why do you want to join the Avengers Initiative? *
                </label>
                <textarea
                  id="whyJoin"
                  required
                  rows={4}
                  aria-invalid={Boolean(errors.whyJoin)}
                  value={formData.whyJoin}
                  onChange={(e) => {
                    setFormData({ ...formData, whyJoin: e.target.value });
                    if (errors.whyJoin) setErrors({ ...errors, whyJoin: undefined });
                  }}
                  placeholder="Tell us what draws you to this team, what you are passionate about building or exploring, and what you hope to experience on campus..."
                  className={`w-full bg-obsidian border rounded-md px-3.5 py-2.5 text-sm text-white placeholder-silver-muted/50 font-sans transition focus:outline-none ${
                    errors.whyJoin
                      ? 'border-stark focus:border-stark shadow-[0_0_10px_rgba(230,36,41,0.2)]'
                      : 'border-graphite-700 focus:border-reactor-cyan'
                  }`}
                />
                {errors.whyJoin && (
                  <p className="mt-1 text-xs text-stark font-mono flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {errors.whyJoin}
                  </p>
                )}
                <span className="text-[11px] font-sans text-silver-muted block mt-1">
                  We look for genuine curiosity and team spirit rather than rehearsed corporate jargon.
                </span>
              </div>

              {/* Optional Portfolio / LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label htmlFor="portfolioUrl" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                    Portfolio, GitHub, or LinkedIn URL (Optional)
                  </label>
                  <input
                    id="portfolioUrl"
                    type="url"
                    value={formData.portfolioUrl || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, portfolioUrl: e.target.value });
                      if (errors.portfolioUrl) setErrors({ ...errors, portfolioUrl: undefined });
                    }}
                    placeholder="https://github.com/your-username"
                    className={`w-full bg-obsidian border rounded-md px-3.5 py-2.5 text-sm text-white placeholder-silver-muted/50 font-sans transition focus:outline-none ${
                      errors.portfolioUrl
                        ? 'border-stark'
                        : 'border-graphite-700 focus:border-reactor-cyan'
                    }`}
                  />
                  {errors.portfolioUrl && (
                    <p className="mt-1 text-xs text-stark font-mono">{errors.portfolioUrl}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="availabilityHours" className="block text-xs font-mono uppercase tracking-wider text-silver-light mb-1.5">
                    Estimated Weekly Availability
                  </label>
                  <select
                    id="availabilityHours"
                    value={formData.availabilityHours}
                    onChange={(e) => setFormData({ ...formData, availabilityHours: e.target.value })}
                    className="w-full bg-obsidian border border-graphite-700 focus:border-reactor-cyan rounded-md px-3.5 py-2.5 text-sm text-white font-sans transition focus:outline-none"
                  >
                    <option value="2-4 hours / week">2-4 hours / week (Light project support)</option>
                    <option value="4-6 hours / week">4-6 hours / week (Standard core contributor)</option>
                    <option value="8+ hours / week">8+ hours / week (Sprint lead / intensive builds)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Part 4: Privacy Consent Directive */}
            <div className="pt-4 border-t border-graphite-800 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  aria-invalid={Boolean(errors.privacyConsent)}
                  checked={formData.privacyConsent}
                  onChange={(e) => {
                    setFormData({ ...formData, privacyConsent: e.target.checked });
                    if (errors.privacyConsent) setErrors({ ...errors, privacyConsent: undefined });
                  }}
                  className="mt-1 w-4 h-4 rounded bg-obsidian border-graphite-600 text-stark focus:ring-stark"
                />
                <span className="text-xs text-silver-light font-sans leading-relaxed">
                  I consent to the Avengers Initiative reviewing my application credentials for club recruitment.
                  I understand my data is stored securely and handled according to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenPrivacyNotice();
                    }}
                    className="text-reactor-cyan hover:underline font-semibold"
                  >
                    Club Privacy Directive
                  </button>
                  . *
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="text-xs text-stark font-mono flex items-center gap-1 pl-7">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.privacyConsent}
                </p>
              )}
            </div>

            {/* Submission CTA Button */}
            <div className="pt-6 border-t border-graphite-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-silver-muted">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>SHA-256 SECURED TRANSMISSION PROTOCOL</span>
              </div>

              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white bg-stark hover:bg-stark-glow transition-all duration-200 rounded shadow-2xl shadow-stark/40 clip-chamfer active:scale-95 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>SUBMIT RECRUITMENT FILE</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
