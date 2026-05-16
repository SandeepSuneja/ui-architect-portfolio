import { Component, signal } from '@angular/core';
import { DEGREES } from '../../data/portfolio.data';
import { InViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  readonly degrees = DEGREES;
  readonly visible = signal(false);

  onInView(inView: boolean): void {
    if (inView) this.visible.set(true);
  }
}
