import OptHelperBase from "./OptHelperBase.js";

export default class OptHelper extends OptHelperBase {
    constructor(name = 'options', optNames, defaultCfgPath) {
        super();
        this.cfg = null;
        this.optNames = optNames;
        this.defaultCfgPath = defaultCfgPath;
        this.name = name;
    }

    async read() {
        return this.cfg == null ? await this.upd() : this.cfg;
    }

    async save(cfg) {
        return this.cfg = await this.saveOptions(cfg);
    }

    async reset() {
        const cfg = await (await fetch(this.defaultCfgPath)).json();

        return this.cfg = await this.saveOptions(cfg);
    }

    async upd() {
        const cfg = await this.readOptions();

        if (this.isValidOpts(cfg)) {
            console.log('Stored config will be loaded', cfg);
            return this.cfg = cfg;
        }

        return await this.reset();
    }

    isValidOpts(cfg) {
        return !this.optNames.some(opt => cfg[opt] === undefined);
    }
}
