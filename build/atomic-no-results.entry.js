import { r as registerInstance, h } from './index-0cff3bd2.js';
import { j as ju, m as mu } from './headless.esm-41df7a7c.js';
import { I as InitializeBindings, B as BindStateToController, a as BindStateToI18n } from './initialization-utils-8c2d1cb8.js';


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
const AtomicNoResults = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.strings = {
      cancelLastAction: () => this.bindings.i18n.t('cancelLastAction'),
      searchTips: () => this.bindings.i18n.t('searchTips'),
      checkSpelling: () => this.bindings.i18n.t('checkSpelling'),
      tryUsingFewerKeywords: () => this.bindings.i18n.t('tryUsingFewerKeywords'),
      selectFewerFilters: () => this.bindings.i18n.t('selectFewerFilters'),
    };
    /**
     * Whether to display a button which cancels the last available action.
     */
    this.enableCancelLastAction = true;
    /**
     * Whether to display a list of search tips to the user.
     */
    this.enableSearchTips = true;
  }
  initialize() {
    this.querySummary = ju(this.bindings.engine);
    this.history = mu(this.bindings.engine);
  }
  renderCancel() {
    if (!this.historyState.past.length) {
      return;
    }
    return (h("button", { part: "cancel-button", class: "text-primary hover:underline font-bold", onClick: () => this.history.back() }, this.strings.cancelLastAction()));
  }
  renderSearchTips() {
    return [
      h("div", { part: "tips-title", class: "mt-2 text-lg" }, this.strings.searchTips()),
      h("ul", { part: "tips-list", class: "ml-5 list-disc list-inside" }, h("li", { part: "tips-list-element" }, this.strings.checkSpelling()), h("li", { part: "tips-list-element" }, this.strings.tryUsingFewerKeywords()), h("li", { part: "tips-list-element" }, this.strings.selectFewerFilters())),
    ];
  }
  render() {
    if (this.querySummaryState.hasResults) {
      return;
    }
    return [
      h("div", { class: "text-on-background" }, this.enableCancelLastAction && this.renderCancel(), this.enableSearchTips && this.renderSearchTips()),
      h("slot", null),
    ];
  }
};
__decorate([
  InitializeBindings()
], AtomicNoResults.prototype, "bindings", void 0);
__decorate([
  BindStateToController('querySummary')
], AtomicNoResults.prototype, "querySummaryState", void 0);
__decorate([
  BindStateToController('history')
], AtomicNoResults.prototype, "historyState", void 0);
__decorate([
  BindStateToI18n()
], AtomicNoResults.prototype, "strings", void 0);
AtomicNoResults.style = atomicNoResultsCss;

export { AtomicNoResults as atomic_no_results };