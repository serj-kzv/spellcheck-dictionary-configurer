import isVisibleNodeFn from "../isVisibleNodeFn.js";

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
            node.matches(target.selector) && (target.proceedInvisible || isVisibleNodeFn(node)));

        if (isProceedable) {
            // console.debug('processorFn, the node is a isProceedable node');
            if (attributeName) {
                console.debug('node attr was mutated', attributeName);
                const attr = mutator.attrs.find(attr => attr.name === attributeName);

                if (attr) {
                    // if there is an attrDependency then we check and set all attrs
                    if (mutator.attrDependencies.some(attrDependency => attrDependency === attributeName)) {
                        processNodesFn(mutator, node);
                    } else {
                        if (node.getAttribute(attr.name) !== attr.value) {
                            node.setAttribute(attr.name, attr.value);
                        }
                    }
                }
            } else {
                console.debug('the node was added');
                processNodesFn(mutator, node);
            }
        }
    });
};

export default processorFn;