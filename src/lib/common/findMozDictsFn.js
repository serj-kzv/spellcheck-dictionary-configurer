const findMozDictsFn = async (url) => {
    const dicts = await (await fetch(browser.runtime.getURL('resource/dicts.json'))).json();

    return Object.values(dicts.languageTools.byID).filter(v => v.type === 'dictionary');
};

export default findMozDictsFn;