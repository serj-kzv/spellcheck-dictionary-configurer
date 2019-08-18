import findAllElements from "../findAllElements.js";
import findAndProceedFn from "./findAndProceedFn.js";
import processorFn from "./processorFn.js";

class ElementMutator {
    constructor(cfg) {
        this.cfg = cfg;
        this.listener = null;
        this.observer = null;
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

        this.observer = findAndProceedFn(
            (node, attributeName) => processorFn(this.cfg, node, attributeName),
            attributeFilter
        );
        this.listener = () => {
            findAllElements('*').forEach(node => processorFn(this.cfg, node));
        };
        document.addEventListener('DOMContentLoaded', this.listener);

        console.debug('ElementMutator#start is end');

        return this;
    }

    stop() {
        console.debug('ElementMutator#stop is start');
        document.removeEventListener('DOMContentLoaded', this.listener);
        this.observer.disconnect();
        this.listener = null;
        this.observer = null;
        this.cfg = null;
        console.debug('ElementMutator#stop is stop', this.cfg);

        return this;
    }
}

export default ElementMutator;