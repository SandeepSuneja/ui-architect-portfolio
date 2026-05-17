import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders degree cards', () => {
    expect(component.degrees.length).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('.ed-card').length).toBe(3);
  });

  it('marks visible when in view', () => {
    component.onInView(true);
    expect(component.visible()).toBe(true);
    component.onInView(false);
    expect(component.visible()).toBe(true);
  });
});
