import isSearchableNode from "./isSearchableNode.js";

const onNodeIs = (cfg, asyncCallbackFn, nodeStorageNames, advancePredicate = node => true) => {
    const observer = new MutationObserver(mutations => {
        const asyncCallbackFnWrapper = async node => {
            if (advancePredicate(node)) {
                await asyncCallbackFn(node);
            }
        };

        mutations.forEach(mutation => {
            nodeStorageNames.forEach(nodeStorageName => {
                mutation[nodeStorageName].forEach(node => {
                    asyncCallbackFnWrapper(node);
                    if (isSearchableNode(node)) {
                        node.querySelectorAll('*').forEach(node => asyncCallbackFnWrapper(node));
                    }
                });
            });
        });
    });

    observer.observe(document.documentElement, cfg);

    return observer;
};

export default onNodeIs;