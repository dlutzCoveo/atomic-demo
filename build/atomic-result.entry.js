import { r as registerInstance, h, g as getElement } from './index-0cff3bd2.js';
import './utils-31c260f0.js';
import './headless.esm-41df7a7c.js';
import { b as bindLogDocumentOpenOnResult } from './result-utils-2d3be041.js';

const AtomicResult = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unbindLogDocumentOpen = () => { };
  }
  componentDidRender() {
    this.unbindLogDocumentOpen = bindLogDocumentOpenOnResult(this.engine, this.result, this.host);
  }
  disconnectedCallback() {
    this.unbindLogDocumentOpen();
  }
  render() {
    return h("slot", null);
  }
  get host() { return getElement(this); }
};

export { AtomicResult as atomic_result };
