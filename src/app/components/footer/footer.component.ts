// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-footer',
//   imports: [],
//   templateUrl: './footer.component.html',
//   styleUrl: './footer.component.css'
// })
// export class FooterComponent {

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
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements AfterViewInit, OnDestroy {
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
      // this.initCardTilt();
      this.initTickers();
      // this.initNav();
      // this.initTypingRoles();
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
backToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
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
}