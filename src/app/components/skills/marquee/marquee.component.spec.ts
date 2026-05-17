import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { MarqueeComponent } from './marquee.component';

describe('MarqueeComponent', () => {
  let component: MarqueeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueeComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MarqueeComponent);
    component = fixture.componentInstance;
    component.items = ['Angular', 'RxJS'];
    component.direction = 'right';
    component.speed = 40;
    fixture.detectChanges();
  });

  it('duplicates items for seamless scrolling', () => {
    expect(component.trackItems).toEqual(['Angular', 'RxJS', 'Angular', 'RxJS']);
  });
});
