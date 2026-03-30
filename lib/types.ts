// Core types for portfolio
export interface PortfolioContent {
  personalInfo: {
    name: string;
    role: string;
    email: string;
    gender: 'male' | 'female';
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    available: boolean;
  };
  tagline: string;
  bio: string;
  philosophy: string[];
  stats: any[];
  skills: any[];
  projects: any[];
  experience: any[];
}
