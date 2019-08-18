import * as findAllElements from "./findAllElements.js";

const findElements = selector => {
    return findAllElements().filter(node => node.matches(selector));
};

export default findElements;