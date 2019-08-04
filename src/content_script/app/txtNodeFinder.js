import onNodeIsAdded from "../lib/onNodeIs/onNodeIsAdded.js";

const txtNodeFinder = asyncCallbackFn => {
    console.debug('txtNodeFinder callback will be called');

    return onNodeIsAdded(
        {attributeFilter: ['spellcheck', 'contenteditable'], childList: true, subtree: true},
        node => asyncCallbackFn(node)
    );
};

export default txtNodeFinder;