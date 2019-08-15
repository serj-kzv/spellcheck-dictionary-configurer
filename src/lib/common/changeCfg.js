const changeCfg = (cfg, hostname, href, lang) => {
    console.debug('changeCfg', cfg, hostname, href, lang);

    if (hostname && cfg['hostname'] !== hostname) {
        cfg['hostname'] = hostname;
    }
    if (href && cfg['href'] !== href) {
        cfg['href'] = href;
    }

    const currentMutators = cfg['elementMutatorCfg']['mutators'];

    currentMutators.forEach(mutator => {
        const attrs = mutator['attrs'];

        const langAttr = attrs.find(attr => attr.name === 'lang');

        if (lang && langAttr.value !== lang) {
            langAttr.value = lang;
        }
    });

    console.debug('changeCfg, cfg', cfg);
};

export default changeCfg;