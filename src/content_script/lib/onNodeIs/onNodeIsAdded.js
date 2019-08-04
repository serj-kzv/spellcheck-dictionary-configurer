import onNodeIs from "./onNodeIs.js";

const onNodeIsAdded = (cfg, asyncCallbackFn) => onNodeIs(
    cfg,
    asyncCallbackFn,
    ['addedNodes', 'attributes'],
    node => document.documentElement.contains(node)
);

export default onNodeIsAdded;