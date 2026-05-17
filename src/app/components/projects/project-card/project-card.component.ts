import { Component, Input, signal } from '@angular/core';
import { Project } from '../../../models/portfolio.models';
import { ProjectSketchComponent } from '../project-sketch/project-sketch.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [ProjectSketchComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  readonly tilt = signal({ x: 0, y: 0 });

  badgeLabel(): string {
    if (this.project.kind === 'personal') {
      return this.project.status === 'in-progress' ? 'In progress' : 'Deployed';
    }
    return this.project.client;
  }

  hasLinks(): boolean {
    return !!(this.project.liveUrl || this.project.githubUrl);
  }

  onMove(event: MouseEvent, el: HTMLElement): void {
    const r = el.getBoundingClientRect();
    const cx = (event.clientX - r.left) / r.width - 0.5;
    const cy = (event.clientY - r.top) / r.height - 0.5;
    this.tilt.set({ x: cx * 6, y: -cy * 6 });
  }

  onLeave(): void {
    this.tilt.set({ x: 0, y: 0 });
  }
}
