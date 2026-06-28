export interface SocialLink {
  platform: 'github' | 'linkedin' | 'x' | 'email';
  url: string;
}

export interface ProfileMetadata {
  name: string;
  handle: string;
  email: string;
  tagline: string;
  bio: string;
  socials: SocialLink[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'ai-data' | 'languages-tools';
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  websiteUrl: string;
  githubUrl: string;
  techStack: string[];
}

export interface NavItem {
  id: string;
  label: string;
  number: string;
}
