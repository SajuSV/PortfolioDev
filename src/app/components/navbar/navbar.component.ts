// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   imports: [],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {

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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private unlistenFns: (() => void)[] = [];

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initNav();
    });
  }

  ngOnDestroy(): void {
    this.unlistenFns.forEach((unlisten) => unlisten());
    this.unlistenFns = [];
  }

  private initNav(): void {
    const buttons: HTMLElement[] = Array.from(
      this.el.nativeElement.querySelectorAll('[data-ws-name="open"]')
    );

    buttons.forEach((button) => {
      const header = button.closest('header');

      const fullScreenNav = (
        this.el.nativeElement.querySelector('.site-nav') ||
        this.document.querySelector('.site-nav')
      ) as HTMLElement | null;

      const isFullScreenNav = !!fullScreenNav;

      const menus: HTMLElement[] = isFullScreenNav && fullScreenNav
        ? [fullScreenNav]
        : header
        ? Array.from(header.querySelectorAll<HTMLElement>('nav[data-ws-name="menu"]'))
        : [];

      if (!menus.length) {
        console.warn('Nav menu not found in DOM!');
        return;
      }

      this.renderer.setAttribute(button, 'role', 'button');
      this.renderer.setAttribute(button, 'aria-expanded', 'false');
      this.renderer.setAttribute(button, 'tabindex', '0');

      if (!isFullScreenNav) {
        this.renderer.addClass(button, 'mobile-menu-toggle');
        this.renderer.addClass(button, 'mobile-menu-icon');
        menus.forEach((menu) => this.renderer.addClass(menu, 'mobile-menu'));

        if (header && getComputedStyle(header).position === 'static') {
          this.renderer.addClass(header, 'mobile-menu-header-relative');
        }
      }

      let isOpen = false;
      const setOpen = (open: boolean) => {
        isOpen = open;
        this.renderer.setAttribute(button, 'aria-expanded', String(isOpen));

        if (isFullScreenNav) {
          if (isOpen) {
            this.renderer.addClass(this.document.body, 'nav-open');
            this.renderer.addClass(button, 'nav-open');
          } else {
            this.renderer.removeClass(this.document.body, 'nav-open');
            this.renderer.removeClass(button, 'nav-open');
          }
        } else {
          if (isOpen) {
            this.renderer.addClass(button, 'mobile-menu-icon-open');
            menus.forEach((menu) => this.renderer.addClass(menu, 'mobile-menu-open'));
          } else {
            this.renderer.removeClass(button, 'mobile-menu-icon-open');
            menus.forEach((menu) => this.renderer.removeClass(menu, 'mobile-menu-open'));
          }
        }
      };

      const unlistenClick = this.renderer.listen(button, 'click', (e: Event) => {
        e.stopPropagation();
        setOpen(!isOpen);
      });

      const unlistenKeydown = this.renderer.listen(button, 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setOpen(!isOpen);
        }
      });
      this.unlistenFns.push(unlistenClick, unlistenKeydown);

      const unlistenEscape = this.renderer.listen(this.document, 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen) setOpen(false);
      });
      this.unlistenFns.push(unlistenEscape);

      menus.forEach((menu) => {
        const links = menu.querySelectorAll('a');
        links.forEach((link) => {
          const unlistenLink = this.renderer.listen(link, 'click', () => setOpen(false));
          this.unlistenFns.push(unlistenLink);
        });
      });
    });
  }
}