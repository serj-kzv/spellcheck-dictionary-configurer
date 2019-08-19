let proceedAllNodesFn;
const proceedNode = (callback, cfg, root, observers) => {
    if (root.querySelectorAll) {
        root.querySelectorAll('*').forEach(node => {
            // TODO: for some reason openOrCloseShadowRoot does not work in WebExtensions
            // see https://developer.mozilla.org/en-US/docs/Web/API/Element/openOrClosedShadowRoot
            // and see as an example a page https://interactive-examples.mdn.mozilla.net/pages/tabbed/input-text.html
            // and http://jsfiddle.net/xn5u5bpk/15/
            const shadowRoot = node.openOrCloseShadowRoot || node.shadowRoot;

            if (shadowRoot) {
                console.debug('proceedNode, shadowRoot', shadowRoot);
                proceedAllNodesFn(callback, cfg, shadowRoot, observers);
            }
            callback(node);
        });
    }
};

proceedAllNodesFn = (callback, cfg, root, observers = []) => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            switch (true) {
                case mutation.type === 'childList': {
                    mutation.addedNodes.forEach(node => {
                        callback(node);
                        proceedNode(callback, cfg, node);
                    });
                    break;
                }
                case mutation.type === 'attributes': {
                    callback(mutation.target, mutation.attributeName);
                    break;
                }
            }
        });
    });

    observers.push(observer);
    observer.observe(root, cfg);
    proceedNode(callback, cfg, root, observers);

    return observers;
};

export default proceedAllNodesFn;