import { Injectable, signal } from '@angular/core';
import { ACCENTS, FONTS, TWEAK_DEFAULTS } from '../data/portfolio.data';
import { TweakState } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class TweakService {
  readonly state = signal<TweakState>({ ...TWEAK_DEFAULTS });
  readonly panelOpen = signal(false);

  constructor() {
    this.applyToDocument(this.state());
    window.addEventListener('message', (e) => {
      const type = e?.data?.type;
      if (type === '__activate_edit_mode') this.panelOpen.set(true);
      else if (type === '__deactivate_edit_mode') this.panelOpen.set(false);
    });
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }

  set<K extends keyof TweakState>(key: K, value: TweakState[K]): void {
    this.state.update((prev) => {
      const next = { ...prev, [key]: value };
      this.applyToDocument(next);
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
      return next;
    });
  }

  dismissPanel(): void {
    this.panelOpen.set(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  }

  private applyToDocument(t: TweakState): void {
    const root = document.documentElement;
    const accent = ACCENTS[t.accent] ?? ACCENTS['#5cf2c2'];
    root.style.setProperty('--accent', accent.primary);
    root.style.setProperty('--accent-2', accent.secondary);
    root.style.setProperty('--font-display', FONTS[t.fontFamily] ?? FONTS['Space Grotesk']);
    root.style.setProperty('--grid', t.grid ? 'rgba(120,150,180,.08)' : 'transparent');
    document.body.style.transition = t.motion === 'minimal' ? 'none' : '';
  }
}
