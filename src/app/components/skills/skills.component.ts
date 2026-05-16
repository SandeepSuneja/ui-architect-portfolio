import { Component, signal } from '@angular/core';
import { MARQUEE_ITEMS, SKILLS } from '../../data/portfolio.data';
import { InViewDirective } from '../../directives/in-view.directive';
import { MarqueeComponent } from './marquee/marquee.component';
import { SkillCardComponent } from './skill-card/skill-card.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [InViewDirective, SkillCardComponent, MarqueeComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly skills = SKILLS;
  readonly marqueeItems = MARQUEE_ITEMS;
  readonly inView = signal(false);

  onInView(inView: boolean): void {
    if (inView) this.inView.set(true);
  }
}
