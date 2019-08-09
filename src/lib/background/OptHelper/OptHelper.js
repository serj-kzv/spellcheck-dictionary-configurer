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
        browser.runtime.onConnect.addListener(port => {
            if (port.name === portName) {
                port.onMessage.addListener(async msg => {
                    console.debug('msg', port, msg);
                    if (msg.cmd === 'give-me-a-cfg') {
                        console.debug('OptHelper#connectToContentJs, cfg will be sent', port.sender, this.cfg);
                        port.postMessage(this.cfg);
                    }
                    if (msg.cmd === 'upd-the-cfg') {
                        console.debug('OptHelper#connectToContentJs, cfg will be saved', msg.cfg);
                        await this.save(msg.cfg);
                    }
                });
            }
        });
    }
}