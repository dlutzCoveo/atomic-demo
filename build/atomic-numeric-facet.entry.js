import { r as registerInstance, h } from './index-0cff3bd2.js';
import { p as pu, b as hu } from './headless.esm-41df7a7c.js';
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
const AtomicNumericFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.isExpanded = false;
    this.facetId = '';
    this.field = '';
    this.label = 'No label';
  }
  initialize() {
    const options = {
      facetId: this.facetId,
      field: this.field,
      generateAutomaticRanges: false,
      currentValues: [
        pu({ start: 0, end: 20 }),
        pu({ start: 20, end: 40 }),
        pu({ start: 40, end: 60 }),
        pu({ start: 60, end: 80 }),
        pu({ start: 80, end: 100 }),
      ],
    };
    this.facet = hu(this.bindings.engine, { options });
    this.facetId = this.facet.state.facetId;
  }
  get values() {
    return this.facetState.values.map((listItem) => this.buildListItem(listItem));
  }
  buildListItem(item) {
    const isSelected = this.facet.isValueSelected(item);
    return (h("facet-value", { label: ` ${item.start}-${item.end}`, isSelected: isSelected, numberOfResults: item.numberOfResults, onFacetValueSelected: () => {
        this.facet.toggleSelect(item);
      } }));
  }
  render() {
    return (h("base-facet", { label: this.label, hasActiveValues: this.facetState.hasActiveValues, onDeselectAll: () => this.facet.deselectAll() }, h("ul", { class: "list-none p-0" }, this.values)));
  }
};
__decorate([
  InitializeBindings()
], AtomicNumericFacet.prototype, "bindings", void 0);
__decorate([
  BindStateToController('facet', { subscribeOnConnectedCallback: true })
], AtomicNumericFacet.prototype, "facetState", void 0);
AtomicNumericFacet.style = atomicNumericFacetCss;

export { AtomicNumericFacet as atomic_numeric_facet };