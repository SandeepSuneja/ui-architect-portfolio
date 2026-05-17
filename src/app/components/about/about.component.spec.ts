import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders timeline entries', () => {
    expect(component.timeline.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelectorAll('.tl-item').length).toBe(
      component.timeline.length,
    );
  });

  it('marks visible when in view', () => {
    component.onInView(true);
    expect(component.visible()).toBe(true);
  });

  it('does not reset visible when out of view', () => {
    component.onInView(true);
    component.onInView(false);
    expect(component.visible()).toBe(true);
  });
});
