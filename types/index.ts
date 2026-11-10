export interface SocialLink {
  platform: 'github' | 'linkedin' | 'x' | 'email';
  label: string;
  url: string;
}

export interface ProfileMetadata {
  name: string;
  role: string;
  location: string;
  email: string;
  availability: string;
  tagline: string;
  bio: string;
  focus: string[];
  socials: SocialLink[];
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  category: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface ToolkitCategory {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  type: 'experience' | 'education' | 'achievement';
  logo?: string;
}

export interface OpenSourceItem {
  id: string;
  title: string;
  period: string;
  description: string;
  url?: string;
  type: 'contribution' | 'project-admin' | 'award';
}

export interface BuildingItem {
  id: string;
  title: string;
  status: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}


export interface WhyWorkItem {
  id: string;
  statement: string;
  detail?: string;
}
