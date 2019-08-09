import ContentJsOptHelper from "../../lib/content/ContentJsOptHelper.js";
import ElementMutator from "../../lib/content/elementMutator/ElementMutator.js";
import findSpecificCfgFn from "./cfg/findSpecificCfgFn.js";

let elementMutator;
let optHelper;
const start = async () => {
    console.debug('app#start is started');
    optHelper = new ContentJsOptHelper();

    const cfg = await optHelper.read();

    console.debug('app#start cfg', cfg);

    const specificCfg = findSpecificCfgFn(cfg);

    console.debug('app#start specificCfg', specificCfg);

    elementMutator = new ElementMutator(specificCfg.elementMutatorCfg).start();
    console.debug('app#start is ended', optHelper, elementMutator);
};
const stop = () => {
    elementMutator.stop();
    elementMutator = null;
    optHelper = null;
};
const app = async () => {
    console.debug('app is started');

    await start();

    console.debug('findAndProceedFn was started');
};

export default app;