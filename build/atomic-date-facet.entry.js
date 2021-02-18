import { r as registerInstance, h } from './index-0cff3bd2.js';
import { c as cu } from './headless.esm-41df7a7c.js';
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
const AtomicDateFacet = class {
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
      generateAutomaticRanges: true,
    };
    this.facet = cu(this.bindings.engine, { options });
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
], AtomicDateFacet.prototype, "bindings", void 0);
__decorate([
  BindStateToController('facet', { subscribeOnConnectedCallback: true })
], AtomicDateFacet.prototype, "facetState", void 0);
AtomicDateFacet.style = atomicDateFacetCss;

export { AtomicDateFacet as atomic_date_facet };