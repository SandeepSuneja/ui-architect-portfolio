import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TweakService } from './tweak.service';

describe('TweakService', () => {
  let service: TweakService;
  let postMessage: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    postMessage = vi.fn();
    vi.stubGlobal('parent', { postMessage });
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweakService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    vi.unstubAllGlobals();
  });

  it('applies defaults to the document on init', () => {
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe(
      '#7cb6ff',
    );
    expect(postMessage).toHaveBeenCalledWith(
      { type: '__edit_mode_available' },
      '*',
    );
  });

  it('updates state and document when set is called', () => {
    service.set('accent', '#7cb6ff');
    expect(service.state().accent).toBe('#7cb6ff');
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe(
      '#7cb6ff',
    );
    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: '__edit_mode_set_keys' }),
      '*',
    );
  });

  it('falls back to default accent for unknown values', () => {
    service.state.set({
      accent: '#unknown',
      fontFamily: 'Unknown Font',
      motion: 'smooth',
      grid: true,
    });
    service.set('grid', false);
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe(
      '#7cb6ff',
    );
    expect(document.documentElement.style.getPropertyValue('--font-display')).toBe(
      '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
    );
  });

  it('disables body transition when motion is minimal', () => {
    service.set('motion', 'minimal');
    expect(document.body.style.transition).toBe('none');
    service.set('motion', 'smooth');
    expect(document.body.style.transition).toBe('');
  });

  it('toggles grid backdrop visibility', () => {
    service.set('grid', false);
    expect(document.documentElement.style.getPropertyValue('--grid')).toBe(
      'transparent',
    );
  });

  it('dismisses the panel and notifies parent', () => {
    service.panelOpen.set(true);
    service.dismissPanel();
    expect(service.panelOpen()).toBe(false);
    expect(postMessage).toHaveBeenCalledWith(
      { type: '__edit_mode_dismissed' },
      '*',
    );
  });

  it('reacts to parent edit-mode messages', () => {
    window.dispatchEvent(
      new MessageEvent('message', { data: { type: '__activate_edit_mode' } }),
    );
    expect(service.panelOpen()).toBe(true);

    window.dispatchEvent(
      new MessageEvent('message', { data: { type: '__deactivate_edit_mode' } }),
    );
    expect(service.panelOpen()).toBe(false);
  });

  it('ignores unrelated post messages', () => {
    service.panelOpen.set(false);
    window.dispatchEvent(
      new MessageEvent('message', { data: { type: 'other' } }),
    );
    expect(service.panelOpen()).toBe(false);
  });
});
