'use strict';

const isVisibleNode = node => {
    return !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length);
};
const isSearchableNode = node => {
    const type = node.nodeType;

    return node.childNodes.length > 0 &&
        (type === Node.ELEMENT_NODE || type === Node.DOCUMENT_NODE || type === Node.DOCUMENT_FRAGMENT_NODE
            || node.querySelectorAll);
};
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
const onNodeIsAdded = (cfg, callbackFn) => onNodeIs(cfg, callbackFn, ['addedNodes', 'attributes'],
    node => document.documentElement.contains(node));
const nonSpellcheckedTxtNodeFinder = callbackFn => {
    return onNodeIsAdded(
        {attributeFilter: ['spellcheck', 'contenteditable'], childList: true, subtree: true},
        node => {
            if ((node instanceof HTMLInputElement
                || node instanceof HTMLTextAreaElement
                || (node instanceof HTMLElement && node.isContentEditable && !node.spellcheck))
                && isVisibleNode(node)) {
                callbackFn(node);
            }
        });
};
const main = () => {
    nonSpellcheckedTxtNodeFinder(node => {
        node.spellcheck = true;
    });
};

main();