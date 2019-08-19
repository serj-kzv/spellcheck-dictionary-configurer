import proceedAllNodesFn from "./proceedAllNodesFn.js";

const findAndProceedFn = (callbackFn, attributeFilter, root = document.documentElement) => {
    console.debug('findAndProceedFn callback will be called');
    console.debug('findAndProceedFn, attributeFilter ', attributeFilter);

    return proceedAllNodesFn(
        (node, attributeName) => callbackFn(node, attributeName),
        {attributeFilter, childList: true, subtree: true},
        root
    );
};

export default findAndProceedFn;