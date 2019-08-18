let onNodeIsAddedFn;
const proceedNode = (callback, cfg, node) => {
    if (node.querySelectorAll) {
        node.querySelectorAll('*').forEach(node => {
            const shadowRoot = node.openOrCloseShadowRoot || node.shadowRoot;

            if (shadowRoot) {
                onNodeIsAddedFn(callback, cfg, shadowRoot);
            }
            callback(node);
        });
    }
};

onNodeIsAddedFn = (callback, cfg, root = document.documentElement) => {
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

    observer.observe(root, cfg);
    proceedNode(callback, cfg, root);

    return observer;
};

export default onNodeIsAddedFn;