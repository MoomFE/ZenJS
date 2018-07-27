import inBrowser from "../../const/inBrowser";

/**
 * @type {Node}
 */
const DomNode = inBrowser ? window.Node : undefined;

export default DomNode;