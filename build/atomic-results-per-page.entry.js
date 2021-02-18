import { r as registerInstance, h } from './index-0cff3bd2.js';
import { T as Tu } from './headless.esm-41df7a7c.js';
import { I as InitializeBindings, B as BindStateToController, a as BindStateToI18n } from './initialization-utils-8c2d1cb8.js';


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
const AtomicResultsPerPage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.strings = {
      resultsPerPage: () => this.bindings.i18n.t('resultsPerPage'),
      displayResultsPerPage: (results) => this.bindings.i18n.t('displayResultsPerPage', { results }),
    };
    /**
     * List of possible results per page choices, separated by commas.
     */
    this.choicesDisplayed = '10,25,50,100';
    /**
     * Initial choice for the number of result per page. Should be part of the `choicesDisplayed` option.
     */
    this.initialChoice = 10;
  }
  initialize() {
    this.resultPerPage = Tu(this.bindings.engine, {
      initialState: { numberOfResults: this.initialChoice },
    });
    this.choices = this.validateChoicesDisplayed();
    this.validateInitialChoice();
  }
  validateChoicesDisplayed() {
    return this.choicesDisplayed.split(',').map((choice) => {
      const parsedChoice = parseInt(choice);
      if (isNaN(parsedChoice)) {
        const errorMsg = `The choice value "${choice}" from the "choicesDisplayed" option is not a number.`;
        this.bindings.engine.logger.error(errorMsg, this);
        throw new Error(errorMsg);
      }
      return parsedChoice;
    });
  }
  validateInitialChoice() {
    if (!this.choices.includes(this.initialChoice)) {
      const errorMsg = `The "initialChoice" option value "${this.initialChoice}" is not included in the "choicesDisplayed" option "${this.choicesDisplayed}".`;
      this.bindings.engine.logger.error(errorMsg, this);
      throw new Error(errorMsg);
    }
  }
  buildChoice(choice) {
    const isSelected = this.resultPerPage.isSetTo(choice);
    const classes = isSelected
      ? 'text-on-primary bg-primary hover:bg-primary-variant'
      : 'text-on-background';
    return (h("button", { role: "radio", "aria-label": this.strings.displayResultsPerPage(choice), "aria-checked": `${isSelected}`, class: `hover:underline ${classes}`, part: `page-button ${isSelected && 'active-page-button'}`, onClick: () => this.resultPerPage.set(choice) }, choice));
  }
  render() {
    return (h("div", { class: "flex justify-between items-center" }, h("span", { part: "label", class: "text-on-background pr-4 text-sm" }, this.strings.resultsPerPage()), h("div", { part: "buttons", role: "radiogroup", "aria-label": this.strings.resultsPerPage(), class: "flex justify-between flex-grow\tspace-x-2" }, this.choices.map((choice) => this.buildChoice(choice)))));
  }
};
__decorate([
  InitializeBindings()
], AtomicResultsPerPage.prototype, "bindings", void 0);
__decorate([
  BindStateToController('resultPerPage')
], AtomicResultsPerPage.prototype, "resultPerPageState", void 0);
__decorate([
  BindStateToI18n()
], AtomicResultsPerPage.prototype, "strings", void 0);
AtomicResultsPerPage.style = atomicResultsPerPageCss;

export { AtomicResultsPerPage as atomic_results_per_page };