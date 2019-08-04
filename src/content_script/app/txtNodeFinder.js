import isVisibleNode from "../util/isVisibleNode.js";
import onNodeIsAdded from "../util/onNodeIs/onNodeIsAdded.js";

const txtNodeFinder = callbackFn => {
    return onNodeIsAdded(
        {attributeFilter: ['spellcheck', 'contenteditable'], childList: true, subtree: true},
        node => {
            const curElements = CFG.global.forceActivation.elements;
            const checkInput = curElements.input && node instanceof HTMLInputElement;
            const checkTextarea = curElements.textarea && node instanceof HTMLTextAreaElement;
            const checkContentEditable = curElements.contentEditable && node instanceof HTMLElement
                && node.isContentEditable;
            const checkInvisible = !curElements.invisible || isVisibleNode(node);

            if ((checkInput || checkTextarea || checkContentEditable) && checkInvisible) {
                callbackFn(node);
            }
        });
};

export default txtNodeFinder;