import OptHelper from "./lib/OptHelper/OptHelper.js";

class OptHelperImpl extends OptHelper {
    constructor() {
        super('options', browser.runtime.getURL('resource/cfg.json'));
    }
}

export default OptHelperImpl;