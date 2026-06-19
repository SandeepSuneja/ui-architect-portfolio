import { Component, HostListener, inject } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EducationComponent } from './components/education/education.component';
import { FaqComponent } from './components/faq/faq.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavComponent } from './components/nav/nav.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TweaksPanelComponent } from './components/tweaks-panel/tweaks-panel.component';
import { TweakService } from './services/tweak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    EducationComponent,
    // FaqComponent,
    ContactComponent,
    TweaksPanelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly tweaks = inject(TweakService);

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 't' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.tweaks.panelOpen.update((open) => !open);
    }
  }

  openTweaks(): void {
    this.tweaks.panelOpen.set(true);
  }
}
