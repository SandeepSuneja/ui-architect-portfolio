import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
  });

  it('renders brand and section links', () => {
    const links = fixture.nativeElement.querySelectorAll('nav a');
    expect(links.length).toBeGreaterThan(1);
    expect(fixture.nativeElement.textContent).toContain('sandeep');
  });
});
