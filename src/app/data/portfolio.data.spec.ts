import { describe, expect, it } from 'vitest';
import {
  ACCENTS,
  ANGULAR_CODE,
  DEGREES,
  FONTS,
  MARQUEE_ITEMS,
  PERSONAL_PROJECTS,
  PROFESSIONAL_PROJECTS,
  PROJECTS,
  SKILLS,
  TIMELINE,
  TWEAK_DEFAULTS,
} from './portfolio.data';

describe('portfolio.data', () => {
  it('exports tweak defaults', () => {
    expect(TWEAK_DEFAULTS.accent).toBe('#5cf2c2');
    expect(TWEAK_DEFAULTS.grid).toBe(true);
  });

  it('maps accent and font palettes', () => {
    expect(ACCENTS['#5cf2c2'].primary).toBe('#5cf2c2');
    expect(FONTS['Space Grotesk']).toContain('Space Grotesk');
  });

  it('provides angular code tokens', () => {
    expect(ANGULAR_CODE.length).toBeGreaterThan(0);
    expect(ANGULAR_CODE.some((t) => t.c === 'kw')).toBe(true);
  });

  it('provides timeline, skills, and marquee content', () => {
    expect(TIMELINE.length).toBe(4);
    expect(SKILLS.length).toBeGreaterThan(5);
    expect(MARQUEE_ITEMS).toContain('Angular');
  });

  it('splits projects by kind', () => {
    expect(PROJECTS.length).toBe(
      PROFESSIONAL_PROJECTS.length + PERSONAL_PROJECTS.length,
    );
    expect(PROFESSIONAL_PROJECTS.every((p) => p.kind === 'professional')).toBe(
      true,
    );
    expect(PERSONAL_PROJECTS.every((p) => p.kind === 'personal')).toBe(true);
  });

  it('provides degree records', () => {
    expect(DEGREES.length).toBe(3);
    expect(DEGREES[0].badge).toBe('MSc');
  });
});
