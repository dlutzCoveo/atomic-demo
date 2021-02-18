import { r as registerInstance, h } from './index-0cff3bd2.js';
import { g as gc } from './headless.esm-41df7a7c.js';
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
const AtomicDidYouMean = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  initialize() {
    this.didYouMean = gc(this.bindings.engine);
  }
  applyCorrection() {
    this.didYouMean.applyCorrection();
  }
  render() {
    if (!this.didYouMeanState.hasQueryCorrection) {
      return '';
    }
    if (this.didYouMeanState.wasAutomaticallyCorrected) {
      return [
        h("p", null, "No results for", ' ', h("b", null, this.didYouMeanState.queryCorrection.wordCorrections[0]
          .originalWord)),
        h("p", null, "Query was automatically corrected to", ' ', h("b", null, this.didYouMeanState.wasCorrectedTo)),
      ];
    }
    return (h("button", { onClick: () => this.applyCorrection() }, "Did you mean: ", this.didYouMeanState.queryCorrection.correctedQuery, " ?"));
  }
};
__decorate([
  InitializeBindings()
], AtomicDidYouMean.prototype, "bindings", void 0);
__decorate([
  BindStateToController('didYouMean')
], AtomicDidYouMean.prototype, "didYouMeanState", void 0);
AtomicDidYouMean.style = atomicDidYouMeanCss;

export { AtomicDidYouMean as atomic_did_you_mean };