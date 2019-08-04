let CFG;
const getCfgFn = async (updated = false) => {
    return new Promise(resolve => {
        const port = browser.runtime.connect({name: "cfg-port"});

        if (CFG && !updated) {
            resolve(CFG);
        } else {
            port.onMessage.addListener(cfg => {
                console.log('In content script, received message from background script: ', cfg);
                CFG = cfg;
                resolve(cfg);
            });
            port.postMessage({cmd: 'give-me-a-cfg'});
        }
    });
};

export default getCfgFn;