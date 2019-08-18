import onNodeIsAddedFn from "../onNodeIs/onNodeIsAddedFn.js";

const findAndProceedFn = (callbackFn, attributeFilter) => {
    console.debug('findAndProceedFn callback will be called');
    console.debug('findAndProceedFn, attributeFilter ', attributeFilter);

    return onNodeIsAddedFn(
        (node, attributeName) => callbackFn(node, attributeName),
        {attributeFilter, childList: true, subtree: true}
    );
};

export default findAndProceedFn;