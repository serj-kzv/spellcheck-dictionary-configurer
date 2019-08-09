import onNodeIsAddedFn from "../onNodeIs/onNodeIsAddedFn.js";

const findAndProceedFn = (callbackFn, attributeFilter) => {
    console.debug('findAndProceedFn callback will be called');
    console.debug('findAndProceedFn, attributeFilter ', attributeFilter);

    return onNodeIsAddedFn(
        {attributeFilter, childList: true, subtree: true},
        (node, attributeName) => callbackFn(node, attributeName)
    );
};

export default findAndProceedFn;