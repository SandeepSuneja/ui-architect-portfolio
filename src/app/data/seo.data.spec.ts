import { describe, expect, it } from 'vitest';
import {
  SEO_DESCRIPTION,
  SEO_JSON_LD,
  SEO_KEYWORDS,
  SEO_SAME_AS,
  SEO_TITLE,
  SITE_URL,
} from './seo.data';

describe('seo.data', () => {
  it('uses the production site URL', () => {
    expect(SITE_URL).toBe('https://sandytech.dev');
  });

  it('provides non-empty SEO copy', () => {
    expect(SEO_TITLE.length).toBeGreaterThan(20);
    expect(SEO_DESCRIPTION.length).toBeGreaterThan(80);
    expect(SEO_KEYWORDS).toContain('Angular');
  });

  it('defines structured data graph', () => {
    const graph = SEO_JSON_LD['@graph'] as { '@type': string }[];
    expect(graph.some((n) => n['@type'] === 'Person')).toBe(true);
    expect(graph.some((n) => n['@type'] === 'WebSite')).toBe(true);
    expect(SEO_SAME_AS.length).toBeGreaterThanOrEqual(2);
  });
});
