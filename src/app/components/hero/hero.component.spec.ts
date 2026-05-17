import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('renders hero content and code block', () => {
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      'Sandeep',
    );
    expect(fixture.nativeElement.querySelector('app-code-block')).toBeTruthy();
  });
});
