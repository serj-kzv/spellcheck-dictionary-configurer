const findSpecificCfgFn = (defaultCfg, cfgs, currentHostname, currentHref) => {
    console.debug(defaultCfg, cfgs, currentHostname, currentHref);

    // www.example.com === www.example.com
    return cfgs.find(specificCfg => specificCfg.hostname != null && specificCfg.hostname === currentHostname)
        // https://www.example** === https://www.example.com
        || cfgs.find(specificCfg =>
            specificCfg.href != null && specificCfg.href.endsWith('**')
            && currentHref.startsWith(specificCfg.href.slice(0, -2)))
        // **.example.com === https://www.example.com
        || cfgs.find(specificCfg =>
            specificCfg.href != null && specificCfg.href.startsWith('**')
            && currentHref.endsWith(specificCfg.href.slice(2)))
        // https://www.example.com === https://www.example.com
        || cfgs.find(specificCfg => specificCfg.href != null && specificCfg.href === currentHref)
        // **.example.** === https://www.example.com
        || cfgs.find(specificCfg =>
            specificCfg.href != null && specificCfg.href.startsWith('**') && specificCfg.href.endsWith('**')
            && currentHref.includes(specificCfg.href.slice(2, -2)))
        || defaultCfg;
};

export default findSpecificCfgFn;