const onNodeIsAddedFn = (callback, cfg, root = document.documentElement) => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            switch (true) {
                case mutation.type === 'childList': {
                    mutation.addedNodes.forEach(node => {
                        callback(node);
                        if (node.querySelectorAll) {
                            node.querySelectorAll('*').forEach(node => {
                                const shadowRoot = node.openOrCloseShadowRoot || node.shadowRoot;

                                if (shadowRoot) {
                                    onNodeIsAddedFn(callback, cfg, shadowRoot);
                                } else {
                                    callback(node);
                                }
                            });
                        }

                        const shadowRoot = node.openOrCloseShadowRoot || node.shadowRoot;

                        onNodeIsAddedFn(callback, cfg, shadowRoot);
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
    if (root.querySelectorAll) {
        root.querySelectorAll('*').forEach(node => {
            const shadowRoot = node.openOrCloseShadowRoot || node.shadowRoot;

            if (shadowRoot) {
                onNodeIsAddedFn(callback, cfg, shadowRoot);
            } else {
                callback(node);
            }
        });
    }

    return observer;
};

export default onNodeIsAddedFn;