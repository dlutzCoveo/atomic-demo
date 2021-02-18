import { r as registerInstance, h } from './index-0cff3bd2.js';
import { L as Lc } from './headless.esm-41df7a7c.js';
import { I as InitializeBindings, B as BindStateToController } from './initialization-utils-8c2d1cb8.js';


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
const AtomicCategoryFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.facetId = '';
    this.field = '';
    this.label = 'No label';
  }
  initialize() {
    const options = {
      facetId: this.facetId,
      field: this.field,
      delimitingCharacter: ';',
    };
    this.facet = Lc(this.bindings.engine, { options });
    this.facetId = this.facet.state.facetId;
  }
  get parents() {
    const parents = this.facetState.parents;
    return parents.map((parent, i) => {
      const isLast = i === parents.length - 1;
      return this.buildParent(parent, isLast);
    });
  }
  buildParent(parent, isLast) {
    return (h("div", { onClick: () => !isLast && this.facet.toggleSelect(parent) }, h("b", null, parent.value)));
  }
  get values() {
    return this.facetState.values.map((value) => this.buildValue(value));
  }
  buildValue(item) {
    return (h("li", { onClick: () => this.facet.toggleSelect(item) }, h("span", null, item.value, " ", item.numberOfResults)));
  }
  onFacetSearch(e) {
    const facetSearch = this.facet.facetSearch;
    facetSearch.updateText(e.detail);
    facetSearch.search();
  }
  get resetButton() {
    if (!this.facetState.hasActiveValues) {
      return null;
    }
    return (h("button", { onClick: () => this.facet.deselectAll() }, "All Categories"));
  }
  get showMore() {
    if (!this.facetState.canShowMoreValues) {
      return null;
    }
    return (h("button", { onClick: () => this.facet.showMoreValues() }, "Show More"));
  }
  get showLess() {
    if (!this.facetState.canShowLessValues) {
      return null;
    }
    return (h("button", { onClick: () => this.facet.showLessValues() }, "Show Less"));
  }
  render() {
    return (h("base-facet", { label: this.label, hasActiveValues: this.facetState.hasActiveValues, onDeselectAll: () => this.facet.deselectAll() }, h("facet-search", { onFacetSearch: (e) => this.onFacetSearch(e), onShowMoreResults: () => this.facet.facetSearch.showMoreResults(), facetSearchResults: this.facetState.facetSearch.values, moreValuesAvailable: this.facetState.facetSearch.moreValuesAvailable }), h("div", null, h("div", null, this.resetButton), h("div", null, this.parents), h("ul", { class: "list-none p-0" }, this.values), h("div", null, this.showMore), h("div", null, this.showLess))));
  }
};
__decorate([
  InitializeBindings()
], AtomicCategoryFacet.prototype, "bindings", void 0);
__decorate([
  BindStateToController('facet', { subscribeOnConnectedCallback: true })
], AtomicCategoryFacet.prototype, "facetState", void 0);
AtomicCategoryFacet.style = atomicCategoryFacetCss;

export { AtomicCategoryFacet as atomic_category_facet };