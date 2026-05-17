import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { afterEach, beforeAll, beforeEach, vi } from 'vitest';

beforeAll(() => {
  getTestBed().initTestEnvironment(
    BrowserTestingModule,
    platformBrowserTesting(),
  );
});

afterEach(() => {
  getTestBed().resetTestingModule();
});

export class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];

  static readonly instances: MockIntersectionObserver[] = [];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  trigger(target: Element, isIntersecting = true): void {
    this.callback(
      [{ isIntersecting, target } as IntersectionObserverEntry],
      this,
    );
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

beforeEach(() => {
  MockIntersectionObserver.instances.length = 0;
});
