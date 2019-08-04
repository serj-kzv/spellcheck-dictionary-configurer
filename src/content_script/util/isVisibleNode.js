const isVisibleNode = node => {
    return !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length);
};

export default isVisibleNode;