import txtNodeFinder from "./txtNodeFinder.js";

const app = () => {
    txtNodeFinder( node => {
        const curIsOn = (CFG.read()).global.forceActivation.isOn;

        if (curIsOn && !node.spellcheck) {
            node.spellcheck = true;
        }

        const curLang = CFG.global.forceLang;

        if (node.lang !== curLang) {
            node.lang = curLang;
        }
    });
};

export default app;