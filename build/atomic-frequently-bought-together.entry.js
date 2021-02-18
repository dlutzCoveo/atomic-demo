import { r as registerInstance, h } from './index-0cff3bd2.js';
import { Q as Qi, F as Fn, C as Cl } from './headless.esm-41df7a7c.js';

const AtomicProductRecommendations = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
  }
  componentWillLoad() {
    const sampleConfiguration = Qi.getSampleConfiguration();
    this.engine = new Qi({
      configuration: Object.assign(Object.assign({}, sampleConfiguration), { search: Object.assign(Object.assign({}, sampleConfiguration.search), { searchHub: 'frequently_bought_recommendations' }) }),
      reducers: Fn,
    });
    this.frequentlyBoughtTogether = Cl(this.engine, {
      options: {
        sku: 'abc',
      },
    });
    this.unsubscribe = this.frequentlyBoughtTogether.subscribe(() => this.updateState());
    this.frequentlyBoughtTogether.refresh();
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.frequentlyBoughtTogether.state;
  }
  render() {
    return (h("div", null, "FREQUENTLY BOUGHT TOGETHER:", h("ul", null, this.state.recommendations.map((p) => (h("li", null, p.name))))));
  }
};

export { AtomicProductRecommendations as atomic_frequently_bought_together };
