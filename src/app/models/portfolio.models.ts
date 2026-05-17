export interface CodeToken {
  t: string;
  c: string;
}

export interface TimelineItem {
  y: string;
  co: string;
  role: string;
  loc: string;
  d: string;
  logo: string;
  logoAlt: string;
}

export interface Skill {
  name: string;
  level: number;
  years: number;
  cat: string;
  code: string;
}

export type ProjectKind = 'professional' | 'personal';
export type ProjectStatus = 'live' | 'in-progress';

export interface Project {
  n: string;
  name: string;
  client: string;
  role: string;
  year: string;
  blurb: string;
  tags: string[];
  hue: number;
  sketch: 'dash' | 'flow' | 'comp' | 'grid';
  kind: ProjectKind;
  status?: ProjectStatus;
  /** Set when deployed — e.g. https://weatherly.example.com */
  liveUrl?: string;
  /** Set when public — e.g. https://github.com/you/weatherly */
  githubUrl?: string;
}

export interface Degree {
  deg: string;
  field: string;
  school: string;
  loc: string;
  period: string;
  note: string;
  badge: string;
}

export interface TweakState {
  accent: string;
  fontFamily: string;
  motion: 'minimal' | 'smooth';
  grid: boolean;
}
