import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { MockIntersectionObserver } from '../../test-setup';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';

@Component({
  standalone: true,
  imports: [RevealOnScrollDirective],
  template: `<section appRevealOnScroll>Content</section>`,
})
class HostComponent {}

describe('RevealOnScrollDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let observer: MockIntersectionObserver;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    observer = MockIntersectionObserver.instances[0];
    el = fixture.nativeElement.querySelector('section');
  });

  it('adds reveal class on init', () => {
    expect(el.classList.contains('reveal')).toBe(true);
  });

  it('adds in class when intersecting', () => {
    observer.trigger(el, true);
    expect(el.classList.contains('in')).toBe(true);
    expect(observer.unobserve).toHaveBeenCalled();
  });

  it('ignores non-intersecting entries in a mixed batch', () => {
    const other = document.createElement('motion');
    observer['callback'](
      [
        { isIntersecting: false, target: other } as IntersectionObserverEntry,
        { isIntersecting: true, target: el } as IntersectionObserverEntry,
      ],
      observer,
    );
    expect(el.classList.contains('in')).toBe(true);
    expect(other.classList.contains('in')).toBe(false);
  });

  it('disconnects on destroy', () => {
    fixture.destroy();
    expect(observer.disconnect).toHaveBeenCalled();
  });
});
