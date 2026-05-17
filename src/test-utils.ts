import { Project, Skill } from './app/models/portfolio.models';

export function mockSkill(overrides: Partial<Skill> = {}): Skill {
  return {
    name: 'Angular',
    level: 80,
    years: 5,
    cat: 'Framework',
    code: '@Component',
    ...overrides,
  };
}

export function mockProfessionalProject(): Project {
  return {
    n: '01',
    kind: 'professional',
    name: 'Test Project',
    client: 'Acme Corp',
    role: 'Lead',
    year: '2024',
    blurb: 'A test project.',
    tags: ['Angular'],
    hue: 180,
    sketch: 'dash',
  };
}

export function mockPersonalProject(
  status: 'live' | 'in-progress' = 'live',
  links: { liveUrl?: string; githubUrl?: string } = {},
): Project {
  return {
    n: 'P1',
    kind: 'personal',
    name: 'Side Project',
    client: 'Personal',
    role: 'Creator',
    year: '2025',
    blurb: 'Personal build.',
    tags: ['Angular'],
    hue: 200,
    sketch: 'flow',
    status,
    ...links,
  };
}

export function flushRaf(frames = 200, stepMs = 50, startMs = 0): void {
  let time = startMs;
  for (let i = 0; i < frames; i++) {
    time += stepMs;
    const cb = (globalThis as { __lastRaf?: FrameRequestCallback }).__lastRaf;
    if (cb) {
      cb(time);
    }
  }
}

export function stubRaf(): void {
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    (globalThis as { __lastRaf?: FrameRequestCallback }).__lastRaf = cb;
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
}
