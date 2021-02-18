import { r as registerInstance, h } from './index-0cff3bd2.js';
import { H as Hc } from './headless.esm-41df7a7c.js';
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
const AtomicFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.isExpanded = false;
    this.facetId = '';
    this.field = '';
    this.label = 'No label';
  }
  initialize() {
    const options = { facetId: this.facetId, field: this.field };
    this.facet = Hc(this.bindings.engine, { options });
    this.facetId = this.facet.state.facetId;
  }
  get values() {
    return this.facetState.values.map((listItem) => this.buildListItem(listItem));
  }
  buildListItem(item) {
    const isSelected = this.facet.isValueSelected(item);
    return (h("facet-value", { label: `${item.value}`, isSelected: isSelected, numberOfResults: item.numberOfResults, onFacetValueSelected: () => {
        this.facet.toggleSelect(item);
      } }));
  }
  onFacetSearch(e) {
    const facetSearch = this.facet.facetSearch;
    facetSearch.updateText(e.detail);
    facetSearch.search();
  }
  get showMoreButton() {
    if (!this.facetState.canShowMoreValues) {
      return null;
    }
    return (h("button", { onClick: () => this.facet.showMoreValues() }, "show more"));
  }
  get showLessButton() {
    if (!this.facetState.canShowLessValues) {
      return null;
    }
    return (h("button", { onClick: () => this.facet.showLessValues() }, "show less"));
  }
  render() {
    return (h("base-facet", { label: this.label, hasActiveValues: this.facetState.hasActiveValues, onDeselectAll: () => this.facet.deselectAll() }, h("div", null, h("facet-search", { onFacetSearch: (e) => this.onFacetSearch(e), facetSearchResults: this.facetState.facetSearch.values, moreValuesAvailable: this.facetState.facetSearch.moreValuesAvailable }), h("ul", { class: "list-none p-0" }, this.values), h("div", null, this.showMoreButton, this.showLessButton))));
  }
};
__decorate([
  InitializeBindings()
], AtomicFacet.prototype, "bindings", void 0);
__decorate([
  BindStateToController('facet', { subscribeOnConnectedCallback: true })
], AtomicFacet.prototype, "facetState", void 0);
AtomicFacet.style = atomicFacetCss;

export { AtomicFacet as atomic_facet };