import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TweakService } from '../../services/tweak.service';
import { TweaksPanelComponent } from './tweaks-panel.component';

describe('TweaksPanelComponent', () => {
  let fixture: ComponentFixture<TweaksPanelComponent>;
  let component: TweaksPanelComponent;
  let tweaks: TweakService;

  beforeEach(async () => {
    vi.stubGlobal('parent', { postMessage: vi.fn() });
    await TestBed.configureTestingModule({
      imports: [TweaksPanelComponent],
    }).compileComponents();

    tweaks = TestBed.inject(TweakService);
    tweaks.panelOpen.set(true);
    fixture = TestBed.createComponent(TweaksPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders when panel is open', () => {
    expect(fixture.nativeElement.querySelector('.twk-panel')).toBeTruthy();
  });

  it('updates tweak state from controls', () => {
    component.setAccent('#ff79c6');
    component.setFont('Inter');
    component.setMotion('minimal');
    component.setGrid(false);

    expect(tweaks.state().accent).toBe('#ff79c6');
    expect(tweaks.state().fontFamily).toBe('Inter');
    expect(tweaks.state().motion).toBe('minimal');
    expect(tweaks.state().grid).toBe(false);
  });

  it('dismisses the panel', () => {
    component.dismiss();
    expect(tweaks.panelOpen()).toBe(false);
  });
});
