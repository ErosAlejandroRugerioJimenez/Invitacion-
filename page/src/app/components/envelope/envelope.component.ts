import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.scss'
})
export class EnvelopeComponent {

  @Output() opened = new EventEmitter<void>();

  isOpen = false;

openEnvelope(): void {
  this.isOpen = true;

  setTimeout(() => {
    this.opened.emit();

    // Espera un frame para que Angular termine de renderizar la invitación
    requestAnimationFrame(() => {
      document.body.classList.remove('lock-scroll');
      document.documentElement.classList.remove('lock-scroll');

      window.scrollTo(0, 0);
    });

  }, 4200);
}
}