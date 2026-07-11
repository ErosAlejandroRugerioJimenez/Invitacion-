import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EnvelopeComponent } from './components/envelope/envelope.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EnvelopeComponent, EventDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isOpen = false;
  isMuted = true;

  private platformId = inject(PLATFORM_ID);
  private audio?: HTMLAudioElement;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      
     // document.body.classList.add('lock-scroll');
     // document.documentElement.classList.add('lock-scroll');

      this.audio = new Audio('/audio/cancion.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.4;
    }
  }

  onEnvelopeOpened() {
    this.isOpen = true;

    if (isPlatformBrowser(this.platformId)) {
     // document.body.classList.remove('lock-scroll');
      //document.documentElement.classList.remove('lock-scroll');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      this.audio?.play();
      this.isMuted = false;
    }
  }

  toggleMusic() {
    if (!this.audio) return;

    if (this.audio.paused) {
      this.audio.play();
      this.isMuted = false;
    } else {
      this.audio.pause();
      this.isMuted = true;
    }
  }
}