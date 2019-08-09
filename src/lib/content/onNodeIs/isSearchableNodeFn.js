const isSearchableNodeFn = node => {
    const type = node.nodeType;

    return node.childNodes.length > 0 &&
        (type === Node.ELEMENT_NODE || type === Node.DOCUMENT_NODE || type === Node.DOCUMENT_FRAGMENT_NODE
            || node.querySelectorAll);
};

export default isSearchableNodeFn;