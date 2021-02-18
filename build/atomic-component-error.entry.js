import { r as registerInstance, h } from './index-0cff3bd2.js';


const AtomicComponentError = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("p", null, h("b", null, this.element.nodeName.toLowerCase())), h("p", null, this.error.name, ": ", this.error.message)));
  }
};
AtomicComponentError.style = atomicComponentErrorCss;

export { AtomicComponentError as atomic_component_error };