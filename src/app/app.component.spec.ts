import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppComponent } from './app.component';
import { TweakService } from './services/tweak.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let tweaks: TweakService;

  beforeEach(async () => {
    vi.stubGlobal('parent', { postMessage: vi.fn() });
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    tweaks = TestBed.inject(TweakService);
    fixture.detectChanges();
  });

  it('creates and renders main sections', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-nav')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-hero')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-faq')).toBeTruthy();
  });

  it('opens tweaks panel from fab handler', () => {
    component.openTweaks();
    expect(tweaks.panelOpen()).toBe(true);
  });

  it('toggles tweaks panel with ctrl+t', () => {
    tweaks.panelOpen.set(false);
    component.onKeydown(
      new KeyboardEvent('keydown', { key: 't', ctrlKey: true }),
    );
    expect(tweaks.panelOpen()).toBe(true);

    component.onKeydown(
      new KeyboardEvent('keydown', { key: 't', metaKey: true }),
    );
    expect(tweaks.panelOpen()).toBe(false);
  });

  it('ignores unrelated key combinations', () => {
    tweaks.panelOpen.set(false);
    component.onKeydown(new KeyboardEvent('keydown', { key: 't' }));
    expect(tweaks.panelOpen()).toBe(false);
  });
});
