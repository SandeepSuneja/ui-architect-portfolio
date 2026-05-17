import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let component: ProjectsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders professional and personal project sections', () => {
    expect(component.professionalProjects.length).toBeGreaterThan(0);
    expect(component.personalProjects.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelectorAll('app-project-card').length).toBe(
      component.professionalProjects.length + component.personalProjects.length,
    );
  });
});
