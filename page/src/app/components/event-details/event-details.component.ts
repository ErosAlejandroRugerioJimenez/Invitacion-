import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  private timer: any;
  private weddingDate = new Date('2026-08-01T15:30:00');

  days = '000';
  hours = '00';
  minutes = '00';
  seconds = '00';

  ibanCopied = false;
  albumCopied = false;

  activeStep = 0;
  timelineProgress = 0;

  // Variables para el slider de Nuestra Historia
  currentSlide = 0;
  slideTimer: any;

  storyImages = [
    '/tduno.webp',
    '/tddos.jpeg',
    '/tdtres.jpeg'
  ];

  itinerary = [
    { time: '14:30 P.M.', title: 'Recepción', icon: '/icon/recepcion.png' },
    { time: '15:00 P.M.', title: 'Ceremonia', icon: '/icon/iglesia.png' },
    { time: '18:00 P.M.', title: 'Brindis', icon: '/icon/copa.png' },
    { time: '19:00 P.M.', title: 'Fiesta', icon: '/icon/musica.png' }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCountdown();

      this.timer = setInterval(() => {
        this.updateCountdown();
        this.cdr.detectChanges();
      }, 1000);

      setTimeout(() => {
        this.initTimelineObserver();
      }, 500);

      this.startSlider();
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.slideTimer) {
      clearInterval(this.slideTimer);
    }
  }

  copyIban(): void {
    navigator.clipboard.writeText('0123 4567 8901 2345');
    this.ibanCopied = true;

    setTimeout(() => {
      this.ibanCopied = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  copyAlbumCode(): void {
    navigator.clipboard.writeText('BODA-O&D');
    this.albumCopied = true;

    setTimeout(() => {
      this.albumCopied = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  startSlider(): void {
    this.slideTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.storyImages.length;
      this.cdr.detectChanges();
    }, 3000);
  }

  setSlide(index: number): void {
    this.currentSlide = index;

    if (this.slideTimer) {
      clearInterval(this.slideTimer);
    }

    this.startSlider();
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const target = this.weddingDate.getTime();
    const diff = target - now;

    if (diff <= 0) {
      this.days = '000';
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';

      if (this.timer) {
        clearInterval(this.timer);
      }

      return;
    }

    this.days = String(Math.floor(diff / 86400000)).padStart(3, '0');
    this.hours = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    this.minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    this.seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }

  private initTimelineObserver(): void {
    const steps = document.querySelectorAll('.timeline-step');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(steps).indexOf(entry.target);
          this.activeStep = index;
          this.timelineProgress = ((index + 1) / steps.length) * 100;
          this.cdr.detectChanges();
        }
      });
    }, { threshold: 0.55 });

    steps.forEach(step => observer.observe(step));
  }
}