import browserApi from "../../common/browserApi.js";
import OptHelperBase from "./OptHelperBase.js";

export default class OptHelper extends OptHelperBase {
    constructor(name = 'options', defaultCfgPath) {
        super();
        this.cfg = null;
        this.defaultCfgPath = defaultCfgPath;
        this.name = name;
    }

    async read() {
        const options = await this.hasOptions();

        return options ? this.cfg = options : await this.reset();
    }

    async save(cfg) {
        return this.cfg = await this.saveOptions(cfg);
    }

    async reset() {
        const cfg = await (await fetch(this.defaultCfgPath)).json();

        console.debug('OptHelper#reset cfg', cfg);

        return this.cfg = await this.saveOptions(cfg);
    }

    connectToContentJs(portName = 'OptHelper-cfg-port') {
        browserApi.runtime.onConnect.addListener(port => {
            if (port.name === portName) {
                const onMessageListener = async msg => {
                    console.debug('msg', port, msg);
                    if (msg.cmd === 'give-me-a-cfg') {
                        console.debug('OptHelper#connectToContentJs, cfg will be sent', port.sender, this.cfg);
                        this.cfg.requester = port.sender; // NOTE: for debug purposes
                        port.postMessage(this.cfg);
                    }
                    if (msg.cmd === 'upd-the-cfg') {
                        console.debug('OptHelper#connectToContentJs, cfg will be saved', msg.cfg);
                        delete msg.cfg.requester; // NOTE: requester for debug purposes
                        await this.save(msg.cfg);
                    }
                };

                // I did not found an information in documentation if Firefox clears listeners automatically or not.
                // That is why I clear it manually.
                const onDisconnectListener = () => {
                    port.onMessage.removeListener(onMessageListener);
                    port.onDisconnect.removeListener(onDisconnectListener);
                };

                port.onMessage.addListener(onMessageListener);
                port.onDisconnect.addListener(onDisconnectListener);
            }
        });
    }
}