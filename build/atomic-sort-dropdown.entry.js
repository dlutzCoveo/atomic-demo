import { r as registerInstance, h, g as getElement } from './index-0cff3bd2.js';
import { r as randomID } from './utils-31c260f0.js';
import { J as Ju, i as Qd } from './headless.esm-41df7a7c.js';
import { I as InitializeBindings, B as BindStateToController, a as BindStateToI18n } from './initialization-utils-8c2d1cb8.js';

const ArrowBottomIcon = `<svg viewBox="0 0 12.6 7.2" xmlns="http://www.w3.org/2000/svg"><path d="m11.421 7.04c-.3 0-.5-.1-.7-.3l-4.6-4.6-4.6 4.6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4l5.2-5.2c.4-.4 1.2-.4 1.6 0l5.2 5.2c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3" transform="matrix(-1 0 0 -1 12.366 7.086)"/></svg>`;


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
const AtomicSortDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.options = [];
    this.id = randomID('atomic-sort-dropdown-');
    this.strings = {
      sortBy: () => this.bindings.i18n.t('sortBy'),
    };
  }
  initialize() {
    this.buildOptions();
    this.sort = Ju(this.bindings.engine, {
      initialState: {
        criterion: this.options[0].criteria,
      },
    });
  }
  buildOptions() {
    const sortCriterionElements = Array.from(this.host.querySelectorAll('atomic-sort-criteria'));
    this.options = sortCriterionElements.map(({ criteria, caption }) => {
      this.strings[caption] = () => this.bindings.i18n.t(caption);
      return {
        criteria: Qd(criteria),
        expression: criteria,
        caption,
      };
    });
    if (!this.options.length) {
      this.error = new Error('The "atomic-sort-dropdown" element requires at least one "atomic-sort-criteria" child.');
    }
  }
  select(e) {
    const select = e.composedPath()[0];
    const option = this.options.find((option) => option.expression === select.value);
    option && this.sort.sortBy(option.criteria);
  }
  buildOption({ expression, criteria, caption }) {
    return (h("option", { value: expression, selected: this.sort.isSortedBy(criteria) }, this.strings[caption]()));
  }
  renderLabel() {
    return (h("label", { class: "text-on-background text-sm mr-2", part: "label", htmlFor: this.id }, this.strings.sortBy()));
  }
  renderSelect() {
    return [
      h("select", { id: this.id, class: "flex-grow appearance-none rounded bg-background text-secondary font-bold border border-divider py-1.5 pl-2 pr-8", part: "select", "aria-label": this.strings.sortBy(), onChange: (option) => this.select(option) }, this.options.map((option) => this.buildOption(option))),
      h("div", { class: "absolute right-3 top-4 fill-current w-3 h-3 pointer-events-none", innerHTML: ArrowBottomIcon }),
    ];
  }
  render() {
    return [
      h("div", { class: "flex items-center relative" }, this.renderLabel(), this.renderSelect()),
      h("slot", null),
    ];
  }
  get host() { return getElement(this); }
};
__decorate([
  InitializeBindings()
], AtomicSortDropdown.prototype, "bindings", void 0);
__decorate([
  BindStateToController('sort')
], AtomicSortDropdown.prototype, "sortState", void 0);
__decorate([
  BindStateToI18n()
], AtomicSortDropdown.prototype, "strings", void 0);
AtomicSortDropdown.style = atomicSortDropdownCss;

export { AtomicSortDropdown as atomic_sort_dropdown };