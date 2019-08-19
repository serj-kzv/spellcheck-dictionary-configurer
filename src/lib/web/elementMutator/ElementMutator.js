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

        this.DOMContentLoadedListener = () => {
            console.debug('DOMContentLoadedListener, document.documentElement', document.documentElement);
            console.debug('DOMContentLoadedListener, document.documentElement shadowRoot', Array.from(document.documentElement.querySelectorAll('*')).filter(e => e.shadowRoot));
            this.observers = findAndProceedFn(
                (node, attributeName) => processorFn(this.cfg, node, attributeName),
                attributeFilter
            );
        };
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