const findAllElements = selector => {
    let nodes = Array.from(document.querySelectorAll(selector));
    let length = nodes.length;

    for (let i = 0; i < length; i++) {
        const
            node = nodes[i],
            // openOrCloseShadowRoot is available only to WebExtensions
            // see https://developer.mozilla.org/en-US/docs/Web/API/Element/openOrClosedShadowRoot
            // Also it can be used with some browser extension that provide openOrCloseShadowRoot in usual JavaScript
            shadowRoot = node.openOrCloseShadowRoot || node.shadowRoot;

        // We check if there is a querySelectorAll function in case of some monkey patch breaks the function.
        if (shadowRoot && shadowRoot.querySelectorAll) {
            const shadowElements = shadowRoot.querySelectorAll(selector);

            nodes.push(...shadowElements);

            // We delete some nodes that can be used inside several Custom Elements at the same time.
            // TODO: check if it is necessary
            nodes = nodes.filter(curNode => !curNode.isSameNode(node));

            length = nodes.length;
        }
    }

    return nodes;
};

export default findAllElements;