import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.scss'
})
export class EnvelopeComponent implements OnDestroy {

  @Output() opened = new EventEmitter<void>();

  isOpen = false;
  private openTimer?: ReturnType<typeof setTimeout>;

  openEnvelope(): void {
    if (this.isOpen) return;

    this.isOpen = true;
    this.openTimer = setTimeout(() => {
      this.opened.emit();
    }, 4200);
  }

  ngOnDestroy(): void {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
    }
  }
}
