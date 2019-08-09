class ContentJsOptHelper {
    constructor(portName = 'OptHelper-cfg-port') {
        this.portName = portName;
        this.cfg = null;
        console.debug('ContentJsOptHelper is constructed', this.portName);
    }

    read(forceUpdated = false) {
        console.debug('ContentJsOptHelper#read is started');
        return new Promise(resolve => {
            const port = browser.runtime.connect({name: this.portName});

            if (this.cfg != null && !forceUpdated) {
                resolve(this.cfg);
            } else {
                port.onMessage.addListener(cfg => {
                    console.debug('In content script, received message from background script: ', cfg);
                    resolve(this.cfg = cfg);
                });
                console.debug('ContentJsOptHelper#read, {cmd: \'give-me-a-cfg\'}) will be sent');
                port.postMessage({cmd: 'give-me-a-cfg'});
                console.debug('ContentJsOptHelper#read, {cmd: \'give-me-a-cfg\'}) is sent');
            }
        });
    };
}

export default ContentJsOptHelper;