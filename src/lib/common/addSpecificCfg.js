import changeCfg from "./changeCfg.js";
import findSpecificCfgFn from "./findSpecificCfgFn.js";
import cloneDeep from "lodash.clonedeep";

const addSpecificCfg = (cfg, hostname, href, lang) => {
    console.debug('addSpecificCfg', cfg, hostname, href, lang);

    let specificCfg = findSpecificCfgFn(
        false,
        cfg['specificElementMutatorCfgs'],
        hostname,
        href
    );

    if (specificCfg) {
        changeCfg(specificCfg, null, null, lang);
    } else if (lang) {
        console.debug('addSpecificCfg, new cfg will be added', lang, hostname, href);
        specificCfg = cloneDeep(cfg.default);
        if (hostname) {
            changeCfg(specificCfg, hostname, null, lang);
        }
        if (href) {
            changeCfg(specificCfg, null, href, lang);
        }
        console.debug('addSpecificCfg, new cfg will be added, specificCfg', specificCfg);
        cfg['specificElementMutatorCfgs'].push(specificCfg);
    }

    return cfg;
};

export default addSpecificCfg;