import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss',
})
export class MarqueeComponent {
  @Input({ required: true }) items: string[] = [];
  @Input() direction: 'left' | 'right' = 'left';
  @Input() speed = 60;

  get trackItems(): string[] {
    return [...this.items, ...this.items];
  }
}
