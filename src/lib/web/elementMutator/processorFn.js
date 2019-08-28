import isVisibleNodeFn from "../isVisibleNodeFn.js";

const processNodesStyleFn = (mutator, node) => {
    console.debug('processNodesStyleFn');
    mutator['styles'].forEach(({name, value, isImportant, isOn}) => {
        if (isOn) {
            const currentValue = node.style.getPropertyValue(name);

            if (currentValue !== value) {
                console.debug('processNodesStyleFn, style value will be set', node, name, value, isImportant);
                node.style.setProperty(name, value, isImportant);
            }
        }
    });
};
const processNodesFn = (mutator, node) => {
    mutator.attrs.forEach(({name, value}) => {
        if (node.getAttribute(name) !== value) {
            node.setAttribute(name, value);
        }
    });
};
const processorFn = async (cfg, node, attributeName) => {
    cfg.mutators.forEach(mutator => {
        const isProceedable = mutator.targets.some(target => {
            if (target['isOn'] && (target['proceedInvisible'] || isVisibleNodeFn(node))) {
                const targetSelector = target['selector'];

                if (targetSelector && targetSelector['isOn']) {
                    const targetSelectorName = targetSelector['name'];

                    if (node.matches(targetSelectorName)) {
                        return true;
                    } else if (targetSelector['isSmartAlgorithm']) {
                        // The "smart algorithm creates a node by the selector, gets its interface
                        // and use the interface to compares
                        try {
                            const targetSelectorNodeInterface = document.createElement(targetSelectorName).constructor;

                            // NOTE: maybe there is not need to compare names
                            return node instanceof targetSelectorNodeInterface
                                || targetSelectorNodeInterface.name === node.constructor.name;
                        } catch (e) {
                            console.debug('can not create a node by selector', targetSelector);
                        }
                    }
                } else {
                    const targetByInterface = target['byInterface'];

                    if (targetByInterface && targetByInterface['isOn']) {
                        const targetInterfaceName = targetByInterface['name'];

                        // here we compare names because there is a case when there is a class with the same name
                        // NOTE: maybe there is not need to compare names
                        return node instanceof window[targetInterfaceName] ||
                            (targetByInterface['notOnlyInstanceOfButAlsoName']
                                && targetInterfaceName === node.constructor.name);
                    }
                }
            }
        });

        if (isProceedable) {
            // console.debug('processorFn, the node is a isProceedable node');
            if (attributeName) {
                console.debug('node attr was mutated', attributeName);
                if (attributeName === 'style') {
                    console.debug('processorFn, attributeName is style', attributeName === 'style');
                    processNodesStyleFn(mutator, node);
                } else {
                    const attr = mutator.attrs.find(attr => attr.name === attributeName);

                    if (attr) {
                        // if there is an attrDependency then we check and set all attrs
                        if (mutator.attrDependencies.some(attrDependency => attrDependency === attributeName)) {
                            processNodesFn(mutator, node);
                        } else {
                            const {name, value} = attr;

                            if (node.getAttribute(name) !== value) {
                                node.setAttribute(name, value);
                            }
                        }
                    }
                }
            } else {
                console.debug('the node was added');
                processNodesStyleFn(mutator, node);
                processNodesFn(mutator, node);
            }
        }
    });
};

export default processorFn;