import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders FAQ items', () => {
    expect(component.faqs.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelectorAll('.faq-item').length).toBe(
      component.faqs.length,
    );
  });

  it('marks visible when in view', () => {
    component.onInView(true);
    expect(component.visible()).toBe(true);
    component.onInView(false);
    expect(component.visible()).toBe(true);
  });
});
