import { r as registerInstance, h } from './index-0cff3bd2.js';
import { l as pc } from './headless.esm-41df7a7c.js';

const AtomicRelevanceInspector = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
    this.relevanceInspector = pc(this.bindings.engine, {
      initialState: {
        // TODO: add enable/disable mechanism
        enabled: false,
      },
    });
    this.unsubscribe = this.relevanceInspector.subscribe(() => (this.relevanceInspectorState = this.relevanceInspector.state));
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  render() {
    if (!this.relevanceInspectorState.isEnabled) {
      return;
    }
    // TODO: Display data in a cleaner manner
    return (h("p", null, "Debug mode is enabled. Look at the developper console to see additional information."));
  }
};

export { AtomicRelevanceInspector as atomic_relevance_inspector };
