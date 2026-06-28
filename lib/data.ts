import { ProfileMetadata, Experience, Education, TechItem, Project, NavItem } from '@/types';

export const profileMetadata: ProfileMetadata = {
  name: 'Ark Tandon',
  handle: '@csxark',
  email: 'arktandoncs@gmail.com',
  tagline: 'Web Developer crafting scalable, human-centered digital experiences. Pursuing Data and Generative AI.',
  bio: 'A passionate Developer with a knack for creating engaging and user-friendly digital experiences. With a strong foundation in Data and Generative AI, I bring a unique perspective to development, building systems that are both powerful and elegant.',
  socials: [
    { platform: 'github', url: 'https://github.com/csxark' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/csxark/' },
    { platform: 'x', url: 'https://x.com/ark_tandon' }
  ]
};

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'LearnIT',
    role: 'Senior Coordinator, Web Developer',
    period: 'May 2025 – Apr 2026',
    description: [
      'Led the web development team to design, build, and optimize student portals, raising engagement by 40%.',
      'Engineered responsive dashboards with React and Node.js for tracking student event schedules.',
      'Configured automated deployment workflows resulting in a 50% decrease in release downtime.'
    ]
  },
  {
    id: 'exp-2',
    company: 'EliteCoders Winter of Code 2026',
    role: 'Project Admin',
    period: 'Jan 2026 – Mar 2026',
    description: [
      'Orchestrated developer contributions across multiple open-source AI and full-stack modules.',
      'Managed codebase review policies, improving review cycles and system architecture efficiency.',
      'Led technical mentoring sessions covering React 19 APIs and agentic frameworks.'
    ]
  },
  {
    id: 'exp-3',
    company: 'GirlScript Summer of Code 2025',
    role: 'Open Source Contributor',
    period: 'Jul 2025 – Oct 2025',
    description: [
      'Contributed atomic components and visual styling modules to global web accessibility repositories.',
      'Refactored legacy vanilla layouts to Next.js Client Component frameworks.',
      'Resolved 20+ critical issues regarding cross-browser grid and flex rendering issues.'
    ]
  }
];

export const educationList: Education[] = [
  {
    id: 'edu-1',
    institution: 'Manipal University Jaipur',
    degree: 'B.Tech Computer Science & Engineering',
    period: '2024 – 2028',
    description: 'Specializing in software architecture, core data science methodologies, and deep learning implementations.'
  }
];

export const techStack: TechItem[] = [
  { name: 'JavaScript', category: 'languages-tools' },
  { name: 'TypeScript', category: 'languages-tools' },
  { name: 'Python', category: 'languages-tools' },
  { name: 'C', category: 'languages-tools' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'Prisma', category: 'backend' },
  { name: 'LangChain', category: 'ai-data' },
  { name: 'LangGraph', category: 'ai-data' }
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'AlgoViz',
    year: '2025',
    description: 'An interactive algorithm and data-structure visualization dashboard rendering dynamic traversal steps.',
    websiteUrl: 'https://algo-viz-nine.vercel.app/',
    githubUrl: 'https://github.com/csxark/AlgoViz',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion']
  },
  {
    id: 'proj-2',
    title: 'HopeFlow',
    year: '2025',
    description: 'An empathetic, multi-modal emotional support platform integrating real-time voice and text analysis via OmniDimension AI.',
    websiteUrl: 'https://hope-flow.vercel.app/',
    githubUrl: 'https://github.com/csxark/HopeFlow',
    techStack: ['React', 'Supabase', 'Gemini AI', 'Tailwind']
  },
  {
    id: 'proj-3',
    title: 'Finlo',
    year: '2025',
    description: 'A personal financial intelligence dashboard facilitating live expense tracking, budgeting structures, and interactive analytics.',
    websiteUrl: 'https://finlo-theta.vercel.app/',
    githubUrl: 'https://github.com/csxark/Finlo',
    techStack: ['React', 'Tailwind CSS', 'Supabase', 'Chart.js']
  }
];

export const navItems: NavItem[] = [
  { id: 'profile', label: 'PROFILE', number: '01' },
  { id: 'work', label: 'WORK', number: '02' },
  { id: 'projects', label: 'PROJECTS', number: '03' },
  { id: 'stack', label: 'STACK', number: '04' },
  { id: 'education', label: 'EDUCATION', number: '05' },
  { id: 'contact', label: 'CONTACT', number: '06' }
];
