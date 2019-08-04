import isVisibleNode from "../lib/isVisibleNode.js";
import txtNodeFinder from "./txtNodeFinder.js";
import CFG from "./CFG.js";

const asyncProcessorFn = async node => {
    const curElements = CFG.global.forceActivation.elements;
    const checkInput = curElements.input && node instanceof HTMLInputElement;
    const checkTextarea = curElements.textarea && node instanceof HTMLTextAreaElement;
    const checkContentEditable = curElements.contentEditable && node instanceof HTMLElement
        && node.isContentEditable;
    const checkInvisible = !curElements.invisible || isVisibleNode(node);

    if ((checkInput || checkTextarea || checkContentEditable) && checkInvisible) {
        console.debug('txtNodeFinder callback is started, a node is', node);

        const cfg = await CFG.read();

        console.debug('txtNodeFinder callback is started, a cfg is', cfg);

        const curIsOn = cfg.global.forceActivation.isOn;

        console.debug('curIsOn is ', curIsOn);

        if (curIsOn && !node.spellcheck) {
            node.spellcheck = true;
            console.debug('curIsOn will be set in ', curIsOn);
        }

        const curLang = CFG.global.forceLang;

        console.debug('curLang is ', curLang);

        if (node.lang !== curLang) {
            node.lang = curLang;
            console.debug('curLang will be set in ', curLang);
        }
    }

    console.debug('txtNodeFinder callback was ended');
};
const app = () => {
    console.debug('app is started');

    txtNodeFinder(asyncProcessorFn);
    document.querySelectorAll('*').forEach(asyncProcessorFn);

    console.debug('txtNodeFinder was started');
};

export default app;