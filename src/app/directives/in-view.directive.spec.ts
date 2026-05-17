import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { MockIntersectionObserver } from '../../test-setup';
import { InViewDirective } from './in-view.directive';

@Component({
  standalone: true,
  imports: [InViewDirective],
  template: `<motion appInView (inViewChange)="visible.set($event)"></motion>`,
})
class HostComponent {
  readonly visible = signal(false);
}

describe('InViewDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let observer: MockIntersectionObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    observer = MockIntersectionObserver.instances[0];
  });

  it('emits when the element intersects and unobserves', () => {
    const el = fixture.nativeElement.querySelector('motion');
    observer.trigger(el, true);
    expect(fixture.componentInstance.visible()).toBe(true);
    expect(observer.unobserve).toHaveBeenCalled();
  });

  it('ignores non-intersecting entries', () => {
    const el = fixture.nativeElement.querySelector('motion');
    observer.trigger(el, false);
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('handles mixed intersection entries in one callback', () => {
    const el = fixture.nativeElement.querySelector('motion');
    const other = document.createElement('div');
    observer['callback'](
      [
        { isIntersecting: false, target: other } as IntersectionObserverEntry,
        { isIntersecting: true, target: el } as IntersectionObserverEntry,
      ],
      observer,
    );
    expect(fixture.componentInstance.visible()).toBe(true);
  });

  it('disconnects on destroy', () => {
    fixture.destroy();
    expect(observer.disconnect).toHaveBeenCalled();
  });
});
