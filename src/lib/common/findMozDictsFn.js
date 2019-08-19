import browserApi from "./browserApi.js";

const findMozDictsFn = async (url) => {
    const href = url ? url : browserApi.runtime.getURL('resource/dicts.json');
    const dicts = await (await fetch(href)).json();

    return Object.values(dicts.languageTools.byID).filter(v => v.type === 'dictionary');
};

export default findMozDictsFn;