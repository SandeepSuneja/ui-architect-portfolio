import { Component, signal } from '@angular/core';
import { TIMELINE } from '../../data/portfolio.data';
import { InViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly timeline = TIMELINE;
  readonly visible = signal(false);

  onInView(inView: boolean): void {
    if (inView) this.visible.set(true);
  }
}
