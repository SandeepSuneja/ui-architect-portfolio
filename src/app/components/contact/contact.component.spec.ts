import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
  });

  it('renders contact channels and footer', () => {
    expect(fixture.nativeElement.querySelector('.ct-card')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('.ct-ch').length).toBeGreaterThan(
      0,
    );
    expect(fixture.nativeElement.querySelector('.ct-foot')).toBeTruthy();
  });
});
