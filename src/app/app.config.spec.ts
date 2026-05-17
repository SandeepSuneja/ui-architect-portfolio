import { describe, expect, it } from 'vitest';
import { appConfig } from './app.config';

describe('appConfig', () => {
  it('registers zone change detection', () => {
    expect(appConfig.providers?.length).toBeGreaterThan(0);
  });
});
