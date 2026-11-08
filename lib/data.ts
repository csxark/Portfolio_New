import type {
  BuildingItem,
  ExperienceItem,
  NavItem,
  OpenSourceItem,
  ProfileMetadata,
  Project,
  ToolkitCategory,
} from '@/types';

export const profileMetadata: ProfileMetadata = {
  name: 'Ark Tandon',
  role: 'Software Developer',
  location: 'Jaipur, India',
  email: 'arktandoncs@gmail.com',
  availability: 'Open to software development internships and collaborations',
  tagline: 'I build web applications and developer tools with a focus on clarity, maintainability, and practical AI features.',
  bio: 'I study Computer Science & Engineering at Manipal University Jaipur (2024-2028). My recent work includes frontend products, full-stack applications, and open-source contributions through programs like GSSoC and EliteCoders Winter of Code.',
  focus: ['Full-stack web development', 'Data and generative AI applications', 'Open-source collaboration'],
  socials: [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/csxark' },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/csxark/' },
    { platform: 'x', label: 'X', url: 'https://x.com/ark_tandon' },
    { platform: 'email', label: 'Email', url: 'mailto:arktandoncs@gmail.com' },
  ],
};

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'open-source', label: 'Open Source', href: '#open-source' },
  { id: 'contact', label: 'Contact', href: '#contact' },
  { id: 'awards', label: 'Awards', href: '/Awards' },
];

export const projects: Project[] = [
  {
    id: 'algoviz',
    title: 'AlgoViz',
    year: '2025',
    category: 'Developer tool',
    description: 'A browser-based visualizer for algorithms and data-structure operations, built to make step-by-step execution easier to inspect.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/csxark/AlgoViz',
    liveUrl: 'https://algo-viz-nine.vercel.app/',
    featured: true,
  },
  {
    id: 'hopeflow',
    title: 'HopeFlow',
    year: '2025',
    category: 'Web application',
    description: 'A multi-modal support platform prototype combining text and voice interactions with AI-assisted responses.',
    stack: ['React', 'Supabase', 'Gemini API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/csxark/HopeFlow',
    liveUrl: 'https://hope-flow.vercel.app/',
  },
  {
    id: 'finlo',
    title: 'Finlo',
    year: '2025',
    category: 'Dashboard',
    description: 'A personal finance dashboard for tracking expenses, budgets, and spending patterns with charts.',
    stack: ['React', 'Tailwind CSS', 'Supabase', 'Chart.js'],
    githubUrl: 'https://github.com/csxark/Finlo',
    liveUrl: 'https://finlo-theta.vercel.app/',
  },
  {
    id: 'project-todo',
    title: 'TODO: Add another project',
    year: 'TODO',
    category: 'TODO',
    description: 'TODO: Add a project with concrete scope, stack, and links. Placeholder kept intentionally; no fabricated details.',
    stack: ['TODO'],
  },
];

export const toolkit: ToolkitCategory[] = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { title: 'Backend', items: ['Node.js', 'PostgreSQL', 'Prisma', 'Supabase', 'TODO: Add APIs/frameworks used'] },
  { title: 'Databases', items: ['PostgreSQL', 'Supabase', 'TODO: Add others if applicable'] },
  { title: 'AI / ML', items: ['LangChain', 'LangGraph', 'Gemini API', 'Python', 'TODO: Add model/tooling details'] },
  { title: 'DevOps / Cloud', items: ['Vercel', 'GitHub Actions (TODO: confirm)', 'TODO: Add deployment platforms used'] },
  { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'C'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'npm', 'TODO: Add testing/design tools'] },
];

export const experience: ExperienceItem[] = [
  {
    id: 'edu-muj',
    organization: 'Manipal University Jaipur',
    role: 'B.Tech, Computer Science & Engineering',
    period: '2024 - 2028',
    location: 'Jaipur, India',
    summary: 'Undergraduate study in computer science and engineering.',
    highlights: ['Coursework and projects in software development and data/AI topics (TODO: add specific coursework if desired).'],
    type: 'education',
  },
  {
    id: 'learnit',
    organization: 'LearnIT',
    role: 'Senior Coordinator, Web Developer',
    period: 'May 2025 - Apr 2026',
    location: 'TODO: Add location/mode',
    summary: 'Worked on student-facing web interfaces and team coordination.',
    highlights: [
      'Built and maintained React/Node.js interfaces for student-facing workflows.',
      'Supported deployment and release processes for club web projects.',
    ],
    type: 'experience',
    logo: '/images/experience/LearnIT.svg',
  },
  {
    id: 'ewoc-admin',
    organization: 'EliteCoders Winter of Code 2026',
    role: 'Project Admin',
    period: 'Jan 2026 - Mar 2026',
    summary: 'Managed an open-source project during EliteCoders Winter of Code 2026.',
    highlights: [
      'Reviewed contributions and coordinated issue triage for project repositories.',
      'Recognized among the top 6 project admins (award listed on Awards page).',
    ],
    type: 'experience',
    logo: '/images/experience/ewoc.png',
  },
  {
    id: 'gssoc',
    organization: 'GirlScript Summer of Code 2025',
    role: 'Open Source Contributor',
    period: 'Jul 2025 - Oct 2025',
    summary: 'Contributed to open-source repositories during GSSoC 2025.',
    highlights: [
      'Submitted fixes and improvements across participating repositories.',
      'Worked with maintainers through pull requests and reviews.',
    ],
    type: 'experience',
    logo: '/images/experience/Gssoc.jpg',
  },
];

export const openSource: OpenSourceItem[] = [
  {
    id: 'ewoc-top-admin',
    title: 'Top 6 Project Admin - EliteCoders Winter of Code 2026',
    period: 'Mar 2026',
    description: 'Recognized for project administration during EliteCoders Winter of Code 2026.',
    url: '/Awards',
    type: 'project-admin',
  },
  {
    id: 'gssoc-contributor',
    title: 'GirlScript Summer of Code 2025 - Contributor',
    period: 'Jul - Nov 2025',
    description: 'Open-source contributions during GSSoC 2025.',
    url: '/Awards',
    type: 'contribution',
  },
  {
    id: 'oss-todo',
    title: 'TODO: Add specific merged PRs or repositories',
    period: 'TODO',
    description: 'Add links to notable pull requests, issues, or repositories. Placeholder kept intentionally.',
    type: 'contribution',
  },
];

export const currentlyBuilding: BuildingItem[] = [
  {
    id: 'build-1',
    title: 'TODO: Current project',
    status: 'In progress',
    description: 'Add a short, factual note about what you are building now (scope + stack). No placeholder shipped as a claim.',
  },
];

export const contactLinks = [
  { label: 'Email', value: 'arktandoncs@gmail.com', href: 'mailto:arktandoncs@gmail.com' },
  { label: 'GitHub', value: 'github.com/csxark', href: 'https://github.com/csxark' },
  { label: 'LinkedIn', value: 'linkedin.com/in/csxark', href: 'https://www.linkedin.com/in/csxark/' },
  { label: 'Resume', value: 'TODO: Add resume PDF link', href: 'TODO' },
];
