import { r as registerInstance, h } from './index-0cff3bd2.js';
import { E as Eu } from './headless.esm-41df7a7c.js';
import { I as InitializeBindings, B as BindStateToController, a as BindStateToI18n } from './initialization-utils-8c2d1cb8.js';

const ArrowRightIcon = `<svg viewBox="0 0 20 20"><path d="m8.5 15.2 4.3-4.6c.3-.4.3-.9 0-1.3l-4.4-4.5c-.3-.4-.9-.4-1.2 0s-.3.9 0 1.3l3.7 4-3.7 3.9c-.3.4-.3.9 0 1.3.4.3 1 .3 1.3-.1z"/></svg>`;

const ArrowLeftIcon = `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.5 4.8-4.3 4.5c-.3.4-.3.9 0 1.3l4.3 4.6c.3.4.9.4 1.2 0s.3-.9 0-1.3l-3.7-4 3.7-3.9c.3-.4.3-.9 0-1.3-.3-.3-.9-.3-1.2.1z"/></svg>`;


var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const AtomicPager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.strings = {
      pagination: () => this.bindings.i18n.t('pagination'),
      previous: () => this.bindings.i18n.t('previous'),
      next: () => this.bindings.i18n.t('next'),
      pageNumber: (page) => this.bindings.i18n.t('pageNumber', { page }),
    };
    /**
     * Specifies how many page buttons to display in the pager.
     */
    this.numberOfPages = 5;
    /**
     * Specifies whether the **Previous** and **Next** buttons should appear at each end of the pager when appropriate.
     */
    this.enableNavigationButtons = true;
  }
  initialize() {
    this.pager = Eu(this.bindings.engine, {
      options: { numberOfPages: this.numberOfPages },
    });
  }
  buildButton(options) {
    return (h("li", null, h("button", { part: options.part, class: `text-primary ${options.disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:text-primary-variant'}`, disabled: options.disabled, "aria-label": options.ariaLabel, onClick: options.callback }, h("span", { class: "fill-current", innerHTML: options.icon }))));
  }
  get previousButton() {
    return this.buildButton({
      ariaLabel: this.strings.previous(),
      callback: () => {
        this.pager.previousPage();
      },
      disabled: !this.pagerState.hasPreviousPage,
      icon: ArrowLeftIcon,
      part: 'previous-button',
    });
  }
  get nextButton() {
    return this.buildButton({
      ariaLabel: this.strings.next(),
      callback: () => {
        this.pager.nextPage();
      },
      disabled: !this.pagerState.hasNextPage,
      icon: ArrowRightIcon,
      part: 'next-button',
    });
  }
  get pages() {
    const pages = this.pager.state.currentPages;
    return pages.map((page) => this.buildPage(page));
  }
  buildPage(page) {
    const isSelected = this.pager.isCurrentPage(page);
    const classes = isSelected
      ? 'text-on-primary bg-primary hover:bg-primary-variant'
      : 'text-on-background';
    return (h("li", null, h("button", { class: `hover:underline ${classes}`, "aria-current": isSelected ? 'page' : null, part: `page-button ${isSelected && 'active-page-button'}`, "aria-label": this.strings.pageNumber(page), onClick: () => {
        this.pager.selectPage(page);
      } }, page)));
  }
  render() {
    return (h("nav", { "aria-label": this.strings.pagination(), class: "items-center " }, h("ul", { part: "buttons", class: "flex justify-between space-x-2" }, this.enableNavigationButtons && this.previousButton, this.pages, this.enableNavigationButtons && this.nextButton)));
  }
};
__decorate([
  InitializeBindings()
], AtomicPager.prototype, "bindings", void 0);
__decorate([
  BindStateToController('pager')
], AtomicPager.prototype, "pagerState", void 0);
__decorate([
  BindStateToI18n()
], AtomicPager.prototype, "strings", void 0);
AtomicPager.style = atomicPagerCss;

export { AtomicPager as atomic_pager };