const isVisibleNodeFn = node => {
    return !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length);
};

export default isVisibleNodeFn;