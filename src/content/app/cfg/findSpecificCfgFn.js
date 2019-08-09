const findSpecificCfgFn = CFG => {
    const specificCfgs = CFG.specificElementMutatorCfgs;

    // www.example.com === www.example.com
    return specificCfgs.find(specificCfg => specificCfg.hostname != null && specificCfg.hostname === location.hostname)
        // https://www.example.com === https://www.example.com
        || specificCfgs.find(specificCfg => specificCfg.href != null && specificCfg.href === location.href)
        // https://www.example** === https://www.example.com
        || specificCfgs.find(specificCfg =>
            specificCfg.href != null && specificCfg.href.endsWith('**') && location.href.startsWith(specificCfg.href))
        // **.example.com === https://www.example.com
        || specificCfgs.find(specificCfg =>
            specificCfg.href != null && specificCfg.href.startsWith('**') && location.href.endsWith(specificCfg.href))
        || CFG.default;
};

export default findSpecificCfgFn;