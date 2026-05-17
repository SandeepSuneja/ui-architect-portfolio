import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProjectSketchComponent } from './project-sketch.component';

describe('ProjectSketchComponent', () => {
  let component: ProjectSketchComponent;
  let fixture: ComponentFixture<ProjectSketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSketchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSketchComponent);
    component = fixture.componentInstance;
    component.hue = 200;
    fixture.detectChanges();
  });

  it('derives sketch colors from hue', () => {
    expect(component.color).toBe('hsl(200 70% 65%)');
    expect(component.color2).toBe('hsl(200 70% 50%)');
    expect(component.gradientId).toBe('g-200');
    expect(component.markerId).toBe('a-200');
  });

  it('positions grid and component cells', () => {
    expect(component.gridX(7)).toBe(15 + (7 % 6) * 50);
    expect(component.gridY(7)).toBe(15 + Math.floor(7 / 6) * 40);
    expect(component.compX(5)).toBe(20 + (5 % 4) * 75);
    expect(component.compY(5)).toBe(20 + Math.floor(5 / 4) * 75);
  });

  it('exposes static layout arrays', () => {
    expect(component.gridCells).toHaveLength(24);
    expect(component.compCells).toHaveLength(8);
    expect(component.flowCols).toEqual([0, 1, 2]);
    expect(component.dashPoints).toHaveLength(3);
  });

  it('renders dash sketch variant', () => {
    component.kind = 'dash';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('linearGradient')).toBeTruthy();
  });

  it('renders component sketch variant', () => {
    component.kind = 'comp';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('rect').length).toBeGreaterThan(0);
  });

  it('renders flow sketch variant', () => {
    component.kind = 'flow';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('marker')).toBeTruthy();
  });

  it('renders default grid sketch variant', () => {
    component.kind = 'grid';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('rect').length).toBe(24);
  });
});
