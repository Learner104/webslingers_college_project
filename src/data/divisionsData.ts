import { Division } from '../types/initiative';

export const DIVISIONS_DATA: Division[] = [
  {
    id: 'tech',
    code: 'DIV-01 // R&D',
    name: 'Tech & Innovation',
    tagline: 'Architecting digital systems, intelligence prototypes, and robotics.',
    accentColor: '#56D8FF',
    accentBg: 'rgba(86, 216, 255, 0.08)',
    accentBorder: 'rgba(86, 216, 255, 0.3)',
    iconName: 'Cpu',
    shortDescription: 'Coding, AI, robotics, embedded systems, and technical open-source tooling.',
    fullMission: 'The Tech & Innovation division pushes technical boundaries on campus. We engineer high-performance web applications, experiment with localized machine learning models, build robotics prototypes, and automate student workflows. No matter your prior background, if you have a burning desire to write code or wire circuits, you belong here.',
    sampleProjects: [
      {
        title: 'Project Jarvis Campus Bot',
        description: 'An open-source LLM student assistant providing real-time campus navigation, lab hours, and study group matchmaking.',
        techOrTools: ['Python', 'FastAPI', 'PyTorch', 'Next.js', 'Vector DB']
      },
      {
        title: 'Autonomous Rover Mk-II',
        description: 'A sensor-fusion rover built using ROS2 and ESP32 microcontrollers for campus delivery mapping.',
        techOrTools: ['C++', 'ROS2', 'ESP32', 'LiDAR', 'OpenCV']
      },
      {
        title: 'Initiative Cyber Defense Lab',
        description: 'Hands-on simulated blue-team exercises and campus CTF challenges.',
        techOrTools: ['Linux', 'Wireshark', 'Docker', 'Cryptography']
      }
    ],
    keySkills: ['Full-stack Development', 'Python / C++', 'Machine Learning', 'Embedded Hardware', 'Git / DevOps', 'Problem Solving'],
    whoWeLookFor: 'Students driven by a desire to build things that actually work. Curiosity matters more than experience—we provide project mentorship, code reviews, and server access.',
    stats: [
      { label: 'Active Builds', value: '8 Prototypes' },
      { label: 'Team Size', value: '28 Engineers' },
      { label: 'Lab Access', value: 'Hardware & Compute 24/7' }
    ],
    clearanceLevel: 'LEVEL 4 // ARCHITECT'
  },
  {
    id: 'creative',
    code: 'DIV-02 // VISUAL',
    name: 'Creative Operations',
    tagline: 'Cinematic visual identity, 3D motion, and immersive brand storytelling.',
    accentColor: '#FF6B8B',
    accentBg: 'rgba(255, 107, 139, 0.08)',
    accentBorder: 'rgba(255, 107, 139, 0.3)',
    iconName: 'Palette',
    shortDescription: 'Graphic design, UI/UX, video production, photography, and futuristic digital art.',
    fullMission: 'Creative Operations forms the aesthetic vanguard of the Initiative. We create the visual universe, promotional trailers, tactical apparel, interactive UI designs, and photographic archives that make our student community unforgettable. We turn raw concepts into awe-inspiring sensory experiences.',
    sampleProjects: [
      {
        title: 'Initiative HUD Design System',
        description: 'A bespoke dark-mode tactical UI component library inspired by aerospace heads-up displays and cyber interfaces.',
        techOrTools: ['Figma', 'Tokens Studio', 'Design Systems', 'Tailwind']
      },
      {
        title: 'Cinematic Recruitment Teaser',
        description: 'A 90-second high-energy campus film utilizing anamorphic lighting, drone footage, and custom audio mastering.',
        techOrTools: ['DaVinci Resolve', 'After Effects', 'Blender', 'Sound Design']
      },
      {
        title: 'Tactical Patch & Apparel Line',
        description: 'Club embroidered uniform badges, minimalist techwear merchandise, and physical identity kits.',
        techOrTools: ['Illustrator', 'Screen Printing', '3D Mockups']
      }
    ],
    keySkills: ['UI/UX Design', 'Motion Graphics', 'Cinematography', 'Brand Architecture', 'Figma / Adobe Suite', '3D Modeling'],
    whoWeLookFor: 'Visual artists, designers, videographers, and storytellers who obsess over typography, color harmonies, and emotional resonance. Beginners with a strong visual eye are warmly encouraged to apply.',
    stats: [
      { label: 'Media Assets', value: '450+ Created' },
      { label: 'Studio Crew', value: '18 Designers' },
      { label: 'Equipment', value: 'Cinema Rigs & Mac Suite' }
    ],
    clearanceLevel: 'LEVEL 3 // ARTISAN'
  },
  {
    id: 'strategy',
    code: 'DIV-03 // INTEL',
    name: 'Strategy & Intelligence',
    tagline: 'Deep research, data analysis, tactical planning, and resource allocation.',
    accentColor: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.08)',
    accentBorder: 'rgba(245, 158, 11, 0.3)',
    iconName: 'Compass',
    shortDescription: 'Research, policy analysis, competitive problem-solving, and cross-functional strategy.',
    fullMission: 'Strategy & Intelligence is the analytical backbone of the club. We analyze campus trends, study student needs, evaluate project feasibility, optimize budget allocations, and structure high-stakes initiatives. We ensure our ambitious ideas have the rigor and execution roadmap to succeed.',
    sampleProjects: [
      {
        title: 'Campus Student Sentiment Index',
        description: 'A data-driven survey model analyzing academic burnout and proposing evidence-based campus wellness policies.',
        techOrTools: ['R', 'Python Pandas', 'Tableau', 'Survey Analytics']
      },
      {
        title: 'Strategic Partnership Blueprint',
        description: 'Framework securing student sponsorships, industry mentor connections, and academic department co-sponsorships.',
        techOrTools: ['Financial Modeling', 'Executive Pitches', 'Contract Strategy']
      },
      {
        title: 'Campus Hackathon Operations Manual',
        description: 'A 60-page tactical playbook outlining emergency contingencies, judging frameworks, and logistical timelines.',
        techOrTools: ['Risk Management', 'Operations Research', 'Notion OS']
      }
    ],
    keySkills: ['Data Analytics', 'Critical Thinking', 'Market Research', 'Financial Planning', 'Structured Writing', 'Presentation'],
    whoWeLookFor: 'Analytical minds, debaters, researchers, and strategists who enjoy asking "why" and finding patterns in chaos. If you love dissecting complex problems, this is your squad.',
    stats: [
      { label: 'Research Papers', value: '12 Published' },
      { label: 'Strategists', value: '14 Analysts' },
      { label: 'Sponsorships', value: '$15K+ Secured' }
    ],
    clearanceLevel: 'LEVEL 4 // ANALYST'
  },
  {
    id: 'events',
    code: 'DIV-04 // FIELD-OPS',
    name: 'Events & Field Operations',
    tagline: 'High-energy campus experiences, logistics execution, and community assemblies.',
    accentColor: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.08)',
    accentBorder: 'rgba(16, 185, 129, 0.3)',
    iconName: 'ShieldAlert',
    shortDescription: 'Event staging, logistics, crowd coordination, live experience production, and field coordination.',
    fullMission: 'Field Operations turns grand plans into flawless physical reality. From massive 500-student campus assemblies and weekend hackathons to immersive scavenger hunts and speaker summits, we command the room, manage stage tech, solve unexpected emergencies on the fly, and ensure every attendee has an unforgettable experience.',
    sampleProjects: [
      {
        title: 'Campus Assemble: Spring Conclave',
        description: 'The flagship multi-hall university student showcase featuring 600 attendees, interactive tech demos, and keynote speakers.',
        techOrTools: ['Stage Management', 'A/V Production', 'Crowd Flow', 'Live Ops']
      },
      {
        title: 'Night Ops Campus Escape Game',
        description: 'A campus-wide nighttime interactive puzzle hunt combining physical clue boxes and encrypted QR-code checkpoints.',
        techOrTools: ['Logistics', 'Props Fabrication', 'Safety Protocols']
      },
      {
        title: 'Freshman Induction Bootcamp',
        description: 'A multi-day welcoming experience introducing 150+ new recruits to student clubs and campus leadership.',
        techOrTools: ['Team Building', 'Venue Coordination', 'Hospitality']
      }
    ],
    keySkills: ['Event Management', 'Crisis Resolution', 'Audio/Visual Setup', 'Vendor Coordination', 'Leadership Under Pressure', 'Teamwork'],
    whoWeLookFor: 'Action-oriented doers, natural organizers, and energetic leaders who thrive on live momentum and love bringing hundreds of people together in real life.',
    stats: [
      { label: 'Events Run', value: '24 Experiences' },
      { label: 'Attendees', value: '3,200+ Students' },
      { label: 'Ops Crew', value: '22 Field Officers' }
    ],
    clearanceLevel: 'LEVEL 3 // TACTICIAN'
  },
  {
    id: 'media',
    code: 'DIV-05 // COMM',
    name: 'Media & Communications',
    tagline: 'Voice of the Initiative, social broadcast networks, editorial, and public relations.',
    accentColor: '#E62429',
    accentBg: 'rgba(230, 36, 41, 0.08)',
    accentBorder: 'rgba(230, 36, 41, 0.3)',
    iconName: 'Radio',
    shortDescription: 'Social media growth, editorial writing, community broadcasts, campus journalism, and public outreach.',
    fullMission: 'Media & Communications is the megaphone and conscience of the Initiative. We run our multi-platform social feeds, publish the monthly intelligence dispatch, interface with campus press, interview student leaders, and maintain open lines of dialogue across the student body. We keep our community informed, connected, and inspired.',
    sampleProjects: [
      {
        title: 'The Initiative Dispatch (Newsletter)',
        description: 'A weekly tactical email dispatch read by over 2,400 students featuring student tech breakdowns, project spotlights, and campus opportunities.',
        techOrTools: ['Editorial Writing', 'Substack / Beehiiv', 'Copywriting']
      },
      {
        title: 'Project Spotlight Video Series',
        description: 'Micro-documentary series profiling ambitious student inventors and community leaders across campus.',
        techOrTools: ['Interviews', 'TikTok / Reels Growth', 'Storyboarding']
      },
      {
        title: 'Community Discord & Social Hub',
        description: 'Managing a thriving 1,800+ member student digital hub with automated bots, study channels, and weekly voice hangouts.',
        techOrTools: ['Community Architecture', 'Discord Bots', 'Moderation']
      }
    ],
    keySkills: ['Copywriting & Journalism', 'Social Media Strategy', 'Public Speaking', 'Community Moderation', 'Podcast / Audio Production', 'PR Management'],
    whoWeLookFor: 'Passionate communicators, writers, social media natives, and community builders who know how to connect with people and craft stories that move an audience.',
    stats: [
      { label: 'Subscribers', value: '2,400+ Readers' },
      { label: 'Discord Hub', value: '1,800 Members' },
      { label: 'Comms Staff', value: '16 Storytellers' }
    ],
    clearanceLevel: 'LEVEL 3 // COMMISSAR'
  }
];
