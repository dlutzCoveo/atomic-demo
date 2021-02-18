import { r as registerInstance, h } from './index-0cff3bd2.js';
import { r as randomID } from './utils-31c260f0.js';
import { B as Bu } from './headless.esm-41df7a7c.js';
import { I as InitializeBindings, a as BindStateToI18n, B as BindStateToController } from './initialization-utils-8c2d1cb8.js';

class Combobox {
  constructor(options) {
    this.options = options;
    this.activeDescendant = '';
  }
  onInputChange(e) {
    const value = e.target.value;
    this.options.onChange(value);
  }
  onInputKeyup(e) {
    switch (e.key) {
      case 'Enter':
        this.onSubmit();
        break;
      case 'Escape':
        this.onInputBlur();
        break;
    }
  }
  onSubmit() {
    const activeDescendantElement = this.hasActiveDescendant && this.activeDescendantElement;
    this.updateActiveDescendant();
    if (activeDescendantElement) {
      this.options.onSelectValue(activeDescendantElement);
      return;
    }
    this.options.onSubmit();
  }
  onInputKeydown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusNextValue();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusPreviousValue();
        break;
    }
  }
  onInputBlur() {
    this.updateActiveDescendant();
    this.options.onBlur();
  }
  updateActiveDescendantElement(activeDescendantElement) {
    if (!activeDescendantElement) {
      return;
    }
    this.updateActiveDescendant(activeDescendantElement.id);
  }
  updateActiveDescendant(activeDescendant = '') {
    this.activeDescendant = activeDescendant;
  }
  get activeDescendantElement() {
    return this.listbox.querySelector(`#${this.activeDescendant}`);
  }
  get hasActiveDescendant() {
    return this.activeDescendant !== '';
  }
  get hasValues() {
    return !!this.listbox.childElementCount;
  }
  focusNextValue() {
    if (!this.hasValues) {
      return;
    }
    this.updateActiveDescendantElement(this.nextOfFirstValue);
    this.updateAccessibilityAttributes();
  }
  get firstValue() {
    return this.listbox.firstElementChild;
  }
  get nextOfFirstValue() {
    var _a;
    if (!this.hasActiveDescendant) {
      return this.firstValue;
    }
    return ((_a = this.activeDescendantElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) || this.firstValue;
  }
  focusPreviousValue() {
    if (!this.hasValues) {
      return;
    }
    this.updateActiveDescendantElement(this.previousOrLastValue);
    this.updateAccessibilityAttributes();
  }
  get lastValue() {
    return this.listbox.lastElementChild;
  }
  get previousOrLastValue() {
    var _a;
    if (!this.hasActiveDescendant) {
      return this.lastValue;
    }
    return (((_a = this.activeDescendantElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) || this.lastValue);
  }
  get container() {
    return this.options.containerRef();
  }
  get textbox() {
    return this.options.inputRef();
  }
  get listbox() {
    return this.options.valuesRef();
  }
  get listboxOptions() {
    return this.options.valuesRef().children;
  }
  get emptyOptionId() {
    return `${this.options.id}-empty-option`;
  }
  updateAccessibilityAttributes() {
    this.setAttributes(this.containerAttributes, this.container);
    this.setAttributes(this.textboxAttributes, this.textbox);
    this.setAttributes(this.listboxAttributes, this.listbox);
    this.removeEmptyOptionElement();
    Array.from(this.listboxOptions).forEach((value) => this.updateOption(value));
  }
  updateOption(value) {
    const isActive = value.id === this.activeDescendant;
    this.options.activeClass
      .split(' ')
      .forEach((activeClass) => value.classList.toggle(activeClass, isActive));
    this.setAttributes(this.optionAttributes(isActive, value), value);
  }
  removeEmptyOptionElement() {
    const emptyOptionElement = this.listbox.querySelector(`#${this.emptyOptionId}`);
    emptyOptionElement && emptyOptionElement.remove();
  }
  setAttributes(attributes, element) {
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  }
  get containerAttributes() {
    return {
      'aria-owns': `${this.options.id}-listbox`,
      role: 'combobox',
      'aria-haspopup': 'listbox',
      'aria-expanded': `${this.hasValues}`,
    };
  }
  get textboxAttributes() {
    return {
      id: `${this.options.id}-textbox`,
      autocomplete: 'off',
      autocapitalize: 'off',
      autocorrect: 'off',
      'aria-autocomplete': 'list',
      'aria-controls': `${this.options.id}-listbox`,
      'aria-activedescendant': this.activeDescendant,
      'aria-label': this.options.strings.searchBox(),
    };
  }
  get listboxAttributes() {
    return {
      id: `${this.options.id}-listbox`,
      role: 'listbox',
      'aria-label': this.options.strings.querySuggestionList(),
    };
  }
  optionAttributes(isActive, value) {
    var _a;
    const part = (_a = value.getAttribute('part')) !== null && _a !== void 0 ? _a : '';
    const activePart = ` ${this.options.activePartName}`;
    return {
      role: 'option',
      'aria-selected': `${isActive}`,
      part: isActive ? `${part}${activePart}` : part.replace(activePart, ''),
    };
  }
}

const ClearIcon = `<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="m18 2-1.8-2-7.1 7.1-7.1-7.1-2 2 7.1 7.1-7.1 7.1 2 1.8 7.1-6.9 7.1 6.9 1.8-1.8-6.9-7.1z"/></svg>`;

const SearchIcon = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.4 0c3.5 0 6.4 2.9 6.4 6.4 0 1.4-.4 2.7-1.2 3.7l4 4c.4.4.4 1 .1 1.5l-.1.1c-.2.2-.5.3-.8.3s-.6-.1-.8-.3l-4-4c-1 .7-2.3 1.2-3.7 1.2-3.4-.1-6.3-3-6.3-6.5s2.9-6.4 6.4-6.4zm0 2.1c-2.3 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3z"/></svg>`;


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
const AtomicSearchBox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.strings = {
      clear: () => this.bindings.i18n.t('clear'),
      search: () => this.bindings.i18n.t('search'),
      searchBox: () => this.bindings.i18n.t('searchBox'),
      querySuggestionList: () => this.bindings.i18n.t('querySuggestionList'),
    };
    /**
     * Maximum number of suggestions to display
     */
    this.numberOfSuggestions = 5;
    /**
     * The placeholder for the search box input
     */
    this.placeholder = '';
    /**
     * Whether the submit button should be placed before the input
     */
    this.leadingSubmitButton = false;
    this._id = randomID('atomic-search-box-');
    this.combobox = new Combobox({
      id: this._id,
      strings: this.strings,
      containerRef: () => this.containerRef,
      inputRef: () => this.inputRef,
      valuesRef: () => this.valuesRef,
      onChange: (value) => {
        this.searchBox.updateText(value);
      },
      onSubmit: () => {
        this.searchBox.submit();
        this.searchBox.hideSuggestions();
      },
      onSelectValue: (element) => {
        this.searchBox.selectSuggestion(this.searchBoxState.suggestions[element.value]
          .rawValue);
      },
      onBlur: () => {
        setTimeout(() => this.searchBox.hideSuggestions(), 100);
      },
      activeClass: 'bg-primary text-on-primary',
      activePartName: 'active-suggestion',
    });
  }
  componentDidRender() {
    this.combobox.updateAccessibilityAttributes();
  }
  initialize() {
    this.searchBox = Bu(this.bindings.engine, {
      options: {
        numberOfSuggestions: this.numberOfSuggestions,
        highlightOptions: {
          notMatchDelimiters: {
            open: '<strong>',
            close: '</strong>',
          },
          correctionDelimiters: {
            open: '<i>',
            close: '</i>',
          },
        },
      },
    });
  }
  onInputFocus() {
    this.searchBox.showSuggestions();
  }
  get submitButton() {
    let roundedClasses = this.leadingSubmitButton
      ? 'rounded-l-lg'
      : 'rounded-r-lg';
    if (this.searchBoxState.suggestions.length) {
      roundedClasses += ' rounded-bl-none rounded-br-none';
    }
    return (h("button", { type: "button", part: "submit-button", class: `submit-button border-0 focus:outline-none bg-primary p-0 ${roundedClasses}`, "aria-label": this.strings.search(), onClick: () => this.searchBox.submit() }, h("div", { innerHTML: SearchIcon, class: "search mx-auto w-3.5 h-3.5 text-on-primary fill-current" })));
  }
  get clearButton() {
    if (this.searchBoxState.value === '') {
      return;
    }
    return (h("button", { type: "button", part: "clear-button", class: "clear-button bg-transparent border-none outline-none mr-2", "aria-label": this.strings.clear(), onClick: () => {
        this.searchBox.clear();
        this.inputRef.focus();
      } }, h("div", { innerHTML: ClearIcon, class: "w-2.5 h-2.5 text-on-background fill-current" })));
  }
  get input() {
    return (h("input", { part: "input", ref: (el) => (this.inputRef = el), onFocus: () => this.onInputFocus(), onBlur: () => this.combobox.onInputBlur(), onInput: (e) => this.combobox.onInputChange(e), onKeyUp: (e) => this.combobox.onInputKeyup(e), onKeyDown: (e) => this.combobox.onInputKeydown(e), type: "text", class: 'input mx-2 my-0 text-base placeholder-on-background outline-none flex-grow flex-row items-center ', placeholder: this.placeholder, value: this.searchBoxState.value }));
  }
  get suggestions() {
    return this.searchBoxState.suggestions.map((suggestion, index) => {
      const id = `${this._id}-suggestion-${index}`;
      return (h("li", { onClick: () => {
          this.searchBox.selectSuggestion(suggestion.rawValue);
        }, onMouseDown: (e) => e.preventDefault(), part: "suggestion", id: id, class: "suggestion h-9 px-2 cursor-pointer text-left text-sm bg-transparent border-none shadow-none hover:bg-primary hover:text-on-primary flex flex-row items-center", innerHTML: suggestion.highlightedValue, value: index }));
    });
  }
  renderInputWrapper() {
    let roundedClasses = this.leadingSubmitButton
      ? 'border-l-0 rounded-r-lg'
      : 'border-r-0 rounded-l-lg';
    if (this.searchBoxState.suggestions.length) {
      roundedClasses += ' rounded-bl-none rounded-br-none';
    }
    return (h("div", { part: "input-wrapper", class: `input-wrapper flex flex-grow items-center border border-divider ${roundedClasses}`, ref: (el) => (this.containerRef = el) }, this.input, this.clearButton));
  }
  render() {
    return (h("div", { class: "relative" }, h("div", { class: "search-box box-border w-full flex" }, this.leadingSubmitButton && this.submitButton, this.renderInputWrapper(), !this.leadingSubmitButton && this.submitButton), h("ul", { part: "suggestions", class: "suggestions box-border w-full p-0 my-0 flex flex-col bg-background border border-divider border-t-0 rounded-b list-none absolute z-50", ref: (el) => (this.valuesRef = el) }, this.suggestions)));
  }
};
__decorate([
  InitializeBindings()
], AtomicSearchBox.prototype, "bindings", void 0);
__decorate([
  BindStateToI18n()
], AtomicSearchBox.prototype, "strings", void 0);
__decorate([
  BindStateToController('searchBox')
], AtomicSearchBox.prototype, "searchBoxState", void 0);
AtomicSearchBox.style = atomicSearchBoxCss;

export { AtomicSearchBox as atomic_search_box };