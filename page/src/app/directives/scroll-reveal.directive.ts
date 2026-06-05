import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined;

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // 1. Estado inicial: Oculto y un poco hacia abajo
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.6s ease-out, transform 0.6s ease-out');
    // Aseguramos que la transición no se aplique a otras propiedades que puedan causar bugs
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'opacity, transform');

    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // ESTÁ EN PANTALLA: Mostrar
              this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
              this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
            } else {
              // SALIÓ DE PANTALLA: Ocultar (para que vuelva a animarse la próxima vez)
              this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
              this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
            }
          });
        },
        { 
          // threshold 0.1 significa que se activa cuando el 10% del elemento es visible.
          // rootMargin amplía ligeramente el área de detección para evitar el parpadeo en los bordes.
          threshold: 0.1,
          rootMargin: '20px 0px 20px 0px' 
        }
      );

      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}