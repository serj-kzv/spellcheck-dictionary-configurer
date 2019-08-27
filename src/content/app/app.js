import ContentJsOptHelper from "../../lib/content/ContentJsOptHelper.js";
import ElementMutator from "../../lib/web/elementMutator/ElementMutator.js";
import findSpecificCfgFn from "../../lib/common/findSpecificCfgFn.js";

let elementMutator;
let optHelper;
let stop;
const start = async () => {
    console.debug('app#start is started');
    optHelper = new ContentJsOptHelper();

    const cfg = await optHelper.read();

    console.debug('app#start cfg', cfg);

    const specificCfg = findSpecificCfgFn(
        cfg.default,
        cfg.specificElementMutatorCfgs,
        location.hostname,
        location.href
    );

    console.debug('app#start specificCfg', specificCfg);

    if (specificCfg.isOn) {
        try {
            elementMutator = await new ElementMutator(specificCfg.elementMutatorCfg).start();
        } catch (e) {
            console.debug(e);
        }
    } else {
        stop();
    }
    console.debug('app#start is ended', optHelper, elementMutator);
};
stop = () => {
    if (elementMutator) {
        elementMutator.stop();
        elementMutator = null;
    }
    optHelper = null;
};
const app = async () => {
    console.debug('app is started');

    await start();

    console.debug('findAndProceedFn was started');
};

export default app;