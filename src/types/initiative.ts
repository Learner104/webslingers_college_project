export type DivisionId = 'tech' | 'creative' | 'strategy' | 'events' | 'media';

export interface Division {
  id: DivisionId;
  code: string;
  name: string;
  tagline: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  iconName: string;
  shortDescription: string;
  fullMission: string;
  sampleProjects: {
    title: string;
    description: string;
    techOrTools: string[];
  }[];
  keySkills: string[];
  whoWeLookFor: string;
  stats: { label: string; value: string }[];
  clearanceLevel: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  divisionId: DivisionId;
  divisionName: string;
  clearance: string;
  callsign: string;
  personality: string;
  bio: string;
  focusArea: string;
  skills: string[];
  avatarStyle: {
    primaryColor: string;
    secondaryColor: string;
    symbol: string;
  };
  stats: {
    projectsLed: number;
    mentorshipHours: number;
    term: string;
  };
  socialLinks?: {
    platform: string;
    label: string;
    url: string;
  }[];
}

export interface FieldReport {
  id: string;
  code: string;
  title: string;
  category: string;
  divisionId: DivisionId;
  date: string;
  quarter: string;
  summary: string;
  fullDebrief: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  status: 'COMPLETED' | 'ARCHIVED' | 'IN_OPERATION';
  tags: string[];
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  department: string;
  yearOfStudy: string;
  preferredDivision: DivisionId | '';
  secondaryDivision?: DivisionId | '';
  skillsAndInterests: string[];
  whyJoin: string;
  portfolioUrl?: string;
  availabilityHours: string;
  privacyConsent: boolean;
}

export interface SubmittedDossier extends ApplicationFormData {
  dossierId: string;
  submissionTimestamp: string;
  status: 'RECEIVED' | 'UNDER_REVIEW' | 'INVITED_FOR_CONNECT';
  verificationChecksum: string;
}
