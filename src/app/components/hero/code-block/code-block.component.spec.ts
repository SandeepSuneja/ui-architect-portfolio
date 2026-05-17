import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { flushRaf, stubRaf } from '../../../../test-utils';
import { CodeBlockComponent } from './code-block.component';

describe('CodeBlockComponent', () => {
  let fixture: ComponentFixture<CodeBlockComponent>;
  let component: CodeBlockComponent;

  beforeEach(async () => {
    stubRaf();
    await TestBed.configureTestingModule({
      imports: [CodeBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('types code over animation frames', () => {
    flushRaf(500, 30, 0);
    fixture.detectChanges();
    expect(component.done()).toBe(true);
    expect(component.visibleTokens().length).toBeGreaterThan(0);
    expect(component.lineNumbers().length).toBeGreaterThanOrEqual(15);
  });

  it('exposes partial tokens while typing', () => {
    component['updateVisible'](5);
    expect(component.charCount()).toBe(5);
    expect(component.done()).toBe(false);
    expect(component.visibleTokens()[0].text.length).toBeLessThanOrEqual(5);
  });

  it('cancels animation on destroy', () => {
    const cancel = vi.mocked(cancelAnimationFrame);
    fixture.destroy();
    expect(cancel).toHaveBeenCalled();
  });
});
