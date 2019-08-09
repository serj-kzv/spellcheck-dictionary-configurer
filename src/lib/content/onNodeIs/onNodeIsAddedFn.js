import onNodeIsFn from "./onNodeIsFn.js";

const onNodeIsAddedFn = (cfg, callbackFn) => onNodeIsFn(
    cfg,
    callbackFn,
    node => document.documentElement.contains(node)
);

export default onNodeIsAddedFn;