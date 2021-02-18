import { r as registerInstance, h } from './index-0cff3bd2.js';
import { s as sanitize } from './utils-31c260f0.js';
import { j as ju } from './headless.esm-41df7a7c.js';
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
const AtomicQuerySummary = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unescapeStringOption = { interpolation: { escapeValue: false } };
    this.strings = {
      noResults: () => this.bindings.i18n.t('noResults'),
      noResultsFor: (query) => this.bindings.i18n.t('noResultsFor', Object.assign(Object.assign({}, this.unescapeStringOption), { query })),
      showingResultsOf: (resultOfOptions) => this.bindings.i18n.t('showingResultsOf', Object.assign(Object.assign({}, this.unescapeStringOption), resultOfOptions)),
      showingResultsOfWithQuery: (resultOfOptions) => this.bindings.i18n.t('showingResultsOfWithQuery', Object.assign(Object.assign({}, this.unescapeStringOption), resultOfOptions)),
      inSeconds: (count) => this.bindings.i18n.t('inSeconds', { count }),
    };
    /**
     * Whether to display the duration of the last query execution.
     */
    this.enableDuration = true;
  }
  initialize() {
    this.querySummary = ju(this.bindings.engine);
  }
  renderDuration() {
    if (this.enableDuration && this.querySummaryState.hasDuration) {
      return (h("span", { part: "duration" }, "\u00A0", ' ', this.strings.inSeconds(this.querySummaryState.durationInSeconds)));
    }
  }
  wrapHighlight(content) {
    return `<b part="highlight">${content}</b>`;
  }
  renderNoResults() {
    const content = this.querySummaryState.hasQuery
      ? this.strings.noResultsFor(this.wrapHighlight(sanitize(this.querySummaryState.query)))
      : this.strings.noResults();
    return h("span", { part: "no-results", innerHTML: content });
  }
  get resultOfOptions() {
    const locale = this.bindings.i18n.language;
    return {
      count: this.querySummaryState.lastResult,
      first: this.wrapHighlight(this.querySummaryState.firstResult.toLocaleString(locale)),
      last: this.wrapHighlight(this.querySummaryState.lastResult.toLocaleString(locale)),
      total: this.wrapHighlight(this.querySummaryState.total.toLocaleString(locale)),
      query: this.wrapHighlight(sanitize(this.querySummaryState.query)),
    };
  }
  renderHasResults() {
    const content = this.querySummaryState.hasQuery
      ? this.strings.showingResultsOfWithQuery(this.resultOfOptions)
      : this.strings.showingResultsOf(this.resultOfOptions);
    return h("span", { part: "results", innerHTML: content });
  }
  render() {
    return (h("div", { class: "text-on-background", part: "container" }, this.querySummaryState.hasResults
      ? [this.renderHasResults(), this.renderDuration()]
      : this.renderNoResults()));
  }
};
__decorate([
  InitializeBindings()
], AtomicQuerySummary.prototype, "bindings", void 0);
__decorate([
  BindStateToController('querySummary')
], AtomicQuerySummary.prototype, "querySummaryState", void 0);
__decorate([
  BindStateToI18n()
], AtomicQuerySummary.prototype, "strings", void 0);
AtomicQuerySummary.style = atomicQuerySummaryCss;

export { AtomicQuerySummary as atomic_query_summary };