import { FieldReport } from '../types/initiative';

export const FIELD_REPORTS: FieldReport[] = [
  {
    id: 'fr-innovation-sprint',
    code: 'OPS-REPORT // #084',
    title: 'Innovation Sprint: 48-Hour Campus Hack',
    category: 'Technical Challenge',
    divisionId: 'tech',
    date: 'OCTOBER 2024',
    quarter: 'FALL SEMESTER',
    summary: 'A fast-paced collaborative sprint where 12 multidisciplinary student teams engineered working software and hardware prototypes addressing student life challenges.',
    fullDebrief: 'The Fall Innovation Sprint convened students from Computer Science, Mechanical Engineering, and Industrial Design. Over 48 hours without pause, teams developed real solutions ranging from campus bike-share tracking to mental wellness check-in dashboards. 3 projects secured continuing funding from the campus innovation grant office.',
    highlights: [
      '12 functional prototypes built in 48 hours',
      'Zero-latency cloud cluster provided for all teams',
      'Over 60 hours of 1-on-1 peer engineering mentorship'
    ],
    metrics: [
      { label: 'Participants', value: '78 Students' },
      { label: 'Prototypes Shipped', value: '12 Deployed' },
      { label: 'Grant Funding', value: '$4,500' }
    ],
    status: 'COMPLETED',
    tags: ['Tech & Innovation', 'Hackathon', 'Rapid Prototyping']
  },
  {
    id: 'fr-campus-assemble',
    code: 'OPS-REPORT // #081',
    title: 'Campus Assemble: Grand Conclave',
    category: 'Community Gathering',
    divisionId: 'events',
    date: 'SEPTEMBER 2024',
    quarter: 'FALL SEMESTER',
    summary: 'The flagship semester kickoff gathering uniting student builders, innovators, and university faculty under one roof for interactive demonstrations.',
    fullDebrief: 'Held in the Grand Hall of the Student Union, Campus Assemble was designed as an immersive tactical expo. Attendees interacted with 15 live hardware stations, experienced a 360-degree projection dome created by Creative Ops, and attended lightning talks from student researchers.',
    highlights: [
      'Over 550 student attendees across 4 engineering departments',
      'Live robotics demonstration obstacle course',
      'Interactive holographic badge check-in system'
    ],
    metrics: [
      { label: 'Attendees', value: '550+' },
      { label: 'Live Demos', value: '15 Stations' },
      { label: 'Satisfaction', value: '98.4%' }
    ],
    status: 'COMPLETED',
    tags: ['Events & Field Ops', 'Exposition', 'Community']
  },
  {
    id: 'fr-project-genesis',
    code: 'OPS-REPORT // #079',
    title: 'Project Genesis: Autonomous Campus Rover',
    category: 'Hardware & AI',
    divisionId: 'tech',
    date: 'JULY 2024',
    quarter: 'SUMMER LABS',
    summary: 'A multi-month autonomous robotics research project that designed and fabricated a custom 4-wheel rover with real-time obstacle avoidance.',
    fullDebrief: 'During the summer break, a dedicated cohort of 10 student engineers took over the club robotics basement. Using custom 3D-printed chassis brackets, brushless hub motors, and NVIDIA Jetson compute modules, Project Genesis successfully navigated the campus quadrangle fully autonomously.',
    highlights: [
      'Custom aluminum chassis water-jet cut in university shop',
      'Real-time LiDAR point-cloud mapping implemented with ROS2',
      'Presented as student paper at regional collegiate IEEE summit'
    ],
    metrics: [
      { label: 'Autonomous Dist.', value: '14.2 km' },
      { label: 'Latency', value: '< 18 ms' },
      { label: 'Hardware Budget', value: '$2,800' }
    ],
    status: 'COMPLETED',
    tags: ['Robotics', 'Embedded Systems', 'Computer Vision']
  },
  {
    id: 'fr-creative-ops',
    code: 'OPS-REPORT // #075',
    title: 'Creative Ops: Visual Masterclass & HUD Workshop',
    category: 'Design & Media',
    divisionId: 'creative',
    date: 'MAY 2024',
    quarter: 'SPRING SEMESTER',
    summary: 'A hands-on, intensive workshop teaching students motion design, cinematic lighting, and futuristic interface design fundamentals.',
    fullDebrief: 'Led by Creative Lead Peter Cole, this workshop democratized visual storytelling for 45 students across diverse majors. Attendees were taught generative 3D modeling in Blender, vector iconography in Figma, and sound synthesis for UI effects.',
    highlights: [
      'Every attendee built and exported their own sci-fi HUD asset',
      'Special guest lecture from a collegiate VFX alumnus',
      'Free software licenses distributed to all participants'
    ],
    metrics: [
      { label: 'Attendees', value: '45 Creators' },
      { label: 'Assets Produced', value: '120+' },
      { label: 'Beginner Ratio', value: '62%' }
    ],
    status: 'COMPLETED',
    tags: ['Creative Ops', 'UI/UX Design', '3D Motion']
  },
  {
    id: 'fr-intelligence-briefing',
    code: 'OPS-REPORT // #072',
    title: 'Intelligence Briefing: AI in Higher Education',
    category: 'Research & Policy',
    divisionId: 'strategy',
    date: 'MARCH 2024',
    quarter: 'SPRING SEMESTER',
    summary: 'A student-led research symposium and published white paper on how generative AI models are transforming undergraduate curricula.',
    fullDebrief: 'Strategy & Intelligence surveyed over 1,200 undergraduates across 6 faculties. The resulting policy paper was presented directly to the University Academic Senate, advocating for open AI sandbox tools rather than blanket academic bans.',
    highlights: [
      'Comprehensive 32-page research brief published open-access',
      'Quoted in university newspaper and student senate resolution',
      'Formed permanent student-faculty AI ethics advisory committee'
    ],
    metrics: [
      { label: 'Students Surveyed', value: '1,240' },
      { label: 'Senate Adoption', value: 'Unanimous' },
      { label: 'Media Mentions', value: '4 Outlets' }
    ],
    status: 'COMPLETED',
    tags: ['Strategy & Intel', 'Policy Brief', 'Data Science']
  },
  {
    id: 'fr-media-dispatch',
    code: 'OPS-REPORT // #068',
    title: 'The Campus Broadcast: Student Voices Podcast',
    category: 'Media & Broadcast',
    divisionId: 'media',
    date: 'FEBRUARY 2024',
    quarter: 'WINTER SERIES',
    summary: 'A 6-episode audio documentary spotlighting unsung campus heroes, lab researchers, and grassroots student initiatives.',
    fullDebrief: 'Produced in the campus media center, this series generated over 8,000 streams across Spotify and Apple Podcasts. Episodes covered topics ranging from late-night architecture studio culture to formula racing student mechanics.',
    highlights: [
      'Top 10 student podcast on campus streaming charts',
      'Recorded with studio-grade Shure mics and acoustic baffle setup',
      'Full audio transcripts and visual audiograms released weekly'
    ],
    metrics: [
      { label: 'Total Listens', value: '8,400+' },
      { label: 'Episodes', value: '6 Produced' },
      { label: 'Guest Speakers', value: '18 Students' }
    ],
    status: 'ARCHIVED',
    tags: ['Media & Comms', 'Podcast', 'Audio Production']
  }
];
