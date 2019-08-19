import browserApi from "../common/browserApi.js";

class ContentJsOptHelper {
    constructor(portName = 'OptHelper-cfg-port') {
        this.portName = portName;
        this.cfg = null;
        console.debug('ContentJsOptHelper is constructed', this.portName);
    }

    read(forceUpdated = false) {
        console.debug('ContentJsOptHelper#read is started');
        return new Promise(resolve => {
            const port = browserApi.runtime.connect({name: this.portName});

            if (this.cfg != null && !forceUpdated) {
                resolve(this.cfg);
            } else {
                const onMessageListener = cfg => {
                    console.debug('In content script, received message from background script: ', cfg);
                    resolve(this.cfg = cfg);
                };
                const onDisconnectListener = () => {
                    port.onMessage.removeListener(onMessageListener);
                    port.onDisconnect.removeListener(onDisconnectListener);
                };

                // I did not found an information in documentation if Firefox clears listeners automatically or not.
                // That is why I clear it manually.
                port.onMessage.addListener(onMessageListener);
                port.onDisconnect.addListener(onDisconnectListener);
                console.debug('ContentJsOptHelper#read, {cmd: \'give-me-a-cfg\'}) will be sent');
                port.postMessage({cmd: 'give-me-a-cfg'});
                console.debug('ContentJsOptHelper#read, {cmd: \'give-me-a-cfg\'}) is sent');
            }
        });
    };
}

export default ContentJsOptHelper;