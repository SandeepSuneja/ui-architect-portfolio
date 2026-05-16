import { Component } from '@angular/core';
import { CodeBlockComponent } from './code-block/code-block.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CodeBlockComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
