import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { flushRaf, mockSkill, stubRaf } from '../../../../test-utils';
import { SkillCardComponent } from './skill-card.component';

describe('SkillCardComponent', () => {
  let fixture: ComponentFixture<SkillCardComponent>;
  let component: SkillCardComponent;

  beforeEach(async () => {
    stubRaf();
    await TestBed.configureTestingModule({
      imports: [SkillCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCardComponent);
    component = fixture.componentInstance;
    component.skill = mockSkill({ level: 50 });
    component.index = 2;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('computes dash offset from animated value', () => {
    component.value.set(50);
    expect(component.dash()).toBeCloseTo(component.circumference / 2);
  });

  it('animates when inView becomes true', () => {
    component.inView = true;
    component.ngOnChanges({
      inView: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    flushRaf(80, 30, 0);
    fixture.detectChanges();
    expect(component.value()).toBeCloseTo(50, 0);
  });

  it('does not animate before in view', () => {
    component.ngOnChanges({
      inView: {
        currentValue: false,
        previousValue: false,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.value()).toBe(0);
  });

  it('cancels animation on destroy', () => {
    component.inView = true;
    component.ngOnChanges({
      inView: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    fixture.destroy();
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });
});
