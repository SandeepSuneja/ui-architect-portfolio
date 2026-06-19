import { Component, signal } from '@angular/core';
import { FAQS } from '../../data/portfolio.data';
import { InViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [InViewDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  readonly faqs = FAQS;
  readonly visible = signal(false);

  onInView(inView: boolean): void {
    if (inView) this.visible.set(true);
  }
}
