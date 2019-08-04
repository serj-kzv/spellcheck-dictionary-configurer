import OptHelperBase from "./OptHelperBase.js";

export default class OptHelper extends OptHelperBase {
    constructor(name = 'options', defaultCfgPath) {
        super();
        this.cfg = null;
        this.defaultCfgPath = defaultCfgPath;
        this.name = name;
    }

    async read() {
        return this.cfg == null ? await this.reset() : this.cfg;
    }

    async save(cfg) {
        return this.cfg = await this.saveOptions(cfg);
    }

    async reset() {
        const cfg = await (await fetch(this.defaultCfgPath)).json();

        console.debug('OptHelper#reset cfg', cfg);

        return this.cfg = await this.saveOptions(cfg);
    }
}
