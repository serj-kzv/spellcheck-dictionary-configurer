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
        const isProceedable = mutator.targets.some(target =>
            node.matches(target.selector) && target.isOn && (target.proceedInvisible || isVisibleNodeFn(node)));

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