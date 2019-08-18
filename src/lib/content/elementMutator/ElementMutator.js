import findAllElements from "../findAllElements.js";
import findAndProceedFn from "./findAndProceedFn.js";
import processorFn from "./processorFn.js";

class ElementMutator {
    constructor(cfg) {
        this.cfg = cfg;
        this.DOMContentLoadedListener = null;
        this.observers = null;
        console.debug('ElementMutator is constructed', this.cfg);
    }

    start() {
        console.debug('ElementMutator#start', this.cfg);
        if (this.cfg == null) {
            throw 'cfg property is null, set up cfg';
        }

        const attributeFilter = this.cfg.mutators.reduce((attributeFilter, mutator) => {
            attributeFilter.push(...mutator.attrs.map(attr => attr.name));

            return attributeFilter;
        }, []);

        console.debug('ElementMutator#start attributeFilter', attributeFilter);

        this.observers = findAndProceedFn(
            (node, attributeName) => processorFn(this.cfg, node, attributeName),
            attributeFilter
        );
        this.DOMContentLoadedListener = () => {
            findAllElements().forEach(async node => {
                const shadowRoot = node.openOrCloseShadowRoot || node.shadowRoot;

                if (shadowRoot) {
                    console.debug('DOMContentLoadedListener, shadowRoot', node, shadowRoot);
                    // TODO: paste here web component is load end listener
                    customElements.whenDefined("shadow-output").then(function(){console.debug("popup-info");});
                }
                // customElements.whenDefined("shadow-output").then(function(){console.debug("popup-info");});
                processorFn(this.cfg, node);
            });
        };
        // customElements.whenDefined("shadow-output").then(function(){alert("popup-info");});
        document.addEventListener('DOMContentLoaded', this.DOMContentLoadedListener);

        console.debug('ElementMutator#start is end');

        return this;
    }

    stop() {
        console.debug('ElementMutator#stop is start');
        document.removeEventListener('DOMContentLoaded', this.DOMContentLoadedListener);
        this.observers.forEach(observer => observer.disconnect());
        this.DOMContentLoadedListener = null;
        this.observers = null;
        this.cfg = null;
        console.debug('ElementMutator#stop is stop', this.cfg);

        return this;
    }
}

export default ElementMutator;