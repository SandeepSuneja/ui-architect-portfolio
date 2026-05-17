import { Component } from '@angular/core';
import { PERSONAL_PROJECTS, PROFESSIONAL_PROJECTS } from '../../data/portfolio.data';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly professionalProjects = PROFESSIONAL_PROJECTS;
  readonly personalProjects = PERSONAL_PROJECTS;
}
