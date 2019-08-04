import onNodeIs from "./onNodeIs.js";

const onNodeIsAdded = (cfg, callbackFn) => onNodeIs(cfg, callbackFn, ['addedNodes', 'attributes'],
    node => document.documentElement.contains(node));

export default onNodeIsAdded;