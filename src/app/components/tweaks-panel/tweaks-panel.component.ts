import { Component, inject } from '@angular/core';
import { TweakService } from '../../services/tweak.service';

@Component({
  selector: 'app-tweaks-panel',
  standalone: true,
  templateUrl: './tweaks-panel.component.html',
  styleUrl: './tweaks-panel.component.scss',
})
export class TweaksPanelComponent {
  readonly tweaks = inject(TweakService);

  readonly accentOptions = ['#5cf2c2', '#7cb6ff', '#ff79c6', '#ffcb6b', '#dd0031'];
  readonly fontOptions = ['Space Grotesk', 'Inter', 'Geist', 'Serif'];
  readonly motionOptions: Array<'minimal' | 'smooth'> = ['minimal', 'smooth'];

  dismiss(): void {
    this.tweaks.dismissPanel();
  }

  setAccent(value: string): void {
    this.tweaks.set('accent', value);
  }

  setFont(value: string): void {
    this.tweaks.set('fontFamily', value);
  }

  setMotion(value: 'minimal' | 'smooth'): void {
    this.tweaks.set('motion', value);
  }

  setGrid(value: boolean): void {
    this.tweaks.set('grid', value);
  }
}
