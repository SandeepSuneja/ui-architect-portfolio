import { DecimalPipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  signal,
} from '@angular/core';
import { Skill } from '../../../models/portfolio.models';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
})
export class SkillCardComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) skill!: Skill;
  @Input() index = 0;
  @Input() inView = false;

  readonly value = signal(0);
  readonly circumference = 2 * Math.PI * 30;

  private raf = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inView']?.currentValue === true) {
      this.animate();
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }

  dash(): number {
    return (this.value() / 100) * this.circumference;
  }

  private animate(): void {
    const dur = 1400;
    const delay = 80 * this.index;
    let start = 0;

    const tick = (ts: number) => {
      if (!start) start = ts + delay;
      const e = Math.max(0, ts - start);
      const t = Math.min(1, e / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      this.value.set(this.skill.level * eased);
      if (t < 1) this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
}
