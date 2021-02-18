import { r as registerInstance, g as getElement } from './index-0cff3bd2.js';

const AtomicSortCriteria = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  get host() { return getElement(this); }
};

export { AtomicSortCriteria as atomic_sort_criteria };
