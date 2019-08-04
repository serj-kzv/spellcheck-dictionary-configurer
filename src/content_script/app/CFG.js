const port = browser.runtime.connect({name: "cfg-port"});
let CFG;

port.onMessage.addListener(cfg => {
    console.log('In content script, received message from background script: ', cfg);
    CFG = cfg;
});
port.postMessage({cmd: 'give-me-a-cfg'});

export default CFG;