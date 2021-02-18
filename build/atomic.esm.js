import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-0cff3bd2.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find(s => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-424264d0.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], { type: 'application/javascript' }));
                mod = new Promise(resolve => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["atomic-component-error",[[1,"atomic-component-error",{"element":[16],"error":[16]}]]],["atomic-facet",[[1,"atomic-facet",{"facetId":[1537,"facet-id"],"field":[1],"label":[1],"facetState":[32],"error":[32],"isExpanded":[32]}]]],["atomic-category-facet",[[1,"atomic-category-facet",{"facetId":[1537,"facet-id"],"field":[1],"label":[1],"facetState":[32],"error":[32]}]]],["atomic-date-facet",[[1,"atomic-date-facet",{"facetId":[1537,"facet-id"],"field":[1],"label":[1],"facetState":[32],"error":[32]}]]],["atomic-numeric-facet",[[1,"atomic-numeric-facet",{"facetId":[1025,"facet-id"],"field":[1],"label":[1],"facetState":[32],"error":[32],"isExpanded":[32]}]]],["atomic-result-list",[[1,"atomic-result-list",{"enableInfiniteScroll":[4,"enable-infinite-scroll"],"listClass":[1,"list-class"],"listElementClass":[1,"list-element-class"],"fieldsToInclude":[1,"fields-to-include"],"resultListState":[32],"error":[32]},[[9,"scroll","handleInfiniteScroll"]]]]],["atomic-search-interface",[[1,"atomic-search-interface",{"reflectStateInUrl":[4,"reflect-state-in-url"],"pipeline":[513],"searchHub":[513,"search-hub"],"logLevel":[1,"log-level"],"i18n":[16],"language":[513],"engine":[1040],"error":[32],"initialize":[64],"executeFirstSearch":[64]},[[0,"atomic/initializeComponent","handleInitialization"]]]]],["atomic-breadcrumb-manager",[[1,"atomic-breadcrumb-manager",{"collapseThreshold":[2,"collapse-threshold"],"categoryDivider":[1,"category-divider"],"breadcrumbManagerState":[32],"collapsedBreadcrumbsState":[32],"error":[32]}]]],["atomic-did-you-mean",[[1,"atomic-did-you-mean",{"didYouMeanState":[32],"error":[32]}]]],["atomic-facet-manager",[[1,"atomic-facet-manager",{"facetManagerState":[32],"error":[32]}]]],["atomic-history",[[1,"atomic-history",{"error":[32],"historyState":[32]}]]],["atomic-no-results",[[1,"atomic-no-results",{"enableCancelLastAction":[4,"enable-cancel-last-action"],"enableSearchTips":[4,"enable-search-tips"],"querySummaryState":[32],"historyState":[32],"strings":[32],"error":[32]}]]],["atomic-pager",[[1,"atomic-pager",{"numberOfPages":[2,"number-of-pages"],"enableNavigationButtons":[4,"enable-navigation-buttons"],"pagerState":[32],"strings":[32],"error":[32]}]]],["atomic-query-error",[[1,"atomic-query-error",{"queryErrorState":[32],"error":[32]}]]],["atomic-query-summary",[[1,"atomic-query-summary",{"enableDuration":[4,"enable-duration"],"querySummaryState":[32],"strings":[32],"error":[32]}]]],["atomic-results-per-page",[[1,"atomic-results-per-page",{"choicesDisplayed":[1,"choices-displayed"],"initialChoice":[2,"initial-choice"],"resultPerPageState":[32],"strings":[32],"error":[32]}]]],["atomic-search-box",[[1,"atomic-search-box",{"numberOfSuggestions":[2,"number-of-suggestions"],"placeholder":[1],"leadingSubmitButton":[4,"leading-submit-button"],"_id":[513,"data-id"],"strings":[32],"searchBoxState":[32],"error":[32]}]]],["atomic-sort-dropdown",[[1,"atomic-sort-dropdown",{"sortState":[32],"strings":[32],"error":[32]}]]],["atomic-tab",[[1,"atomic-tab",{"expression":[1],"isActive":[4,"is-active"],"tabState":[32],"error":[32]}]]],["atomic-text",[[1,"atomic-text",{"value":[1],"count":[2],"strings":[32],"error":[32]}]]],["atomic-field-condition",[[1,"atomic-field-condition",{"ifDefined":[1,"if-defined"],"ifNotDefined":[1,"if-not-defined"],"conditions":[16],"getFields":[64]}]]],["atomic-frequently-bought-together",[[1,"atomic-frequently-bought-together",{"state":[32]}]]],["atomic-result-link",[[1,"atomic-result-link"]]],["atomic-result-template",[[1,"atomic-result-template",{"conditions":[16],"fieldsToInclude":[1,"fields-to-include"],"getConditions":[64],"getFields":[64]}]]],["atomic-result-value",[[1,"atomic-result-value",{"value":[1]}]]],["atomic-sort-criteria",[[0,"atomic-sort-criteria",{"caption":[1],"criteria":[1]}]]],["atomic-relevance-inspector",[[1,"atomic-relevance-inspector",{"bindings":[16],"relevanceInspectorState":[32]}]]],["atomic-result",[[1,"atomic-result",{"result":[16],"engine":[16]}]]],["facet-search",[[0,"facet-search",{"facetSearchResults":[16],"moreValuesAvailable":[4,"more-values-available"]}]]],["facet-value",[[0,"facet-value",{"label":[1],"numberOfResults":[2,"number-of-results"],"isSelected":[4,"is-selected"]}]]],["base-facet",[[4,"base-facet",{"label":[1],"hasActiveValues":[4,"has-active-values"],"isExpanded":[32]}]]]], options);
});
