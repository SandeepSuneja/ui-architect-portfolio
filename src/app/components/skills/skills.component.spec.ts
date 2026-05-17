import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let fixture: ComponentFixture<SkillsComponent>;
  let component: SkillsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders skill cards and marquee', () => {
    expect(component.skills.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelectorAll('app-skill-card').length).toBe(
      component.skills.length,
    );
    expect(fixture.nativeElement.querySelector('app-marquee')).toBeTruthy();
  });

  it('marks in view when intersecting', () => {
    component.onInView(true);
    expect(component.inView()).toBe(true);
    component.onInView(false);
    expect(component.inView()).toBe(true);
  });
});
