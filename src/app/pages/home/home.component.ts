// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }


import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  NgZone,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private observers: IntersectionObserver[] = [];
  private timers: ReturnType<typeof setTimeout>[] = [];
  private unlistenFns: (() => void)[] = [];

  private readonly EXTRA_DELAY_MS: Record<string, number> = {
    '7d2myj': 200,
    'i7f3zr': 400,
    '198dkc3': 600,
    'prtpi1': 1200,
    'tangiq': 1400,
    '1994vxa': 1400,
    'cxut1g': 1600
  };

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initFadeInAnimations();
      this.initCardTilt();
      this.initTickers();
      // this.initNav();
      this.initTypingRoles();
    });
  }

  ngOnDestroy(): void {
    this.observers.forEach((obs) => obs.disconnect());
    this.observers = [];

    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers = [];

    this.unlistenFns.forEach((unlisten) => unlisten());
    this.unlistenFns = [];
  }


  // goToUser(id: number) {
  //   this.router.navigate(['/user', id]);
  // }

  /* ---------- 1. Fade / slide elements into view ---------- */

  private initFadeInAnimations(): void {
    const elements: HTMLElement[] = Array.from(
      this.el.nativeElement.querySelectorAll('.fade-el')
    );
    if (!elements.length) return;

    const watcherToElements = new Map<HTMLElement, HTMLElement[]>();

    elements.forEach((fadeEl) => {
      const watcher = this.findSizedAncestor(fadeEl);
      if (!watcherToElements.has(watcher)) {
        watcherToElements.set(watcher, []);
      }
      watcherToElements.get(watcher)!.push(fadeEl);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targets = watcherToElements.get(entry.target as HTMLElement) || [];
          targets.forEach((fadeEl) => {
            if (entry.isIntersecting) {
              this.revealElement(fadeEl);
            } else {
              this.hideElement(fadeEl);
            }
          });
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    watcherToElements.forEach((_, watcher) => {
      observer.observe(watcher);
    });

    this.observers.push(observer);
  }

  private findSizedAncestor(el: HTMLElement): HTMLElement {
    let node = el.parentElement;
    while (node && node !== this.document.body) {
      const box = node.getBoundingClientRect();
      if (box.width > 0 || box.height > 0) return node;
      node = node.parentElement;
    }
    return el;
  }

  private revealElement(el: HTMLElement): void {
    const id = el.getAttribute('data-ws-appear-id') || '';
    const delay = this.EXTRA_DELAY_MS[id] || 0;

    const timer = setTimeout(() => {
      this.renderer.addClass(el, 'is-visible');
    }, delay);

    this.timers.push(timer);
  }

  private hideElement(el: HTMLElement): void {
    this.renderer.removeClass(el, 'is-visible');
  }

  /* ---------- 2. Flatten the project thumbnails on scroll ---------- */

  private initCardTilt(): void {
    const cards: HTMLElement[] = Array.from(
      this.el.nativeElement.querySelectorAll('.card-tilt-tilted')
    );
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'card-tilt-flat');
          } else {
            this.renderer.removeClass(entry.target, 'card-tilt-flat');
          }
        });
      },
      { threshold: 0.4 }
    );

    cards.forEach((card) => observer.observe(card));
    this.observers.push(observer);
  }

  /* ---------- 3. Scrolling logo/skills ticker ---------- */

  private initTickers(): void {
    const tickers: HTMLElement[] = Array.from(
      this.el.nativeElement.querySelectorAll(
        '[data-ws-name="Ticker"], [name="Ticker"], [name="Ticker 2"], [name="Ticker 3"]'
      )
    );

    const initializedLists: { list: HTMLElement; count: number }[] = [];

    const measureShift = (list: HTMLElement, originalCount: number) => {
      const firstClone = list.children[originalCount] as HTMLElement;
      if (!firstClone) return;
      list.style.setProperty('--ticker-shift', `${firstClone.offsetLeft}px`);
    };

    tickers.forEach((container) => {
      const lists: HTMLElement[] = Array.from(container.querySelectorAll('ul'));
      lists.forEach((list) => {
        if (list.dataset['tickerInit']) return;
        if (!list.classList.contains('ticker-list')) return;

        list.dataset['tickerInit'] = 'true';

        const items = Array.from(list.children);
        items.forEach((item) => {
          list.appendChild(item.cloneNode(true));
        });

        measureShift(list, items.length);
        initializedLists.push({ list, count: items.length });

        this.renderer.addClass(list, 'ticker-scrolling');
      });
    });

    if (initializedLists.length) {
      const remeasureAll = () => {
        initializedLists.forEach((entry) => {
          measureShift(entry.list, entry.count);
        });
      };

      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      const unlistenResize = this.renderer.listen('window', 'resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(remeasureAll, 150);
        this.timers.push(resizeTimer);
      });
      this.unlistenFns.push(unlistenResize);

      const fonts = (this.document as unknown as { fonts?: { ready: Promise<void> } }).fonts;
      if (fonts && fonts.ready) {
        fonts.ready.then(remeasureAll);
      }
    }
  }




  /* ---------- 5. Typing role text (hero "UIUX Designer" cycle) ---------- */

  private initTypingRoles(): void {
    const elements: HTMLElement[] = Array.from(
      this.el.nativeElement.querySelectorAll('[data-typing-roles]')
    );
    if (!elements.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    elements.forEach((el) => {
      const rolesAttr = el.dataset['typingRoles'] || '';
      const roles = rolesAttr
        .split('|')
        .map((role) => role.trim())
        .filter(Boolean);

      if (!roles.length) return;

      const textEl = el.querySelector<HTMLElement>('.typing-role-text');
      if (!textEl) return;

      if (reduceMotion) {
        textEl.textContent = roles[0];
        return;
      }

      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const TYPE_MS = 70;
      const DELETE_MS = 40;
      const PAUSE_AFTER_TYPE_MS = 1400;
      const PAUSE_AFTER_DELETE_MS = 300;

      const tick = () => {
        const currentRole = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          textEl.textContent = currentRole.slice(0, charIndex);

          if (charIndex === currentRole.length) {
            deleting = true;
            const timer = setTimeout(tick, PAUSE_AFTER_TYPE_MS);
            this.timers.push(timer);
            return;
          }
          const timer = setTimeout(tick, TYPE_MS);
          this.timers.push(timer);
        } else {
          charIndex--;
          textEl.textContent = currentRole.slice(0, charIndex);

          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            const timer = setTimeout(tick, PAUSE_AFTER_DELETE_MS);
            this.timers.push(timer);
            return;
          }
          const timer = setTimeout(tick, DELETE_MS);
          this.timers.push(timer);
        }
      };

      tick();
    });
  }
}