import browserApi from "../../common/browserApi.js";
import OptHelper from "./OptHelper.js";

class OptHelperImpl extends OptHelper {
    constructor(cfgPath = 'resource/cfg.json') {
        super('options', browserApi.runtime.getURL(cfgPath));
    }

    static async build() {
        const optHelperImpl = new OptHelperImpl();

        await optHelperImpl.read();
        optHelperImpl.connectToContentJs();

        return optHelperImpl;
    }
}

export default OptHelperImpl;