import { Component } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
