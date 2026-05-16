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
}

export interface Skill {
  name: string;
  level: number;
  years: number;
  cat: string;
  code: string;
}

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
