import { r as registerInstance, h } from './index-0cff3bd2.js';
import { k as il } from './headless.esm-41df7a7c.js';
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
const AtomicTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.expression = '';
    this.isActive = false;
  }
  initialize() {
    const options = {
      options: {
        expression: this.expression,
      },
      initialState: {
        isActive: this.isActive,
      },
    };
    this.tab = il(this.bindings.engine, options);
  }
  handleClick() {
    this.tab.select();
  }
  render() {
    let activeClass = 'btn-outline-primary';
    let activePart = {};
    if (this.tabState.isActive) {
      activeClass = 'active';
      activePart = { part: 'active-tab' };
    }
    return (h("span", Object.assign({}, activePart), h("button", { part: "tab-button", class: 'p-2 bg-primary border-none h-10 ' + activeClass, onClick: () => this.handleClick() }, h("slot", null))));
  }
};
__decorate([
  InitializeBindings()
], AtomicTab.prototype, "bindings", void 0);
__decorate([
  BindStateToController('tab')
], AtomicTab.prototype, "tabState", void 0);
AtomicTab.style = atomicTabCss;

export { AtomicTab as atomic_tab };