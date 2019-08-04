import isSearchableNode from "./isSearchableNode.js";

const onNodeIs = (cfg, callbackFn, nodeStorageNames, advancePredicate = node => true) => {
    const observer = new MutationObserver(mutations => {
        const callbackFnWrapper = node => {
            if (advancePredicate(node)) {
                callbackFn(node);
            }
        };

        mutations.forEach(mutation => {
            nodeStorageNames.forEach(nodeStorageName => {
                mutation[nodeStorageName].forEach(node => {
                    callbackFnWrapper(node);
                    if (isSearchableNode(node)) {
                        node.querySelectorAll('*').forEach(node => callbackFnWrapper(node));
                    }
                });
            });
        });
    });

    observer.observe(document.documentElement, cfg);

    return observer;
};

export default onNodeIs;