import { r as registerInstance, h, g as getElement } from './index-0cff3bd2.js';
import { a as al } from './headless.esm-41df7a7c.js';
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
const AtomicFacetManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  initialize() {
    this.facetManager = al(this.bindings.engine);
  }
  onFacetManagerUpdate() {
    this.sortFacets();
  }
  sortFacets() {
    const payload = this.facets.map((f) => ({ facetId: f.facetId, payload: f }));
    const sortedFacets = this.facetManager.sort(payload).map((f) => f.payload);
    this.host.append(...sortedFacets);
  }
  get facets() {
    const facets = [];
    const children = Array.from(this.host.children);
    children.forEach((child) => {
      this.isPseudoFacet(child) && facets.push(child);
    });
    return facets;
  }
  isPseudoFacet(el) {
    return 'facetId' in el;
  }
  render() {
    return h("slot", null);
  }
  get host() { return getElement(this); }
};
__decorate([
  InitializeBindings()
], AtomicFacetManager.prototype, "bindings", void 0);
__decorate([
  BindStateToController('facetManager', {
    onUpdateCallbackMethod: 'onFacetManagerUpdate',
  })
], AtomicFacetManager.prototype, "facetManagerState", void 0);
AtomicFacetManager.style = atomicFacetManagerCss;

export { AtomicFacetManager as atomic_facet_manager };