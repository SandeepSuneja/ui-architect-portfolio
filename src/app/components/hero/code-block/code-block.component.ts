import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ANGULAR_CODE } from '../../../data/portfolio.data';
import { CodeToken } from '../../../models/portfolio.models';

@Component({
  selector: 'app-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent implements OnInit, OnDestroy {
  readonly tokens = ANGULAR_CODE;
  readonly charCount = signal(0);
  readonly lineNumbers = signal<number[]>([]);
  readonly visibleTokens = signal<{ token: CodeToken; text: string }[]>([]);
  readonly done = signal(false);

  private raf = 0;
  private readonly total = ANGULAR_CODE.reduce((s, t) => s + t.t.length, 0);

  ngOnInit(): void {
    let start = 0;
    const speed = 14;
    const startDelay = 800;

    const tick = (ts: number) => {
      if (!start) start = ts + startDelay;
      const elapsed = Math.max(0, ts - start);
      const target = Math.min(this.total, Math.floor(elapsed / speed));
      this.updateVisible(target);
      if (target < this.total) {
        this.raf = requestAnimationFrame(tick);
      }
    };
    this.raf = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }

  private updateVisible(n: number): void {
    this.charCount.set(n);
    this.done.set(n >= this.total);

    let remaining = n;
    const out: { token: CodeToken; text: string }[] = [];
    for (const token of this.tokens) {
      if (remaining <= 0) break;
      const slice = token.t.slice(0, remaining);
      out.push({ token, text: slice });
      remaining -= token.t.length;
    }
    this.visibleTokens.set(out);

    const text = this.tokens.map((t) => t.t).join('');
    const visible = text.slice(0, n);
    const lineCount = Math.max(15, visible.split('\n').length);
    this.lineNumbers.set(Array.from({ length: lineCount }, (_, i) => i + 1));
  }
}
