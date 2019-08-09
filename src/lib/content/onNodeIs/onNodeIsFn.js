import isSearchableNodeFn from "./isSearchableNodeFn.js";

const onNodeIsFn = (cfg, callbackFn, advancePredicate = (node, attributeName) => true) => {
    const observer = new MutationObserver(mutations => {
        const callbackFnWrapper = (node, attributeName) => {
            if (advancePredicate(node, attributeName)) {
                callbackFn(node, attributeName);
            }
        };

        mutations.forEach(mutation => {
            switch (true) {
                case mutation.type === 'childList': {
                    mutation.addedNodes.forEach(node => {
                        callbackFnWrapper(node);
                        if (isSearchableNodeFn(node)) {
                            node.querySelectorAll('*').forEach(node => callbackFnWrapper(node));
                        }
                    });
                    break;
                }
                case mutation.type === 'attributes': {
                    callbackFnWrapper(mutation.target, mutation.attributeName);
                    break;
                }
            }
        });
    });

    observer.observe(document.documentElement, cfg);

    return observer;
};

export default onNodeIsFn;