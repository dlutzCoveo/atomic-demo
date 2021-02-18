import { r as registerInstance, h } from './index-0cff3bd2.js';
import { R as Ru } from './headless.esm-41df7a7c.js';
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
const AtomicQueryError = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  initialize() {
    this.queryError = Ru(this.bindings.engine);
  }
  get results() {
    var _a;
    return this.queryErrorState.hasError ? (h("div", null, h("div", null, "Oops ", (_a = this.queryErrorState.error) === null || _a === void 0 ? void 0 :
      _a.message), h("code", null, JSON.stringify(this.queryErrorState.error)))) : ('');
  }
  render() {
    return this.results;
  }
};
__decorate([
  InitializeBindings()
], AtomicQueryError.prototype, "bindings", void 0);
__decorate([
  BindStateToController('queryError')
], AtomicQueryError.prototype, "queryErrorState", void 0);
AtomicQueryError.style = atomicQueryErrorCss;

export { AtomicQueryError as atomic_query_error };