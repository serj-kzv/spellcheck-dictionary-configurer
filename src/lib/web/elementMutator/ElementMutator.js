import findAndProceedFn from "./findAndProceedFn.js";
import processorFn from "./processorFn.js";

class ElementMutator {
    constructor(cfg) {
        this.cfg = cfg;
        this.startProcessingFn = null;
        this.observers = null;
        this.isStarted = false;
        console.debug('ElementMutator is constructed', this.cfg);
    }

    start(startWhenIsFullyLoaded = false) {
        if (this.isStarted) {
            return Promise.reject(new Error('The ElementMutator is started already. Stop it before starting again.'));
        }

        return new Promise(resolve => {
            console.debug('ElementMutator#start', this.cfg);
            if (this.cfg == null) {
                throw 'cfg property is null, set up cfg';
            }

            const
                stylesName = 'styles',
                attributeFilter = this.cfg.mutators.reduce((attributeFilter, mutator) => {
                    mutator.attrs.forEach(({name}) => {
                        if (attributeFilter.indexOf(name) < 0) {
                            attributeFilter.push(name);
                        }
                    });
                    mutator.attrDependencies.forEach(name => {
                        if (attributeFilter.indexOf(name) < 0) {
                            attributeFilter.push(name);
                        }
                    });
                    if (mutator[stylesName].length > 0 && attributeFilter.indexOf(stylesName) < 0) {
                        attributeFilter.push(stylesName);
                    }

                    return attributeFilter;
                }, []);

            console.debug('ElementMutator#start attributeFilter', attributeFilter);
            this.startProcessingFn = () => {
                this.isStarted = true;
                this.stopStartProcessingListener();
                console.debug('startProcessingFn, document.documentElement', document.documentElement);
                console.debug('startProcessingFn, document.documentElement shadowRoot', Array.from(document.documentElement.querySelectorAll('*')).filter(e => e.shadowRoot));
                resolve(this.observers = findAndProceedFn(
                    (node, attributeName) => processorFn(this.cfg, node, attributeName),
                    attributeFilter
                ));
            };
            if (!this.isStarted) {
                if (startWhenIsFullyLoaded) {
                    if (document.readyState === 'complete') {
                        this.startProcessingFn();
                    } else {
                        document.addEventListener('load', this.startProcessingFn, false);
                    }
                } else {
                    if (document.readyState !== 'loading') {
                        this.startProcessingFn();
                    } else {
                        console.debug('document is already ready, just execute code here');
                        document.addEventListener('DOMContentLoaded', this.startProcessingFn, false);
                    }
                }
            }

            console.debug('ElementMutator#start is end');
        });
    }

    stop() {
        console.debug('ElementMutator#stop is start');
        this.stopStartProcessingListener();
        this.observers.forEach(observer => observer.disconnect());
        this.startProcessingFn = null;
        this.observers = null;
        this.cfg = null;
        this.isStarted = false;
        console.debug('ElementMutator#stop is stop', this.cfg);
    }

    stopStartProcessingListener() {
        document.removeEventListener('DOMContentLoaded', this.startProcessingFn);
        document.removeEventListener('load', this.startProcessingFn);
    }
}

export default ElementMutator;