import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-sketch',
  standalone: true,
  templateUrl: './project-sketch.component.html',
})
export class ProjectSketchComponent {
  @Input({ required: true }) kind!: 'dash' | 'flow' | 'comp' | 'grid';
  @Input({ required: true }) hue!: number;

  get color(): string {
    return `hsl(${this.hue} 70% 65%)`;
  }

  get color2(): string {
    return `hsl(${this.hue} 70% 50%)`;
  }

  get gradientId(): string {
    return `g-${this.hue}`;
  }

  get markerId(): string {
    return `a-${this.hue}`;
  }

  readonly gridCells = Array.from({ length: 24 }, (_, i) => i);
  readonly compCells = Array.from({ length: 8 }, (_, i) => i);
  readonly flowCols = [0, 1, 2];
  readonly dashPoints = [
    { x: 60, y: 90 },
    { x: 150, y: 60 },
    { x: 250, y: 40 },
  ];

  compX(i: number): number {
    return 20 + (i % 4) * 75;
  }

  compY(i: number): number {
    return 20 + Math.floor(i / 4) * 75;
  }

  gridX(i: number): number {
    return 15 + (i % 6) * 50;
  }

  gridY(i: number): number {
    return 15 + Math.floor(i / 6) * 40;
  }
}
