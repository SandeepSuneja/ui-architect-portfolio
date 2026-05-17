import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  mockPersonalProject,
  mockProfessionalProject,
} from '../../../../test-utils';
import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  let fixture: ComponentFixture<ProjectCardComponent>;
  let component: ProjectCardComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = mockProfessionalProject();
    host = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('shows client badge for professional projects', () => {
    component.project = mockProfessionalProject();
    fixture.detectChanges();
    expect(component.badgeLabel()).toBe('Acme Corp');
    expect(component.hasLinks()).toBe(false);
  });

  it('shows status badge for personal projects', () => {
    component.project = mockPersonalProject('in-progress');
    fixture.detectChanges();
    expect(component.badgeLabel()).toBe('In progress');
  });

  it('shows deployed label for live personal projects', () => {
    component.project = mockPersonalProject('live');
    expect(component.badgeLabel()).toBe('Deployed');
  });

  it('detects when links are present', () => {
    component.project = mockPersonalProject('live', {
      liveUrl: 'https://example.com',
    });
    expect(component.hasLinks()).toBe(true);
  });

  it('updates tilt on pointer move and resets on leave', () => {
    component.project = mockProfessionalProject();
    fixture.detectChanges();
    const article = host.querySelector('article') as HTMLElement;
    vi.spyOn(article, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
    } as DOMRect);

    component.onMove(
      { clientX: 150, clientY: 75 } as MouseEvent,
      article,
    );
    expect(component.tilt().x).toBeGreaterThan(0);

    component.onLeave();
    expect(component.tilt()).toEqual({ x: 0, y: 0 });
  });
});
