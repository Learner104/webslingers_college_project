import { TeamMember } from '../types/initiative';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tony',
    name: 'Tony',
    role: 'Initiative Director',
    divisionId: 'strategy',
    divisionName: 'Strategy & Command',
    clearance: 'DIRECTOR // LEVEL 5',
    callsign: 'IRON-PRIME',
    personality: 'Visionary engineer and strategist with high-velocity execution and an unyielding commitment to student innovation.',
    bio: 'Senior studying Systems Engineering & Computer Science. Co-founded the Avengers Initiative on campus to bridge the gap between technical builders and creative visionaries. Oversees overall club operations, institutional partnerships, and annual roadmaps.',
    focusArea: 'Cross-functional strategy, campus relations, and project incubation.',
    skills: ['Strategic Planning', 'Autonomous Systems', 'Organizational Design', 'Risk Management'],
    avatarStyle: {
      primaryColor: '#56D8FF',
      secondaryColor: '#182130',
      symbol: 'Shield'
    },
    stats: {
      projectsLed: 24,
      mentorshipHours: 150,
      term: 'Class of 2025'
    },
    socialLinks: [
      { platform: 'LinkedIn', label: 'Campus Directory Profile [Placeholder]', url: '#dossier-tony' },
      { platform: 'GitHub', label: 'GitHub [Club Repo]', url: '#dossier-tony' }
    ]
  },
  {
    id: 'hulk',
    name: 'Hulk',
    role: 'Operations & Strength Lead',
    divisionId: 'events',
    divisionName: 'Events & Field Operations',
    clearance: 'TACTICIAN // LEVEL 4',
    callsign: 'BEHEMOTH',
    personality: 'Unstoppable powerhouse in project execution, heavy event staging, and resolving high-stress campus logistics.',
    bio: 'Junior in Mechanical Engineering & Industrial Operations. Commands major campus event setups, large-scale stage productions, and rapid logistical deployments. Known for lifting the heaviest challenges with calm precision.',
    focusArea: 'Heavy staging logistics, crisis response, crowd management, and field deployments.',
    skills: ['Logistics Architecture', 'Structural Staging', 'Team Leadership', 'Crisis Management'],
    avatarStyle: {
      primaryColor: '#10B981',
      secondaryColor: '#0E241B',
      symbol: 'Compass'
    },
    stats: {
      projectsLed: 19,
      mentorshipHours: 95,
      term: 'Class of 2026'
    },
    socialLinks: [
      { platform: 'LinkedIn', label: 'Field Ops Registry [Placeholder]', url: '#dossier-hulk' }
    ]
  },
  {
    id: 'peter-cole',
    name: 'Peter Cole',
    role: 'Creative Lead',
    divisionId: 'creative',
    divisionName: 'Creative Operations',
    clearance: 'ARTISAN // LEVEL 4',
    callsign: 'SPECTRUM',
    personality: 'Inquisitive visual designer with an obsessive eye for typography, motion, and cinematic lighting.',
    bio: 'Sophomore in Digital Media & Graphic Arts. Spearheads the visual identity of the Initiative, directing cinematic trailers, stage visualizers, and interactive digital experiences. Believes great design makes technology approachable.',
    focusArea: 'Interactive design systems, 3D motion design, and brand identity.',
    skills: ['Figma Mastery', 'Blender 3D', 'After Effects', 'Art Direction'],
    avatarStyle: {
      primaryColor: '#FF6B8B',
      secondaryColor: '#26131D',
      symbol: 'Palette'
    },
    stats: {
      projectsLed: 11,
      mentorshipHours: 70,
      term: 'Class of 2027'
    },
    socialLinks: [
      { platform: 'Portfolio', label: 'Design Showcase [Placeholder]', url: '#dossier-peter' }
    ]
  }
];
