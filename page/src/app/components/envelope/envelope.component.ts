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
    
    // Dejamos que la animación corra con la pantalla bloqueada...

    setTimeout(() => {
      this.opened.emit(); // Cambiamos a la vista de los detalles
      
      // AHORA SÍ quitamos el candado, justo cuando la invitación ya existe en pantalla
      document.body.classList.remove('lock-scroll');
      document.documentElement.classList.remove('lock-scroll');
      
      // Este pequeño truco fuerza al celular a recalcular la altura de la página de inmediato
      window.scrollTo(0, 0); 
    }, 4200);
}
}