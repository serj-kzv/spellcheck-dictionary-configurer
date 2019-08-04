import isVisibleNode from "../lib/isVisibleNode.js";
import getCfgFn from "./getCfgFn.js";
import txtNodeFinder from "./txtNodeFinder.js";

const asyncProcessorFn = async node => {
    console.debug('node was found', node);

    const CFG = await getCfgFn();

    console.debug('asyncProcessorFn CFG', CFG);

    const curElements = CFG.global.spellchecker.forceActivation.elements;
    const checkInput = curElements.input && node instanceof HTMLInputElement;
    const checkTextarea = curElements.textarea && node instanceof HTMLTextAreaElement;
    const checkContentEditable = curElements.contentEditable && node instanceof HTMLElement
        && node.isContentEditable;
    const checkInvisible = !curElements.invisible || isVisibleNode(node);

    console.debug('check on txt node will be started');
    // console.debug('checkInput', node, curElements.input, node instanceof HTMLInputElement, checkInput);
    console.debug('checkTextarea', checkTextarea);
    console.debug('checkContentEditable', checkContentEditable);
    console.debug('checkInvisible', checkInvisible);

    if ((checkInput || checkTextarea || checkContentEditable) && checkInvisible) {
        console.debug('txtNodeFinder callback is started, a node is', node);

        const curIsOn = CFG.global.spellchecker.forceActivation.isOn;

        console.debug('curIsOn is ', curIsOn);

        if (curIsOn && !node.spellcheck) {
            node.spellcheck = true;
            console.debug('curIsOn will be set in ', curIsOn);
        }

        const curLang = CFG.global.spellchecker.forceLang;

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
    // document.querySelectorAll('*').forEach(asyncProcessorFn);

    console.debug('txtNodeFinder was started');
};

export default app;